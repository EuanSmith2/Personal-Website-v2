import type { MetadataRoute } from "next"
import { portfolioConfig } from "@/data/portfolio.config"

export default function manifest(): MetadataRoute.Manifest {
  const { personal } = portfolioConfig
  return {
    name: `${personal.displayName} — Portfolio`,
    short_name: personal.displayName,
    description: personal.roles.metaDescription,
    start_url: "/",
    display: "browser",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon.png", type: "image/png", sizes: "512x512" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
