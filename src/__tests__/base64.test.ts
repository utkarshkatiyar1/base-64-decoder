/**
 * @jest-environment jsdom
 */

import {
  encodeToBase64,
  decodeFromBase64,
  isValidBase64,
  detectInputFormat,
  formatBase64,
  formatFileSize,
  decodeBase64ToFile
} from '@/lib/base64'

describe('Base64 Utility Functions', () => {
  describe('encodeToBase64', () => {
    it('should encode simple text correctly', () => {
      const result = encodeToBase64('Hello World')
      expect(result.success).toBe(true)
      expect(result.data).toBe('SGVsbG8gV29ybGQ=')
      expect(result.originalSize).toBe(11)
      expect(result.encodedSize).toBe(16)
    })

    it('should encode empty string', () => {
      const result = encodeToBase64('')
      expect(result.success).toBe(true)
      expect(result.data).toBe('')
    })

    it('should encode unicode characters', () => {
      const result = encodeToBase64('Hello 🌍')
      expect(result.success).toBe(true)
      expect(result.data).toBeTruthy()
    })

    it('should handle special characters', () => {
      const result = encodeToBase64('!@#$%^&*()')
      expect(result.success).toBe(true)
      expect(result.data).toBeTruthy()
    })

    it('should handle non-string input', () => {
      const result = encodeToBase64(123 as any)
      expect(result.success).toBe(false)
      expect(result.error).toContain('Input must be a string')
    })
  })

  describe('decodeFromBase64', () => {
    it('should decode valid Base64 correctly', () => {
      const result = decodeFromBase64('SGVsbG8gV29ybGQ=')
      expect(result.success).toBe(true)
      expect(result.data).toBe('Hello World')
    })

    it('should handle empty input', () => {
      const result = decodeFromBase64('')
      expect(result.success).toBe(false)
      expect(result.error).toContain('Input must be a non-empty string')
    })

    it('should handle invalid Base64', () => {
      const result = decodeFromBase64('Invalid Base64!')
      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid Base64 format')
    })

    it('should handle Base64 with whitespace', () => {
      const result = decodeFromBase64('SGVsbG8g\nV29ybGQ=')
      expect(result.success).toBe(true)
      expect(result.data).toBe('Hello World')
    })

    it('should handle non-string input', () => {
      const result = decodeFromBase64(null as any)
      expect(result.success).toBe(false)
      expect(result.error).toContain('Input must be a non-empty string')
    })
  })

  describe('isValidBase64', () => {
    it('should validate correct Base64', () => {
      expect(isValidBase64('SGVsbG8gV29ybGQ=')).toBe(true)
      expect(isValidBase64('SGVsbG8=')).toBe(true)
      expect(isValidBase64('SGVsbG8')).toBe(true)
    })

    it('should reject invalid Base64', () => {
      expect(isValidBase64('Invalid!')).toBe(false)
      expect(isValidBase64('SGVsbG8g=')).toBe(false) // Invalid padding
      expect(isValidBase64('')).toBe(false)
      expect(isValidBase64(null as any)).toBe(false)
    })

    it('should handle Base64 with whitespace', () => {
      expect(isValidBase64('SGVsbG8g\nV29ybGQ=')).toBe(true)
      expect(isValidBase64('SGVsbG8g V29ybGQ=')).toBe(true)
    })
  })

  describe('detectInputFormat', () => {
    it('should detect Base64 format', () => {
      expect(detectInputFormat('SGVsbG8gV29ybGQ=')).toBe('base64')
      expect(detectInputFormat('SGVsbG8=')).toBe('base64')
    })

    it('should detect URL format', () => {
      expect(detectInputFormat('https://example.com')).toBe('url')
      expect(detectInputFormat('http://test.org')).toBe('url')
      expect(detectInputFormat('ftp://files.com')).toBe('url')
    })

    it('should detect text format', () => {
      expect(detectInputFormat('Hello World')).toBe('text')
      expect(detectInputFormat('Just some text')).toBe('text')
    })

    it('should handle edge cases', () => {
      expect(detectInputFormat('')).toBe('unknown')
      expect(detectInputFormat(null as any)).toBe('unknown')
    })
  })

  describe('formatBase64', () => {
    it('should format Base64 with line breaks', () => {
      const longBase64 = 'SGVsbG8gV29ybGQgdGhpcyBpcyBhIGxvbmcgc3RyaW5nIHRoYXQgc2hvdWxkIGJlIGZvcm1hdHRlZCB3aXRoIGxpbmUgYnJlYWtz'
      const formatted = formatBase64(longBase64, 20)
      expect(formatted).toContain('\n')
      expect(formatted.split('\n').every(line => line.length <= 20)).toBe(true)
    })

    it('should handle short strings', () => {
      const result = formatBase64('SGVsbG8=')
      expect(result).toBe('SGVsbG8=')
    })
  })

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })

    it('should handle decimal values', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2621440)).toBe('2.5 MB')
    })
  })

  describe('decodeBase64ToFile', () => {
    it('should decode Base64 to blob', () => {
      const result = decodeBase64ToFile('SGVsbG8gV29ybGQ=', 'test.txt')
      expect(result.success).toBe(true)
      expect(result.blob).toBeInstanceOf(Blob)
      expect(result.data).toBe('test.txt')
    })

    it('should handle invalid Base64', () => {
      const result = decodeBase64ToFile('Invalid!', 'test.txt')
      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid Base64 format')
    })
  })

  describe('Round-trip encoding/decoding', () => {
    const testCases = [
      'Hello World',
      'Unicode: 🌍🚀💻',
      'Special chars: !@#$%^&*()',
      'Multi-line\ntext\nwith\nbreaks',
      'Numbers: 123456789',
      'Mixed: Hello 123 🌍!'
    ]

    testCases.forEach(testCase => {
      it(`should correctly round-trip: "${testCase}"`, () => {
        const encoded = encodeToBase64(testCase)
        expect(encoded.success).toBe(true)
        
        const decoded = decodeFromBase64(encoded.data!)
        expect(decoded.success).toBe(true)
        expect(decoded.data).toBe(testCase)
      })
    })
  })
})
