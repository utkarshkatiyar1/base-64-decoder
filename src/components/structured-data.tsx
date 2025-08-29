import Script from 'next/script'

export function StructuredData() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Base64 Converter - Advanced Online Tool",
      "alternateName": ["Base64 Encoder", "Base64 Decoder", "Base64 Tool"],
      "description": "The most advanced Base64 encoder and decoder online. Convert text, files, hex, binary with real-time processing. 100% secure, client-side only. Supports batch conversion and multiple formats.",
      "url": "https://base64converter.dev",
      "applicationCategory": ["UtilityApplication", "DeveloperApplication", "ProductivityApplication"],
      "operatingSystem": ["Windows", "macOS", "Linux", "iOS", "Android"],
      "browserRequirements": "Requires JavaScript. Requires HTML5. Works with Chrome, Firefox, Safari, Edge.",
      "permissions": "browser",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Base64 encoding and decoding",
        "Multiple format support (Hex, Binary, ASCII85)",
        "File encoding with drag & drop",
        "Batch processing capabilities",
        "Real-time conversion",
        "URL-safe Base64 encoding",
        "Copy to clipboard functionality",
        "Download results as files",
        "Dark/Light/System themes",
        "Mobile responsive design",
        "Client-side processing for security",
        "No registration required",
        "Unlimited usage"
      ],
      "softwareVersion": "2.0.0",
      "datePublished": "2024-01-01",
      "dateModified": "2024-12-29",
      "author": {
        "@type": "Organization",
        "name": "Base64 Converter Team",
        "url": "https://base64converter.dev"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Base64 Converter",
        "url": "https://base64converter.dev"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "screenshot": "https://base64converter.dev/screenshot.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Base64 Converter",
      "applicationCategory": "WebApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Convert Text to Base64",
      "description": "Step-by-step guide to encode text to Base64 using our online converter",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Text",
          "text": "Type or paste your text into the input field"
        },
        {
          "@type": "HowToStep",
          "name": "Select Encode Mode",
          "text": "Make sure 'Encode' mode is selected"
        },
        {
          "@type": "HowToStep",
          "name": "Get Result",
          "text": "Your Base64 encoded result appears instantly in the output field"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Base64 encoding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used for encoding data in email, web applications, and data storage."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Base64 converter secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our Base64 converter is 100% secure. All processing happens client-side in your browser, meaning your data never leaves your device or gets sent to our servers."
          }
        },
        {
          "@type": "Question",
          "name": "Can I convert files to Base64?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can convert any file to Base64 using our drag & drop interface or file picker. The tool supports all file types and provides instant conversion."
          }
        }
      ]
    }
  ]

  return (
    <>
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
    </>
  )
}
