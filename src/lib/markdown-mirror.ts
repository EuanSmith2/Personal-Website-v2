import { portfolioConfig } from "@/data/portfolio.config"

const SITE_URL = "https://euansmith.net"

export function generatePortfolioMarkdown(): string {
  const { personal, about, currentActivity, timeline, edmo, projects, certifications, learning, lifestyle, contact } =
    portfolioConfig

  const lines: string[] = []

  lines.push(`# ${personal.displayName}`)
  lines.push("")
  lines.push(personal.title)
  lines.push("")
  lines.push(personal.tagline)
  lines.push("")

  lines.push("## About")
  lines.push("")
  lines.push(about.narrative)
  lines.push("")
  lines.push(`Focus areas: ${about.tags.join(", ")}`)
  lines.push("")

  lines.push("## Current Activity")
  lines.push("")
  for (const item of currentActivity) {
    lines.push(`### ${item.title}`)
    lines.push("")
    lines.push(item.detail)
    lines.push("")
  }

  lines.push("## Timeline")
  lines.push("")
  for (const t of timeline) {
    lines.push(`- **${t.year} — ${t.label}**: ${t.description}`)
  }
  lines.push("")

  lines.push("## Research — EDMO")
  lines.push("")
  lines.push(`${edmo.organisation} (${edmo.affiliation}). ${edmo.role}.`)
  lines.push("")
  lines.push(edmo.mission)
  lines.push("")
  for (const r of edmo.responsibilities) {
    lines.push(`- ${r}`)
  }
  lines.push("")

  lines.push("## Projects")
  lines.push("")
  for (const p of projects) {
    lines.push(`### ${p.number} — ${p.name}`)
    lines.push("")
    lines.push(`Tags: ${p.tags.join(", ")}`)
    lines.push("")
    lines.push(p.description)
    if ("impact" in p && p.impact) lines.push(`\nImpact: ${p.impact}`)
    lines.push(`\nStatus: ${p.status}`)
    if ("githubUrl" in p && p.githubUrl) lines.push(`\nGitHub: ${p.githubUrl}`)
    lines.push("")
  }

  lines.push("## Certifications")
  lines.push("")
  for (const c of certifications) {
    lines.push(`- ${c.issuer} — ${c.name} (${c.status})`)
  }
  lines.push("")

  lines.push("## Currently Learning")
  lines.push("")
  for (const l of learning) {
    lines.push(`- ${l.platform} — ${l.name} (${l.status})`)
  }
  lines.push("")

  lines.push("## Outside of Work")
  lines.push("")
  for (const i of lifestyle.interests) {
    lines.push(`- ${i.label}: ${i.detail}`)
  }
  lines.push("")

  lines.push("## Contact")
  lines.push("")
  lines.push(contact.closing)
  lines.push("")
  lines.push(contact.subtext)
  lines.push("")
  lines.push(`GitHub: ${personal.github}`)
  lines.push(`LinkedIn: ${personal.linkedin}`)
  lines.push(`TryHackMe: ${personal.tryhackme}`)
  lines.push(`Credly: ${personal.credly}`)
  lines.push(`CV: ${SITE_URL}${personal.cv}`)
  lines.push("")

  return lines.join("\n")
}

export function generateLlmsTxt(): string {
  const { personal, projects, edmo } = portfolioConfig

  return `# ${personal.displayName}

> ${personal.title}. ${personal.tagline}

${personal.displayName} is a cybersecurity student based in Dublin, Ireland, starting a BSc in Cybersecurity & Digital Forensics at Technological University Dublin in September 2026. He works on client web development, AI/automation projects, and counter-disinformation research with ${edmo.organisation} (${edmo.affiliation}).

## Profile
- [Full profile](${SITE_URL}/index.md): complete background, projects, certifications, and timeline in plain markdown
- [CV](${SITE_URL}${personal.cv}): downloadable CV/resume
- [GitHub](${personal.github})
- [LinkedIn](${personal.linkedin})
- [TryHackMe](${personal.tryhackme})
- [Credly (certifications)](${personal.credly})

## Projects
${projects.map((p) => `- ${p.name}${"githubUrl" in p && p.githubUrl ? ` (${p.githubUrl})` : ""}: ${p.description}`).join("\n")}

## Research
- ${edmo.organisation} — ${edmo.role}, affiliated with ${edmo.affiliation}
`
}
