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

export default function ProductPageTemplate({ product }) {
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
            background: `radial-gradient(ellipse 70% 50% at 50% 35%, ${product.glowColor} 0%, transparent 65%)`,
          }} />

          {/* Back button — top left */}
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
            {product.Logo && (
              <motion.div {...reveal(0.05)} style={{ marginBottom: 36 }}>
                <product.Logo size={56} />
              </motion.div>
            )}
            <motion.p className="section-label" {...reveal(0.1)}>{product.category}</motion.p>
            <motion.h1 {...reveal(0.18)} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              fontWeight: 300, color: 'var(--color-ivory)',
              lineHeight: 0.95, marginBottom: 36, letterSpacing: '0.04em',
            }}>
              {product.name}
            </motion.h1>
            <motion.p {...reveal(0.32)} style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              color: 'var(--color-ivory-2)', lineHeight: 1.7,
              fontWeight: 300, maxWidth: 540, marginBottom: 52,
            }}>
              {product.description}
            </motion.p>
          </div>
        </section>

        {/* Features */}
        <section style={{
          padding: 'var(--section-pad-y) clamp(24px, 6vw, 80px)',
          borderTop: '1px solid rgba(200,168,106,0.1)',
          background: 'rgba(4,2,1,0.45)',
        }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 72 }}>
              <p className="section-label" style={{ paddingTop: 8 }}>Features</p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 300, color: 'var(--color-ivory)', lineHeight: 1.15,
              }}>
                What {product.name} offers
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[1, 2, 3, 4].map((n, i) => (
                <motion.div key={n}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PremiumCard intensity={7}>
                    <div style={{
                      padding: '44px 40px 40px',
                      background: 'linear-gradient(145deg, rgba(14,10,7,0.72) 0%, rgba(8,5,3,0.78) 100%)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: 16,
                      minHeight: 220,
                    }}>
                      <h4 style={{
                        fontFamily: 'var(--font-display)', color: 'var(--color-ivory)',
                        fontSize: '1.5rem', fontWeight: 400, marginBottom: 14,
                      }}>
                        Feature {n}
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-body)', color: 'var(--color-ivory-3)',
                        fontSize: '0.88rem', lineHeight: 1.8, fontWeight: 300,
                      }}>
                        Placeholder — add feature description here.
                      </p>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
