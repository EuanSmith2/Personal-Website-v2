import { generateLlmsFullTxt } from "@/lib/markdown-mirror"

export function GET() {
  return new Response(generateLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
