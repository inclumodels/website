import { useState } from 'react'
import { aiConfig } from '../../config/ai.config'

export default function ChatInput({ onSend, isLoading, compact = false }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || isLoading) return
    onSend(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, width: '100%' }}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={aiConfig.ui.placeholder}
        disabled={isLoading}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          borderBottom: compact ? '1px solid rgba(201,169,110,0.2)' : '1px solid rgba(201,169,110,0.2)',
          padding: compact ? '4px 0' : '10px 14px',
          color: 'var(--color-cream)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          outline: 'none',
          letterSpacing: '0.04em',
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        style={{
          background: 'none',
          border: 'none',
          color: value.trim() ? 'var(--color-gold)' : 'var(--color-cream-dim)',
          fontSize: '0.9rem',
          cursor: value.trim() ? 'pointer' : 'default',
          padding: '4px 8px',
          transition: 'color 0.2s',
        }}
      >
        ↑
      </button>
    </form>
  )
}
