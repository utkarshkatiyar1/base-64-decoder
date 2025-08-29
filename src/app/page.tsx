'use client'

import { useState } from 'react'
import Base64Converter from '@/components/base64-converter'
import AdvancedConverter from '@/components/advanced-converter'
import BatchConverter from '@/components/batch-converter'
import { cn } from '@/lib/utils'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'batch'>('basic')

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10" />
      </div>

      <div className="container mx-auto py-8 md:py-16 px-4 max-w-7xl">
        {/* Professional Tab Navigation */}
        <div className="flex justify-center mb-12 fade-in">
          <div className="flex bg-muted rounded-lg p-1 border border-border">
            <button
              onClick={() => setActiveTab('basic')}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-medium transition-all duration-150",
                activeTab === 'basic'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Basic
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-medium transition-all duration-150",
                activeTab === 'advanced'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Advanced
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-medium transition-all duration-150",
                activeTab === 'batch'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Batch
            </button>
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
            <span>Multiple Formats</span>
            <span>•</span>
            <span>100% Secure</span>
            <span>•</span>
            <span>Real-time Processing</span>
            <span>•</span>
            <span>Batch Operations</span>
            <span>•</span>
            <span>Mobile Responsive</span>
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
