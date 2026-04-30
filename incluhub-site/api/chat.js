export const config = {
  runtime: 'edge',
}

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function toOpenAIMessages({ systemPrompt, messages }) {
  const out = []
  if (systemPrompt) out.push({ role: 'system', content: systemPrompt })
  for (const m of messages || []) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue
    out.push({ role: m.role, content: String(m.content || '') })
  }
  return out
}

/**
 * Vercel Edge Function: POST /api/chat
 *
 * Expected JSON body:
 * {
 *   provider: "openai",
 *   model: "gpt-4o-mini" (or any OpenAI chat model),
 *   maxTokens: 1024,
 *   systemPrompt: "...",
 *   messages: [{ role: "user"|"assistant", content: "..." }, ...]
 * }
 *
 * Returns: streamed text/plain chunks (NOT SSE) to match the frontend adapters.
 */
export default async function handler(req) {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return json(500, { error: 'Missing OPENAI_API_KEY env var' })

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const model = body?.model || 'gpt-4o-mini'
  const maxTokens = Number.isFinite(body?.maxTokens) ? body.maxTokens : 1024
  const systemPrompt = typeof body?.systemPrompt === 'string' ? body.systemPrompt : ''
  const messages = Array.isArray(body?.messages) ? body.messages : []

  if (!messages.length) return json(400, { error: 'messages[] is required' })

  const openAiMessages = toOpenAIMessages({ systemPrompt, messages })

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: openAiMessages,
      stream: true,
      temperature: 0.4,
      max_tokens: maxTokens,
    }),
  })

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => '')
    return json(upstream.status || 500, {
      error: 'OpenAI upstream error',
      details: errText?.slice(0, 800) || null,
    })
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader()
      let buffer = ''

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (let line of lines) {
            line = line.trim()
            if (!line) continue
            if (!line.startsWith('data:')) continue

            const data = line.slice(5).trim()
            if (data === '[DONE]') {
              controller.close()
              return
            }

            try {
              const parsed = JSON.parse(data)
              const delta = parsed?.choices?.[0]?.delta?.content
              if (delta) controller.enqueue(encoder.encode(delta))
            } catch {
              // ignore malformed lines
            }
          }
        }
      } catch (e) {
        controller.error(e)
      } finally {
        try { reader.releaseLock() } catch {}
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

/**
 * Serverless API route — works on Vercel, Netlify, or any Node server.
 * Keeps all API keys server-side. Never expose keys in the frontend.
 *
 * POST /api/chat
 * Body: { provider, model, maxTokens, systemPrompt, messages }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { provider, model, maxTokens, systemPrompt, messages } = req.body

  try {
    if (provider === 'claude') {
      const Anthropic = (await import('@anthropic-ai/sdk')).default
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

      const stream = await client.messages.stream({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages,
      })

      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Transfer-Encoding', 'chunked')

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
          res.write(chunk.delta.text)
        }
      }
      res.end()

    } else if (provider === 'openai') {
      const OpenAI = (await import('openai')).default
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

      const stream = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: true,
      })

      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Transfer-Encoding', 'chunked')

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) res.write(text)
      }
      res.end()

    } else {
      res.status(400).json({ error: `Unsupported provider: ${provider}` })
    }
  } catch (err) {
    console.error('[/api/chat]', err)
    res.status(500).json({ error: 'AI request failed' })
  }
}
