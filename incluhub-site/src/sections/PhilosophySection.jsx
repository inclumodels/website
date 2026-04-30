import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PremiumCard from '../components/ui/PremiumCard'

const offerings = [
  {
    num: 'I',
    title: 'Dedicated Manager',
    text: 'Every user on IncluHub gets a personal AI-powered Dedicated Manager — your 24/7 career strategist that handles bookings, negotiations, brand matching, and scheduling so you can focus entirely on your craft.',
  },
  {
    num: 'II',
    title: 'Zero Commission for Creators',
    text: 'We believe creators deserve every rupee they earn. IncluHub charges zero commission on creator earnings — no hidden fees, no revenue cuts. Your talent, your income, fully yours.',
  },
  {
    num: 'III',
    title: 'Free Talent Access for Brands',
    text: 'Brands can discover, connect with, and cast from India\'s most diverse talent pool at no upfront cost. Browse verified portfolios, post casting calls, and build campaigns — access is completely free.',
  },
]

export default function PhilosophySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="philosophy" ref={ref} style={{
      padding: 'var(--section-pad-y) 0',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'linear-gradient(160deg, rgba(13,8,6,0.78) 0%, rgba(7,4,3,0.6) 100%)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(24px, 6vw, 80px)',
          marginBottom: 'clamp(36px, 6vw, 72px)',
        }}>
          <motion.p className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }} style={{ paddingTop: 6 }}
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--color-ivory)', lineHeight: 1.15,
            }}
          >
            What IncluHub offers
          </motion.h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: 'clamp(12px, 2vw, 16px)',
        }}>
          {offerings.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumCard intensity={8}>
                <div style={{
                  padding: 'clamp(30px, 5vw, 52px) clamp(22px, 4vw, 40px)',
                  background: 'linear-gradient(145deg, rgba(18,11,8,0.82) 0%, rgba(9,5,4,0.88) 100%)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 16, minHeight: 280,
                  boxShadow: 'inset 0 1px 0 rgba(245,240,232,0.08)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.8rem',
                    color: 'var(--color-gold)', letterSpacing: '0.18em',
                    opacity: 0.7, display: 'block', marginBottom: 28,
                  }}>
                    {p.num}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400,
                    color: 'var(--color-ivory)', marginBottom: 20, letterSpacing: '0.02em',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                    color: 'var(--color-ivory-3)', lineHeight: 1.85, fontWeight: 300,
                  }}>
                    {p.text}
                  </p>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
