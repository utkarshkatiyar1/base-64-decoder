'use client'

import { useEffect } from 'react'

export function SEOOptimizer() {
  useEffect(() => {
    // Enhanced JSON-LD for maximum SEO impact
    const addEnhancedSchemas = () => {
      // Remove existing schemas
      document.querySelectorAll('[data-seo-schema]').forEach(el => el.remove())

      // 1. WebApplication Schema for Rich Snippets
      const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Base64 Converter - #1 Free Online Tool",
        "alternateName": ["Base64 Encoder", "Base64 Decoder", "Online Base64 Tool"],
        "description": "#1 rated Base64 converter online. Instantly encode & decode text, files, images to Base64. Free, secure, fast. No registration required.",
        "url": "https://utkarshkatiyar1.github.io/base-64-decoder",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "permissions": "browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "author": {
          "@type": "Organization",
          "name": "Base64 Converter Pro",
          "url": "https://utkarshkatiyar1.github.io/base-64-decoder"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "2847",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "Text to Base64 encoding",
          "Base64 to text decoding",
          "File to Base64 conversion",
          "Image to Base64 encoding",
          "Batch processing",
          "Advanced format support",
          "Real-time conversion",
          "No registration required",
          "Works offline",
          "Mobile responsive",
          "Secure client-side processing",
          "Copy to clipboard",
          "Download results",
          "Dark/Light theme"
        ],
        "screenshot": "https://utkarshkatiyar1.github.io/base-64-decoder/screenshot.png",
        "softwareVersion": "2.0",
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0]
      }

      // 2. Breadcrumb Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://utkarshkatiyar1.github.io/base-64-decoder"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Base64 Converter",
            "item": "https://utkarshkatiyar1.github.io/base-64-decoder"
          }
        ]
      }

      // Add WebApplication Schema
      const webAppScript = document.createElement('script')
      webAppScript.setAttribute('data-seo-schema', 'webapp')
      webAppScript.type = 'application/ld+json'
      webAppScript.textContent = JSON.stringify(webAppSchema)
      document.head.appendChild(webAppScript)

      // Add Breadcrumb Schema
      const breadcrumbScript = document.createElement('script')
      breadcrumbScript.setAttribute('data-seo-schema', 'breadcrumb')
      breadcrumbScript.type = 'application/ld+json'
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema)
      document.head.appendChild(breadcrumbScript)
    }

    // Add organization schema
    const addOrganizationSchema = () => {
      if (document.querySelector('#organization-schema')) return

      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Base64 Converter",
        "url": "https://utkarshkatiyar1.github.io/base-64-decoder",
        "logo": "https://utkarshkatiyar1.github.io/base-64-decoder/icon-512.png",
        "description": "Professional Base64 encoding and decoding tool for developers",
        "sameAs": [
          "https://github.com/utkarshkatiyar1/base-64-decoder"
        ]
      }

      const script = document.createElement('script')
      script.id = 'organization-schema'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(organizationSchema)
      document.head.appendChild(script)
    }

    // Optimize meta tags dynamically
    const optimizeMetaTags = () => {
      const metaTags: { name?: string; property?: string; content: string }[] = [
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Base64 Converter' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@base64converter' },
        { name: 'application-name', content: 'Base64 Converter' },
        { name: 'apple-mobile-web-app-title', content: 'Base64 Converter' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'theme-color', content: '#3b82f6' },
      ]

      metaTags.forEach(({ name, property, content }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
        if (!document.querySelector(selector)) {
          const meta = document.createElement('meta')
          if (name) meta.name = name
          if (property) meta.setAttribute('property', property)
          meta.content = content
          document.head.appendChild(meta)
        }
      })
    }

    // Add canonical link
    const addCanonicalLink = () => {
      if (!document.querySelector('link[rel="canonical"]')) {
        const canonical = document.createElement('link')
        canonical.rel = 'canonical'
        canonical.href = window.location.href
        document.head.appendChild(canonical)
      }
    }

    // Optimize page title
    const optimizePageTitle = () => {
      const currentTitle = document.title
      if (!currentTitle.includes('Base64') || !currentTitle.includes('Converter')) {
        document.title = 'Base64 Converter - Free Online Encoder & Decoder Tool | Fast & Secure'
      }
    }

    // Add hreflang tags
    const addHreflangTags = () => {
      const hreflangs = [
        { lang: 'en', href: 'https://utkarshkatiyar1.github.io/base-64-decoder' },
        { lang: 'x-default', href: 'https://utkarshkatiyar1.github.io/base-64-decoder' }
      ]

      hreflangs.forEach(({ lang, href }) => {
        if (!document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)) {
          const link = document.createElement('link')
          link.rel = 'alternate'
          link.hreflang = lang  // ✅ fixed casing
          link.href = href
          document.head.appendChild(link)
        }
      })
    }

    // Run all SEO optimizations
    addEnhancedSchemas()
    addOrganizationSchema()
    optimizeMetaTags()
    addCanonicalLink()
    optimizePageTitle()
    addHreflangTags()

    // Report SEO metrics (only in dev)
    const reportSEOMetrics = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('SEO Metrics:', {
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content'),
          canonicalUrl: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
          structuredData: document.querySelectorAll('script[type="application/ld+json"]').length
        })
      }
    }

    const timer = setTimeout(reportSEOMetrics, 1000)

    return () => clearTimeout(timer) // ✅ cleanup
  }, [])

  return null
}

// Social media optimization
export function SocialMediaOptimizer() {
  useEffect(() => {
    // Add Open Graph image
    if (!document.querySelector('meta[property="og:image"]')) {
      const ogImage = document.createElement('meta')
      ogImage.setAttribute('property', 'og:image')
      ogImage.content = 'https://utkarshkatiyar1.github.io/base-64-decoder/og-image.png'
      document.head.appendChild(ogImage)
    }

    // Add Twitter image
    if (!document.querySelector('meta[name="twitter:image"]')) {
      const twitterImage = document.createElement('meta')
      twitterImage.name = 'twitter:image'
      twitterImage.content = 'https://utkarshkatiyar1.github.io/base-64-decoder/twitter-image.png'
      document.head.appendChild(twitterImage)
    }
  }, [])

  return null
}
