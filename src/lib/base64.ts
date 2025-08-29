/**
 * Base64 utility functions with comprehensive error handling and validation
 */

export interface Base64Result {
  success: boolean;
  data?: string;
  error?: string;
  originalSize?: number;
  encodedSize?: number;
}

export interface FileProcessResult extends Base64Result {
  fileName?: string;
  fileType?: string;
}

/**
 * Validates if a string is valid Base64
 */
export function isValidBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  
  // Remove whitespace and newlines
  const cleanStr = str.replace(/\s/g, '');
  
  // Check if length is multiple of 4
  if (cleanStr.length % 4 !== 0) return false;
  
  // Check if contains only valid Base64 characters
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(cleanStr);
}

/**
 * Encodes text to Base64
 */
export function encodeToBase64(input: string): Base64Result {
  try {
    if (typeof input !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      };
    }

    const encoded = btoa(unescape(encodeURIComponent(input)));
    
    return {
      success: true,
      data: encoded,
      originalSize: input.length,
      encodedSize: encoded.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Encoding failed'
    };
  }
}

/**
 * Decodes Base64 to text
 */
export function decodeFromBase64(input: string): Base64Result {
  try {
    if (!input || typeof input !== 'string') {
      return {
        success: false,
        error: 'Input must be a non-empty string'
      };
    }

    // Clean the input
    const cleanInput = input.replace(/\s/g, '');
    
    if (!isValidBase64(cleanInput)) {
      return {
        success: false,
        error: 'Invalid Base64 format'
      };
    }

    const decoded = decodeURIComponent(escape(atob(cleanInput)));
    
    return {
      success: true,
      data: decoded,
      originalSize: cleanInput.length,
      encodedSize: decoded.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Decoding failed'
    };
  }
}

/**
 * Encodes file to Base64
 */
export function encodeFileToBase64(file: File): Promise<FileProcessResult> {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const result = reader.result as string;
          const base64Data = result.split(',')[1]; // Remove data URL prefix
          
          resolve({
            success: true,
            data: base64Data,
            fileName: file.name,
            fileType: file.type,
            originalSize: file.size,
            encodedSize: base64Data.length
          });
        } catch (error) {
          resolve({
            success: false,
            error: error instanceof Error ? error.message : 'File encoding failed',
            fileName: file.name,
            fileType: file.type
          });
        }
      };
      
      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file',
          fileName: file.name,
          fileType: file.type
        });
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      resolve({
        success: false,
        error: error instanceof Error ? error.message : 'File processing failed',
        fileName: file.name,
        fileType: file.type
      });
    }
  });
}

/**
 * Decodes Base64 to downloadable file
 */
export function decodeBase64ToFile(base64Data: string, fileName: string = 'decoded-file'): Base64Result & { blob?: Blob } {
  try {
    if (!isValidBase64(base64Data)) {
      return {
        success: false,
        error: 'Invalid Base64 format'
      };
    }

    const binaryString = atob(base64Data.replace(/\s/g, ''));
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const blob = new Blob([bytes]);
    
    return {
      success: true,
      data: fileName,
      blob,
      originalSize: base64Data.length,
      encodedSize: blob.size
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'File decoding failed'
    };
  }
}

/**
 * Downloads a blob as a file
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Detects the format of input data
 */
export function detectInputFormat(input: string): 'base64' | 'text' | 'url' | 'unknown' {
  if (!input || typeof input !== 'string') return 'unknown';
  
  const trimmed = input.trim();
  
  // Check if it's a URL
  try {
    new URL(trimmed);
    return 'url';
  } catch {
    // Not a URL, continue checking
  }
  
  // Check if it's Base64
  if (isValidBase64(trimmed)) {
    return 'base64';
  }
  
  // Default to text
  return 'text';
}

/**
 * Formats Base64 string with line breaks for better readability
 */
export function formatBase64(base64: string, lineLength: number = 76): string {
  const cleanBase64 = base64.replace(/\s/g, '');
  const formatted = cleanBase64.match(new RegExp(`.{1,${lineLength}}`, 'g'));
  return formatted ? formatted.join('\n') : cleanBase64;
}

/**
 * Gets file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * URL-safe Base64 encoding
 */
export function encodeToBase64UrlSafe(input: string): Base64Result {
  try {
    const result = encodeToBase64(input);
    if (result.success && result.data) {
      const urlSafe = result.data
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      return {
        ...result,
        data: urlSafe
      };
    }
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'URL-safe encoding failed'
    };
  }
}

/**
 * URL-safe Base64 decoding
 */
export function decodeFromBase64UrlSafe(input: string): Base64Result {
  try {
    // Convert URL-safe back to standard Base64
    let base64 = input
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }

    return decodeFromBase64(base64);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'URL-safe decoding failed'
    };
  }
}

