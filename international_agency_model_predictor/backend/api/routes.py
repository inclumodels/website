import json
import shutil
import os
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, Depends, File, Form, UploadFile, BackgroundTasks, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import Batch, Submission, Photo, AnalysisResult
from ..config import settings, BASE_DIR
from ..core.batch_processor import process_submission, process_batch_zip
from ..core.llm_analyst import generate_all as llm_generate, is_available as llm_status

router = APIRouter()
templates = Jinja2Templates(directory=str(Path(__file__).resolve().parent.parent.parent / "frontend" / "templates"))


# ─── Pages ────────────────────────────────────────────────────────────────────

@router.get("/", response_class=HTMLResponse)
def dashboard(request: Request, db: Session = Depends(get_db)):
    total = db.query(Submission).count()
    completed = db.query(Submission).filter(Submission.status == "completed").count()
    pending = db.query(Submission).filter(Submission.status.in_(["pending", "processing"])).count()
    failed = db.query(Submission).filter(Submission.status == "failed").count()
    batches_count = db.query(Batch).count()

    recent = (
        db.query(Submission)
        .order_by(Submission.created_at.desc())
        .limit(15)
        .all()
    )

    recent_with_scores = []
    for s in recent:
        r = s.result
        recent_with_scores.append({
            "id": s.id,
            "name": s.name,
            "gender": s.gender,
            "height_cm": s.height_cm,
            "status": s.status,
            "created_at": s.created_at.strftime("%Y-%m-%d %H:%M") if s.created_at else "",
            "eu_score": r.eu_score if r else None,
            "us_score": r.us_score if r else None,
            "asian_score": r.asian_score if r else None,
            "verdict": r.potential_verdict if r else None,
            "batch_id": s.batch_id,
        })

    batches = db.query(Batch).order_by(Batch.created_at.desc()).limit(5).all()

    return templates.TemplateResponse("dashboard.html", {
        "request": request,
        "stats": {
            "total": total,
            "completed": completed,
            "pending": pending,
            "failed": failed,
            "batches": batches_count,
        },
        "recent_submissions": recent_with_scores,
        "batches": batches,
    })


@router.get("/submit", response_class=HTMLResponse)
def submit_page(request: Request):
    return templates.TemplateResponse("submit.html", {"request": request})


@router.get("/batch", response_class=HTMLResponse)
def batch_page(request: Request, db: Session = Depends(get_db)):
    batches = db.query(Batch).order_by(Batch.created_at.desc()).all()
    return templates.TemplateResponse("batch.html", {"request": request, "batches": batches})


