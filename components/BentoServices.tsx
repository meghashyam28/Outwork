'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Bot, Workflow, Users, PhoneCall, Database, FileText,
  Wrench, Zap, X, CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react'

const services = [
  { icon: Bot, title: 'AI Chatbots', desc: 'Intelligent conversational agents that handle queries, qualify leads, and recover sales — 24/7.', accent: '#e8ff4d', size: 'lg:col-span-2 lg:row-span-2', featured: true },
  { icon: Workflow, title: 'Workflow Automation', desc: 'End-to-end process automation and database syncs that eliminate manual friction from your daily stack.', accent: '#00ffb3', size: 'lg:col-span-1' },
  { icon: Users, title: 'Lead Generation', desc: 'AI systems that capture, qualify, and warm up inbound leads automatically.', accent: '#ff5c35', size: 'lg:col-span-1' },
  { icon: PhoneCall, title: 'AI Voice Agents', desc: 'Natural sounding voice AI built for inbound answering, cold calls, and schedule bookings.', accent: '#ffb830', size: 'lg:col-span-1' },
  { icon: Database, title: 'CRM Automation', desc: 'Seamless data pipelines that keep your contacts clean, updated, and instantly actionable.', accent: '#ff2d78', size: 'lg:col-span-2' },
  { icon: FileText, title: 'Content Systems', desc: 'Automate newsletters, social media copy, and blog drafting in your brand voice.', accent: '#ff5c35', size: 'lg:col-span-1' },
  { icon: Wrench, title: 'Custom AI Tools', desc: 'Bespoke LLM tools, dashboards, and portals engineered to solve your operational bottlenecks.', accent: '#00ffb3', size: 'lg:col-span-1' },
  { icon: Zap, title: 'Integrations', desc: 'Bridge all your tools (Slack, Sheets, Notion, Stripe) into one automated network.', accent: '#e8ff4d', size: 'lg:col-span-1' },
]

