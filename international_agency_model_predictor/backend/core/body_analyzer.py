import cv2
import numpy as np
import mediapipe as mp
from typing import Optional


class BodyAnalyzer:
    def __init__(self):
        self.mp_pose = mp.solutions.pose

    def analyze_front(self, image_path: str, height_cm: float) -> dict:
        return self._analyze(image_path, height_cm, view="front")

    def analyze_side(self, image_path: str, height_cm: float) -> dict:
        return self._analyze(image_path, height_cm, view="side")

    def _analyze(self, image_path: str, height_cm: float, view: str) -> dict:
        image = cv2.imread(image_path)
        if image is None:
            return {"error": "Cannot read image"}

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        h, w = image.shape[:2]

        with self.mp_pose.Pose(
            static_image_mode=True,
            model_complexity=2,
            enable_segmentation=True,
            min_detection_confidence=0.4,
        ) as pose:
            results = pose.process(image_rgb)

        if not results.pose_landmarks:
            return {"error": "No pose landmarks detected. Ensure full body is visible."}

        lms = results.pose_landmarks.landmark

        def px(idx):
            l = lms[idx]
            return np.array([l.x * w, l.y * h])

        def vis(idx):
            return lms[idx].visibility

        # Key landmark indices (MediaPipe Pose)
        NOSE = 0
        L_SHOULDER, R_SHOULDER = 11, 12
        L_HIP, R_HIP = 23, 24
        L_KNEE, R_KNEE = 25, 26
        L_ANKLE, R_ANKLE = 27, 28
        L_WRIST, R_WRIST = 15, 16
        L_ELBOW, R_ELBOW = 13, 14
        L_HEEL, R_HEEL = 29, 30

        nose = px(NOSE)
        l_shoulder = px(L_SHOULDER)
        r_shoulder = px(R_SHOULDER)
        l_hip = px(L_HIP)
        r_hip = px(R_HIP)
        l_ankle = px(L_ANKLE)
        r_ankle = px(R_ANKLE)
        l_knee = px(L_KNEE)
        r_knee = px(R_KNEE)
        l_wrist = px(L_WRIST)
        r_wrist = px(R_WRIST)

        ankle_mid = (l_ankle + r_ankle) / 2
        shoulder_mid = (l_shoulder + r_shoulder) / 2
        hip_mid = (l_hip + r_hip) / 2

        # Pixel height: top of head estimated as 8% above nose (average head proportion)
        head_top_y = nose[1] - (ankle_mid[1] - nose[1]) * 0.08
        pixel_height = ankle_mid[1] - head_top_y
        if pixel_height <= 0:
            return {"error": "Cannot calculate height from landmarks"}

        scale = height_cm / pixel_height  # cm per pixel

        def dist(p1, p2):
            return float(np.linalg.norm(p1 - p2) * scale)

        if view == "front":
            shoulder_width = dist(l_shoulder, r_shoulder)
            hip_width = dist(l_hip, r_hip)

            # Waist: use segmentation mask to find narrowest horizontal extent
            waist_width = self._estimate_waist_from_mask(
                results, image, l_shoulder, r_shoulder, l_hip, r_hip, w, h, scale
            )
            if waist_width is None:
                waist_width = dist(
                    (l_shoulder + l_hip) / 2,
                    (r_shoulder + r_hip) / 2
                ) * 0.92  # slight correction for narrowing

            leg_length = (dist(l_hip, l_ankle) + dist(r_hip, r_ankle)) / 2
            torso_length = (dist(l_shoulder, l_hip) + dist(r_shoulder, r_hip)) / 2
            arm_length = (dist(l_shoulder, l_wrist) + dist(r_shoulder, r_wrist)) / 2
            inseam = (dist(l_knee, l_ankle) + dist(r_knee, r_ankle)) / 2 + \
                     (dist(l_hip, l_knee) + dist(r_hip, r_knee)) / 2

            return {
                "view": "front",
                "scale_cm_per_px": round(scale, 4),
                "shoulder_width_cm": round(shoulder_width, 1),
                "hip_width_cm": round(hip_width, 1),
                "waist_width_cm": round(waist_width, 1),
                "leg_length_cm": round(leg_length, 1),
                "torso_length_cm": round(torso_length, 1),
                "arm_length_cm": round(arm_length, 1),
                "inseam_cm": round(inseam, 1),
            }

        else:  # side view — measure depth dimensions
            # In side view, horizontal distance represents body depth
            chest_depth = dist(l_shoulder, r_shoulder)  # landmarks shift; use as proxy
            waist_depth = dist(
                (l_shoulder + l_hip) / 2,
                (r_shoulder + r_hip) / 2,
            ) * 0.85
            hip_depth = dist(l_hip, r_hip)

            return {
                "view": "side",
                "scale_cm_per_px": round(scale, 4),
                "chest_depth_cm": round(chest_depth, 1),
                "waist_depth_cm": round(waist_depth, 1),
                "hip_depth_cm": round(hip_depth, 1),
            }

    def _estimate_waist_from_mask(self, results, image, l_shoulder, r_shoulder,
                                   l_hip, r_hip, w, h, scale) -> Optional[float]:
        if results.segmentation_mask is None:
            return None
        try:
            mask = results.segmentation_mask
            binary = (mask > 0.5).astype(np.uint8)

            shoulder_y = int((l_shoulder[1] + r_shoulder[1]) / 2)
            hip_y = int((l_hip[1] + r_hip[1]) / 2)

            if hip_y <= shoulder_y:
                return None

            # Search for narrowest width in the torso region (40%-65% from shoulder to hip)
            search_start = shoulder_y + int((hip_y - shoulder_y) * 0.40)
            search_end = shoulder_y + int((hip_y - shoulder_y) * 0.65)
            search_end = min(search_end, h - 1)

            min_width_px = float("inf")
            for row in range(search_start, search_end):
                row_data = binary[row, :]
                nonzero = np.nonzero(row_data)[0]
                if len(nonzero) > 10:
                    row_width = nonzero[-1] - nonzero[0]
                    if row_width < min_width_px:
                        min_width_px = row_width

            if min_width_px == float("inf"):
                return None
            return round(float(min_width_px) * scale, 1)
        except Exception:
            return None

    def compute_circumferences(self, front: dict, side: dict) -> dict:
        """Estimate circumferences using front width + side depth (ellipse model)."""
        circs = {}

        def ellipse_circ(width_cm, depth_cm):
            # Ramanujan's ellipse approximation
            a = width_cm / 2
            b = depth_cm / 2
            h = ((a - b) ** 2) / ((a + b) ** 2)
            return round(np.pi * (a + b) * (1 + (3 * h) / (10 + np.sqrt(4 - 3 * h))), 1)

        sw = front.get("shoulder_width_cm")
        cd = side.get("chest_depth_cm")
        if sw and cd:
            circs["bust_circ_cm"] = ellipse_circ(sw * 0.97, cd * 1.05)

        ww = front.get("waist_width_cm")
        wd = side.get("waist_depth_cm")
        if ww and wd:
            circs["waist_circ_cm"] = ellipse_circ(ww, wd)

        hw = front.get("hip_width_cm")
        hd = side.get("hip_depth_cm")
        if hw and hd:
            circs["hip_circ_cm"] = ellipse_circ(hw * 1.03, hd * 1.05)

        return circs

    def compute_ratios(self, front: dict, height_cm: float) -> dict:
        ratios = {}
        sw = front.get("shoulder_width_cm", 0)
        hw = front.get("hip_width_cm", 0)
        ww = front.get("waist_width_cm", 0)
        ll = front.get("leg_length_cm", 0)
        tl = front.get("torso_length_cm", 0)

        if hw > 0:
            ratios["shoulder_to_hip"] = round(sw / hw, 3)
            ratios["waist_to_hip"] = round(ww / hw, 3)
        if height_cm > 0:
            ratios["leg_to_height"] = round(ll / height_cm, 3)
            ratios["torso_to_height"] = round(tl / height_cm, 3)
        if sw > 0:
            ratios["waist_to_shoulder"] = round(ww / sw, 3)
        if tl > 0:
            ratios["leg_to_torso"] = round(ll / tl, 3)

        ratios["body_shape"] = self._classify_shape(sw, ww, hw)
        return ratios

    def _classify_shape(self, shoulder_w, waist_w, hip_w) -> str:
        if shoulder_w == 0 or waist_w == 0 or hip_w == 0:
            return "Unknown"
        s_h = shoulder_w / hip_w if hip_w > 0 else 1
        w_h = waist_w / hip_w if hip_w > 0 else 1
        w_s = waist_w / shoulder_w if shoulder_w > 0 else 1

        if 0.90 <= s_h <= 1.10 and w_h < 0.75:
            return "Hourglass"
        elif s_h > 1.10 and w_s < 0.80:
            return "Inverted Triangle"
        elif s_h < 0.90 and w_h < 0.85:
            return "Pear"
        elif w_h > 0.85 and w_s > 0.85:
            return "Rectangle"
        elif shoulder_w > hip_w * 1.05 and w_s > 0.78:
            return "Athletic"
        else:
            return "Oval"
