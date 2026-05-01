import { useState, useRef } from 'react'
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

const digitals = [
  { id: 'headshot',       label: 'Headshot',     hint: 'Face forward, neutral expression, no makeup' },
  { id: 'profile',        label: 'Profile',       hint: 'Side view, chin level, shoulders relaxed' },
  { id: 'three-quarter',  label: '3/4 Profile',   hint: 'Three-quarter angle, natural posture' },
  { id: 'full-length',    label: 'Full Length',   hint: 'Head to toe, plain background, fitted clothing' },
]

const leftFields = [
  { key: 'firstname',    label: 'Firstname',       required: true },
  { key: 'lastname',     label: 'Lastname',        required: true },
  { key: 'email',        label: 'Email',           required: true, type: 'email' },
  { key: 'phone',        label: 'Contact Number',  required: true, type: 'tel' },
  { key: 'address',      label: 'Address' },
  { key: 'city',         label: 'City' },
  { key: 'state',        label: 'State' },
]

const rightFields = [
  { key: 'height',       label: 'Height' },
  { key: 'bust',         label: 'Bust' },
  { key: 'waist',        label: 'Waist' },
  { key: 'hips',         label: 'Hips' },
  { key: 'shoeSize',     label: 'Shoe Size' },
  { key: 'hairColor',    label: 'Hair Color' },
  { key: 'eyeColor',     label: 'Eye Color' },
]

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(200,168,106,0.3)',
  borderRadius: 2,
  padding: '13px 16px',
  color: 'var(--color-ivory)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.82rem',
  letterSpacing: '0.04em',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

