import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const digitals = [
  { label: 'Headshot',    description: 'Face forward. No makeup. Plain background.' },
  { label: 'Profile',     description: 'Side view. Shoulders back. Natural expression.' },
  { label: '3/4 Profile', description: 'Turn 45°. Both eyes visible. Relaxed posture.' },
  { label: 'Full Length', description: 'Head to toe. Fitted plain clothing. Stand straight.' },
]

const EMAIL = 'contact@incluhub.in'

const emailBody = `Subject: Model Application – [Your Full Name]

PERSONAL DETAILS
Full Name        :
Date of Birth    :
Gender           :
Nationality      :
City / Country   :
Contact Number   :
Instagram        :

MEASUREMENTS
Height      : (cm / ft-in)
Bust        : (cm / inches)
Waist       : (cm / inches)
Hips        : (cm / inches)
Shoe Size   : (EU / UK)
Hair Colour :
Eye Colour  :

EXPERIENCE
(Brief description or "No prior experience")

ATTACHMENTS
Please attach: 1. Headshot  2. Profile  3. 3/4 Profile  4. Full Length`

export default function JoinAgencyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 120 }}>

        {/* ── Hero — full screen, centered ── */}
        <section style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 'calc(var(--nav-h) + 40px) clamp(24px, 5vw, 80px) 60px',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Back button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ position: 'absolute', top: 'calc(var(--nav-h) + 28px)', left: 'clamp(24px, 5vw, 80px)' }}>
            <Link to="/" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--color-ivory-3)',
              border: '1px solid rgba(200,168,106,0.18)', padding: '10px 22px',
              borderRadius: 4, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.borderColor = 'rgba(200,168,106,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ivory-3)'; e.currentTarget.style.borderColor = 'rgba(200,168,106,0.18)' }}
            >← Back</Link>
          </motion.div>

          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 800, height: 800, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122,23,40,0.12) 0%, transparent 65%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 32 }}>
              International Education Studio
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 13vw, 11rem)',
                fontWeight: 300, letterSpacing: '0.04em',
                color: 'var(--color-ivory)', lineHeight: 1,
                margin: 0,
              }}>
              Apply to Join
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ width: 48, height: '1px', background: 'rgba(200,168,106,0.4)', margin: '40px auto 0' }} />
          </div>
        </section>

        {/* ── Editorial Brief ── */}
        <section style={{ textAlign: 'center', padding: '0 clamp(24px, 5vw, 80px) 100px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, lineHeight: 2, color: 'var(--color-ivory-2)', maxWidth: 560 }}>
              We are looking for inspirational faces<br />No prior experience necessary
            </p>
            <div style={{ width: 36, height: '1px', background: 'rgba(200,168,106,0.3)' }} />
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, lineHeight: 2, color: 'var(--color-ivory-2)' }}>
              Female 170 cm and above · Male 183 cm and above<br />Ages 16 – 26
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300, lineHeight: 2, color: 'var(--color-ivory-2)' }}>
              No makeup — we need to see how you look naturally
            </p>
            <div style={{ width: 36, height: '1px', background: 'rgba(200,168,106,0.3)' }} />
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', fontWeight: 300, color: 'var(--color-ivory-3)' }}>
              We will only respond to successful applicants
            </p>
          </motion.div>
        </section>

        {/* ── 4 Digitals ── */}
        <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px) 100px', textAlign: 'center' }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 48 }}>
            Your Four Digitals
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(16px, 3vw, 32px)' }}>
            {digitals.map((d, i) => (
              <motion.div key={d.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}>
                <div style={{
                  aspectRatio: '3/4', border: '1px solid rgba(200,168,106,0.2)', borderRadius: 2,
                  background: 'rgba(200,168,106,0.02)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 16,
                }}>
                  <span style={{ position: 'absolute', top: 14, left: 18, fontFamily: 'var(--font-body)', fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(200,168,106,0.3)' }}>0{i + 1}</span>
                  <svg width="56" height="84" viewBox="0 0 64 96" fill="none" style={{ opacity: 0.18, marginBottom: 14 }}>
                    {i === 0 && (<><circle cx="32" cy="22" r="14" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M6 96 C6 68 14 58 32 58 C50 58 58 68 58 96" stroke="rgba(200,168,106,1)" strokeWidth="1.2" fill="none"/></>)}
                    {i === 1 && (<><circle cx="28" cy="18" r="12" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M16 96 C16 68 20 56 28 52 C36 52 44 56 46 62 L46 96" stroke="rgba(200,168,106,1)" strokeWidth="1.2" fill="none"/><line x1="28" y1="30" x2="28" y2="52" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/></>)}
                    {i === 2 && (<><ellipse cx="30" cy="18" rx="13" ry="14" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M8 96 C8 68 16 56 30 52 C44 52 52 60 54 68 L54 96" stroke="rgba(200,168,106,1)" strokeWidth="1.2" fill="none"/></>)}
                    {i === 3 && (<><circle cx="32" cy="12" r="10" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><line x1="32" y1="22" x2="32" y2="56" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M32 38 L18 54" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M32 38 L46 54" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M32 56 L22 80" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><path d="M32 56 L42 80" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><line x1="22" y1="80" x2="22" y2="94" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/><line x1="42" y1="80" x2="42" y2="94" stroke="rgba(200,168,106,1)" strokeWidth="1.2"/></>)}
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,168,106,0.35)', textAlign: 'center', padding: '0 14px', lineHeight: 1.7 }}>
                    {d.description}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--color-ivory-2)', textAlign: 'center', margin: 0 }}>
                  {d.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── What to include ── */}
        <section style={{ display: 'flex', justifyContent: 'center', padding: '0 clamp(24px, 5vw, 80px) 100px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{
              border: '1px solid rgba(200,168,106,0.15)', borderRadius: 2,
              padding: 'clamp(32px, 5vw, 56px)', background: 'rgba(200,168,106,0.02)',
              position: 'relative', width: '100%', maxWidth: 760,
            }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 36, height: 36, borderTop: '1px solid rgba(200,168,106,0.4)', borderLeft: '1px solid rgba(200,168,106,0.4)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderBottom: '1px solid rgba(200,168,106,0.4)', borderRight: '1px solid rgba(200,168,106,0.4)' }} />

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 32, textAlign: 'center' }}>
              Include in Your Email
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 60px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,168,106,0.45)', marginBottom: 16 }}>Personal</p>
                {['Full Name','Date of Birth','Gender','Nationality','City / Country','Contact Number','Instagram'].map(f => <FieldRow key={f} label={f} />)}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,168,106,0.45)', marginBottom: 16 }}>Measurements</p>
                {[['Height','cm / ft-in'],['Bust','cm / in'],['Waist','cm / in'],['Hips','cm / in'],['Shoe Size','EU / UK'],['Hair Colour',''],['Eye Colour','']].map(([f,n]) => <FieldRow key={f} label={f} note={n} />)}
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.74rem', color: 'var(--color-ivory-3)', lineHeight: 1.8, marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(200,168,106,0.08)', textAlign: 'center' }}>
              Include a brief note on your experience — or simply write <em style={{ color: 'var(--color-ivory-2)' }}>"No prior experience"</em>.
            </p>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '0 clamp(24px, 5vw, 80px)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Send Your Application</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '0.03em', color: 'var(--color-ivory)', margin: 0 }}>
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>{EMAIL}</a>
          </h2>
          <button
            onClick={() => { window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Model Application – [Your Full Name]')}&body=${encodeURIComponent(emailBody)}` }}
            style={{
              marginTop: 8, background: 'var(--color-burgundy, #7a1728)', border: 'none', borderRadius: 2,
              padding: '18px 60px', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)',
              fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Open Email Client
          </button>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-ivory-3)' }}>
            We can only respond to successful applicants.
          </p>
        </motion.section>

      </main>
      <Footer />
    </>
  )
}

function FieldRow({ label, note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(200,168,106,0.07)' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: 'var(--color-ivory-2)', minWidth: 130, flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, borderBottom: '1px dashed rgba(200,168,106,0.12)', height: 1, marginBottom: 2 }} />
      {note && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(200,168,106,0.38)', fontStyle: 'italic', flexShrink: 0 }}>{note}</span>}
    </div>
  )
}
