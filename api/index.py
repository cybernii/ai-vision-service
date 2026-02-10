from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
import os
import base64
import jwt
from jwt import PyJWKClient
from openai import OpenAI

app = FastAPI()
auth_scheme = HTTPBearer()
client = OpenAI()

# In-memory usage tracking (allowed by assignment)
usage_counts: Dict[str, int] = {}

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_BYTES = 5 * 1024 * 1024  # 5MB
FREE_LIMIT = 1  # Free users get 1 analysis


def get_jwks_url() -> str:
    jwks_url = os.environ.get("CLERK_JWKS_URL")
    if not jwks_url:
        raise RuntimeError("Missing CLERK_JWKS_URL")
    return jwks_url


def verify_token(creds: HTTPAuthorizationCredentials = Depends(auth_scheme)) -> dict:
    token = creds.credentials
    jwks_client = PyJWKClient(get_jwks_url())
    signing_key = jwks_client.get_signing_key_from_jwt(token).key

    # Clerk tokens are RS256; audience varies by setup, so we don't enforce aud here
    decoded = jwt.decode(
        token,
        signing_key,
        algorithms=["RS256"],
        options={"verify_aud": False},
    )

    user_id = decoded.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    return decoded


def get_tier(decoded: dict) -> str:
    # Default free. Premium can be set in Clerk public_metadata.
    metadata = decoded.get("public_metadata", {}) or {}
    if metadata.get("subscription_tier") == "premium":
        return "premium"
    return "free"


def ext_to_mime(ext: str) -> str:
    return {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
    }.get(ext, "image/jpeg")


@app.get("/api/health")
def health():
    return {"status": "healthy"}


@app.get("/api/usage")
def usage(decoded: dict = Depends(verify_token)):
    user_id = decoded["sub"]
    tier = get_tier(decoded)
    used = usage_counts.get(user_id, 0)

    return {
        "tier": tier,
        "used": used,
        "limit": None if tier == "premium" else FREE_LIMIT,
    }


@app.post("/api/analyze")
async def analyze(
    file: UploadFile = File(...),
    decoded: dict = Depends(verify_token),
):
    user_id = decoded["sub"]
    tier = get_tier(decoded)

    # Tiered limits (free = 1 per session, premium = unlimited)
    used = usage_counts.get(user_id, 0)
    if tier != "premium" and used >= FREE_LIMIT:
        limit_text = "analysis" if FREE_LIMIT == 1 else "analyses"
        raise HTTPException(
            status_code=429,
            detail=f"Free tier limit reached ({FREE_LIMIT} {limit_text} per session). Upgrade to premium for unlimited analyses.",
        )

    # Validate file extension
    filename = (file.filename or "").lower()
    ext = "." + filename.split(".")[-1] if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Allowed: jpg, jpeg, png, webp.",
        )

    # Validate size
    data = await file.read()
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="File too large. Max size is 5MB.")

    # OpenAI Vision call (gpt-4o-mini)
    b64 = base64.b64encode(data).decode("utf-8")
    data_url = f"data:{ext_to_mime(ext)};base64,{b64}"
    prompt = "Describe this image in detail, including objects, colors, mood, and any notable features."

    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": data_url}},
                    ],
                }
            ],
        )
        description = resp.choices[0].message.content.strip()
        if not description:
            raise RuntimeError("Empty model response")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Vision analysis failed: {str(e)}")

    # Increment usage AFTER successful analysis
    usage_counts[user_id] = used + 1

    return {
        "tier": tier,
        "used": usage_counts[user_id],
        "limit": None if tier == "premium" else FREE_LIMIT,
        "description": description,
    }