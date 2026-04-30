import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import CreatorsEcosystemSection from '../../sections/CreatorsEcosystemSection'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function CreatorsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 52 }}>

        {/* Hero */}
        <section style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          padding: 'clamp(120px, 15vh, 180px) clamp(24px, 6vw, 80px) 100px',
          position: 'relative', overflow: 'hidden',
          background: 'transparent',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(192,192,192,0.05) 0%, transparent 65%)',
          }} />

          {/* Back button */}
          <motion.div
            {...reveal(0)}
            style={{ position: 'absolute', top: 'calc(var(--nav-h) + 28px)', left: 'clamp(24px, 6vw, 80px)' }}
          >
            <Link to="/" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--color-ivory-3)',
              border: '1px solid rgba(200,168,106,0.18)',
              padding: '10px 22px', borderRadius: 4, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'rgba(200,168,106,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ivory-3)'; e.currentTarget.style.borderColor = 'rgba(200,168,106,0.18)' }}
            >
              ← Back
            </Link>
          </motion.div>

          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <motion.p className="section-label" {...reveal(0.05)}>Creators</motion.p>
            <motion.h1 {...reveal(0.14)} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              fontWeight: 300, color: 'var(--color-ivory)',
              lineHeight: 0.95, marginBottom: 36, letterSpacing: '0.04em',
            }}>
              For Creators
            </motion.h1>
            <motion.p {...reveal(0.3)} style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              color: 'var(--color-ivory-2)', lineHeight: 1.7,
              fontWeight: 300, maxWidth: 540, marginBottom: 56,
            }}>
              IncluHub gives fashion content creators the tools to grow their audience, land brand deals, and monetise their work — without the chaos of managing it all alone.
            </motion.p>
            <motion.div {...reveal(0.45)}>
              <a href="#creator-cards" style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--color-bg)', background: 'var(--color-gold)',
                padding: '14px 32px', borderRadius: 4, textDecoration: 'none',
              }}>
                Explore
              </a>
            </motion.div>
          </div>
        </section>

        <CreatorsEcosystemSection />

        {/* CTA */}
        <section style={{
          padding: '100px 80px',
          borderTop: '1px solid rgba(200,168,106,0.1)',
          background: 'transparent', textAlign: 'center',
        }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 300, color: 'var(--color-ivory)', marginBottom: 12, lineHeight: 1.3,
            }}>
              Start creating with IncluHub today.
            </h3>
            <a href="mailto:contact@inclumodels.com" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--color-ivory)', background: 'var(--color-burgundy)',
              padding: '15px 40px', borderRadius: 8, textDecoration: 'none',
              display: 'inline-block',
            }}>
              Get in Touch
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
