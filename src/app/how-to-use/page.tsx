import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Play, Settings, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Use Base64 Converter - Step-by-Step Guide',
  description: 'Complete tutorial on using our Base64 converter. Learn how to encode and decode text, use advanced features, and process multiple files efficiently.',
  keywords: ['base64 tutorial', 'how to encode base64', 'base64 guide', 'encoding tutorial'],
}

export default function HowToUsePage() {
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
            How to Use Base64 Converter
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete step-by-step guide to master Base64 encoding and decoding with our professional tool.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Quick Start</h2>
          </div>
          <div className="card-primary rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-secondary rounded-xl p-6 border-l-4 border-emerald-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm">→</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Encoding (Text → Base64)</h3>
                </div>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-medium">1</span>
                    Select Encode mode
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-medium">2</span>
                    Enter your text in the input field
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-medium">3</span>
                    Click Convert button
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-medium">4</span>
                    Copy the Base64 result
                  </li>
                </ol>
              </div>
              <div className="card-secondary rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">←</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Decoding (Base64 → Text)</h3>
                </div>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">1</span>
                    Select Decode mode
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">2</span>
                    Paste Base64 string in input
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">3</span>
                    Click Convert button
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">4</span>
                    View the decoded text
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Converter */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Play className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Basic Converter</h2>
          </div>
          
          <div className="space-y-8">
            <div className="card-accent rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Features</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-muted-foreground">Simple text to Base64 encoding and decoding</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Real-time character count and size display</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-muted-foreground">Instant conversion with visual feedback</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground">Copy and clear functionality</span>
                </div>
              </div>
            </div>

            <div className="card-primary rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Step-by-Step Instructions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="card-interactive rounded-lg p-4 border-l-4 border-blue-500 cursor-interactive">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold">1</span>
                      <h4 className="font-semibold text-foreground">Choose Mode</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">Select either Encode or Decode using the toggle buttons at the top.</p>
                  </div>
                  <div className="card-interactive rounded-lg p-4 border-l-4 border-emerald-500 cursor-interactive">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center font-bold">2</span>
                      <h4 className="font-semibold text-foreground">Enter Data</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">Type or paste your content into the input textarea. The character count updates in real-time.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="card-interactive rounded-lg p-4 border-l-4 border-purple-500 cursor-interactive">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center font-bold">3</span>
                      <h4 className="font-semibold text-foreground">Convert</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">Click the Convert button to process your data. Results appear instantly in the output field.</p>
                  </div>
                  <div className="card-interactive rounded-lg p-4 border-l-4 border-orange-500 cursor-interactive">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center font-bold">4</span>
                      <h4 className="font-semibold text-foreground">Use Results</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">Copy the result or use Clear to reset both input and output fields.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Converter */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Advanced Converter</h2>
          </div>
          
          <div className="space-y-6">
            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Additional Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Multiple encoding formats: Base64, Base64 URL, Hex, Binary, ASCII85</li>
                <li>• Format auto-detection and suggestions</li>
                <li>• Advanced options for URL-safe encoding</li>
                <li>• Copy, download, and clear functionality</li>
                <li>• Real-time format validation</li>
              </ul>
            </div>

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Format Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Base64</h4>
                  <p className="text-sm text-muted-foreground">Standard Base64 encoding using A-Z, a-z, 0-9, +, /</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Base64 URL</h4>
                  <p className="text-sm text-muted-foreground">URL-safe variant using - and _ instead of + and /</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Hex</h4>
                  <p className="text-sm text-muted-foreground">Hexadecimal representation (0-9, A-F)</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Binary</h4>
                  <p className="text-sm text-muted-foreground">Binary representation using 0s and 1s</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Batch Converter */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Batch Converter</h2>
          </div>
          
          <div className="space-y-6">
            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Bulk Processing</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Process multiple inputs simultaneously</li>
                <li>• Add unlimited rows for batch operations</li>
                <li>• Individual status tracking for each item</li>
                <li>• Export results as CSV file</li>
                <li>• Copy all successful results at once</li>
              </ul>
            </div>

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Batch Workflow</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium text-foreground">Add Items</h4>
                  <p className="text-muted-foreground">Click Add Row to create new input fields. Each row processes independently.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium text-foreground">Fill Data</h4>
                  <p className="text-muted-foreground">Enter different text or Base64 strings in each input field.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium text-foreground">Process All</h4>
                  <p className="text-muted-foreground">Click Process All to convert all inputs at once. Success/error status shows for each item.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium text-foreground">Export Results</h4>
                  <p className="text-muted-foreground">Use Copy Results or Download CSV to save your processed data.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Tips & Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Performance Tips</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Use Basic mode for simple text conversion</li>
                <li>• Advanced mode for multiple formats</li>
                <li>• Batch mode for processing many items</li>
                <li>• Clear data when switching between modes</li>
              </ul>
            </div>
            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">Security Notes</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• All processing happens in your browser</li>
                <li>• No data is sent to external servers</li>
                <li>• Safe for sensitive information</li>
                <li>• Clear data after use if needed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Link 
            href="/use-cases" 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Use Cases
          </Link>
          <Link 
            href="/faq" 
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Read FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}
