'use client'
import { motion } from 'framer-motion'
import { Shield, Zap, Target, TrendingUp, Code2, HeartHandshake } from 'lucide-react'

const diffs = [
  { icon:Code2,          title:'Engineering-Grade Systems', desc:"We don't use no-code toys. Our systems are production-grade, documented, and built to last.",       accent:'#e8ff4d' },
  { icon:Zap,            title:'Speed Without Compromise',  desc:'Results in weeks, not quarters. Battle-tested to move fast while maintaining architectural integrity.', accent:'#00ffb3' },
  { icon:Target,         title:'Obsessively ROI-Focused',   desc:'Every automation maps directly to time saved, cost cut, or revenue generated. Nothing frivolous.',     accent:'#ff5c35' },
  { icon:TrendingUp,     title:'Built for Scale',           desc:'Handle 10x the volume without breaking a sweat. Our systems scale horizontally as you grow.',          accent:'#ffb830' },
  { icon:Shield,         title:'Security by Default',       desc:'Enterprise-grade data handling, access control, and compliance baked in from day one.',                 accent:'#ff2d78' },
  { icon:HeartHandshake, title:'True Partnership',          desc:"In the trenches with you long after delivery. Ongoing optimization, support, and iteration included.",  accent:'#00ffb3' },
]

const comparison = [
  { feature:'Custom architecture',   outwork:true, agency:false, template:false },
  { feature:'Production-grade code', outwork:true, agency:false, template:false },
  { feature:'ROI guarantee focus',   outwork:true, agency:false, template:false },
  { feature:'Delivered in weeks',    outwork:true, agency:false, template:true  },
  { feature:'Ongoing optimization',  outwork:true, agency:false, template:false },
  { feature:'Scales with business',  outwork:true, agency:false, template:false },
]

export default function WhyOutwork() {
  return (
    <section id="why" className="relative py-32 px-6 overflow-hidden" style={{ background:'var(--bg-deep)' }}>
      <div className="absolute left-1/4 top-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(232,255,77,0.05) 0%, transparent 70%)', filter:'blur(80px)' }} />
      <div className="absolute right-1/4 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(255,92,53,0.05) 0%, transparent 70%)', filter:'blur(80px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="text-center mb-20">
          <div className="inline-block tag mb-6">Why Outwork</div>
          <h2 className="font-display font-800 mb-6" style={{ fontSize:'clamp(2rem,4vw,3.5rem)', letterSpacing:'-0.035em', lineHeight:'1.05', color:'var(--text-primary)' }}>
            Not just another agency.<br /><span className="text-grad-full">Your automation partner.</span>
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ color:'var(--text-secondary)' }}>
            We approach automation as engineers, not marketers. Every system we build is a strategic asset designed to compound returns over time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {diffs.map((d, i) => {
            const Icon = d.icon
            return (
              <motion.div key={d.title}
                initial={{ opacity:0, y:30, scale:0.97 }} whileInView={{ opacity:1, y:0, scale:1 }} viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.65, delay:i*0.08, ease:[0.16,1,0.3,1] }}
                whileHover={{ y:-6, transition:{ type:'spring', stiffness:320, damping:20 } }}
                className="group relative rounded-2xl p-7 cursor-default overflow-hidden"
                style={{ background:'rgba(24,24,24,0.90)', border:'1px solid rgba(255,255,255,0.06)', transition:'box-shadow 0.35s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 0 0 1px ${d.accent}22, 0 20px 60px rgba(0,0,0,0.4)` }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none' }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{ background:`radial-gradient(ellipse 80% 70% at 0% 0%, ${d.accent}09, transparent 60%)`, transition:'opacity 0.5s ease' }} />
                <motion.div whileHover={{ scale:1.12, rotate:4 }} transition={{ type:'spring', stiffness:400, damping:18 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background:`${d.accent}12`, border:`1px solid ${d.accent}22` }}>
                  <Icon className="w-5 h-5" style={{ color:d.accent }} />
                </motion.div>
                <h3 className="font-display font-700 text-base mb-2.5" style={{ color:'var(--text-primary)' }}>{d.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'var(--text-muted)', transition:'color 0.3s ease' }}>{d.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
          className="rounded-2xl overflow-hidden" style={{ border:'1px solid rgba(232,255,77,0.10)', background:'rgba(24,24,24,0.95)' }}>
          <div className="grid grid-cols-4 gap-0">
            <div className="p-5 text-sm" style={{ color:'var(--text-muted)' }}>Feature</div>
            {[{ label:'Outwork', accent:'#e8ff4d', featured:true },{ label:'Typical Agency', accent:'#5a5754', featured:false },{ label:'Template Tool', accent:'#5a5754', featured:false }].map(col => (
              <div key={col.label} className="p-5 text-center text-sm font-semibold"
                style={{ color:col.featured?col.accent:'var(--text-muted)', background:col.featured?'rgba(232,255,77,0.05)':'transparent', borderLeft:'1px solid rgba(255,255,255,0.05)' }}>
                {col.label}
              </div>
            ))}
          </div>
          {comparison.map((row, ri) => (
            <motion.div key={row.feature} initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ duration:0.45, delay:ri*0.07, ease:[0.16,1,0.3,1] }}
              className="grid grid-cols-4 gap-0" style={{ borderTop:'1px solid rgba(255,255,255,0.04)' }}>
              <div className="p-4 text-sm" style={{ color:'var(--text-secondary)' }}>{row.feature}</div>
              {[row.outwork, row.agency, row.template].map((val, j) => (
                <div key={j} className="p-4 flex items-center justify-center"
                  style={{ background:j===0?'rgba(232,255,77,0.03)':'transparent', borderLeft:'1px solid rgba(255,255,255,0.04)' }}>
                  {val ? (
                    <motion.div whileHover={{ scale:1.2 }} transition={{ type:'spring', stiffness:400, damping:18 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background:j===0?'rgba(232,255,77,0.18)':'rgba(0,255,179,0.12)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke={j===0?'#e8ff4d':'#00ffb3'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background:'rgba(255,255,255,0.04)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M3 7l4-4M7 7L3 3" stroke="#5a5754" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
