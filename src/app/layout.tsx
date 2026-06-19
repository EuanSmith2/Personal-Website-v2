import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { portfolioConfig } from "@/data/portfolio.config"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
})

const { personal } = portfolioConfig

export const metadata: Metadata = {
  title: `${personal.displayName} — Cybersecurity & Digital Forensics`,
  description: personal.tagline,
  openGraph: {
    title: personal.displayName,
    description: personal.tagline,
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        {children}
      </body>
    </html>
  )
}
