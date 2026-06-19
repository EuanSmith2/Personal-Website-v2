"use client"
import { useState } from "react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ExpandableCard } from "@/components/ui/ExpandableCard"
import { portfolioConfig } from "@/data/portfolio.config"

export function CurrentActivity() {
  const { currentActivity } = portfolioConfig
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
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
            {currentActivity.map((item) => (
              <ExpandableCard
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                summary={item.summary}
                detail={item.detail}
                isOpen={openId === item.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
