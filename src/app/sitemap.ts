import type { MetadataRoute } from "next"
import { execSync } from "node:child_process"
import { portfolioConfig } from "@/data/portfolio.config"
import { SITE_URL } from "@/lib/site"

function lastMod(...files: string[]): Date {
  const dates = files
    .map((file) => {
      try {
        const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        }).trim()
        return iso ? new Date(iso) : null
      } catch {
        return null
      }
    })
    .filter((d): d is Date => d !== null && !Number.isNaN(d.getTime()))

  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : new Date()
}

const CONFIG = "src/data/portfolio.config.ts"
const MIRROR = "src/lib/markdown-mirror.ts"
const CV = "src/app/cv/page.tsx"

export default function sitemap(): MetadataRoute.Sitemap {
  const contentMod = lastMod(CONFIG, MIRROR)

  const projectUrls: MetadataRoute.Sitemap = portfolioConfig.projects.flatMap((p) => [
    {
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: contentMod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/projects/md/${p.id}.md`,
      lastModified: contentMod,
      changeFrequency: "monthly" as const,
    },
  ])

  return [
    { url: SITE_URL, lastModified: contentMod, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cv`, lastModified: lastMod(CV), changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: contentMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: lastMod("src/app/privacy/page.tsx"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/llms.txt`, lastModified: lastMod(MIRROR), changeFrequency: "monthly" },
    { url: `${SITE_URL}/index.md`, lastModified: contentMod, changeFrequency: "monthly" },
    { url: `${SITE_URL}/faq.md`, lastModified: contentMod, changeFrequency: "monthly" },
    { url: `${SITE_URL}/edmo.md`, lastModified: contentMod, changeFrequency: "monthly" },
    ...projectUrls,
  ]
}
