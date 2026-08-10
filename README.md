# devdebug Blog

Cybersecurity research blog built with **Astro 5**, **Tailwind CSS v4**, and **Shiki**. Features full-text search, category/difficulty filtering, dynamic TOC, read-time estimation, and comprehensive JSON-LD structured data for SEO.

**Live site:** https://d3vdebug.github.io/

## Tech Stack

- **Framework:** Astro 5 (static output)
- **Styling:** Tailwind CSS v4 + `@tailwindcss/typography`
- **Syntax highlighting:** Shiki (`github-dark` theme)
- **Icons:** Phosphor Icons
- **Deploy:** GitHub Actions → GitHub Pages
- **Sitemap:** `@astrojs/sitemap`

## Site Structure

```
blogsite/
├── .github/workflows/deploy.yml    # CI/CD to GitHub Pages
├── astro.config.mjs                # Site URL, sitemap, markdown/shiki config
├── tailwind.config.mjs             # Custom colors, typography plugin
├── package.json
├── public/
│   ├── og-page.png                  # Default Open Graph image
│   ├── favicon.ico / favicon.svg
│   └── images/                      # Writeup screenshots
├── src/
│   ├── components/
│   │   ├── Breadcrumbs.astro
│   │   ├── DifficultyBadge.astro
│   │   ├── LatestWriteups.astro
│   │   └── PostCard.astro
│   ├── content/
│   │   ├── config.ts                # Writeup schema + category enum
│   │   └── writeups/                # Markdown posts with front matter
│   ├── layouts/
│   │   └── Layout.astro             # Global HTML shell, meta tags, JSON-LD
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── index.astro              # Homepage hero + latest posts
│   │   ├── blogs/
│   │   │   ├── [slug].astro         # Single post: TOC, read time, share, lightbox
│   │   │   └── index.astro          # Blog listing: search, filters, load more
│   │   ├── categories/
│   │   │   ├── [category].astro     # Posts by category
│   │   │   └── index.astro          # Category listing with counts
│   │   ├── tags/
│   │   │   ├── [tag].astro          # Posts by tag
│   │   │   └── index.astro          # Tag cloud with counts
│   │   └── search/[query].astro     # Full-text search results (noindex)
│   └── styles/
│       └── global.css
└── tsconfig.json
```

## Adding a New Writeup

1. Copy screenshots to `public/images/[machine-name]/`
2. Create a `.md` file in `src/content/writeups/` (or a subfolder like `HackTheBox/`)

```markdown
---
title: "HTB Walkthrough: [Machine]"
description: "Brief description for SEO and OG tags"
date: 2026-08-08
category: "HackTheBox"
tags: ["htb", "linux", "ssh"]
platform: "HackTheBox"
difficulty: "Medium"
image: "/images/[machine]/hero.png"
unlisted: false
---

# Reconnaissance

Content here...

![Nmap results](/images/[machine]/nmap.png)
```

3. Restart dev server if running.

### Front Matter Fields

| Field | Required | Values |
|-------|----------|--------|
| `title` | Yes | string |
| `description` | Yes | string |
| `date` | Yes | YYYY-MM-DD |
| `category` | Yes | Enum from `config.ts` |
| `tags` | Yes | array of strings |
| `platform` | No | string |
| `difficulty` | No | `Easy` / `Medium` / `Hard` / `Insane` |
| `image` | No | `/images/...` path |
| `unlisted` | No | boolean — hides from listing/sitemap, sets `noindex` |
| `dateModified` | No | YYYY-MM-DD — shown in structured data when present |

### Categories

Defined in `src/content/config.ts`:
- TryHackMe
- HackTheBox
- picoCTF
- Portswigger
- OverTheWire
- Notes
- Tool Guides
- Cheatsheets

## Key Features

| Feature | Details |
|---------|---------|
| **Search** | `/blogs` — filters by title or tag; also accessible via nav search |
| **Category filter** | `/blogs` dropdown |
| **Difficulty filter** | `/blogs` dropdown |
| **Load More** | 9 initial posts, +6 per click |
| **TOC sidebar** | Auto-generated from H2/H3 headings on post pages |
| **Read time** | Estimated from word count (`/200 words per minute`) |
| **Latest 6** | Shown on homepage and at bottom of each post |
| **Breadcrumbs** | Dynamic on all listing and post pages |
| **Image lightbox** | Click any post image to enlarge |
| **Code copy** | Copy button on fenced code blocks |
| **Unlisted posts** | `unlisted: true` hides from listings and sitemap |
| **JSON-LD** | `WebSite`, `BlogPosting`, and `BreadcrumbList` on every page |

## Development

### Prerequisites

- Node.js 18+
- npm

### Commands

```powershell
npm install
npm run dev --background    # Start dev server in background
npm run dev stop            # Stop background dev server
npm run dev status          # Check dev server status
npm run dev logs            # View dev server logs
npm run build               # Production build to dist/
npm run preview             # Preview production build locally
```

### Background dev server

Per project config, always use background mode for the dev server. Manage it with the `astro dev` commands above instead of keeping a foreground terminal open.

## Deployment

Push to `main` and GitHub Actions will build and deploy to GitHub Pages.

```powershell
git add .
git commit -m "Update"
git push
```

**Live URL:** https://d3vdebug.github.io/

## SEO & Structured Data

Every page includes:

- Unique `<title>` and `<meta name="description">`
- Open Graph (`og:*`) and Twitter Card (`twitter:*`) tags
- Canonical URL
- `BreadcrumbList` JSON-LD
- Site-wide `WebSite` JSON-LD with author `sameAs` links

Every blog post additionally includes:

- `BlogPosting` JSON-LD with `headline`, `datePublished`, `dateModified`, `author`, `publisher`, and `keywords`
- Dynamic OG/Twitter image handling (absolute URLs for local images, passthrough for external URLs)

**Unlisted posts** automatically receive `robots: noindex, follow` and are excluded from the sitemap.

## Environment Notes

- Google Analytics ID is loaded from `.env` as `PUBLIC_GA_ID`. Replace the placeholder value with your actual Measurement ID before enabling tracking.
- Social links reference `@d3vdebug` (X/Twitter) and `d3vdebug` (GitHub). Update these in `Layout.astro`, `about.astro`, and `index.astro` if handles change.
