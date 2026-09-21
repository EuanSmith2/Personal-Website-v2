import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function Policy() {
  const { policy } = portfolioConfig

  return (
    <section
      id="policy"
      aria-label="Policy and international relations"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>

          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-6">{"// policy"}</p>

          <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-100 mb-4">
            {policy.heading}
          </h2>

          <p className="text-zinc-300 leading-relaxed mb-12 max-w-3xl">{policy.intro}</p>

          <div className="grid gap-6 lg:grid-cols-2">
            {policy.entries.map((entry) => (
              <article
                key={entry.organisation}
                className="rounded-lg p-6 lg:p-8 flex flex-col"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <h3 className="text-lg font-semibold text-zinc-100 mb-1">{entry.organisation}</h3>

                <p className="text-cyan-400 text-sm mb-4">{entry.programme}</p>

                <div className="mb-5">
                  <span className="inline-block bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded">
                    {entry.role}
                  </span>
                </div>

                <p className="text-zinc-300 leading-relaxed mb-6">{entry.body}</p>

                <ul className="space-y-3 mt-auto">
                  {entry.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                      <span className="text-cyan-400 font-mono mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

        </SectionWrapper>
      </div>
    </section>
  )
}
