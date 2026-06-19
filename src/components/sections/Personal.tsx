import { Trophy, Users, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"
import type { LucideIcon } from "lucide-react"

const INTEREST_ICONS: Record<string, LucideIcon> = {
  "Chess Club":        Trophy,
  "Student Council":   Users,
  "Teacher Assistant": BookOpen,
  "Academic Awards":   GraduationCap,
}

function BookCoverImg({ src, title }: { src: string; title: string }) {
  return (
    <div className="flex-shrink-0 w-10 h-[3.5rem] rounded-sm overflow-hidden shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`Cover of ${title}`} className="w-full h-full object-cover" />
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
                    <BookCoverImg src={book.cover} title={book.title} />
                    <div>
                      <p className="font-medium text-zinc-200 text-sm leading-snug">{book.title}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{book.author}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Finished reading */}
          <div className="mt-14">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Finished reading</h3>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
            <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-none">
              {lifestyle.finishedReading.map((book, i) => (
                <div key={i} className="flex-shrink-0 w-[72px] text-center group">
                  <div className="w-[72px] h-24 rounded-sm overflow-hidden shadow-md mb-2 transition-transform duration-200 group-hover:-translate-y-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.cover} alt={`Cover of ${book.title}`} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-tight line-clamp-2">{book.title}</p>
                  {book.author && <p className="text-[10px] text-zinc-600 mt-0.5 leading-tight">{book.author}</p>}
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
