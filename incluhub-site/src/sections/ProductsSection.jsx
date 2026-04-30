import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { EcosystemLogo, SocialLogo, StoreLogo, TwinLogo } from '../components/ui/ProductLogos'
import PremiumCard from '../components/ui/PremiumCard'

const products = [
  {
    id: 'ecosystem', label: 'The Ecosystem', tagline: 'The complete digital infrastructure',
    description: 'Placeholder — describe the ecosystem product here.',
    href: '/ecosystem', Logo: EcosystemLogo,
    status: 'Live Now', statusActive: true,
    bg: 'linear-gradient(145deg, rgba(90,20,12,0.7) 0%, rgba(40,8,4,0.75) 100%)',
  },
  {
    id: 'social', label: 'IncluSocial', tagline: 'Community built for creators',
    description: 'Placeholder — describe the social product here.',
    href: '/social', Logo: SocialLogo,
    status: 'Coming Soon', statusActive: false,
    bg: 'linear-gradient(145deg, rgba(14,10,8,0.72) 0%, rgba(8,5,3,0.78) 100%)',
  },
  {
    id: 'store', label: 'IncluStore', tagline: 'Fashion commerce redefined',
    description: 'Placeholder — describe the store product here.',
    href: '/store', Logo: StoreLogo,
    status: 'Coming Soon', statusActive: false,
    bg: 'linear-gradient(145deg, rgba(14,10,8,0.72) 0%, rgba(8,5,3,0.78) 100%)',
  },
  {
    id: 'twin', label: 'IncluTwins', tagline: 'Your AI digital identity',
    description: 'Placeholder — describe the twin product here.',
    href: '/twin', Logo: TwinLogo,
    status: 'Coming Soon', statusActive: false,
    bg: 'linear-gradient(145deg, rgba(14,10,8,0.72) 0%, rgba(8,5,3,0.78) 100%)',
  },
]

export default function ProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section id="products" ref={ref} style={{
      padding: 'var(--section-pad-y) 0',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'transparent',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 72 }}>
          <motion.p className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }} style={{ paddingTop: 6 }}
          >
            Products
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
            Four products. One ecosystem.
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PremiumCard onClick={() => navigate(p.href)} intensity={12}>
                <div style={{
                  padding: '32px 28px 28px',
                  background: p.bg,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 16,
                  display: 'flex', flexDirection: 'column',
                  minHeight: 340,
                }}>
                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                      opacity: p.statusActive ? 1 : 0.5,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                      opacity: p.statusActive ? 1 : 0.65,
                    }}>
                      {p.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '1px solid rgba(210,205,198,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24, background: 'rgba(0,0,0,0.25)',
                  }}>
                    <p.Logo size={26} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400,
                    color: 'var(--color-ivory)', marginBottom: 6, letterSpacing: '0.01em',
                  }}>
                    {p.label}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.63rem',
                    color: 'var(--color-gold)', letterSpacing: '0.15em',
                    textTransform: 'uppercase', marginBottom: 14, opacity: 0.85,
                  }}>
                    {p.tagline}
                  </p>


                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                    color: 'var(--color-ivory-3)', lineHeight: 1.75,
                    fontWeight: 300, flex: 1, marginBottom: 24,
                  }}>
                    {p.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                      color: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                    }}>
                      {p.statusActive ? 'Enter' : 'Notify Me'}
                    </span>
                    <span style={{ color: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)', fontSize: '0.7rem', opacity: 0.6 }}>→</span>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
