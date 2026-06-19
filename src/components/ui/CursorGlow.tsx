"use client"
import { useEffect, useRef } from "react"

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.background =
        `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(34,211,238,0.04), transparent 80%)`
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0" />
}
