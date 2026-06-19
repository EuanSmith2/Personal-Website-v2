"use client"
import { useEffect, useRef, useState } from "react"
import { motion, type Variants, useReducedMotion } from "framer-motion"
import Image from "next/image"
import TextScramble, { type TextScrambleHandle } from "@/components/ui/TextScramble"
import { RotatingTitle } from "@/components/ui/RotatingTitle"
import { DotGridBackground } from "@/components/ui/DotGridBackground"
import { TerminalIntro } from "@/components/ui/TerminalIntro"
import { portfolioConfig } from "@/data/portfolio.config"

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariantsMotion: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const itemVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

export function Hero() {
  const { personal, rotatingTitles } = portfolioConfig
  const scrambleRef = useRef<TextScrambleHandle>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [imgError, setImgError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleIntroComplete = () => setHeroVisible(true)

  useEffect(() => {
    if (!heroVisible) return
    const t = setTimeout(() => scrambleRef.current?.start(), 600)
    return () => clearTimeout(t)
  }, [heroVisible])

  const itemVariants = prefersReducedMotion ? itemVariantsReduced : itemVariantsMotion

  return (
    <>
      <TerminalIntro onComplete={handleIntroComplete} />

      <section
        id="hero"
        aria-label="Introduction"
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <DotGridBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={heroVisible ? "visible" : "hidden"}
          >
            {/* Top row: avatar + name */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 lg:gap-7">
              {/* Avatar — small, left-aligned */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-cyan-400/40 bg-zinc-800 flex items-center justify-center">
                  {!imgError ? (
                    <Image
                      src={personal.avatar}
                      alt={personal.displayName}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <span className="text-sm font-mono text-cyan-400 select-none font-bold">ES</span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-cyan-400/8 blur-lg -z-10" />
              </div>

              {/* Name */}
              <div>
                <div
                  className="font-bold tracking-tight leading-none"
                  style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
                  aria-label={personal.name}
                >
                  <TextScramble
                    ref={scrambleRef}
                    text={personal.name}
                    autoStart={false}
                    scrambleOnHover
                    speed={80}
                  />
                </div>
              </div>
            </motion.div>

            {/* Rotating title + institution */}
            <motion.div variants={itemVariants} className="-mt-4">
              <RotatingTitle titles={rotatingTitles} />
              <div className="flex items-center gap-2 mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/tud-icon.jpg" alt="TUD" className="w-5 h-5 rounded object-cover opacity-70 flex-shrink-0" />
                <p className="text-sm text-zinc-500 font-mono">{personal.title}</p>
              </div>
            </motion.div>

            {/* Tagline + inline View CV */}
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              {personal.tagline}{" "}
              <a
                href={personal.cv}
                className="italic text-zinc-400 underline underline-offset-4 decoration-zinc-600 hover:text-cyan-400 hover:decoration-cyan-400 transition-colors duration-200"
              >
                View CV
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
