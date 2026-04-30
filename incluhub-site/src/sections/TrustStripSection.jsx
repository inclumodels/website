import { motion } from 'framer-motion'

const stats = [
  { value: '24/7', label: 'Manager AI Support' },
  { value: '4', label: 'Integrated Products' },
  { value: '0%', label: 'Creator Commission' },
  { value: '1', label: 'Unified Fashion Ecosystem' },
]

export default function TrustStripSection() {
  return (
    <section style={{
      borderTop: '1px solid rgba(200,168,106,0.12)',
      borderBottom: '1px solid rgba(200,168,106,0.12)',
      background: 'linear-gradient(135deg, rgba(18,10,7,0.9) 0%, rgba(10,5,3,0.9) 100%)',
      padding: 'clamp(24px, 4vw, 38px) 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(170px, 100%), 1fr))',
          gap: 'clamp(10px, 2vw, 20px)',
        }}>
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              style={{
                border: '1px solid rgba(226,207,160,0.18)',
                borderRadius: 12,
                padding: '14px 16px',
                background: 'rgba(12,7,5,0.46)',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.6vw, 2rem)',
                color: 'var(--color-gold-light)',
                fontStyle: 'italic',
                lineHeight: 1.05,
              }}>
                {item.value}
              </div>
              <div style={{
                marginTop: 8,
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-ivory-2)',
              }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
