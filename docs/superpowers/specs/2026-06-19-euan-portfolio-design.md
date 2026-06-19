# Euan Smith Portfolio Website — Design Spec

**Date:** 2026-06-19  
**Status:** Approved  
**Stack:** Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v3 · Framer Motion v11 · GSAP 3 + ScrollTrigger

---

## 1. Architecture

Single-page, scroll-driven portfolio at `/` (App Router). No routing, no API routes, no auth, no CMS. All content is driven from one file: `src/data/portfolio.config.ts`. Zero content hardcoded in components.

Dark-mode-only. No toggle.

```
/Users/euan/Visual Studio Code/Personal Website v2/
├── src/
│   ├── app/                    # Root layout, page, globals.css
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # 9 page sections
│   │   └── ui/                 # Shared primitives + pre-built components
│   ├── data/                   # portfolio.config.ts (single source of truth)
│   ├── hooks/                  # useScrollProgress, useInView
│   └── lib/                    # gsap.ts (ScrollTrigger registration), utils.ts (cn)
├── public/
│   ├── profile.jpg             # Placeholder SVG if absent
│   └── .well-known/security.txt
├── tailwind.config.ts
├── next.config.js              # Security headers
└── package.json
```

---

## 2. Dependencies

### Allowed (per spec)
`next` · `react` · `react-dom` · `typescript` · `tailwindcss` · `postcss` · `autoprefixer` · `framer-motion` · `gsap` · `lucide-react`

### Added (required by 21st.dev TextScramble component — user-approved)
`use-scramble`

---

## 3. Pre-built Components (sourced from 21st.dev)

### TextScramble (`components/ui/TextScramble.tsx`)
Wraps the 21st.dev `ScrambleText` component using `use-scramble`. One structural adaptation:
- Internal `<span>` `text-lg` removed → `style={{ fontSize: "inherit" }}` so font size cascades from wrapper.
- Two trigger modes: auto-start 600ms after mount (via `useEffect` + `setTimeout`); on-hover via `scrambleOnHover` prop.
- Accessibility: wrapper `<div>` carries `aria-label={text}` so screen readers see the resolved name.

### AwardBadge (`components/ui/AwardBadge.tsx`)
Verbatim copy. Five targeted modifications only (3D matrix math and animation logic untouched):
1. `AwardBadgeType` extended with `"portfolio"`.
2. `customTitle` and `customSubtitle` props added.
3. `"portfolio"` added to title lookup map.
4. `badgeBackgroundColor` override for `type === "portfolio"` → zinc dark palette.
5. SVG text elements: `fill="#666"` → `fill="#a1a1aa"` (zinc-400); logo path → `fill="#22d3ee"` (cyan) when `type === "portfolio"`.

---

## 4. Design System

### Colors (CSS custom properties in `globals.css` `:root`)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#09090b` | Page background (zinc-950) |
| `--bg-surface` | `#111117` | Section / card surface |
| `--bg-card` | `#18181b` | Elevated card (zinc-900) |
| `--border` | `#27272a` | Default border (zinc-800) |
| `--border-glow` | `#22d3ee33` | Glowing border (cyan+alpha) |
| `--text-primary` | `#f4f4f5` | zinc-100 |
| `--text-secondary` | `#a1a1aa` | zinc-400 |
| `--text-muted` | `#52525b` | zinc-600 |
| `--accent-cyan` | `#22d3ee` | Primary interactive accent |
| `--accent-purple` | `#a855f7` | Secondary accent |
| `--accent-emerald` | `#10b981` | EDMO / success states |
| `--accent-amber` | `#f59e0b` | Timeline nodes |
| `--primary` | `oklch(0.85 0.15 55)` | shadcn alias — warm gold |
| `--primary-rgb` | `212, 168, 83` | RGB for Tailwind opacity modifiers |
| `--foreground` | `#f4f4f5` | shadcn alias |
| `--background` | `#09090b` | shadcn alias |

