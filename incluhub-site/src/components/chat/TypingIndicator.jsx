export default function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: '50%',
          background: 'var(--color-gold)', opacity: 0.5,
          animation: `typing ${1.2}s ease-in-out ${i * 0.18}s infinite`,
          display: 'inline-block',
        }} />
      ))}
      <style>{`
        @keyframes typing {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
