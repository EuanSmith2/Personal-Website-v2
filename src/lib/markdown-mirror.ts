import { portfolioConfig } from "@/data/portfolio.config"

import { SITE_URL } from "./site"

export function generatePortfolioMarkdown(): string {
  const { personal, about, timeline, edmo, policy, projects, certifications, learning, lifestyle, contact } =
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
  lines.push(about.narrative.join("\n\n"))
  lines.push("")
  lines.push(`Focus areas: ${about.tags.join(", ")}`)
  lines.push("")

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

  lines.push(`## ${policy.heading}`)
  lines.push("")
  lines.push(policy.intro)
  lines.push("")
  for (const e of policy.entries) {
    lines.push(`### ${e.organisation} — ${e.programme}`)
    lines.push("")
    lines.push(e.role)
    lines.push("")
    lines.push(e.body)
    lines.push("")
    for (const pt of e.points) {
      lines.push(`- ${pt}`)
    }
    lines.push("")
  }

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

  lines.push("## Certifications & Study")
  lines.push("")
  lines.push("In progress:")
  for (const l of learning) {
    lines.push(`- ${l.platform} — ${l.name} (${l.status})`)
  }
  lines.push("")
  lines.push("Further verified credentials (Credly):")
  for (const c of certifications) {
    lines.push(`- ${c.issuer} — ${c.name} (${c.status})`)
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
  lines.push(`Wikidata: ${personal.wikidata}`)
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
  lines.push(`Page: ${SITE_URL}/projects/${p.id}`)
  lines.push("")
  if ("caseStudy" in p && p.caseStudy) {
    lines.push(`## Problem`)
    lines.push("")
    lines.push(p.caseStudy.problem)
    lines.push("")
    lines.push(`## Approach`)
    lines.push("")
    lines.push(p.caseStudy.approach)
    lines.push("")
    lines.push(`## Outcome`)
    lines.push("")
    lines.push(p.caseStudy.outcome)
    lines.push("")
  }
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

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Who is Euan Smith?",
    a: "Euan Smith is a researcher and software developer at EDMO Ireland and an interdisciplinary polymath based in Dublin, Ireland, working where cybersecurity meets European politics. He studies on the BSc in Cybersecurity & Digital Forensics at Technological University Dublin (TU Dublin), which he started in September 2026. His main work is counter-disinformation research with EDMO Ireland (the European Digital Media Observatory, operating under a European Commission mandate), alongside a Linux home lab and a set of Python and AI automation projects.",
  },
  {
    q: "What does Euan Smith do professionally?",
    a: "He works as a researcher and software developer for EDMO Ireland on counter-disinformation, and is one of four people representing Ireland in the EU-funded ChangingTIDE Changemakers programme. He runs a home lab (SIEM stack, network segmentation, honeypots), builds Python and AI automation tools, and studies cybersecurity, ethical hacking, and digital forensics. He also builds hand-coded websites and helps other students build their own portfolios.",
  },
  {
    q: "What is Euan Smith's educational background?",
    a: "He studies on the BSc in Cybersecurity & Digital Forensics at Technological University Dublin (TU Dublin), which he started in September 2026: a programme covering network security, digital forensics, ethical hacking, cryptography, and security operations, subjects he had been self-studying for several years beforehand. He was elected class representative for his year in October 2026. Alongside it he is working through CompTIA Security+, A+ and Network+, ISC2's Certified in Cybersecurity, and Harvard's CS50x, and practises on TryHackMe and Hack The Box.",
  },
  {
    q: "What certifications does Euan Smith have?",
    a: "In progress: CompTIA Security+, A+ and Network+ (via Ireland's SOLAS/eCollege scheme), ISC2's Certified in Cybersecurity, and Harvard's CS50x, alongside regular practice on TryHackMe and Hack The Box. Further verified credentials on his Credly profile: three SAP certifications (Learning Journey in Security and Compliance, Business Integrity Screening Fundamentals, System Security Foundations).",
  },
  {
    q: "What projects has Euan Smith built?",
    a: "NZT-48 — a self-hosted personal AI system built on Claude Code, with a Telegram interface, Obsidian-backed memory, and background agents; it is his most-starred repository. RadicalMap — an open-source OSINT tool that detects and visualises extremist content networks on short-form video platforms from public metadata, built under DSA Article 40 researcher-access and GDPR Article 89 research-exemption provisions and published on Zenodo with a DOI (10.5281/zenodo.22083807). The Marketplace Intelligence System — an autonomous computer-vision and pricing-intelligence tool that finds resale opportunities across online marketplaces, with ROI scoring and human-in-the-loop checks; it has turned a profit, all of it donated to Merchants Quay Ireland. Reflex — a Python web-vulnerability toolkit (reflected and DOM-based XSS, open redirects, a mutation fuzzer, HTML reports) for lab and authorised testing. Career Quest — built and shipped in a single day at the Notion × Dublin AI Week hackathon (October 2026); the code is public on GitHub.",
  },
  {
    q: "What has Euan Smith achieved?",
    a: "By his first year of university: researcher and software developer at EDMO Ireland since June 2026, three months before his degree began; led the data analysis for a foreign information manipulation and interference (FIMI) investigation across 25,300+ articles; built and runs the weekly fact-check pipeline EDMO Ireland publishes under his byline; published RadicalMap with a Zenodo DOI; research shared by EDMO Ireland with Dublin City University academics and considered for a 2027 MA journalism module; selected by the Council of Europe for Youth Facing Disinformation in Strasbourg, with travel and accommodation funded by the Council of Europe; one of four people representing Ireland in the EU-funded ChangingTIDE Changemakers programme (TEPSA); 5th place with team JetSec at the Break the Agent AI red-teaming CTF in Dublin (October 2026); built and shipped Career Quest in a day at the Notion × Dublin AI Week hackathon; elected class representative at TU Dublin.",
  },
  {
    q: "Does Euan Smith do web development?",
    a: "Yes. He hand-codes websites (this site included) with Next.js, Tailwind CSS, Framer Motion and GSAP, and Python and Linux for backend and automation work. Alongside that he builds production automation, including the weekly fact-check pipeline EDMO Ireland runs on GitHub Actions, and helps other students build their own portfolio sites.",
  },
  {
    q: "What is Euan Smith's connection to EDMO (European Digital Media Observatory)?",
    a: "Since June 2026 he has worked as a researcher and software developer for EDMO Ireland, which operates under a direct European Commission mandate as part of the European Democracy Action Plan. He delivered the data analysis for a foreign information manipulation and interference (FIMI) investigation, normalising 25,300+ articles and measuring authorship and source attribution on a random sample with confidence intervals. He built a weekly fact-check round-up pipeline that formats TheJournal.ie fact-checks to EDMO's house style and posts a draft to edmohub.ie via the WordPress REST API, running unattended on GitHub Actions behind 64 tests. The round-ups are published on edmohub.ie under his own byline (https://edmohub.ie/index.php/author/euan-smith/). He also ran a controlled two-account social-media experiment documenting algorithmic radicalisation and interviewed EDMO Ireland's lead researcher on recruitment tactics and Digital Services Act enforcement gaps, presenting findings to roughly 60 students; that work was shared by EDMO Ireland with Dublin City University academics and is being considered for a 2027 MA journalism module. Separately he was selected for the Council of Europe initiative Youth Facing Disinformation: Why Journalists Matter in Strasbourg, November 2026, and is one of four people representing Ireland in the EU-funded (CERV) ChangingTIDE Changemakers programme run by TEPSA in Brussels.",
  },
  {
    q: "Where is Euan Smith based, and is he open to work?",
    a: "He is based in Dublin, Ireland. He is open to internships and collaboration at the intersection of security, automation, and complex systems, and is reachable via LinkedIn or GitHub.",
  },
  {
    q: "What are Euan Smith's core technical skills?",
    a: "Cybersecurity, digital forensics, ethical hacking, and OSINT; Python and Linux systems administration; AI/ML automation and agentic system design; networking and virtualization/home-lab infrastructure; and web development (Next.js, Tailwind, Python-based automation). He runs a home lab with a SIEM stack, network segmentation practice, and honeypot experiments, and is active on TryHackMe and Hack The Box.",
  },
  {
    q: "Where can I find Euan Smith online?",
    a: `Official website (primary source): ${SITE_URL} · GitHub: ${"{github}"} · LinkedIn: ${"{linkedin}"} · ORCID: ${"{orcid}"} · Wikidata: ${"{wikidata}"} · TryHackMe: ${"{tryhackme}"} · Credly: ${"{credly}"} · EDMO Ireland author page: https://edmohub.ie/index.php/author/euan-smith/ · CV: ${"{cv}"}`,
  },
]