@router.get("/result/{submission_id}", response_class=HTMLResponse)
def result_page(request: Request, submission_id: int, db: Session = Depends(get_db)):
    submission = db.query(Submission).filter(Submission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    photos = {p.photo_type: f"/uploads/{submission_id}/{Path(p.file_path).name}"
              for p in submission.photos}

    return templates.TemplateResponse("result.html", {
        "request": request,
        "submission": submission,
        "result": submission.result,
        "photos": photos,
    })


# ─── API ──────────────────────────────────────────────────────────────────────

@router.post("/api/submit")
async def api_submit(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    name: str = Form(...),
    gender: str = Form(...),
    height_cm: float = Form(...),
    date_of_birth: Optional[str] = Form(None),
    nationality: Optional[str] = Form(None),
    weight_kg: Optional[float] = Form(None),
    bust_cm: Optional[float] = Form(None),
    waist_cm: Optional[float] = Form(None),
    hips_cm: Optional[float] = Form(None),
    inseam_cm: Optional[float] = Form(None),
    neck_cm: Optional[float] = Form(None),
    shoe_size_eu: Optional[float] = Form(None),
    dress_size: Optional[str] = Form(None),
    hair_color: Optional[str] = Form(None),
    eye_color: Optional[str] = Form(None),
    has_implants: bool = Form(False),
    body_front: Optional[UploadFile] = File(None),
    body_side: Optional[UploadFile] = File(None),
    face_front: Optional[UploadFile] = File(None),
    face_profile: Optional[UploadFile] = File(None),
    swimwear_front: Optional[UploadFile] = File(None),
    swimwear_side: Optional[UploadFile] = File(None),
):
    if not body_front or not face_front:
        raise HTTPException(status_code=400, detail="body_front and face_front photos are required")

    submission = Submission(
        name=name, gender=gender, height_cm=height_cm,
        date_of_birth=date_of_birth, nationality=nationality,
        weight_kg=weight_kg, bust_cm=bust_cm, waist_cm=waist_cm,
        hips_cm=hips_cm, inseam_cm=inseam_cm, neck_cm=neck_cm,
        shoe_size_eu=shoe_size_eu, dress_size=dress_size,
        hair_color=hair_color, eye_color=eye_color, has_implants=has_implants,
    )
    db.add(submission)
    db.flush()

    dest_dir = Path(settings.UPLOAD_DIR) / str(submission.id)
    dest_dir.mkdir(parents=True, exist_ok=True)

    photo_inputs = {
        "body_front": body_front,
        "body_side": body_side,
        "face_front": face_front,
        "face_profile": face_profile,
        "swimwear_front": swimwear_front,
        "swimwear_side": swimwear_side,
    }

    for ptype, upload in photo_inputs.items():
        if upload and upload.filename:
            suffix = Path(upload.filename).suffix.lower()
            dest = dest_dir / f"{ptype}{suffix}"
            with open(dest, "wb") as f:
                shutil.copyfileobj(upload.file, f)
            db.add(Photo(submission_id=submission.id, photo_type=ptype, file_path=str(dest)))

    db.commit()

    background_tasks.add_task(_bg_process, submission.id)
    return JSONResponse({"status": "queued", "submission_id": submission.id})


@router.post("/api/batch/upload")
async def api_batch_upload(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    batch_name: str = Form(...),
    zip_file: UploadFile = File(...),
):
    if not zip_file.filename.endswith(".zip"):
        raise HTTPException(status_code=400, detail="File must be a .zip archive")

    batch = Batch(name=batch_name)
    db.add(batch)
    db.flush()

    zip_dir = Path(settings.UPLOAD_DIR) / "zips"
    zip_dir.mkdir(parents=True, exist_ok=True)
    zip_path = zip_dir / f"batch_{batch.id}.zip"

    with open(zip_path, "wb") as f:
        shutil.copyfileobj(zip_file.file, f)

    db.commit()
    background_tasks.add_task(_bg_batch, str(zip_path), batch.id)
    return JSONResponse({"status": "queued", "batch_id": batch.id})


@router.get("/api/batch/{batch_id}/status")
def batch_status(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404)
    return {
        "id": batch.id,
        "name": batch.name,
        "status": batch.status,
        "total": batch.total,
        "processed": batch.processed,
        "failed": batch.failed,
        "progress_pct": round((batch.processed + batch.failed) / batch.total * 100, 1) if batch.total else 0,
    }


@router.get("/api/submissions")
def list_submissions(db: Session = Depends(get_db), limit: int = 50, offset: int = 0):
    subs = db.query(Submission).order_by(Submission.created_at.desc()).offset(offset).limit(limit).all()
    return [_sub_summary(s) for s in subs]


@router.get("/api/submissions/{submission_id}")
def get_submission(submission_id: int, db: Session = Depends(get_db)):
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404)
    return _sub_detail(sub)


@router.delete("/api/submissions/{submission_id}")
def delete_submission(submission_id: int, db: Session = Depends(get_db)):
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404)
    upload_dir = Path(settings.UPLOAD_DIR) / str(submission_id)
    if upload_dir.exists():
        shutil.rmtree(upload_dir)
    db.delete(sub)
    db.commit()
    return {"status": "deleted"}


@router.delete("/api/batch/{batch_id}")
def delete_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    for sub in batch.submissions:
        upload_dir = Path(settings.UPLOAD_DIR) / str(sub.id)
        if upload_dir.exists():
            shutil.rmtree(upload_dir)
        db.delete(sub)
    db.delete(batch)
    db.commit()
    return {"status": "deleted"}


@router.post("/api/submissions/{submission_id}/reprocess")
def reprocess(submission_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404)
    if sub.result:
        db.delete(sub.result)
        db.commit()
    sub.status = "pending"
    sub.error_message = None
    db.commit()
    background_tasks.add_task(_bg_process, submission_id)
    return {"status": "reprocessing"}


