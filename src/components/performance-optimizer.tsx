'use client'

import { useEffect } from 'react'

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      { href: '/manifest.json', as: 'fetch' },
      { href: '/_next/static/css/app.css', as: 'style' },
    ]

    preloadResources.forEach(({ href, as }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (as === 'fetch') {
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })

    // Defer non-critical JavaScript
    const deferredScripts = document.querySelectorAll('script[data-defer]')
    deferredScripts.forEach((script) => {
      const newScript = document.createElement('script')
      newScript.src = script.getAttribute('src') || ''
      newScript.async = true
      document.body.appendChild(newScript)
    })

    // Optimize images with Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img)
    })

    // Cleanup
    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return null
}

// Web Vitals monitoring
export function WebVitalsReporter() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log performance metrics for debugging
          if (process.env.NODE_ENV === 'development') {
            const value = 'value' in entry ? (entry as any).value :
                         'duration' in entry ? entry.duration : 'N/A'
            console.log(`${entry.name}: ${value}`)
          }
        })
      })

      // Observe paint and navigation timing
      observer.observe({ entryTypes: ['paint', 'navigation', 'largest-contentful-paint'] })

      return () => observer.disconnect()
    }
  }, [])

  return null
}