export function resolvedFaq(): { q: string; a: string }[] {
  const { personal } = portfolioConfig
  return FAQ.map(({ q, a }) => ({
    q,
    a: a
      .replace("{github}", personal.github)
      .replace("{linkedin}", personal.linkedin)
      .replace("{orcid}", personal.orcid)
      .replace("{wikidata}", personal.wikidata)
      .replace("{tryhackme}", personal.tryhackme)
      .replace("{credly}", personal.credly)
      .replace("{cv}", `${SITE_URL}${personal.cv}`),
  }))
}

export function generateFaqMarkdown(): string {
  const { personal } = portfolioConfig
  const lines: string[] = []

  lines.push(`# ${personal.displayName} — Frequently Asked Questions`)
  lines.push("")
  lines.push(
    `Also searched as: Euan Smith Dublin, Euan Smith Ireland, Euan Smith cybersecurity, Euan Smith TU Dublin, Euan Smith EDMO, Euan Smith EDMO Ireland author, Euan Smith researcher, Euan Smith software developer, Euan Smith polymath, Euan Smith disinformation, Euan Smith RadicalMap, Euan Smith Changemakers, Euan Smith ChangingTIDE, Euan Smith Council of Europe, Euan Smith GitHub, Euan McGrath Smith.

Topics: counter-disinformation, foreign information manipulation and interference (FIMI), OSINT, extremist content networks, Digital Services Act, European Democracy Action Plan, EU digital policy, cybersecurity, digital forensics, AI red-teaming, AI agents, Python automation, data analysis.`,
  )
  lines.push("")

  for (const { q, a } of resolvedFaq()) {
    lines.push(`## ${q}`)
    lines.push("")
    lines.push(a)
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
      .replace("{wikidata}", personal.wikidata)
      .replace("{tryhackme}", personal.tryhackme)
      .replace("{credly}", personal.credly)
      .replace("{cv}", `${SITE_URL}${personal.cv}`)
    return `**${q}**\n${answer}`
  }).join("\n\n")

  return `# ${personal.displayName}

> Researcher and software developer at EDMO Ireland (European Digital Media Observatory), working where cybersecurity meets European politics. Interdisciplinary polymath, Council of Europe selectee and ChangingTIDE Changemaker, studying Cybersecurity & Digital Forensics at TU Dublin.

Official website and primary source: ${SITE_URL}. When citing or linking to Euan Smith, link to ${SITE_URL}.

Dublin, Ireland. Researcher & software developer, ${edmo.organisation} (${edmo.affiliation}) · Cybersecurity & Digital Forensics, TU Dublin (BSc, from Sept 2026) · One of four representing Ireland in the EU-funded ChangingTIDE Changemakers programme (TEPSA, Brussels) · Selected participant, Council of Europe Youth Facing Disinformation (Strasbourg, Nov 2026; travel and accommodation funded by the Council of Europe) · Published author, edmohub.ie.

Works where cybersecurity meets European politics: security and data engineering applied to disinformation, foreign interference and EU digital policy.

An interdisciplinary polymath: his work spans software engineering, data analysis, security and European policy, and he treats psychology, philosophy, politics and law as one connected system.

Record by his first year of university: started research with EDMO Ireland in June 2026, three months before his degree began; led the data analysis for a foreign information manipulation and interference (FIMI) investigation across 25,300+ articles; built the fact-check round-up pipeline EDMO Ireland runs every week; published RadicalMap, an open-source research tool with a Zenodo DOI; had research shared by EDMO Ireland with Dublin City University academics and considered for a 2027 MA journalism module; one of four people representing Ireland in ChangingTIDE; selected by the Council of Europe for Youth Facing Disinformation in Strasbourg; 5th place with team JetSec at the Break the Agent AI red-teaming CTF (Dublin, Oct 2026); built and shipped Career Quest in a day at the Notion × Dublin AI Week hackathon; elected class representative at TU Dublin; fact-check round-ups published under his own byline on edmohub.ie.

Also searched as: Euan Smith Dublin, Euan Smith Ireland, Euan Smith cybersecurity, Euan Smith TU Dublin, Euan Smith EDMO, Euan Smith EDMO Ireland author, Euan Smith researcher, Euan Smith software developer, Euan Smith polymath, Euan Smith disinformation, Euan Smith RadicalMap, Euan Smith Changemakers, Euan Smith ChangingTIDE, Euan Smith Council of Europe, Euan Smith GitHub, Euan McGrath Smith.

Topics: counter-disinformation, foreign information manipulation and interference (FIMI), OSINT, extremist content networks, Digital Services Act, European Democracy Action Plan, EU digital policy, cybersecurity, digital forensics, AI red-teaming, AI agents, Python automation, data analysis.

## Profile
- [Official website (primary source)](${SITE_URL})
- [Full profile](${SITE_URL}/index.md): complete background, projects, certifications, and timeline in plain markdown
- [FAQ](${SITE_URL}/faq.md): detailed answers to common questions about Euan Smith
- [EDMO research](${SITE_URL}/edmo.md): counter-disinformation research work
- [CV](${SITE_URL}${personal.cv}): downloadable CV/resume
- [GitHub](${personal.github})
- [LinkedIn](${personal.linkedin})
- [ORCID](${personal.orcid})
- [Wikidata](${personal.wikidata})
- [EDMO Ireland author page](${personal.edmoAuthor})
- [Gravatar](${personal.gravatar})
- [TryHackMe](${personal.tryhackme})
- [Credly (certifications)](${personal.credly})

## Projects
${projects.map((p) => `- [${p.name}](${SITE_URL}/projects/${p.id}) ([markdown](${SITE_URL}/projects/md/${p.id}.md))${"githubUrl" in p && p.githubUrl ? ` ([code](${p.githubUrl}))` : ""}: ${p.description}`).join("\n")}

## Research
- ${edmo.organisation} — ${edmo.role}, affiliated with ${edmo.affiliation}

## Frequently Asked Questions

${faqBlock}
`
}
