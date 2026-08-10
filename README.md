# euansmith.net

My portfolio site. Cybersecurity student, occasional web dev, apparently also a "digital analyst" depending on which rotating title you catch it on.

![Screenshot](docs/readme-screenshot.jpg)

Live at [euansmith.net](https://euansmith.net) — opens with a fake hacking sequence before it lets you in, because a boring hero section felt like a wasted opportunity.

## Stack

Next.js 15, Tailwind, Framer Motion, GSAP, and `use-scramble` for the terminal-glitch text effects. No CMS — everything lives in `src/data/portfolio.config.ts`, so updating a cert or a project is a one-file edit, not an archaeology dig.

## Running it

```bash
npm install
npm run dev
```

Open `localhost:3000`. Content changes go in `portfolio.config.ts`; everything else is standard Next.js App Router.

## What's actually on it

About, a timeline, EDMO research work, projects (RadicalMap, a marketplace intelligence tool, an AI sandbox), certs, and a CV page that generates a PDF on the fly instead of serving a stale file. Email's obfuscated so bots don't harvest it off the page.

## License

CC0 — do what you want with it.
