'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Copy, 
  Download, 
  Upload, 
  RefreshCw, 
  FileText, 
  Image, 
  AlertCircle,
  CheckCircle,
  ArrowUpDown,
  Settings,
  Eye,
  EyeOff,
  Hash,
  Binary,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, copyToClipboard, debounce } from '@/lib/utils'
import {
  encodeToBase64,
  decodeFromBase64,
  encodeToBase64UrlSafe,
  decodeFromBase64UrlSafe,
  encodeToHex,
  decodeFromHex,
  encodeToBinary,
  decodeFromBinary,
  encodeToAscii85,
  detectInputFormatEnhanced,
  formatBase64,
  formatFileSize,
  type Base64Result
} from '@/lib/base64'

type EncodingFormat = 'base64' | 'base64url' | 'hex' | 'binary' | 'ascii85'
type ConversionMode = 'encode' | 'decode'

interface AdvancedOptions {
  lineBreaks: boolean
  lineLength: number
  showPreview: boolean
  autoDetect: boolean
  caseSensitive: boolean
}

export default function AdvancedConverter() {
  const [mode, setMode] = useState<ConversionMode>('encode')
  const [format, setFormat] = useState<EncodingFormat>('base64')
  const [textInput, setTextInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [stats, setStats] = useState<{ originalSize: number; encodedSize: number } | null>(null)
  
  const [options, setOptions] = useState<AdvancedOptions>({
    lineBreaks: false,
    lineLength: 76,
    showPreview: false,
    autoDetect: true,
    caseSensitive: false
  })

  // Enhanced conversion function
  const convertText = useCallback((input: string, conversionMode: ConversionMode, encodingFormat: EncodingFormat) => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      setStats(null)
      return
    }

    setIsProcessing(true)
    setError('')
    setSuccess('')

    let result: Base64Result

    try {
      if (conversionMode === 'encode') {
        switch (encodingFormat) {
          case 'base64':
            result = encodeToBase64(input)
            break
          case 'base64url':
            result = encodeToBase64UrlSafe(input)
            break
          case 'hex':
            result = encodeToHex(input)
            break
          case 'binary':
            result = encodeToBinary(input)
            break
          case 'ascii85':
            result = encodeToAscii85(input)
            break
          default:
            result = encodeToBase64(input)
        }
      } else {
        switch (encodingFormat) {
          case 'base64':
            result = decodeFromBase64(input)
            break
          case 'base64url':
            result = decodeFromBase64UrlSafe(input)
            break
          case 'hex':
            result = decodeFromHex(input)
            break
          case 'binary':
            result = decodeFromBinary(input)
            break
          default:
            result = decodeFromBase64(input)
        }
      }

      if (result.success && result.data) {
        let finalOutput = result.data
        
        // Apply formatting options
        if (conversionMode === 'encode' && options.lineBreaks && (encodingFormat === 'base64' || encodingFormat === 'base64url')) {
          finalOutput = formatBase64(finalOutput, options.lineLength)
        }
        
        setOutput(finalOutput)
        if (result.originalSize && result.encodedSize) {
          setStats({
            originalSize: result.originalSize,
            encodedSize: result.encodedSize
          })
        }
      } else {
        setError(result.error || 'Conversion failed')
        setOutput('')
        setStats(null)
      }
    } catch (error) {
      setError('Unexpected error during conversion')
      setOutput('')
      setStats(null)
    }

    setIsProcessing(false)
  }, [options])

  // Auto-detect format
  const detectAndSuggestFormat = useCallback((input: string) => {
    if (!input.trim() || !options.autoDetect) return
    
    const detectedFormat = detectInputFormatEnhanced(input)
    
    if (detectedFormat === 'base64' && format !== 'base64') {
      setSuccess(`Base64 detected! Consider switching to Base64 format.`)
    } else if (detectedFormat === 'base64url' && format !== 'base64url') {
      setSuccess(`URL-safe Base64 detected! Consider switching to Base64 URL format.`)
    } else if (detectedFormat === 'hex' && format !== 'hex') {
      setSuccess(`Hex detected! Consider switching to Hex format.`)
    } else if (detectedFormat === 'binary' && format !== 'binary') {
      setSuccess(`Binary detected! Consider switching to Binary format.`)
    }
  }, [format, options.autoDetect])

  // Debounced conversion
  const debouncedConvert = useCallback(
    debounce((input: string, conversionMode: ConversionMode, encodingFormat: EncodingFormat) => {
      convertText(input, conversionMode, encodingFormat)
      detectAndSuggestFormat(input)
    }, 300),
    [convertText, detectAndSuggestFormat]
  )

  // Handle input changes
  useEffect(() => {
    debouncedConvert(textInput, mode, format)
  }, [textInput, mode, format, debouncedConvert])

  // Copy to clipboard
  const handleCopy = async () => {
    if (!output) return
    
    const success = await copyToClipboard(output)
    if (success) {
      setSuccess('Copied to clipboard!')
      setTimeout(() => setSuccess(''), 2000)
    } else {
      setError('Failed to copy to clipboard')
    }
  }

  // Download as file
  const handleDownload = () => {
    if (!output) return

    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${mode}-${format}-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setSuccess('File downloaded successfully!')
  }

  // Clear all
  const handleClear = () => {
    setTextInput('')
    setOutput('')
    setError('')
    setSuccess('')
    setStats(null)
  }

  // Switch mode
  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    
    // If there's output, move it to input for reverse operation
    if (output) {
      setTextInput(output)
      setOutput('')
    }
  }

  const formatOptions: { value: EncodingFormat; label: string; icon: React.ReactNode }[] = [
    { value: 'base64', label: 'Base64', icon: <FileText className="h-4 w-4" /> },
    { value: 'base64url', label: 'Base64 URL', icon: <Zap className="h-4 w-4" /> },
    { value: 'hex', label: 'Hex', icon: <Hash className="h-4 w-4" /> },
    { value: 'binary', label: 'Binary', icon: <Binary className="h-4 w-4" /> },
    { value: 'ascii85', label: 'ASCII85', icon: <FileText className="h-4 w-4" /> },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Professional Header */}
      <div className="text-center space-y-4 fade-in">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
          Advanced Converter
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Multi-format encoding and decoding with advanced options
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
        {/* Mode Selection */}
        <div className="flex rounded-lg border p-1 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => setMode('encode')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              mode === 'encode'
                ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            )}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              mode === 'decode'
                ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            )}
          >
            Decode
          </button>
        </div>

        <Button
          onClick={handleModeSwitch}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          Switch
        </Button>

        {/* Format Selection */}
        <div className="flex rounded-lg border p-1 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
          {formatOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFormat(option.value)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap",
                format === option.value
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Options
        </Button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-4">
          <h3 className="font-semibold text-lg">Advanced Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.lineBreaks}
                onChange={(e) => setOptions(prev => ({ ...prev, lineBreaks: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Add line breaks</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.autoDetect}
                onChange={(e) => setOptions(prev => ({ ...prev, autoDetect: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Auto-detect format</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.showPreview}
                onChange={(e) => setOptions(prev => ({ ...prev, showPreview: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Show preview</span>
            </label>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm">Line length:</label>
              <input
                type="number"
                value={options.lineLength}
                onChange={(e) => setOptions(prev => ({ ...prev, lineLength: parseInt(e.target.value) || 76 }))}
                className="w-20 px-2 py-1 border rounded text-sm"
                min="10"
                max="200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {mode === 'encode' ? 'Input' : `${format.toUpperCase()} Input`}
            {isProcessing && <RefreshCw className="h-4 w-4 animate-spin" />}
          </h2>

          <div className="space-y-2">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : `Enter ${format.toUpperCase()} to decode...`}
              className="w-full h-64 p-4 border border-border rounded-lg resize-none bg-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60"
            />
            <div className="text-sm text-gray-500">
              Characters: {textInput.length}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {mode === 'encode' ? `${format.toUpperCase()} Output` : 'Decoded Output'}
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                disabled={!output}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                disabled={!output}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <textarea
              value={output}
              readOnly
              placeholder={mode === 'encode' ? `${format.toUpperCase()} output will appear here...` : 'Decoded text will appear here...'}
              className="w-full h-64 p-4 border border-border rounded-lg resize-none bg-muted/50 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60"
            />
            
            {stats && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Input: {formatFileSize(stats.originalSize)}</span>
                <span>Output: {formatFileSize(stats.encodedSize)}</span>
                <span>
                  Ratio: {`${((stats.encodedSize / stats.originalSize) * 100).toFixed(1)}%`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
