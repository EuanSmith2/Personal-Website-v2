# Euan Smith Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design quality:** Invoke superpowers:ui-ux-pro-max when building sections and UI components — the user has explicitly requested this to ensure the site does not look "vibe coded."

**Goal:** Build a production-grade, dark-mode-only, scroll-driven single-page portfolio for Euan Smith (TUD Cybersecurity student), serving as portfolio, CV, and digital business card.

**Architecture:** Single Next.js 15 App Router page at `/`. All content lives in `src/data/portfolio.config.ts`. Framer Motion handles scroll reveal animations; GSAP + ScrollTrigger handles the timeline line-drawing. No auth, no API routes, no CMS.

**Tech Stack:** Next.js 15 (App Router) · TypeScript 5 strict · Tailwind CSS v3 · Framer Motion v11 · GSAP 3 + ScrollTrigger · use-scramble · lucide-react

---

## Task 1: Clean up directory and scaffold Next.js 15 project

**Files:**
- Modify: `/Users/euan/Visual Studio Code/Personal Website v2/` (remove stray file, scaffold)

- [ ] **Step 1: Remove the stray 0-byte file**

```bash
rm "/Users/euan/Visual Studio Code/Personal Website v2/Personal Website v2"
```

- [ ] **Step 2: Scaffold Next.js 15 into the current directory**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Expected: Creates `src/`, `public/`, `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`.

- [ ] **Step 3: Install additional dependencies**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npm install framer-motion gsap lucide-react use-scramble
npm install --save-dev @types/node
```

- [ ] **Step 4: Verify scaffold**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
ls src/app src/components 2>/dev/null || echo "scaffold ok"
```

- [ ] **Step 5: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git init && git add -A && git commit -m "chore: scaffold Next.js 15 project with deps"
```

---

## Task 2: TypeScript strict mode + next.config.js security headers

**Files:**
- Modify: `tsconfig.json`
- Create: `next.config.js` (replace generated `next.config.ts`)

- [ ] **Step 1: Update tsconfig.json for strict mode**

Replace the contents of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Delete the generated next.config.ts and create next.config.js**

```bash
rm "/Users/euan/Visual Studio Code/Personal Website v2/next.config.ts" 2>/dev/null || true
```

Create `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "chore: strict TS config + security headers"
```

---

## Task 3: Tailwind config + globals.css design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-rgb))",
        foreground: "var(--foreground)",
        background: "var(--background)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Write src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-base:        #09090b;
  --bg-surface:     #111117;
  --bg-card:        #18181b;
  --border:         #27272a;
  --border-glow:    #22d3ee33;
  --text-primary:   #f4f4f5;
  --text-secondary: #a1a1aa;
  --text-muted:     #52525b;
  --accent-cyan:    #22d3ee;
  --accent-purple:  #a855f7;
  --accent-emerald: #10b981;
  --accent-amber:   #f59e0b;

  /* shadcn-convention aliases */
  --primary:        oklch(0.85 0.15 55);
  --primary-rgb:    212, 168, 83;
  --foreground:     #f4f4f5;
  --background:     #09090b;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-inter), sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.1;
}

.dot-grid {
  background-image: radial-gradient(circle, rgba(34,211,238,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, black 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, black 100%);
}

:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
  border-radius: 4px;
}
```

- [ ] **Step 3: Verify Tailwind picks up the tokens**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors (or only missing-file errors that will resolve as we add files).

