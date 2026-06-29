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

type SysInfo = {
  os: string
  cores: string
  mem: string
  res: string
  tz: string
  net: string
}

type ExtNavigator = Navigator & {
  deviceMemory?: number
  connection?: { effectiveType?: string; type?: string }
}

function estimateMemory(cores: number, os: string): string {
  if (os === "iOS")     return "8GB (est.)"
  if (os === "iPadOS")  return cores >= 8 ? "16GB (est.)" : "8GB (est.)"
  if (os === "Android") return cores >= 8 ? "12GB (est.)" : "6GB (est.)"
  if (os === "macOS") {
    if (cores >= 12) return "36GB+ (est.)"
    if (cores >= 10) return "16GB (est.)"
    return "8GB (est.)"
  }
  if (os === "Windows") {
    if (cores >= 16) return "32GB (est.)"
    if (cores >= 8)  return "16GB (est.)"
    if (cores >= 4)  return "8GB (est.)"
    return "4GB (est.)"
  }
  if (os === "Linux") {
    if (cores >= 16) return "≥32GB (est.)"
    if (cores >= 8)  return "16GB (est.)"
    return "8GB (est.)"
  }
  return `${cores * 2}GB (est.)`
}

async function getSysInfo(): Promise<SysInfo> {
  const ua  = navigator.userAgent
  const nav = navigator as ExtNavigator

  let os = "Unknown OS"
  if (/iPhone/i.test(ua))                   os = "iOS"
  else if (/iPad/i.test(ua))                os = "iPadOS"
  else if (/Android/i.test(ua))             os = "Android"
  else if (/Macintosh|Mac OS X/i.test(ua))  os = "macOS"
  else if (/Windows/i.test(ua))             os = "Windows"
  else if (/Linux/i.test(ua))               os = "Linux"

  const coreCount = navigator.hardwareConcurrency || 2
  const cores     = `${coreCount}-core`

  const mem = nav.deviceMemory
    ? `${nav.deviceMemory}GB`
    : estimateMemory(coreCount, os)

  const res = `${screen.width}×${screen.height}  @${window.devicePixelRatio || 1}x`

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Network: Chrome exposes navigator.connection; elsewhere time a tiny fetch
  let net: string
  const connType = nav.connection?.effectiveType ?? nav.connection?.type
  if (connType) {
    const labels: Record<string, string> = {
      "slow-2g": "2G (slow)", "2g": "2G", "3g": "3G",
      "4g": "4G / broadband", "wifi": "WiFi",
      "ethernet": "ethernet", "cellular": "cellular",
    }
    net = labels[connType] ?? connType
  } else if (!navigator.onLine) {
    net = "offline"
  } else {
    try {
      const controller = new AbortController()
      const tid = setTimeout(() => controller.abort(), 2500)
      const t0  = performance.now()
      await fetch(`/favicon.ico?_=${Date.now()}`, {
        cache: "no-store",
        signal: controller.signal,
      })
      clearTimeout(tid)
      const ms = Math.round(performance.now() - t0)
      if (ms < 60)       net = `fibre / LAN  (${ms}ms)`
      else if (ms < 200) net = `broadband  (${ms}ms)`
      else if (ms < 500) net = `4G / cable  (${ms}ms)`
      else               net = `slow connection  (${ms}ms)`
    } catch {
      net = "online"
    }
  }

  return { os, cores, mem, res, tz, net }
}

function generateBootLines(h: SysInfo): BootLine[] {
  return [
    { text: "ctOS  v2.6.4    [REMOTE NODE ACCESS]",           delay: 22, color: "text-[#00ff41]", fast: false },
    { text: "Initialising encrypted tunnel...",                delay: 0,  color: "text-zinc-500",  fast: true  },
    { text: "",                                                delay: 0,  color: "",               fast: true  },
    { text: "[SCAN] Probing inbound connection...",            delay: 18, color: "text-zinc-400",  fast: false },
    { text: `[SCAN] OS     .............. ${h.os}`,            delay: 0,  color: "text-zinc-400",  fast: true  },
    { text: `[SCAN] CPU    .............. ${h.cores}`,         delay: 0,  color: "text-zinc-400",  fast: true  },
    { text: `[SCAN] MEM    .............. ${h.mem}`,           delay: 0,  color: "text-zinc-400",  fast: true  },
    { text: `[SCAN] DISP   .............. ${h.res}`,           delay: 0,  color: "text-zinc-400",  fast: true  },
    { text: `[SCAN] TZ     .............. ${h.tz}`,            delay: 0,  color: "text-zinc-400",  fast: true  },
    { text: `[SCAN] NET    .............. ${h.net}`,           delay: 0,  color: "text-zinc-400",  fast: true  },
    { text: "",                                                delay: 0,  color: "",               fast: true  },
    { text: "[CTOS] Establishing secure channel...",           delay: 18, color: "text-zinc-400",  fast: false },
    { text: "[CTOS] Encryption  ......... AES-256-GCM    OK",  delay: 0,  color: "text-[#00ff41]", fast: true  },
    { text: "[CTOS] Identity    ......... masked         OK",  delay: 0,  color: "text-[#00ff41]", fast: true  },
    { text: "",                                                delay: 0,  color: "",               fast: true  },
    { text: "[BREACH] Bypassing firewall...",                  delay: 18, color: "text-amber-400", fast: false },
    { text: "[BREACH] portfolio.enc  ..... decrypted",         delay: 0,  color: "text-[#00ff41]", fast: true  },
    { text: "[BREACH] assets.bundle  ..... loaded",            delay: 0,  color: "text-[#00ff41]", fast: true  },
    { text: "",                                                delay: 0,  color: "",               fast: true  },
    { text: "[AUTH] > ACCESS GRANTED  ████████████████ 100%",  delay: 20, color: "text-[#00ff41]", fast: false },
  ]
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible]             = useState(false)
  const [bootLines, setBootLines]         = useState<BootLine[]>([])
  const [renderedLines, setRenderedLines] = useState<string[]>([])
  const dismissed = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) { onComplete(); return }
    if (sessionStorage.getItem("intro_seen")) { onComplete(); return }
    setVisible(true)

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const cleanup = { fn: () => {} }

    const run = async () => {
      const osInfo = await getSysInfo()
      if (cancelled) return

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
      cleanup.fn = () => {
        window.removeEventListener("keydown", skipHandler)
        window.removeEventListener("click", skipHandler)
      }

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
    }

    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
      cleanup.fn()
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
