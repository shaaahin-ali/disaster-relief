import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { SOSEmergencyButton } from "@/components/sos-emergency"

const fontInterDisplay = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display"
})

const fontInterBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
})

const fontJetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "Sahay - Real relief, right now",
  description: "A disaster relief coordination platform that connects affected citizens, volunteers, NGOs, and government agencies in real time.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontInterDisplay.variable} ${fontInterBody.variable} ${fontJetBrains.variable} font-body bg-bg-base text-text-primary antialiased`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <SOSEmergencyButton />
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
