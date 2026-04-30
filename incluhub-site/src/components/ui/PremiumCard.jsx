import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable 3D tilt card with silver edge, mouse-tracking glare, and floating shadow.
 * Wrap any card content with this component.
 */
export default function PremiumCard({
  children,
  onClick,
  style = {},
  intensity = 10,      // tilt degrees max
  glareOpacity = 0.13, // shimmer brightness
}) {
  const ref = useRef(null)
  const [transform, setTransform] = useState({ rotX: 0, rotY: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width   // 0–1
    const py = (e.clientY - rect.top)  / rect.height  // 0–1
    setTransform({
      rotX: (0.5 - py) * intensity,
      rotY: (px - 0.5) * intensity,
    })
    setGlare({ x: px * 100, y: py * 100, opacity: glareOpacity })
  }

  const onMouseLeave = () => {
    setTransform({ rotX: 0, rotY: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
    setHovered(false)
  }

  return (
    /* Perspective wrapper — keeps grid layout intact */
    <div style={{ perspective: '1000px', ...style }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        animate={{
          rotateX: transform.rotX,
          rotateY: transform.rotY,
          y: hovered ? -10 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          cursor: onClick ? 'pointer' : 'default',
          /* Silver gradient border */
          border: '1px solid rgba(210,205,198,0.22)',
          /* Floating shadow — deepens on hover */
          boxShadow: hovered
            ? '0 32px 64px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(230,225,218,0.18)'
            : '0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(230,225,218,0.12)',
          transition: 'box-shadow 0.35s ease',
          height: '100%',
        }}
      >
        {/* Silver top-edge highlight — always visible */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(220,215,208,0.55) 40%, rgba(240,235,228,0.7) 55%, rgba(220,215,208,0.4) 75%, transparent 100%)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Silver bottom-edge subtle line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,196,188,0.2), transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Mouse-tracking glare */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none',
          background: `radial-gradient(ellipse 55% 45% at ${glare.x}% ${glare.y}%, rgba(228,222,214,${glare.opacity}) 0%, transparent 65%)`,
          borderRadius: 16,
          transition: 'background 0.08s linear',
        }} />

        {/* Network logo watermark — bottom-left */}
        <div style={{
          position: 'absolute', bottom: 6, left: 6,
          width: 72, height: 72,
          zIndex: 2, pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <img
            src="/network-logo.png"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              mixBlendMode: 'screen',
              opacity: 0.18,
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, height: '100%' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
