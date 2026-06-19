"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

interface Title {
  text: string
  funny: boolean
}

interface RotatingTitleProps {
  titles: Title[]
}

export function RotatingTitle({ titles }: RotatingTitleProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!titles.length) return
    const current = titles[index]
    const delay = Math.max(2800, current.text.length * 120)

    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % titles.length)
    }, delay)

    return () => clearTimeout(timer)
  }, [index, titles])

  const current = titles[index]
  if (!current) return null

  return (
    <div
      className="min-h-[1.5rem] flex items-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current.text}
          className={`font-mono tracking-widest text-base lg:text-lg ${
            current.funny ? "text-cyan-400" : "text-zinc-400"
          }`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {current.text}
          <span className="text-cyan-400 animate-pulse ml-0.5">|</span>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
