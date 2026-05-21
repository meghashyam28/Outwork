'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const MotionLink = motion(Link)


function CTACanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    let W = canvas.parentElement?.offsetWidth || 800, H = canvas.parentElement?.offsetHeight || 600
    const setup = () => {
      W = canvas.parentElement?.offsetWidth||800; H = canvas.parentElement?.offsetHeight||600
      canvas.width=W*dpr; canvas.height=H*dpr
      canvas.style.width=W+'px'; canvas.style.height=H+'px'
      ctx.scale(dpr, dpr)
    }
    setup()
    const colors = ['#e8ff4d','#ff5c35','#00ffb3','#ffb830']
    const pts = Array.from({ length:30 }, () => ({
      x:Math.random()*W, y:Math.random()*H, vy:-(Math.random()*0.3+0.08),
      size:Math.random()*1.3+0.4, alpha:Math.random()*0.4+0.08,
      color:colors[Math.floor(Math.random()*colors.length)]
    }))
    let raf: number
    const draw = () => {
      ctx.fillStyle='rgba(12,12,12,0.07)'; ctx.fillRect(0,0,W,H)
      pts.forEach(p => {
        p.y+=p.vy; if (p.y<0) { p.y=H; p.x=Math.random()*W }
        const r=parseInt(p.color.slice(1,3),16), g=parseInt(p.color.slice(3,5),16), b=parseInt(p.color.slice(5,7),16)
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
        ctx.fillStyle=`rgba(${r},${g},${b},${p.alpha})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', setup)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setup) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 z-0 will-gpu" aria-hidden />
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Revenue Systems', href: '/revenue-systems' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function FinalCTA() {
  return (
    <>
      <section id="contact" className="relative py-40 px-6 overflow-hidden" style={{ background:'var(--bg-void)' }}>
        <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background:'linear-gradient(90deg, transparent, rgba(232,255,77,0.28), rgba(255,92,53,0.20), transparent)' }} />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle, rgba(232,255,77,0.10) 0%, rgba(255,92,53,0.06) 40%, transparent 70%)', filter:'blur(60px)' }} />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="inline-flex mb-10">
            <span className="tag"><span className="pulse-dot" style={{ width:5,height:5 }} />Limited Capacity · Only 3 Spots Left</span>
          </motion.div>

          <motion.h2 initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.9, delay:0.1, ease:[0.16,1,0.3,1] }}
            className="font-display font-800 mb-6"
            style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', letterSpacing:'-0.04em', lineHeight:'0.95', color:'var(--text-primary)' }}>
            Your competitors<br />are automating.<br />
            <span className="animate-gradient-flow"
              style={{ backgroundImage:'linear-gradient(135deg,#e8ff4d,#ff5c35,#00ffb3,#e8ff4d)', backgroundSize:'200% 200%', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Are you?
            </span>
          </motion.h2>

          <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.25 }} className="text-lg mb-12 max-w-xl mx-auto leading-relaxed" style={{ color:'var(--text-secondary)' }}>
            Every week without automation, a competitor gets ahead. Book a free 30-minute strategy call and let's map your automation roadmap.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.65, delay:0.35 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <MotionLink href="/contact" whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.96 }}
              transition={{ type:'spring', stiffness:380, damping:20 }}
              className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base overflow-hidden"
              style={{ background:'linear-gradient(135deg,#e8ff4d 0%,#ff5c35 100%)', color:'#0c0c0c', boxShadow:'0 8px 32px rgba(232,255,77,0.28)' }}>
              <Calendar className="w-4 h-4 relative z-10" />
              <span className="relative z-10 font-bold">Book a Free Audit</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1.5" style={{ transition:'transform 0.3s ease' }} />
              <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <span className="absolute inset-y-0 w-1/3 bg-white/20 animate-beam" />
              </span>
            </MotionLink>

            <motion.a href="mailto:hello@outwork.ai" whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.96 }}
              transition={{ type:'spring', stiffness:380, damping:20 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base glass-surface"
              style={{ border:'1px solid var(--border-soft)', color:'var(--text-primary)' }}>
              <MessageSquare className="w-4 h-4" />Send a Message
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color:'var(--text-muted)' }}>
            {['Free consultation — no commitment','Response within 24 hours','Custom audit included'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background:'#00ffb3', boxShadow:'0 0 6px #00ffb3' }} />{t}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="relative py-16 px-6 overflow-hidden" style={{ background:'var(--bg-deep)', borderTop:'1px solid rgba(232,255,77,0.07)' }}>
        <CTACanvas />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg" style={{ background:'linear-gradient(135deg,#e8ff4d,#ff5c35)' }} />
                <div className="absolute inset-[2px] rounded-md flex items-center justify-center" style={{ background:'var(--bg-deep)' }}>
                  <span className="font-display font-800 text-[11px]" style={{ color:'#e8ff4d' }}>OW</span>
                </div>
              </div>
              <span className="font-display font-700 text-lg tracking-tight" style={{ color:'var(--text-primary)' }}>Outwork</span>
            </div>
            <p className="text-sm text-center md:text-right max-w-xs" style={{ color:'var(--text-muted)' }}>
              AI systems that compound your business growth — engineered, not templated.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop:'1px solid rgba(232,255,77,0.06)' }}>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} className="text-sm" style={{ color:'var(--text-muted)', transition:'color 0.25s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--text-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color='var(--text-muted)')}>{link.label}</Link>
              ))}
            </nav>
            <p className="text-xs" style={{ color:'var(--text-muted)' }}>© 2026 Outwork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
