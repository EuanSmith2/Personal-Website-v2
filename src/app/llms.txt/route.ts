import { generateLlmsTxt } from "@/lib/markdown-mirror"

export function GET() {
  return new Response(generateLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
