# DevDebug Blog - Quick Reference

## Site Structure

```
blogsite/
├── .github/workflows/deploy.yml    # GitHub Actions deploy
├── astro.config.mjs              # Site config (base, sitemap, markdown)
├── package.json
├── public/
│   ├── og-page.png               # Default OG image
│   ├── og-image.svg
│   ├── favicon.ico / favicon.svg
│   └── images/                 # Screenshots for writeups
├── src/
│   ├── components/
│   │   ├── Breadcrumbs.astro
│   │   ├── DifficultyBadge.astro  # Tower signal icon + colored pill
│   │   ├── LatestWriteups.astro  # 6 latest on writeup pages
│   │   └── PostCard.astro      # Image + title + difficulty badge
│   ├── content/
│   │   ├── config.ts             # Schema: category enum, tags, difficulty
│   │   └── writeups/         # .md files with front matter
│   ├── layouts/
│   │   └── Layout.astro       # Title, OG, JSON-LD, canonical
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── blogs/
│   │   │   ├── [slug].astro  # Read time, TOC, article schema
│   │   │   └── index.astro    # Search + category + difficulty + load more
│   │   ├── categories/
│   │   │   ├── [category].astro
│   │   │   └── index.astro
│   │   ├── index.astro        # Hero + 6 latest + View More
│   │   └── tags/
│   │       ├── [tag].astro
│   │       └── index.astro
│   └── styles/
│       └── global.css
├── tailwind.config.mjs
└── tsconfig.json
```

## Adding a New Writeup

1. Copy screenshots to `public/images/[machine-name]/`
2. Create `.md` file in `src/content/writeups/`

```yaml
---
title: "HTB Walkthrough: [Machine]"
description: "Brief description for SEO and OG tags"
date: 2026-08-08
category: "HackTheBox"           # Must match enum in config.ts
tags: ["htb", "linux", "ssh"]
platform: "HackTheBox"
difficulty: "Medium"             # Easy | Medium | Hard | Insane
image: "/images/[machine]/hero.png"
---

# Reconnaissance

Content here...

![Nmap results](/images/[machine]/nmap.png)
```

3. Restart: `npm run dev`

## Front Matter Fields

| Field | Required | Values |
|-------|----------|--------|
| `title` | Yes | string |
| `description` | Yes | string |
| `date` | Yes | YYYY-MM-DD |
| `category` | Yes | Enum from config.ts |
| `tags` | Yes | array of strings |
| `platform` | No | string |
| `difficulty` | No | Easy / Medium / Hard / Insane |
| `image` | No | `/images/...` path |

## Categories

Defined in `src/content/config.ts`:
- TryHackMe
- HackTheBox
- picoCTF
- CyLAB
- OverTheWire
- Notes
- Tool Guides
- Cheatsheets

## Key Features

| Feature | Location |
|---------|----------|
| **Search** | `/blogs` - by title or tag |
| **Category filter** | `/blogs` dropdown |
| **Difficulty filter** | `/blogs` dropdown |
| **Load More** | 9 initial, +6 per click |
| **TOC sidebar** | Auto-generated from H2/H3 |
| **Read time** | Calculated from word count |
| **Latest 6** | Homepage + writeup bottom |
| **Breadcrumbs** | Writeup pages |
| **Article schema** | JSON-LD on writeups |

## Deployment

```powershell
git add .
git commit -m "Update"
git push
```

GitHub Actions auto-deploys to `https://d3vdebug.github.io/`

## SEO Checklist

- [ ] Sitemap: `/sitemap-index.xml`
- [ ] Robots: `/robots.txt`
- [ ] OG image: `/og-page.png`
- [ ] Canonical URLs on every page
- [ ] Unique meta descriptions
- [ ] JSON-LD: WebSite + BreadcrumbList + BlogPosting
- [ ] Submit to Google Search Console
- [ ] Replace GA placeholder `G-XXXXXXXXXX`

## Common Commands

```powershell
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
```

## Important Paths

| Item | Path |
|------|------|
| Site config | `astro.config.mjs` |
| Theme/layout | `src/layouts/Layout.astro` |
| Global CSS | `src/styles/global.css` |
| Post card | `src/components/PostCard.astro` |
| Writeup schema | `src/content/config.ts` |
| Deploy workflow | `.github/workflows/deploy.yml` |