- [ ] **Step 4: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "chore: design tokens in Tailwind config and globals.css"
```

---

## Task 4: portfolio.config.ts — fully populated

**Files:**
- Create: `src/data/portfolio.config.ts`

- [ ] **Step 1: Create the data directory**

```bash
mkdir -p "/Users/euan/Visual Studio Code/Personal Website v2/src/data"
```

- [ ] **Step 2: Write src/data/portfolio.config.ts**

```ts
export const portfolioConfig = {
  personal: {
    name: "EUAN SMITH",
    displayName: "Euan Smith",
    title: "BSc Cybersecurity & Digital Forensics · Technological University Dublin",
    tagline: "Building systems, analyzing complexity, securing infrastructure.",
    avatar: "/profile.jpg",
    linkedin: "https://www.linkedin.com/in/euan-smith-4295123a6/details/courses/",
    tiktok: "https://www.tiktok.com/@euan_smith?is_from_webapp=1&sender_device=pc",
    credly: "https://www.credly.com/users/euan-smith.c95be961",
    github: "https://github.com/EuanSmith2",
    emailEncoded: "YnVzaW5lc3MuZXVhbkBob3RtYWlsLmNvbQ==", // btoa("business.euan@hotmail.com")
    cv: "#",
  },

  rotatingTitles: [
    { text: "Ethical Hacker in Training",  funny: false },
    { text: "InfoSec Student",             funny: false },
    { text: "Developing Software",         funny: false },
    { text: "Wannabe Mr. Robot",           funny: true  },
    { text: "Aspiring Digital Analyst",    funny: false },
    { text: "Building Weird AI Things",    funny: false },
    { text: "D&D Nerd (Gimbo the Wizard)", funny: true  },
    { text: "Uploading GitHub Repos",      funny: false },
    { text: "Sometimes Breaking Things",   funny: true  },
    { text: "Publishing Websites",         funny: false },
  ],

  about: {
    narrative:
      "I'm a cybersecurity student at Technological University Dublin with a background spanning AI automation, hardware systems, and digital forensics. I build things that work — automation tools that generate real returns, AI agents that explore emergent behaviour, and home lab infrastructure that mirrors production environments. I'm drawn to complex systems: understanding how they fail, how they can be exploited, and how to make them resilient. My approach combines low-level curiosity with product-minded thinking.",
    tags: [
      "Cybersecurity", "Linux", "Python", "AI/ML", "Networking",
      "OSINT", "Hardware", "Virtualization", "Systems Admin", "Digital Forensics",
    ],
  },

  currentActivity: [
    {
      id: "edmo",
      icon: "🇪🇺",
      title: "EDMO Internship",
      summary: "Upcoming role with the European Digital Media Observatory",
      detail:
        "Starting a summer internship at the European Digital Media Observatory via Dublin City University, working on website content management, social media automation, and backend process tooling for one of the EU's primary anti-disinformation networks.",
    },
    {
      id: "sap",
      icon: "📜",
      title: "SAP Certification",
      summary: "Security and AI integration learning path",
      detail:
        "Completing three SAP certifications: Learning Journey in Security and Compliance, Business Integrity Screening Fundamentals, and System Security Foundations. These cover enterprise security architecture, compliance frameworks, and AI-integrated business intelligence.",
    },
    {
      id: "tud",
      icon: "🎓",
      title: "TUD Programme Prep",
      summary: "Entering BSc Cybersecurity & Digital Forensics",
      detail:
        "Preparing to enter the BSc in Cybersecurity and Digital Forensics at Technological University Dublin. This programme covers network security, digital forensics, ethical hacking, cryptography, and security operations — areas I've been self-studying for several years.",
    },
    {
      id: "homelab",
      icon: "🖥️",
      title: "Home Lab",
      summary: "Linux servers, virtualization, networking experiments",
      detail:
        "Running a home lab environment with Linux servers, VMs, and network simulation tools. Current projects include setting up a SIEM stack, practising network segmentation, and experimenting with honeypot infrastructure for intrusion detection research.",
    },
    {
      id: "ai",
      icon: "🤖",
      title: "AI Projects",
      summary: "Computer vision, marketplace intelligence, automation",
      detail:
        "Building AI-driven tools — including a computer vision marketplace intelligence system that has generated measurable real-world financial returns, and a multi-agent AI sandbox inside a sandboxed VM for studying emergent agent behaviour.",
    },
    {
      id: "hardware",
      icon: "🔧",
      title: "Hardware & Legacy Systems",
      summary: "Repair, modification, retro infrastructure",
      detail:
        "Ongoing interest in hardware: building custom PCs, repairing and modifying consoles, working with legacy infrastructure, and understanding systems at the physical layer. This grounding in hardware informs how I think about software and security.",
    },
  ],

  timeline: [
    { year: "2016", label: "First Code", description: "CoderDojo — Scratch game development, first exposure to programming logic", era: "early" as const },
    { year: "2018", label: "STEM Camp", description: "Trinity College Dublin STEM camp — Python fundamentals, physics simulations, algorithmic thinking", era: "early" as const },
    { year: "2020", label: "Hardware Era", description: "Built custom PC during COVID, game modding, console repair, hardware modification", era: "mid" as const },
    { year: "2021", label: "AI Experiments", description: "First AI automation experiments, exploring generative tools and scripting", era: "mid" as const },
    { year: "2023", label: "Systems Depth", description: "Linux home lab, virtualization, advanced AI projects, cybersecurity self-study", era: "mid" as const },
    { year: "2025", label: "EDMO", description: "Upcoming internship at European Digital Media Observatory via Dublin City University", era: "present" as const },
  ],

  edmo: {
    organisation: "European Digital Media Observatory",
    affiliation: "Dublin City University · European Commission",
    role: "Incoming Digital Media Assistant · Summer 2025",
    mission:
      "The European Digital Media Observatory is a European Commission initiative that brings together fact-checkers, academics, and technology experts to combat disinformation across EU member states. Operating across multiple languages and media landscapes, EDMO serves as the backbone of the EU's digital literacy and media accountability infrastructure.",
    responsibilities: [
      "Website content management and publication workflows",
      "Social media content scheduling and analytics",
      "Backend automation and process tooling",
    ],
  },

  projects: [
    {
      id: "marketplace",
      number: "01",
      name: "Marketplace Intelligence System",
      tags: ["Computer Vision", "Python", "ROI Modeling", "Automation"],
      description:
        "Autonomous system that identifies resale opportunities across online marketplaces using computer vision and pricing intelligence. Incorporates ROI calculation, risk scoring, and human-in-the-loop decision gates. Has generated measurable financial returns, with approximately €500 contributed to charity supporting people experiencing homelessness.",
      impact: "~€500 donated to homelessness charity",
      status: "Active",
    },
    {
      id: "ai-sandbox",
      number: "02",
      name: "Multi-Agent AI Sandbox",
      tags: ["Multi-Agent", "LLM", "Browser Automation", "Research"],
      description:
        "A controlled research environment running inside a fully sandboxed virtual machine. Autonomous agents interact with browser environments and simulated platforms to study emergent communication, coordination, and system-level behaviour dynamics. Designed as an experimental laboratory for AI interaction research.",
      status: "In Development",
    },
  ],

  certifications: [
    { issuer: "SAP", name: "Learning Journey: Security and Compliance",    status: "Earned",  issuerColor: "#0070f3", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "SAP", name: "Business Integrity Screening Fundamentals",    status: "Earned",  issuerColor: "#0070f3", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "SAP", name: "System Security Foundations",                  status: "Earned",  issuerColor: "#0070f3", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "ISC2", name: "Candidate Member",                            status: "Member",  issuerColor: "#009A44", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
    { issuer: "Microsoft", name: "AI Skills Fest 2026",                    status: "Earned",  issuerColor: "#0078d4", credlyUrl: "https://www.credly.com/users/euan-smith.c95be961" },
  ],

  learning: [
    { platform: "Google",       name: "Google Cybersecurity Certificate", status: "In Progress", icon: "google",    color: "#4285F4" },
    { platform: "Let's Defend", name: "SOC Analyst Path",                 status: "In Progress", icon: "shield",    color: "#00C2FF" },
    { platform: "GRC Mastery",  name: "GRC Mastery Programme",            status: "In Progress", icon: "clipboard", color: "#a855f7" },
    { platform: "CompTIA",      name: "CompTIA Security+",                status: "In Progress", icon: "award",     color: "#C8202F" },
    { platform: "Hack The Box", name: "Active HTB Player",                status: "Active",      icon: "terminal",  color: "#9FEF00" },
  ],

  lifestyle: {
    interests: [
      { icon: "♟️", label: "Chess Club",       detail: "Competitive play" },
      { icon: "🗳️", label: "Student Council",  detail: "Class representative" },
      { icon: "📚", label: "Teacher Assistant", detail: "Peer learning support" },
      { icon: "🏆", label: "Academic Awards",  detail: "Excellence recognition" },
    ],
    reading: [
      { title: "The Web Application Hacker's Handbook", author: "Stuttard & Pinto" },
      { title: "The Age of Surveillance Capitalism",    author: "Shoshana Zuboff" },
      { title: "Thinking in Systems",                   author: "Donella H. Meadows" },
      { title: "Deep Work",                             author: "Cal Newport" },
    ],
  },

  contact: {
    closing: "Let's build something worth building.",
    subtext:
      "I'm interested in opportunities that sit at the intersection of security, automation, and complex systems — whether that's a technical internship, a collaborative project, or just a conversation worth having.",
    github: "https://github.com/EuanSmith2",
  },

  floatingBadge: {
    title: "Available for Work",
    subtitle: "Internships & Projects",
    link: "https://www.linkedin.com/in/euan-smith-4295123a6/details/courses/",
    tooltip: "Click to connect on LinkedIn",
  },
};
```

- [ ] **Step 3: Verify types**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npx tsc --noEmit 2>&1 | grep "portfolio.config" || echo "config OK"
```

- [ ] **Step 4: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add fully-populated portfolio.config.ts"
```

---

## Task 5: lib utilities

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/gsap.ts`

- [ ] **Step 1: Create src/lib/utils.ts**

```ts
export function cn(...inputs: (string | undefined | null | false | 0)[]): string {
  return inputs.filter(Boolean).join(" ");
}
```

- [ ] **Step 2: Create src/lib/gsap.ts**

```ts
// Register ScrollTrigger once — import this in components that use GSAP animations.
// Must only be called client-side (inside useEffect or dynamic import with ssr:false).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add cn utility and GSAP registration"
```

---

## Task 6: Hooks

**Files:**
- Create: `src/hooks/useInView.ts`
- Create: `src/hooks/useScrollProgress.ts`

- [ ] **Step 1: Create src/hooks/useInView.ts**

```ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
```

- [ ] **Step 2: Create src/hooks/useScrollProgress.ts**

```ts
"use client";
import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add useInView and useScrollProgress hooks"
```

---

## Task 7: TextScramble component (use-scramble wrapper)

**Files:**
- Create: `src/components/ui/TextScramble.tsx`

- [ ] **Step 1: Create src/components/ui/TextScramble.tsx**

This is the 21st.dev ScrambleText component verbatim, saved under the name TextScramble (matching the spec), with the `text-lg` inner span changed to `style={{ fontSize: "inherit" }}`:

```tsx
"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
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

    const { ref: scrambleRef, replay } = useScramble({
      text,
      speed: speed / 100,
      tick: 2,
      step: 1,
      range: [65, 125],
      scramble: 2,
      playOnMount: autoStart && !useIntersectionObserver,
      onAnimationEnd: () => {
        hasCompletedOnce.current = true
        onComplete?.()
      },
      overdrive: false,
    })

    useImperativeHandle(ref, () => ({
      start: () => replay(),
      reset: () => {
        hasCompletedOnce.current = false
        replay()
      },
    }))

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
              replay()
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
          observer.unobserve(containerRef.current)
        }
      }
    }, [useIntersectionObserver, retriggerOnIntersection, intersectionThreshold, intersectionRootMargin, replay])

    const handleMouseEnter = () => {
      if (scrambleOnHover) replay()
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
          {/* Inner span — fontSize inherits from wrapper so text-4xl / text-6xl cascades correctly */}
          <span ref={scrambleRef} style={{ fontSize: "inherit" }} />
        </span>
      </>
    )
  }
)

TextScramble.displayName = "TextScramble"
export default TextScramble
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npx tsc --noEmit 2>&1 | grep "TextScramble" || echo "TextScramble OK"
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add TextScramble component (use-scramble)"
```

---

## Task 8: AwardBadge component (verbatim + 5 targeted modifications)

**Files:**
- Create: `src/components/ui/AwardBadge.tsx`

- [ ] **Step 1: Create src/components/ui/AwardBadge.tsx**

Verbatim source with 5 modifications applied: (1) "portfolio" type added, (2) customTitle/customSubtitle props, (3) title lookup extended, (4) badgeBackgroundColor override for portfolio, (5) SVG text fill and logo path color adapted for portfolio type.

```tsx
"use client"

import React, { MouseEvent, useEffect, useRef, useState } from "react"

type AwardBadgeType =
  | "golden-kitty"
  | "product-of-the-day"
  | "product-of-the-month"
  | "product-of-the-week"
  | "portfolio" // [modification 1]

interface AwardBadgeProps {
  type: AwardBadgeType
  place?: number
  link?: string
  customTitle?: string    // [modification 2] overrides title when type === "portfolio"
  customSubtitle?: string // [modification 2] renders below title
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1"

const maxRotate = 0.25
const minRotate = -0.25
const maxScale = 1
const minScale = 0.97

const backgroundColor = ["#f3e3ac", "#ddd", "#f1cfa6"]

const title: Record<AwardBadgeType, string> = { // [modification 3]
  "golden-kitty": "Golden Kitty Awards",
  "product-of-the-day": "Product of the Day",
  "product-of-the-month": "Product of the Month",
  "product-of-the-week": "Product of the Week",
  "portfolio": "Open to Opportunities",
}

export const AwardBadge = ({ type, place, link, customTitle, customSubtitle }: AwardBadgeProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const [firstOverlayPosition, setFirstOverlayPosition] = useState<number>(0)
  const [matrix, setMatrix] = useState<string>(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState<string>(identityMatrix)
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState<boolean>(true)
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState<boolean>(false)
  const [isTimeoutFinished, setIsTimeoutFinished] = useState<boolean>(false)
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null)

  // [modification 4] override background for portfolio type
  const badgeBackgroundColor = type === "portfolio"
    ? ["#0f1117", "#18181b", "#111117"]
    : backgroundColor

  const getDimensions = () => {
    const left = ref?.current?.getBoundingClientRect()?.left || 0
    const right = ref?.current?.getBoundingClientRect()?.right || 0
    const top = ref?.current?.getBoundingClientRect()?.top || 0
    const bottom = ref?.current?.getBoundingClientRect()?.bottom || 0
    return { left, right, top, bottom }
  }

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top),
      maxScale - (maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / (xCenter - left + yCenter - top),
    ]
    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: (0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom)),
      z3: 0,
    }
    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`
  }

  const getOppositeMatrix = (_matrix: string, clientY: number, onMouseEnter?: boolean) => {
    const { top, bottom } = getDimensions()
    const oppositeY = bottom - clientY + top
    const weakening = onMouseEnter ? 0.7 : 4
    const multiplier = onMouseEnter ? -1 : 1
    return _matrix.split(", ").map((item, index) => {
      if (index === 2 || index === 4 || index === 8) return -parseFloat(item) * multiplier / weakening
      else if (index === 0 || index === 5 || index === 10) return "1"
      else if (index === 6) return multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening
      else if (index === 9) return (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening
      return item
    }).join(", ")
  }

  const onMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current)
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current)
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current)
    setDisableOverlayAnimation(true)
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    setDisableInOutOverlayAnimation(false)
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5)
      })
    })
    const m = getMatrix(e.clientX, e.clientY)
    const oppositeMatrix = getOppositeMatrix(m, e.clientY, true)
    setMatrix(oppositeMatrix)
    setIsTimeoutFinished(false)
    setTimeout(() => setIsTimeoutFinished(true), 200)
  }

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150)
    if (isTimeoutFinished) setCurrentMatrix(getMatrix(e.clientX, e.clientY))
  }

  const onMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY)
    if (enterTimeout.current) clearTimeout(enterTimeout.current)
    setCurrentMatrix(oppositeMatrix)
    setTimeout(() => setCurrentMatrix(identityMatrix), 200)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false)
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150)
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300)
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false)
          setDisableInOutOverlayAnimation(true)
        }, 500)
      })
    })
  }

  useEffect(() => {
    if (isTimeoutFinished) setMatrix(currentMatrix)
  }, [currentMatrix, isTimeoutFinished])

  const overlayAnimations = [...Array(10).keys()].map((e) => `
    @keyframes overlayAnimation${e + 1} {
      0%   { transform: rotate(${e * 10}deg); }
      50%  { transform: rotate(${(e + 1) * 10}deg); }
      100% { transform: rotate(${e * 10}deg); }
    }
  `).join(" ")

  // [modification 5] derive display values for portfolio type
  const isPortfolio = type === "portfolio"
  const textFill = isPortfolio ? "#a1a1aa" : "#666"
  const logoFill = isPortfolio ? "#22d3ee" : "#666"
  const displayTitle = isPortfolio && customTitle ? customTitle : `${title[type]}${place ? ` #${place}` : ""}`
  const headerLabel = isPortfolio ? "EUAN SMITH" : "PRODUCT HUNT"
  const hasSubtitle = isPortfolio && !!customSubtitle
  const titleY = hasSubtitle ? 33 : 40
  const titleSize = hasSubtitle ? 13 : 16

  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[180px] sm:w-[260px] h-auto cursor-pointer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <style>{overlayAnimations}</style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 200ms ease-out",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" className="w-full h-auto">
          <defs>
            <filter id="blur1"><feGaussianBlur in="SourceGraphic" stdDeviation="3" /></filter>
            <mask id="badgeMask"><rect width="260" height="54" fill="white" rx="10" /></mask>
          </defs>
          <rect width="260" height="54" rx="10" fill={badgeBackgroundColor[(place || 2) - 1] || badgeBackgroundColor[1]} />
          <rect x="4" y="4" width="252" height="46" rx="8" fill="transparent" stroke={isPortfolio ? "#27272a" : "#bbb"} strokeWidth="1" />
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill={textFill} x="53" y="20">
            {headerLabel}
          </text>
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize={titleSize} fontWeight="bold" fill={textFill} x="52" y={titleY}>
            {displayTitle}
          </text>
          {hasSubtitle && (
            <text fontFamily="Helvetica, sans-serif" fontSize="9" fontWeight="normal" fill="#52525b" x="52" y="47">
              {customSubtitle}
            </text>
          )}
          <g transform="translate(8, 9)">
            <path fill={logoFill} d="M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037" />
          </g>
          <g style={{ mixBlendMode: "overlay" }} mask="url(#badgeMask)">
            {[...Array(10).keys()].map((i) => (
              <g key={i} style={{
                transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                transformOrigin: "center center",
                transition: !disableInOutOverlayAnimation ? "transform 200ms ease-out" : "none",
                animation: disableOverlayAnimation ? "none" : `overlayAnimation${i + 1} 5s infinite`,
                willChange: "transform",
              }}>
                <polygon
                  points="0,0 260,54 260,0 0,54"
                  fill={["hsl(358,100%,62%)","hsl(30,100%,50%)","hsl(60,100%,50%)","hsl(96,100%,50%)","hsl(233,85%,47%)","hsl(271,85%,47%)","hsl(300,20%,35%)","transparent","transparent","white"][i]}
                  filter="url(#blur1)"
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </a>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npx tsc --noEmit 2>&1 | grep "AwardBadge" || echo "AwardBadge OK"
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add AwardBadge with portfolio type extensions"
```

---

## Task 9: Shared UI primitives

**Files:**
- Create: `src/components/ui/CursorGlow.tsx`
- Create: `src/components/ui/DotGridBackground.tsx`
- Create: `src/components/ui/SectionWrapper.tsx`
- Create: `src/components/ui/ObfuscatedEmail.tsx`

- [ ] **Step 1: Create CursorGlow.tsx**

```tsx
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
```

- [ ] **Step 2: Create DotGridBackground.tsx**

```tsx
export function DotGridBackground() {
  return <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
}
```

- [ ] **Step 3: Create SectionWrapper.tsx**

```tsx
"use client"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionWrapper({ children, className = "", delay = 0 }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })
  const prefersReducedMotion = useReducedMotion()

  const variants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
        },
      }

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
```

- [ ] **Step 4: Create ObfuscatedEmail.tsx**

```tsx
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
```

- [ ] **Step 5: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add CursorGlow, DotGridBackground, SectionWrapper, ObfuscatedEmail"
```

