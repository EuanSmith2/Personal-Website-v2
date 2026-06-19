"use client"
import { useEffect, useRef, useState } from "react"
import { motion, type Variants, useReducedMotion } from "framer-motion"
import Image from "next/image"
import TextScramble, { type TextScrambleHandle } from "@/components/ui/TextScramble"
import { RotatingTitle } from "@/components/ui/RotatingTitle"
import { DotGridBackground } from "@/components/ui/DotGridBackground"
import { TerminalIntro } from "@/components/ui/TerminalIntro"
import { portfolioConfig } from "@/data/portfolio.config"

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariantsMotion: Variants = {
  hidden: { opacity: 0, y: 30 },
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
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <DotGridBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <motion.div
            className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            animate={heroVisible ? "visible" : "hidden"}
          >
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Name */}
              <motion.div variants={itemVariants} className="mb-2">
                <div className="text-4xl lg:text-6xl font-bold tracking-tight" aria-label={personal.name}>
                  <TextScramble
                    ref={scrambleRef}
                    text={personal.name}
                    autoStart={false}
                    scrambleOnHover
                    speed={80}
                  />
                </div>
              </motion.div>

              {/* Rotating title */}
              <motion.div variants={itemVariants}>
                <RotatingTitle titles={rotatingTitles} />
              </motion.div>

              {/* Institution */}
              <motion.p variants={itemVariants} className="text-sm text-zinc-500 font-mono mt-1 mb-4">
                {personal.title}
              </motion.p>

              {/* Tagline */}
              <motion.p variants={itemVariants} className="text-xl text-zinc-300 max-w-xl mt-4 mb-8">
                {personal.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={personal.cv}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-zinc-950 font-semibold text-sm hover:bg-cyan-300 transition-colors duration-200"
                >
                  View CV
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 font-semibold text-sm hover:bg-cyan-400/10 transition-colors duration-200"
                >
                  Contact
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Avatar */}
            <motion.div variants={itemVariants} className="flex-shrink-0">
              <div className="relative w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/30 bg-zinc-800 flex items-center justify-center">
                  {!imgError ? (
                    <Image
                      src={personal.avatar}
                      alt={personal.displayName}
                      width={180}
                      height={180}
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <span className="text-2xl font-mono text-cyan-400 select-none">ES</span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-xl -z-10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
