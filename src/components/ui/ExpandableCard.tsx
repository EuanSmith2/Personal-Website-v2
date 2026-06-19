"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ExpandableCardProps {
  id: string
  icon: string
  title: string
  summary: string
  detail: string
  isOpen: boolean
  onToggle: (id: string) => void
}

export function ExpandableCard({ id, icon, title, summary, detail, isOpen, onToggle }: ExpandableCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`rounded-xl border p-6 transition-all duration-200 cursor-pointer ${
        isOpen
          ? "border-[color:var(--border-glow)] shadow-[0_0_20px_rgba(34,211,238,0.08)]"
          : "border-[color:var(--border)] hover:border-[color:var(--border-glow)] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
      }`}
      style={{ background: "var(--bg-card)" }}
      onClick={() => onToggle(id)}
    >
      <button
        className="w-full text-left flex items-start gap-3"
        aria-expanded={isOpen}
        aria-controls={`card-detail-${id}`}
      >
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
            <ChevronDown
              size={16}
              className={`text-zinc-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
          <p className="text-sm text-zinc-400 mt-1">{summary}</p>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`card-detail-${id}`}
            initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-300 mt-4 pt-4 border-t border-zinc-800 leading-relaxed">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
