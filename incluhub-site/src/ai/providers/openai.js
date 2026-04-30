/**
 * OpenAI provider adapter.
 * Calls the /api/chat serverless function which holds the API key securely.
 */
export async function streamOpenAI({ messages, systemPrompt, config, onChunk, onDone }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'openai',
      model: config.model,
      maxTokens: config.maxTokens,
      systemPrompt,
      messages,
    }),
  })

  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`)

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
