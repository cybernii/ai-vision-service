📸 AI Vision Analyzer
AI Vision Analyzer is a full-stack web application that allows authenticated users to upload images and receive AI-generated descriptions of their contents. The system demonstrates secure authentication, tier-based usage limits, backend API design, and integration with a modern multimodal AI model.
The application is built using Next.js (Pages Router) on the frontend, FastAPI on the backend, Clerk for authentication, and OpenAI Vision for image analysis. It is deployed on Vercel.

🚀 Live Demo
Production URL: https://ai-vision-service-lyart.vercel.app
GitHub Repository: https://github.com/cybernii/ai-vision-service

✨ Features

🔐 Authentication
Secure user authentication using Clerk
JWTs are validated on the backend using Clerk’s JWKS endpoint
Signed-in and signed-out UI states handled on the frontend

🖼️ Image Analysis
Users upload an image (JPG, PNG, or WEBP)
The backend sends the image to an OpenAI vision-capable model
The model returns a detailed description of the image

📊 Tiered Usage Limits
Free tier: 3 image analyses per session
Premium tier: Unlimited analyses (demo logic)
Usage is tracked in memory (as required by the assignment)

🛡️ Validation & Error Handling

File type validation
File size limit (5MB)
Proper HTTP error codes:
400 – Invalid file type
401 – Unauthorized
413 – File too large
429 – Usage limit reached
502 – AI service error

🧱 Tech Stack
Frontend
Next.js (Pages Router)
TypeScript
Tailwind CSS
Clerk (@clerk/nextjs)
Backend
FastAPI
Python 3.11
OpenAI Python SDK
JWT validation with PyJWKClient
Deployment
Vercel (frontend + serverless FastAPI backend)

📁 Project Structure
ai-vision-service/
├── pages/
│ ├── index.tsx # Landing page
│ ├── analyze.tsx # Image analyzer page
│ └── \_app.tsx # Global app wrapper (Clerk)
├── api/
│ └── index.py # FastAPI backend
├── styles/
│ └── globals.css # Global styles
├── requirements.txt # Python dependencies
├── vercel.json # Vercel routing config
└── README.md

🔌 API Endpoints
GET /api/health
Health check endpoint.
Response
{ "status": "healthy" }

GET /api/usage (Authenticated)
Returns the user’s current usage and tier.
Response
{
"tier": "free",
"used": 1,
"limit": 3
}

POST /api/analyze (Authenticated)
Uploads an image and returns an AI-generated description.
Request

multipart/form-data
Field: file
Response
{
"tier": "free",
"used": 2,
"limit": 3,
"description": "A detailed description of the image..."
}

⚙️ Environment Variables
Local (.env.local)
NEXT*PUBLIC_CLERK_PUBLISHABLE_KEY=pk*...
CLERK*SECRET_KEY=sk*...
CLERK_JWKS_URL=https://.../.well-known/jwks.json
OPENAI_API_KEY=sk-...

Vercel
The same variables must be added in Project → Settings → Environment Variables (Production).

▶️ Running Locally

Frontend
npm install
npm run dev

Backend (optional local testing)
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn api.index:app --reload

⚠️ Known Limitations
Usage tracking is in-memory only
Usage resets when the server restarts or redeploys
Premium tier is simulated for demonstration purposes
These limitations are intentional and align with assignment requirements.

📄 Assignment Notes
This project demonstrates:
Secure authentication with JWT verification
API design with proper validation and error handling
Integration of a multimodal AI model
Clear separation between frontend and backend
Cloud deployment with environment-based configuration

👤 Author
Daniel Nii Boi Quartey
AI Vision Analyzer – Academic Project
