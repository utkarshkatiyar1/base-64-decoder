import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { StructuredData } from "@/components/structured-data";
import { PerformanceOptimizer, WebVitalsReporter } from "@/components/performance-optimizer";
import { CoreWebVitalsOptimizer, ResourceHints } from "@/components/core-web-vitals";
import { SEOOptimizer, SocialMediaOptimizer } from "@/components/seo-optimizer";
import { NavigationWrapper } from "@/components/navigation-wrapper";
import CursorTrail from "@/components/cursor-trail"
import { enhancedMetadata } from "@/components/enhanced-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...enhancedMetadata,
  metadataBase: new URL('https://utkarshkatiyar1.github.io/base-64-decoder'),
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
            body{background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 30%,#e2e8f0 100%);color:rgb(15 23 42);font-family:system-ui,-apple-system,sans-serif;line-height:1.6;transition:background-color 0.2s ease,color 0.2s ease}
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
          <NavigationWrapper />
          <CursorTrail />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
