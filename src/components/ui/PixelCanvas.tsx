"use client"
import { useRef, useEffect } from "react"

interface PixelCanvasProps {
  colors?: string[]
  gap?: number
  speed?: number
}

export function PixelCanvas({ colors = ["#22d3ee"], gap = 4, speed = 200 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    let pixels: Array<{ x: number; y: number; color: string; delay: number }> = []
    let t = 0
    let dir = 0
    let raf: number | null = null
    let prev: number | null = null
    const FADE = 0.12

    const setup = () => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      if (!w || !h) return
      canvas.width = w
      canvas.height = h
      const cx = w / 2
      const cy = h / 2
      pixels = []
      for (let x = 0; x < w; x += gap) {
        for (let y = 0; y < h; y += gap) {
          pixels.push({
            x, y,
            delay: Math.hypot(x - cx, y - cy) / speed,
            color: colors[Math.floor(Math.random() * colors.length)],
          })
        }
      }
    }

    setup()

    const draw = (ts: number) => {
      if (prev !== null) {
        t = Math.max(0, t + ((ts - prev) / 1000) * dir)
      }
      prev = ts

      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let needsMore = false

      for (const px of pixels) {
        const progress = (t - px.delay) / FADE
        const alpha = Math.max(0, Math.min(1, progress))
        if (alpha > 0 && alpha < 1) needsMore = true
        if (alpha > 0) {
          ctx.globalAlpha = alpha * 0.6
          ctx.fillStyle = px.color
          ctx.fillRect(px.x, px.y, gap - 1, gap - 1)
        }
      }
      ctx.globalAlpha = 1

      if (needsMore || (dir === -1 && t > 0)) {
        raf = requestAnimationFrame(draw)
      } else {
        raf = null
        prev = null
      }
    }

    const start = () => {
      if (raf !== null) cancelAnimationFrame(raf)
      prev = null
      raf = requestAnimationFrame(draw)
    }

    const onEnter = () => { dir = 1; start() }
    const onLeave = () => { dir = -1; start() }

    parent.addEventListener("mouseenter", onEnter)
    parent.addEventListener("mouseleave", onLeave)

    return () => {
      parent.removeEventListener("mouseenter", onEnter)
      parent.removeEventListener("mouseleave", onLeave)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [colors, gap, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full rounded-lg"
    />
  )
}
