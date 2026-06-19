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
                {"I'm a "}
                <strong className="text-zinc-100">cybersecurity student</strong>
                {" at Technological University Dublin with a background spanning "}
                <strong className="text-zinc-100">AI automation, hardware systems, and digital forensics</strong>
                {". I build things that work: automation tools that generate real returns, AI agents that explore emergent behaviour, and "}
                <strong className="text-zinc-100">home lab infrastructure</strong>
                {" that mirrors production environments. I'm drawn to "}
                <strong className="text-zinc-100">complex systems</strong>
                {": understanding how they fail, how they can be exploited, and how to make them resilient. My thinking is "}
                <strong className="text-zinc-100">neurodivergent by nature</strong>
                {": I follow threads others overlook, sit with problems until patterns emerge, and rarely accept “that’s just how it works” as an answer."}
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