// Mapping of Bento categories to the exact solutions from the 19 pre-built solutions catalog
const bentoSolutionsMap: Record<string, Array<{ title: string; desc: string; features: string[] }>> = {
  'AI Chatbots': [
    { title: 'WhatsApp Business Automation', desc: 'Automate WhatsApp customer support, broadcast promotions, and support FAQ triggers.', features: ['Official WhatsApp API Link', 'Instant FAQ Auto-Responder', 'Automated Broadcast Blasts'] },
    { title: 'AI Lead Qualification', desc: 'Intelligent chatbot score and filter leads in real-time, routing hot opportunities directly to sales.', features: ['Lead intent scoring', 'Enrichment Pipelines', 'Instant Slack Alerts'] },
    { title: 'Appointment Booking Automation', desc: 'Let prospects book meetings directly inside WhatsApp, Web Chat, or SMS without any manual work.', features: ['Google/Outlook Calendar Sync', 'Multi-timezone scheduler', 'No-Show Recovery Sequence'] },
    { title: 'Cart Abandonment Recovery', desc: 'Capture abandoning shoppers and automatically recover sales with customized incentives.', features: ['Behavioral Delay Triggers', 'Dynamic Coupon Codes', 'Conversion Analytics Dashboard'] }
  ],
  'Workflow Automation': [
    { title: 'Internal Workflow Automation', desc: 'Bridge your everyday apps (Slack, Gmail, notion, Sheets) to communicate without any manual import/exports.', features: ['n8n & Make custom hooks', 'Cross-Platform Data Maps', 'Custom Error Logs'] },
    { title: 'Invoice & Payment Reminder', desc: 'Automatically dispatch invoices, recurring payment reminders, and receipts to your clients.', features: ['Razorpay Citrus Links', 'Escalating reminder cycles', 'Auto Reconcile CRM'] },
    { title: 'Custom AI & Automation', desc: 'Bespoke, complex backend software built around your proprietary sheets and operational leaks.', features: ['Enterprise Logic Engines', 'Legacy API connectors', 'Comprehensive Sandbox Testing'] }
  ],
  'Lead Generation': [
    { title: 'AI Lead Qualification', desc: 'Score and qualify leads instantly, weeding out spam and warming up high-intent buyers.', features: ['Semantic Intent analysis', 'Lead enrichment APIs', 'Automatic sales routing'] },
    { title: 'Appointment Booking Automation', desc: 'Allow leads to schedule their own strategy audits 24/7 via WhatsApp or web funnels.', features: ['Dynamic slot allocation', 'Calendar overlap check', 'SMS confirmation triggers'] },
    { title: 'Follow-up Sequence Automation', desc: 'Nurture cold contacts into scheduled audit calls automatically across email and messaging.', features: ['Drip messaging funnels', 'WhatsApp templates setup', 'Response-based halts'] },
    { title: 'Website + Lead Pipeline', desc: 'High-converting platform completely integrated into your sales pipeline and databases.', features: ['Lead Capture Funnels', 'Dynamic Framer-Motion Forms', 'Immediate Follow-up Links'] }
  ],
  'AI Voice Agents': [
    { title: 'Inbound AI Voice Agent', desc: '24/7 intelligent answering assistant to qualify callers, record transcripts, and book appointments.', features: ['Human Voice Inflections', 'Real-Time Call Transcripts', 'Instant CRM sync'] },
    { title: 'Outbound AI Voice Agent', desc: 'Scale cold calling, proactive follow-ups, and review calls with high-performance voice AI.', features: ['Scalable proactive dialing', 'Answering machine filters', 'Dynamic variable scripts'] },
    { title: 'Custom Voice Agent', desc: 'Deep custom conversational dialog trees with live database querying and custom actions.', features: ['Proprietary LLM Tuning', 'Enterprise Privacy Layer', 'Complex API actions'] }
  ],
  'CRM Automation': [
    { title: 'AI Lead Qualification', desc: 'Score inbound leads instantly, automatically creating contacts and routing them in your CRM.', features: ['Automated CRM routing', 'Data validation checks', 'Hot opportunity flags'] },
    { title: 'Internal Workflow Automation', desc: 'Synchronize files, data logs, and interactions between your databases and standard daily tools.', features: ['Multi-Database Sync', 'Real-time database updates', 'Automated cleanups'] },
    { title: 'Custom AI & Automation', desc: 'Automate repetitive CRM tasks like preparing contracts, generating invoices, and updating metrics.', features: ['Document Auto-Generation', 'Pipeline metrics dashboards', 'Custom database triggers'] }
  ],
  'Content Systems': [
    { title: 'Custom AI & Automation', desc: 'Automate content formatting, scheduling, and custom drafting tailored to your exact brand tone.', features: ['Custom LLM Prompt libraries', 'Social platform webhook posts', 'Human-in-the-loop loops'] },
    { title: 'Landing Page', desc: 'Ultra-fast standalone marketing pages built to drive campaign conversions and collect emails.', features: ['Fast Page Speeds', 'SEO Optimized elements', 'Optimized Intake forms'] },
    { title: 'Website Redesign', desc: 'Overhaul your digital presence with modern dark-mode aesthetics, responsive grid patterns, and fast assets.', features: ['Citrus Glassmorphism styling', 'Speed optimizations', 'Strategic copy audits'] }
  ],
  'Custom AI Tools': [
    { title: 'Custom AI & Automation', desc: 'Fully bespoke software tools built on custom LLMs, semantic vector databases, and API integrations.', features: ['Custom Embeddings Sync', 'Privacy Vector Datastores', 'Proprietary model tuning'] },
    { title: 'Custom Web Solution', desc: 'Tailor-made dashboards, reporting portals, or intake software to manage operations.', features: ['Visual admin dashboards', 'Custom role authentications', 'Scalable Node structures'] },
    { title: 'Business Automation Audit', desc: 'Technical tear-down of operational leaks to compile your concrete build roadmap.', features: ['Visual logic mappings', 'Feasibility assessments', 'Concrete ROI breakdowns'] }
  ],
  'Integrations': [
    { title: 'Internal Workflow Automation', desc: 'Connect tools to talk without human imports, ensuring zero lost documents.', features: ['Custom API Webhooks', 'Real-time sync networks', 'make/n8n setup'] },
    { title: 'Invoice & Payment Reminder', desc: 'Automated recurring fee notices, late alerts, and database confirmations.', features: ['Citrus payment reminders', 'Automatic invoice dispatch', 'CRM update on success'] },
    { title: 'Website + Lead Pipeline', desc: 'Hook up your website directly into your CRM, Slack, sheets, and marketing lists.', features: ['Intake Pipeline Wiring', 'WhatsApp Notification system', 'Auto calendar schedules'] }
  ]
}

