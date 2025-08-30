'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import Navigation to ensure it only loads on client side
const Navigation = dynamic(() => import('./navigation').then(mod => ({ default: mod.Navigation })), {
  ssr: false,
  loading: () => (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B64</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Base64 Converter
            </span>
          </div>
          {/* Loading placeholder for navigation items */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="w-20 h-8 bg-muted/50 rounded animate-pulse"></div>
            <div className="w-24 h-8 bg-muted/50 rounded animate-pulse"></div>
            <div className="w-20 h-8 bg-muted/50 rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-muted/50 rounded animate-pulse"></div>
          </div>
          <div className="md:hidden w-8 h-8 bg-muted/50 rounded animate-pulse"></div>
        </div>
      </div>
    </nav>
  )
})

export function NavigationWrapper() {
  return (
    <Suspense fallback={
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B64</span>
              </div>
              <span className="font-semibold text-foreground hidden sm:block">
                Base64 Converter
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <div className="w-20 h-8 bg-muted/50 rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-muted/50 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-muted/50 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-muted/50 rounded animate-pulse"></div>
            </div>
            <div className="md:hidden w-8 h-8 bg-muted/50 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    }>
      <Navigation />
    </Suspense>
  )
}
