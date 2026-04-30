import httpx

OLLAMA_BASE = "http://localhost:11434"
PREFERRED = ["llama3.2", "llama3", "mistral", "gemma2", "gemma", "phi3", "phi"]


def is_available() -> tuple[bool, str]:
    try:
        r = httpx.get(f"{OLLAMA_BASE}/api/tags", timeout=3)
        if r.status_code != 200:
            return False, "offline"
        data = r.json()
        models = data.get("models", [])
        names = [m["name"].split(":")[0] for m in models]
        for p in PREFERRED:
            if p in names:
                return True, next(m["name"] for m in models if m["name"].startswith(p))
        if models:
            return True, models[0]["name"]
        return False, "no-models"
    except Exception:
        return False, "offline"


def _call(model: str, prompt: str, system: str) -> str:
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
        "stream": False,
        "options": {"temperature": 0.65, "top_p": 0.9, "num_predict": 420},
    }
    r = httpx.post(f"{OLLAMA_BASE}/api/chat", json=payload, timeout=90)
    r.raise_for_status()
    return r.json()["message"]["content"].strip()


def generate_all(submission: dict, result: dict) -> dict:
    ok, model = is_available()
    if not ok:
        return {"status": "offline", "model": model, "sections": {}}

    name     = submission.get("name", "the model")
    gender   = submission.get("gender", "female")
    nat      = submission.get("nationality", "")

    eu      = result.get("eu_score", 0) or 0
    us      = result.get("us_score", 0) or 0
    asia    = result.get("asian_score", 0) or 0
    overall = result.get("overall_score", 0) or 0
    verdict = result.get("potential_verdict", "")
    face_sh = result.get("face_shape", "")
    body_sh = result.get("body_shape", "")
    age     = result.get("age_at_submission")

    facial       = result.get("facial_metrics", {}) or {}
    meas         = result.get("final_measurements", {}) or {}
    strengths    = result.get("strengths", []) or []
    improvs      = result.get("improvements", []) or []
    fashion_cats = result.get("fashion_categories", []) or []
    top_cats     = [c["category"] for c in fashion_cats[:3]] if fashion_cats else []

    system = (
        "You are a senior international modeling agency scout with 20 years of experience "
        "placing talent with elite agencies in Paris, New York, Tokyo, and Seoul. "
        "Use precise industry terminology. No filler phrases. Be specific and data-driven. "
        "Always format your response as a short intro line followed by bullet points. "
        "Each bullet must start with '• ' on its own line. Keep each bullet to one concise sentence."
    )

    ctx = (
        f"Model: {name} | Gender: {gender} | Nationality: {nat} | Age: {age or 'N/A'}\n"
        f"Overall Score: {overall}/100 | Verdict: {verdict}\n"
        f"EU: {eu}/100 | US: {us}/100 | Asia: {asia}/100\n"
        f"Face Shape: {face_sh} | Body Shape: {body_sh}\n"
        f"Symmetry: {facial.get('symmetry_score','N/A')}% | Golden Ratio: {facial.get('golden_ratio_score','N/A')}% | "
        f"Skin Clarity: {facial.get('skin_clarity_score','N/A')}%\n"
        f"Height: {meas.get('height_cm','N/A')} cm | Bust: {meas.get('bust_cm','N/A')} | "
        f"Waist: {meas.get('waist_cm','N/A')} | Hips: {meas.get('hips_cm','N/A')}\n"
        f"Top Categories: {', '.join(top_cats)}\n"
        f"Strengths: {'; '.join(strengths[:3])}\n"
        f"Developments: {'; '.join(improvs[:2])}"
    )

    prompts = {
        "executive_summary": (
            f"{ctx}\n\n"
            "Write an executive summary for an internal agency file.\n"
            "Format: one opening sentence, then exactly 3 bullets covering:\n"
            "• Primary market recommendation with score justification\n"
            "• Most distinctive physical attribute\n"
            "• Overall verdict and commercial potential"
        ),
        "market_analysis": (
            f"{ctx}\n\n"
            "Analyse suitability for each market. Format: one intro sentence, then 3 bullets:\n"
            "• EU (Paris/Milan): specific reason the score is high or low\n"
            "• US (New York): specific reason the score is high or low\n"
            "• Asia (Tokyo/Seoul/Shanghai): specific reason the score is high or low"
        ),
        "facial_profile": (
            f"{ctx}\n\n"
            "Assess facial attributes from a scout perspective. "
            "Format: one intro sentence, then 3-4 bullets covering symmetry score, "
            "golden ratio score, face shape commercial appeal, and skin clarity."
        ),
        "body_assessment": (
            f"{ctx}\n\n"
            "Assess body proportions for agency placement. "
            "Format: one intro sentence, then 3-4 bullets covering body shape classification, "
            "key measurement fit against standards, proportion strengths, and any concerns."
        ),
        "fashion_categories": (
            f"{ctx}\n\n"
            f"Explain fit for top predicted categories: {', '.join(top_cats)}.\n"
            "Format: one intro sentence, then one bullet per category explaining why the fit is strong or limited."
        ),
        "agency_recommendations": (
            f"{ctx}\n\n"
            "Provide specific placement recommendations.\n"
            "Format: one intro sentence, then 3-4 bullets:\n"
            "• Primary agency recommendation (name real agencies: Elite, IMG, Next, Storm, DNA, etc.) with reason\n"
            "• Secondary market or agency option\n"
            "• Suggested market-entry strategy\n"
            "• One condition or requirement before submission"
        ),
        "development_notes": (
            f"{ctx}\n\n"
            "List development priorities and timeline.\n"
            "Format: one intro sentence, then 3-4 bullets:\n"
            "• Highest priority improvement with specific target\n"
            "• Secondary improvement area\n"
            "• Realistic timeline to market readiness\n"
            "• One positive asset to leverage immediately"
        ),
    }

    sections = {}
    for key, prompt in prompts.items():
        try:
            sections[key] = _call(model, prompt, system)
        except Exception as e:
            sections[key] = f"[Generation failed: {e}]"

    return {"status": "completed", "model": model, "sections": sections}
