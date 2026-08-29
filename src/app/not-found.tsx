import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found — Euan Smith",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <div className="w-full max-w-xl font-mono" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          <span style={{ color: "var(--accent-cyan)" }}>~</span> $ cat page
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          cat: page: No such file or directory
        </p>

        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          That page doesn&apos;t exist — it may have moved, or the link was wrong.
        </p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="underline underline-offset-4 hover:text-cyan-400" style={{ color: "var(--accent-cyan)" }}>
            cd ~
          </Link>
          <Link href="/cv" className="underline underline-offset-4 hover:text-cyan-400" style={{ color: "var(--text-secondary)" }}>
            /cv
          </Link>
          <Link href="/llms.txt" className="underline underline-offset-4 hover:text-cyan-400" style={{ color: "var(--text-secondary)" }}>
            /llms.txt
          </Link>
        </nav>
      </div>
    </main>
  )
}
