'use client'

import { useEffect, useRef, useState } from 'react'

export function CursorTrail() {
  const [mounted, setMounted] = useState(false)
  const trailRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const isMoving = useRef(false)

  // Only render on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let animationFrame: number
    let particleTimeout: ReturnType<typeof setTimeout>
    let isAnimating = false

    const updateTrail = () => {
      if (!isAnimating || !trailRef.current) return

      trailRef.current.style.transform = `translate3d(${mousePos.current.x - 10}px, ${mousePos.current.y - 10}px, 0)`
      animationFrame = requestAnimationFrame(updateTrail)
    }

    const createParticle = () => {
      if (!isMoving.current || particlesRef.current.length > 10) return

      const particle = document.createElement('div')
      particle.className = 'cursor-particle'
      particle.style.transform = `translate3d(${mousePos.current.x - 2}px, ${mousePos.current.y - 2}px, 0)`

      document.body.appendChild(particle)
      particlesRef.current.push(particle)

      // Remove particle after animation with proper cleanup
      const timeoutId = setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
        const index = particlesRef.current.indexOf(particle)
        if (index > -1) {
          particlesRef.current.splice(index, 1)
        }
      }, 1000)

      // Store timeout ID for cleanup
      particle.dataset.timeoutId = timeoutId.toString()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isMoving.current = true

      // Create particles less frequently for better performance
      if (Math.random() < 0.05) {
        createParticle()
      }

      // Clear existing timeout
      clearTimeout(particleTimeout)

      // Set new timeout to stop creating particles
      particleTimeout = setTimeout(() => {
        isMoving.current = false
      }, 150)
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

    // Start animation safely
    isAnimating = true
    updateTrail()

    // Add event listeners with passive option for better performance
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

      // Clean up particles with timeout cleanup
      const particles = [...particlesRef.current]
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
        // Clear associated timeout
        const timeoutId = particle.dataset.timeoutId
        if (timeoutId) {
          clearTimeout(parseInt(timeoutId))
        }
      })
      particlesRef.current = []
    }
  }, [mounted])

  // Don't render on server side
  if (!mounted) {
    return null
  }

  return (
    <div
      ref={trailRef}
      className="cursor-trail"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
