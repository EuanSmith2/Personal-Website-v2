"use client"
import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface ObfuscatedEmailProps {
  encoded: string
  className?: string
}

export function ObfuscatedEmail({ encoded, className }: ObfuscatedEmailProps) {
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
      <Mail size={16} />
      {email}
    </a>
  )
}
