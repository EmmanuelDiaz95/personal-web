# Portfolio Rebuild — Design Spec

## Overview

Complete visual and architectural rebuild of Emmanuel Diaz's personal portfolio website. Migrating from React + CRA + Tailwind to Next.js 14 + Tailwind + TypeScript. Monochromatic design system (black/grey/white), dark-first with light mode toggle.

## Page Structure

Three routes, ordered: **Experience** (landing) → **Projects** → **Blog**.

All pages share a persistent layout: name masthead at top, bottom navigation bar.

### Page 1: Experience (Landing — `/`)

- Brief profile summary (2-3 sentences)
- Stats banner: 7+ years, 8+ countries, 9 companies, $105M AUM
- 3-column company card grid, each card with:
  - Company logo (image file or monogram fallback)
  - Date range
  - Company name
  - Role title
- Overflow line for earlier roles ("+ ED&F Man · Sensient Technologies")

Companies displayed (in order):
1. Cascade Debt — Capital Markets Ops Manager (2025–Present)
2. Vaas — Ops & Implementations Manager (2024–2025)
3. Concourse — Product, YC/a16z (2024)
4. Rappi — Global FP&A Treasury Manager (2023–2024)
5. Nowports — Treasury Leader, 8 countries (2022–2023)
6. Mundi — Treasury Leader (2022)
7. Nubank — Finance Ops & Treasury Specialist (2021–2022)
8. BlackRock — Corporate Treasury LatAm (2020–2021)
9. Daimler AG — Cash Management, NAFTA (2018–2020)

### Page 2: Projects (`/projects`)

- Section label "Selected Work" + search box (top right)
- 2-column card grid, each card with:
  - Number (01, 02, 03...)
  - Status badge: `shipped` | `in progress` | `archived`
  - Title
  - Description (1-2 sentences)
  - Tags (technology/domain pills)
- Last grid tile is a CTA card (dashed border): "Want to collaborate? Let's talk →"
- Projects are a mix of everything: UX, finance, side projects

### Page 3: Blog (`/blog`)

- Sidebar (left, 240px) + article list (right):
  - Sidebar contains: search box, category list (vertical), tags cloud, newsletter form
  - Articles as stacked cards, each with: date, read time, title, excerpt, category tag
- Newsletter: email input + "Subscribe" button inside a dashed-border box

### Shared Layout

- **Header:** "EMMANUEL DIAZ" in monospace (left) + theme toggle icon (right)
- **Bottom nav (fixed):** Experience | Projects | Blog links + email address (right-aligned)
- Bottom nav has backdrop blur and semi-transparent background

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Dark mode:** `next-themes` with `class` strategy
- **Icons:** Lucide React (carried over)
- **Fonts:** IBM Plex Mono (headings/labels/mono) + system sans-serif (body)
- **Deployment:** Static export or Vercel

## Project Structure

```
personal-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (header + bottom nav + theme provider)
│   │   ├── page.tsx            # Redirects to /experience or renders Experience
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Project detail
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog with sidebar
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog post detail
│   │   └── experience/
│   │       └── page.tsx        # Stats + company cards (also rendered at /)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── BlogPostCard.tsx
│   │   │   ├── CompanyCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── TagPill.tsx
│   │   │   ├── StatBlock.tsx
│   │   │   ├── CTACard.tsx
│   │   │   └── NewsletterForm.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── blogPosts.ts
│   │   ├── experience.ts
│   │   └── constants.ts
│   ├── hooks/
│   │   └── useSearch.ts
│   └── lib/
│       └── utils.ts
├── public/
│   └── images/
│       └── logos/              # Company logo files
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Design System

### Color Palette

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#0a0a0a` | `#f5f5f5` |
| `--surface` | `#111111` | `#ebebeb` |
| `--border` | `#1a1a1a` | `#d4d4d4` |
| `--border-hover` | `#2a2a2a` | `#b0b0b0` |
| `--text-primary` | `#ffffff` | `#0a0a0a` |
| `--text-secondary` | `#888888` | `#555555` |
| `--text-muted` | `#555555` | `#888888` |
| `--text-faint` | `#333333` | `#bbbbbb` |
| `--cta-border` | `#272727` | `#cccccc` |
| `--badge-bg` | `#1a1a1a` | `#e0e0e0` |

No accent color. Hierarchy from value contrast only.

### Typography

- **Headings/Labels/Mono:** `IBM Plex Mono` (400, 500, 600)
- **Body:** System sans-serif (`-apple-system, Segoe UI, system-ui, sans-serif`)
- **Name masthead:** 20px, weight 600, letter-spacing 5px
- **Section labels:** 13px mono, letter-spacing 3px, uppercase, `--text-muted`
- **Card titles:** 17-18px, weight 600
- **Body text:** 15px, `--text-secondary`
- **Metadata (dates, status, numbers):** 11-12px mono, `--text-muted`

### Spacing

- Page max-width: `1440px`
- Page padding: `36px 64px` (desktop), `20px` (mobile)
- Card gap: `16px`
- Card padding: `28px`
- Card border-radius: `10px`
- Section label to content: `28px`
- Stats bar gap: `56px`

### Card System

Shared across all pages:
- Background: `--surface`
- Border: `1px solid --border`
- Border-radius: `10px`
- Hover: border transitions to `--border-hover` (150ms)
- CTA variant: transparent background, `1px dashed --cta-border`

### Status Badges

- `shipped` — `--text-secondary` on `--badge-bg`
- `in progress` — `--text-muted` on `--badge-bg`
- `archived` — `--text-faint` on `--badge-bg`

All use mono font, 11px, pill shape (border-radius 14px).

### Tags

- Mono font, 11px
- `--text-muted` on `--bg` background
- Pill shape (border-radius 12px), padding 4px 12px

### Company Logos

- 42x42px container, border-radius 10px
- Background: `--logo-bg`, border: `--logo-border`
- Image fills container; fallback is monogram initials in mono font
- Store logo files in `public/images/logos/`

### Bottom Navigation

- Fixed to bottom, full width
- Backdrop blur (12px) + semi-transparent background
- Mono font, 14px
- Active link uses `--text-primary`, inactive `--text-secondary`
- Email right-aligned, 12px, `--text-muted`

### Theme Toggle

- 40x40px button, border-radius 8px
- Border: `--border`, hover: `--border-hover`
- Moon icon (dark) / Sun icon (light)
- `next-themes` handles: localStorage persistence, system preference detection, no flash on load

## Data Layer

Static TypeScript files, no backend. Same content as current site, restructured:

- `projects.ts` — array of projects with: slug, title, description, role, status, tags, timeline, methods, outcomes
- `blogPosts.ts` — array of posts with: slug, title, excerpt, content, date, readTime, category, tags
- `experience.ts` — companies array + stats object + skills/tools/languages
- `constants.ts` — contact info, social links

## Interactive Mockup

Approved mockup file: `.superpowers/brainstorm/28906-1773185933/full-mockup-v3.html`

Open locally to reference during implementation.
