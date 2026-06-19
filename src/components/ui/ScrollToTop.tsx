"use client"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const threshold = document.body.scrollHeight * 0.5
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`group fixed bottom-6 left-6 z-50 min-w-[44px] min-h-[44px] w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 hover:border-cyan-400/50 hover:bg-zinc-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp size={16} className="text-zinc-400 group-hover:text-cyan-400 transition-colors duration-200" />
    </button>
  )
}
