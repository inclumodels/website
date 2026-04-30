import json
import shutil
import zipfile
from pathlib import Path
from datetime import datetime
from dateutil.relativedelta import relativedelta

from sqlalchemy.orm import Session

from ..config import settings
from ..models import Batch, Submission, Photo, AnalysisResult
from .llm_analyst import generate_all as llm_generate
from .photo_validator import PhotoValidator
from .body_analyzer import BodyAnalyzer
from .face_analyzer import FaceAnalyzer
from .standards_engine import StandardsEngine
from .fashion_predictor import FashionPredictor

validator = PhotoValidator()
body_analyzer = BodyAnalyzer()
face_analyzer = FaceAnalyzer()
standards_engine = StandardsEngine()
fashion_predictor = FashionPredictor()


def process_submission(submission_id: int, db: Session) -> None:
    submission = db.query(Submission).filter(Submission.id == submission_id).first()
    if not submission:
        return

    submission.status = "processing"
    db.commit()

    try:
        result = _run_pipeline(submission, db)
        db.add(result)
        submission.status = "completed"

        if submission.batch_id:
            _update_batch_progress(submission.batch_id, db, success=True)

        db.commit()
    except Exception as exc:
        submission.status = "failed"
        submission.error_message = str(exc)

        if submission.batch_id:
            _update_batch_progress(submission.batch_id, db, success=False)

        db.commit()
        raise


def _run_pipeline(submission: Submission, db: Session) -> AnalysisResult:
    photos = {p.photo_type: p.file_path for p in submission.photos}

    # --- Photo validation ---
    for ptype, ppath in photos.items():
        v = validator.validate(ppath, ptype)
        photo_rec = db.query(Photo).filter(
            Photo.submission_id == submission.id,
            Photo.photo_type == ptype
        ).first()
        if photo_rec:
            photo_rec.is_valid = v["is_valid"]
            photo_rec.validation_notes = "; ".join(v.get("issues", []) + v.get("warnings", []))

    # --- Body analysis ---
    front_data, side_data, circs = {}, {}, {}
    if "body_front" in photos:
        front_data = body_analyzer.analyze_front(photos["body_front"], submission.height_cm)
    if "body_side" in photos:
        side_data = body_analyzer.analyze_side(photos["body_side"], submission.height_cm)
    if front_data and side_data and "error" not in front_data and "error" not in side_data:
        circs = body_analyzer.compute_circumferences(front_data, side_data)

    photo_measurements = {**front_data, **side_data, **circs}
    photo_measurements.pop("error", None)

    # --- Confirmed (self-reported) measurements ---
    confirmed = {
        "height_cm":  submission.height_cm,
        "weight_kg":  submission.weight_kg,
        "bust_cm":    submission.bust_cm,
        "waist_cm":   submission.waist_cm,
        "hips_cm":    submission.hips_cm,
        "inseam_cm":  submission.inseam_cm,
        "neck_cm":    submission.neck_cm,
        "shoe_size":  submission.shoe_size_eu,
        "dress_size": submission.dress_size,
    }

    # --- Merge: prefer self-reported circumferences, supplement with photo data ---
    final_measurements = {**photo_measurements}
    measurement_flags = {}

    circ_keys = [("bust_cm", "bust_circ_cm"), ("waist_cm", "waist_circ_cm"), ("hips_cm", "hip_circ_cm")]
    for self_key, photo_key in circ_keys:
        self_val = confirmed.get(self_key)
        photo_val = photo_measurements.get(photo_key)
        if self_val:
            final_measurements[self_key] = self_val
            if photo_val and abs(self_val - photo_val) > settings.MEASUREMENT_MISMATCH_THRESHOLD_CM:
                measurement_flags[self_key] = {
                    "self_reported": self_val,
                    "photo_estimate": photo_val,
                    "diff_cm": round(abs(self_val - photo_val), 1),
                    "flag": "mismatch"
                }
        elif photo_val:
            final_measurements[self_key] = photo_val

    final_measurements["height_cm"] = submission.height_cm
    if submission.weight_kg:
        final_measurements["weight_kg"] = submission.weight_kg
        bmi = submission.weight_kg / ((submission.height_cm / 100) ** 2)
        final_measurements["bmi"] = round(bmi, 1)

    # --- Body ratios ---
    ratios = {}
    if not front_data.get("error"):
        ratios = body_analyzer.compute_ratios(front_data, submission.height_cm)

    final_measurements["body_ratios"] = ratios

    # --- Facial analysis ---
    facial_metrics = {}
    face_shape = "Unknown"
    if "face_front" in photos:
        facial_metrics = face_analyzer.analyze(photos["face_front"])
        if "error" not in facial_metrics:
            face_shape = facial_metrics.pop("face_shape", "Unknown")

    # --- Age ---
    age = None
    if submission.date_of_birth:
        try:
            dob = datetime.strptime(submission.date_of_birth, "%Y-%m-%d")
            age = relativedelta(datetime.utcnow(), dob).years
        except Exception:
            pass

    # --- Market scoring ---
    scores = standards_engine.score_all_markets(
        final_measurements, facial_metrics, age, submission.gender
    )

    # --- Fashion prediction ---
    fashion_cats = fashion_predictor.predict(
        final_measurements, facial_metrics, scores, age, submission.gender
    )

    # --- Strengths & improvements ---
    strengths, improvements = standards_engine.strengths_and_improvements(
        scores["eu_breakdown"], scores["us_breakdown"], scores["asian_breakdown"],
        scores["eu_notes"], scores["us_notes"], scores["asian_notes"],
    )

    # --- Overall score ---
    best_market = max(scores["eu_score"], scores["us_score"], scores["asian_score"])
    face_composite = (
        facial_metrics.get("golden_ratio_score", 50) * 0.5 +
        facial_metrics.get("symmetry_score", 50) * 0.5
    ) if facial_metrics else 50.0

    overall = round(best_market * 0.50 + face_composite * 0.30 + min(best_market, 100) * 0.20, 1)
    verdict = standards_engine.verdict(scores["eu_score"], scores["us_score"], scores["asian_score"])

    market_rec = {
        "EU (Paris/Milan)": {"score": scores["eu_score"], "recommended": scores["eu_score"] >= 65},
        "US (New York)":    {"score": scores["us_score"], "recommended": scores["us_score"] >= 65},
        "Asia (Tokyo/Seoul/Shanghai)": {"score": scores["asian_score"], "recommended": scores["asian_score"] >= 65},
    }

    submission_dict = {
        "name": submission.name, "gender": submission.gender,
        "nationality": submission.nationality,
    }
    result_dict = {
        "final_measurements": final_measurements,
        "facial_metrics": facial_metrics,
        "body_ratios": ratios,
        "eu_score": scores["eu_score"], "us_score": scores["us_score"],
        "asian_score": scores["asian_score"],
        "fashion_categories": fashion_cats,
        "strengths": strengths, "improvements": improvements,
        "overall_score": overall, "potential_verdict": verdict,
        "body_shape": ratios.get("body_shape"), "face_shape": face_shape,
        "age_at_submission": age,
    }
    llm_narratives = llm_generate(submission_dict, result_dict)

    return AnalysisResult(
        submission_id=submission.id,
        photo_measurements=photo_measurements,
        confirmed_measurements={k: v for k, v in confirmed.items() if v is not None},
        final_measurements={k: v for k, v in final_measurements.items() if v is not None},
        measurement_flags=measurement_flags,
        body_ratios=ratios,
        body_shape=ratios.get("body_shape", "Unknown"),
        facial_metrics=facial_metrics,
        face_shape=face_shape,
        eu_score=scores["eu_score"],
        us_score=scores["us_score"],
        asian_score=scores["asian_score"],
        eu_breakdown=scores["eu_breakdown"],
        us_breakdown=scores["us_breakdown"],
        asian_breakdown=scores["asian_breakdown"],
        eu_notes=scores["eu_notes"],
        us_notes=scores["us_notes"],
        asian_notes=scores["asian_notes"],
        fashion_categories=fashion_cats,
        market_recommendation=market_rec,
        overall_score=overall,
        potential_verdict=verdict,
        strengths=strengths,
        improvements=improvements,
        age_at_submission=age,
        llm_narratives=llm_narratives,
    )


