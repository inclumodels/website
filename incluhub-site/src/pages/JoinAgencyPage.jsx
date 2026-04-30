import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const pillars = [
  {
    num: 'I',
    title: 'Global Learning Network',
    text: 'Access curated curricula, masterclasses, and mentorships from top industry professionals across fashion, modelling, branding, and digital creation.',
  },
  {
    num: 'II',
    title: 'Career Acceleration',
    text: 'Fast-track your career with hands-on workshops, portfolio reviews, and direct placement programmes connecting you with leading international agencies and brands.',
  },
  {
    num: 'III',
    title: 'Inclusive by Design',
    text: 'We champion every background, every body, every identity — building an education ecosystem where diversity is not an add-on but the foundation of everything we teach.',
  },
]

export default function JoinAgencyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 52 }}>
        {/* Hero */}
        <section style={{
          minHeight: '65vh',
          display: 'flex', alignItems: 'flex-end',
          padding: 'calc(var(--nav-h) + 80px) clamp(24px, 5vw, 80px) 64px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ position: 'absolute', top: 'calc(var(--nav-h) + 28px)', left: 'clamp(24px, 5vw, 80px)' }}
          >
            <Link to="/" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-ivory-3)',
              border: '1px solid rgba(200,168,106,0.18)', padding: '10px 22px',
              borderRadius: 4, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'rgba(200,168,106,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ivory-3)'; e.currentTarget.style.borderColor = 'rgba(200,168,106,0.18)' }}
            >← Back</Link>
          </motion.div>
          <div style={{
            position: 'absolute', top: '35%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122,23,40,0.1) 0%, transparent 65%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }} />
          <div style={{
            maxWidth: 'var(--container-max)', margin: '0 auto',
            width: '100%', position: 'relative', zIndex: 1,
          }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--color-gold)', marginBottom: 24,
              }}
            >
              International Education
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                fontWeight: 300, letterSpacing: '0.03em',
                color: 'var(--color-ivory)', lineHeight: 1.05,
                margin: 0, maxWidth: 800,
              }}
            >
              Elevate Your Craft
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300,
                color: 'var(--color-ivory-2)', marginTop: 28,
                maxWidth: 520, lineHeight: 1.7,
              }}
            >
              IncluHub bridges emerging talent with world-class education — equipping you with the skills, connections, and confidence to thrive on the international stage.
            </motion.p>
          </div>
        </section>

        {/* Pillars */}
        <section style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: '80px clamp(24px, 5vw, 80px) 120px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
          }}>
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '40px 36px',
                  border: '1px solid rgba(200,168,106,0.1)',
                  borderRadius: 2,
                  background: 'rgba(4,2,1,0.4)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Network logo watermark — bottom-left */}
                <div style={{
                  position: 'absolute', bottom: 6, left: 6,
                  width: 72, height: 72,
                  pointerEvents: 'none', overflow: 'hidden',
                }}>
                  <img src="/network-logo.png" alt="" style={{
                    width: '100%', height: '100%',
                    objectFit: 'contain', mixBlendMode: 'screen', opacity: 0.18,
                  }} />
                </div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.8rem', fontWeight: 300,
                  color: 'rgba(200,168,106,0.25)',
                  marginBottom: 20, lineHeight: 1,
                }}>
                  {p.num}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem', fontWeight: 400,
                  color: 'var(--color-ivory)', marginBottom: 14,
                  letterSpacing: '0.03em',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem', lineHeight: 1.75,
                  color: 'var(--color-ivory-3)', fontWeight: 300,
                }}>
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 80 }}
          >
            <p style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '1.15rem', color: 'var(--color-ivory-2)',
              marginBottom: 32,
            }}>
              Applications opening soon.
            </p>
            <a
              href="mailto:contact@inclumodels.com"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'var(--color-ivory)',
                background: 'var(--color-burgundy)',
                padding: '14px 36px',
                borderRadius: 2,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Express Interest
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
