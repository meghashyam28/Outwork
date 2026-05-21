'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // ── Lenis: buttery smooth scroll ──────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
      infinite: false,
    })
    lenisRef.current = lenis

    // Sync GSAP ticker → Lenis so ScrollTrigger stays perfectly in sync
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Feed Lenis scroll position into ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // ── Scroll-triggered reveal animations ───────────────────────────────
    // Any element with [data-reveal] gets a buttery entrance animation
    ScrollTrigger.batch('[data-reveal]', {
      onEnter: (els) => {
        gsap.fromTo(
          els,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }
        )
      },
      start: 'top 92%',
      once: true,
    })

    // Staggered children with [data-stagger] parent
    ScrollTrigger.batch('[data-stagger] > *', {
      onEnter: (els) => {
        gsap.fromTo(
          els,
          { y: 28, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }
        )
      },
      start: 'top 90%',
      once: true,
    })

    // ── Page loader dismiss ───────────────────────────────────────────────
    const loader = document.getElementById('page-loader')
    if (loader) {
      // Bar animation completes in ~1.2s, then fade the loader out
      const timer = setTimeout(() => {
        loader.classList.add('loaded')
        setTimeout(() => loader.remove(), 700)
      }, 1400)
      return () => clearTimeout(timer)
    }

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    // Scroll to top instantly on page navigation
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    // Refresh ScrollTriggers so height recalculations are correct for the new page DOM
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, [pathname])

  return <>{children}</>
}
