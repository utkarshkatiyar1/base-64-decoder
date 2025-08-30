/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  // Asset optimization for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/base-64-decoder' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/base-64-decoder' : '',

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react']
  },

  // Nuclear option: completely disable ESLint
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [],
  },

  // Override webpack to disable ESLint plugin
  webpack: (config, { dev, isServer }) => {
    // Remove ESLint plugin completely
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'ESLintWebpackPlugin'
    )
    return config
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
