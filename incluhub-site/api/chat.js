export const config = {
  runtime: 'edge',
}

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function toMessages({ systemPrompt, messages }) {
  const out = []
  if (systemPrompt) out.push({ role: 'system', content: systemPrompt })
  for (const m of messages || []) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue
    out.push({ role: m.role, content: String(m.content || '') })
  }
  return out
}

export default async function handler(req) {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const { provider = 'openai', model, maxTokens = 1024, systemPrompt = '', messages = [] } = body

  if (!messages.length) return json(400, { error: 'messages[] is required' })

  const formattedMessages = toMessages({ systemPrompt, messages })

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return json(500, { error: 'Missing OPENAI_API_KEY' })

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: model || 'gpt-4o-mini', messages: formattedMessages, stream: true, temperature: 0.4, max_tokens: maxTokens }),
    })

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => '')
      return json(upstream.status || 500, { error: 'OpenAI upstream error', details: errText.slice(0, 800) })
    }

    return streamOpenAI(upstream.body)

  } else if (provider === 'claude') {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return json(500, { error: 'Missing ANTHROPIC_API_KEY' })

    const anthropicMessages = formattedMessages.filter(m => m.role !== 'system')
    const system = formattedMessages.find(m => m.role === 'system')?.content || systemPrompt

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: model || 'claude-haiku-4-5-20251001', max_tokens: maxTokens, system, messages: anthropicMessages, stream: true }),
    })

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => '')
      return json(upstream.status || 500, { error: 'Anthropic upstream error', details: errText.slice(0, 800) })
    }

    return streamAnthropic(upstream.body)

  } else if (provider === 'local') {
    const ollamaUrl = process.env.OLLAMA_BASE_URL
    if (!ollamaUrl) return json(500, { error: 'Missing OLLAMA_BASE_URL env var' })

    const upstream = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'llama3.1:8b',
        messages: formattedMessages,
        stream: true,
      }),
    })

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => '')
      return json(upstream.status || 500, { error: 'Ollama upstream error', details: errText.slice(0, 800) })
    }

    return streamOllama(upstream.body)

  } else {
    return json(400, { error: `Unsupported provider: ${provider}` })
  }
}

function streamOpenAI(body) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = body.getReader()
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
            if (!line || !line.startsWith('data:')) continue
            const data = line.slice(5).trim()
            if (data === '[DONE]') { controller.close(); return }
            try {
              const delta = JSON.parse(data)?.choices?.[0]?.delta?.content
              if (delta) controller.enqueue(encoder.encode(delta))
            } catch { /* ignore malformed lines */ }
          }
        }
      } catch (e) { controller.error(e) }
      finally { try { reader.releaseLock() } catch {} }
      controller.close()
    },
  })

  return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}

function streamOllama(body) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = body.getReader()
      let buffer = ''
      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (!line.trim()) continue
            try {
              const parsed = JSON.parse(line)
              const chunk = parsed.message?.content ?? ''
              if (chunk) controller.enqueue(encoder.encode(chunk))
              if (parsed.done) { controller.close(); return }
            } catch { /* ignore malformed lines */ }
          }
        }
      } catch (e) { controller.error(e) }
      finally { try { reader.releaseLock() } catch {} }
      controller.close()
    },
  })

  return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}

function streamAnthropic(body) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = body.getReader()
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
            if (!line || !line.startsWith('data:')) continue
            try {
              const parsed = JSON.parse(line.slice(5).trim())
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                controller.enqueue(encoder.encode(parsed.delta.text))
              }
            } catch { /* ignore malformed lines */ }
          }
        }
      } catch (e) { controller.error(e) }
      finally { try { reader.releaseLock() } catch {} }
      controller.close()
    },
  })

  return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}
