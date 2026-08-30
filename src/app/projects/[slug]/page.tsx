import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { portfolioConfig } from "@/data/portfolio.config"
import { projectGraph } from "@/lib/structured-data"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return portfolioConfig.projects.map((p) => ({ slug: p.id }))
}

function getProject(slug: string) {
  return portfolioConfig.projects.find((p) => p.id === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Euan Smith`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.name} — Euan Smith`,
      description: project.description,
      type: "article",
      url: `/projects/${project.id}`,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const caseStudy = "caseStudy" in project ? project.caseStudy : undefined
  const githubUrl = "githubUrl" in project ? project.githubUrl : undefined
  const impact = "impact" in project ? project.impact : undefined

  return (
    <main
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectGraph(project)) }}
      />

      <article className="max-w-3xl mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          <Link href="/" className="hover:text-cyan-400">
            ~
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#projects" className="hover:text-cyan-400">
            projects
          </Link>
          <span className="mx-2">/</span>
          <span style={{ color: "var(--accent-cyan)" }}>{project.id}</span>
        </nav>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">{project.name}</h1>

        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {impact && (
          <p
            className="border-l-2 pl-4 py-1 mb-8 text-sm"
            style={{ borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}
          >
            {impact}
          </p>
        )}

        {caseStudy && (
          <div className="space-y-8 mt-10">
            {(
              [
                ["Problem", caseStudy.problem],
                ["Approach", caseStudy.approach],
                ["Outcome", caseStudy.outcome],
              ] as const
            ).map(([label, body]) => (
              <section key={label}>
                <h2
                  className="font-mono text-xs tracking-widest uppercase mb-2"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  {label}
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {body}
                </p>
              </section>
            ))}
          </div>
        )}

        <div
          className="mt-14 pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400"
              style={{ color: "var(--accent-cyan)" }}
            >
              View on GitHub ↗
            </a>
          )}
          <Link href="/#projects" className="hover:text-cyan-400" style={{ color: "var(--text-secondary)" }}>
            ← All projects
          </Link>
        </div>
      </article>
    </main>
  )
}
