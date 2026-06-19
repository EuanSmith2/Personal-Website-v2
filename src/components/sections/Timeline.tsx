"use client"
import { useEffect, useRef } from "react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { TimelineItem } from "@/components/ui/TimelineItem"
import { portfolioConfig } from "@/data/portfolio.config"

export function Timeline() {
  const { timeline } = portfolioConfig
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap, registerGSAP } = await import("@/lib/gsap")
      registerGSAP()

      if (!lineRef.current || !sectionRef.current) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        )
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="timeline"
      aria-label="Timeline"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// timeline"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-16">The journey so far</h2>
        </SectionWrapper>

        <div className="relative">
          {/* Vertical line — left on mobile, centred on desktop */}
          <div className="absolute left-3 lg:left-1/2 lg:-translate-x-px top-0 bottom-0">
            <div
              ref={lineRef}
              className="w-0.5 h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, var(--accent-amber), var(--accent-cyan), var(--accent-purple))",
              }}
            />
          </div>

          <div className="pl-12 lg:pl-0 space-y-12 lg:space-y-16">
            {timeline.map((entry, i) => (
              <SectionWrapper key={entry.year} delay={i * 0.05}>
                <TimelineItem
                  year={entry.year}
                  label={entry.label}
                  description={entry.description}
                  era={entry.era}
                  side={i % 2 === 0 ? "left" : "right"}
                  index={i}
                />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
