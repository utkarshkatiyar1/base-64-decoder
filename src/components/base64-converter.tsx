'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Base64Converter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
      }
    } catch (error) {
      setOutput('Error: Invalid input')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Professional Header */}
      <div className="text-center space-y-4 fade-in">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
          Base64 Converter
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Professional Base64 encoding and decoding tool.
          <span className="text-foreground font-medium"> Fast, secure, and reliable.</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <span className="px-3 py-1 rounded-md bg-muted text-muted-foreground">
            Real-time Processing
          </span>
          <span className="px-3 py-1 rounded-md bg-muted text-muted-foreground">
            100% Client-side
          </span>
          <span className="px-3 py-1 rounded-md bg-muted text-muted-foreground">
            No Data Storage
          </span>
        </div>
      </div>

      {/* Professional Mode Selection */}
      <div className="flex justify-center slide-in">
        <div className="flex bg-muted rounded-lg p-1 border border-border">
          <button
            onClick={() => setMode('encode')}
            className={cn(
              "px-6 py-3 rounded-md text-sm font-medium transition-all duration-150",
              mode === 'encode'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={cn(
              "px-6 py-3 rounded-md text-sm font-medium transition-all duration-150",
              mode === 'decode'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Input Section */}
        <div className="space-y-4">
          <div className="surface rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
            </h2>
            <div className="space-y-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                className="w-full h-64 p-4 border border-border rounded-lg resize-none bg-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60"
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground bg-muted rounded-lg p-3">
                <span>Characters: {input.length}</span>
                <span>{input.length > 0 ? `${Math.ceil(input.length / 1024)} KB` : '0 KB'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Output Section */}
        <div className="space-y-4">
          <div className="surface rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleConvert}
                  disabled={!input.trim()}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-150"
                >
                  Convert
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="px-4 py-2 font-medium rounded-lg transition-all duration-150"
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                value={output}
                readOnly
                placeholder={mode === 'encode' ? 'Base64 output will appear here...' : 'Decoded text will appear here...'}
                className="w-full h-64 p-4 border border-border rounded-lg resize-none bg-muted/50 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60"
              />

              {output && (
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="surface rounded-lg p-3 text-center">
                    <div className="font-semibold text-lg text-foreground">{input.length}</div>
                    <div className="text-muted-foreground">Input</div>
                  </div>
                  <div className="surface rounded-lg p-3 text-center">
                    <div className="font-semibold text-lg text-foreground">{output.length}</div>
                    <div className="text-muted-foreground">Output</div>
                  </div>
                  <div className="surface rounded-lg p-3 text-center">
                    <div className="font-semibold text-lg text-primary">
                      {Math.round((output.length / input.length) * 100)}%
                    </div>
                    <div className="text-muted-foreground">Ratio</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}