def process_batch_zip(zip_path: str, batch_id: int, db: Session) -> None:
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        return

    batch.status = "processing"
    db.commit()

    extract_dir = Path(settings.UPLOAD_DIR) / f"batch_{batch_id}_extract"
    extract_dir.mkdir(parents=True, exist_ok=True)

    try:
        with zipfile.ZipFile(zip_path, "r") as zf:
            zf.extractall(extract_dir)
    except Exception as exc:
        batch.status = "failed"
        db.commit()
        raise RuntimeError(f"Failed to extract ZIP: {exc}")

    model_folders = [d for d in extract_dir.iterdir() if d.is_dir()]

    # Handle the common case where a folder was zipped (adds a wrapper directory)
    if len(model_folders) == 1 and not (model_folders[0] / "info.json").exists():
        model_folders = [d for d in model_folders[0].iterdir() if d.is_dir()]

    batch.total = len(model_folders)
    db.commit()

    for folder in model_folders:
        try:
            _create_submission_from_folder(folder, batch_id, db)
        except Exception as exc:
            batch.failed += 1
            db.commit()

    if batch.total == 0:
        batch.status = "failed"
    elif batch.failed == batch.total:
        batch.status = "failed"
    else:
        batch.status = "completed"
    db.commit()


def _create_submission_from_folder(folder: Path, batch_id: int, db: Session) -> None:
    info_file = folder / "info.json"
    if not info_file.exists():
        raise FileNotFoundError(f"info.json missing in {folder.name}")

    with open(info_file) as f:
        info = json.load(f)

    submission = Submission(
        batch_id=batch_id,
        name=info.get("name", folder.name),
        date_of_birth=info.get("date_of_birth"),
        gender=info.get("gender", "female"),
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
        "body_front":     ["body_front.jpg", "body_front.jpeg", "body_front.png"],
        "body_side":      ["body_side.jpg", "body_side.jpeg", "body_side.png"],
        "face_front":     ["face_front.jpg", "face_front.jpeg", "face_front.png"],
        "face_profile":   ["face_profile.jpg", "face_profile.jpeg", "face_profile.png"],
        "swimwear_front": ["swimwear_front.jpg", "swimwear_front.jpeg"],
        "swimwear_side":  ["swimwear_side.jpg", "swimwear_side.jpeg"],
    }

    for ptype, candidates in photo_map.items():
        for candidate in candidates:
            src = folder / candidate
            if src.exists():
                dest = dest_dir / candidate
                shutil.copy2(src, dest)
                photo = Photo(
                    submission_id=submission.id,
                    photo_type=ptype,
                    file_path=str(dest),
                )
                db.add(photo)
                break

    db.commit()
    process_submission(submission.id, db)


def _update_batch_progress(batch_id: int, db: Session, success: bool) -> None:
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        return
    if success:
        batch.processed += 1
    else:
        batch.failed += 1
    if batch.processed + batch.failed >= batch.total:
        batch.status = "completed"
    db.commit()
