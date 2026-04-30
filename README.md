# IncluHub Website

Premium, minimal, futuristic web experience for IncluHub — built with React + Vite, with a “Dedicated Manager” chatbot that supports:
- Local **Ollama** mode (no API keys)
- Deployed **OpenAI** mode via Vercel `/api/chat`
- Knowledge-grounded answers via a markdown knowledge base (RAG-lite retrieval)
- Basic lead capture (email/phone extraction)

## Repository structure

- `incluhub-site/`: Main website (React + Vite)
  - `src/components/chat/`: Dedicated Manager UI
  - `src/ai/`: AI client, providers, prompts, retrieval
  - `knowledge-base/`: Editable knowledge base used by the chatbot
  - `api/chat.js`: Vercel Edge Function (OpenAI streaming backend)
- `international_agency_model_predictor/`: Separate project (predictor app)
- `website_assets/`, `screenshots/`: Design and reference assets

## Run the website locally (Windows / PowerShell)

```powershell
cd c:\Incluhub\website\incluhub-site
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Dedicated Manager chatbot modes

The chatbot provider is configured in:
- `incluhub-site/src/config/ai.config.js`

### Mode A: Local Ollama (recommended for local dev)

1) Install Ollama (Windows): `https://ollama.com/download`
2) Start Ollama (if not already running):

```powershell
ollama serve
```

3) Pull the model once:

```powershell
ollama pull llama3.1:8b
```

4) In `incluhub-site/src/config/ai.config.js` set:
- `provider: 'local'`
- `providers.local.baseUrl: 'http://localhost:11434'`
- `providers.local.model: 'llama3.1:8b'`

### Mode B: OpenAI (for Vercel deploy)

This repo includes a Vercel Edge Function:
- `incluhub-site/api/chat.js` → `POST /api/chat`

To use it:
1) In `incluhub-site/src/config/ai.config.js` set `provider: 'openai'`
2) Deploy on Vercel and set environment variable:
   - `OPENAI_API_KEY`

## Knowledge base (RAG-lite)

Edit this file to update what the Dedicated Manager knows:
- `incluhub-site/knowledge-base/incluhub_website_kb.md`

Retrieval logic lives in:
- `incluhub-site/src/ai/knowledge/retriever.js`

The system prompt builder lives in:
- `incluhub-site/src/ai/prompts/systemPrompt.js`

## Lead capture (current behavior)

The chat extracts emails and phone-like numbers from user messages and stores them locally in the browser:
- `localStorage` key: `incluhub.capturedLeads`

This is **not** server-side storage yet. When you decide on storage (Supabase/Firebase/Postgres/CRM), we can wire persistence into the `/api/chat` backend.

## Vercel deployment notes

When importing this repo into Vercel:
- Root Directory: `incluhub-site`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env vars: `OPENAI_API_KEY` (if using OpenAI mode)

