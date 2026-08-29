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
    jobTitle: personal.roles.jobTitle,
    description:
      "Cybersecurity and digital forensics student at TU Dublin. Counter-disinformation researcher with EDMO Ireland and one of four representing Ireland in the EU-funded ChangingTIDE Changemakers programme.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dublin",
      addressCountry: "IE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Technological University Dublin",
    },
    knowsAbout: [
      "Cybersecurity",
      "Digital Forensics",
      "Ethical Hacking",
      "OSINT",
      "Counter-Disinformation Research",
      "Python",
      "AI/ML Automation",
    ],
    sameAs: [personal.github, personal.linkedin, personal.tryhackme, personal.credly, personal.orcid],
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
