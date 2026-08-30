import type { Metadata } from "next"
import Link from "next/link"
import { portfolioConfig } from "@/data/portfolio.config"
import { resolvedFaq } from "@/lib/markdown-mirror"
import { faqPageSchema } from "@/lib/structured-data"

const { personal } = portfolioConfig

export const metadata: Metadata = {
  title: "FAQ — Euan Smith",
  description: `Answers to common questions about ${personal.displayName} — background, work with EDMO Ireland, projects, certifications, and how to get in touch.`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Euan Smith",
    description: `Answers to common questions about ${personal.displayName}.`,
    type: "website",
    url: "/faq",
  },
}

export default function FaqPage() {
  const faq = resolvedFaq()

  return (
    <main
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faq)) }}
      />

      <div className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="font-mono text-xs mb-10" style={{ color: "var(--text-secondary)" }}>
          <Link href="/" className="hover:text-cyan-400">
            ~
          </Link>
          <span className="mx-2">/</span>
          <span style={{ color: "var(--accent-cyan)" }}>faq</span>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">Frequently asked questions</h1>
        <p className="mb-12" style={{ color: "var(--text-secondary)" }}>
          About {personal.displayName} — background, work, and how to get in touch.
        </p>

        <div className="space-y-10">
          {faq.map(({ q, a }) => (
            <section key={q}>
              <h2 className="text-lg font-semibold mb-2">{q}</h2>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {a}
              </p>
            </section>
          ))}
        </div>

        <div
          className="mt-14 pt-8 text-sm font-mono"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          <Link href="/" className="hover:text-cyan-400">
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  )
}
