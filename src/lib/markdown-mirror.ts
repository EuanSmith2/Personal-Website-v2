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
  lines.push(`ORCID: ${personal.orcid}`)
  lines.push(`TryHackMe: ${personal.tryhackme}`)
  lines.push(`Credly: ${personal.credly}`)
  lines.push(`CV: ${SITE_URL}${personal.cv}`)
  lines.push("")

  return lines.join("\n")
}

export function generateEdmoMarkdown(): string {
  const { personal, edmo } = portfolioConfig
  const lines: string[] = []

  lines.push(`# ${personal.displayName} — EDMO Research`)
  lines.push("")
  lines.push(
    `${personal.displayName}'s counter-disinformation research work with ${edmo.organisation} (EDMO), ${edmo.affiliation}.`,
  )
  lines.push("")
  lines.push(`## Role`)
  lines.push("")
  lines.push(`${edmo.role} at ${edmo.organisation}.`)
  lines.push("")
  lines.push(`## What EDMO Is`)
  lines.push("")
  lines.push(edmo.mission)
  lines.push("")
  lines.push(`## ${personal.displayName}'s Contributions`)
  lines.push("")
  for (const r of edmo.responsibilities) {
    lines.push(`- ${r}`)
  }
  lines.push("")
  lines.push(`## Links`)
  lines.push("")
  lines.push(`- [Full profile](${SITE_URL}/index.md)`)
  lines.push(`- [GitHub](${personal.github})`)
  lines.push(`- [LinkedIn](${personal.linkedin})`)
  lines.push("")

  return lines.join("\n")
}

export function generateProjectMarkdown(projectId: string): string | null {
  const { personal, projects } = portfolioConfig
  const p = projects.find((proj) => proj.id === projectId)
  if (!p) return null

  const lines: string[] = []
  lines.push(`# ${p.name} — by ${personal.displayName}`)
  lines.push("")
  lines.push(`A project built by ${personal.displayName}, ${personal.title}.`)
  lines.push("")
  lines.push(`Tags: ${p.tags.join(", ")}`)
  lines.push("")
  lines.push(p.description)
  lines.push("")
  if ("impact" in p && p.impact) {
    lines.push(`Impact: ${p.impact}`)
    lines.push("")
  }
  lines.push(`Status: ${p.status}`)
  lines.push("")
  if ("githubUrl" in p && p.githubUrl) {
    lines.push(`GitHub: ${p.githubUrl}`)
    lines.push("")
  }
  lines.push(`## About ${personal.displayName}`)
  lines.push("")
  lines.push(personal.tagline)
  lines.push("")
  lines.push(`- [Full profile](${SITE_URL}/index.md)`)
  lines.push(`- [FAQ](${SITE_URL}/faq.md)`)
  lines.push(`- [GitHub](${personal.github})`)
  lines.push(`- [LinkedIn](${personal.linkedin})`)
  lines.push("")

  return lines.join("\n")
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "Who is Euan Smith?",
    a: "Euan Smith is a cybersecurity student, freelance web developer, and researcher based in Dublin, Ireland. He is entering the BSc in Cybersecurity & Digital Forensics at Technological University Dublin (TU Dublin) in September 2026, and works across three areas: hand-coded client websites for small businesses under the Forged Websites brand, AI-driven automation tooling, and counter-disinformation research with EDMO Ireland (the European Digital Media Observatory, operating under a European Commission mandate).",
  },
  {
    q: "What does Euan Smith do professionally?",
    a: "He runs Forged Websites, a Dublin-based service building custom, hand-coded websites for small and medium businesses — no templates, no AI-generated code, positioned deliberately against both. Alongside client work he builds AI/ML automation systems (including a computer-vision marketplace-intelligence tool and a WordPress publishing pipeline for EDMO Ireland) and studies cybersecurity, ethical hacking, and digital forensics.",
  },
  {
    q: "What is Euan Smith's educational background?",
    a: "He starts a BSc in Cybersecurity & Digital Forensics at Technological University Dublin (TU Dublin) in September 2026 — a programme covering network security, digital forensics, ethical hacking, cryptography, and security operations, subjects he has been self-studying for several years beforehand. He supplements formal study with independent certifications (SAP, ISC2, Microsoft, CompTIA, Google) and hands-on platforms like TryHackMe and Hack The Box.",
  },
  {
    q: "What certifications does Euan Smith have?",
    a: "Completed: three SAP certifications (Learning Journey in Security and Compliance, Business Integrity Screening Fundamentals, System Security Foundations), ISC2 Candidate Membership, and Microsoft's AI Skills Fest 2026. In progress: the Google Cybersecurity Certificate, Let's Defend's SOC Analyst path, a GRC Mastery programme, and CompTIA Security+, alongside active practice on Hack The Box. Full list on his Credly profile.",
  },
  {
    q: "What projects has Euan Smith built?",
    a: "The Marketplace Intelligence System — an autonomous computer-vision and pricing-intelligence tool that finds resale opportunities across online marketplaces, with ROI scoring and human-in-the-loop checks; it has generated measurable financial returns, some donated to Merchants Quay Ireland. RadicalMap — an open-source OSINT tool that detects and visualises extremist content networks on short-form video platforms from public metadata, built under DSA Article 40 researcher-access and GDPR Article 89 research-exemption provisions. A Multi-Agent AI Sandbox — a sandboxed VM environment for studying emergent behaviour in autonomous AI agents.",
  },
  {
    q: "Does Euan Smith do freelance web development?",
    a: "Yes — he builds custom, hand-coded websites for Dublin-area small and medium businesses under the Forged Websites brand. His stack is Next.js, Tailwind CSS, Framer Motion and GSAP on the front end, with Python and Linux for backend and automation work.",
  },
  {
    q: "What is Euan Smith's connection to EDMO (European Digital Media Observatory)?",
    a: "Since 2025 he has worked as a researcher and freelance contributor for EDMO Ireland, which operates under a direct European Commission mandate as part of the European Democracy Action Plan. He ran a controlled two-account social-media experiment documenting algorithmic radicalisation and interviewed EDMO Ireland's lead researcher on recruitment tactics and Digital Services Act enforcement gaps, presenting findings to roughly 60 students; the work was shared by EDMO Ireland with Dublin City University academics and is being considered for a 2027 MA journalism module. He also built a fortnightly automation pipeline that scrapes fact-checks and publishes AI-assisted summaries via the WordPress REST API.",
  },
  {
    q: "Where is Euan Smith based, and is he open to work?",
    a: "He is based in Dublin, Ireland. He is interested in opportunities at the intersection of security, automation, and complex systems — technical internships, collaborative projects, or freelance web work — and is reachable via LinkedIn or GitHub.",
  },
  {
    q: "What are Euan Smith's core technical skills?",
    a: "Cybersecurity, digital forensics, ethical hacking, and OSINT; Python and Linux systems administration; AI/ML automation and agentic system design; networking and virtualization/home-lab infrastructure; and web development (Next.js, Tailwind, Python-based automation). He runs a home lab with a SIEM stack, network segmentation practice, and honeypot experiments, and is active on TryHackMe and Hack The Box.",
  },
  {
    q: "Where can I find Euan Smith online?",
    a: `GitHub: ${"{github}"} · LinkedIn: ${"{linkedin}"} · ORCID: ${"{orcid}"} · TryHackMe: ${"{tryhackme}"} · Credly: ${"{credly}"} · Personal site: ${SITE_URL} · CV: ${"{cv}"}`,
  },
]

