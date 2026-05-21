'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Mail, Database, PhoneCall, ArrowUpRight } from 'lucide-react'

const cases = [
  {
    id: 'chatbot', icon: MessageSquare, category: 'AI Chatbot', title: 'Customer Support Automation', company: 'Nexus SaaS', accent: '#d7a86e',
    summary: "Replaced a 12-person support team's tier-1 workload with an AI chatbot achieving 94% resolution without human escalation.",
    results: [{ label: 'Tickets Resolved by AI', value: '94%' }, { label: 'Response Time', value: '< 3s' }, { label: 'Support Cost Reduction', value: '62%' }],
    visual: { messages: [{ from: 'user', text: "My invoice hasn't arrived for 3 weeks." }, { from: 'ai', text: "I found your account. Invoice #4821 will be resent immediately — check your inbox in 60 seconds." }, { from: 'user', text: 'Perfect, thank you!' }, { from: 'ai', text: 'Done! Is there anything else I can help you with?' }] },
  },
  {
    id: 'leads', icon: Mail, category: 'Lead Generation', title: 'AI-Powered Lead Pipeline', company: 'Prism Logistics', accent: '#6ee7c8',
    summary: 'Built an end-to-end lead machine: scraping, enriching, scoring, and sequencing — all automated. 100K+ qualified leads in 6 months.',
    results: [{ label: 'Leads Generated', value: '100K+' }, { label: 'Open Rate', value: '38%' }, { label: 'Time Saved Weekly', value: '40 hrs' }],
    visual: { pipeline: [{ stage: 'Prospecting', count: 12400, pct: 100 }, { stage: 'AI Enrichment', count: 11800, pct: 95 }, { stage: 'Qualified', count: 4300, pct: 35 }, { stage: 'Outreach', count: 4300, pct: 35 }, { stage: 'Replied', count: 1634, pct: 13 }] },
  },
  {
    id: 'crm', icon: Database, category: 'CRM Automation', title: 'Unified CRM Intelligence System', company: 'Velocity Finance', accent: '#ff8e72',
    summary: 'Synced 7 data sources into one clean CRM with real-time enrichment, smart tagging, and automated deal stage progression.',
    results: [{ label: 'Data Sources Unified', value: '7' }, { label: 'CRM Accuracy', value: '99%' }, { label: 'Pipeline Visibility', value: 'Real-time' }],
    visual: { fields: ['company', 'stage', 'intent_score', 'last_touch', 'arr_estimate', 'owner'] },
  },
  {
    id: 'voice', icon: PhoneCall, category: 'AI Voice Agent', title: 'Outbound Voice Qualification', company: 'Apex Digital', accent: '#9fa8ff',
    summary: 'Deployed an AI voice agent handling 800+ qualification calls per day — only routing serious buyers to sales reps.',
    results: [{ label: 'Daily Calls Handled', value: '800+' }, { label: 'Qualified Handoffs', value: '22%' }, { label: 'Sales Cycle Shortened', value: '3x' }],
    visual: { waveform: true },
  },
]

function ChatVisual({ messages }: { messages: { from: string; text: string }[] }) {
  return (
    <div className="space-y-3 p-1">
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className="max-w-[82%] px-4 py-2.5 text-sm"
            style={{
              background:   m.from === 'ai' ? 'rgba(215,168,110,0.12)' : 'rgba(255,255,255,0.05)',
              border:       m.from === 'ai' ? '1px solid rgba(215,168,110,0.22)' : '1px solid rgba(255,255,255,0.08)',
              color:        m.from === 'ai' ? '#f3d2a7' : 'var(--text-primary)',
              borderRadius: m.from === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
            }}
          >
            {m.text}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function PipelineVisual({ pipeline, accent }: { pipeline: { stage: string; count: number; pct: number }[]; accent: string }) {
  return (
    <div className="space-y-3">
      {pipeline.map((p, i) => (
        <div key={p.stage} className="flex items-center gap-3">
          <div className="w-24 text-[11px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{p.stage}</div>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${p.pct}%` }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
            />
          </div>
          <div className="w-14 text-right text-xs font-semibold" style={{ color: accent }}>{p.count.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

function CRMVisual({ fields, accent }: { fields: string[]; accent: string }) {
  const vals: Record<string, string> = {
    company: 'Velocity Finance', stage: 'Qualified → Demo', intent_score: '94 / 100',
    last_touch: '2 hours ago', arr_estimate: '$84,000', owner: 'AI → Sarah K.'
  }
  return (
    <div className="space-y-0">
      {fields.map((f, i) => (
        <motion.div
          key={f}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.09, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between py-2.5 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <span className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{f.replace('_', ' ')}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{vals[f]}</span>
        </motion.div>
      ))}
    </div>
  )
}

function WaveformVisual({ accent }: { accent: string }) {
  const bars = Array.from({ length: 40 }, (_, i) => ({
    h: Math.sin(i * 0.5) * 35 + Math.random() * 18 + 12,
    delay: i * 0.03,
  }))
  return (
    <div className="flex items-center justify-center gap-1 h-24 px-4">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ background: `linear-gradient(to top, ${accent}, ${accent}50)` }}
          animate={{ height: [b.h * 0.5, b.h, b.h * 0.3, b.h] }}
          transition={{ duration: 1.3, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const panelVariants = {
  enter: { opacity: 0, y: 18, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:  { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function Showcase() {
  const [active, setActive] = useState(cases[0].id)
  const current = cases.find((c) => c.id === active)!

  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="tag mb-6">Case Studies</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-800 text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: '1' }}
            >
              Systems that<br />
              <span className="text-grad-warm">actually deliver</span>
            </h2>
            <p className="max-w-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Real automations we've built. No vanity metrics — just measurable results.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {cases.map((c) => {
            const Icon = c.icon
            const isActive = active === c.id
            return (
              <motion.button
                key={c.id}
                onClick={() => setActive(c.id)}
                whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium relative overflow-hidden"
                style={{
                  background: isActive ? `${c.accent}1a` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${c.accent}40` : 'rgba(255,255,255,0.07)'}`,
                  color: isActive ? c.accent : 'var(--text-muted)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.category}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: `${c.accent}08` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Content panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Info panel */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(23,33,40,0.95)',
                border: `1px solid ${current.accent}20`,
                boxShadow: `0 0 40px ${current.accent}08`,
              }}
            >
              <div className="inline-flex items-center gap-1.5 text-[11px] font-700 uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${current.accent}14`, color: current.accent, border: `1px solid ${current.accent}25` }}>
                {current.company}
              </div>
              <h3 className="font-display font-700 text-2xl leading-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                {current.title}
              </h3>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>{current.summary}</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {current.results.map((r) => (
                  <div key={r.label} className="text-center">
                    <div className="font-display font-800 text-2xl leading-none mb-1" style={{ color: current.accent }}>{r.value}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: current.accent }}
              >
                Read Full Case Study <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Visual panel */}
            <div
              className="rounded-2xl p-8"
              style={{ background: 'rgba(23,33,40,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--text-muted)' }}>Live Preview</div>
              {current.id === 'chatbot' && <ChatVisual messages={current.visual.messages!} />}
              {current.id === 'leads'   && <PipelineVisual pipeline={current.visual.pipeline!} accent={current.accent} />}
              {current.id === 'crm'     && <CRMVisual fields={current.visual.fields!} accent={current.accent} />}
              {current.id === 'voice'   && <WaveformVisual accent={current.accent} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
