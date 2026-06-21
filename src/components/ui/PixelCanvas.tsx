"use client"
import { useCallback, useEffect, useRef } from "react"

/* -------------------------------------------------------------------------
 * Pixel state machine — extracted from pixel-logo-grid
 * Each pixel appears (ripples in from centre), shimmers at max size, and
 * disappears (shrinks to 0) on mouseleave.
 * ---------------------------------------------------------------------- */

type Pixel = {
  x: number
  y: number
  color: string
  ctx: CanvasRenderingContext2D
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeInt: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean
  draw: () => void
  appear: () => void
  disappear: () => void
  shimmer: () => void
}

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min

  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.4,
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5
      ctx.fillStyle = p.color
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size)
    },
    appear() {
      p.isIdle = false
      if (p.counter <= p.delay) {
        p.counter += p.counterStep
        return
      }
      if (p.size >= p.maxSize) p.isShimmer = true
      if (p.isShimmer) p.shimmer()
      else p.size += p.sizeStep
      p.draw()
    },
    disappear() {
      p.isShimmer = false
      p.counter = 0
      if (p.size <= 0) {
        p.isIdle = true
        return
      }
      p.size -= 0.1
      p.draw()
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true
      else if (p.size <= p.minSize) p.isReverse = false
      if (p.isReverse) p.size -= p.speed
      else p.size += p.speed
    },
  }

  return p
}

/* -------------------------------------------------------------------------
 * PixelCanvas component
 * Renders an absolute-fill canvas inside its own wrapper div.
 * Listens for mouseenter/mouseleave on the wrapper's parentElement (the card).
 * ---------------------------------------------------------------------- */

export interface PixelCanvasProps {
  colors: string[]
  gap?: number
  speed?: number
}

export function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const animationRef = useRef<number>(0)
  const lastFrameRef = useRef(performance.now())
  const reducedMotionRef = useRef(false)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = wrap.getBoundingClientRect()
    const w = Math.floor(width)
    const h = Math.floor(height)
    if (!w || !h) return
    canvas.width = w
    canvas.height = h
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001
    const pixels: Pixel[] = []

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const dx = x - w / 2
        const dy = y - h / 2
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy)
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay))
      }
    }

    pixelsRef.current = pixels
  }, [colors, gap, speed])

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current)
    const frameInterval = 1000 / 60

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop)

      const now = performance.now()
      const elapsed = now - lastFrameRef.current
      if (elapsed < frameInterval) return
      lastFrameRef.current = now - (elapsed % frameInterval)

      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pixels = pixelsRef.current
      for (const pixel of pixels) pixel[mode]()

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    animationRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    reducedMotionRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    init()

    const resizeObserver = new ResizeObserver(() => init())
    if (wrapRef.current) resizeObserver.observe(wrapRef.current)

    const card = wrapRef.current?.parentElement
    const handleEnter = () => animate("appear")
    const handleLeave = () => animate("disappear")
    const handleTouchStart = () => animate("appear")
    const handleTouchEnd = () => animate("disappear")
    card?.addEventListener("mouseenter", handleEnter)
    card?.addEventListener("mouseleave", handleLeave)
    card?.addEventListener("touchstart", handleTouchStart, { passive: true })
    card?.addEventListener("touchend", handleTouchEnd, { passive: true })
    card?.addEventListener("touchcancel", handleTouchEnd, { passive: true })

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationRef.current)
      card?.removeEventListener("mouseenter", handleEnter)
      card?.removeEventListener("mouseleave", handleLeave)
      card?.removeEventListener("touchstart", handleTouchStart)
      card?.removeEventListener("touchend", handleTouchEnd)
      card?.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [init, animate])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}
