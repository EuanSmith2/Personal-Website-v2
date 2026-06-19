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
            className="rounded-xl p-6 mb-10"
            style={{ background: "linear-gradient(135deg, #002080 0%, #003399 60%, #001a66 100%)", border: "1px solid #0040cc40" }}
          >
            {/* Top row: EU flag + EDMO logo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
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
                    style={{ filter: "brightness(1.05)" }}
                  />
                </div>
              </div>

              {/* Right: "An official EU body..." label */}
              <p className="text-white/50 text-xs leading-relaxed max-w-[220px] text-right hidden sm:block">
                An official EU-mandated body combating disinformation across member states
              </p>
            </div>

            {/* Bottom row: partner institution logos */}
            <div className="flex items-center gap-4 pt-5 border-t border-white/10">
              <span className="text-white/40 text-xs font-mono uppercase tracking-wider flex-shrink-0">
                Via
              </span>
              {/* DCU logo on white pill */}
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/dcu-logo.png"
                  alt="Dublin City University"
                  className="h-6 w-auto"
                />
              </div>
              <span className="text-white/20 text-xs">+</span>
              {/* TUD logo on white pill */}
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/tud-logo.png"
                  alt="Technological University Dublin"
                  className="h-6 w-auto"
                />
              </div>
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

          {/* Governmental importance statement */}
          <div className="mb-8 rounded-xl p-5" style={{ background: "rgba(0,51,153,0.15)", borderLeft: "4px solid #003399" }}>
            <p className="text-sm font-mono text-blue-300 uppercase tracking-widest mb-2">Institutional Mandate</p>
            <p className="text-zinc-200 leading-relaxed">
              EDMO operates under direct mandate from the European Commission as part of the European Democracy Action Plan.
              It coordinates a network of independent fact-checking organisations and academic researchers across all EU member states,
              providing policy intelligence to the European Parliament and national governments on disinformation threats and
              information ecosystem integrity.
            </p>
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
