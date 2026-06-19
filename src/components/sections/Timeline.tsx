"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

const ERA_COLOR: Record<string, string> = {
  early:   "var(--accent-amber)",
  mid:     "var(--accent-cyan)",
  present: "var(--accent-purple)",
}

// Serpentine S-curve — 6 events alternating left/right
// Coordinates in a 100×100 viewBox, scaled via preserveAspectRatio="none"
// x: left events at 22, right events at 78
// y: evenly spaced from ~8 to ~92

const LEFT_X  = 22
const RIGHT_X = 78

function dotX(i: number) { return i % 2 === 0 ? LEFT_X : RIGHT_X }
function dotY(i: number, total: number) { return 8 + (i / (total - 1)) * 84 }

function buildSPath(total: number) {
  const pts = Array.from({ length: total }, (_, i) => ({
    x: dotX(i),
    y: dotY(i, total),
  }))

  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const midY = (prev.y + curr.y) / 2
    // Cubic bezier: each control point pulls from the same x as its node
    d += ` C ${prev.x} ${midY} ${curr.x} ${midY} ${curr.x} ${curr.y}`
  }
  return d
}

export function Timeline() {
  const { timeline } = portfolioConfig
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const sPath = buildSPath(timeline.length)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap, registerGSAP } = await import("@/lib/gsap")
      registerGSAP()
      if (!pathRef.current || !sectionRef.current) return

      const length = pathRef.current.getTotalLength()

      ctx = gsap.context(() => {
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.2,
          },
        })
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  const ROW_H = 180 // px per event
  const containerH = timeline.length * ROW_H

  return (
    <section
      id="timeline"
      aria-label="Timeline"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// timeline"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-16">The journey so far</h2>
        </SectionWrapper>

        {/* Desktop S-curve — hidden on mobile */}
        <div className="hidden lg:block relative" style={{ height: containerH }}>

          {/* SVG S-curve path */}
          <svg
            className="absolute inset-0 w-full pointer-events-none"
            style={{ height: containerH }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sCurveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="var(--accent-amber)" />
                <stop offset="50%"  stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-purple)" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d={sPath}
              fill="none"
              stroke="url(#sCurveGrad)"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 2 }}
            />
          </svg>

          {/* "Beginnings" label */}
          <div
            className="absolute text-xs font-mono text-zinc-600 uppercase tracking-widest"
            style={{ left: "22%", top: -20, transform: "translateX(-50%)" }}
          >
            ↓ Beginnings
          </div>

          {/* "Present" label */}
          <div
            className="absolute text-xs font-mono text-purple-400 uppercase tracking-widest"
            style={{
              left: `${timeline.length % 2 === 0 ? RIGHT_X : LEFT_X}%`,
              bottom: -20,
              transform: "translateX(-50%)",
            }}
          >
            Present ↑
          </div>

          {/* Event cards + dot markers absolutely positioned */}
          {timeline.map((entry, i) => {
            const isLeft = i % 2 === 0
            const topPx = dotY(i, timeline.length) / 100 * containerH
            const color = ERA_COLOR[entry.era]

            return (
              <motion.div
                key={entry.year}
                className="absolute"
                style={{
                  top: topPx - 56,
                  left: isLeft ? 0 : "52%",
                  right: isLeft ? "52%" : 0,
                }}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                <div
                  className="rounded-xl border border-[color:var(--border)] p-4 transition-all duration-200 hover:border-[color:var(--border-glow)] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                  style={{ background: "var(--bg-card)" }}
                >
                  <span className="font-mono text-sm font-bold mb-1 block" style={{ color }}>
                    {entry.year}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1">{entry.label}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{entry.description}</p>
                </div>

                {/* Dot — positioned at the S-curve point */}
                <div
                  className="absolute w-3 h-3 rounded-full z-10"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                    top: "50%",
                    [isLeft ? "right" : "left"]: "-6%",
                    transform: "translateY(-50%)",
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Mobile fallback — simple vertical list */}
        <div className="lg:hidden space-y-6 border-l-2 border-zinc-800 pl-6 ml-3">
          {timeline.map((entry, i) => {
            const color = ERA_COLOR[entry.era]
            return (
              <SectionWrapper key={entry.year} delay={i * 0.05}>
                <div className="relative">
                  <div
                    className="absolute -left-[31px] top-4 w-3 h-3 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <div
                    className="rounded-xl border border-[color:var(--border)] p-4"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <span className="font-mono text-sm font-bold mb-1 block" style={{ color }}>
                      {entry.year}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-100 mb-1">{entry.label}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{entry.description}</p>
                  </div>
                </div>
              </SectionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