### Typography
- `Inter` (300–700) + `JetBrains Mono` (400, 500) via `next/font/google`
- Monospace for: code, tech tags, terminal elements, timeline years, nav logo

### Motion
- Easing: `[0.16, 1, 0.3, 1]` (expo out) for entrances
- Durations: 600ms reveals · 300ms hovers · 900ms page transitions
- `prefers-reduced-motion`: every Framer Motion variant checked with `useReducedMotion()` — instant fallback

### Dot-grid background
Pure CSS, no JavaScript. `.dot-grid` class with radial-gradient + CSS mask. Applied to hero only.

---

## 5. Sections (in order)

| # | Section | Key features |
|---|---------|-------------|
| 1 | Hero | TerminalIntro (sessionStorage, skippable), TextScramble (load+hover), RotatingTitle (dynamic interval), DotGridBackground (CSS), CTAs |
| 2 | About | Two-column, left border, tag pills |
| 3 | Current Activity | 6 ExpandableCards (one open at a time, smooth height) |
| 4 | Timeline | GSAP line draw, alternating left/right, era-colored nodes |
| 5 | EDMO Experience | EU color bar, emerald accent, `#0d1f1a` background |
| 6 | Projects | 2 full-width case study cards, watermark number, impact stat |
| 7 | Certifications | Tier 1: CertBadge grid (Credly links) · Tier 2: learning pill row |
| 8 | Personal | Two-column interests + reading list |
| 9 | Contact | Closing statement, ObfuscatedEmail, social links |

---

## 6. Floating / Fixed UI

| Component | Position | Trigger |
|-----------|----------|---------|
| `CursorGlow` | `fixed inset-0` z-0 | `mousemove` — direct DOM mutation, zero `useState` |
| `FloatingAchievement` | `fixed bottom-centre` z-50 | Visible after 15% scroll; dismissible (sessionStorage) |
| `ScrollToTop` | `fixed bottom-left` z-50 | Visible after 50% scroll |
| `TerminalIntro` | Full-screen overlay | sessionStorage `intro_seen` gate |

---

## 7. Security

- **CSP + 4 headers** in `next.config.js` (applies to all routes)
- **Email obfuscation**: `btoa(email)` in config → decoded client-side via `ObfuscatedEmail.tsx` — never in static HTML
- **`security.txt`** at `public/.well-known/security.txt` (RFC 9116)

---

## 8. Accessibility

- Every `<section>` has `aria-label` or `aria-labelledby`
- `RotatingTitle` wrapper: `aria-live="polite"` + `aria-atomic="true"`
- `TextScramble` wrapper: `aria-label={text}` 
- `ExpandableCard`: `aria-expanded` + `aria-controls`
- `FloatingAchievement` dismiss: `aria-label="Dismiss availability badge"`
- All interactive elements: `:focus-visible` outline in `--accent-cyan`

---

## 9. Content Source

`portfolio.config.ts` is the only file with string content. Every section component imports from it. Fully populated (no placeholder strings) before section components are written.

---

## 10. Build Phases

1. Project scaffold + config (`package.json`, `tsconfig`, `tailwind.config.ts`, `next.config.js`, `globals.css`)
2. `portfolio.config.ts` — fully populated
3. Design tokens wired into Tailwind
4. Pre-built components placed and TypeScript-verified (`TextScramble`, `AwardBadge`)
5. AwardBadge portfolio modifications
6. Shared UI primitives (`CursorGlow`, `TerminalIntro`, `DotGridBackground`, `SectionWrapper`, `RotatingTitle`, `ObfuscatedEmail`, `ScrollToTop`)
7. Hero section
8. About + CurrentActivity
9. Timeline (GSAP)
10. EDMO Experience
11. Projects
12. Certifications + Personal
13. Contact + Navbar + Footer
14. FloatingAchievement
15. Responsive pass (375px / 768px / 1440px)
16. Accessibility pass
17. Zero-error verification (`next dev`)
