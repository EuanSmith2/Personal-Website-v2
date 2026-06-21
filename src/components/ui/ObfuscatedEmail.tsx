"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ObfuscatedEmailProps {
  encoded: string
  className?: string
  iconSize?: number
}

export function ObfuscatedEmail({ encoded, className, iconSize = 16 }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string | null>(null)
  const touchedRef = useRef(false)

  useEffect(() => {
    setEmail(atob(encoded))
  }, [encoded])

  if (!email) return null

  const href = `mailto:${email}`

  return (
    <a
      href={href}
      className={cn("inline-flex items-center gap-2", className)}
      aria-label="Send an email"
      onTouchStart={() => { touchedRef.current = true }}
      onClick={(e) => {
        if (!touchedRef.current) return
        touchedRef.current = false
        e.preventDefault()
        setTimeout(() => { window.location.href = href }, 360)
      }}
    >
      <Image src="/logos/outlook-logo.png" width={iconSize} height={iconSize} alt="Microsoft Outlook" className="object-contain" />
      {email}
    </a>
  )
}
