"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { portfolioConfig } from "@/data/portfolio.config"

const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Timeline",       href: "#timeline" },
  { label: "EDMO",           href: "#edmo" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
]

const SECTION_IDS = ["hero", "about", "timeline", "edmo", "projects", "certifications", "contact"]

export function Navbar() {
  const { personal } = portfolioConfig
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const menuVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : { hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-zinc-800"
      style={{ background: "rgba(9,9,11,0.8)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="font-mono font-bold text-cyan-400 text-lg tracking-widest" title={personal.displayName}>
            ES
          </a>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative text-sm transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyan-400 rounded"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex text-zinc-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
            </a>
            <button
              className="lg:hidden text-zinc-400 hover:text-zinc-200 transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-zinc-800"
            style={{ background: "rgba(9,9,11,0.95)" }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-zinc-300 hover:text-cyan-400 transition-colors py-1 font-mono text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
