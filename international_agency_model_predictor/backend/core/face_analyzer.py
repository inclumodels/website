import cv2
import numpy as np
import mediapipe as mp
from typing import Optional


class FaceAnalyzer:
    # MediaPipe FaceMesh landmark indices
    FOREHEAD_TOP = 10
    CHIN_BOTTOM = 152
    LEFT_FACE = 234
    RIGHT_FACE = 454

    LEFT_EYE_OUTER = 33
    LEFT_EYE_INNER = 133
    RIGHT_EYE_INNER = 362
    RIGHT_EYE_OUTER = 263
    LEFT_EYE_TOP = 159
    LEFT_EYE_BOTTOM = 145
    RIGHT_EYE_TOP = 386
    RIGHT_EYE_BOTTOM = 374

    NOSE_TIP = 4
    NOSE_BASE = 94
    LEFT_NOSTRIL = 129
    RIGHT_NOSTRIL = 358
    NOSE_BRIDGE = 168

    MOUTH_LEFT = 61
    MOUTH_RIGHT = 291
    UPPER_LIP = 13
    LOWER_LIP = 14

    LEFT_JAW = 172
    RIGHT_JAW = 397
    LEFT_CHEEK = 116
    RIGHT_CHEEK = 345

    LEFT_EYEBROW_OUTER = 70
    LEFT_EYEBROW_INNER = 107
    RIGHT_EYEBROW_OUTER = 300
    RIGHT_EYEBROW_INNER = 336

    PHI = 1.618033988749895

    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh

    def analyze(self, image_path: str) -> dict:
        image = cv2.imread(image_path)
        if image is None:
            return {"error": "Cannot read image"}

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        h, w = image.shape[:2]

        with self.mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.4,
        ) as mesh:
            results = mesh.process(image_rgb)

        if not results.multi_face_landmarks:
            return {"error": "No face detected. Ensure face is clearly visible with even lighting."}

        lms = results.multi_face_landmarks[0].landmark

        def pt(idx):
            l = lms[idx]
            return np.array([l.x * w, l.y * h])

        metrics = {}

        # --- Dimensions ---
        face_height = float(np.linalg.norm(pt(self.FOREHEAD_TOP) - pt(self.CHIN_BOTTOM)))
        face_width = float(np.linalg.norm(pt(self.LEFT_FACE) - pt(self.RIGHT_FACE)))
        eye_width_left = float(np.linalg.norm(pt(self.LEFT_EYE_OUTER) - pt(self.LEFT_EYE_INNER)))
        eye_width_right = float(np.linalg.norm(pt(self.RIGHT_EYE_INNER) - pt(self.RIGHT_EYE_OUTER)))
        eye_spacing = float(np.linalg.norm(pt(self.LEFT_EYE_INNER) - pt(self.RIGHT_EYE_INNER)))
        nose_width = float(np.linalg.norm(pt(self.LEFT_NOSTRIL) - pt(self.RIGHT_NOSTRIL)))
        nose_length = float(np.linalg.norm(pt(self.NOSE_BRIDGE) - pt(self.NOSE_TIP)))
        mouth_width = float(np.linalg.norm(pt(self.MOUTH_LEFT) - pt(self.MOUTH_RIGHT)))
        jaw_width = float(np.linalg.norm(pt(self.LEFT_JAW) - pt(self.RIGHT_JAW)))
        cheekbone_width = float(np.linalg.norm(pt(self.LEFT_CHEEK) - pt(self.RIGHT_CHEEK)))
        forehead_width = float(np.linalg.norm(pt(self.LEFT_EYEBROW_OUTER) - pt(self.RIGHT_EYEBROW_OUTER)))
        philtrum_length = float(np.linalg.norm(pt(self.NOSE_BASE) - pt(self.UPPER_LIP)))

        # Ratios
        metrics["face_length_width_ratio"] = round(face_height / face_width, 3) if face_width > 0 else 0
        metrics["eye_spacing_ratio"] = round(eye_spacing / face_width, 3) if face_width > 0 else 0
        metrics["nose_width_ratio"] = round(nose_width / face_width, 3) if face_width > 0 else 0
        metrics["jaw_to_forehead_ratio"] = round(jaw_width / forehead_width, 3) if forehead_width > 0 else 0
        metrics["cheekbone_to_jaw_ratio"] = round(cheekbone_width / jaw_width, 3) if jaw_width > 0 else 0
        metrics["mouth_to_nose_ratio"] = round(mouth_width / nose_width, 3) if nose_width > 0 else 0

        # Face shape
        metrics["face_shape"] = self._classify_face_shape(
            face_height, face_width, jaw_width, forehead_width, cheekbone_width
        )

        # Golden ratio score
        metrics["golden_ratio_score"] = self._golden_ratio_score(
            face_height, face_width, eye_spacing, nose_width, mouth_width,
            nose_length, jaw_width, forehead_width
        )

        # Symmetry score
        metrics["symmetry_score"] = self._symmetry_score(lms, w, h)

        # Cheekbone prominence (relative to face width)
        metrics["cheekbone_prominence"] = round(cheekbone_width / face_width, 3) if face_width > 0 else 0

        # Skin clarity (basic texture roughness measure)
        metrics["skin_clarity_score"] = self._skin_clarity(image, lms, w, h)

        # Eye openness (height/width ratio)
        l_eye_h = float(np.linalg.norm(pt(self.LEFT_EYE_TOP) - pt(self.LEFT_EYE_BOTTOM)))
        r_eye_h = float(np.linalg.norm(pt(self.RIGHT_EYE_TOP) - pt(self.RIGHT_EYE_BOTTOM)))
        avg_eye_h = (l_eye_h + r_eye_h) / 2
        avg_eye_w = (eye_width_left + eye_width_right) / 2
        metrics["eye_openness_ratio"] = round(avg_eye_h / avg_eye_w, 3) if avg_eye_w > 0 else 0

        metrics["philtrum_length_ratio"] = round(philtrum_length / face_height, 3) if face_height > 0 else 0

        return metrics

    def _classify_face_shape(self, height, width, jaw, forehead, cheekbone) -> str:
        if width == 0:
            return "Unknown"
        hw_ratio = height / width
        jaw_fore = jaw / forehead if forehead > 0 else 1
        cb_jaw = cheekbone / jaw if jaw > 0 else 1

        if 1.3 <= hw_ratio <= 1.75 and 0.85 <= jaw_fore <= 1.05 and cb_jaw >= 1.05:
            return "Oval"
        elif hw_ratio < 1.20 and cb_jaw < 1.10:
            return "Round"
        elif hw_ratio < 1.30 and jaw_fore > 0.90 and cb_jaw < 1.15:
            return "Square"
        elif jaw_fore < 0.75 and cb_jaw >= 1.15:
            return "Heart"
        elif cb_jaw >= 1.20 and jaw_fore < 0.85:
            return "Diamond"
        elif hw_ratio > 1.75:
            return "Oblong"
        elif jaw_fore > 1.10:
            return "Triangle"
        return "Oval"

    def _golden_ratio_score(self, face_h, face_w, eye_spacing, nose_w,
                             mouth_w, nose_l, jaw_w, forehead_w) -> float:
        scores = []

        def ratio_score(actual, target, tolerance=0.15):
            diff = abs(actual - target) / target
            if diff <= tolerance:
                return 100.0
            elif diff <= tolerance * 3:
                return max(0, 100 - ((diff - tolerance) / (tolerance * 2)) * 100)
            return 0.0

        if face_w > 0:
            scores.append(ratio_score(face_h / face_w, self.PHI))

        if nose_w > 0:
            scores.append(ratio_score(face_w / nose_w, self.PHI * 2))

        if face_w > 0:
            scores.append(ratio_score(eye_spacing / face_w, 0.46))

        if eye_spacing > 0:
            scores.append(ratio_score(mouth_w / eye_spacing, 1.0))

        if nose_l > 0:
            scores.append(ratio_score(face_h / nose_l, self.PHI * 2.1))

        if jaw_w > 0 and forehead_w > 0:
            scores.append(ratio_score(forehead_w / jaw_w, self.PHI * 0.62))

        return round(sum(scores) / len(scores), 1) if scores else 50.0

    def _symmetry_score(self, lms, w, h) -> float:
        # Center x of face
        center_x = (lms[self.LEFT_FACE].x + lms[self.RIGHT_FACE].x) / 2

        symmetric_pairs = [
            (self.LEFT_EYE_OUTER, self.RIGHT_EYE_OUTER),
            (self.LEFT_EYE_INNER, self.RIGHT_EYE_INNER),
            (self.LEFT_NOSTRIL, self.RIGHT_NOSTRIL),
            (self.MOUTH_LEFT, self.MOUTH_RIGHT),
            (self.LEFT_JAW, self.RIGHT_JAW),
            (self.LEFT_CHEEK, self.RIGHT_CHEEK),
            (self.LEFT_EYEBROW_OUTER, self.RIGHT_EYEBROW_OUTER),
            (self.LEFT_EYEBROW_INNER, self.RIGHT_EYEBROW_INNER),
        ]

        diffs = []
        for l_idx, r_idx in symmetric_pairs:
            l_x = lms[l_idx].x
            r_x = lms[r_idx].x
            l_dist = abs(l_x - center_x)
            r_dist = abs(r_x - center_x)
            if l_dist + r_dist > 0:
                asymmetry = abs(l_dist - r_dist) / ((l_dist + r_dist) / 2)
                diffs.append(asymmetry)

        if not diffs:
            return 75.0

        avg_asymmetry = np.mean(diffs)
        score = max(0, 100 - avg_asymmetry * 300)
        return round(float(score), 1)

    def _skin_clarity(self, image, lms, w, h) -> float:
        try:
            nose_x = int(lms[self.NOSE_TIP].x * w)
            nose_y = int(lms[self.NOSE_TIP].y * h)
            size = max(20, int(w * 0.08))
            x1 = max(0, nose_x - size)
            x2 = min(w, nose_x + size)
            y1 = max(0, nose_y - size)
            y2 = min(h, nose_y + size)

            roi = image[y1:y2, x1:x2]
            if roi.size == 0:
                return 70.0

            gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            # Skin clarity inversely related to high-frequency texture noise
            blur = cv2.GaussianBlur(gray_roi, (5, 5), 0)
            diff = cv2.absdiff(gray_roi, blur)
            roughness = np.mean(diff)

            # Map roughness to 0-100 score (lower roughness = higher clarity)
            score = max(0, min(100, 100 - roughness * 3.5))
            return round(float(score), 1)
        except Exception:
            return 70.0
