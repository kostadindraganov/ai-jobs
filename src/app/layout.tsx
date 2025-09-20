import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@mdxeditor/editor/style.css"
import { ClerkProvider } from "@/services/clerk/components/ClerkProvider"
import { Toaster } from "@/components/ui/sonner"
import { UploadThingSSR } from "@/services/uploadthing/components/UploadThingSSR"
import { generateWebsiteStructuredData } from "@/lib/seo"
import { PerformanceMonitor } from "@/components/seo/PerformanceMonitor"
import { generateBaseMetadata } from "@/lib/metadata"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  ...generateBaseMetadata(),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = generateWebsiteStructuredData()
  
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ClerkProvider>
          {children}
          <Toaster />
          <UploadThingSSR />
          <PerformanceMonitor />
        </ClerkProvider>
      </body>
    </html>
  )
}