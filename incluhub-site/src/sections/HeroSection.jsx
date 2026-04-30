import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ChatBar from '../components/ChatBar'
import { EcosystemLogo, SocialLogo, StoreLogo, TwinLogo } from '../components/ui/ProductLogos'
import PremiumCard from '../components/ui/PremiumCard'

const products = [
  {
    id: 'ecosystem',
    label: 'The Ecosystem',
    tagline: 'Complete digital infrastructure',
    description: 'Your all-in-one platform connecting models, brands, creators, and agencies. Access booking tools, portfolio management, and a curated talent network from one powerful dashboard.',
    href: '/ecosystem',
    Logo: EcosystemLogo,
    status: 'Live Now',
    statusActive: true,
    bg: 'linear-gradient(145deg, rgba(90,20,12,0.7) 0%, rgba(40,8,4,0.75) 100%)',
  },
  {
    id: 'social',
    label: 'IncluSocial',
    tagline: 'Community built for creators',
    description: 'A fashion-forward social platform built exclusively for models, stylists, and creators. Share your work, grow your audience, and collaborate with premium talent.',
    href: '/social',
    Logo: SocialLogo,
    status: 'Coming Soon',
    statusActive: false,
    bg: 'linear-gradient(145deg, rgba(14,10,8,0.72) 0%, rgba(8,5,3,0.78) 100%)',
  },
  {
    id: 'store',
    label: 'IncluStore',
    tagline: 'Fashion commerce redefined',
    description: 'A curated marketplace where fashion brands list their latest collections. Models and creators shop, endorse, and co-create — turning personal style into commerce.',
    href: '/store',
    Logo: StoreLogo,
    status: 'Coming Soon',
    statusActive: false,
    bg: 'linear-gradient(145deg, rgba(14,10,8,0.72) 0%, rgba(8,5,3,0.78) 100%)',
  },
  {
    id: 'twin',
    label: 'IncluTwins',
    tagline: 'Your AI digital identity',
    description: 'Your AI-powered digital replica built for brand deals, virtual runway shows, and 24/7 digital presence — so you can work without limits and be everywhere at once.',
    href: '/twin',
    Logo: TwinLogo,
    status: 'Coming Soon',
    statusActive: false,
    bg: 'linear-gradient(145deg, rgba(14,10,8,0.72) 0%, rgba(8,5,3,0.78) 100%)',
  },
]

