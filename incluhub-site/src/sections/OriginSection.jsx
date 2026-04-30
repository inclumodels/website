import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function OriginSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="origin" ref={ref} style={{
      padding: 'var(--section-pad-y) 0',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'linear-gradient(180deg, rgba(10,6,4,0.78) 0%, rgba(8,4,3,0.62) 100%)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(24px, 6vw, 80px)',
          alignItems: 'start',
        }}>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ paddingTop: 6 }}
          >
            <p className="section-label">Origin</p>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.06 }}
              className="value-hook"
            >
              Built from real industry pain points
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="section-heading-divider"
              style={{ transformOrigin: 'left' }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--color-ivory)',
                lineHeight: 1.15, marginBottom: 32, letterSpacing: '0.02em',
              }}
            >
              Where it all began
            </motion.h2>

            {[
              'IncluHub was born in Hyderabad with a single conviction — that India\'s fashion and modelling industry deserved a platform built for it. We saw talented models, aspiring creators, and ambitious brands scattered across disconnected tools, struggling to find each other. We decided to change that.',
              'What began as a model management tool grew into something far bigger: a complete digital ecosystem for everyone in the fashion world. From your first portfolio shoot to your first international campaign, IncluHub is the infrastructure behind your career.',
            ].map((text, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                  color: 'var(--color-ivory-3)', lineHeight: 1.95,
                  fontWeight: 300, marginBottom: 24, maxWidth: 600,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
