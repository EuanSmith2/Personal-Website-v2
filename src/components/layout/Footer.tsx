import Link from "next/link"
import { portfolioConfig } from "@/data/portfolio.config"

export function Footer() {
  const { personal } = portfolioConfig

  return (
    <footer
      className="border-t border-zinc-800 py-8"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono font-bold text-cyan-400 text-sm">{personal.displayName}</span>

        <nav className="flex items-center gap-5 text-xs font-mono text-zinc-400">
          <Link href="/faq" className="hover:text-cyan-400 transition-colors">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
            Privacy
          </Link>
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
        </nav>

        <p className="text-xs text-zinc-400 font-mono">
          Built with Next.js · Tailwind · Framer Motion · GSAP
        </p>
      </div>
    </footer>
  )
}
