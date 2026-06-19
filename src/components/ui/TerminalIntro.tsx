"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface TerminalIntroProps {
  onComplete: () => void
}

const BOOT_LINES = [
  { text: "EUAN SMITH OS  v2.4.1  [build 2025.06]", delay: 0, color: "text-cyan-400", fast: false },
  { text: "Copyright (c) Euan Smith. All rights reserved.", delay: 60, color: "text-zinc-500", fast: true },
  { text: "", delay: 0, color: "", fast: true },
  { text: "[BIOS] Performing POST...", delay: 40, color: "text-zinc-400", fast: false },
  { text: "[BIOS] CPU   .............. Cortex i9 @ 3.2GHz        OK", delay: 20, color: "text-zinc-400", fast: true },
  { text: "[BIOS] MEM   .............. 64GB DDR5 Coffee Reserve   OK", delay: 20, color: "text-zinc-400", fast: true },
  { text: "[BIOS] NET   .............. Ethernet 1Gbps ONLINE      OK", delay: 20, color: "text-zinc-400", fast: true },
  { text: "[BIOS] DISK  .............. NVMe 2TB Projects          OK", delay: 20, color: "text-zinc-400", fast: true },
  { text: "", delay: 0, color: "", fast: true },
  { text: "[BOOT] Loading kernel modules...", delay: 30, color: "text-zinc-400", fast: false },
  { text: "[BOOT] cybersecurity.mod    ........ loaded", delay: 15, color: "text-emerald-400", fast: true },
  { text: "[BOOT] python3.mod          ........ loaded", delay: 15, color: "text-emerald-400", fast: true },
  { text: "[BOOT] portfolio.exe        ........ loading", delay: 15, color: "text-amber-400", fast: false },
  { text: "", delay: 0, color: "", fast: true },
  { text: "[AUTH] Verifying credentials...", delay: 30, color: "text-zinc-400", fast: false },
  { text: "[AUTH] > access granted  ████████ 100%", delay: 0, color: "text-cyan-400", fast: false, isAccess: true },
]

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [renderedLines, setRenderedLines] = useState<string[]>([])
  const dismissed = useRef(false)

  const dismiss = () => {
    if (dismissed.current) return
    dismissed.current = true
    sessionStorage.setItem("intro_seen", "true")
    setVisible(false)
    setTimeout(onComplete, 200)
  }

  useEffect(() => {
    if (prefersReducedMotion) { onComplete(); return }
    if (sessionStorage.getItem("intro_seen")) { onComplete(); return }

    const skipHandler = () => dismiss()
    window.addEventListener("keydown", skipHandler)
    window.addEventListener("click", skipHandler)

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let cursor = 0

    BOOT_LINES.forEach((line, lineIdx) => {
      if (line.text === "") {
        // Empty line — just append immediately
        timeouts.push(setTimeout(() => {
          if (!cancelled) setRenderedLines(prev => [...prev, ""])
        }, cursor))
        cursor += 50
        return
      }

      if (line.fast) {
        // Appear all at once
        timeouts.push(setTimeout(() => {
          if (!cancelled) setRenderedLines(prev => [...prev, line.text])
        }, cursor))
        cursor += 100
        return
      }

      // Type character by character
      const chars = line.text.split("")
      chars.forEach((_, charIdx) => {
        timeouts.push(setTimeout(() => {
          if (!cancelled) {
            const partial = line.text.slice(0, charIdx + 1)
            setRenderedLines(prev => {
              const next = [...prev]
              next[lineIdx] = partial
              return next
            })
          }
        }, cursor + charIdx * line.delay))
      })
      cursor += chars.length * line.delay + 120
    })

    // Dismiss after everything
    timeouts.push(setTimeout(() => { if (!cancelled) dismiss() }, cursor + 300))

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
      window.removeEventListener("keydown", skipHandler)
      window.removeEventListener("click", skipHandler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "var(--bg-base)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono text-xs sm:text-sm w-full max-w-lg shadow-2xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-zinc-600 text-xs">boot — 80×24</span>
            </div>
            <div className="space-y-0.5 min-h-[240px]">
              {BOOT_LINES.map((line, i) => {
                const rendered = renderedLines[i]
                if (rendered === undefined) return null
                if (rendered === "") return <div key={i} className="h-3" />
                return (
                  <p key={i} className={line.color || "text-zinc-300"}>
                    {rendered}
                    {i === renderedLines.length - 1 && rendered !== line.text && (
                      <span className="animate-pulse text-cyan-400">█</span>
                    )}
                  </p>
                )
              })}
            </div>
            <p className="text-zinc-600 text-xs mt-4">Press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
