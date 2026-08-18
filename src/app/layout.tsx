import type { Metadata } from "next"
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { portfolioConfig } from "@/data/portfolio.config"

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
  title: `${personal.displayName} — Cybersecurity & Digital Forensics`,
  description: personal.tagline,
  openGraph: {
    title: personal.displayName,
    description: personal.tagline,
    type: "website",
    url: "https://euansmith.net",
    images: [
      {
        url: "https://euansmith.net/og-image.jpg",
        width: 1036,
        height: 1085,
        alt: personal.displayName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: personal.displayName,
    description: personal.tagline,
    images: ["https://euansmith.net/og-image.jpg"],
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.displayName,
  alternateName: personal.name,
  url: "https://euansmith.net",
  jobTitle: "Cybersecurity Student & Web Developer",
  description: personal.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dublin",
    addressCountry: "IE",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Technological University Dublin",
  },
  worksFor: {
    "@type": "Organization",
    name: "Forged Websites",
  },
  knowsAbout: [
    "Cybersecurity",
    "Digital Forensics",
    "Ethical Hacking",
    "OSINT",
    "Python",
    "AI/ML Automation",
    "Web Development",
  ],
  sameAs: [personal.github, personal.linkedin, personal.tryhackme, personal.credly],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
