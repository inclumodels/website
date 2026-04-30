import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const blogPosts = [
  {
    id: 1,
    category: 'Freelancing',
    title: 'Freelancer to Agency Owner: 5 Steps to Start Your Ownership Life (Without the Burnout)',
    excerpt: 'Let\'s talk about the middleman tax: that silent wealth leak draining your creative work. Every time you route a client through a third party, you lose margin, control, and leverage.',
    author: 'IncluHub Editorial',
    date: 'Feb 23',
    readTime: '5 min read',
    views: 13,
    comments: 0,
    image: '/incluhub-logo-bg.png',
  },
  {
    id: 2,
    category: 'Business',
    title: 'Per Day Studio Rentals vs Monthly Membership: The Math That Could Save You Lakhs',
    excerpt: 'You\'re booking a studio at ₹2,500 per day. Feels manageable, right? You\'re only paying when you work. But here\'s the truth most creators never calculate...',
    author: 'IncluHub Editorial',
    date: 'Feb 23',
    readTime: '4 min read',
    views: 2,
    comments: 0,
    image: '/incluhub-logo-bg.png',
  },
  {
    id: 3,
    category: 'Creators',
    title: 'Per-Day Studio Rentals vs. Monthly Membership: The Creator Math That Saves You More',
    excerpt: 'You\'re burning money every time you book a day pass. Here\'s the breakdown every serious creator needs to see before their next shoot.',
    author: 'IncluHub Editorial',
    date: 'Feb 23',
    readTime: '5 min read',
    views: 5,
    comments: 0,
    image: '/incluhub-logo-bg.png',
  },
  {
    id: 4,
    category: 'Industry',
    title: 'The Future of Fashion & AI: How Technology Is Reshaping the Modelling Industry',
    excerpt: 'AI isn\'t replacing models — it\'s amplifying them. From digital twins to automated casting, here\'s how the industry is evolving and what it means for your career.',
    author: 'IncluHub Editorial',
    date: 'Mar 2026',
    readTime: '6 min read',
    views: 8,
    comments: 0,
    image: '/incluhub-logo-bg.png',
  },
]

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: 0,
        background: 'rgba(4,2,1,0.6)',
        border: '1px solid rgba(200,168,106,0.08)',
        borderRadius: 4,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.3s',
      }}
      whileHover={{ y: -4, borderColor: 'rgba(200,168,106,0.2)' }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(122,23,40,0.3) 0%, rgba(40,8,4,0.6) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 240,
        overflow: 'hidden',
      }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '60%', height: 'auto',
            objectFit: 'contain',
            opacity: 0.5,
            filter: 'brightness(1.2)',
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(122,23,40,0.15) 0%, rgba(4,2,1,0.3) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Network logo watermark — bottom-left */}
        <div style={{
          position: 'absolute', bottom: 6, left: 6,
          width: 72, height: 72,
          pointerEvents: 'none', overflow: 'hidden',
        }}>
          <img src="/network-logo.png" alt="" style={{
            width: '100%', height: '100%',
            objectFit: 'contain', mixBlendMode: 'screen', opacity: 0.18,
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '32px 36px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Author + meta */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 16,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(200,168,106,0.15)',
            border: '1px solid rgba(200,168,106,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', color: 'var(--color-gold)',
            fontFamily: 'var(--font-body)', fontWeight: 500,
          }}>
            I
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem',
              color: 'var(--color-ivory-2)', fontWeight: 400,
              display: 'block',
            }}>
              {post.author}
            </span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              color: 'var(--color-ivory-3)',
              letterSpacing: '0.05em',
            }}>
              {post.date} · {post.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          fontWeight: 400,
          color: 'var(--color-ivory)',
          lineHeight: 1.35,
          marginBottom: 12,
          letterSpacing: '0.01em',
        }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          color: 'var(--color-ivory-3)',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: 20,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>

        {/* Footer: views + comments + heart */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          borderTop: '1px solid rgba(200,168,106,0.06)',
          paddingTop: 14,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.62rem',
            color: 'var(--color-ivory-3)', letterSpacing: '0.05em',
          }}>
            {post.views} views
          </span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.62rem',
            color: 'var(--color-ivory-3)', letterSpacing: '0.05em',
          }}>
            {post.comments} comments
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '0.85rem', opacity: 0.4, cursor: 'pointer' }}>
            ♡
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 52 }}>
        {/* Hero */}
        <section style={{
          minHeight: '50vh',
          display: 'flex', alignItems: 'flex-end',
          padding: 'calc(var(--nav-h) + 80px) clamp(24px, 5vw, 80px) 64px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Back button */}
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
            position: 'absolute', top: '30%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122,23,40,0.08) 0%, transparent 65%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--color-gold)', marginBottom: 24,
              }}
            >
              Journal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 10vw, 9rem)',
                fontWeight: 300, letterSpacing: '0.03em',
                color: 'var(--color-ivory)', lineHeight: 1.05,
                margin: 0,
              }}
            >
              All Posts
            </motion.h1>
          </div>
        </section>

        {/* Category filter bar */}
        <section style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          marginBottom: 48,
        }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex', gap: 8,
              borderBottom: '1px solid rgba(200,168,106,0.08)',
              paddingBottom: 16,
            }}
          >
            {['All Posts', 'Industry', 'Business', 'Creators', 'Freelancing'].map((cat, i) => (
              <button key={cat} style={{
                background: i === 0 ? 'rgba(200,168,106,0.12)' : 'transparent',
                border: '1px solid',
                borderColor: i === 0 ? 'rgba(200,168,106,0.25)' : 'rgba(200,168,106,0.08)',
                borderRadius: 4,
                padding: '8px 18px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: i === 0 ? 'var(--color-gold)' : 'var(--color-ivory-3)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Blog cards */}
        <section style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px) 120px',
          display: 'flex', flexDirection: 'column',
          gap: 20,
        }}>
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '0.95rem', color: 'var(--color-ivory-3)',
              marginTop: 48, textAlign: 'center',
            }}
          >
            More articles coming soon — follow us for updates.
          </motion.p>
        </section>
      </main>
      <Footer />
    </>
  )
}
