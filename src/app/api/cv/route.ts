import { renderToBuffer } from "@react-pdf/renderer"
import { createElement } from "react"
import { CVDocument } from "@/components/cv/CVDocument"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  const buffer = await renderToBuffer(createElement(CVDocument))

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="euan-smith-cv.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  })
}
