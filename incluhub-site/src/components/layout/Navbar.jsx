import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { num: '01', label: 'Model',                      href: '/models',      route: true  },
  { num: '02', label: 'Brands',                     href: '/brands',      route: true  },
  { num: '03', label: 'Creators',                   href: '/creators',    route: true  },
  { num: '04', label: 'Blogs',                      href: '/blogs',       route: true  },
  { num: '05', label: 'Join International Education', href: '/join-agency', route: true  },
  { num: '06', label: 'Contact',                    href: '/#contact',    route: true  },
]

function HamburgerIcon({ open }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 22, cursor: 'pointer' }}>
      <motion.div
        animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        style={{ height: 1, background: 'var(--color-ivory-2)', transformOrigin: 'center', willChange: 'transform' }}
      />
      <motion.div
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ height: 1, background: 'var(--color-ivory-2)', width: '68%', transformOrigin: 'left' }}
      />
      <motion.div
        animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        style={{ height: 1, background: 'var(--color-ivory-2)', transformOrigin: 'center', willChange: 'transform' }}
      />
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(4,2,1,0)', 'rgba(4,2,1,0.92)'])
  const location = useLocation()

  // Close on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Top bar ── */}
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 300,
          height: 'var(--nav-h)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(14px, 4vw, 60px)',
          background: open ? 'transparent' : bg,
          backdropFilter: open ? 'none' : 'blur(24px)',
          WebkitBackdropFilter: open ? 'none' : 'blur(24px)',
          borderBottom: '1px solid rgba(200,168,106,0.07)',
          transition: 'backdrop-filter 0.3s',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 14 }}>
          <div style={{ width: 'clamp(34px, 7vw, 44px)', height: 'clamp(34px, 7vw, 44px)', flexShrink: 0 }}>
            <img
              src="/logo-mark.png"
              alt="IncluHub"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.92rem, 2.3vw, 1.5rem)',
            fontWeight: 300, letterSpacing: 'clamp(0.12em, 0.45vw, 0.28em)',
            textTransform: 'uppercase', color: 'var(--color-ivory)',
          }}>
            IncluHub
          </span>
        </Link>

        <button
          onClick={() => setOpen(p => !p)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 11,
            padding: 0, outline: 'none',
          }}
        >
          <HamburgerIcon open={open} />
          <motion.span
            key={open ? 'close' : 'menu'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-ivory-2)',
              minWidth: 36,
              textAlign: 'left',
            }}
          >
            {open ? 'Close' : 'Menu'}
          </motion.span>
        </button>
      </motion.nav>

      {/* ── Full-screen overlay menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              backgroundColor: '#060303',
              willChange: 'clip-path',
              overflowY: 'auto',
            }}
          >

            {/* Content */}
            <div style={{
              position: 'relative', zIndex: 1,
              maxWidth: 'var(--container-max)',
              margin: '0 auto',
              minHeight: '100vh',
              display: 'flex', flexDirection: 'column',
              padding: 'calc(var(--nav-h) + 48px) clamp(24px, 5vw, 80px) 60px',
            }}>
              {/* Menu items */}
              <nav style={{ flex: 1 }}>
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.08 + i * 0.075,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'clamp(16px, 3vw, 32px)',
                      borderBottom: '1px solid rgba(200,168,106,0.07)',
                      padding: 'clamp(14px, 2.5vh, 24px) 0',
                    }}
                  >
                    {/* Number tag */}
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.52rem',
                      letterSpacing: '0.18em',
                      color: 'rgba(200,168,106,0.4)',
                      minWidth: 28,
                      flexShrink: 0,
                    }}>
                      [{item.num}]
                    </span>

                    {/* Label */}
                    {item.route ? (
                      <MenuLink to={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </MenuLink>
                    ) : (
                      <MenuAnchor href={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </MenuAnchor>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Footer strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 32,
                  borderTop: '1px solid rgba(200,168,106,0.09)',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ivory-3)',
                }}>
                  Hyderabad, India
                </span>
                <a
                  href="mailto:contact@inclumodels.com"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.08em',
                    color: 'var(--color-ivory-3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-ivory-3)'}
                >
                  contact@inclumodels.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Shared label styles ── */
const labelBase = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(1.9rem, 4.5vw, 3.5rem)',
  fontWeight: 300,
  letterSpacing: '0.05em',
  color: 'var(--color-ivory)',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'color 0.22s ease, letter-spacing 0.3s ease',
  willChange: 'transform',
}

function MenuLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={labelBase}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--color-gold)'
        e.currentTarget.style.letterSpacing = '0.1em'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--color-ivory)'
        e.currentTarget.style.letterSpacing = '0.05em'
      }}
    >
      {children}
    </Link>
  )
}

function MenuAnchor({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={labelBase}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--color-gold)'
        e.currentTarget.style.letterSpacing = '0.1em'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--color-ivory)'
        e.currentTarget.style.letterSpacing = '0.05em'
      }}
    >
      {children}
    </a>
  )
}