---

## Task 10: TerminalIntro component

**Files:**
- Create: `src/components/ui/TerminalIntro.tsx`

- [ ] **Step 1: Create src/components/ui/TerminalIntro.tsx**

```tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface TerminalIntroProps {
  onComplete: () => void
}

const LINE1 = "> initialising portfolio..."
const LINE2 = "> loading euan_smith.exe"
const BLOCK_COUNT = 8

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [line1, setLine1] = useState("")
  const [line2, setLine2] = useState("")
  const [blocks, setBlocks] = useState(0)
  const [showPercent, setShowPercent] = useState(false)
  const dismissed = useRef(false)

  const dismiss = () => {
    if (dismissed.current) return
    dismissed.current = true
    sessionStorage.setItem("intro_seen", "true")
    setVisible(false)
    setTimeout(onComplete, 200)
  }

  useEffect(() => {
    if (prefersReducedMotion) { dismiss(); return }
    if (sessionStorage.getItem("intro_seen")) { onComplete(); return }

    const skipHandler = () => dismiss()
    window.addEventListener("keydown", skipHandler)
    window.addEventListener("click", skipHandler)

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn() }, ms)
      timeouts.push(t)
    }

    // Type line 1
    let t = 0
    for (let i = 0; i <= LINE1.length; i++) {
      const idx = i
      schedule(() => setLine1(LINE1.slice(0, idx)), t)
      t += 40
    }

    // Type line 2
    for (let i = 0; i <= LINE2.length; i++) {
      const idx = i
      schedule(() => setLine2(LINE2.slice(0, idx)), t)
      t += 40
    }

    // Fill block chars over 400ms
    for (let b = 1; b <= BLOCK_COUNT; b++) {
      const count = b
      schedule(() => setBlocks(count), t + (400 / BLOCK_COUNT) * b)
    }
    schedule(() => setShowPercent(true), t + 400 + 50)

    // Auto dismiss after sequence
    schedule(() => dismiss(), t + 400 + 200)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
      window.removeEventListener("keydown", skipHandler)
      window.removeEventListener("click", skipHandler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono text-sm max-w-sm w-full mx-4">
            <div className="space-y-1">
              <p>
                <span className="text-cyan-400">&gt;</span>{" "}
                <span className="text-zinc-300">{line1.replace(/^> /, "")}</span>
              </p>
              {line2 && (
                <p>
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-zinc-300">{line2.replace(/^> /, "")}</span>
                </p>
              )}
              {blocks > 0 && (
                <p>
                  <span className="text-cyan-400">&gt; access granted </span>
                  <span className="text-cyan-400">{"█".repeat(blocks)}</span>
                  {showPercent && <span className="text-zinc-300"> 100%</span>}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add TerminalIntro with typewriter effect"
```

