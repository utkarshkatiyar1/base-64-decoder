'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  // Don't render on server side
  if (!mounted) {
    return null
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover trigger area */}
      <div className="w-12 h-12 flex items-center justify-center">
        <Button
          variant="outline"
          size="icon"
          onClick={cycleTheme}
          className={cn(
            "h-10 w-10 rounded-lg border border-border bg-card/95 backdrop-blur-sm transition-all duration-200",
            "hover:bg-card hover:border-primary/50 hover:shadow-md",
            isHovered ? "opacity-100 scale-100" : "opacity-60 scale-90"
          )}
          title={`Current theme: ${theme}. Click to cycle through themes.`}
        >
          {getThemeIcon()}
          <span className="sr-only">Toggle theme (current: {theme})</span>
        </Button>
      </div>

      {/* Theme label on hover */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground whitespace-nowrap fade-in">
          {theme === 'light' ? 'Light mode' : theme === 'dark' ? 'Dark mode' : 'System mode'}
        </div>
      )}
    </div>
  )
}
