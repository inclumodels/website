import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PremiumCard from '../components/ui/PremiumCard'

export default function PolicySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="policy" ref={ref} style={{
      padding: 'clamp(72px, 11vw, 100px) 0 clamp(84px, 13vw, 120px)',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'linear-gradient(180deg, rgba(10,6,4,0.82) 0%, rgba(6,3,2,0.92) 100%)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(24px, 6vw, 80px)',
        }}>
          <motion.p className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }} style={{ paddingTop: 8 }}
          >
            Policy
          </motion.p>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: '2.2rem',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--color-ivory)', marginBottom: 20,
              }}
            >
              No Refund Policy
            </motion.h3>

            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ width: 36, height: 1, background: 'var(--color-gold)', opacity: 0.35, transformOrigin: 'left', marginBottom: 24 }}
            />

            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--color-ivory-3)', lineHeight: 1.9,
                fontWeight: 300, marginBottom: 48,
              }}
            >
              All subscriptions and platform access fees paid to IncluHub are non-refundable. Once a membership or service is activated, no refunds will be issued under any circumstance. We encourage all users to review plan details carefully before committing to a paid tier. For queries, write to us at contact@inclumodels.com.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                gap: 'clamp(10px, 2vw, 16px)',
              }}
            >
              {[1, 2, 3].map(i => (
                <PremiumCard key={i} intensity={10}>
                  <div style={{
                    aspectRatio: '4/3',
                    background: 'linear-gradient(145deg, rgba(14,10,7,0.7) 0%, rgba(8,5,3,0.75) 100%)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', color: 'var(--color-ivory-3)',
                      fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    }}>
                      Photo {i}
                    </span>
                  </div>
                </PremiumCard>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
