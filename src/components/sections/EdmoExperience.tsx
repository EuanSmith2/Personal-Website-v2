import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function EdmoExperience() {
  const { edmo } = portfolioConfig

  return (
    <section
      id="edmo"
      aria-label="EDMO Experience"
      className="py-24 lg:py-32"
      style={{ background: "#080f0d", borderTop: "1px solid rgba(16,185,129,0.12)", borderBottom: "1px solid rgba(16,185,129,0.12)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>

          {/* EU blue header card */}
          <div
            className="rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, #002080 0%, #003399 60%, #001a66 100%)", border: "1px solid #0040cc40" }}
          >
            {/* Left: EU flag + EDMO logo */}
            <div className="flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/eu-flag.webp"
                alt="European Union flag"
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
                  className="h-10 w-auto"
                />
              </div>
            </div>

            {/* Right: DCU logo — white bg for legibility, generous sizing */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="bg-white rounded-lg px-5 py-3 ring-2 ring-white/50"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.5)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/dcu-logo.png"
                  alt="Dublin City University"
                  className="h-9 w-auto"
                />
              </div>
              <p className="text-white/40 text-xs font-mono">Host Institution</p>
            </div>
          </div>

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
