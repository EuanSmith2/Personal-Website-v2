import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function Certifications() {
  const { learning, personal } = portfolioConfig
  const certs = learning.filter((l) => l.kind === "cert")
  const practice = learning.filter((l) => l.kind === "practice")

  return (
    <section
      id="certifications"
      aria-label="Certifications and Learning"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// study"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">Certifications and practice</h2>

          <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-5">Certifications in progress</p>
              <ul className="divide-y divide-zinc-800/70 border-y border-zinc-800/70">
                {certs.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-4 py-3">
                    <span className="font-mono text-xs text-zinc-500 shrink-0 w-16">{item.tag}</span>
                    <span className="text-sm text-zinc-300 leading-snug flex-1">{item.name}</span>
                    <span className="font-mono text-[11px] text-zinc-600 shrink-0">{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-5">Practising on</p>
              <ul className="space-y-3">
                {practice.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-zinc-500 shrink-0 w-16">{item.tag}</span>
                    <span className="text-sm text-zinc-300">{item.platform}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-600 leading-relaxed mt-8">
                Also verified on Credly: 3&times; SAP, ISC2 candidate membership, Microsoft AI Skills Fest.{" "}
                <a
                  href={personal.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                >
                  Credly &rarr;
                </a>
              </p>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
