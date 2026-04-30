import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { siteConfig } from '../config/site.config'

const links = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
]

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{
      padding: 'var(--section-pad-y) 0',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'linear-gradient(155deg, rgba(12,7,6,0.86) 0%, rgba(8,4,3,0.7) 100%)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 'clamp(28px, 7vw, 100px)',
        }}>

          <div>
            <motion.p className="section-label"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
            >
              Contact
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--color-ivory)', lineHeight: 1.2, marginBottom: 32,
              }}
            >
              Let's build something together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="value-hook"
            >
              Partnerships, campaigns, and growth conversations
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-ivory-3)', lineHeight: 2, fontWeight: 300 }}>
                {siteConfig.email}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-ivory-3)', lineHeight: 2, fontWeight: 300 }}>
                {siteConfig.location}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            {links.map((link, i) => (
              <motion.a key={link.label} href={link.href}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '22px 0',
                  borderBottom: '1px solid rgba(200,168,106,0.1)',
                  color: 'var(--color-ivory-2)', textDecoration: 'none',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 300 }}>
                  {link.label}
                </span>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.8rem', opacity: 0.6 }}>→</span>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              style={{ marginTop: 36 }}
            >
              <a href={`mailto:${siteConfig.email}`} style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.63rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--color-ivory)',
                background: 'var(--color-burgundy)',
                padding: '15px clamp(20px, 5vw, 36px)', borderRadius: 8, textDecoration: 'none',
              }}>
                Enter the Ecosystem
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
