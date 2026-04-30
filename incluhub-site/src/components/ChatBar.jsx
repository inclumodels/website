import { motion } from 'framer-motion'

/**
 * Reusable chat bar pill.
 * Parent is responsible for positioning.
 * Pass interactive + onClick to make it clickable (hero usage).
 * Without those props it's a non-interactive visual preview (intro usage).
 */
export default function ChatBar({
  visible = false,
  interactive = false,
  onClick,
  prompt = 'Ask me anything about IncluHub…',
  size = 'default',
  showIcons = true,
  label = 'Dedicated Manager AI',
}) {
  const isLarge = size === 'large'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onClick={interactive ? onClick : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        willChange: 'transform, opacity',
        width: isLarge ? 'min(860px, 95vw)' : 'min(560px, 90vw)',
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: isLarge ? '0.7rem' : '0.54rem',
        letterSpacing: isLarge ? '0.26em' : '0.34em',
        textTransform: 'uppercase',
        color: isLarge ? 'rgba(226, 207, 160, 0.82)' : 'rgba(200,168,106,0.5)',
      }}>
        {label}
      </span>

      <motion.div
        whileHover={interactive ? {
          borderColor: 'rgba(226,207,160,0.72)',
          boxShadow: '0 22px 72px rgba(0,0,0,0.72), 0 0 0 1px rgba(226,207,160,0.22) inset',
          y: -2,
        } : {}}
        style={{
          width: '100%',
          background: isLarge
            ? 'linear-gradient(145deg, rgba(18,10,7,0.9) 0%, rgba(10,5,3,0.9) 100%)'
            : 'rgba(6, 3, 2, 0.62)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: isLarge ? '1px solid rgba(226,207,160,0.44)' : '1px solid rgba(200,168,106,0.16)',
          borderRadius: 999,
          padding: isLarge ? '26px 34px' : '15px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          boxShadow: isLarge
            ? '0 20px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(245,240,232,0.12)'
            : '0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,240,232,0.04)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {showIcons ? (
          <span style={{
            color: 'rgba(200,168,106,0.45)',
            fontSize: '1.05rem',
            lineHeight: 1,
            flexShrink: 0,
            fontWeight: 300,
          }}>+</span>
        ) : null}

        <span style={{
          flex: 1,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: isLarge ? 'clamp(1.05rem, 2.4vw, 1.35rem)' : 'clamp(0.84rem, 1.8vw, 1rem)',
          color: isLarge
            ? 'rgba(245,240,232,0.9)'
            : interactive ? 'rgba(245,240,232,0.38)' : 'rgba(245,240,232,0.28)',
          letterSpacing: isLarge ? '0.03em' : '0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: isLarge ? 'center' : 'left',
        }}>
          {prompt}
        </span>

        <span style={{
          flexShrink: 0,
          fontFamily: 'var(--font-body)',
          fontSize: isLarge ? '0.62rem' : '0.54rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#2A1706',
          background: 'linear-gradient(145deg, #E2CFA0 0%, #C8A86A 100%)',
          border: '1px solid rgba(255,235,190,0.65)',
          borderRadius: 999,
          padding: isLarge ? '10px 16px' : '8px 13px',
          boxShadow: '0 8px 22px rgba(200,168,106,0.35)',
          fontWeight: 600,
        }}>
          Chat Now
        </span>

        {showIcons ? (
          <motion.div
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              flexShrink: 0,
              width: 28, height: 28,
              borderRadius: '50%',
              border: '1px solid rgba(200,168,106,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
              <rect x="3.5" y="0.5" width="4" height="7" rx="2" stroke="#C8A86A" strokeWidth="0.9" opacity="0.7" />
              <path d="M1 6c0 2.485 2.015 4.5 4.5 4.5S10 8.485 10 6" stroke="#C8A86A" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
              <line x1="5.5" y1="10.5" x2="5.5" y2="12.5" stroke="#C8A86A" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
            </svg>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  )
}
