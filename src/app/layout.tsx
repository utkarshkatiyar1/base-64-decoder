import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { StructuredData } from "@/components/structured-data";
import { PerformanceOptimizer, WebVitalsReporter } from "@/components/performance-optimizer";
import { CoreWebVitalsOptimizer, ResourceHints } from "@/components/core-web-vitals";
import { SEOOptimizer, SocialMediaOptimizer } from "@/components/seo-optimizer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://utkarshkatiyar1.github.io/base-64-decoder'),
  title: {
    default: "Base64 Converter - Free Online Encoder & Decoder Tool | Fast & Secure",
    template: "%s | Base64 Converter"
  },
  description: "🚀 The most advanced Base64 encoder and decoder online. Convert text, files, hex, binary with real-time processing. 100% secure, client-side only. Supports batch conversion, drag & drop, and multiple formats. No registration required.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "online base64 tool",
    "text to base64",
    "base64 to text",
    "file to base64",
    "hex to base64",
    "binary to base64",
    "ascii85 converter",
    "url safe base64",
    "batch base64 converter",
    "free base64 tool",
    "secure base64 converter",
    "client side base64",
    "real time base64",
    "drag drop base64",
    "mobile base64 converter",
    "fast base64 tool",
    "premium base64 converter"
  ],
  authors: [{ name: "Base64 Converter Team", url: "https://base64converter.dev" }],
  creator: "Base64 Converter",
  publisher: "Base64 Converter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://utkarshkatiyar1.github.io/base-64-decoder",
    siteName: "Base64 Converter",
    title: "Base64 Converter - Free Online Encoder & Decoder Tool | Fast & Secure",
    description: "🚀 The most advanced Base64 encoder and decoder online. Convert text, files, hex, binary with real-time processing. 100% secure, client-side only.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Base64 Converter - Advanced Online Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@base64converter",
    creator: "@base64converter",
    title: "Base64 Converter - Free Online Encoder & Decoder Tool",
    description: "🚀 The most advanced Base64 encoder and decoder online. Convert text, files, hex, binary with real-time processing.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://utkarshkatiyar1.github.io/base-64-decoder",
  },
  category: "Technology",
  classification: "Web Application",
  referrer: "origin-when-cross-origin",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical CSS inlined for LCP optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body{background:rgb(255 255 255);color:rgb(15 23 42);font-family:system-ui,-apple-system,sans-serif;line-height:1.6;transition:background-color 0.2s ease,color 0.2s ease}
            .dark{background:rgb(9 9 11);color:rgb(250 250 250)}
            .fade-in{animation:fadeIn 0.3s ease-out}
            @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
            .gradient-text{background:linear-gradient(135deg,rgb(59 130 246) 0%,rgb(15 23 42) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:700;letter-spacing:-0.025em}
          `
        }} />

        {/* Preload critical resources */}
        <link rel="preload" href="/manifest.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Non-critical resources with defer */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Base64 Converter" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Performance hints */}
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResourceHints />
          <CoreWebVitalsOptimizer />
          <PerformanceOptimizer />
          <WebVitalsReporter />
          <SEOOptimizer />
          <SocialMediaOptimizer />
          <StructuredData />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
