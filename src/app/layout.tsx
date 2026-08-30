import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { portfolioConfig } from "@/data/portfolio.config"
import { SITE_ORIGIN } from "@/lib/site"
import { structuredDataGraph } from "@/lib/structured-data"
import { AnalyticsConsent } from "@/components/AnalyticsConsent"

const ibmPlexSans = IBM_Plex_Sans({
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
  metadataBase: SITE_ORIGIN,
  title: `${personal.displayName} — ${personal.roles.jobTitle}`,
  description: personal.roles.metaDescription,
  openGraph: {
    title: `${personal.displayName} — ${personal.roles.jobTitle}`,
    description: personal.roles.metaDescription,
    type: "website",
    siteName: personal.displayName,
    locale: "en_IE",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.displayName} — ${personal.roles.jobTitle}`,
    description: personal.roles.metaDescription,
  },
  // Optional Search Console / Bing verification via env var — an alternative
  // to a DNS TXT record. Set GSC_VERIFICATION / BING_VERIFICATION in Vercel
  // and redeploy; leave unset to render nothing.
  ...((process.env.GSC_VERIFICATION || process.env.BING_VERIFICATION)
    ? {
        verification: {
          ...(process.env.GSC_VERIFICATION ? { google: process.env.GSC_VERIFICATION } : {}),
          ...(process.env.BING_VERIFICATION
            ? { other: { "msvalidate.01": process.env.BING_VERIFICATION } }
            : {}),
        },
      }
    : {}),
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph()) }}
        />
      </head>
      <body className="font-sans antialiased" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        {children}
        <Analytics />
        <AnalyticsConsent />
      </body>
    </html>
  )
}
