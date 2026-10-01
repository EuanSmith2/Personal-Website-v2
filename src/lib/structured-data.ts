import { portfolioConfig } from "@/data/portfolio.config"
import { SITE_URL } from "./site"

const { personal } = portfolioConfig

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: personal.displayName,
    alternateName: personal.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: [personal.roles.jobTitle, "Counter-Disinformation Researcher"],
    description:
      "Works where cybersecurity meets European politics. A TU Dublin cybersecurity and digital forensics student who builds the data tooling behind EDMO Ireland's counter-disinformation research, and who has been selected into Council of Europe and EU policy programmes on disinformation and foreign interference.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dublin",
      addressCountry: "IE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Technological University Dublin",
    },
    affiliation: {
      "@type": "ResearchOrganization",
      name: "EDMO Ireland (European Digital Media Observatory)",
      parentOrganization: { "@type": "CollegeOrUniversity", name: "Dublin City University" },
    },
    memberOf: {
      "@type": "ProgramMembership",
      programName: "ChangingTIDE Changemakers",
      hostingOrganization: {
        "@type": "Organization",
        name: "Trans European Policy Studies Association",
        alternateName: "TEPSA",
      },
    },
    award:
      "Selected participant, Council of Europe: Youth Facing Disinformation – Why Journalists Matter (Strasbourg, 2026)",
    knowsAbout: [
      "Cybersecurity",
      "Digital Forensics",
      "Ethical Hacking",
      "OSINT",
      "Counter-Disinformation Research",
      "Foreign Information Manipulation and Interference (FIMI)",
      "Digital Services Act",
      "International Relations",
      "European Union Digital Policy",
      "Foreign Interference",
      "Python",
      "AI/ML Automation",
    ],
    sameAs: [
      personal.github,
      personal.linkedin,
      personal.tryhackme,
      personal.credly,
      personal.orcid,
      personal.wikidata,
    ],
  }
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: personal.displayName,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  }
}

export function structuredDataGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), websiteSchema()],
  }
}

type ProjectLike = {
  id: string
  name: string
  description: string
  tags: string[]
  githubUrl?: string
}

export function projectGraph(project: ProjectLike) {
  const url = `${SITE_URL}/projects/${project.id}`
  const isTool = /toolkit|instrument|system|pipeline|tool/i.test(project.description)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isTool ? "SoftwareApplication" : "CreativeWork",
        "@id": `${url}#project`,
        name: project.name,
        description: project.description,
        url,
        keywords: project.tags.join(", "),
        author: { "@id": PERSON_ID },
        ...(isTool ? { applicationCategory: "DeveloperApplication" } : {}),
        ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  }
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}
