import { useState } from 'react'
import ChatWindow from './ChatWindow'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 200,
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'var(--color-gold)', color: 'var(--color-dark)',
          fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(201,169,110,0.4)', cursor: 'pointer',
          border: 'none', transition: 'transform 0.2s ease',
        }}
        aria-label="Open AI assistant"
      >
        {isOpen ? '✕' : '✦'}
      </button>
    </>
  )
}
