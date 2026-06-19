import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { portfolioConfig } from "@/data/portfolio.config"

export function Projects() {
  const { projects } = portfolioConfig

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// projects"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">What I&apos;ve built</h2>
        </SectionWrapper>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <SectionWrapper key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
