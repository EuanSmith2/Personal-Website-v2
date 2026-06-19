import { Trophy, Users, BookOpen, GraduationCap } from "lucide-react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"
import type { LucideIcon } from "lucide-react"

const INTEREST_ICONS: Record<string, LucideIcon> = {
  "Chess Club":        Trophy,
  "Student Council":   Users,
  "Teacher Assistant": BookOpen,
  "Academic Awards":   GraduationCap,
}

// Mini book-spine placeholder: coloured strip with abbreviated title
const BOOK_SPINE_COLORS = ["#1d4ed8", "#7c3aed", "#0f766e", "#b45309"]

function BookCover({ title, index }: { title: string; index: number }) {
  const color = BOOK_SPINE_COLORS[index % BOOK_SPINE_COLORS.length]
  const abbr = title.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()
  return (
    <div
      className="flex-shrink-0 w-9 h-12 rounded-sm flex items-center justify-center shadow-md"
      style={{ background: `linear-gradient(160deg, ${color}ee, ${color}99)`, border: `1px solid ${color}60` }}
      aria-hidden="true"
    >
      <span className="text-white font-bold text-xs font-mono">{abbr}</span>
    </div>
  )
}

export function Personal() {
  const { lifestyle } = portfolioConfig

  return (
    <section
      id="personal"
      aria-label="Personal"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">{"// personal"}</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">Outside the terminal</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Interests */}
            <div>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Interests</h3>
              <ul className="space-y-4">
                {lifestyle.interests.map((item) => {
                  const Icon = INTEREST_ICONS[item.label]
                  return (
                    <li key={item.label} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                      >
                        {Icon
                          ? <Icon size={18} className="text-cyan-400" />
                          : <span className="text-cyan-400 text-sm font-bold">{item.label[0]}</span>
                        }
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{item.label}</p>
                        <p className="text-sm text-zinc-500">{item.detail}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Currently reading */}
            <div>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Currently reading</h3>
              <ul className="space-y-4">
                {lifestyle.reading.map((book, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <BookCover title={book.title} index={i} />
                    <div>
                      <p className="font-medium text-zinc-200 text-sm leading-snug">{book.title}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{book.author}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
