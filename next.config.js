/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  
  // Compression and optimization
  compress: true,
  
  // Asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '/base-64-decoder' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/base-64-decoder' : '',
  
  // Headers for caching (GitHub Pages compatible)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Modern JavaScript optimizations
  swcMinify: true,

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Modern browser targeting - remove legacy polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        'regenerator-runtime': false,
      }

      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        usedExports: true,
        sideEffects: false,
      }

      // Tree shaking optimization
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                },
                modules: false,
                useBuiltIns: false,
              }],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
            ]
          }
        }
      })
    }

    return config
  },
}

module.exports = nextConfig
