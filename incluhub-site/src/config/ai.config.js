/**
 * AI tool configuration.
 * Switch providers here without touching component code.
 * Supported providers: 'claude' | 'openai' | 'local'
 */
export const aiConfig = {
  // Active provider — change this to switch models
  provider: 'local',

  // Provider-specific settings
  providers: {
    claude: {
      model: 'claude-sonnet-4-6',
      maxTokens: 1024,
    },
    openai: {
      model: 'gpt-4o',
      maxTokens: 1024,
    },
    local: {
      baseUrl: 'http://localhost:11434', // Ollama default
      model: 'llama3.1:8b',
      maxTokens: 1024,
    },
  },

  // Chat UI settings
  ui: {
    assistantName: 'Dedicated Manager AI',
    welcomeMessage: 'I am your Dedicated Manager. Ask me anything about IncluHub, roles, products, or support and I will guide your next step.',
    placeholder: 'Ask your Dedicated Manager...',
    maxHistory: 20, // messages to keep in context
  },
}
