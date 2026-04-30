import { useState, useCallback } from 'react'
import { sendMessage } from '../ai/aiClient'
import { aiConfig } from '../config/ai.config'
import { extractLeadFromText, persistLead } from '../ai/leadCapture'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const send = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return

    const userMsg = { role: 'user', content: userText }
    const history = [...messages, userMsg].slice(-aiConfig.ui.maxHistory)

    const lead = extractLeadFromText(userText)
    if (lead) {
      persistLead(lead)
      aiConfig.sessionLeadContext = {
        ...(aiConfig.sessionLeadContext || {}),
        emails: Array.from(new Set([...(aiConfig.sessionLeadContext?.emails || []), ...lead.emails])),
        phones: Array.from(new Set([...(aiConfig.sessionLeadContext?.phones || []), ...lead.phones])),
        lastCapturedAt: lead.capturedAt,
      }
    }

    setMessages(history)
    setIsLoading(true)
    setError(null)

    // Add empty assistant message to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      await sendMessage({
        messages: history,
        onChunk: (chunk) => {
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: 'assistant',
              content: updated[updated.length - 1].content + chunk,
            }
            return updated
          })
        },
      })
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const reset = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, send, reset }
}
