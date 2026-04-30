import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../../hooks/useChat'
import { aiConfig } from '../../config/ai.config'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

export default function DedicatedManager({ isOpen, onClose }) {
  const { messages, isLoading, error, send } = useChat()
  const bottomRef = useRef(null)
  const panelRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (!isOpen) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chat-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 48px)',
            background: 'rgba(4, 2, 1, 0.78)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          {/* Chat panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'min(680px, 100%)',
              height: 'min(700px, 88vh)',
              background: 'rgba(5, 2, 1, 0.97)',
              border: '1px solid rgba(200,168,106,0.18)',
              borderRadius: 20,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(200,168,106,0.08) inset',
            }}
          >
            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 28px 16px',
              borderBottom: '1px solid rgba(200,168,106,0.1)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: 'var(--color-gold)',
                  }}
                />
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'var(--color-ivory-2)', fontWeight: 400,
                    marginBottom: 2,
                  }}>
                    Dedicated Manager
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: '0.78rem', color: 'var(--color-ivory-3)',
                    letterSpacing: '0.04em',
                  }}>
                    {aiConfig.ui.assistantName}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: 'none', border: '1px solid rgba(200,168,106,0.15)',
                  borderRadius: '50%', width: 34, height: 34,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--color-ivory-3)',
                  fontSize: '0.85rem', flexShrink: 0,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,168,106,0.45)'
                  e.currentTarget.style.color = 'var(--color-ivory)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,168,106,0.15)'
                  e.currentTarget.style.color = 'var(--color-ivory-3)'
                }}
              >
                ✕
              </button>
            </div>

            {/* ── Messages area ── */}
            <div style={{
              flex: 1, overflowY: 'auto',
              padding: '24px 28px',
              display: 'flex', flexDirection: 'column', gap: 16,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(200,168,106,0.15) transparent',
            }}>
              {messages.length === 0 && (
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  height: '100%', gap: 16, textAlign: 'center',
                }}>
                  <img
                    src="/logo.png"
                    alt="IncluHub"
                    style={{ height: 48, width: 'auto', opacity: 0.45, filter: 'brightness(1.1)' }}
                  />
                  <p style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: '1.05rem', color: 'var(--color-ivory-3)',
                    fontWeight: 300, lineHeight: 1.7, maxWidth: 360,
                  }}>
                    {aiConfig.ui.welcomeMessage}
                  </p>
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    marginTop: 8, width: '100%', maxWidth: 340,
                  }}>
                    {[
                      'How do I join IncluHub as a model?',
                      'What is the Ecosystem product?',
                      'How can brands work with IncluHub?',
                    ].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => send(q)}
                        style={{
                          background: 'rgba(200,168,106,0.06)',
                          border: '1px solid rgba(200,168,106,0.14)',
                          borderRadius: 10, padding: '10px 16px',
                          fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                          color: 'var(--color-ivory-3)', cursor: 'pointer',
                          textAlign: 'left', letterSpacing: '0.02em',
                          transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(200,168,106,0.1)'
                          e.currentTarget.style.borderColor = 'rgba(200,168,106,0.26)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(200,168,106,0.06)'
                          e.currentTarget.style.borderColor = 'rgba(200,168,106,0.14)'
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
              {isLoading && <TypingIndicator />}
              {error && (
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  color: '#e07070', textAlign: 'center',
                }}>
                  {error}
                </p>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Input area ── */}
            <div style={{
              padding: '14px 28px 20px',
              borderTop: '1px solid rgba(200,168,106,0.1)',
              flexShrink: 0,
              background: 'rgba(4,2,1,0.4)',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(200,168,106,0.14)',
                borderRadius: 999,
                padding: '6px 8px 6px 20px',
                display: 'flex', alignItems: 'center',
              }}>
                <ChatInput onSend={send} isLoading={isLoading} compact />
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.52rem',
                letterSpacing: '0.12em', color: 'var(--color-ivory-3)',
                textAlign: 'center', marginTop: 10, opacity: 0.5,
              }}>
                AI can make mistakes — verify important information
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
