const gold = 'var(--color-gold)'
const silver = 'var(--color-silver)'

/* IncluEcosystem — interconnected nodes forming an orbit */
export function EcosystemLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20.5" stroke={gold} strokeWidth="0.6" opacity="0.4" />
      {/* Central node */}
      <circle cx="22" cy="22" r="3" stroke={gold} strokeWidth="0.8" />
      {/* Orbital nodes */}
      <circle cx="22" cy="8"  r="2" stroke={gold} strokeWidth="0.7" opacity="0.8" />
      <circle cx="35" cy="29" r="2" stroke={gold} strokeWidth="0.7" opacity="0.8" />
      <circle cx="9"  cy="29" r="2" stroke={gold} strokeWidth="0.7" opacity="0.8" />
      {/* Connecting lines */}
      <line x1="22" y1="19" x2="22" y2="10"  stroke={gold} strokeWidth="0.5" opacity="0.5" />
      <line x1="24.4" y1="23.4" x2="33.2" y2="27.8" stroke={gold} strokeWidth="0.5" opacity="0.5" />
      <line x1="19.6" y1="23.4" x2="10.8" y2="27.8" stroke={gold} strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

/* IncluSocial — overlapping rings, community / connection */
export function SocialLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="22" r="10" stroke={silver} strokeWidth="0.7" opacity="0.6" />
      <circle cx="28" cy="22" r="10" stroke={gold}   strokeWidth="0.7" opacity="0.7" />
      {/* Intersection highlight */}
      <path d="M22 13.6 C25.6 16 25.6 28 22 30.4 C18.4 28 18.4 16 22 13.6Z"
        stroke={gold} strokeWidth="0.5" fill="none" opacity="0.4" />
    </svg>
  )
}

/* IncluStore — a refined minimal grid / storefront glyph */
export function StoreLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Roof/awning */}
      <path d="M8 20 L22 10 L36 20" stroke={gold} strokeWidth="0.8" opacity="0.8" strokeLinejoin="round" />
      {/* Building */}
      <rect x="11" y="20" width="22" height="16" stroke={gold} strokeWidth="0.7" opacity="0.7" rx="0.5" />
      {/* Door */}
      <rect x="19" y="28" width="6" height="8" stroke={gold} strokeWidth="0.6" opacity="0.5" />
      {/* Windows */}
      <rect x="13" y="23" width="5" height="4" stroke={gold} strokeWidth="0.5" opacity="0.45" />
      <rect x="26" y="23" width="5" height="4" stroke={gold} strokeWidth="0.5" opacity="0.45" />
    </svg>
  )
}

/* IncluTwin — two mirrored silhouettes / reflection mark */
export function TwinLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left figure */}
      <circle cx="15" cy="14" r="4" stroke={gold}   strokeWidth="0.7" opacity="0.8" />
      <path d="M7 36 C7 28 23 28 23 36" stroke={gold}   strokeWidth="0.7" opacity="0.7" fill="none" strokeLinecap="round" />
      {/* Mirror line */}
      <line x1="22" y1="9" x2="22" y2="38" stroke={gold} strokeWidth="0.4" strokeDasharray="2 2" opacity="0.35" />
      {/* Right figure (mirrored, silver) */}
      <circle cx="29" cy="14" r="4" stroke={silver} strokeWidth="0.7" opacity="0.7" />
      <path d="M21 36 C21 28 37 28 37 36" stroke={silver} strokeWidth="0.7" opacity="0.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
