import { motion } from 'framer-motion'

export default function CtaBandSection({ onOpenChat }) {
  return (
    <section style={{
      padding: 'clamp(56px, 9vw, 90px) 0',
      borderTop: '1px solid rgba(200,168,106,0.14)',
      borderBottom: '1px solid rgba(200,168,106,0.14)',
      background: 'linear-gradient(120deg, rgba(34,16,12,0.92) 0%, rgba(13,7,5,0.92) 100%)',
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            border: '1px solid rgba(226,207,160,0.24)',
            borderRadius: 18,
            padding: 'clamp(24px, 4vw, 44px)',
            background: 'linear-gradient(145deg, rgba(22,12,9,0.8) 0%, rgba(10,5,4,0.86) 100%)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.48)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
          }}
        >
          <div>
            <p className="value-hook" style={{ marginBottom: 10 }}>Automation First Experience</p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-ivory)',
              fontSize: 'clamp(1.4rem, 3.2vw, 2.3rem)',
              lineHeight: 1.2,
            }}>
              Skip surfing. Ask your manager and move faster.
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenChat}
            style={{
              border: '1px solid rgba(255,235,190,0.68)',
              background: 'linear-gradient(145deg, #E2CFA0 0%, #C8A86A 100%)',
              color: '#2A1706',
              borderRadius: 999,
              padding: '14px 26px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 600,
              boxShadow: '0 12px 32px rgba(200,168,106,0.36)',
            }}
          >
            Open Manager Chat
          </button>
        </motion.div>
      </div>
    </section>
  )
}
