import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { StructuredData } from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://base64converter.dev'),
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
    url: "https://base64converter.dev",
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
    canonical: "https://base64converter.dev",
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Base64 Converter" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="msapplication-tap-highlight" content="no" />
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
          <StructuredData />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
