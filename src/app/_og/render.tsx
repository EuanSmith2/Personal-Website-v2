import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { portfolioConfig } from "@/data/portfolio.config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${portfolioConfig.personal.displayName} — ${portfolioConfig.personal.roles.jobTitle}`

const ogDir = join(process.cwd(), "src/app/_og")
const regular = readFileSync(join(ogDir, "JetBrainsMono-Regular.ttf"))
const bold = readFileSync(join(ogDir, "JetBrainsMono-Bold.ttf"))

export function renderOgImage() {
  const { personal } = portfolioConfig

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px 80px",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", height: 3, width: 120, background: "#22d3ee" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 108, fontWeight: 700, color: "#fafafa", letterSpacing: "-0.03em" }}>
            {personal.displayName}
          </div>
          <div style={{ fontSize: 38, color: "#a1a1aa" }}>{personal.roles.jobTitle}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 26, color: "#22d3ee" }}>euansmith.net</div>
          <div style={{ fontSize: 22, color: "#52525b" }}>Dublin, Ireland</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  )
}
