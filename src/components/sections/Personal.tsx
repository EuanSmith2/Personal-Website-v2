import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function Personal() {
  const { lifestyle } = portfolioConfig

  return (
    <section
      id="personal"
      aria-label="Personal"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// personal"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">Outside the terminal</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Interests</h3>
              <ul className="space-y-4">
                {lifestyle.interests.map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-zinc-200">{item.label}</p>
                      <p className="text-sm text-zinc-500">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Currently reading</h3>
              <ul className="space-y-5">
                {lifestyle.reading.map((book, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-zinc-600 font-mono text-xs mt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-medium text-zinc-200">{book.title}</p>
                      <p className="text-sm text-zinc-500">{book.author}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
