import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
})

const siteUrl = "https://bidouli.vercel.app"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#161620" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Zakaria Bidouli — Software Engineer",
    template: "%s | Zakaria Bidouli",
  },
  description:
    "Full-stack software engineer specializing in distributed systems, real-time applications, and scalable web solutions. Currently building at TaxyLive.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Spring Boot",
    "Distributed Systems",
    "Microservices",
    "Zakaria Bidouli",
    "Morocco",
  ],
  authors: [{ name: "Zakaria Bidouli", url: siteUrl }],
  creator: "Zakaria Bidouli",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Zakaria Bidouli — Software Engineer",
    description:
      "Full-stack software engineer specializing in distributed systems, real-time applications, and scalable web solutions.",
    siteName: "Zakaria Bidouli",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakaria Bidouli — Software Engineer",
    description:
      "Full-stack software engineer specializing in distributed systems, real-time applications, and scalable web solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:font-medium"
          >
            Skip to content
          </a>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
