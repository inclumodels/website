"""
Standards Engine — Exact International Agency Measurement Standards

Sources: Elite Model Management (EU), IMG Models (US), Next/Storm (US),
Donna Models (Japan), ESteem (Korea), Elite Shanghai (China).

Scoring is strict: penalties are steep outside the accepted range so scores
reflect real agency acceptance thresholds, not loose approximations.
"""

from __future__ import annotations


# ── Standard Definition Helper ───────────────────────────────────────────────

def _s(low, high, weight, unit, label, penalty):
    """
    low/high  — accepted range
    weight    — contribution to total market score
    unit      — display unit (cm, %, or '' for ratios)
    label     — human-readable component name
    penalty   — score points lost per 1 unit outside range
    """
    return dict(low=low, high=high, weight=weight,
                unit=unit, label=label, penalty=penalty)


# ── EU — Paris / Milan (Elite, Next, Storm) ──────────────────────────────────

EU_FEMALE = {
    "height":       _s(175, 180, 0.22, "cm", "Height",              12),
    "waist":        _s( 60,  64, 0.20, "cm", "Waist",               15),
    "bust":         _s( 81,  86, 0.10, "cm", "Bust",                 8),
    "hips":         _s( 86,  91, 0.10, "cm", "Hips",                 8),
    "inseam":       _s( 80,  95, 0.06, "cm", "Inseam",               6),
    "wh_ratio":     _s(0.67, 0.72, 0.06, "",  "Waist / Hip Ratio",  220),
    "leg_ratio":    _s(0.50, 0.55, 0.05, "",  "Leg / Height Ratio", 180),
    "symmetry":     _s( 80, 100, 0.09, "%",  "Facial Symmetry",      4),
    "golden_ratio": _s( 72, 100, 0.07, "%",  "Golden Ratio",         3),
    "skin":         _s( 65, 100, 0.05, "%",  "Skin Clarity",         2),
}

EU_MALE = {
    "height":       _s(185, 192, 0.24, "cm", "Height",              12),
    "waist":        _s( 76,  82, 0.18, "cm", "Waist",               12),
    "chest":        _s( 94, 101, 0.12, "cm", "Chest",                8),
    "hips":         _s( 94,  99, 0.09, "cm", "Hips",                 7),
    "inseam":       _s( 85,  98, 0.06, "cm", "Inseam",               5),
    "sh_ratio":     _s(1.35, 1.50, 0.07, "", "Shoulder / Hip Ratio",160),
    "leg_ratio":    _s(0.50, 0.55, 0.05, "", "Leg / Height Ratio",  160),
    "symmetry":     _s( 78, 100, 0.08, "%",  "Facial Symmetry",      4),
    "golden_ratio": _s( 70, 100, 0.07, "%",  "Golden Ratio",         3),
    "skin":         _s( 60, 100, 0.04, "%",  "Skin Clarity",         2),
}


# ── US — New York (IMG, Wilhelmina, DNA) ─────────────────────────────────────

US_FEMALE = {
    "height":       _s(173, 180, 0.20, "cm", "Height",              10),
    "waist":        _s( 61,  66, 0.18, "cm", "Waist",               12),
    "bust":         _s( 81,  91, 0.10, "cm", "Bust",                 6),
    "hips":         _s( 86,  94, 0.10, "cm", "Hips",                 6),
    "inseam":       _s( 79,  95, 0.06, "cm", "Inseam",               5),
    "wh_ratio":     _s(0.67, 0.74, 0.06, "", "Waist / Hip Ratio",   200),
    "leg_ratio":    _s(0.49, 0.55, 0.06, "", "Leg / Height Ratio",  160),
    "symmetry":     _s( 78, 100, 0.10, "%",  "Facial Symmetry",      4),
    "golden_ratio": _s( 70, 100, 0.08, "%",  "Golden Ratio",         3),
    "skin":         _s( 62, 100, 0.06, "%",  "Skin Clarity",         2),
}

US_MALE = {
    "height":       _s(183, 191, 0.22, "cm", "Height",              10),
    "waist":        _s( 76,  86, 0.16, "cm", "Waist",               10),
    "chest":        _s( 97, 107, 0.12, "cm", "Chest",                6),
    "hips":         _s( 94, 102, 0.09, "cm", "Hips",                 6),
    "inseam":       _s( 83,  97, 0.06, "cm", "Inseam",               5),
    "sh_ratio":     _s(1.30, 1.50, 0.07, "", "Shoulder / Hip Ratio",140),
    "leg_ratio":    _s(0.48, 0.55, 0.07, "", "Leg / Height Ratio",  140),
    "symmetry":     _s( 76, 100, 0.08, "%",  "Facial Symmetry",      4),
    "golden_ratio": _s( 68, 100, 0.07, "%",  "Golden Ratio",         3),
    "skin":         _s( 58, 100, 0.06, "%",  "Skin Clarity",         2),
}


