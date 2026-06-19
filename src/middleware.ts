import { NextResponse, type NextRequest } from "next/server"

// ---------------------------------------------------------------------------
// Rate limiting
//
// Strategy:
//   - "Bot / scraper" tier  — no UA, or UA matches known crawlers: 30 req/min
//   - "Public user" tier    — single IP (home broadband, mobile): 120 req/min
//   - "Corporate proxy" tier — multiple clients behind one egress IP
//                              (Via header, or X-Forwarded-For chain > 1 hop):
//                              300 req/min so a whole office can browse freely
//
// Storage: in-memory Map per process. This resets on cold starts, which is
// fine for a portfolio — it just means limits are per-instance rather than
// globally enforced. For persistent distributed limiting, swap the Map for
// Vercel KV / Upstash Redis and call await kv.incr(key).
// ---------------------------------------------------------------------------

const WINDOW_MS = 60_000

const LIMIT: Record<string, number> = {
  bot:       30,
  public:   120,
  corporate: 300,
}

const BOT_UA = /bot|crawler|spider|scraper|python|curl|wget|go-http|java\/|ruby|php\/|axios|node-fetch|undici|httpx/i

interface Entry { count: number; resetAt: number }

const store = new Map<string, Entry>()
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < 300_000) return
  for (const [k, v] of store) {
    if (now > v.resetAt) store.delete(k)
  }
  lastCleanup = now
}

function tier(request: NextRequest): "bot" | "public" | "corporate" {
  const ua = request.headers.get("user-agent") ?? ""
  if (!ua || BOT_UA.test(ua)) return "bot"

  // Via header is set by HTTP proxies (corporate, ISP transparent proxies)
  const via = request.headers.get("via")
  // X-Forwarded-For with >1 hop means the client went through at least one
  // intermediate proxy before reaching us — typical in corporate networks
  const xfwdFor = request.headers.get("x-forwarded-for") ?? ""
  const hopCount = xfwdFor ? xfwdFor.split(",").length : 1

  if (via || hopCount > 1) return "corporate"
  return "public"
}

export function middleware(request: NextRequest) {
  // Only rate-limit page and API requests; skip static assets
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"

  const clientTier = tier(request)
  const limit = LIMIT[clientTier]
  const key = `${ip}:${clientTier}`
  const now = Date.now()

  cleanup()

  let entry = store.get(key)
  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + WINDOW_MS }
    store.set(key, entry)
  } else {
    entry.count++
  }

  const remaining = Math.max(0, limit - entry.count)
  const resetEpoch = Math.ceil(entry.resetAt / 1000)

  if (remaining === 0) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Content-Type":       "text/plain",
        "Retry-After":        String(retryAfter),
        "X-RateLimit-Limit":  String(limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset":  String(resetEpoch),
        "X-RateLimit-Policy": `${limit};w=60;policy=${clientTier}`,
      },
    })
  }

  const response = NextResponse.next()
  response.headers.set("X-RateLimit-Limit",     String(limit))
  response.headers.set("X-RateLimit-Remaining", String(remaining))
  response.headers.set("X-RateLimit-Reset",     String(resetEpoch))
  response.headers.set("X-RateLimit-Policy",    `${limit};w=60;policy=${clientTier}`)
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
