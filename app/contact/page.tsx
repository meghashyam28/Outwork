'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { 
  CheckCircle2, ArrowRight, Sparkles, Send, Calendar, 
  MessageSquare, ShieldCheck, Zap, DollarSign, Building2 
} from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    niche: 'SaaS / Tech',
    revenue: '₹1L - ₹5L /mo'
  })
  
  // Interactive bottleneck pills selection
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<string[]>([])
  
  const bottlenecks = [
    'Leads going cold / Slow follow-up',
    'Manual data entry / Copy-pasting',
    'Customer support piling up',
    'Website doesn\'t convert',
    'Custom AI / Voice integrations',
    'Other operation leaks'
  ]

  const toggleBottleneck = (item: string) => {
    if (selectedBottlenecks.includes(item)) {
      setSelectedBottlenecks(selectedBottlenecks.filter(x => x !== item))
    } else {
      setSelectedBottlenecks([...selectedBottlenecks, item])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill out Name, Email, and Phone fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <main className="relative overflow-x-hidden min-h-screen" style={{ background: 'var(--bg-void)' }}>
      {/* Background visual accents */}
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(232,255,77,0.03) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255,92,53,0.02) 0%, transparent 70%)' }} />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual copy & value props */}
          <div className="lg:col-span-5 space-y-8" data-reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider glass-surface border border-white/5" style={{ color: '#e8ff4d' }}>
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Free 30-Minute Business Audit</span>
            </div>

            <h1 className="font-display font-800 text-[var(--text-primary)]" 
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.045em', lineHeight: '1.05' }}>
              Your revenue leak has a <span className="text-grad-primary">fix. Let's find it.</span>
            </h1>

            <p className="text-base leading-relaxed text-[var(--text-muted)] max-w-lg">
              Stop stitching tools together. Let us design an integrated, outcome-first AI automation roadmap for your business. No obligation. No pitch. Just absolute clarity.
            </p>

            {/* Checklist items */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" 
                  style={{ background: 'rgba(232,255,77,0.1)', border: '1px solid rgba(232,255,77,0.2)' }}>
                  <Zap className="w-3.5 h-3.5 text-[#e8ff4d]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Immediate Impact Mapping</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">We typically find ₹2L+ in easily retrievable leaked revenue within our first call.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" 
                  style={{ background: 'rgba(0,255,179,0.1)', border: '1px solid rgba(0,255,179,0.2)' }}>
                  <Building2 className="w-3.5 h-3.5 text-[#00ffb3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Fully Custom Architecture</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Get a customized technical schematic of your tools working together automatically.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" 
                  style={{ background: 'rgba(255,92,53,0.1)', border: '1px solid rgba(255,92,53,0.2)' }}>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff5c35]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">No-Pitch Guarantee</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Strictly technical insights. If we aren't a mutual fit, you keep the roadmap completely free.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl p-8 relative overflow-hidden"
                  style={{ 
                    background: 'rgba(24, 24, 24, 0.90)', 
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)'
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px]" 
                    style={{ background: 'rgba(232,255,77,0.06)' }} />

                  <h3 className="font-display font-700 text-xl mb-1 text-[var(--text-primary)]">Request Your Free Audit</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-8">⚡ Usually responding within 60 seconds.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Two column inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none"
                          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(232,255,77,0.35)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="e.g. rahul@company.com"
                          className="w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none"
                          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(232,255,77,0.35)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">WhatsApp / Phone *</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none"
                          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(232,255,77,0.35)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Company Name</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={e => setForm({...form, company: e.target.value})}
                          placeholder="e.g. Sharma Agency"
                          className="w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none"
                          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(232,255,77,0.35)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                        />
                      </div>
                    </div>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Business Sector</label>
                        <select
                          value={form.niche}
                          onChange={e => setForm({...form, niche: e.target.value})}
                          className="w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none"
                          style={{ background: 'rgba(24,24,24,0.95)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                        >
                          <option>SaaS / Tech</option>
                          <option>E-commerce / Retail</option>
                          <option>Agencies / Consulting</option>
                          <option>Real Estate / Finance</option>
                          <option>Local Services / Healthcare</option>
                          <option>Other / Enterprise</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Monthly Revenue (Scale)</label>
                        <select
                          value={form.revenue}
                          onChange={e => setForm({...form, revenue: e.target.value})}
                          className="w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none"
                          style={{ background: 'rgba(24,24,24,0.95)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)' }}
                        >
                          <option>&lt; ₹1L /mo</option>
                          <option>₹1L - ₹5L /mo</option>
                          <option>₹5L - ₹15L /mo</option>
                          <option>₹15L+/mo</option>
                        </select>
                      </div>
                    </div>

                    {/* Custom bottlenecks tag selection pills */}
                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">
                        Select your operational bottleneck areas (Choose all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {bottlenecks.map(item => {
                          const isSelected = selectedBottlenecks.includes(item)
                          return (
                            <motion.button
                              key={item}
                              type="button"
                              onClick={() => toggleBottleneck(item)}
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.97 }}
                              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                              style={{ 
                                background: isSelected ? 'rgba(232,255,77,0.12)' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${isSelected ? 'rgba(232,255,77,0.30)' : 'rgba(255,255,255,0.05)'}`,
                                color: isSelected ? '#e8ff4d' : 'var(--text-secondary)'
                              }}
                            >
                              {item}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 overflow-hidden relative"
                      style={{ 
                        background: 'linear-gradient(135deg, #e8ff4d, #ff5c35)', 
                        color: '#0c0c0c', 
                        fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          <span>Generating Secure Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Request Free Business Audit</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                      
                      <span className="absolute inset-0 overflow-hidden pointer-events-none">
                        <span className="absolute inset-y-0 w-1/3 bg-white/20 animate-beam" />
                      </span>
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                // Appeal Submission Success Screen
                <motion.div
                  key="submission-success"
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl p-8 text-center space-y-6"
                  style={{ 
                    background: 'rgba(24, 24, 24, 0.90)', 
                    border: '1px solid rgba(232, 255, 77, 0.20)',
                    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ background: 'rgba(0, 255, 179, 0.1)', border: '1px solid rgba(0, 255, 179, 0.2)' }}>
                    <CheckCircle2 className="w-8 h-8 text-[#00ffb3]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-800 text-2xl text-[var(--text-primary)]">Audit Request Confirmed!</h3>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)] max-w-md mx-auto">
                      Thanks <span className="text-[#e8ff4d] font-bold">{form.name}</span>. We've received your request for Sharma Agency and are already analyzing your pipeline.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 max-w-md mx-auto space-y-4 text-left">
                    <div className="flex gap-3">
                      <Zap className="w-4 h-4 text-[#e8ff4d] flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-[var(--text-muted)]">
                        We've dispatched an instant confirmation via WhatsApp to <span className="text-[var(--text-primary)] font-semibold">{form.phone}</span>. An AI consultant will reach out shortly.
                      </div>
                    </div>
                  </div>

                  {/* Immediate Calendar booking action to bypass standard responses */}
                  <div className="space-y-4 max-w-md mx-auto pt-4 border-t border-white/5">
                    <p className="text-xs text-[var(--text-muted)]">Want to lock in your call slot immediately?</p>
                    <motion.a
                      href="https://calendly.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                      style={{ background: 'rgba(232, 255, 77, 0.12)', border: '1px solid rgba(232, 255, 77, 0.3)', color: '#e8ff4d' }}
                    >
                      <Calendar className="w-4 h-4 text-[#e8ff4d]" />
                      <span>Select Time Slot on Calendly</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#e8ff4d]" />
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  )
}
