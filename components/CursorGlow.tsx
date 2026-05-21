'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot  = dotRef.current
    if (!glow || !dot) return

    let rafId: number
    let mX = window.innerWidth / 2, mY = window.innerHeight / 2
    let gX = mX, gY = mY, dX = mX, dY = mY

    const onMove = (e: MouseEvent) => { mX = e.clientX; mY = e.clientY }

    const tick = () => {
      gX += (mX - gX) * 0.06; gY += (mY - gY) * 0.06
      glow.style.left = `${gX}px`; glow.style.top = `${gY}px`
      dX += (mX - dX) * 0.22; dY += (mY - dY) * 0.22
      dot.style.left = `${dX}px`; dot.style.top = `${dY}px`
      rafId = requestAnimationFrame(tick)
    }

    const onDown  = () => { dot.style.transform = 'translate(-50%,-50%) scale(0.55)' }
    const onUp    = () => { dot.style.transform = 'translate(-50%,-50%) scale(1)' }
    const onLeave = () => { glow.style.opacity = '0'; dot.style.opacity = '0' }
    const onEnter = () => { glow.style.opacity = '1'; dot.style.opacity = '1' }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} id="cursor-glow" aria-hidden="true"
        style={{ position:'fixed', width:400, height:400, borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)', background:'radial-gradient(circle, rgba(232,255,77,0.08) 0%, rgba(255,92,53,0.05) 45%, transparent 75%)', filter:'blur(30px)', transition:'opacity 0.4s' }} />
      <div ref={dotRef} aria-hidden="true"
        style={{ position:'fixed', width:5, height:5, borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%) scale(1)', background:'#e8ff4d', boxShadow:'0 0 8px rgba(232,255,77,0.9)', transition:'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s', mixBlendMode:'screen' }} />
    </>
  )
}
