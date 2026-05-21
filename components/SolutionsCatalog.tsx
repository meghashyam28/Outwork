'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, Users, Calendar, Mail, AlertCircle, RefreshCw, 
  Settings, PhoneCall, Headphones, Mic, Monitor, Layers, 
  Search, ShieldAlert, BarChart3, ArrowRight, Zap, CheckCircle2
} from 'lucide-react'

// Define the 19 solutions with correct data, categories, and premium Citric styling
const solutions = [
  // Category: AI Automations
  {
    id: 1,
    title: 'WhatsApp Business Automation',
    desc: 'End-to-end automated WhatsApp interactions, customer support, and instant broadcast flows.',
    category: 'AI Automations',
    price: '₹19,999',
    icon: MessageSquare,
    accent: '#e8ff4d',
    features: ['Official WhatsApp API Setup', 'Instant FAQ Auto-Responder', 'Automated Bulk Messaging']
  },
  {
    id: 2,
    title: 'AI Lead Qualification',
    desc: 'Automatic scoring, semantic intent filtering, and validation for every inbound lead before CRM routing.',
    category: 'AI Automations',
    price: '₹24,999',
    icon: Users,
    accent: '#00ffb3',
    features: ['Data Enrichment', 'Intent Analysis Pipeline', 'Hot Lead Slack Alerts']
  },
  {
    id: 3,
    title: 'Appointment Booking Automation',
    desc: 'Zero-touch scheduling, calendar conflicts mitigation, and automatic reminders via email and WhatsApp.',
    category: 'AI Automations',
    price: '₹14,999',
    icon: Calendar,
    accent: '#ffb830',
    features: ['Calendar Multi-Sync', 'Auto-Timezone Detection', 'No-Show Recovery Sequence']
  },
  {
    id: 4,
    title: 'Follow-up Sequence Automation',
    desc: 'Multi-channel automated engagement sequences (Email, WhatsApp, SMS) built to nurture cold leads.',
    category: 'AI Automations',
    price: '₹19,999',
    icon: Mail,
    accent: '#ff5c35',
    features: ['Multi-Step Logic Loops', 'Personalization Fields', 'Response-Based Halting']
  },
  {
    id: 5,
    title: 'Cart Abandonment Recovery',
    desc: 'Automated recovery sequences, discount injection, and checkout helpers to reclaim lost digital sales.',
    category: 'AI Automations',
    price: '₹29,999',
    icon: AlertCircle,
    accent: '#ff2d78',
    features: ['Behavioral Delay Triggers', 'Dynamic Coupon Codes', 'Conversion Analytics Dashboard']
  },
  {
    id: 6,
    title: 'Invoice & Payment Reminder',
    desc: 'Hands-free payment collection systems with recurring intervals and direct Citrus payment links.',
    category: 'AI Automations',
    price: '₹14,999',
    icon: RefreshCw,
    accent: '#e8ff4d',
    features: ['Citrus/Razorpay Integration', 'Escalating Reminder Schedule', 'Auto-Receipt Dispatch']
  },
  {
    id: 7,
    title: 'Internal Workflow Automation',
    desc: 'Seamless data bridging and custom webhooks across your daily tools (Slack, Sheets, Gmail, Notion).',
    category: 'AI Automations',
    price: '₹19,999',
    icon: Settings,
    accent: '#00ffb3',
    features: ['n8n/Make Workflow Engine', 'Cross-Platform Data Mapping', 'Custom Error Handlers']
  },
  {
    id: 8,
    title: 'Custom AI & Automation',
    desc: 'Bespoke systems engineered perfectly around your unique operational bottlenecks and spreadsheets.',
    category: 'AI Automations',
    price: '₹39,999',
    icon: Zap,
    accent: '#ff5c35',
    features: ['Tailored Logic Pipelines', 'Legacy API Integrations', 'Dedicated Workflow Testing']
  },

  // Category: AI Voice Agents
  {
    id: 9,
    title: 'Inbound AI Voice Agent',
    desc: '24/7 human-like conversational answering machine, lead qualification, and immediate CRM call routing.',
    category: 'AI Voice Agents',
    price: '₹49,999',
    icon: PhoneCall,
    accent: '#ffb830',
    features: ['Natural Language Patterns', 'Real-Time Live Transcripts', 'Instant CRM Sync']
  },
  {
    id: 10,
    title: 'Outbound AI Voice Agent',
    desc: 'Scalable proactive calling agent for immediate cold outreach, lead follow-ups, and review collections.',
    category: 'AI Voice Agents',
    price: '₹59,999',
    icon: Mic,
    accent: '#ff2d78',
    features: ['High-Throughput Dialing', 'Dynamic Variable Injection', 'Answering Machine Detection']
  },
  {
    id: 11,
    title: 'Custom Voice Agent',
    desc: 'Complex voice dialog trees, custom database queries, and deep transactional system actions.',
    category: 'AI Voice Agents',
    price: '₹89,999',
    icon: Headphones,
    accent: '#e8ff4d',
    features: ['Advanced Conversation Logic', 'Proprietary LLM Fine-Tuning', 'Secured Direct Integrations']
  },

  // Category: Web Systems
  {
    id: 12,
    title: 'Business Website',
    desc: 'High-speed, SEO-optimized, conversion-focused online presence tailored to modern digital enterprises.',
    category: 'Web Systems',
    price: '₹34,999',
    icon: Monitor,
    accent: '#00ffb3',
    features: ['Modern Styling & Architecture', 'Fully Responsive Framework', 'Built-in Lead Capture']
  },
  {
    id: 13,
    title: 'Landing Page',
    desc: 'Ultra-fast, high-velocity standalone campaign pages engineered to drive conversions and capture data.',
    category: 'Web Systems',
    price: '₹14,999',
    icon: Layers,
    accent: '#ff5c35',
    features: ['A/B Tested Wireframes', 'Lightning-Fast Asset Loading', 'Social Proof Grid Integrations']
  },
  {
    id: 14,
    title: 'Website Redesign',
    desc: 'Total aesthetic and technological overhaul of speed, conversion flows, and premium styling.',
    category: 'Web Systems',
    price: '₹24,999',
    icon: Monitor,
    accent: '#ffb830',
    features: ['Modern Dark Aesthetics', 'Friction-Free Checkout Paths', 'Advanced Analytics Mapping']
  },
  {
    id: 15,
    title: 'Website + Lead Pipeline',
    desc: 'High-converting platform fully wired and automated into direct WhatsApp and CRM auto-engagements.',
    category: 'Web Systems',
    price: '₹44,999',
    icon: Layers,
    accent: '#ff2d78',
    features: ['End-to-End Tracking Pixels', 'Immediate WhatsApp triggers', 'Automated Intake Pipelines']
  },
  {
    id: 16,
    title: 'E-commerce Store',
    desc: 'Optimized storefront architecture featuring seamless checkouts and abandonment recovery automations.',
    category: 'Web Systems',
    price: '₹49,999',
    icon: Zap,
    accent: '#e8ff4d',
    features: ['High-Performance Checkout', 'Automated Stock Pipelines', 'Custom Shipping Integrations']
  },
  {
    id: 17,
    title: 'Custom Web Solution',
    desc: 'Tailored client portals, administrative dashboards, interactive booking platforms, and software.',
    category: 'Web Systems',
    price: '₹69,999',
    icon: Settings,
    accent: '#00ffb3',
    features: ['Node/Next.js Architecture', 'Custom Role Access Controls', 'Scalable Database Schemas']
  },

  // Category: Audits
  {
    id: 18,
    title: 'Business Automation Audit',
    desc: 'Comprehensive mapping and teardown of your administrative bottlenecks, operational leaks, and manual overhead.',
    category: 'Audits & ROI',
    price: '₹14,999',
    icon: ShieldAlert,
    accent: '#ff5c35',
    features: ['Full Flow Chart Modeling', 'Detailed ROI Calculations', 'Step-by-Step Build Roadmap']
  },
  {
    id: 19,
    title: 'Conversion & Website Audit',
    desc: 'Deep analytical check on digital friction points, SEO performance, page load speeds, and styling elements.',
    category: 'Audits & ROI',
    price: '₹14,999',
    icon: BarChart3,
    accent: '#ffb830',
    features: ['Heatmap & Session Analysis', 'Lighthouse Optimization Audits', 'Conversion Copy Tear-down']
  }
]

