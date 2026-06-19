import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function EdmoExperience() {
  const { edmo } = portfolioConfig

  return (
    <section
      id="edmo"
      aria-label="EDMO Experience"
      className="py-24 lg:py-32 border border-emerald-400/10"
      style={{ background: "#0d1f1a" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          {/* EU flag color bar */}
          <div
            className="w-full h-1 rounded mb-8"
            style={{ background: "linear-gradient(90deg, #003399, #FFD700)" }}
          />

          <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-6">{"// experience"}</p>

          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-100 mb-1">
              {edmo.organisation}
            </h2>
            <p className="text-zinc-400 text-sm">{edmo.affiliation}</p>
          </div>

          <div className="mb-8">
            <span className="inline-block bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-sm font-mono px-4 py-1 rounded-full">
              {edmo.role}
            </span>
          </div>

          <p className="text-zinc-300 leading-relaxed mb-8 max-w-3xl">{edmo.mission}</p>

          <ul className="space-y-3">
            {edmo.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="text-emerald-400 font-mono mt-0.5 flex-shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      </div>
    </section>
  )
}