@router.post("/api/test/run")
def run_test(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Load Lucky Blue Smith test data and run the full pipeline."""
    test_dir = BASE_DIR / "test_batch" / "Lucky_Blue_Smith"
    info_file = test_dir / "info.json"

    if not info_file.exists():
        raise HTTPException(status_code=404, detail="Test data not found at test_batch/Lucky_Blue_Smith/info.json")

    with open(info_file) as f:
        info = json.load(f)

    submission = Submission(
        name=info.get("name", "Lucky Blue Smith"),
        date_of_birth=info.get("date_of_birth"),
        gender=info.get("gender", "male"),
        nationality=info.get("nationality"),
        height_cm=float(info["height_cm"]),
        weight_kg=info.get("weight_kg"),
        bust_cm=info.get("bust_cm"),
        waist_cm=info.get("waist_cm"),
        hips_cm=info.get("hips_cm"),
        inseam_cm=info.get("inseam_cm"),
        neck_cm=info.get("neck_cm"),
        shoe_size_eu=info.get("shoe_size_eu"),
        dress_size=info.get("dress_size"),
        hair_color=info.get("hair_color"),
        eye_color=info.get("eye_color"),
        has_implants=info.get("has_implants", False),
    )
    db.add(submission)
    db.flush()

    dest_dir = Path(settings.UPLOAD_DIR) / str(submission.id)
    dest_dir.mkdir(parents=True, exist_ok=True)

    photo_map = {
        "body_front":   ["body_front.jpg", "body_front.jpeg", "body_front.png", "body_front.webp"],
        "body_side":    ["body_side.jpg",  "body_side.jpeg",  "body_side.png",  "body_side.webp"],
        "face_front":   ["face_front.jpg", "face_front.jpeg", "face_front.png", "face_front.webp"],
        "face_profile": ["face_profile.jpg","face_profile.jpeg","face_profile.png","face_profile.webp"],
        "swimwear_front":["swimwear_front.jpg","swimwear_front.jpeg","swimwear_front.webp"],
        "swimwear_side": ["swimwear_side.jpg","swimwear_side.jpeg","swimwear_side.webp"],
    }

    copied = []
    for ptype, candidates in photo_map.items():
        for candidate in candidates:
            src = test_dir / candidate
            if src.exists():
                dest = dest_dir / candidate
                shutil.copy2(src, dest)
                db.add(Photo(submission_id=submission.id, photo_type=ptype, file_path=str(dest)))
                copied.append(ptype)
                break

    db.commit()
    background_tasks.add_task(_bg_process, submission.id)

    return JSONResponse({
        "status": "queued",
        "submission_id": submission.id,
        "photos_loaded": copied,
        "model": info.get("name"),
    })


@router.get("/api/llm/status")
def llm_status_route():
    ok, model = llm_status()
    return {"available": ok, "model": model}


@router.post("/api/submissions/{submission_id}/regenerate-llm")
def regenerate_llm(submission_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub or not sub.result:
        raise HTTPException(status_code=404, detail="Submission or result not found")
    background_tasks.add_task(_bg_regen_llm, submission_id)
    return {"status": "regenerating"}


@router.get("/api/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    total = db.query(Submission).count()
    completed = db.query(Submission).filter(Submission.status == "completed").count()
    pending = db.query(Submission).filter(Submission.status.in_(["pending", "processing"])).count()
    failed = db.query(Submission).filter(Submission.status == "failed").count()
    return {"total": total, "completed": completed, "pending": pending, "failed": failed}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _bg_process(submission_id: int):
    from ..database import SessionLocal
    db = SessionLocal()
    try:
        process_submission(submission_id, db)
    finally:
        db.close()


def _bg_regen_llm(submission_id: int):
    from ..database import SessionLocal
    db = SessionLocal()
    try:
        sub = db.query(Submission).filter(Submission.id == submission_id).first()
        if not sub or not sub.result:
            return
        r = sub.result
        submission_dict = {"name": sub.name, "gender": sub.gender, "nationality": sub.nationality}
        result_dict = {
            "final_measurements": r.final_measurements or {},
            "facial_metrics": r.facial_metrics or {},
            "body_ratios": r.body_ratios or {},
            "eu_score": r.eu_score, "us_score": r.us_score, "asian_score": r.asian_score,
            "fashion_categories": r.fashion_categories or [],
            "strengths": r.strengths or [], "improvements": r.improvements or [],
            "overall_score": r.overall_score, "potential_verdict": r.potential_verdict,
            "body_shape": r.body_shape, "face_shape": r.face_shape,
            "age_at_submission": r.age_at_submission,
        }
        r.llm_narratives = llm_generate(submission_dict, result_dict)
        db.commit()
    finally:
        db.close()


def _bg_batch(zip_path: str, batch_id: int):
    from ..database import SessionLocal
    db = SessionLocal()
    try:
        process_batch_zip(zip_path, batch_id, db)
    finally:
        db.close()


def _sub_summary(s: Submission) -> dict:
    r = s.result
    return {
        "id": s.id, "name": s.name, "gender": s.gender,
        "height_cm": s.height_cm, "status": s.status,
        "batch_id": s.batch_id,
        "created_at": s.created_at.isoformat() if s.created_at else None,
        "eu_score": r.eu_score if r else None,
        "us_score": r.us_score if r else None,
        "asian_score": r.asian_score if r else None,
        "verdict": r.potential_verdict if r else None,
    }


def _sub_detail(s: Submission) -> dict:
    base = _sub_summary(s)
    r = s.result
    if r:
        base["result"] = {
            "final_measurements": r.final_measurements,
            "body_ratios": r.body_ratios,
            "body_shape": r.body_shape,
            "facial_metrics": r.facial_metrics,
            "face_shape": r.face_shape,
            "eu_breakdown": r.eu_breakdown,
            "us_breakdown": r.us_breakdown,
            "asian_breakdown": r.asian_breakdown,
            "fashion_categories": r.fashion_categories,
            "market_recommendation": r.market_recommendation,
            "overall_score": r.overall_score,
            "strengths": r.strengths,
            "improvements": r.improvements,
            "measurement_flags": r.measurement_flags,
            "llm_narratives": r.llm_narratives,
        }
    return base
