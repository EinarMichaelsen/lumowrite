import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Lato, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-context"
import ErrorBoundary from "@/components/error-boundary"
import { Analytics } from "@vercel/analytics/react"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Suspense } from "react"
import StructuredData from "@/components/structured-data"

// Load Lato font
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
})

// Load Inter as a fallback font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Lumowrite",
  description:
    "A distraction-free space to think things through, without pressure or perfection. Write freely and reflect with AI assistance.",
  keywords: [
    "writing",
    "freewriting",
    "journaling",
    "AI reflection",
    "AI companion",
    "mindfulness",
    "productivity",
    "note-taking",
    "lumowrite",
    "lumowrite.com",
    "distraction-free",
  ],
  authors: [{ name: "Einar", url: "https://einar.blog" }],
  creator: "Einar",
  publisher: "Einar",
  metadataBase: new URL("https://lumowrite.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumowrite.com/",
    title: "Lumowrite",
    description: "A distraction-free space to think things through, without pressure or perfection",
    siteName: "Lumowrite",
    images: [
      {
        url: "/justwritestuff-twitter.jpg",
        width: 1200,
        height: 630,
        alt: "Lumowrite.com - A minimalist online but local writing app",
      },
    ],
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Lumowrite.com",
    description: "A distraction-free space to think things through, without pressure or perfection",
    images: ["/justwritestuff-twitter.jpg"],
    creator: "@einarm90", // Replace with your Twitter username if you have one
  },
  verification: {
    // Add verification codes if you have them
    // google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${lato.variable} ${inter.variable} font-sans`}>
        <ThemeProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
          <Analytics />
          <Suspense fallback={null}>
            <AnalyticsProvider />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