export function generateFaqMarkdown(): string {
  const { personal } = portfolioConfig
  const lines: string[] = []

  lines.push(`# ${personal.displayName} — Frequently Asked Questions`)
  lines.push("")
  lines.push(
    `Also searched as: Euan Smith Dublin, Euan Smith cybersecurity, Euan Smith TU Dublin, Euan Smith Forged Websites, Euan Smith EDMO, Euan Smith GitHub.`,
  )
  lines.push("")

  for (const { q, a } of FAQ) {
    const answer = a
      .replace("{github}", personal.github)
      .replace("{linkedin}", personal.linkedin)
      .replace("{orcid}", personal.orcid)
      .replace("{tryhackme}", personal.tryhackme)
      .replace("{credly}", personal.credly)
      .replace("{cv}", `${SITE_URL}${personal.cv}`)
    lines.push(`## ${q}`)
    lines.push("")
    lines.push(answer)
    lines.push("")
  }

  return lines.join("\n")
}

export function generateLlmsTxt(): string {
  const { personal, projects, edmo } = portfolioConfig

  const faqBlock = FAQ.map(({ q, a }) => {
    const answer = a
      .replace("{github}", personal.github)
      .replace("{linkedin}", personal.linkedin)
      .replace("{orcid}", personal.orcid)
      .replace("{tryhackme}", personal.tryhackme)
      .replace("{credly}", personal.credly)
      .replace("{cv}", `${SITE_URL}${personal.cv}`)
    return `**${q}**\n${answer}`
  }).join("\n\n")

  return `# ${personal.displayName}

> ${personal.title}. ${personal.tagline}

Dublin, Ireland. Cybersecurity student (TU Dublin, BSc Cybersecurity & Digital Forensics, Sept 2026) · Founder, Forged Websites (custom hand-coded client sites) · Researcher, ${edmo.organisation} (${edmo.affiliation}).

Also searched as: Euan Smith Dublin, Euan Smith cybersecurity, Euan Smith TU Dublin, Euan Smith Forged Websites, Euan Smith EDMO, Euan Smith GitHub.

## Profile
- [Full profile](${SITE_URL}/index.md): complete background, projects, certifications, and timeline in plain markdown
- [FAQ](${SITE_URL}/faq.md): detailed answers to common questions about Euan Smith
- [EDMO research](${SITE_URL}/edmo.md): counter-disinformation research work
- [CV](${SITE_URL}${personal.cv}): downloadable CV/resume
- [GitHub](${personal.github})
- [LinkedIn](${personal.linkedin})
- [ORCID](${personal.orcid})
- [TryHackMe](${personal.tryhackme})
- [Credly (certifications)](${personal.credly})

## Projects
${projects.map((p) => `- [${p.name}](${SITE_URL}/projects/${p.id}.md)${"githubUrl" in p && p.githubUrl ? ` ([code](${p.githubUrl}))` : ""}: ${p.description}`).join("\n")}

## Research
- ${edmo.organisation} — ${edmo.role}, affiliated with ${edmo.affiliation}

## Frequently Asked Questions

${faqBlock}
`
}
