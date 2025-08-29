'use client'

import React, { useState, useCallback } from 'react'
import { 
  Plus, 
  Trash2, 
  Download, 
  Copy, 
  Play,
  FileText,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, copyToClipboard } from '@/lib/utils'
import {
  encodeToBase64,
  decodeFromBase64,
  encodeToBase64UrlSafe,
  decodeFromBase64UrlSafe,
  encodeToHex,
  decodeFromHex,
  encodeToBinary,
  decodeFromBinary,
  type Base64Result
} from '@/lib/base64'

type EncodingFormat = 'base64' | 'base64url' | 'hex' | 'binary'
type ConversionMode = 'encode' | 'decode'

interface BatchItem {
  id: string
  input: string
  output: string
  status: 'pending' | 'success' | 'error'
  error?: string
}

export default function BatchConverter() {
  const [mode, setMode] = useState<ConversionMode>('encode')
  const [format, setFormat] = useState<EncodingFormat>('base64')
  const [items, setItems] = useState<BatchItem[]>([
    { id: '1', input: '', output: '', status: 'pending' }
  ])
  const [isProcessing, setIsProcessing] = useState(false)

  // Add new item
  const addItem = () => {
    const newItem: BatchItem = {
      id: Date.now().toString(),
      input: '',
      output: '',
      status: 'pending'
    }
    setItems(prev => [...prev, newItem])
  }

  // Remove item
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  // Update item input
  const updateItemInput = (id: string, input: string) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, input, output: '', status: 'pending' as const, error: undefined }
        : item
    ))
  }

  // Convert single item
  const convertItem = useCallback((input: string, conversionMode: ConversionMode, encodingFormat: EncodingFormat): { output: string; error?: string } => {
    if (!input.trim()) {
      return { output: '', error: 'Empty input' }
    }

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
        return { output: result.data }
      } else {
        return { output: '', error: result.error || 'Conversion failed' }
      }
    } catch (error) {
      return { output: '', error: 'Unexpected error during conversion' }
    }
  }, [])

  // Process all items
  const processAll = async () => {
    setIsProcessing(true)
    
    const updatedItems = items.map(item => {
      if (!item.input.trim()) {
        return { ...item, output: '', status: 'error' as const, error: 'Empty input' }
      }

      const result = convertItem(item.input, mode, format)
      
      return {
        ...item,
        output: result.output,
        status: result.error ? 'error' as const : 'success' as const,
        error: result.error
      }
    })

    setItems(updatedItems)
    setIsProcessing(false)
  }

  // Copy all results
  const copyAllResults = async () => {
    const results = items
      .filter(item => item.status === 'success' && item.output)
      .map(item => item.output)
      .join('\n')
    
    if (results) {
      const success = await copyToClipboard(results)
      if (!success) {
        alert('Failed to copy to clipboard')
      }
    }
  }

  // Download results as CSV
  const downloadResults = () => {
    const csvContent = [
      ['Input', 'Output', 'Status', 'Error'].join(','),
      ...items.map(item => [
        `"${item.input.replace(/"/g, '""')}"`,
        `"${item.output.replace(/"/g, '""')}"`,
        item.status,
        `"${(item.error || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `batch-${mode}-${format}-${Date.now()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Clear all
  const clearAll = () => {
    setItems([{ id: '1', input: '', output: '', status: 'pending' }])
  }

  const formatOptions: { value: EncodingFormat; label: string }[] = [
    { value: 'base64', label: 'Base64' },
    { value: 'base64url', label: 'Base64 URL' },
    { value: 'hex', label: 'Hex' },
    { value: 'binary', label: 'Binary' },
  ]

  const successCount = items.filter(item => item.status === 'success').length
  const errorCount = items.filter(item => item.status === 'error').length

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Batch Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Process multiple inputs at once with bulk operations
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

        {/* Format Selection */}
        <div className="flex rounded-lg border p-1 bg-gray-50 dark:bg-gray-800">
          {formatOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFormat(option.value)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                format === option.value
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={processAll}
            disabled={isProcessing || items.every(item => !item.input.trim())}
            className="flex items-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Process All
          </Button>
          
          <Button
            onClick={addItem}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
        </div>
      </div>

      {/* Stats */}
      {(successCount > 0 || errorCount > 0) && (
        <div className="flex justify-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" />
            {successCount} successful
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errorCount} failed
          </span>
        </div>
      )}

      {/* Batch Items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Batch Items ({items.length})</h2>
          <div className="flex gap-2">
            <Button
              onClick={copyAllResults}
              variant="outline"
              size="sm"
              disabled={successCount === 0}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Results
            </Button>
            <Button
              onClick={downloadResults}
              variant="outline"
              size="sm"
              disabled={items.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Input #{index + 1}
                  </label>
                  {items.length > 1 && (
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <textarea
                  value={item.input}
                  onChange={(e) => updateItemInput(item.id, e.target.value)}
                  placeholder={mode === 'encode' ? 'Enter text to encode...' : `Enter ${format.toUpperCase()} to decode...`}
                  className="w-full h-20 p-3 border border-border rounded-md resize-none text-sm font-mono bg-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">
                    Output #{index + 1}
                  </label>
                  {item.status === 'success' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {item.status === 'error' && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <textarea
                  value={item.output}
                  readOnly
                  placeholder={mode === 'encode' ? `${format.toUpperCase()} output will appear here...` : 'Decoded text will appear here...'}
                  className="w-full h-20 p-3 border border-border rounded-md resize-none text-sm font-mono bg-muted/50 text-foreground placeholder:text-muted-foreground/60"
                />
                {item.error && (
                  <p className="text-xs text-red-500">{item.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
