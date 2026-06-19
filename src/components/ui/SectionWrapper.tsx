"use client"
import { useRef } from "react"
import { motion, type Variants, useInView, useReducedMotion } from "framer-motion"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}

export function SectionWrapper({ children, className = "", delay = 0 }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })
  const prefersReducedMotion = useReducedMotion()

  const motionVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EXPO_OUT, delay },
    },
  }

  const variants = prefersReducedMotion ? reducedVariants : motionVariants

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}
