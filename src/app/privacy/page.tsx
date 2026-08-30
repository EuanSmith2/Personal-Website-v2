import type { Metadata } from "next"
import Link from "next/link"
import { ConsentToggle } from "@/components/AnalyticsConsent"

export const metadata: Metadata = {
  title: "Privacy — Euan Smith",
  description: "What this site collects, why, and how to change your analytics choice.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

const UPDATED = "August 2026"

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <div className="max-w-2xl mx-auto">
        <nav aria-label="Breadcrumb" className="font-mono text-xs mb-10" style={{ color: "var(--text-secondary)" }}>
          <Link href="/" className="hover:text-cyan-400">
            ~
          </Link>
          <span className="mx-2">/</span>
          <span style={{ color: "var(--accent-cyan)" }}>privacy</span>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Privacy</h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-secondary)" }}>
          Last updated: {UPDATED}
        </p>

        <div className="space-y-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            This is a personal portfolio site. It has no accounts, no shopping cart, and no contact form. I try to keep
            what it collects to a minimum.
          </p>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Aggregate analytics (always on)
            </h2>
            <p>
              The site uses Vercel Analytics, which is cookieless. It records page views and rough, aggregated
              information about the request (approximate country, device type, referrer). It does not set cookies, does
              not track you across other websites, and cannot identify you as an individual.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Google Analytics (only if you opt in)
            </h2>
            <p>
              When the intro screen loads, it asks whether you want to allow Google Analytics. Nothing from Google loads
              unless you press &ldquo;y&rdquo;. If you opt in, GA4 sets cookies and reports standard usage data (pages
              visited, time on page, broad location and device) so I can see which pages people actually read. Your
              choice is stored locally in your browser. You can change it here at any time:
            </p>
            <div className="mt-4">
              <ConsentToggle />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              What I don&rsquo;t do
            </h2>
            <p>
              No data is sold or shared. There are no advertising trackers, no fingerprinting, and no third-party
              embeds beyond the analytics described above and Google Fonts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Hosting
            </h2>
            <p>
              The site is hosted on Vercel, which keeps standard server request logs (IP address, timestamp, requested
              URL) for operational and security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Contact
            </h2>
            <p>
              Questions about any of this: reach me via LinkedIn or the email address on the{" "}
              <Link href="/#contact" className="underline hover:text-cyan-400" style={{ color: "var(--accent-cyan)" }}>
                homepage
              </Link>
              .
            </p>
          </section>
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
