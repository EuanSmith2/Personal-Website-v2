"use client"
import { useEffect, useState } from "react"
import { AwardBadge } from "@/components/ui/AwardBadge"
import { portfolioConfig } from "@/data/portfolio.config"

export function FloatingAchievement() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("badge_dismissed") === "true") {
      setDismissed(true)
      return
    }
    const onScroll = () => {
      const threshold = document.body.scrollHeight * 0.15
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    sessionStorage.setItem("badge_dismissed", "true")
    setDismissed(true)
  }

  if (dismissed) return null

  const { floatingBadge } = portfolioConfig

  return (
    <div
      className={`fixed z-50 transition-all duration-200 sm:scale-100 scale-[0.8] origin-bottom ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{
        bottom: "1.5rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "1rem"})`,
      }}
    >
      <div className="group relative">
        <AwardBadge
          type="portfolio"
          customTitle={floatingBadge.title}
          customSubtitle={floatingBadge.subtitle}
          link={floatingBadge.link}
        />
        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {floatingBadge.tooltip}
        </span>
        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss availability badge"
          className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-full text-xs hover:text-zinc-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  )
}
