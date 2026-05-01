/**
 * Local/Ollama provider adapter.
 * Routes through /api/chat edge function so the Ollama URL stays server-side.
 */
export async function streamLocal({ messages, systemPrompt, config, onChunk, onDone }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'local',
      model: config.model,
      maxTokens: config.maxTokens,
      systemPrompt,
      messages,
    }),
  })

  if (!res.ok) throw new Error(`Local model error: ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    full += chunk
    onChunk?.(chunk)
  }

  onDone?.(full)
  return full
}
