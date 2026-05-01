import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PremiumCard from '../../components/ui/PremiumCard'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function AudiencePageTemplate({ page }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 52 }}>

        {/* Hero */}
        <section style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(120px, 15vh, 180px) clamp(24px, 4vw, 60px) 100px',
          position: 'relative', overflow: 'hidden',
          background: 'transparent', textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 70% 50% at 50% 35%, ${page.glow} 0%, transparent 65%)`,
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

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <motion.p className="section-label" {...reveal(0.05)}
              style={{ marginBottom: 24, letterSpacing: '0.36em' }}>
              {page.label}
            </motion.p>
            <motion.h1 {...reveal(0.12)} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5.5rem, 16vw, 15rem)',
              fontWeight: 300, color: 'var(--color-ivory)',
              lineHeight: 0.9, letterSpacing: '0.02em',
              margin: 0,
            }}>
              {page.title}
            </motion.h1>
          </div>
        </section>

        {/* Offerings */}
        <section id="what-we-offer" style={{
          padding: 'var(--section-pad-y) 80px',
          borderTop: '1px solid rgba(200,168,106,0.1)',
          background: 'rgba(4,2,1,0.5)',
        }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 72 }}>
              <p className="section-label" style={{ paddingTop: 8 }}>What we offer</p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--color-ivory)', lineHeight: 1.2,
              }}>
                Built for {page.label.toLowerCase()}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {page.offerings.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PremiumCard intensity={8}>
                    <div style={{
                      padding: '40px 32px',
                      background: 'linear-gradient(145deg, rgba(14,10,7,0.72) 0%, rgba(8,5,3,0.78) 100%)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: 16,
                      minHeight: 220,
                    }}>
                              <h4 style={{
                        fontFamily: 'var(--font-display)', color: 'var(--color-ivory)',
                        fontSize: '1.25rem', fontWeight: 400, marginBottom: 14,
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)', color: 'var(--color-ivory-3)',
                        fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300,
                      }}>
                        {item.text}
                      </p>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
              {page.cta}
            </h3>
            <Link to="/#contact" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--color-ivory)', background: 'var(--color-burgundy)',
              padding: '15px 40px', borderRadius: 8, textDecoration: 'none',
              display: 'inline-block',
            }}>
              Get in Touch
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
