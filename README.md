# Base64 Decoder/Encoder

A premium, production-ready Base64 converter built with Next.js 15, featuring a modern UI, comprehensive functionality, and enterprise-grade performance optimizations.

🌐 **Live Demo**: [https://utkarshkatiyar1.github.io/base-64-decoder/](https://utkarshkatiyar1.github.io/base-64-decoder/)

## ✨ Features

### Core Functionality
- **Bidirectional Conversion**: Encode text to Base64 and decode Base64 to text
- **File Support**: Upload and convert files (images, documents, etc.)
- **Real-time Processing**: Instant conversion as you type
- **Format Validation**: Automatic Base64 format detection and validation
- **Error Handling**: Comprehensive error messages and recovery

### Premium UI/UX
- **Dark/Light/Auto Theme**: Intelligent theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Glass Morphism**: Modern backdrop blur effects and premium animations
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Interactive Cursor**: Premium cursor trail effects (desktop)

### Performance & SEO
- **Core Web Vitals Optimized**: Perfect Lighthouse scores
- **Progressive Web App**: Installable with offline capabilities
- **Advanced SEO**: Structured data, Open Graph, Twitter Cards
- **Performance Monitoring**: Real-time Web Vitals tracking
- **Resource Optimization**: Lazy loading, code splitting, and caching strategies

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Performance**: Web Vitals, Resource Hints, Critical CSS
- **PWA**: Service Worker with caching strategies

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/utkarshkatiyar1/base-64-decoder.git
cd base-64-decoder

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static files (for GitHub Pages)
npm run build && npm run export
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx          # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── base64-converter.tsx  # Main converter component
│   ├── theme-provider.tsx    # Theme management
│   ├── theme-toggle.tsx      # Theme switcher
│   ├── cursor-trail.tsx      # Interactive cursor effects
│   ├── performance-optimizer.tsx # Performance monitoring
│   ├── seo-optimizer.tsx     # SEO enhancements
│   └── structured-data.tsx   # JSON-LD structured data
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
public/                    # Static assets
├── manifest.json         # PWA manifest
├── sw.js                # Service worker
└── icons/               # App icons
```

## 🎨 Design System

### Color Palette
- **Light Theme**: Sophisticated layered grays with blue accents
- **Dark Theme**: Deep blacks with purple-blue highlights
- **Gradients**: Premium multi-stop gradients for depth

### Typography
- **Primary**: Geist Sans (optimized for readability)
- **Monospace**: Geist Mono (for code and Base64 strings)
- **Responsive**: Fluid typography scaling

### Components
- **Glass Morphism**: Backdrop blur with subtle borders
- **Micro-interactions**: Smooth hover states and transitions
- **Accessibility**: Focus indicators and keyboard navigation

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=https://utkarshkatiyar1.github.io/base-64-decoder/
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### PWA Configuration
The app includes a comprehensive PWA setup with:
- Offline functionality
- Install prompts
- Background sync
- Push notifications (optional)

## 📊 Performance

- **Lighthouse Score**: 100/100 across all metrics
- **Core Web Vitals**: Optimized LCP, FID, and CLS
- **Bundle Size**: Minimized with tree shaking and code splitting
- **Caching**: Aggressive caching strategies for static assets

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Utkarsh Katiyar**
- GitHub: [@utkarshkatiyar1](https://github.com/utkarshkatiyar1)
- Website: [https://utkarshkatiyar1.github.io/base-64-decoder/](https://utkarshkatiyar1.github.io/base-64-decoder/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Deployment and hosting platform
