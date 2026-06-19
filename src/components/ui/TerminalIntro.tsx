"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface TerminalIntroProps {
  onComplete: () => void
}

type BootLine = {
  text: string
  delay: number
  color: string
  fast: boolean
}

function getOSInfo() {
  const ua = navigator.userAgent
  if (/iPhone/i.test(ua)) return {
    os: "iOS (iPhone)",
    proc: "Apple A17 Pro",
    gpu: "Apple GPU (6-core)",
    mem: "8GB LPDDR5",
    net: "5G / WiFi 6",
  }
  if (/iPad/i.test(ua)) return {
    os: "iPadOS",
    proc: "Apple M2",
    gpu: "Apple GPU (9-core)",
    mem: "16GB Unified Memory",
    net: "WiFi 6 / Cellular",
  }
  if (/Android/i.test(ua)) return {
    os: "Android",
    proc: "Snapdragon 8 Gen 3",
    gpu: "Adreno 750",
    mem: "12GB LPDDR5X",
    net: "5G / WiFi 6E",
  }
  if (/Macintosh|Mac OS X/i.test(ua)) return {
    os: "macOS",
    proc: "Apple M4 Pro",
    gpu: "Apple GPU (20-core)",
    mem: "24GB Unified Memory",
    net: "WiFi 6E @ 1.2Gbps",
  }
  if (/Windows/i.test(ua)) return {
    os: "Windows 11",
    proc: "Intel Core i7-13700K",
    gpu: "NVIDIA GeForce RTX 4070",
    mem: "32GB DDR5-5600",
    net: "Ethernet 2.5Gbps",
  }
  if (/Linux/i.test(ua)) return {
    os: "Linux x86_64",
    proc: "AMD Ryzen 9 7950X",
    gpu: "AMD Radeon RX 7900 XTX",
    mem: "64GB DDR5-6000",
    net: "Ethernet 10Gbps",
  }
  return {
    os: "Unknown OS",
    proc: "Generic CPU @ 2.4GHz",
    gpu: "Integrated Graphics",
    mem: "8GB RAM",
    net: "Ethernet 100Mbps",
  }
}

function generateBootLines(h: ReturnType<typeof getOSInfo>): BootLine[] {
  return [
    { text: "ctOS  v2.6.4    [REMOTE NODE ACCESS]", delay: 22, color: "text-[#00ff41]", fast: false },
    { text: "Initialising encrypted tunnel...", delay: 0, color: "text-zinc-500", fast: true },
    { text: "", delay: 0, color: "", fast: true },
    { text: "[SCAN] Probing inbound connection...", delay: 18, color: "text-zinc-400", fast: false },
    { text: `[SCAN] OS     .............. ${h.os}`, delay: 0, color: "text-zinc-400", fast: true },
    { text: `[SCAN] PROC   .............. ${h.proc}`, delay: 0, color: "text-zinc-400", fast: true },
    { text: `[SCAN] GPU    .............. ${h.gpu}`, delay: 0, color: "text-zinc-400", fast: true },
    { text: `[SCAN] MEM    .............. ${h.mem}`, delay: 0, color: "text-zinc-400", fast: true },
    { text: `[SCAN] NET    .............. ${h.net}`, delay: 0, color: "text-zinc-400", fast: true },
    { text: "", delay: 0, color: "", fast: true },
    { text: "[CTOS] Establishing secure channel...", delay: 18, color: "text-zinc-400", fast: false },
    { text: "[CTOS] Encryption  ......... AES-256-GCM    OK", delay: 0, color: "text-[#00ff41]", fast: true },
    { text: "[CTOS] Identity    ......... masked         OK", delay: 0, color: "text-[#00ff41]", fast: true },
    { text: "", delay: 0, color: "", fast: true },
    { text: "[BREACH] Bypassing firewall...", delay: 18, color: "text-amber-400", fast: false },
    { text: "[BREACH] portfolio.enc  ..... decrypted", delay: 0, color: "text-[#00ff41]", fast: true },
    { text: "[BREACH] assets.bundle  ..... loaded", delay: 0, color: "text-[#00ff41]", fast: true },
    { text: "", delay: 0, color: "", fast: true },
    { text: "[AUTH] > ACCESS GRANTED  ████████████████ 100%", delay: 20, color: "text-[#00ff41]", fast: false },
  ]
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [bootLines, setBootLines] = useState<BootLine[]>([])
  const [renderedLines, setRenderedLines] = useState<string[]>([])
  const dismissed = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) { onComplete(); return }
    if (sessionStorage.getItem("intro_seen")) { onComplete(); return }

    const osInfo = getOSInfo()
    const lines = generateBootLines(osInfo)
    setBootLines(lines)

    const dismiss = () => {
      if (dismissed.current) return
      dismissed.current = true
      sessionStorage.setItem("intro_seen", "true")
      setVisible(false)
      setTimeout(onComplete, 200)
    }

    const skipHandler = () => dismiss()
    window.addEventListener("keydown", skipHandler)
    window.addEventListener("click", skipHandler)

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let cursor = 0

    lines.forEach((line, lineIdx) => {
      if (line.text === "") {
        timeouts.push(setTimeout(() => {
          if (!cancelled) setRenderedLines(prev => [...prev, ""])
        }, cursor))
        cursor += 50
        return
      }

      if (line.fast) {
        timeouts.push(setTimeout(() => {
          if (!cancelled) setRenderedLines(prev => [...prev, line.text])
        }, cursor))
        cursor += 100
        return
      }

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

    timeouts.push(setTimeout(() => { if (!cancelled) dismiss() }, cursor + 400))

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
          style={{ background: "#000" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="relative w-full max-w-2xl font-mono text-xs sm:text-sm"
            style={{
              background: "#080808",
              border: "1px solid rgba(0,255,65,0.22)",
              boxShadow: "0 0 40px rgba(0,255,65,0.08), 0 0 80px rgba(0,255,65,0.04)",
            }}
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              aria-hidden
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
              }}
            />

            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ borderColor: "rgba(0,255,65,0.18)", background: "#0c0c0c" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#00ff41] font-bold tracking-[0.25em] text-xs">ctOS</span>
                <span className="text-zinc-700 text-xs">─</span>
                <span className="text-zinc-500 text-xs tracking-wider">REMOTE NODE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                <span className="text-[#00ff41] text-xs tracking-widest">SECURE</span>
              </div>
            </div>

            {/* Boot output */}
            <div className="p-5 space-y-0.5 min-h-[300px]">
              {bootLines.map((line, i) => {
                const rendered = renderedLines[i]
                if (rendered === undefined) return null
                if (rendered === "") return <div key={i} className="h-3" />
                return (
                  <p key={i} className={line.color || "text-zinc-400"}>
                    {rendered}
                    {i === renderedLines.length - 1 && rendered !== line.text && (
                      <span className="animate-pulse text-[#00ff41]">█</span>
                    )}
                  </p>
                )
              })}
            </div>

            {/* Footer */}
            <div
              className="px-5 py-2 border-t text-zinc-600 text-xs"
              style={{ borderColor: "rgba(0,255,65,0.12)" }}
            >
              ↵ any key — abort sequence
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
