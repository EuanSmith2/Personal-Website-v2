import type { MetadataRoute } from "next"
import { portfolioConfig } from "@/data/portfolio.config"

const SITE_URL = "https://euansmith.net"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const projectUrls: MetadataRoute.Sitemap = portfolioConfig.projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.id}.md`,
    lastModified: now,
  }))

  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/cv`, lastModified: now },
    { url: `${SITE_URL}/llms.txt`, lastModified: now },
    { url: `${SITE_URL}/index.md`, lastModified: now },
    { url: `${SITE_URL}/faq.md`, lastModified: now },
    { url: `${SITE_URL}/edmo.md`, lastModified: now },
    ...projectUrls,
  ]
}
