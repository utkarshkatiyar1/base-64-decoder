'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Base64Converter from '@/components/base64-converter'
import AdvancedConverter from '@/components/advanced-converter'
import BatchConverter from '@/components/batch-converter'
import { cn } from '@/lib/utils'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'batch'>('basic')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <Base64Converter />
      case 'advanced':
        return <AdvancedConverter />
      case 'batch':
        return <BatchConverter />
      default:
        return <Base64Converter />
    }
  }

  // Don't render on server side
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto py-8 md:py-12 px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
              Base64 Converter
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Loading...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10" />
      </div>

      <div className="container mx-auto py-8 md:py-12 px-4 max-w-7xl">
        {/* Premium Tab Navigation */}
        <div className="flex justify-center mb-12 fade-in">
          <div className="card-primary rounded-2xl p-2 shadow-lg">
            <div className="flex">
              <button
                onClick={() => setActiveTab('basic')}
                className={cn(
                  "px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-interactive relative overflow-hidden",
                  activeTab === 'basic'
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20"
                )}
              >
                <span className="relative z-10">Basic</span>
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={cn(
                  "px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-interactive relative overflow-hidden",
                  activeTab === 'advanced'
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                )}
              >
                <span className="relative z-10">Advanced</span>
              </button>
              <button
                onClick={() => setActiveTab('batch')}
                className={cn(
                  "px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-interactive relative overflow-hidden",
                  activeTab === 'batch'
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg transform scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20"
                )}
              >
                <span className="relative z-10">Batch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content with animation */}
        <div className="slide-in">
          {renderTabContent()}
        </div>
      </div>

      <footer className="mt-16 py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center max-w-7xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold gradient-text mb-2">Base64 Converter</h3>
            <p className="text-muted-foreground text-sm">
              Professional Base64 encoding and decoding tool for developers
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs text-muted-foreground">
            <Link href="/how-to-use" className="hover:text-foreground transition-colors">How to Use</Link>
            <span>•</span>
            <Link href="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <span>•</span>
            <span>100% Secure</span>
            <span>•</span>
            <span>Real-time Processing</span>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              © 2024 Base64 Converter. Built with Next.js, TypeScript & Tailwind CSS.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Client-side processing ensures your data never leaves your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