export default function HeroSection({ onOpenChat, onIntroStateChange }) {
  const [revealed, setRevealed] = useState(false)
  const [managerVisible, setManagerVisible] = useState(false)
  const navigate = useNavigate()
  const splitDistance = typeof window !== 'undefined' && window.innerWidth < 640 ? 140 : 340
  const silverWordStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.2rem, 9vw, 8.5rem)',
    fontWeight: 300,
    letterSpacing: '0.25em',
    lineHeight: 1,
    userSelect: 'none',
    color: 'transparent',
    backgroundImage: 'linear-gradient(180deg, #f2f4f8 0%, #d7dde6 42%, #aeb8c7 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    textShadow: '0 0 18px rgba(214, 219, 228, 0.25)',
  }

  useEffect(() => {
    onIntroStateChange?.(revealed)
  }, [revealed, onIntroStateChange])

  useEffect(() => {
    document.body.style.overflow = revealed ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [revealed])

  // Dedicated Manager bar appears ONLY after products are fully visible
  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => setManagerVisible(true), 1800)
      return () => clearTimeout(timer)
    }
  }, [revealed])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'transparent',
      paddingBottom: 80,
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,70,30,0.09) 0%, transparent 65%)',
        filter: 'blur(90px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── PRE-REVEAL: Idle logo — waits for user click ── */}
      <motion.div
        animate={revealed ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 20,
          pointerEvents: revealed ? 'none' : 'auto',
        }}
      >
        {/* Interactive logo area — only center logo reacts on hover */}
        <motion.div
          onClick={() => !revealed && setRevealed(true)}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 20,
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(12px, 2vw, 24px)',
          }}>
            <motion.span
              animate={revealed ? { x: -splitDistance, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              style={silverWordStyle}
            >
              INCLU
            </motion.span>

            {/* Logo mark — fades out during transition */}
            <motion.div
              animate={revealed ? { scale: 1.15, opacity: 0 } : { scale: [1, 1.12, 1], opacity: 1 }}
              transition={revealed ? { duration: 1.05, delay: 0.12, ease: [0.22, 1, 0.36, 1] } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.22, transition: { duration: 0 } }}
              whileTap={{ scale: 1.05 }}
              style={{
                flexShrink: 0,
                width: 'clamp(64px, 9vw, 100px)',
                height: 'clamp(64px, 9vw, 100px)',
                filter: 'drop-shadow(0 0 22px rgba(214, 217, 224, 0.65))',
              }}
            >
              <img
                src="/logo-mark.png"
                alt="IncluHub"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'grayscale(1) brightness(1.28) contrast(1.05)',
                }}
              />
            </motion.div>

            <motion.span
              animate={revealed ? { x: splitDistance, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              style={silverWordStyle}
            >
              HUB
            </motion.span>
          </div>

          <motion.p
            animate={revealed ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', fontWeight: 300,
              color: 'var(--color-ivory-2)', letterSpacing: '0.05em',
              lineHeight: 1.65, maxWidth: 480, textAlign: 'center',
            }}
          >
            The one stop for models, fashion, brands &amp; talents
          </motion.p>

          <motion.span
            animate={revealed
              ? { opacity: 0 }
              : { opacity: [0.3, 0.6, 0.3] }
            }
            transition={revealed
              ? { duration: 0.45 }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.52rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--color-ivory-3)',
            }}
          >
            Enter the world
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ── POST-REVEAL: product cards + floating Dedicated Manager ── */}
      <motion.div
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.05, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 'calc(var(--nav-h) + clamp(32px, 5vh, 60px))',
          paddingBottom: 0,
          position: 'relative', zIndex: 1,
          pointerEvents: revealed ? 'auto' : 'none',
        }}
      >
        {/* Product cards */}
        <div style={{
          width: '100%', maxWidth: 'var(--container-max)',
          padding: '0 clamp(20px, 4vw, 60px)',
          flex: 1,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(10px, 1.5vw, 16px)',
          }}>
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 60 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                  duration: 0.85,
                  delay: revealed ? 0.5 + i * 0.12 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.div
                  animate={revealed ? { y: [0, -8, 0] } : { y: 0 }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5 + 1.5,
                  }}
                >
                  <PremiumCard onClick={() => navigate(p.href)} intensity={12}>
                    <div style={{
                      padding: '28px 24px 24px',
                      background: p.bg,
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: 16,
                      display: 'flex', flexDirection: 'column',
                      minHeight: 300,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                        <motion.div
                          animate={p.statusActive ? { opacity: [1, 0.3, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            width: 5, height: 5, borderRadius: '50%',
                            background: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                            opacity: p.statusActive ? 1 : 0.4,
                          }}
                        />
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.57rem',
                          letterSpacing: '0.22em', textTransform: 'uppercase',
                          color: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                          opacity: p.statusActive ? 1 : 0.6,
                        }}>
                          {p.status}
                        </span>
                      </div>

                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        border: '1px solid rgba(210,205,198,0.18)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 20, background: 'rgba(0,0,0,0.22)',
                      }}>
                        <p.Logo size={24} />
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400,
                        color: 'var(--color-ivory)', marginBottom: 5, letterSpacing: '0.01em',
                      }}>
                        {p.label}
                      </h3>

                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                        color: 'var(--color-gold)', letterSpacing: '0.15em',
                        textTransform: 'uppercase', marginBottom: 12, opacity: 0.8,
                      }}>
                        {p.tagline}
                      </p>

                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                        color: 'var(--color-ivory-3)', lineHeight: 1.75,
                        fontWeight: 300, flex: 1, marginBottom: 20,
                      }}>
                        {p.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                          color: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                          letterSpacing: '0.22em', textTransform: 'uppercase',
                        }}>
                          {p.statusActive ? 'Enter' : 'Notify Me'}
                        </span>
                        <span style={{ color: p.statusActive ? 'var(--color-gold)' : 'var(--color-ivory-3)', fontSize: '0.7rem', opacity: 0.55 }}>→</span>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dedicated Manager bar — floating highlight, appears AFTER products */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={managerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', justifyContent: 'center',
            marginTop: 'clamp(28px, 5vh, 48px)',
            paddingBottom: 8,
            position: 'relative', zIndex: 20,
            filter: 'drop-shadow(0 4px 24px rgba(200,168,106,0.08))',
          }}
        >
          <ChatBar
            visible={managerVisible}
            interactive={true}
            onClick={onOpenChat}
            size="large"
            showIcons={false}
            label="Dedicated Manager"
            prompt="I am your dedicated manager, ask me anything that you want"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
