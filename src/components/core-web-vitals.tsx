'use client'

import { useEffect } from 'react'

// Core Web Vitals optimization
export function CoreWebVitalsOptimizer() {
  useEffect(() => {
    // Optimize Largest Contentful Paint (LCP)
    const optimizeLCP = () => {
      // Preload critical resources
      const criticalResources = [
        { href: '/fonts/geist-sans.woff2', as: 'font', type: 'font/woff2' },
        { href: '/fonts/geist-mono.woff2', as: 'font', type: 'font/woff2' },
      ]

      criticalResources.forEach(({ href, as, type }) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = href
        link.as = as
        if (type) link.type = type
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })

      // Optimize images for LCP
      const heroImages = document.querySelectorAll('img[data-priority]')
      heroImages.forEach((img) => {
        img.setAttribute('loading', 'eager')
        img.setAttribute('fetchpriority', 'high')
      })
    }

    // Optimize First Input Delay (FID)
    const optimizeFID = () => {
      // Break up long tasks
      const scheduleWork = (callback: () => void) => {
        if ('scheduler' in window && 'postTask' in (window as Window & { scheduler?: { postTask: Function } }).scheduler) {
          ;(window as Window & { scheduler: { postTask: Function } }).scheduler.postTask(callback, { priority: 'user-blocking' })
        } else {
          setTimeout(callback, 0)
        }
      }

      // Defer non-critical JavaScript
      const deferredTasks = [
        () => {
          // Initialize analytics (if any)
          console.log('Analytics initialized')
        },
        () => {
          // Initialize service worker
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
              // Service worker registration failed
            })
          }
        },
      ]

      deferredTasks.forEach((task) => scheduleWork(task))
    }

    // Optimize Cumulative Layout Shift (CLS)
    const optimizeCLS = () => {
      // Reserve space for dynamic content
      const dynamicElements = document.querySelectorAll('[data-dynamic]')
      dynamicElements.forEach((element) => {
        const minHeight = element.getAttribute('data-min-height')
        if (minHeight) {
          ;(element as HTMLElement).style.minHeight = minHeight
        }
      })

      // Optimize font loading to prevent layout shifts
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded')
        })
      }
    }

    // Initialize optimizations
    optimizeLCP()
    optimizeFID()
    optimizeCLS()

    // Monitor performance
    if ('PerformanceObserver' in window) {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
        if (lastEntry && process.env.NODE_ENV === 'development') {
          console.log('LCP:', lastEntry.startTime)
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: PerformanceEntry & { processingStart?: number; startTime: number }) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('FID:', (entry.processingStart || 0) - entry.startTime)
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Monitor CLS
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            if (process.env.NODE_ENV === 'development') {
              console.log('CLS:', clsValue)
            }
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return null
}

// Resource hints for better performance
export function ResourceHints() {
  useEffect(() => {
    // DNS prefetch for external resources
    const dnsPrefetchDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
    ]

    dnsPrefetchDomains.forEach((domain) => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = `//${domain}`
      document.head.appendChild(link)
    })

    // Preconnect to critical origins
    const preconnectOrigins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]

    preconnectOrigins.forEach((origin) => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = origin
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }, [])

  return null
}
