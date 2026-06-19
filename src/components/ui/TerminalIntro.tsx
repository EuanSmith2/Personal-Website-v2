"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface TerminalIntroProps {
  onComplete: () => void
}

const LINE1 = "initialising portfolio..."
const LINE2 = "loading euan_smith.exe"
const BLOCK_COUNT = 8

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [line1, setLine1] = useState("")
  const [line2, setLine2] = useState("")
  const [blocks, setBlocks] = useState(0)
  const [showPercent, setShowPercent] = useState(false)
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

    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn() }, ms)
      timeouts.push(t)
    }

    // Type line 1
    let t = 0
    for (let i = 0; i <= LINE1.length; i++) {
      const idx = i
      schedule(() => setLine1(LINE1.slice(0, idx)), t)
      t += 40
    }

    // Type line 2
    for (let i = 0; i <= LINE2.length; i++) {
      const idx = i
      schedule(() => setLine2(LINE2.slice(0, idx)), t)
      t += 40
    }

    // Fill block chars over 400ms
    for (let b = 1; b <= BLOCK_COUNT; b++) {
      const count = b
      schedule(() => setBlocks(count), t + (400 / BLOCK_COUNT) * b)
    }
    schedule(() => setShowPercent(true), t + 400 + 50)
    schedule(() => dismiss(), t + 400 + 200)

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
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "var(--bg-base)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono text-sm max-w-sm w-full mx-4">
            <div className="space-y-1">
              <p>
                <span className="text-cyan-400">&gt; </span>
                <span className="text-zinc-300">{line1}</span>
              </p>
              {line2 && (
                <p>
                  <span className="text-cyan-400">&gt; </span>
                  <span className="text-zinc-300">{line2}</span>
                </p>
              )}
              {blocks > 0 && (
                <p>
                  <span className="text-cyan-400">&gt; access granted </span>
                  <span className="text-cyan-400">{"█".repeat(blocks)}</span>
                  {showPercent && <span className="text-zinc-300"> 100%</span>}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