---

## Task 11: RotatingTitle component

**Files:**
- Create: `src/components/ui/RotatingTitle.tsx`

- [ ] **Step 1: Create src/components/ui/RotatingTitle.tsx**

```tsx
"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

interface Title {
  text: string
  funny: boolean
}

interface RotatingTitleProps {
  titles: Title[]
}

export function RotatingTitle({ titles }: RotatingTitleProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!titles.length) return
    const current = titles[index]
    const delay = Math.max(2800, current.text.length * 120)

    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % titles.length)
    }, delay)

    return () => clearTimeout(timer)
  }, [index, titles])

  const current = titles[index]
  if (!current) return null

  return (
    <div
      className="min-h-[1.5rem] flex items-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current.text}
          className={`font-mono tracking-widest text-base lg:text-lg ${
            current.funny ? "text-cyan-400" : "text-zinc-400"
          }`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {current.text}
          <span className="text-cyan-400 animate-pulse ml-0.5">|</span>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add RotatingTitle with dynamic interval"
```

---

## Task 12: ScrollToTop component

**Files:**
- Create: `src/components/ui/ScrollToTop.tsx`

- [ ] **Step 1: Create src/components/ui/ScrollToTop.tsx**

```tsx
"use client"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const threshold = document.body.scrollHeight * 0.5
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`group fixed bottom-6 left-6 z-50 min-w-[44px] min-h-[44px] w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 hover:border-cyan-400/50 hover:bg-zinc-800 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{ transition: "opacity 200ms ease, transform 200ms ease, border-color 200ms ease, background-color 200ms ease" }}
    >
      <ArrowUp size={16} className="text-zinc-400 group-hover:text-cyan-400 transition-colors duration-200" />
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add ScrollToTop button"
```

---

## Task 13: FloatingAchievement component

**Files:**
- Create: `src/components/ui/FloatingAchievement.tsx`

- [ ] **Step 1: Create src/components/ui/FloatingAchievement.tsx**

```tsx
"use client"
import { useEffect, useState } from "react"
import { AwardBadge } from "@/components/ui/AwardBadge"
import { portfolioConfig } from "@/data/portfolio.config"

