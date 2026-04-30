import { motion } from 'framer-motion'

const wordStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(4rem, 9vw, 8.5rem)',
  fontWeight: 300,
  letterSpacing: '0.25em',
  color: 'var(--color-ivory)',
  lineHeight: 1,
  userSelect: 'none',
  willChange: 'transform',
}

export default function LogoAnimation({ animating = false }) {
  const splitX = typeof window !== 'undefined' && window.innerWidth < 640 ? 80 : 150

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 'clamp(16px, 2.5vw, 32px)',
    }}>
      <motion.span
        initial={{ x: 0 }}
        animate={{ x: animating ? -splitX : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={wordStyle}
      >
        INCLU
      </motion.span>

      {/* Networking logo — circular crop */}
      <motion.div
        animate={animating ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={animating ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } : {}}
        style={{
          flexShrink: 0, willChange: 'transform',
          width: 'clamp(64px, 9vw, 100px)',
          height: 'clamp(64px, 9vw, 100px)',
        }}
      >
        <img
          src="/logo-mark.png"
          alt="IncluHub"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </motion.div>

      <motion.span
        initial={{ x: 0 }}
        animate={{ x: animating ? splitX : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={wordStyle}
      >
        HUB
      </motion.span>
    </div>
  )
}
