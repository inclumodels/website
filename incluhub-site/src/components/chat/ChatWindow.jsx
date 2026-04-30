import { useRef, useEffect } from 'react'
import { useChat } from '../../hooks/useChat'
import { aiConfig } from '../../config/ai.config'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow({ onClose }) {
  const { messages, isLoading, error, send, reset } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div style={{
      position: 'fixed', bottom: '100px', right: '32px', zIndex: 200,
      width: '380px', maxHeight: '600px',
      background: 'rgba(18,14,12,0.95)', backdropFilter: 'blur(24px)',
      border: '1px solid rgba(201,169,110,0.2)', borderRadius: '16px',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(201,169,110,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
            {aiConfig.ui.assistantName}
          </p>
          <p style={{ color: 'var(--color-cream-dim)', fontSize: '0.72rem', marginTop: '2px' }}>
            Online · Knowledge-based AI
          </p>
        </div>
        <button onClick={onClose} style={{ color: 'var(--color-cream-dim)', fontSize: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.length === 0 && (
          <p style={{ color: 'var(--color-cream-dim)', fontSize: '0.85rem', textAlign: 'center', marginTop: '20px' }}>
            {aiConfig.ui.welcomeMessage}
          </p>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && <TypingIndicator />}
        {error && <p style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>{error}</p>}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={send} isLoading={isLoading} />
    </div>
  )
}
