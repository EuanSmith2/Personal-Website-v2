import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function About() {
  const { about } = portfolioConfig

  return (
    <section
      id="about"
      aria-label="About"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-8">{"// about"}</p>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
            <div className="border-l-2 border-cyan-400/40 pl-6">
              <p className="text-zinc-300 leading-relaxed text-base lg:text-lg">
                {about.narrative}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {about.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-sm font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
