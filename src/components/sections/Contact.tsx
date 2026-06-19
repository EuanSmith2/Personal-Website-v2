import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail"
import { AwardBadge } from "@/components/ui/AwardBadge"
import { portfolioConfig } from "@/data/portfolio.config"

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.88a8.28 8.28 0 0 0 4.84 1.55V7a4.85 4.85 0 0 1-1.07-.31z"/>
  </svg>
)

export function Contact() {
  const { contact, personal, floatingBadge } = portfolioConfig

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionWrapper>
          <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-100 mb-4">
            {contact.closing}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
            {contact.subtext}
          </p>

          {/* Social links */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            <ObfuscatedEmail
              encoded={personal.emailEncoded}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-zinc-950 font-semibold text-sm hover:bg-cyan-300 transition-colors duration-200"
            />

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-colors duration-200"
            >
              <LinkedinIcon />
              LinkedIn
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-colors duration-200"
            >
              <GithubIcon />
              GitHub
            </a>

            <a
              href={personal.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-zinc-100 transition-colors duration-200"
            >
              <TikTokIcon />
              TikTok
            </a>
          </div>

          {/* Available for work badge — anchored below socials */}
          <div className="flex justify-center">
            <div className="relative group">
              <AwardBadge
                type="portfolio"
                customTitle={floatingBadge.title}
                customSubtitle={floatingBadge.subtitle}
                link={floatingBadge.link}
              />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {floatingBadge.tooltip}
              </span>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
