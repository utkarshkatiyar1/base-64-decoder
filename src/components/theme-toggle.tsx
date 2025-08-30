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
        return <Sun className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 scale-100" />
      case 'dark':
        return <Moon className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 scale-100" />
      case 'system':
        return <Monitor className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 scale-100" />
      default:
        return <Sun className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 scale-100" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Light'
      case 'dark': return 'Dark'
      case 'system': return 'Auto'
      default: return 'Light'
    }
  }

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-muted/50 animate-pulse" />
      </div>
    )
  }

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={cycleTheme}
        className={cn(
          "h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 transition-all duration-300 ease-out",
          "bg-background/80 backdrop-blur-md shadow-lg hover:shadow-xl",
          "border-border/50 hover:border-primary/30",
          "hover:bg-background/90 active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isHovered ? "scale-105" : "scale-100"
        )}
        title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'} mode`}
      >
        <div className="relative flex items-center justify-center">
          {getThemeIcon()}
        </div>
        <span className="sr-only">Toggle theme (current: {theme})</span>
      </Button>

      {/* Enhanced tooltip */}
      <div className={cn(
        "absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium",
        "bg-popover/95 backdrop-blur-sm border border-border/50 shadow-md",
        "text-popover-foreground whitespace-nowrap pointer-events-none",
        "transition-all duration-200 ease-out",
        isHovered 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-1 scale-95"
      )}>
        {getThemeLabel()} mode
        <div className="absolute top-full right-3 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-border/50" />
      </div>
    </div>
  )
}
