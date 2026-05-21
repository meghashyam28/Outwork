'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const MotionLink = motion(Link)


function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    let W = window.innerWidth, H = window.innerHeight
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W*dpr; canvas.height = H*dpr
      canvas.style.width = W+'px'; canvas.style.height = H+'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    const count = Math.min(50, Math.floor((W*H)/20000))
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.20, vy: (Math.random()-0.5)*0.20,
      r: Math.random()*1.2+0.4, op: Math.random()*0.38+0.12,
    }))
    const MAX = 140
    let rafId: number
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x<0||n.x>W) n.vx*=-1; if (n.y<0||n.y>H) n.vy*=-1
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(232,255,77,${n.op})`; ctx.fill()
      })
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y
        const d=Math.sqrt(dx*dx+dy*dy)
        if (d<MAX) {
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y)
          ctx.strokeStyle = `rgba(255,92,53,${(1-d/MAX)*0.10})`; ctx.lineWidth=0.6; ctx.stroke()
        }
      }
      rafId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 will-gpu" aria-hidden />
}

function WorkflowCard() {
  const steps = [
    { label: 'Lead Captured',       status: 'done',    color: '#00ffb3' },
    { label: 'AI Qualification',    status: 'done',    color: '#00ffb3' },
    { label: 'CRM Sync',            status: 'running', color: '#e8ff4d' },
    { label: 'Follow-up Triggered', status: 'pending', color: '#5a5754' },
    { label: 'Deal Closed',         status: 'pending', color: '#5a5754' },
  ]
  return (
    <motion.div initial={{ opacity:0, y:48, scale:0.94 }} animate={{ opacity:1, y:0, scale:1 }}
      transition={{ duration:1.1, delay:1.0, ease:[0.16,1,0.3,1] }}
      className="animate-float-a glass-raised rounded-2xl p-5 w-[300px]"
      style={{ boxShadow:'0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,255,77,0.10)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-display font-700 uppercase tracking-widest" style={{ color:'var(--text-muted)' }}>Live Automation</span>
        <span className="flex items-center gap-1.5 text-[11px] font-600" style={{ color:'#00ffb3' }}>
          <span className="pulse-dot" style={{ width:5,height:5 }} /> Running
        </span>
      </div>
      <div className="space-y-3">
        {steps.map(s => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background:s.status!=='pending'?`${s.color}22`:'rgba(255,255,255,0.03)', border:`1px solid ${s.color}` }}>
              {s.status==='done' && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {s.status==='running' && <div className="w-2 h-2 rounded-full animate-blink" style={{ background:s.color }} />}
            </div>
            <span className="text-xs font-medium" style={{ color:s.status==='pending'?'var(--text-muted)':'var(--text-primary)' }}>{s.label}</span>
            {s.status==='running' && <span className="ml-auto text-[10px] animate-blink font-medium" style={{ color:'#e8ff4d' }}>Processing…</span>}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-[11px]" style={{ color:'var(--text-muted)' }}>Efficiency gain</span>
        <span className="font-display font-700 text-sm text-grad-primary">+847%</span>
      </div>
    </motion.div>
  )
}

function Badge({ value, label, delay }: { value:string; label:string; delay:number }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.75, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
      transition={{ duration:0.75, delay, ease:[0.16,1,0.3,1] }}
      className="animate-float-b glass-raised rounded-2xl px-5 py-4"
      style={{ boxShadow:'0 16px 40px rgba(0,0,0,0.5)', border:'1px solid rgba(232,255,77,0.13)' }}>
      <div className="font-display font-800 text-2xl leading-none mb-0.5 text-grad-primary">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color:'var(--text-muted)' }}>{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const headline = ['AI Systems', 'Built to Scale', 'Modern Business.']
  const wordVariants = {
    hidden:  { opacity:0, y:64, rotateX:-20 },
    visible: (i:number) => ({ opacity:1, y:0, rotateX:0, transition:{ delay:0.28+i*0.13, duration:0.95, ease:[0.16,1,0.3,1] as [number,number,number,number] } }),
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background:'var(--bg-void)', perspective:'1200px' }}>
      <HeroCanvas />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background:'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 20%, rgba(12,12,12,0.6) 65%, rgba(12,12,12,1) 100%)' }} />
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none z-[1]" style={{ background:'radial-gradient(circle, rgba(232,255,77,0.07) 0%, rgba(255,92,53,0.04) 40%, transparent 70%)', filter:'blur(70px)' }} />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none z-[1]" style={{ background:'radial-gradient(circle, rgba(0,255,179,0.05) 0%, transparent 70%)', filter:'blur(80px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.08, ease:[0.16,1,0.3,1] }} className="mb-8">
            <span className="tag"><span className="pulse-dot" style={{ width:5,height:5 }} />AI-First Automation Agency</span>
          </motion.div>

          <h1 className="font-display font-800 leading-none mb-6" style={{ fontSize:'clamp(2.8rem,5.5vw,5.5rem)', letterSpacing:'-0.04em', transformStyle:'preserve-3d' }}>
            {headline.map((line, i) => (
              <motion.span key={line} custom={i} variants={wordVariants} initial="hidden" animate="visible" className="block" style={{ transformStyle:'preserve-3d' }}>
                {i===1 ? <span className="text-grad-primary">{line}</span> : <span style={{ color:'var(--text-primary)' }}>{line}</span>}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.85, delay:0.68, ease:[0.16,1,0.3,1] }}
            className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color:'var(--text-secondary)' }}>
            We engineer intelligent automation systems — replacing manual work, compounding efficiency,
            and building the AI infrastructure your business needs to dominate.
          </motion.p>

          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.82, ease:[0.16,1,0.3,1] }} className="flex flex-wrap gap-4 mb-12">
            <MotionLink href="/contact" whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.96 }}
              transition={{ type:'spring', stiffness:400, damping:20 }}
              className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-full font-700 text-base overflow-hidden"
              style={{ background:'linear-gradient(135deg,#e8ff4d 0%,#ff5c35 100%)', color:'#0c0c0c', boxShadow:'0 8px 32px rgba(232,255,77,0.30)' }}>
              <span className="relative z-10 font-bold">Book Free Audit</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1.5" style={{ transition:'transform 0.3s ease' }} />
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div className="absolute inset-y-0 w-1/3 bg-white/25 animate-beam" />
              </div>
            </MotionLink>

            <MotionLink href="/revenue-systems" whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.96 }}
              transition={{ type:'spring', stiffness:400, damping:20 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base glass-surface"
              style={{ border:'1px solid var(--border-soft)', color:'var(--text-primary)' }}>
              See Our Work
            </MotionLink>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.9, delay:1.05 }}
            className="flex flex-wrap items-center gap-5 text-sm" style={{ color:'var(--text-muted)' }}>
            {['<60 Sec Response Time','40+ Hours Saved Weekly','2x Avg. Conversion Lift'].map((item,i) => (
              <div key={item} className="flex items-center gap-2">
                {i>0 && <span className="opacity-20">·</span>}
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-col items-center relative min-h-[420px]">
          <WorkflowCard />
          <div className="absolute -left-10 top-1/2 -translate-y-1/2"><Badge value="90%" label="Response Time Cut" delay={1.25} /></div>
          <div className="absolute -right-6 bottom-6"><Badge value="24/7" label="AI Always On" delay={1.45} /></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow pointer-events-none"
            style={{ width:340, height:340, border:'1px solid rgba(232,255,77,0.06)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-reverse pointer-events-none"
            style={{ width:250, height:250, border:'1px solid rgba(255,92,53,0.05)' }} />
        </div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7, duration:0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest" style={{ color:'var(--text-muted)' }}>Scroll</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}>
          <ChevronDown className="w-4 h-4" style={{ color:'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 inset-x-0 h-40 z-[2] pointer-events-none" style={{ background:'linear-gradient(to bottom, transparent, var(--bg-void))' }} />
    </section>
  )
}
