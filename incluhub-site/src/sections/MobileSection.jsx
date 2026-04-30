import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function MobileSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="mobile" ref={ref} style={{
      padding: 'var(--section-pad-y) 0',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'linear-gradient(180deg, rgba(9,5,4,0.86) 0%, rgba(7,4,3,0.66) 100%)',
      overflow: 'hidden',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 'clamp(28px, 7vw, 100px)',
          alignItems: 'center',
        }}>

          <div>
            <motion.p className="section-label"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              Mobile Experience
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--color-ivory)',
                lineHeight: 1.2, marginBottom: 28,
              }}
            >
              IncluHub in your pocket
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="value-hook"
            >
              Premium mobile workflow for creators and brands
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.93rem',
                color: 'var(--color-ivory-3)', lineHeight: 1.9,
                fontWeight: 300, marginBottom: 32,
              }}
            >
              Carry your entire IncluHub career in your pocket. Manage bookings, update your portfolio, message brands, and track your analytics — all from the IncluHub app. Whether you're on set or between shoots, your professional life never stops.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                padding: '20px 24px',
                border: '1px solid rgba(200,168,106,0.15)',
                borderRadius: 12,
                background: 'rgba(4,2,1,0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>
                Coming Soon
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-ivory)', fontWeight: 300 }}>
                Early members get priority onboarding
              </p>
            </motion.div>
          </div>

          {/* Floating phone */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative' }}
            >
              <div style={{
                width: 'clamp(188px, 52vw, 220px)',
                height: 'clamp(380px, 96vw, 440px)',
                borderRadius: 'clamp(30px, 8vw, 40px)',
                border: '1.5px solid rgba(200,168,106,0.3)',
                background: 'rgba(8,4,2,0.85)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 48px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,168,106,0.06) inset, 0 1px 0 rgba(200,168,106,0.18) inset',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                overflow: 'hidden', position: 'relative',
              }}>
                <div style={{ width: 60, height: 18, background: 'rgba(4,2,1,0.9)', borderRadius: '0 0 12px 12px', marginTop: 12, zIndex: 1 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '0 24px', width: '100%' }}>
                  <img src="/logo.png" alt="IncluHub" style={{ height: 44, width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }} />
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 7, marginTop: 6 }}>
                    {[100, 72, 85].map((w, i) => (
                      <div key={i} style={{ height: 4, borderRadius: 2, background: 'rgba(200,168,106,0.1)', width: `${w}%` }} />
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%', marginTop: 6 }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ height: 36, borderRadius: 6, border: '1px solid rgba(200,168,106,0.1)', background: 'rgba(200,168,106,0.03)' }} />
                    ))}
                  </div>
                </div>
                <div style={{ width: 56, height: 3, borderRadius: 2, background: 'rgba(200,168,106,0.2)', marginBottom: 16 }} />
                <div style={{
                  position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: 160, height: 160,
                  background: 'radial-gradient(circle, rgba(160,70,30,0.08) 0%, transparent 65%)',
                  pointerEvents: 'none',
                }} />
              </div>
              <div style={{
                position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
                width: 120, height: 36,
                background: 'radial-gradient(ellipse, rgba(200,168,106,0.15) 0%, transparent 70%)',
                filter: 'blur(12px)',
              }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
