import { generateFaqMarkdown } from "@/lib/markdown-mirror"

export function GET() {
  return new Response(generateFaqMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
