import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

// EU flag rendered as SVG — 12 stars in circle on blue field
const EUFlag = () => (
  <svg viewBox="0 0 900 600" width="72" height="48" aria-label="European Union flag" role="img">
    <rect width="900" height="600" fill="#003399" />
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 - 90) * (Math.PI / 180)
      const cx = 450 + Math.cos(angle) * 150
      const cy = 300 + Math.sin(angle) * 150
      // 5-pointed star using polygon
      const pts = Array.from({ length: 5 }, (__, j) => {
        const a = ((j * 72) - 90) * (Math.PI / 180)
        const b = ((j * 72 + 36) - 90) * (Math.PI / 180)
        return `${cx + Math.cos(a) * 20},${cy + Math.sin(a) * 20} ${cx + Math.cos(b) * 9},${cy + Math.sin(b) * 9}`
      }).join(" ")
      return <polygon key={i} points={pts} fill="#FFCC00" />
    })}
  </svg>
)

// DCU badge — styled to match DCU's red brand identity
const DCUBadge = () => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded border font-bold text-white"
    style={{ background: "#DC143C", borderColor: "#B01030", letterSpacing: "0.05em" }}
  >
    <span className="text-base tracking-wider">DCU</span>
    <span className="text-xs font-normal opacity-80 hidden sm:inline">Dublin City University</span>
  </div>
)

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
          {/* EU blue header bar with stars */}
          <div
            className="rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, #002080 0%, #003399 60%, #001a66 100%)", border: "1px solid #0040cc40" }}
          >
            <div className="flex items-center gap-5">
              <EUFlag />
              <div>
                <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-1">European Commission Initiative</p>
                <h3 className="text-white font-bold text-xl leading-tight">European Digital Media Observatory</h3>
                <p className="text-white/60 text-sm mt-0.5">An official EU-mandated body combating disinformation across member states</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start sm:items-end">
              <DCUBadge />
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

          {/* Governmental importance statement */}
          <div className="mb-8 rounded-xl p-5 border-l-4 border-blue-400" style={{ background: "rgba(0,51,153,0.15)", borderLeft: "4px solid #003399" }}>
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
