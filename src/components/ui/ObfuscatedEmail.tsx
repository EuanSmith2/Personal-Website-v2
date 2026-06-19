"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Simplified Outlook "O" logo — blue square with white envelope O
const OutlookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Outlook" role="img" fill="none">
    <rect width="24" height="24" rx="3" fill="#0078D4" />
    <path d="M13 6h6.5A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5H13V6Z" fill="#50E6FF" opacity="0.4"/>
    <path d="M13 6v12l8-2V8l-8-2Z" fill="#28A8E8" />
    <ellipse cx="8.5" cy="12" rx="4.5" ry="5" fill="white" />
    <ellipse cx="8.5" cy="12" rx="2.8" ry="3.2" fill="#0078D4" />
  </svg>
)

interface ObfuscatedEmailProps {
  encoded: string
  className?: string
  iconSize?: number
}

export function ObfuscatedEmail({ encoded, className, iconSize = 16 }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail(atob(encoded))
  }, [encoded])

  if (!email) return null

  return (
    <a
      href={`mailto:${email}`}
      className={cn("inline-flex items-center gap-2", className)}
      aria-label="Send an email"
    >
      <OutlookIcon size={iconSize} />
      {email}
    </a>
  )
}
