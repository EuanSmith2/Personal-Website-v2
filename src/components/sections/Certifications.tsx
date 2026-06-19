import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { CertBadge } from "@/components/ui/CertBadge"
import { portfolioConfig } from "@/data/portfolio.config"

export function Certifications() {
  const { certifications, learning, personal } = portfolioConfig

  return (
    <section
      id="certifications"
      aria-label="Certifications and Learning"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// credentials"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">Certifications &amp; Learning</h2>

          {/* Tier 1 — Earned credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {certifications.map((cert, i) => (
              <CertBadge key={i} {...cert} />
            ))}
          </div>

          <a
            href={personal.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors mb-16"
          >
            → View all verified credentials on Credly
          </a>

          {/* Tier 2 — Currently learning */}
          <div className="border-t border-zinc-800 pt-12">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">{"// currently studying"}</p>
            <div className="flex flex-wrap gap-3">
              {learning.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-[color:var(--border)] p-3 min-w-[200px] flex-1"
                  style={{
                    background: "var(--bg-card)",
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono mb-0.5" style={{ color: item.color }}>
                      {item.platform}
                    </p>
                    <p className="text-sm text-zinc-300 leading-snug mb-1.5">{item.name}</p>
                    <div className="flex items-center gap-1.5">
                      {item.status === "Active" && (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: item.status === "Active" ? item.color : "var(--accent-amber)",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
