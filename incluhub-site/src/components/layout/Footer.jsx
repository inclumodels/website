import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site.config'

export default function Footer() {
  return (
    <footer style={{
      padding: 'clamp(28px, 5vw, 48px) clamp(16px, 5vw, 60px)',
      borderTop: '1px solid rgba(200,168,106,0.1)',
      background: 'rgba(4,2,1,0.7)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
      alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)',
    }}>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '0.63rem',
        color: 'var(--color-ivory-3)', letterSpacing: '0.15em', fontWeight: 300,
      }}>
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </span>

      <Link to="/" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
        <img src="/logo.png" alt="IncluHub" style={{ height: 40, width: 'auto', objectFit: 'contain', opacity: 0.8 }} />
      </Link>

      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '0.63rem',
        color: 'var(--color-ivory-3)', letterSpacing: '0.15em',
        fontWeight: 300, textAlign: 'right',
      }}>
        {siteConfig.location}
      </span>
    </footer>
  )
}
