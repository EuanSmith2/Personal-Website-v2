"use client"

import { useEffect, useState } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"

const KEY = "analytics-consent"
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export type ConsentValue = "granted" | "denied" | null

export function readConsent(): ConsentValue {
  try {
    const v = localStorage.getItem(KEY)
    return v === "granted" || v === "denied" ? v : null
  } catch {
    return null
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* private mode / storage disabled — session only */
  }
  window.dispatchEvent(new CustomEvent("analytics-consent", { detail: value }))
}

function useConsent(): ConsentValue {
  const [consent, setConsentState] = useState<ConsentValue>(null)

  useEffect(() => {
    setConsentState(readConsent())
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setConsentState(detail === "granted" || detail === "denied" ? detail : readConsent())
    }
    window.addEventListener("analytics-consent", onChange)
    return () => window.removeEventListener("analytics-consent", onChange)
  }, [])

  return consent
}

/** Loads Google Analytics only after the visitor has opted in. Renders nothing otherwise. */
export function AnalyticsConsent() {
  const consent = useConsent()
  if (!GA_ID || consent !== "granted") return null
  return <GoogleAnalytics gaId={GA_ID} />
}

/** A small control for the privacy page so a visitor can change their mind. */
export function ConsentToggle() {
  const consent = useConsent()

  if (!GA_ID) {
    return (
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Google Analytics is not currently enabled on this site.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span style={{ color: "var(--text-secondary)" }}>
        Analytics consent: <strong style={{ color: "var(--text-primary)" }}>{consent ?? "not set"}</strong>
      </span>
      <button
        onClick={() => setConsent(consent === "granted" ? "denied" : "granted")}
        className="font-mono text-xs px-3 py-1 rounded border hover:text-cyan-400 transition-colors"
        style={{ borderColor: "var(--border)", color: "var(--accent-cyan)" }}
      >
        {consent === "granted" ? "Withdraw consent" : "Allow analytics"}
      </button>
    </div>
  )
}
