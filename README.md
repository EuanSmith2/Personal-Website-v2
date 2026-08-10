<div align="center">

# [euansmith.net](https://euansmith.net)

![Screenshot](docs/readme-screenshot.jpg)

</div>

My portfolio site. Cybersecurity student, occasional web dev, apparently also a "digital analyst" depending on which rotating title you catch it on.

Opens with a fake terminal breach sequence before the actual page loads. Press any key to skip it if you're not in the mood.

## Running it locally

```bash
git clone https://github.com/EuanSmith2/Personal-Website-v2.git
cd Personal-Website-v2
npm install
npm run dev
```

Then open `http://localhost:3000`.

- No env vars, no API keys, no external services required
- Next.js 15 (App Router), Tailwind, Framer Motion + GSAP for animation, `use-scramble` for the glitch text
- No CMS, no database — all content lives in `src/data/portfolio.config.ts`

## What's on it

- About, timeline, EDMO research work
- Three projects: RadicalMap, a marketplace intelligence system, an AI sandbox
- Certs
- CV page — generates the PDF live, not a static file
- Contact email obfuscated against scraping

## License

CC0 — do what you want with it.
