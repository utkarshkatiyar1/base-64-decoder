import { Metadata } from 'next'

export const enhancedMetadata: Metadata = {
  // Primary SEO
  title: {
    default: 'Base64 Converter - #1 Free Online Encoder & Decoder Tool 2024',
    template: '%s | Base64 Converter Pro'
  },
  description: '🚀 #1 Base64 converter online! Instantly encode & decode text, files, images to Base64. Free, secure, fast. No registration required. Works offline. Try now!',
  
  // Keywords for maximum visibility
  keywords: [
    'base64 converter',
    'base64 encoder', 
    'base64 decoder',
    'online base64',
    'free base64 tool',
    'text to base64',
    'base64 to text',
    'encode decode',
    'base64 online converter',
    'best base64 tool',
    'base64 file converter',
    'image to base64',
    'base64 generator',
    'base64 utility',
    'web base64 tool'
  ],
  
  // Authors and creators
  authors: [{ name: 'Base64 Converter Pro' }],
  creator: 'Base64 Converter Pro',
  publisher: 'Base64 Converter Pro',
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://utkarshkatiyar1.github.io/base-64-decoder',
    siteName: 'Base64 Converter Pro',
    title: 'Base64 Converter - #1 Free Online Encoder & Decoder Tool 2024',
    description: '🚀 #1 Base64 converter online! Instantly encode & decode text, files, images to Base64. Free, secure, fast. No registration required.',
    images: [
      {
        url: 'https://utkarshkatiyar1.github.io/base-64-decoder/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Base64 Converter - Free Online Tool',
        type: 'image/png',
      },
      {
        url: 'https://utkarshkatiyar1.github.io/base-64-decoder/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Base64 Converter Logo',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@base64converter',
    creator: '@base64converter',
    title: 'Base64 Converter - #1 Free Online Tool',
    description: '🚀 Instantly encode & decode text, files, images to Base64. Free, secure, fast. No registration required!',
    images: ['https://utkarshkatiyar1.github.io/base-64-decoder/twitter-image.png'],
  },
  
  // App metadata
  applicationName: 'Base64 Converter Pro',
  referrer: 'origin-when-cross-origin',
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  
  // Alternate languages
  alternates: {
    canonical: 'https://utkarshkatiyar1.github.io/base-64-decoder',
    languages: {
      'en-US': 'https://utkarshkatiyar1.github.io/base-64-decoder',
      'x-default': 'https://utkarshkatiyar1.github.io/base-64-decoder',
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
    ],
  },
  
  // Manifest
  manifest: '/site.webmanifest',
  
  // Additional metadata
  other: {
    'theme-color': '#2563eb',
    'msapplication-TileColor': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
}
