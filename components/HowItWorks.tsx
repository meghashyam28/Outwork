'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Search, Layers, Cpu, Rocket, TrendingUp } from 'lucide-react'

const steps = [
  { n:'01', icon:Search,     title:'Diagnose',  accent:'#e8ff4d', headline:'We map every workflow and find where time is being lost.',       desc:'Deep-dive audit of your operations, tools, and processes. We identify automation opportunities with the highest ROI impact.',        metric:{ v:'12+',     l:'Avg. opportunities found' } },
  { n:'02', icon:Layers,     title:'Architect', accent:'#00ffb3', headline:'We design systems that fit your business perfectly.',             desc:'Custom automation blueprints. No templates. Every system is engineered around your specific workflows and growth goals.',             metric:{ v:'100%',    l:'Tailored to your stack'   } },
  { n:'03', icon:Cpu,        title:'Build',     accent:'#ffb830', headline:'We engineer production-grade AI systems, fast.',                  desc:'Our team builds, tests, and integrates. Clean architecture, real monitoring, and complete documentation included.',                  metric:{ v:'2–4 wks', l:'Avg. delivery time'       } },
  { n:'04', icon:Rocket,     title:'Deploy',    accent:'#ff5c35', headline:'Go live with zero downtime and full confidence.',                  desc:'Staged rollout with hands-on onboarding. We handle the integration complexity so your team hits the ground running.',              metric:{ v:'99.9%',   l:'Uptime guarantee'         } },
  { n:'05', icon:TrendingUp, title:'Scale',     accent:'#ff2d78', headline:'Continuous optimization that compounds over time.',                desc:'We monitor, iterate, and expand your systems as your business grows. The more you scale, the more we automate.',                     metric:{ v:'400%+',   l:'Avg. efficiency gain'     } },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const Icon = step.icon
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness:80, damping:22 })
  const opacity = useTransform(smooth, [0,0.18,0.78,1], [0.2,1,1,0.2])
  const x       = useTransform(smooth, [0,0.18,0.78,1], [-24,0,0,-24])
  const scale   = useTransform(smooth, [0,0.18,0.78,1], [0.97,1,1,0.97])

  return (
    <motion.div ref={ref} style={{ opacity, x, scale }} className="relative flex gap-8 items-start group">
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <motion.div whileHover={{ scale:1.15, rotate:5 }} transition={{ type:'spring', stiffness:400, damping:18 }}
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-800 text-sm"
          style={{ background:`${step.accent}14`, border:`1px solid ${step.accent}45`, color:step.accent, boxShadow:`0 0 24px ${step.accent}18` }}>
          {step.n}
        </motion.div>
        {index < steps.length-1 && (
          <div className="w-px flex-1 mt-4 min-h-[80px]"
            style={{ background:`linear-gradient(to bottom, ${step.accent}45, ${steps[index+1].accent}22)` }} />
        )}
      </div>
      <div className="flex-1 mb-14 rounded-2xl p-7 relative overflow-hidden"
        style={{ background:'rgba(24,24,24,0.90)', border:'1px solid rgba(255,255,255,0.06)', transition:'border-color 0.35s ease, box-shadow 0.35s ease' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor=`${step.accent}22`; e.currentTarget.style.boxShadow=`0 0 0 1px ${step.accent}18, 0 24px 60px rgba(0,0,0,0.4)` }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow='none' }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background:`${step.accent}14`, border:`1px solid ${step.accent}28` }}>
              <Icon className="w-4 h-4" style={{ color:step.accent }} />
            </div>
            <span className="text-xs font-700 uppercase tracking-widest" style={{ color:step.accent }}>{step.title}</span>
          </div>
          <div className="text-right">
            <div className="font-display font-800 text-xl leading-none" style={{ color:step.accent }}>{step.metric.v}</div>
            <div className="text-[11px] mt-0.5" style={{ color:'var(--text-muted)' }}>{step.metric.l}</div>
          </div>
        </div>
        <h3 className="font-display font-700 text-xl leading-tight mb-3" style={{ color:'var(--text-primary)' }}>{step.headline}</h3>
        <p className="text-sm leading-relaxed" style={{ color:'var(--text-muted)' }}>{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden" style={{ background:'var(--bg-deep)' }}>
      <div className="absolute inset-0 grid-lines-v opacity-40 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(0,255,179,0.05) 0%, transparent 70%)', filter:'blur(80px)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="mb-20 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <div className="tag mb-6">The Process</div>
            <h2 className="font-display font-800" style={{ fontSize:'clamp(2rem,4vw,3.5rem)', letterSpacing:'-0.035em', lineHeight:'1.05', color:'var(--text-primary)' }}>
              From chaos to<br /><span className="text-grad-warm">automated excellence</span>
            </h2>
          </div>
          <p className="leading-relaxed max-w-sm" style={{ color:'var(--text-secondary)' }}>
            A proven five-step framework that transforms your operations from manual and fragmented
            to intelligent and self-running — in weeks, not quarters.
          </p>
        </motion.div>
        <div>{steps.map((step, i) => <StepCard key={step.n} step={step} index={i} />)}</div>
      </div>
    </section>
  )
}