export function FloatingAchievement() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("badge_dismissed") === "true") {
      setDismissed(true)
      return
    }
    const onScroll = () => {
      const threshold = document.body.scrollHeight * 0.15
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    sessionStorage.setItem("badge_dismissed", "true")
    setDismissed(true)
  }

  if (dismissed) return null

  const { floatingBadge } = portfolioConfig

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 sm:scale-100 scale-[0.8] origin-bottom ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(1rem)" }}
    >
      <div className="group relative">
        <AwardBadge
          type="portfolio"
          customTitle={floatingBadge.title}
          customSubtitle={floatingBadge.subtitle}
          link={floatingBadge.link}
        />
        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {floatingBadge.tooltip}
        </span>
        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss availability badge"
          className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-full text-xs hover:text-zinc-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add FloatingAchievement badge"
```

---

## Task 14: ExpandableCard + ProjectCard + TimelineItem + CertBadge primitives

**Files:**
- Create: `src/components/ui/ExpandableCard.tsx`
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `src/components/ui/TimelineItem.tsx`
- Create: `src/components/ui/CertBadge.tsx`

- [ ] **Step 1: Create ExpandableCard.tsx**

```tsx
"use client"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ExpandableCardProps {
  id: string
  icon: string
  title: string
  summary: string
  detail: string
  isOpen: boolean
  onToggle: (id: string) => void
}

export function ExpandableCard({ id, icon, title, summary, detail, isOpen, onToggle }: ExpandableCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`rounded-xl border p-6 transition-all duration-200 cursor-pointer ${
        isOpen
          ? "border-[--border-glow] shadow-[0_0_20px_rgba(34,211,238,0.08)]"
          : "border-[--border] hover:border-[--border-glow] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
      }`}
      style={{ background: "var(--bg-card)" }}
      onClick={() => onToggle(id)}
    >
      <button
        className="w-full text-left flex items-start gap-3"
        aria-expanded={isOpen}
        aria-controls={`card-detail-${id}`}
      >
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
            <ChevronDown
              size={16}
              className={`text-zinc-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
          <p className="text-sm text-zinc-400 mt-1">{summary}</p>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`card-detail-${id}`}
            initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-300 mt-4 pt-4 border-t border-zinc-800 leading-relaxed">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Create ProjectCard.tsx**

```tsx
"use client"
import { Github } from "lucide-react"

interface Project {
  id: string
  number: string
  name: string
  tags: string[]
  description: string
  impact?: string
  status: string
  githubUrl?: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="relative rounded-xl border border-[--border] p-6 lg:p-8 transition-all duration-[250ms] hover:-translate-y-1 hover:border-[--border-glow] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] overflow-hidden"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Watermark number */}
      <span className="absolute top-4 right-6 text-6xl font-mono text-zinc-800 select-none pointer-events-none leading-none">
        {project.number}
      </span>

      {/* Tag row */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {tag}
          </span>
        ))}
      </div>

      {/* Name */}
      <h3 className="text-2xl font-semibold text-zinc-100 mb-3">{project.name}</h3>

      {/* Description */}
      <p className="text-zinc-300 leading-relaxed mb-4">{project.description}</p>

      {/* Impact stat */}
      {project.impact && (
        <div className="bg-cyan-400/5 border-l-2 border-cyan-400 pl-4 py-2 text-cyan-300 text-sm mb-4">
          {project.impact}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
          project.status === "Active"
            ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-400"
            : "bg-amber-400/10 border-amber-400/30 text-amber-400"
        }`}>
          {project.status}
        </span>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <Github size={12} />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create TimelineItem.tsx**

```tsx
interface TimelineItemProps {
  year: string
  label: string
  description: string
  era: "early" | "mid" | "present"
  side: "left" | "right"
  index: number
}

const eraColor = {
  early: "var(--accent-amber)",
  mid: "var(--accent-cyan)",
  present: "var(--accent-purple)",
}

export function TimelineItem({ year, label, description, era, side, index }: TimelineItemProps) {
  const color = eraColor[era]

  return (
    <div
      className={`relative flex items-center gap-4 lg:gap-8 ${
        side === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
      } flex-row`}
      data-timeline-item={index}
    >
      {/* Content card */}
      <div className={`flex-1 ${side === "right" ? "lg:text-right" : ""}`}>
        <div
          className="rounded-xl border border-[--border] p-4 lg:p-6 transition-all duration-200 hover:border-[--border-glow]"
          style={{ background: "var(--bg-card)" }}
        >
          <span className="font-mono text-sm mb-1 block" style={{ color }}>
            {year}
          </span>
          <h3 className="text-base font-semibold text-zinc-100 mb-1">{label}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Node */}
      <div className="relative z-10 flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{
            backgroundColor: color,
            borderColor: color,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block flex-1" />
    </div>
  )
}
```

- [ ] **Step 4: Create CertBadge.tsx**

```tsx
import Link from "next/link"

