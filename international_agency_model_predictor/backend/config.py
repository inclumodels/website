import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings:
    APP_NAME = "IncluhubPredict"
    APP_VERSION = "1.0.0"

    DATABASE_URL = f"sqlite:///{BASE_DIR}/data/predictor.db"

    UPLOAD_DIR = BASE_DIR / "uploads"
    ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
    MAX_FILE_SIZE_MB = 20

    MIN_IMAGE_RESOLUTION = 800
    MIN_PERSON_FRAME_COVERAGE = 0.45

    PHOTO_TYPES = [
        "body_front",
        "body_side",
        "face_front",
        "face_profile",
        "swimwear_front",
        "swimwear_side",
    ]
    REQUIRED_PHOTO_TYPES = ["body_front", "body_side", "face_front", "face_profile"]

    MEASUREMENT_MISMATCH_THRESHOLD_CM = 7.0

    GENDER_FEMALE = "female"
    GENDER_MALE = "male"

settings = Settings()