# ── Asia — Tokyo / Seoul / Shanghai ──────────────────────────────────────────

ASIAN_FEMALE = {
    "height":       _s(168, 175, 0.22, "cm", "Height",              12),
    "waist":        _s( 58,  63, 0.20, "cm", "Waist",               15),
    "bust":         _s( 79,  86, 0.10, "cm", "Bust",                 7),
    "hips":         _s( 83,  89, 0.10, "cm", "Hips",                 8),
    "inseam":       _s( 76,  92, 0.06, "cm", "Inseam",               5),
    "wh_ratio":     _s(0.65, 0.72, 0.06, "", "Waist / Hip Ratio",   220),
    "leg_ratio":    _s(0.48, 0.54, 0.05, "", "Leg / Height Ratio",  160),
    "symmetry":     _s( 82, 100, 0.09, "%",  "Facial Symmetry",      4),
    "golden_ratio": _s( 74, 100, 0.07, "%",  "Golden Ratio",         3),
    "skin":         _s( 72, 100, 0.05, "%",  "Skin Clarity",         2),
}

ASIAN_MALE = {
    "height":       _s(180, 188, 0.24, "cm", "Height",              12),
    "waist":        _s( 74,  82, 0.18, "cm", "Waist",               12),
    "chest":        _s( 92, 100, 0.12, "cm", "Chest",                7),
    "hips":         _s( 90,  97, 0.09, "cm", "Hips",                 7),
    "inseam":       _s( 82,  96, 0.06, "cm", "Inseam",               5),
    "sh_ratio":     _s(1.30, 1.48, 0.06, "", "Shoulder / Hip Ratio",150),
    "leg_ratio":    _s(0.48, 0.54, 0.04, "", "Leg / Height Ratio",  150),
    "symmetry":     _s( 80, 100, 0.08, "%",  "Facial Symmetry",      4),
    "golden_ratio": _s( 72, 100, 0.07, "%",  "Golden Ratio",         3),
    "skin":         _s( 68, 100, 0.05, "%",  "Skin Clarity",         2),
}


# ── Scoring ──────────────────────────────────────────────────────────────────

def _fmt(value, unit: str) -> str:
    if unit == "cm":
        return f"{round(value, 1)} cm"
    if unit == "%":
        return f"{round(value, 1)}%"
    return f"{round(value, 2)}"


def _score_component(value, std: dict) -> tuple[int | None, str | None]:
    """
    Returns (score 0-100, plain-English explanation note).
    100 = within accepted range. Steep linear penalty outside.
    """
    if value is None:
        return None, None

    low, high = std["low"], std["high"]
    label     = std["label"]
    unit      = std["unit"]
    penalty   = std["penalty"]
    val_str   = _fmt(value, unit)
    low_str   = _fmt(low, unit)
    high_str  = _fmt(high, unit)
    range_str = f"{low_str} – {high_str}"

    if low <= value <= high:
        score = 100
        mid = (low + high) / 2
        if abs(value - mid) <= (high - low) * 0.25:
            note = (
                f"{label} of {val_str} is ideal — perfectly centred within "
                f"the {range_str} agency standard."
            )
        else:
            note = (
                f"{label} of {val_str} meets the {range_str} standard."
            )
    elif value < low:
        diff  = low - value
        score = max(0, round(100 - diff * penalty))
        if score >= 80:
            note = (
                f"{label} of {val_str} is {_fmt(diff, unit)} below the "
                f"{low_str} minimum — borderline acceptable."
            )
        elif score >= 50:
            note = (
                f"{label} of {val_str} falls short of the {low_str} minimum "
                f"required by this market by {_fmt(diff, unit)}."
            )
        else:
            note = (
                f"{label} of {val_str} does not meet the {range_str} standard. "
                f"The shortfall of {_fmt(diff, unit)} below minimum is outside agency tolerance."
            )
    else:
        diff  = value - high
        score = max(0, round(100 - diff * penalty))
        if score >= 80:
            note = (
                f"{label} of {val_str} is {_fmt(diff, unit)} above the "
                f"{high_str} maximum — borderline acceptable."
            )
        elif score >= 50:
            note = (
                f"{label} of {val_str} exceeds the {high_str} maximum for "
                f"this market by {_fmt(diff, unit)}."
            )
        else:
            note = (
                f"{label} of {val_str} significantly exceeds the {range_str} standard. "
                f"Agencies in this market require a {_fmt(diff, unit)} reduction."
            )

    return score, note


# ── Engine ───────────────────────────────────────────────────────────────────