const categories = ['All', 'AI Automations', 'AI Voice Agents', 'Web Systems', 'Audits & ROI']

export default function SolutionsCatalog() {
  const [selectedCat, setSelectedCat] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter solutions dynamically based on category selection and search query input
  const filteredSolutions = useMemo(() => {
    return solutions.filter(s => {
      const matchCat = selectedCat === 'All' || s.category === selectedCat
      const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.desc.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCat, searchQuery])

  return (
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12" data-reveal>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider relative transition-all duration-300"
                style={{
                  background: selectedCat === cat ? 'rgba(232,255,77,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedCat === cat ? 'rgba(232,255,77,0.35)' : 'rgba(255,255,255,0.06)'}`,
                  color: selectedCat === cat ? '#e8ff4d' : 'var(--text-muted)'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
              style={{
                background: 'rgba(24,24,24,0.90)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(232,255,77,0.4)'
                e.target.style.boxShadow = '0 0 20px rgba(232,255,77,0.05)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.06)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Dynamic Solutions Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSolutions.map((s, index) => {
              const Icon = s.icon
              return (
                <motion.div
                  layout
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="group relative rounded-2xl p-7 cursor-default flex flex-col justify-between overflow-hidden"
                  style={{
                    background: 'rgba(24,24,24,0.90)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'none',
                    transition: 'box-shadow 0.4s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${s.accent}22, 0 24px 60px rgba(0,0,0,0.5)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                    style={{ 
                      background: `radial-gradient(ellipse 80% 70% at 0% 0%, ${s.accent}0c, transparent 60%)`, 
                      transition: 'opacity 0.5s ease' 
                    }} 
                  />

                  {/* Header info */}
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}28` }}>
                        <Icon className="w-5 h-5" style={{ color: s.accent }} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                        {s.category}
                      </span>
                    </div>

                    <h3 className="font-display font-700 text-lg mb-2 text-[var(--text-primary)]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6 text-[var(--text-muted)]">
                      {s.desc}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-8">
                      {s.features.map(feat => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.accent }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom pricing and action */}
                  <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/30 font-semibold">Starting price</div>
                      <div className="text-lg font-bold" style={{ color: s.accent }}>{s.price}</div>
                    </div>
                    <motion.a
                      href="/contact"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest uppercase transition-all duration-300"
                      style={{ color: '#e8ff4d' }}
                    >
                      Book Free Audit
                      <ArrowRight className="w-3.5 h-3.5 text-[#e8ff4d]" />
                    </motion.a>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when query returns zero search results */}
        {filteredSolutions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-sm text-[var(--text-muted)] mb-3">No standalone solutions match your search filters.</div>
            <a href="/contact" className="text-xs uppercase tracking-widest font-semibold hover:underline" style={{ color: '#e8ff4d' }}>
              Ask us for a custom solution instead →
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
