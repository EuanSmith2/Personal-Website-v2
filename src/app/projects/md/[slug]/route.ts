import { generateProjectMarkdown } from "@/lib/markdown-mirror"
import { portfolioConfig } from "@/data/portfolio.config"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return portfolioConfig.projects.map((p) => ({ slug: `${p.id}.md` }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projectId = slug.replace(/\.md$/, "")
  const markdown = generateProjectMarkdown(projectId)

  if (!markdown) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
