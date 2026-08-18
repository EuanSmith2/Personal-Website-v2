import { generateEdmoMarkdown } from "@/lib/markdown-mirror"

export function GET() {
  return new Response(generateEdmoMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
