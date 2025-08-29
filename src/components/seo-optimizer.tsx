'use client'

import { useEffect } from 'react'

export function SEOOptimizer() {
  useEffect(() => {
    // Add JSON-LD for breadcrumbs
    const addBreadcrumbSchema = () => {
      if (document.querySelector('#breadcrumb-schema')) return

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

      const script = document.createElement('script')
      script.id = 'breadcrumb-schema'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(breadcrumbSchema)
      document.head.appendChild(script)
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

    // Run all
    addBreadcrumbSchema()
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
