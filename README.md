# 📸 AI Vision Analyzer

A full-stack web application that allows authenticated users to upload images and receive AI-generated descriptions of their contents. The system demonstrates secure authentication, image analysis, and usage-based tiering.

**[Live Demo](https://ai-vision-service-lyart.vercel.app)** • **[Repository](https://github.com/cybernii/ai-vision-service)**

---

## 🚀 Quick Start

### Frontend
```bash
npm install
npm run dev
```

### Backend (Optional Local Testing)
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn api.index:app --reload
```

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js (Pages Router), TypeScript, Tailwind CSS, Clerk |
| **Backend** | FastAPI, Python 3.11, OpenAI Python SDK, PyJWKClient |
| **Deployment** | Vercel |

---

## ✨ Key Features

### 🔐 Authentication
- Secure user authentication using Clerk
- JWT validation on the backend using Clerk's JWKS endpoint
- Signed-in and signed-out UI states handled on the frontend

### 🖼️ Image Analysis
- Upload images (JPG, PNG, WEBP)
- AI-powered image description using OpenAI Vision
- Detailed content analysis and insights

### 📊 Tiered Usage Limits
- **Free Tier**: 3 image analyses per session
- **Premium Tier**: Unlimited analyses (demo logic)
- In-memory usage tracking

### 🛡️ Validation & Error Handling
- File type validation (JPG, PNG, WEBP)
- File size limit: 5MB
- Proper HTTP error codes:
  - `400` – Invalid file type
  - `401` – Unauthorized
  - `413` – File too large
  - `429` – Usage limit reached
  - `502` – AI service error

---

## 📁 Project Structure

```
ai-vision-service/
├── pages/
│   ├── index.tsx              # Landing page
│   ├── analyze.tsx            # Image analyzer page
│   └── _app.tsx               # Global app wrapper (Clerk)
├── api/
│   └── index.py               # FastAPI backend
├── styles/
│   └── globals.css            # Global styles
├── requirements.txt           # Python dependencies
├── vercel.json                # Vercel routing config
├── package.json               # npm dependencies
└── README.md
```

---

## 🔌 API Endpoints

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

### GET `/api/usage` *(Authenticated)*
Returns the user's current usage and tier.

**Response:**
```json
{
  "tier": "free",
  "used": 1,
  "limit": 3
}
```

### POST `/api/analyze` *(Authenticated)*
Uploads an image and returns an AI-generated description.

**Request:**
- Content-Type: `multipart/form-data`
- Field: `file`

**Response:**
```json
{
  "tier": "free",
  "used": 2,
  "limit": 3,
  "description": "A detailed description of the image..."
}
```

---

## ⚙️ Environment Variables

### Local Development (`.env.local`)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_JWKS_URL=https://.../.well-known/jwks.json
OPENAI_API_KEY=sk-...
```

### Production (Vercel)
Add the same variables in **Project Settings → Environment Variables**.

---

## ⚠️ Known Limitations

- ⚠️ Usage tracking is in-memory only
- ⚠️ Usage resets when the server restarts or redeploys
- ⚠️ Premium tier is simulated for demonstration purposes

*These limitations are intentional and align with assignment requirements.*

---

## 📚 What This Project Demonstrates

- ✅ Secure authentication with JWT verification
- ✅ RESTful API design with proper validation and error handling
- ✅ Integration of a multimodal AI model (OpenAI Vision)
- ✅ Clear separation between frontend and backend
- ✅ Cloud deployment with environment-based configuration
- ✅ Tiered access control and usage tracking

---

## 👤 Author

**Daniel Nii Boi Quartey**

AI Vision Analyzer – Academic Project
