import { generateProjectMarkdown } from "@/lib/markdown-mirror"

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