class StandardsEngine:

    def score_all_markets(
        self,
        measurements: dict,
        facial: dict,
        age: int | None,
        gender: str,
    ) -> dict:
        gender_key = (gender or "female").lower()
        if gender_key == "male":
            eu_std, us_std, asian_std = EU_MALE, US_MALE, ASIAN_MALE
        else:
            eu_std, us_std, asian_std = EU_FEMALE, US_FEMALE, ASIAN_FEMALE

        ratios = measurements.get("body_ratios") or {}

        eu_score,    eu_bd,    eu_notes    = self._score_market(eu_std,    measurements, facial, ratios)
        us_score,    us_bd,    us_notes    = self._score_market(us_std,    measurements, facial, ratios)
        asian_score, asian_bd, asian_notes = self._score_market(asian_std, measurements, facial, ratios)

        if age is not None:
            f = self._age_factor(age, gender_key)
            eu_score    = round(eu_score    * f, 1)
            us_score    = round(us_score    * f, 1)
            asian_score = round(asian_score * f, 1)

        return {
            "eu_score":    eu_score,
            "us_score":    us_score,
            "asian_score": asian_score,
            "eu_breakdown":    eu_bd,
            "us_breakdown":    us_bd,
            "asian_breakdown": asian_bd,
            "eu_notes":    eu_notes,
            "us_notes":    us_notes,
            "asian_notes": asian_notes,
        }

    def _score_market(
        self,
        standards: dict,
        measurements: dict,
        facial: dict,
        ratios: dict,
    ) -> tuple[float, dict, dict]:

        value_map = {
            "height":       measurements.get("height_cm"),
            "bust":         measurements.get("bust_cm"),
            "chest":        measurements.get("bust_cm"),
            "waist":        measurements.get("waist_cm"),
            "hips":         measurements.get("hips_cm"),
            "inseam":       measurements.get("inseam_cm"),
            "symmetry":     (facial or {}).get("symmetry_score"),
            "golden_ratio": (facial or {}).get("golden_ratio_score"),
            "skin":         (facial or {}).get("skin_clarity_score"),
            "wh_ratio":     (ratios or {}).get("waist_to_hip"),
            "sh_ratio":     (ratios or {}).get("shoulder_to_hip"),
            "leg_ratio":    (ratios or {}).get("leg_to_height"),
        }

        scores       = {}
        notes        = {}
        weighted_sum = 0.0
        total_weight = 0.0

        for key, std in standards.items():
            value = value_map.get(key)
            score, note = _score_component(value, std)
            if score is None:
                continue
            scores[key] = score
            notes[key]  = note
            weighted_sum += score * std["weight"]
            total_weight += std["weight"]

        total = round(weighted_sum / total_weight, 1) if total_weight > 0 else 0.0
        return total, scores, notes

    @staticmethod
    def _age_factor(age: int, gender: str) -> float:
        if gender == "male":
            if 18 <= age <= 28:
                return 1.0
            if age < 16 or age > 35:
                return 0.75
            return max(0.80, 1.0 - max(0, age - 28) * 0.022)
        else:
            if 15 <= age <= 25:
                return 1.0
            if age < 14 or age > 32:
                return 0.75
            return max(0.80, 1.0 - max(0, age - 25) * 0.025)

    def verdict(self, eu: float, us: float, asian: float) -> str:
        best = max(eu or 0, us or 0, asian or 0)
        if best >= 82:
            return "Strong Potential"
        if best >= 68:
            return "Moderate Potential"
        if best >= 52:
            return "Developing"
        return "Not Recommended"

    def strengths_and_improvements(
        self,
        eu_bd: dict, us_bd: dict, asian_bd: dict,
        eu_notes: dict, us_notes: dict, asian_notes: dict,
    ) -> tuple[list, list]:
        all_keys = set(eu_bd) | set(us_bd) | set(asian_bd)

        avg_scores = {}
        best_notes = {}

        for key in all_keys:
            vals = [bd[key] for bd in (eu_bd, us_bd, asian_bd) if key in bd]
            if not vals:
                continue
            avg_scores[key] = sum(vals) / len(vals)

            scored = [
                ("eu",    eu_bd.get(key, 0),    eu_notes.get(key)),
                ("us",    us_bd.get(key, 0),    us_notes.get(key)),
                ("asian", asian_bd.get(key, 0), asian_notes.get(key)),
            ]
            best = max(scored, key=lambda x: x[1])
            best_notes[key] = best[2] or ""

        sorted_items = sorted(avg_scores.items(), key=lambda x: x[1], reverse=True)

        strengths    = []
        improvements = []

        for key, avg in sorted_items:
            note = best_notes.get(key, "")
            if not note:
                continue
            if avg >= 85:
                strengths.append(note)
            elif avg < 55:
                improvements.append(note)

        return strengths[:5], improvements[:4]
