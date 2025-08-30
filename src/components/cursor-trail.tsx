'use client'

import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const isMoving = useRef(false)
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  useEffect(() => {
    let animationFrame: number
    let particleTimeout: ReturnType<typeof setTimeout>
    let isAnimating = false

    const updateTrail = () => {
      if (!isAnimating || !trailRef.current) return
      trailRef.current.style.transform = `translate3d(${mousePos.current.x - 10}px, ${mousePos.current.y - 10}px, 0)`
      animationFrame = requestAnimationFrame(updateTrail)
    }

    const createParticle = () => {
      if (!isMoving.current || particlesRef.current.length > 8) return
      const particle = document.createElement('div')
      particle.className = 'cursor-particle'
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(37, 99, 235, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate3d(${mousePos.current.x - 2}px, ${mousePos.current.y - 2}px, 0);
      `
      document.body.appendChild(particle)
      particlesRef.current.push(particle)

      const timeoutId = setTimeout(() => {
        particle.remove()
        const index = particlesRef.current.indexOf(particle)
        if (index > -1) particlesRef.current.splice(index, 1)
        timeoutsRef.current.delete(timeoutId)
      }, 800)

      timeoutsRef.current.add(timeoutId)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isMoving.current = true
      if (Math.random() < 0.03) createParticle()
      clearTimeout(particleTimeout)
      particleTimeout = setTimeout(() => {
        isMoving.current = false
      }, 100)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target?.matches?.('button, a, [role="button"], .cursor-interactive')) {
        document.body.classList.add('cursor-hover')
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target?.matches?.('button, a, [role="button"], .cursor-interactive')) {
        document.body.classList.remove('cursor-hover')
      }
    }

    isAnimating = true
    updateTrail()

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseEnter, { passive: true })
    document.addEventListener('mouseout', handleMouseLeave, { passive: true })

    return () => {
      isAnimating = false
      cancelAnimationFrame(animationFrame)
      clearTimeout(particleTimeout)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.body.classList.remove('cursor-hover')
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current.clear()
      particlesRef.current.forEach(p => p.remove())
      particlesRef.current = []
    }
  }, [])

  return (
    <div
      ref={trailRef}
      className="cursor-trail"
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
