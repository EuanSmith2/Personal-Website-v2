"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useScramble } from "use-scramble"
import { cn } from "@/lib/utils"

interface TextScrambleProps {
  text: string
  speed?: number
  className?: string
  autoStart?: boolean
  onComplete?: () => void
  useIntersectionObserver?: boolean
  retriggerOnIntersection?: boolean
  intersectionThreshold?: number
  intersectionRootMargin?: string
  scrambleOnHover?: boolean
}

export interface TextScrambleHandle {
  start: () => void
  reset: () => void
}

const TextScramble = forwardRef<TextScrambleHandle, TextScrambleProps>(
  (
    {
      text,
      speed = 80,
      className = "",
      autoStart = true,
      onComplete,
      useIntersectionObserver = false,
      retriggerOnIntersection = false,
      intersectionThreshold = 0.3,
      intersectionRootMargin = "0px",
      scrambleOnHover = false,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const hasCompletedOnce = useRef(false)
    const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // "settled" = render the final text as a plain node and hold `speed` at 0.
    // use-scramble's RAF loop does not reliably reach its terminal
    // `result === text` state for every text/param combination — left alone it
    // renders random glyphs indefinitely and onAnimationEnd never fires. So we
    // drive it explicitly and hard-stop it: while settled the scramble node is
    // unmounted and speed is 0 (use-scramble's own loop returns early on
    // `!speed`), so nothing can overwrite the resolved text.
    const [settled, setSettled] = useState(!autoStart)
    const [playNonce, setPlayNonce] = useState(0)

    const { ref: scrambleRef, replay } = useScramble({
      text,
      speed: settled ? 0 : speed / 100,
      tick: 2,
      step: 1,
      range: [65, 125],
      scramble: 2,
      playOnMount: false,
      onAnimationEnd: () => {
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
        hasCompletedOnce.current = true
        setSettled(true)
        onComplete?.()
      },
      overdrive: false,
    })

    const settleMs = Math.max(900, text.length * 70) + 500

    const play = useCallback(() => {
      setSettled(false)
      setPlayNonce((n) => n + 1)
    }, [])

    // Runs after the "unsettled" render has committed, so the scramble node is
    // mounted and use-scramble has a live (non-zero-speed) loop.
    useEffect(() => {
      if (playNonce === 0 || settled) return
      replay()
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
      settleTimerRef.current = setTimeout(() => {
        const node = scrambleRef.current
        if (node && node.textContent !== text) node.textContent = text
        hasCompletedOnce.current = true
        setSettled(true)
        onComplete?.()
      }, settleMs)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playNonce])

    useEffect(() => {
      return () => {
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
      }
    }, [])

    useImperativeHandle(ref, () => ({
      start: () => play(),
      reset: () => {
        hasCompletedOnce.current = false
        play()
      },
    }))

    // Auto-play on mount unless the caller drives it manually or via scroll.
    useEffect(() => {
      if (autoStart && !useIntersectionObserver) play()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (!useIntersectionObserver || !containerRef.current) return

      const observerOptions = {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      }

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasCompletedOnce.current || retriggerOnIntersection) {
              play()
            }
            if (!retriggerOnIntersection) {
              observer.unobserve(entry.target)
            }
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersection, observerOptions)
      observer.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(containerRef.current)
        }
      }
    }, [useIntersectionObserver, retriggerOnIntersection, intersectionThreshold, intersectionRootMargin, play])

    const handleMouseEnter = () => {
      if (scrambleOnHover && hasCompletedOnce.current) play()
    }

    return (
      <>
        <span className="sr-only">{text}</span>
        <span
          ref={containerRef}
          className={cn("inline-block whitespace-pre-wrap", className)}
          aria-hidden="true"
          onMouseEnter={scrambleOnHover ? handleMouseEnter : undefined}
        >
          {settled ? (
            <span style={{ fontSize: "inherit" }}>{text}</span>
          ) : (
            <span ref={scrambleRef} style={{ fontSize: "inherit" }} />
          )}
        </span>
      </>
    )
  }
)

TextScramble.displayName = "TextScramble"
export default TextScramble
