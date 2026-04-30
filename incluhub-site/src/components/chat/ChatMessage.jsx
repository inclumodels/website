export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '72%',
        padding: '10px 16px',
        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        background: isUser
          ? 'linear-gradient(135deg, rgba(200,169,106,0.2), rgba(200,169,106,0.12))'
          : 'rgba(255,252,245,0.04)',
        border: isUser
          ? '1px solid rgba(200,169,106,0.25)'
          : '1px solid rgba(255,252,245,0.06)',
        color: 'var(--color-ivory-2)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.83rem',
        lineHeight: 1.7,
        fontWeight: 300,
        letterSpacing: '0.01em',
      }}>
        {message.content || <span style={{ opacity: 0.3 }}>…</span>}
      </div>
    </div>
  )
}
