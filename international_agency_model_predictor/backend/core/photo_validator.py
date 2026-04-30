import cv2
import numpy as np
from pathlib import Path
from ..config import settings


class PhotoValidator:
    def __init__(self):
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )

    def validate(self, image_path: str, photo_type: str) -> dict:
        path = Path(image_path)
        result = {"is_valid": True, "issues": [], "quality_score": 100, "warnings": []}

        if not path.exists():
            return {"is_valid": False, "issues": ["File not found"], "quality_score": 0, "warnings": []}

        image = cv2.imread(str(path))
        if image is None:
            return {"is_valid": False, "issues": ["Cannot read image file"], "quality_score": 0, "warnings": []}

        h, w = image.shape[:2]
        result.update(self._check_resolution(h, w))
        result.update(self._check_brightness(image, result))
        result.update(self._check_blur(image, result))

        if photo_type in ("body_front", "body_side", "swimwear_front", "swimwear_side"):
            result.update(self._check_body_orientation(image, h, w, photo_type, result))
        elif photo_type in ("face_front", "face_profile"):
            result.update(self._check_face_presence(image, photo_type, result))

        result["quality_score"] = max(0, result["quality_score"])
        result["is_valid"] = len(result["issues"]) == 0
        return result

    def _check_resolution(self, h, w, result=None) -> dict:
        out = result or {"issues": [], "quality_score": 100, "warnings": []}
        min_dim = min(h, w)
        if min_dim < settings.MIN_IMAGE_RESOLUTION:
            out["issues"].append(f"Resolution too low ({min_dim}px on shortest side, minimum {settings.MIN_IMAGE_RESOLUTION}px)")
            out["quality_score"] -= 40
        elif min_dim < 1200:
            out["warnings"].append("Higher resolution recommended for better accuracy")
            out["quality_score"] -= 10
        return out

    def _check_brightness(self, image, result=None) -> dict:
        out = result or {"issues": [], "quality_score": 100, "warnings": []}
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        mean_brightness = np.mean(gray)
        if mean_brightness < 40:
            out["issues"].append("Image too dark — improve lighting before submitting")
            out["quality_score"] -= 30
        elif mean_brightness > 220:
            out["issues"].append("Image overexposed — reduce brightness or move away from direct light")
            out["quality_score"] -= 20
        elif mean_brightness < 80:
            out["warnings"].append("Low lighting may reduce measurement accuracy")
            out["quality_score"] -= 10
        return out

    def _check_blur(self, image, result=None) -> dict:
        out = result or {"issues": [], "quality_score": 100, "warnings": []}
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        if laplacian_var < 50:
            out["issues"].append("Image is too blurry — use a tripod or stable surface")
            out["quality_score"] -= 35
        elif laplacian_var < 100:
            out["warnings"].append("Slight blur detected — sharper images improve accuracy")
            out["quality_score"] -= 10
        return out

    def _check_body_orientation(self, image, h, w, photo_type, result=None) -> dict:
        out = result or {"issues": [], "quality_score": 100, "warnings": []}
        aspect_ratio = h / w
        if aspect_ratio < 1.2:
            out["warnings"].append("Image appears too wide — full body should be vertical/portrait orientation")
            out["quality_score"] -= 15
        if aspect_ratio < 0.8:
            out["issues"].append("Image must be portrait orientation for body photos")
            out["quality_score"] -= 20
        return out

    def _check_face_presence(self, image, photo_type, result=None) -> dict:
        out = result or {"issues": [], "quality_score": 100, "warnings": []}
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        if photo_type == "face_front":
            faces = self.face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(80, 80))
            if len(faces) == 0:
                out["warnings"].append("Face not clearly detected — ensure neutral expression and frontal view")
                out["quality_score"] -= 15
            elif len(faces) > 1:
                out["issues"].append("Multiple faces detected — only one person should be in the frame")
                out["quality_score"] -= 25
        return out
