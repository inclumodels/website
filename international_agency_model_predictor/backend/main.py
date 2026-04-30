from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .config import settings
from .api.routes import router, templates

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)


def _score_class(score):
    if score is None:
        return "score-none"
    if score >= 75:
        return "score-high"
    if score >= 55:
        return "score-mid"
    return "score-low"


def _score_bar_class(score):
    if score is None:
        return "bg-secondary"
    if score >= 75:
        return "bg-success"
    if score >= 55:
        return "bg-warning"
    return "bg-danger"


templates.env.globals["score_class"] = _score_class
templates.env.globals["score_bar_class"] = _score_bar_class

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = Path(__file__).resolve().parent.parent / "frontend" / "static"
UPLOAD_DIR = settings.UPLOAD_DIR

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.include_router(router)


@app.on_event("startup")
def startup():
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    init_db()
