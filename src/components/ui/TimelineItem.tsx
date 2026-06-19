interface TimelineItemProps {
  year: string
  label: string
  description: string
  era: "early" | "mid" | "present"
  side: "left" | "right"
  index: number
}

const eraColor: Record<string, string> = {
  early:   "var(--accent-amber)",
  mid:     "var(--accent-cyan)",
  present: "var(--accent-purple)",
}

export function TimelineItem({ year, label, description, era, side }: TimelineItemProps) {
  const color = eraColor[era]

  return (
    <div className={`relative flex items-center gap-4 lg:gap-0 ${side === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
      {/* Content card — takes half width on desktop */}
      <div className={`flex-1 lg:w-[calc(50%-2rem)] ${side === "right" ? "lg:pl-8" : "lg:pr-8"}`}>
        <div
          className="rounded-xl border border-[color:var(--border)] p-4 lg:p-6 transition-all duration-200 hover:border-[color:var(--border-glow)]"
          style={{ background: "var(--bg-card)" }}
        >
          <span className="font-mono text-sm mb-1 block" style={{ color }}>
            {year}
          </span>
          <h3 className="text-base font-semibold text-zinc-100 mb-1">{label}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Node — centred on desktop */}
      <div className="relative z-10 flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: color,
            border: `2px solid ${color}`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
    </div>
  )
}
