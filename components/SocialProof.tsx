'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value:60,  suffix:' sec', label:'Lead Response Time',   accent:'#e8ff4d' },
  { value:40,  suffix:' hrs', label:'Weekly Manual Work Saved', accent:'#ff5c35' },
  { value:2,   suffix:'x',    label:'Average Conversion Lift',  accent:'#00ffb3' },
]

const niches = ['Real Estate', 'Clinic', 'Coaching', 'D2C', 'Legal', 'SaaS', 'E-commerce']

function AnimatedCounter({ value, suffix, accent }: { value:number; suffix:string; accent:string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once:true })
  useEffect(() => {
    if (!inView) return
    const steps=80, inc=value/steps; let cur=0
    const t = setInterval(() => { cur=Math.min(cur+inc, value); setCount(Math.floor(cur)); if (cur>=value) clearInterval(t) }, 2000/steps)
    return () => clearInterval(t)
  }, [inView, value])
  return <span ref={ref} className="stat-number" style={{ color:accent }}>{count.toLocaleString()}{suffix}</span>
}

export default function SocialProof() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" style={{ background:'var(--bg-void)' }}>
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background:'linear-gradient(90deg, transparent, rgba(232,255,77,0.28), rgba(255,92,53,0.20), transparent)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="text-center mb-20">
          <div className="inline-block tag mb-6">Results</div>
          <h2 className="font-display font-800" style={{ fontSize:'clamp(2rem,4vw,3.5rem)', letterSpacing:'-0.035em', lineHeight:'1.05', color:'var(--text-primary)' }}>
            Numbers that<br /><span className="text-grad-primary">speak for themselves</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:32, scale:0.96 }} whileInView={{ opacity:1, y:0, scale:1 }} viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:0.65, delay:i*0.1, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-6, transition:{ type:'spring', stiffness:320, damping:20 } }}
              className="relative rounded-2xl p-6 md:p-8 text-center overflow-hidden cursor-default"
              style={{ background:'rgba(24,24,24,0.90)', border:'1px solid rgba(255,255,255,0.06)', transition:'box-shadow 0.35s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 0 0 1px ${s.accent}28, 0 20px 60px rgba(0,0,0,0.5)` }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none' }}>
              <AnimatedCounter value={s.value} suffix={s.suffix} accent={s.accent} />
              <div className="text-sm mt-2 font-medium" style={{ color:'var(--text-muted)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:1 }}>
          <div className="text-center text-xs uppercase tracking-widest mb-8" style={{ color:'var(--text-muted)' }}>Systems built for</div>
          <div className="relative overflow-hidden">
            <div className="marquee-track">
              {[...niches,...niches].map((n,i) => (
                <span key={`${n}-${i}`} className="flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium"
                  style={{ border:'1px solid rgba(232,255,77,0.10)', background:'rgba(232,255,77,0.03)', color:'var(--text-muted)', transition:'color 0.25s, background 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.background='rgba(232,255,77,0.07)' }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.background='rgba(232,255,77,0.03)' }}>
                  {n}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background:'linear-gradient(to right, var(--bg-void), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background:'linear-gradient(to left, var(--bg-void), transparent)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