interface CertBadgeProps {
  issuer: string
  name: string
  status: string
  issuerColor: string
  credlyUrl?: string
}

export function CertBadge({ issuer, name, status, issuerColor, credlyUrl }: CertBadgeProps) {
  const inner = (
    <div
      className="rounded-xl border border-[--border] p-4 lg:p-6 flex items-start gap-4 transition-all duration-200 hover:border-[--border-glow] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] h-full"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Issuer circle */}
      <div
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
        style={{
          background: `linear-gradient(135deg, ${issuerColor}cc, ${issuerColor}66)`,
          border: `1px solid ${issuerColor}40`,
        }}
      >
        {issuer.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">{issuer}</p>
        <p className="text-sm font-medium text-zinc-100 mb-2 leading-snug">{name}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
          status === "Earned"
            ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-400"
            : "bg-purple-400/10 border-purple-400/30 text-purple-400"
        }`}>
          {status}
        </span>
      </div>
    </div>
  )

  if (credlyUrl) {
    return (
      <a href={credlyUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    )
  }

  return inner
}
```

- [ ] **Step 5: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: add ExpandableCard, ProjectCard, TimelineItem, CertBadge"
```

---

## Task 15: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create src/components/sections/Hero.tsx**

```tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import TextScramble, { type TextScrambleHandle } from "@/components/ui/TextScramble"
import { RotatingTitle } from "@/components/ui/RotatingTitle"
import { DotGridBackground } from "@/components/ui/DotGridBackground"
import { TerminalIntro } from "@/components/ui/TerminalIntro"
import { portfolioConfig } from "@/data/portfolio.config"

export function Hero() {
  const { personal, rotatingTitles } = portfolioConfig
  const scrambleRef = useRef<TextScrambleHandle>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleIntroComplete = () => {
    setHeroVisible(true)
  }

  useEffect(() => {
    if (!heroVisible) return
    const t = setTimeout(() => scrambleRef.current?.start(), 600)
    return () => clearTimeout(t)
  }, [heroVisible])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <>
      <TerminalIntro onComplete={handleIntroComplete} />

      <section
        id="hero"
        aria-label="Introduction"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <DotGridBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <motion.div
            className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            animate={heroVisible ? "visible" : "hidden"}
          >
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Name */}
              <motion.div variants={itemVariants} className="mb-2">
                <div
                  className="text-4xl lg:text-6xl font-bold tracking-tight"
                  aria-label={personal.name}
                >
                  <TextScramble
                    ref={scrambleRef}
                    text={personal.name}
                    autoStart={false}
                    scrambleOnHover
                    speed={80}
                  />
                </div>
              </motion.div>

              {/* Rotating title */}
              <motion.div variants={itemVariants}>
                <RotatingTitle titles={rotatingTitles} />
              </motion.div>

              {/* Institution */}
              <motion.p
                variants={itemVariants}
                className="text-sm text-zinc-500 font-mono mt-1 mb-4"
              >
                {personal.title}
              </motion.p>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-xl text-zinc-300 max-w-xl mt-4 mb-8"
              >
                {personal.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                <a
                  href={personal.cv}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-zinc-950 font-semibold text-sm hover:bg-cyan-300 transition-colors duration-200"
                >
                  View CV
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 font-semibold text-sm hover:bg-cyan-400/10 transition-colors duration-200"
                >
                  Contact
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Avatar */}
            <motion.div variants={itemVariants} className="flex-shrink-0">
              <div className="relative w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/30 bg-zinc-800 flex items-center justify-center">
                  <Image
                    src={personal.avatar}
                    alt={personal.displayName}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Show placeholder if image fails
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                    priority
                  />
                  {/* Fallback initials — shown if image 404s */}
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-mono text-cyan-400 bg-zinc-800 rounded-full select-none">
                    ES
                  </span>
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-xl -z-10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Hero section with TerminalIntro, TextScramble, RotatingTitle"
```

---

## Task 16: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create src/components/sections/About.tsx**

```tsx
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function About() {
  const { about } = portfolioConfig

  return (
    <section
      id="about"
      aria-label="About"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-8">// about</p>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Narrative */}
            <div className="border-l-2 border-cyan-400/40 pl-6">
              <p className="text-zinc-300 leading-relaxed text-base lg:text-lg">
                {about.narrative}
              </p>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {about.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-sm font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: About section"
```

---

## Task 17: CurrentActivity section

**Files:**
- Create: `src/components/sections/CurrentActivity.tsx`

- [ ] **Step 1: Create src/components/sections/CurrentActivity.tsx**

```tsx
"use client"
import { useState } from "react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ExpandableCard } from "@/components/ui/ExpandableCard"
import { portfolioConfig } from "@/data/portfolio.config"

export function CurrentActivity() {
  const { currentActivity } = portfolioConfig
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="activity"
      aria-label="Current Activity"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">// current activity</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">What I&apos;m working on</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {currentActivity.map((item) => (
              <ExpandableCard
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                summary={item.summary}
                detail={item.detail}
                isOpen={openId === item.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: CurrentActivity section with ExpandableCards"
```

---

## Task 18: Timeline section (GSAP)

**Files:**
- Create: `src/components/sections/Timeline.tsx`

- [ ] **Step 1: Create src/components/sections/Timeline.tsx**

```tsx
"use client"
import { useEffect, useRef } from "react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { TimelineItem } from "@/components/ui/TimelineItem"
import { portfolioConfig } from "@/data/portfolio.config"

export function Timeline() {
  const { timeline } = portfolioConfig
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsap: typeof import("gsap")["gsap"]
    let ScrollTrigger: typeof import("gsap/ScrollTrigger")["ScrollTrigger"]
    let ctx: { revert: () => void }

    const init = async () => {
      const mod = await import("@/lib/gsap")
      gsap = mod.gsap
      ScrollTrigger = mod.ScrollTrigger
      mod.registerGSAP()

      if (!lineRef.current || !sectionRef.current) return

      ctx = gsap.context(() => {
        // Line draw
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        )
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="timeline"
      aria-label="Timeline"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">// timeline</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-16">The journey so far</h2>
        </SectionWrapper>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 lg:left-1/2 top-0 bottom-0 flex justify-center">
            <div
              ref={lineRef}
              className="w-0.5 h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, var(--accent-amber), var(--accent-cyan), var(--accent-purple))",
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="pl-12 lg:pl-0 space-y-12 lg:space-y-16">
            {timeline.map((entry, i) => (
              <SectionWrapper key={entry.year} delay={i * 0.05}>
                <TimelineItem
                  year={entry.year}
                  label={entry.label}
                  description={entry.description}
                  era={entry.era}
                  side={i % 2 === 0 ? "left" : "right"}
                  index={i}
                />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Timeline section with GSAP line draw"
```

---

## Task 19: EdmoExperience section

**Files:**
- Create: `src/components/sections/EdmoExperience.tsx`

- [ ] **Step 1: Create src/components/sections/EdmoExperience.tsx**

```tsx
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function EdmoExperience() {
  const { edmo } = portfolioConfig

  return (
    <section
      id="edmo"
      aria-label="EDMO Experience"
      className="py-24 lg:py-32 border border-emerald-400/10"
      style={{ background: "#0d1f1a" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          {/* EU flag color bar */}
          <div
            className="w-full h-1 rounded mb-8"
            style={{ background: "linear-gradient(90deg, #003399, #FFD700)" }}
          />

          <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-6">// experience</p>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-100 mb-1">
              {edmo.organisation}
            </h2>
            <p className="text-zinc-400 text-sm">{edmo.affiliation}</p>
          </div>

          {/* Role chip */}
          <div className="mb-8">
            <span className="inline-block bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-sm font-mono px-4 py-1 rounded-full">
              {edmo.role}
            </span>
          </div>

          {/* Mission */}
          <p className="text-zinc-300 leading-relaxed mb-8 max-w-3xl">{edmo.mission}</p>

          {/* Responsibilities */}
          <ul className="space-y-3">
            {edmo.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="text-emerald-400 font-mono mt-0.5 flex-shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: EDMO Experience section"
```

---

## Task 20: Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create src/components/sections/Projects.tsx**

```tsx
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { portfolioConfig } from "@/data/portfolio.config"

export function Projects() {
  const { projects } = portfolioConfig

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">// projects</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">What I&apos;ve built</h2>
        </SectionWrapper>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <SectionWrapper key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Projects section"
```

---

## Task 21: Certifications section

**Files:**
- Create: `src/components/sections/Certifications.tsx`

- [ ] **Step 1: Create src/components/sections/Certifications.tsx**

```tsx
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { CertBadge } from "@/components/ui/CertBadge"
import { portfolioConfig } from "@/data/portfolio.config"

export function Certifications() {
  const { certifications, learning, personal } = portfolioConfig

  return (
    <section
      id="certifications"
      aria-label="Certifications and Learning"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">// credentials</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">Certifications &amp; Learning</h2>

          {/* Tier 1 — Earned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {certifications.map((cert, i) => (
              <CertBadge key={i} {...cert} />
            ))}
          </div>

          {/* Credly CTA */}
          <a
            href={personal.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors mb-16"
          >
            → View all verified credentials on Credly
          </a>

          {/* Divider */}
          <div className="border-t border-zinc-800 pt-12">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">// currently studying</p>

            {/* Tier 2 — Learning */}
            <div className="flex flex-wrap gap-3">
              {learning.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-[--border] p-3 min-w-[200px] flex-1"
                  style={{
                    background: "var(--bg-card)",
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono mb-0.5" style={{ color: item.color }}>
                      {item.platform}
                    </p>
                    <p className="text-sm text-zinc-300 leading-snug mb-1.5">{item.name}</p>
                    <div className="flex items-center gap-1.5">
                      {item.status === "Active" && (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: item.status === "Active" ? item.color : "var(--accent-amber)",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Certifications section (Tier 1 + Tier 2)"
```

---

## Task 22: Personal section

**Files:**
- Create: `src/components/sections/Personal.tsx`

- [ ] **Step 1: Create src/components/sections/Personal.tsx**

```tsx
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { portfolioConfig } from "@/data/portfolio.config"

export function Personal() {
  const { lifestyle } = portfolioConfig

  return (
    <section
      id="personal"
      aria-label="Personal"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">// personal</p>
          <h2 className="text-3xl font-semibold text-zinc-100 mb-12">Outside the terminal</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Interests */}
            <div>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Interests</h3>
              <ul className="space-y-4">
                {lifestyle.interests.map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-zinc-200">{item.label}</p>
                      <p className="text-sm text-zinc-500">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reading */}
            <div>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">Currently reading</h3>
              <ul className="space-y-5">
                {lifestyle.reading.map((book, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-zinc-600 font-mono text-xs mt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-medium text-zinc-200">{book.title}</p>
                      <p className="text-sm text-zinc-500">{book.author}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Personal section"
```

---

## Task 23: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create src/components/sections/Contact.tsx**

```tsx
import { Github, Linkedin } from "lucide-react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail"
import { portfolioConfig } from "@/data/portfolio.config"

export function Contact() {
  const { contact, personal } = portfolioConfig

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionWrapper>
          <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-100 mb-4">
            {contact.closing}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
            {contact.subtext}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {/* Email */}
            <ObfuscatedEmail
              encoded={personal.emailEncoded}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-zinc-950 font-semibold text-sm hover:bg-cyan-300 transition-colors duration-200"
            />

            {/* LinkedIn */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-colors duration-200"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-colors duration-200"
            >
              <Github size={16} />
              GitHub
            </a>

            {/* TikTok — no lucide icon, use T monogram */}
            <a
              href={personal.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-zinc-100 transition-colors duration-200"
            >
              <span className="w-4 h-4 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                T
              </span>
              TikTok
            </a>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Contact section with ObfuscatedEmail"
```

---

## Task 24: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create src/components/layout/Navbar.tsx**

```tsx
"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Github, Menu, X } from "lucide-react"
import { portfolioConfig } from "@/data/portfolio.config"

const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Timeline",       href: "#timeline" },
  { label: "EDMO",           href: "#edmo" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
]

const SECTION_IDS = ["hero", "about", "activity", "timeline", "edmo", "projects", "certifications", "personal", "contact"]

export function Navbar() {
  const { personal } = portfolioConfig
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const menuVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : { hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-zinc-800" style={{ background: "rgba(9,9,11,0.8)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="font-mono font-bold text-cyan-400 text-lg tracking-widest" title={personal.displayName}>
            ES
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative text-sm transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyan-400 rounded"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right: GitHub + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex text-zinc-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <button
              className="lg:hidden text-zinc-400 hover:text-zinc-200 transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-zinc-800"
            style={{ background: "rgba(9,9,11,0.95)" }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-zinc-300 hover:text-cyan-400 transition-colors py-1 font-mono text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Navbar with active section tracking"
```

---

## Task 25: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create src/components/layout/Footer.tsx**

```tsx
import { portfolioConfig } from "@/data/portfolio.config"

export function Footer() {
  const { personal } = portfolioConfig

  return (
    <footer
      className="border-t border-zinc-800 py-8"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono font-bold text-cyan-400 text-sm">{personal.displayName}</span>
        <p className="text-xs text-zinc-600 font-mono">
          Built with Next.js · Tailwind · Framer Motion · GSAP
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: Footer"
```

---

## Task 26: layout.tsx + page.tsx assembly

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write src/app/layout.tsx**

```tsx
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { portfolioConfig } from "@/data/portfolio.config"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
})

const { personal } = portfolioConfig

export const metadata: Metadata = {
  title: `${personal.displayName} — Cybersecurity & Digital Forensics`,
  description: personal.tagline,
  openGraph: {
    title: personal.displayName,
    description: personal.tagline,
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[--bg-base] text-[--text-primary]">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Write src/app/page.tsx**

```tsx
import { CursorGlow } from "@/components/ui/CursorGlow"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { FloatingAchievement } from "@/components/ui/FloatingAchievement"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { CurrentActivity } from "@/components/sections/CurrentActivity"
import { Timeline } from "@/components/sections/Timeline"
import { EdmoExperience } from "@/components/sections/EdmoExperience"
import { Projects } from "@/components/sections/Projects"
import { Certifications } from "@/components/sections/Certifications"
import { Personal } from "@/components/sections/Personal"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CursorGlow />
        <Hero />
        <About />
        <CurrentActivity />
        <Timeline />
        <EdmoExperience />
        <Projects />
        <Certifications />
        <Personal />
        <Contact />
      </main>
      <Footer />
      <FloatingAchievement />
      <ScrollToTop />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: layout.tsx and page.tsx with all sections assembled"
```

---

## Task 27: Public assets

**Files:**
- Create: `public/profile.jpg` (SVG placeholder)
- Create: `public/.well-known/security.txt`

- [ ] **Step 1: Create profile placeholder**

```bash
mkdir -p "/Users/euan/Visual Studio Code/Personal Website v2/public"
cat > "/Users/euan/Visual Studio Code/Personal Website v2/public/profile.jpg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="90" fill="#27272a"/>
  <text x="90" y="105" font-family="monospace" font-size="48" font-weight="bold" fill="#22d3ee" text-anchor="middle">ES</text>
</svg>
EOF
```

Note: this is actually an SVG saved with a .jpg extension. Next.js Image will fail to load it, which triggers the fallback initials placeholder in Hero.tsx — exactly as designed.

- [ ] **Step 2: Create security.txt**

```bash
mkdir -p "/Users/euan/Visual Studio Code/Personal Website v2/public/.well-known"
cat > "/Users/euan/Visual Studio Code/Personal Website v2/public/.well-known/security.txt" << 'EOF'
Contact: mailto:business.euan@hotmail.com
Preferred-Languages: en
Scope: https://euansmith.dev
Policy: https://euansmith.dev/.well-known/security.txt
Acknowledgments: https://euansmith.dev
Expires: 2027-01-01T00:00:00.000Z
EOF
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "feat: profile placeholder + security.txt"
```

---

## Task 28: Zero-error verification

- [ ] **Step 1: Run TypeScript check**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npx tsc --noEmit 2>&1
```

Expected: No errors. Fix any type errors before proceeding.

- [ ] **Step 2: Start dev server**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
npm run dev
```

Expected: Server starts at http://localhost:3000 with no compilation errors in the terminal.

- [ ] **Step 3: Acceptance criteria spot-check**

Open http://localhost:3000 and verify:
- [ ] TerminalIntro plays on first load, types all 3 lines, skips on click
- [ ] Hero entrance animation fires after intro fades
- [ ] TextScramble fires at 600ms and on hover
- [ ] RotatingTitle cycles titles with cursor
- [ ] Dot grid visible behind hero content (framed, not covering text)
- [ ] Navbar active link tracks scroll
- [ ] Expanding a card in CurrentActivity closes the previously open one
- [ ] Timeline line draws as you scroll through the section
- [ ] FloatingAchievement appears after 15% scroll, dismisses with × button
- [ ] ScrollToTop button appears at 50% scroll, smoothly scrolls to top
- [ ] CursorGlow: faint cyan radial gradient follows mouse on dark sections
- [ ] Email in Contact opens mail client, is NOT visible in page source
- [ ] No horizontal overflow at 375px width (DevTools responsive mode)
- [ ] Console shows zero errors

- [ ] **Step 4: Final commit**

```bash
cd "/Users/euan/Visual Studio Code/Personal Website v2"
git add -A && git commit -m "chore: zero-error verification pass complete"
```

---

## Notes for executor

- Run `npx tsc --noEmit` after each Task to catch type errors early
- The `profile.jpg` is an SVG placeholder — the Hero fallback initials "ES" will render because `next/image` will error on the non-image file
- `use-scramble`'s `useScramble` hook must only run client-side — the `"use client"` directive on TextScramble handles this
- GSAP is imported dynamically inside `useEffect` in Timeline.tsx via `import("@/lib/gsap")` to avoid SSR issues
- If `create-next-app` installs Tailwind v4, downgrade: `npm install tailwindcss@^3.4.0 && npx tailwindcss init -p`
