const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
  </svg>
)

interface Project {
  id: string
  number: string
  name: string
  tags: string[]
  description: string
  impact?: string
  charityLogo?: string
  status: string
  githubUrl?: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="relative rounded-xl border border-[color:var(--border)] p-6 lg:p-8 transition-all duration-[250ms] hover:-translate-y-1 hover:border-[color:var(--border-glow)] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] overflow-hidden cursor-pointer"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Watermark number */}
      <span className="absolute top-4 right-6 text-6xl font-mono text-zinc-800 select-none pointer-events-none leading-none">
        {project.number}
      </span>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-2xl font-semibold text-zinc-100 mb-3">{project.name}</h3>
      <p className="text-zinc-300 leading-relaxed mb-4">{project.description}</p>

      {project.impact && (
        <div className="bg-cyan-400/5 border-l-2 border-cyan-400 pl-4 py-2 mb-4 flex items-center gap-3">
          <span className="text-cyan-300 text-sm">{project.impact}</span>
          {project.charityLogo && (
            <div className="bg-white rounded px-2 py-1 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.charityLogo}
                alt="Merchants Quay Ireland"
                className="h-5 w-auto"
              />
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
          project.status === "Active"
            ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-400"
            : "bg-amber-400/10 border-amber-400/30 text-amber-400"
        }`}>
          {project.status}
        </span>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <GithubIcon />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  )
}
