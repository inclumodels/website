# API (Vercel Functions)

## Endpoint
- `POST /api/chat` (Edge Function)

## Environment Variables (Vercel Project Settings)
- `OPENAI_API_KEY` — required for OpenAI requests

## Notes
- The frontend OpenAI adapter (`src/ai/providers/openai.js`) calls `/api/chat`.
- This function returns **plain streamed text** (not SSE) to match the existing streaming UI logic.
