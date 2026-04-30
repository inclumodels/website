/**
 * Local model provider adapter (Ollama).
 * Talks directly to a locally running Ollama instance — no API key needed.
 */
export async function streamLocal({ messages, systemPrompt, config, onChunk, onDone }) {
  const payload = {
    model: config.model,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    stream: true,
  }

  const res = await fetch(`${config.baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(`Local model error: ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const lines = decoder.decode(value).split('\n').filter(Boolean)
    for (const line of lines) {
      try {
        const json = JSON.parse(line)
        const chunk = json.message?.content ?? ''
        full += chunk
        onChunk?.(chunk)
      } catch {}
    }
  }

  onDone?.(full)
  return full
}
