import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function EdmoExperience() {
  const { edmo } = portfolioConfig

  return (
    <section
      id="edmo"
      aria-label="EDMO Experience"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>

          {/* EU blue header card */}
          <div
            className="rounded-lg p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: "#0a1a3f", border: "1px solid #1e3a5f" }}
          >
            {/* Left: EU flag + EDMO logo */}
            <div className="flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/eu-flag.webp"
                alt="European Union flag"
                width={80}
                height={54}
                className="rounded-sm shadow-lg flex-shrink-0"
                style={{ width: 80, height: 54, objectFit: "cover" }}
              />
              <div>
                <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">
                  European Commission Initiative
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/edmo-logo.png"
                  alt="European Digital Media Observatory"
                  width={107}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>

            {/* Right: DCU logo — white bg for legibility, generous sizing */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="bg-white rounded px-5 py-3"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/dcu-logo.png"
                  alt="Dublin City University"
                  width={140}
                  height={36}
                  className="h-9 w-auto"
                />
              </div>
              <p className="text-white/40 text-xs font-mono">Host Institution</p>
            </div>
          </div>

          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-6">{"// experience"}</p>

          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-100 mb-1">
              {edmo.organisation}
            </h2>
            <p className="text-zinc-400 text-sm">{edmo.affiliation}</p>
          </div>

          <div className="mb-8">
            <span className="inline-block bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-mono px-4 py-1 rounded">
              {edmo.role}
            </span>
          </div>

          <p className="text-zinc-300 leading-relaxed mb-8 max-w-3xl">{edmo.mission}</p>

          <ul className="space-y-3">
            {edmo.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="text-cyan-400 font-mono mt-0.5 flex-shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>

        </SectionWrapper>
      </div>
    </section>
  )
}