function PhotoUploadCard({ digital, preview, onSelect }) {
  const ref = useRef()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Preview card */}
      <div
        onClick={() => ref.current.click()}
        style={{
          aspectRatio: '3/4',
          border: '1px solid rgba(200,168,106,0.25)',
          borderRadius: 2,
          background: preview ? 'none' : 'rgba(200,168,106,0.03)',
          backgroundImage: preview ? `url(${preview})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,168,106,0.6)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(200,168,106,0.25)'}
      >
        {!preview && (
          <>
            {/* Silhouette guide lines */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 8, pointerEvents: 'none',
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.2 }}>
                <circle cx="20" cy="10" r="7" stroke="rgba(200,168,106,1)" strokeWidth="1"/>
                <path d="M8 38 C8 26 12 22 20 22 C28 22 32 26 32 38" stroke="rgba(200,168,106,1)" strokeWidth="1" fill="none"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.52rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(200,168,106,0.35)',
                textAlign: 'center',
                padding: '0 16px',
              }}>
                {digital.hint}
              </span>
            </div>
          </>
        )}
        {/* Hover overlay on preview */}
        {preview && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(4,2,1,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0'}
          >
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.58rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}>Change</span>
          </div>
        )}
      </div>

      {/* Label */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: 'var(--color-ivory-2)',
        textAlign: 'center',
        margin: 0,
      }}>
        {digital.label}
      </p>

      {/* Upload button */}
      <button
        type="button"
        onClick={() => ref.current.click()}
        style={{
          background: 'transparent',
          border: '1px solid rgba(200,168,106,0.35)',
          borderRadius: 2,
          padding: '10px 0',
          color: 'var(--color-ivory-2)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.58rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
          width: '100%',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,168,106,0.8)'; e.currentTarget.style.color = 'var(--color-gold)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,168,106,0.35)'; e.currentTarget.style.color = 'var(--color-ivory-2)' }}
      >
        {preview ? 'Replace' : 'Upload'}
      </button>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files[0]
          if (file) onSelect(URL.createObjectURL(file))
        }}
      />
    </div>
  )
}

function FormField({ field, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.62rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-ivory-3)',
      }}>
        {field.label}{field.required && ' *'}
      </label>
      <input
        type={field.type || 'text'}
        required={field.required}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'rgba(200,168,106,0.75)'}
        onBlur={e => e.target.style.borderColor = 'rgba(200,168,106,0.3)'}
      />
    </div>
  )
}

export default function JoinAgencyPage() {
  const [previews, setPreviews] = useState({})
  const [form, setForm] = useState({
    firstname: '', lastname: '', email: '', phone: '',
    address: '', city: '', state: '',
    height: '', bust: '', waist: '', hips: '',
    shoeSize: '', hairColor: '', eyeColor: '',
    message: '',
  })

  function setField(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      `Name: ${form.firstname} ${form.lastname}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.address && `Address: ${form.address}`,
      form.city && `City: ${form.city}`,
      form.state && `State: ${form.state}`,
      '',
      form.height && `Height: ${form.height}`,
      form.bust && `Bust: ${form.bust}`,
      form.waist && `Waist: ${form.waist}`,
      form.hips && `Hips: ${form.hips}`,
      form.shoeSize && `Shoe Size: ${form.shoeSize}`,
      form.hairColor && `Hair Color: ${form.hairColor}`,
      form.eyeColor && `Eye Color: ${form.eyeColor}`,
      form.message && `\nMessage:\n${form.message}`,
      '',
      '---',
      'Please attach your 4 digitals to this email:',
      '1. Headshot  2. Profile  3. 3/4 Profile  4. Full Length',
    ].filter(Boolean).join('\n')

    const subject = `Model Application — ${form.firstname} ${form.lastname}`
    window.location.href = `mailto:contact@inclumodels.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{
          minHeight: '65vh',
          display: 'flex', alignItems: 'flex-end',
          padding: 'calc(var(--nav-h) + 80px) clamp(24px, 5vw, 80px) 64px',
          position: 'relative', overflow: 'hidden',
        }}>
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

          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--color-gold)', marginBottom: 24,
              }}
            >
              International Education Studio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                fontWeight: 300, letterSpacing: '0.03em',
                color: 'var(--color-ivory)', lineHeight: 1.05,
                margin: 0, maxWidth: 800,
              }}
            >
              Submit Your Digitals
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300,
                color: 'var(--color-ivory-2)', marginTop: 28,
                maxWidth: 560, lineHeight: 1.7,
              }}
            >
              IncluHub is always looking for new faces. Upload your four digitals and complete your details below — we will reach out to successful candidates directly.
            </motion.p>
          </div>
        </section>

        {/* ── Pillars ── */}
        <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '60px clamp(24px, 5vw, 80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px, 4vw, 48px)' }}>
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
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', bottom: 6, left: 6, width: 72, height: 72, pointerEvents: 'none', overflow: 'hidden' }}>
                  <img src="/network-logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen', opacity: 0.18 }} />
                </div>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 300, color: 'rgba(200,168,106,0.25)', marginBottom: 20, lineHeight: 1 }}>
                  {p.num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-ivory)', marginBottom: 14, letterSpacing: '0.03em' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.75, color: 'var(--color-ivory-3)', fontWeight: 300 }}>
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Application Form ── */}
        <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '80px clamp(24px, 5vw, 80px) 0' }}>

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ marginBottom: 64 }}
          >
            <span style={{
              display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.58rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--color-gold)', marginBottom: 16,
            }}>
              Application
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300, letterSpacing: '0.03em',
              color: 'var(--color-ivory)', margin: 0,
            }}>
              Your Four Digitals
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.82rem',
              color: 'var(--color-ivory-3)', lineHeight: 1.75,
              marginTop: 18, maxWidth: 560,
            }}>
              Upload one photo for each pose below. No makeup, plain background, natural lighting. These digitals are how we see the real you.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>

            {/* ── 4 Digitals grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 'clamp(16px, 3vw, 32px)',
                marginBottom: 80,
              }}
            >
              {digitals.map(d => (
                <PhotoUploadCard
                  key={d.id}
                  digital={d}
                  preview={previews[d.id]}
                  onSelect={url => setPreviews(p => ({ ...p, [d.id]: url }))}
                />
              ))}
            </motion.div>

            {/* ── Personal details ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ marginBottom: 32 }}
            >
              <span style={{
                display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'var(--color-gold)', marginBottom: 36,
              }}>
                Personal Details
              </span>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'clamp(16px, 3vw, 40px) clamp(24px, 5vw, 80px)',
              }}>
                {/* Left column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {leftFields.map(f => (
                    <FormField key={f.key} field={f} value={form[f.key]} onChange={v => setField(f.key, v)} />
                  ))}
                </div>

                {/* Right column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {rightFields.map(f => (
                    <FormField key={f.key} field={f} value={form[f.key]} onChange={v => setField(f.key, v)} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Message ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              style={{ marginBottom: 56 }}
            >
              <label style={{
                display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--color-ivory-3)', marginBottom: 8,
              }}>
                Message
              </label>
              <textarea
                value={form.message}
                onChange={e => setField('message', e.target.value)}
                rows={6}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: 140,
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(200,168,106,0.75)'}
                onBlur={e => e.target.style.borderColor = 'rgba(200,168,106,0.3)'}
              />
            </motion.div>

            {/* ── Disclaimer + Submit ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}
            >
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.68rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-ivory-3)', maxWidth: 640, lineHeight: 1.8,
              }}>
                By sending us your application, you agree with our terms and conditions and the treatment of your personal data by our agency.
              </p>

              <button
                type="submit"
                style={{
                  background: 'var(--color-burgundy, #7a1728)',
                  border: 'none',
                  borderRadius: 2,
                  padding: '16px 52px',
                  color: 'var(--color-ivory)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Submit Application
              </button>

              <p style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: '0.88rem', color: 'var(--color-ivory-3)',
              }}>
                Please note we can only respond to successful applicants.
              </p>
            </motion.div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