function ServiceCard({ s, index, onClick }: { s: typeof services[0]; index: number; onClick: () => void }) {
  const Icon = s.icon
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
      onClick={onClick}
      className={`group relative rounded-2xl p-6 overflow-hidden cursor-pointer card-hover ${s.size}`}
      style={{ background: 'rgba(24,24,24,0.90)', border: '1px solid rgba(255,255,255,0.06)', transition: 'box-shadow 0.4s ease' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 0 1px ${s.accent}28, 0 20px 60px rgba(0,0,0,0.5)` }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 80% 70% at 15% 15%, ${s.accent}0c, transparent 60%)`, transition: 'opacity 0.5s ease' }} />

      <div className="relative z-10 flex items-center justify-between mb-4 md:mb-6">
        <motion.div whileHover={{ scale: 1.12, rotate: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}28` }}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: s.accent }} />
        </motion.div>

        {/* Subtle click prompt */}
        <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: s.accent }}>
          View Solutions →
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="font-display font-700 text-base md:text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}>{s.desc}</p>
      </div>
      {s.featured && (
        <div className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-[11px] font-700 uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{ background: `${s.accent}14`, color: s.accent, border: `1px solid ${s.accent}28` }}>
          <span className="pulse-dot" style={{ width: 5, height: 5, background: s.accent, boxShadow: `0 0 0 0 ${s.accent}55` }} />
          Most Popular
        </div>
      )}
    </motion.div>
  )
}

export default function BentoServices() {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null)

  const activeSolutions = activeService ? bentoSolutionsMap[activeService.title] || [] : []

  // Prevent background scrolling when modal is active (Lenis sync and standard fallback)
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeService])

  return (
    <>
      <section id="services" className="relative py-32 px-6 overflow-hidden" style={{ background: 'var(--bg-void)' }}>
        <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />
        <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,255,77,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,92,53,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
            <div className="tag mb-6">What We Build</div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-display font-800" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-0.035em', lineHeight: '1', color: 'var(--text-primary)' }}>
                Eight ways to<br /><span className="text-grad-primary">automate</span> your business
              </h2>
              <p className="max-w-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Click on any capability grid below to explore the exact AI automation and web systems we deliver.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            {services.map((s, i) => (
              <ServiceCard
                key={s.title}
                s={s}
                index={i}
                onClick={() => setActiveService(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Bento Category Modal Detail Drawer */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col justify-between"
              style={{
                background: 'rgba(20, 20, 20, 0.95)',
                border: `1px solid ${activeService.accent}22`,
                boxShadow: `0 0 40px ${activeService.accent}0a, 0 30px 90px rgba(0,0,0,0.8)`
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-white/60 hover:text-white" />
              </button>

              {/* Header */}
              <div className="mb-6 pr-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${activeService.accent}14`, border: `1px solid ${activeService.accent}28` }}>
                    <activeService.icon className="w-4 h-4" style={{ color: activeService.accent }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[var(--text-muted)]">
                    Service Capability
                  </span>
                </div>
                <h3 className="font-display font-800 text-xl md:text-2xl text-[var(--text-primary)]">
                  {activeService.title} Solutions
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1.5">
                  Explore drop-in standalone solutions under this category.
                </p>
              </div>

              {/* Scrolling List of Solutions */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto space-y-4 pr-1 py-1 custom-scrollbar"
              >
                {activeSolutions.map((sol, index) => (
                  <motion.div
                    key={sol.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-4 transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)'
                    }}
                  >
                    <div className="space-y-2 max-w-xl">
                      <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: activeService.accent }} />
                        {sol.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {sol.desc}
                      </p>
                      {/* Features */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5">
                        {sol.features.map(f => (
                          <div key={f} className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                            <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: activeService.accent }} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex md:flex-col items-end justify-end md:justify-center pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      <motion.a
                        href="/contact"
                        onClick={() => setActiveService(null)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                        style={{ background: 'linear-gradient(135deg,#e8ff4d,#ff5c35)', color: '#0c0c0c' }}
                      >
                        Book Audit
                        <ArrowRight className="w-3 h-3" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-[var(--text-muted)] text-center sm:text-left">
                  Need a fully tailored cross-capability system? We build bespoke operational pipelines.
                </p>
                <button
                  onClick={() => setActiveService(null)}
                  className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Dismiss Drawer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
