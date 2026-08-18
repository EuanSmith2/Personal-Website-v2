import { generatePortfolioMarkdown } from "@/lib/markdown-mirror"

export function GET() {
  return new Response(generatePortfolioMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
