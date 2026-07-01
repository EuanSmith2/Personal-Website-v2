"use client"
import { useState } from "react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ExpandableCard } from "@/components/ui/ExpandableCard"
import { portfolioConfig } from "@/data/portfolio.config"

export function CurrentActivity() {
  const { currentActivity } = portfolioConfig
  const items = currentActivity
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section
      id="activity"
      aria-label="Current Activity"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// current activity"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">What I&apos;m working on</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <ExpandableCard
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                summary={item.summary}
                detail={item.detail}
                isOpen={openIds.has(item.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
