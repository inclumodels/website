import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LogoAnimation from '../components/LogoAnimation'
import ChatBar from '../components/ChatBar'

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  // phase 0 — initial centered state
  // phase 1 — logo splits (INCLU ← → HUB)
  // phase 2 — navbar preview + chat bar appear

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000)   // start split after 1s
    const t2 = setTimeout(() => setPhase(2), 2300)   // show UI after split finishes
    const t3 = setTimeout(() => onComplete(), 4200)  // exit to main site
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.45, 0, 0.55, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#0A0604',
        backgroundImage: "url('/bg-texture.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(4, 2, 1, 0.72)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Ambient warm glow */}
      <div style={{
        position: 'absolute', zIndex: 1, pointerEvents: 'none',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,70,30,0.14) 0%, transparent 65%)',
        filter: 'blur(70px)',
      }} />

      {/* Subtle outer pulse rings */}
      {[0, 1].map(i => (
        <motion.div key={i}
          style={{
            position: 'absolute', zIndex: 1, pointerEvents: 'none',
            width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,168,106,0.07) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 2.8 + i * 0.4], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut', repeatDelay: 1.6 }}
        />
      ))}

      {/* ── Navbar preview ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(24px, 5vw, 60px)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38 }}>
            <img src="/logo-mark.png" alt="IncluHub" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-ivory)' }}>IncluHub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Hamburger lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 20 }}>
            <div style={{ height: 1, background: 'var(--color-ivory-2)', opacity: 0.7 }} />
            <div style={{ height: 1, background: 'var(--color-ivory-2)', opacity: 0.7, width: '70%' }} />
            <div style={{ height: 1, background: 'var(--color-ivory-2)', opacity: 0.7 }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-ivory-2)',
          }}>
            Menu
          </span>
        </div>
      </motion.div>

      {/* ── Logo animation — centered ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <LogoAnimation animating={phase >= 1} />
      </div>

      {/* ── Chat bar — positioned at bottom of intro screen ── */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(48px, 8vh, 88px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}>
        <ChatBar visible={phase >= 2} interactive={false} />
      </div>
    </motion.div>
  )
}
