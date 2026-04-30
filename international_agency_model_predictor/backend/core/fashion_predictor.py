from typing import Optional


class FashionPredictor:

    CATEGORIES = [
        "High Fashion / Editorial",
        "Runway / Catwalk",
        "Commercial / Catalogue",
        "Fitness / Athletic",
        "Swimwear / Lingerie",
        "Plus-Size / Curve",
        "Petite",
        "Asian Commercial",
    ]

    def predict(self, measurements: dict, facial: dict, market_scores: dict,
                age: Optional[int], gender: str) -> list[dict]:
        is_female = gender.lower() == "female"
        results = []

        m = measurements
        f = facial

        height = m.get("height_cm", 0)
        waist  = m.get("waist_cm") or m.get("waist_circ_cm", 0) or 0
        hips   = m.get("hips_cm") or m.get("hip_circ_cm", 0) or 0
        bust   = m.get("bust_cm") or m.get("bust_circ_cm", 0) or 0
        sym    = f.get("symmetry_score", 0)
        golden = f.get("golden_ratio_score", 0)
        skin   = f.get("skin_clarity_score", 70)
        eu     = market_scores.get("eu_score", 0)
        us     = market_scores.get("us_score", 0)
        asian  = market_scores.get("asian_score", 0)

        body_ratios = m.get("body_ratios", {})
        leg_ratio   = body_ratios.get("leg_to_height", 0)
        whr         = body_ratios.get("waist_to_hip", 0)
        shoulder_hip = body_ratios.get("shoulder_to_hip", 0)

        for cat in self.CATEGORIES:
            score = self._score_category(
                cat, is_female, height, waist, hips, bust,
                sym, golden, skin, eu, us, asian,
                leg_ratio, whr, shoulder_hip, age or 0
            )
            if score > 0:
                results.append({
                    "category": cat,
                    "score": round(score, 1),
                    "fit": self._fit_label(score),
                })

        results.sort(key=lambda x: x["score"], reverse=True)
        return results

    def _score_category(self, cat, female, height, waist, hips, bust,
                         sym, golden, skin, eu, us, asian,
                         leg_ratio, whr, shoulder_hip, age) -> float:

        if cat == "High Fashion / Editorial":
            if female:
                h_score  = self._range_score(height, 175, 181, 5)
                w_score  = self._range_score(waist, 0, 62, 4) if waist else 50
                sym_s    = self._range_score(sym, 87, 100, 1)
                gold_s   = self._range_score(golden, 75, 100, 1)
                leg_s    = self._range_score(leg_ratio, 0.50, 1.0, 10) if leg_ratio else 50
                return (h_score * 0.30 + w_score * 0.20 + sym_s * 0.20 +
                        gold_s * 0.15 + leg_s * 0.10 + eu * 0.05)
            else:
                h_score  = self._range_score(height, 183, 189, 5)
                w_score  = self._range_score(waist, 0, 80, 4) if waist else 50
                sym_s    = self._range_score(sym, 85, 100, 1)
                gold_s   = self._range_score(golden, 72, 100, 1)
                return (h_score * 0.35 + w_score * 0.20 + sym_s * 0.20 +
                        gold_s * 0.15 + eu * 0.10)

        if cat == "Runway / Catwalk":
            h_min = 175 if female else 183
            h_score  = self._range_score(height, h_min, 185 if female else 191, 4)
            leg_s    = self._range_score(leg_ratio, 0.50, 1.0, 8) if leg_ratio else 50
            waist_s  = self._range_score(waist, 0, 64 if female else 82, 4) if waist else 50
            return (h_score * 0.40 + leg_s * 0.30 + waist_s * 0.20 + eu * 0.10)

        if cat == "Commercial / Catalogue":
            h_score  = self._range_score(height, 170 if female else 178, 182 if female else 188, 3)
            age_s    = self._range_score(age, 18, 35, 3) if age else 50
            sym_s    = self._range_score(sym, 75, 100, 1)
            return (h_score * 0.25 + us * 0.30 + age_s * 0.20 + sym_s * 0.25)

        if cat == "Fitness / Athletic":
            sh_score = self._range_score(shoulder_hip, 1.10, 1.40, 8) if shoulder_hip else 50
            h_score  = self._range_score(height, 168 if female else 178, 185 if female else 192, 3)
            return (sh_score * 0.45 + h_score * 0.30 + us * 0.25)

        if cat == "Swimwear / Lingerie":
            if female:
                whr_s  = self._range_score(whr, 0.65, 0.76, 10) if whr else 50
                bust_s = self._range_score(bust, 85, 95, 4) if bust else 50
                skin_s = self._range_score(skin, 75, 100, 1)
                return (whr_s * 0.35 + bust_s * 0.25 + skin_s * 0.20 + us * 0.20)
            else:
                sh_s   = self._range_score(shoulder_hip, 1.15, 1.45, 8) if shoulder_hip else 50
                skin_s = self._range_score(skin, 75, 100, 1)
                return (sh_s * 0.45 + skin_s * 0.25 + us * 0.30)

        if cat == "Plus-Size / Curve":
            if female:
                hip_s  = self._range_score(hips, 100, 130, 2) if hips else 0
                bust_s = self._range_score(bust, 100, 130, 2) if bust else 0
                sym_s  = self._range_score(sym, 78, 100, 1)
                if hip_s < 20 or bust_s < 20:
                    return 0.0
                return (hip_s * 0.35 + bust_s * 0.30 + sym_s * 0.20 + us * 0.15)
            return 0.0

        if cat == "Petite":
            if female:
                h_score = self._range_score(height, 155, 168, 4)
            else:
                h_score = self._range_score(height, 165, 178, 4)
            sym_s   = self._range_score(sym, 78, 100, 1)
            asian_s = asian
            return (h_score * 0.40 + sym_s * 0.25 + asian_s * 0.35)

        if cat == "Asian Commercial":
            skin_s  = self._range_score(skin, 78, 100, 1)
            gold_s  = self._range_score(golden, 75, 100, 1)
            return (asian * 0.40 + skin_s * 0.30 + gold_s * 0.30)

        return 0.0

    def _range_score(self, value, low, high, penalty_per_unit=5) -> float:
        if value is None or value == 0:
            return 50.0
        if low <= value <= high:
            return 100.0
        elif value < low:
            return max(0.0, 100.0 - (low - value) * penalty_per_unit)
        else:
            return max(0.0, 100.0 - (value - high) * penalty_per_unit)

    def _fit_label(self, score: float) -> str:
        if score >= 85:
            return "Excellent Fit"
        elif score >= 70:
            return "Good Fit"
        elif score >= 55:
            return "Moderate Fit"
        elif score >= 40:
            return "Possible Fit"
        else:
            return "Not Recommended"