/**
 * Hex encoding
 */
export function encodeToHex(input: string): Base64Result {
  try {
    const encoded = Array.from(new TextEncoder().encode(input))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');

    return {
      success: true,
      data: encoded,
      originalSize: input.length,
      encodedSize: encoded.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Hex encoding failed'
    };
  }
}

/**
 * Hex decoding
 */
export function decodeFromHex(input: string): Base64Result {
  try {
    const cleanInput = input.replace(/\s/g, '');

    if (!/^[0-9a-fA-F]*$/.test(cleanInput)) {
      return {
        success: false,
        error: 'Invalid hex format'
      };
    }

    if (cleanInput.length % 2 !== 0) {
      return {
        success: false,
        error: 'Hex string must have even length'
      };
    }

    const bytes = new Uint8Array(cleanInput.length / 2);
    for (let i = 0; i < cleanInput.length; i += 2) {
      bytes[i / 2] = parseInt(cleanInput.substr(i, 2), 16);
    }

    const decoded = new TextDecoder().decode(bytes);

    return {
      success: true,
      data: decoded,
      originalSize: cleanInput.length,
      encodedSize: decoded.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Hex decoding failed'
    };
  }
}

/**
 * Binary encoding
 */
export function encodeToBinary(input: string): Base64Result {
  try {
    const encoded = Array.from(new TextEncoder().encode(input))
      .map(byte => byte.toString(2).padStart(8, '0'))
      .join(' ');

    return {
      success: true,
      data: encoded,
      originalSize: input.length,
      encodedSize: encoded.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Binary encoding failed'
    };
  }
}

/**
 * Binary decoding
 */
export function decodeFromBinary(input: string): Base64Result {
  try {
    const cleanInput = input.replace(/\s/g, '');

    if (!/^[01]*$/.test(cleanInput)) {
      return {
        success: false,
        error: 'Invalid binary format'
      };
    }

    if (cleanInput.length % 8 !== 0) {
      return {
        success: false,
        error: 'Binary string length must be multiple of 8'
      };
    }

    const bytes = new Uint8Array(cleanInput.length / 8);
    for (let i = 0; i < cleanInput.length; i += 8) {
      bytes[i / 8] = parseInt(cleanInput.substr(i, 8), 2);
    }

    const decoded = new TextDecoder().decode(bytes);

    return {
      success: true,
      data: decoded,
      originalSize: cleanInput.length,
      encodedSize: decoded.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Binary decoding failed'
    };
  }
}

/**
 * ASCII85 encoding
 */
export function encodeToAscii85(input: string): Base64Result {
  try {
    const bytes = new TextEncoder().encode(input);
    let result = '';

    for (let i = 0; i < bytes.length; i += 4) {
      const chunk = bytes.slice(i, i + 4);
      let value = 0;

      for (let j = 0; j < chunk.length; j++) {
        value = value * 256 + chunk[j];
      }

      if (chunk.length === 4 && value === 0) {
        result += 'z';
      } else {
        const encoded = [];
        for (let k = 0; k < 5; k++) {
          encoded.unshift(String.fromCharCode(33 + (value % 85)));
          value = Math.floor(value / 85);
        }
        result += encoded.slice(0, chunk.length + 1).join('');
      }
    }

    return {
      success: true,
      data: result,
      originalSize: input.length,
      encodedSize: result.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'ASCII85 encoding failed'
    };
  }
}

/**
 * Validates if string is valid hex
 */
export function isValidHex(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  const cleanStr = str.replace(/\s/g, '');
  return /^[0-9a-fA-F]*$/.test(cleanStr) && cleanStr.length % 2 === 0;
}

/**
 * Validates if string is valid binary
 */
export function isValidBinary(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  const cleanStr = str.replace(/\s/g, '');
  return /^[01]*$/.test(cleanStr) && cleanStr.length % 8 === 0;
}

/**
 * Enhanced format detection
 */
export function detectInputFormatEnhanced(input: string): 'base64' | 'base64url' | 'hex' | 'binary' | 'text' | 'url' | 'unknown' {
  if (!input || typeof input !== 'string') return 'unknown';

  const trimmed = input.trim();

  // Check if it's a URL
  try {
    new URL(trimmed);
    return 'url';
  } catch {
    // Not a URL, continue checking
  }

  // Check if it's binary
  if (isValidBinary(trimmed)) {
    return 'binary';
  }

  // Check if it's hex
  if (isValidHex(trimmed)) {
    return 'hex';
  }

  // Check if it's URL-safe Base64
  if (/^[A-Za-z0-9_-]*$/.test(trimmed) && trimmed.length > 4) {
    return 'base64url';
  }

  // Check if it's standard Base64
  if (isValidBase64(trimmed)) {
    return 'base64';
  }

  // Default to text
  return 'text';
}
