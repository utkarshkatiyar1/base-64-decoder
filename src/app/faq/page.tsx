import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Base64 Converter FAQ - Frequently Asked Questions',
  description: 'Get answers to common questions about Base64 encoding, security, browser compatibility, file size limits, and best practices.',
  keywords: ['base64 faq', 'base64 questions', 'base64 help', 'encoding questions'],
}

export default function FAQPage() {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          q: "What is Base64 encoding?",
          a: "Base64 is a binary-to-text encoding scheme that converts binary data into a text string using 64 characters (A-Z, a-z, 0-9, +, /). It's commonly used to encode data for transmission over text-based protocols like email or HTTP."
        },
        {
          q: "Is Base64 encoding the same as encryption?",
          a: "No, Base64 is encoding, not encryption. It's easily reversible and provides no security. Anyone can decode Base64 data back to its original form. For security, you need proper encryption algorithms."
        },
        {
          q: "Why does Base64 increase file size?",
          a: "Base64 encoding increases data size by approximately 33% because it represents 3 bytes of binary data using 4 ASCII characters. This overhead is the trade-off for making binary data text-safe."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          q: "Is it safe to use this converter with sensitive data?",
          a: "Yes, our converter processes all data locally in your browser. No data is sent to external servers or stored anywhere. However, remember that Base64 is not encryption - anyone can decode it."
        },
        {
          q: "Can I use Base64 to hide passwords?",
          a: "No, never use Base64 for password storage or hiding sensitive information. Base64 is easily decoded and provides no security. Use proper encryption and hashing algorithms for passwords."
        },
        {
          q: "Does the converter store my data?",
          a: "No, all processing happens entirely in your browser. We don't store, log, or transmit any of your data to external servers. Your data remains completely private."
        }
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          q: "What browsers are supported?",
          a: "Our converter works in all modern browsers including Chrome, Firefox, Safari, and Edge. It requires JavaScript to be enabled and supports both desktop and mobile browsers."
        },
        {
          q: "Is there a file size limit?",
          a: "The limit depends on your browser's memory capacity. Most modern browsers can handle files up to several hundred MB, but very large files may cause performance issues or browser crashes."
        },
        {
          q: "What's the difference between Base64 and Base64 URL?",
          a: "Base64 URL is a URL-safe variant that replaces '+' with '-' and '/' with '_', and removes padding '=' characters. It's designed for use in URLs and filenames where standard Base64 characters might cause issues."
        },
        {
          q: "Can I encode binary files?",
          a: "Yes, you can encode any type of file including images, documents, executables, etc. Use the file upload feature in our Advanced converter to select and encode binary files."
        }
      ]
    },
    {
      category: "Usage & Features",
      questions: [
        {
          q: "What's the difference between Basic, Advanced, and Batch modes?",
          a: "Basic mode handles simple text encoding/decoding. Advanced mode supports multiple formats (Hex, Binary, ASCII85) and file uploads. Batch mode processes multiple inputs simultaneously."
        },
        {
          q: "How do I encode a file?",
          a: "Use the Advanced converter mode, select your desired output format, then either drag and drop a file or click to browse and select a file from your computer."
        },
        {
          q: "Can I download the results?",
          a: "Yes, the Advanced and Batch converters include download functionality. You can download individual results or export batch results as a CSV file."
        },
        {
          q: "Why am I getting an 'Invalid input' error?",
          a: "This usually means the Base64 string you're trying to decode is malformed or contains invalid characters. Check for typos, missing characters, or incorrect padding."
        }
      ]
    },
    {
      category: "Performance & Limits",
      questions: [
        {
          q: "How fast is the conversion?",
          a: "Conversion happens instantly for most text inputs. Large files may take a few seconds depending on your device's processing power and available memory."
        },
        {
          q: "Can I process multiple files at once?",
          a: "Yes, use the Batch converter to process multiple inputs simultaneously. You can add unlimited rows and process them all with one click."
        },
        {
          q: "Does it work offline?",
          a: "Yes, once the page is loaded, all functionality works offline since processing happens entirely in your browser without requiring internet connectivity."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "The converter isn't working. What should I do?",
          a: "First, ensure JavaScript is enabled in your browser. Try refreshing the page or clearing your browser cache. If issues persist, try using a different browser or device."
        },
        {
          q: "My encoded result looks wrong. What happened?",
          a: "Check that you've selected the correct mode (Encode vs Decode) and format. Also verify that your input data is valid and complete."
        },
        {
          q: "The page is slow or unresponsive with large files.",
          a: "Large files require more processing power and memory. Try using smaller files, closing other browser tabs, or using a device with more available memory."
        },
        {
          q: "Can I report bugs or request features?",
          a: "Yes! We welcome feedback. You can report issues or suggest improvements through our GitHub repository or contact form."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8 md:py-16 px-4 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Converter
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about Base64 encoding, our converter features, and best practices.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <section key={categoryIndex} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{categoryIndex + 1}</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <details
                    key={faqIndex}
                    className="card-interactive rounded-xl overflow-hidden group cursor-interactive"
                  >
                    <summary className="p-6 cursor-pointer hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/10 transition-all duration-300 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">Q</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {faq.q}
                        </h3>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300 flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6">
                      <div className="ml-10 p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 border-l-4 border-blue-500">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-16 text-center">
          <div className="surface rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Cannot find what you are looking for? We are here to help with any additional questions about Base64 encoding or our converter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/how-to-use" 
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                View Tutorial
              </Link>
              <Link 
                href="/use-cases" 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                See Use Cases
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="mt-16 py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold gradient-text mb-2">Base64 Converter</h3>
            <p className="text-muted-foreground text-sm">
              Professional Base64 encoding and decoding tool for developers
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Converter</Link>
            <span>•</span>
            <Link href="/how-to-use" className="hover:text-foreground transition-colors">How to Use</Link>
            <span>•</span>
            <Link href="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
            <span>•</span>
            <span>100% Secure</span>
            <span>•</span>
            <span>Real-time Processing</span>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              © 2024 Base64 Converter by <span className="font-medium text-foreground">Utkarsh Katiyar</span>. Built with Next.js, TypeScript & Tailwind CSS.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Client-side processing ensures your data never leaves your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
