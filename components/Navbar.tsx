'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

const links = [
  { label: 'Home',            href: '/' },
  { label: 'Revenue Systems', href: '/revenue-systems' },
  { label: 'Solutions',       href: '/solutions' },
  { label: 'About',           href: '/about' },
  { label: 'Contact',         href: '/contact' },
]

const navItem = {
  hidden:  { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.08 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
}

const MotionLink = motion(Link)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50))

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 glass-void border-b' : 'py-5 bg-transparent'}`}
        style={{ borderBottomColor: scrolled ? 'rgba(232,255,77,0.07)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <MotionLink href="/" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(135deg, #e8ff4d, #ff5c35)' }} />
              <div className="absolute inset-[2px] rounded-md flex items-center justify-center" style={{ background: 'var(--bg-void)' }}>
                <span className="font-display font-800 text-[11px]" style={{ color: '#e8ff4d' }}>OW</span>
              </div>
            </div>
            <span className="font-display font-700 text-lg tracking-tight" style={{ color: 'var(--text-primary)', transition: 'color 0.3s ease' }}>
              Outwork
            </span>
          </MotionLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <MotionLink key={link.label} href={link.href} custom={i} variants={navItem} initial="hidden" animate="visible"
                className="relative px-4 py-2 text-sm group"
                style={{ color: 'var(--text-secondary)', transition: 'color 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {link.label}
                <span className="absolute inset-x-2 bottom-0 h-px scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ background: 'linear-gradient(90deg,#e8ff4d,#ff5c35)', transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
              </MotionLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <MotionLink href="/contact"
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-700 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #e8ff4d, #ff5c35)', color: '#0c0c0c', fontWeight: 700 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, background: '#0c0c0c', boxShadow: 'none' }} />
              Book Free Audit
              <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <span className="absolute inset-y-0 w-1/3 bg-white/25 animate-beam" />
              </span>
            </MotionLink>

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 glass-surface rounded-lg" aria-label="Toggle menu">
              <span className={`w-5 h-px bg-[var(--text-primary)] ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }} />
              <span className={`w-5 h-px bg-[var(--text-primary)] ${menuOpen ? 'opacity-0' : ''}`} style={{ transition: 'opacity 0.25s ease' }} />
              <span className={`w-5 h-px bg-[var(--text-primary)] ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity:1, y:0, scale:1, pointerEvents:'auto' } : { opacity:0, y:-16, scale:0.97, pointerEvents:'none' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[68px] inset-x-4 z-40 glass-void rounded-2xl p-6 md:hidden origin-top"
        style={{ border: '1px solid rgba(232,255,77,0.10)' }}>
        <nav className="flex flex-col gap-1">
          {links.map((link, i) => (
            <MotionLink key={link.label} href={link.href}
              initial={false}
              animate={menuOpen ? { opacity:1, x:0 } : { opacity:0, x:-10 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl font-medium"
              style={{ color: 'var(--text-secondary)', transition: 'background 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(232,255,77,0.06)'; e.currentTarget.style.color='var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text-secondary)' }}>
              {link.label}
            </MotionLink>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="mt-3 px-4 py-3 rounded-xl text-center text-sm font-700 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#e8ff4d,#ff5c35)', color: '#0c0c0c', fontWeight: 700 }}>
            Book Free Audit
          </Link>
        </nav>
      </motion.div>
    </>
  )
}
