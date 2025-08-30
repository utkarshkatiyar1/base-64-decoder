'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Book, HelpCircle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Ensure component only renders on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B64</span>
              </div>
              <span className="font-semibold text-foreground hidden sm:block">
                Base64 Converter
              </span>
            </Link>
            {/* Placeholder for navigation items */}
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
  }

  const navItems = [
    { href: '/', label: 'Converter', icon: null },
    { href: '/how-to-use', label: 'How to Use', icon: Book },
    { href: '/use-cases', label: 'Use Cases', icon: Lightbulb },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ]

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B64</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Base64 Converter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
