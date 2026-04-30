import { motion } from 'framer-motion'
import PremiumCard from '../components/ui/PremiumCard'

const roles = [
  {
    id: 'owners',
    title: 'Owners',
    identity: 'Full ecosystem control',
    access: 'Full Access',
    cta: 'Enter Dashboard',
    icon: 'O',
    prominent: true,
    capabilities: [
      'Access all platform data across brands, talents, artists, and studio',
      'View analytics and performance insights',
      'Manage and oversee the complete creator network',
      'Control collaborations and platform-level decisions',
    ],
  },
  {
    id: 'artists',
    title: 'Artists',
    identity: 'Build and collaborate',
    access: 'Partial Access',
    cta: 'Explore Talent',
    icon: 'A',
    prominent: false,
    capabilities: [
      'Hire and collaborate with talents',
      'Access creator database including models and talents',
      'Work on projects inside the platform ecosystem',
      'No ownership or studio control permissions',
    ],
  },
  {
    id: 'talents',
    title: 'Talents',
    identity: 'Apply and grow',
    access: 'Limited Access',
    cta: 'Apply Now',
    icon: 'T',
    prominent: false,
    capabilities: [
      'Apply to brand opportunities',
      'Build profile visibility and personal growth',
      'No hiring or management access',
      'No ecosystem control permissions',
    ],
  },
]

export default function CreatorsEcosystemSection() {
  const desktopOrderedRoles = [roles[1], roles[0], roles[2]] // Artists, Owners, Talents

  return (
    <section id="creator-cards" style={{
      padding: 'var(--section-pad-y) clamp(24px, 6vw, 80px)',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'linear-gradient(160deg, rgba(10,6,4,0.82) 0%, rgba(7,4,3,0.68) 100%)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(24px, 6vw, 80px)',
          marginBottom: 56,
        }}>
          <p className="section-label" style={{ paddingTop: 8, marginBottom: 0 }}>Creators</p>
          <div>
            <p className="value-hook">Role-based access architecture</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-ivory)',
              lineHeight: 1.2,
              marginBottom: 14,
            }}>
              Creators Ecosystem
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-ivory-3)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: 660,
            }}>
              A structured network built for control, collaboration, and growth.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: 'clamp(12px, 2vw, 18px)',
          alignItems: 'stretch',
        }}>
          {desktopOrderedRoles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 36, scale: role.prominent ? 1.01 : 1 }}
              animate={{ opacity: 1, y: 0, scale: role.prominent ? 1.04 : 1 }}
              transition={{ duration: 0.8, delay: 0.14 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.035 }}
              style={{
                position: 'relative',
                transformOrigin: 'center',
                zIndex: role.prominent ? 2 : 1,
              }}
            >
              {role.prominent ? (
                <motion.div
                  animate={{ opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: 18,
                    border: '1px solid rgba(226,207,160,0.42)',
                    boxShadow: '0 0 34px rgba(200,168,106,0.2)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              ) : null}

              <PremiumCard intensity={role.prominent ? 14 : 10}>
                <div style={{
                  padding: role.prominent ? '44px 30px 30px' : '34px 24px 24px',
                  background: role.prominent
                    ? 'linear-gradient(145deg, rgba(40,20,10,0.86) 0%, rgba(14,8,6,0.9) 100%)'
                    : 'linear-gradient(145deg, rgba(14,10,7,0.76) 0%, rgba(8,5,3,0.84) 100%)',
                  borderRadius: 16,
                  minHeight: role.prominent ? 505 : 470,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      padding: '6px 10px',
                      borderRadius: 999,
                      border: '1px solid',
                      borderColor: role.prominent ? 'rgba(226,207,160,0.52)' : 'rgba(200,168,106,0.22)',
                      color: role.prominent ? 'var(--color-gold-light)' : 'var(--color-ivory-2)',
                      background: role.prominent ? 'rgba(200,168,106,0.12)' : 'rgba(245,240,232,0.04)',
                    }}>
                      {role.access}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: role.prominent ? '2.05rem' : '1.7rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--color-ivory)',
                    marginBottom: 8,
                    textAlign: 'center',
                  }}>
                    {role.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: role.prominent ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                    marginBottom: 18,
                    textAlign: 'center',
                  }}>
                    {role.identity}
                  </p>
                  <div className="section-heading-divider" style={{ marginBottom: 20 }} />

                  <div style={{ display: 'grid', gap: 10, flex: 1, marginBottom: 22 }}>
                    {role.capabilities.map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{
                          marginTop: 6,
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: role.prominent ? 'var(--color-gold)' : 'rgba(214,207,196,0.7)',
                          flexShrink: 0,
                        }} />
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          color: 'var(--color-ivory-2)',
                          lineHeight: 1.65,
                          fontWeight: 300,
                        }}>
                          {item}
                        </p>
                      </div>
                    ))}
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
