/**
 * Unified AI client.
 * Reads aiConfig.provider and routes to the correct adapter.
 * Swap providers by changing one line in ai.config.js.
 */
import { aiConfig } from '../config/ai.config'
import { buildSystemPrompt } from './prompts/systemPrompt'
import { streamClaude } from './providers/claude'
import { streamOpenAI } from './providers/openai'
import { streamLocal } from './providers/local'

const adapters = {
  claude: streamClaude,
  openai: streamOpenAI,
  local: streamLocal,
}

export async function sendMessage({ messages, onChunk, onDone }) {
  const provider = aiConfig.provider
  const config = aiConfig.providers[provider]
  const adapter = adapters[provider]

  if (!adapter) throw new Error(`Unknown AI provider: "${provider}"`)

  const userQuery = messages[messages.length - 1]?.content || ''
  const systemPrompt = buildSystemPrompt({
    userQuery,
    leadContext: aiConfig.sessionLeadContext || null,
  })

  return adapter({
    messages,
    systemPrompt,
    config,
    onChunk,
    onDone,
  })
}
