# Architecture Overview

This document provides a comprehensive overview of the portfolio website's architecture. Update as the codebase evolves.

## 1. Project Structure

```
personal-web/
├── public/                              # Static assets served as-is
│   ├── images/
│   │   └── logos/                       # Company logo files (42x42px, square)
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/                             # Next.js App Router (file-based routing)
│   │   ├── layout.tsx                   # Root layout: HTML shell, fonts, ThemeProvider, Header, PageTabs
│   │   ├── globals.css                  # Tailwind directives + CSS custom properties (dark/light)
│   │   ├── page.tsx                     # Experience page (landing — `/`)
│   │   ├── not-found.tsx                # 404 page
│   │   ├── projects/
│   │   │   ├── page.tsx                 # Projects grid with search (`/projects`)
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # Project detail (`/projects/:slug`)
│   │   └── blog/
│   │       ├── page.tsx                 # Blog with sidebar filters (`/blog`)
│   │       └── [slug]/
│   │           └── page.tsx             # Blog post detail (`/blog/:slug`)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx               # Name masthead + social icons + theme toggle
│   │   │   └── PageTabs.tsx             # Sticky top navigation tabs (Experience/Projects/Blog)
│   │   ├── ui/
│   │   │   ├── CompanyCard.tsx          # Company card with logo/monogram, period, role
│   │   │   ├── ProjectCard.tsx          # Project card with number, status badge, tags
│   │   │   ├── BlogPostCard.tsx         # Blog article card with date, read time, excerpt
│   │   │   ├── StatusBadge.tsx          # Pill badge (shipped / in progress / archived)
│   │   │   ├── TagPill.tsx              # Small rounded tag pill
│   │   │   ├── StatBlock.tsx            # Large number + label (e.g., "7+" / "YEARS")
│   │   │   ├── SearchBar.tsx            # Controlled search input
│   │   │   ├── CTACard.tsx              # Dashed-border "Want to collaborate?" tile
│   │   │   └── NewsletterForm.tsx       # Email subscription form
│   │   └── ThemeToggle.tsx              # Moon/Sun icon toggle (next-themes)
│   ├── data/                            # Static TypeScript data layer (no backend)
│   │   ├── projects.ts                  # Project array + getProjectBySlug()
│   │   ├── blogPosts.ts                 # Blog post array + getBlogPostBySlug(), getCategories(), getAllTags()
│   │   ├── experience.ts               # Companies, stats, profile summary, earlier roles
│   │   └── constants.ts                 # Contact info, social links (LinkedIn, GitHub, Strava), site metadata
│   └── lib/
│       └── utils.ts                     # cn() classname helper
├── docs/
│   └── superpowers/
│       ├── specs/                       # Design specifications
│       └── plans/                       # Implementation plans
├── tailwind.config.ts                   # Tailwind: darkMode 'class', custom colors, fonts, max-width
├── next.config.js                       # Next.js: static export, unoptimized images
├── tsconfig.json                        # TypeScript configuration
├── postcss.config.js                    # PostCSS for Tailwind
├── .nvmrc                               # Node version: 22
├── package.json                         # Dependencies and scripts
├── CLAUDE.md                            # Agent-oriented project documentation
└── ARCHITECTURE.md                      # This document
```

## 2. High-Level System Diagram

This is a **statically exported Next.js application** with no backend. All content lives in TypeScript data files. Pages are pre-rendered at build time.

```
                      ┌──────────────────────────────────────────────────┐
                      │               Browser (Client)                   │
                      │                                                  │
[User] <──────────>   │  ┌──────────────────────────────────────────┐    │
                      │  │          Next.js Application              │    │
                      │  │                                            │    │
                      │  │  ThemeProvider (next-themes, class strategy)│    │
                      │  │    └── Page Container (max-w-1440px)       │    │
                      │  │          ├── Header                        │    │
                      │  │          │    ├── "EMMANUEL DIAZ" masthead  │    │
                      │  │          │    ├── Social icons (LI/GH/S)   │    │
                      │  │          │    └── ThemeToggle (Moon/Sun)    │    │
                      │  │          ├── PageTabs (sticky top nav)     │    │
                      │  │          │    ├── Experience                │    │
                      │  │          │    ├── Projects                  │    │
                      │  │          │    └── Blog                     │    │
                      │  │          └── <main> (page content)         │    │
                      │  │               ├── / (Experience)           │    │
                      │  │               ├── /projects                │    │
                      │  │               ├── /projects/[slug]         │    │
                      │  │               ├── /blog                    │    │
                      │  │               ├── /blog/[slug]             │    │
                      │  │               └── 404                      │    │
                      │  │                                            │    │
                      │  │  ┌──────────────────────────────────┐      │    │
                      │  │  │  Static Data Layer (src/data/)    │      │    │
                      │  │  │  projects.ts | blogPosts.ts       │      │    │
                      │  │  │  experience.ts | constants.ts     │      │    │
                      │  │  └──────────────────────────────────┘      │    │
                      │  └──────────────────────────────────────────┘    │
                      └──────────────────────────────────────────────────┘

Data Flow:
  Static Data (data/*.ts) ──> Page Components (server-rendered at build)
                                     │
  ThemeProvider (next-themes) ──> Client Components (ThemeToggle, PageTabs,
                                  SearchBar, NewsletterForm, blog/projects pages)
                                     │
                                     ▼
                               UI Components (Cards, Badges, Tags)
```

## 3. Key Components

### 3.1. Application

**Name:** Emmanuel Diaz — Personal Portfolio

**Description:** A portfolio website for a Finance Operations leader. Three main pages — Experience (landing with career stats and company history), Projects (case studies and side projects), and Blog (articles with category/tag filtering). Monochromatic design system with dark/light mode toggle.

**Technologies:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next-themes, lucide-react, IBM Plex Mono (Google Fonts)

**Deployment:** Static export (`output: 'export'`). `npm run build` produces an `out/` directory. Deployable to Vercel, Netlify, GitHub Pages, S3/CloudFront, or any static host.

### 3.2. Backend Services

**Not applicable.** Fully static frontend. The newsletter form logs to console (needs integration with a real service). The CTA card opens a mailto link.

## 4. Data Stores

### 4.1. Static TypeScript Data Files

**Type:** In-memory TypeScript modules (`src/data/*.ts`)

**Purpose:** All portfolio content — projects, blog posts, experience history, and site constants. No database or CMS needed at current scale.

| File | Description | Key fields |
|------|-------------|------------|
| `projects.ts` | 3 projects | `slug`, `title`, `description`, `fullDescription`, `role`, `status` (shipped/in progress/archived), `tags[]`, `methods`, `timeline`, `team`, `outcomes[]` |
| `blogPosts.ts` | 4 blog posts | `slug`, `title`, `date`, `excerpt`, `content`, `readTime`, `category`, `tags[]` |
| `experience.ts` | 9 companies + stats | `name`, `role`, `period`, `logo?`, `monogram`; stats: years/countries/companies/AUM |
| `constants.ts` | Site metadata | `CONTACT` (email, phone, location), `SOCIAL` (linkedin, github, strava), `SITE` (name, title) |

**Lookup pattern:** `getProjectBySlug()` and `getBlogPostBySlug()` helpers find items by slug. `getCategories()` and `getAllTags()` derive filter options from blog data.

**Static generation:** Detail pages use `generateStaticParams()` to pre-render all slug routes at build time.

### 4.2. Browser State

**Type:** React useState hooks (client components only)

**Purpose:** Search filtering (projects, blog), category selection (blog sidebar), newsletter form input, theme preference.

**Persistence:** Theme choice persisted via `next-themes` (localStorage). All other state resets on navigation.

## 5. Design System

### Color Palette

Monochromatic only — no accent color. Hierarchy achieved through value contrast.

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

CSS custom properties defined in `src/app/globals.css` (`:root` for light, `.dark` for dark). Mapped to Tailwind color names in `tailwind.config.ts`.

### Typography

- **Headings/Labels/Mono:** IBM Plex Mono (400, 500, 600) via `next/font/google`
- **Body:** System sans-serif (`-apple-system, Segoe UI, system-ui, sans-serif`)

### Card System

Shared pattern across all pages:
- Background: `--surface`, Border: `1px solid --border`, Radius: `10px`
- Hover: border transitions to `--border-hover` (300ms)
- CTA variant: transparent background, dashed border

### Navigation

- **Header:** "EMMANUEL DIAZ" masthead (left) + social icons + theme toggle (right)
- **PageTabs:** Sticky segmented control below header — EXPERIENCE / PROJECTS / BLOG
- Active tab: `bg-bg` (blends with page), inactive: `bg-surface`

## 6. External Integrations

**None currently.** Fully self-contained.

| Integration | Purpose | Status |
|-------------|---------|--------|
| Newsletter service (e.g., Buttondown, Mailchimp) | Handle email subscriptions | TODO — currently logs to console |
| Analytics (e.g., Plausible, Vercel Analytics) | Usage tracking | Not implemented |

## 7. Deployment & Infrastructure

**Static Export:** `npm run build` generates pre-rendered HTML/CSS/JS in `out/`. No server required.

**Commands:**

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on `localhost:3000` |
| `npm run build` | Production build (static export to `out/`) |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint check |

**CI/CD:** None configured. Manual deployment.

## 8. Security Considerations

**Authentication:** Not applicable (static site, no user accounts)

**Key Practices:**
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- No sensitive data stored client-side
- Newsletter form has client-side email validation
- CSP and HTTP headers depend on hosting configuration

## 9. Company Logos

Logo images go in `public/images/logos/`. Referenced by the `logo` field in `src/data/experience.ts`.

- Format: PNG or SVG, square, optimized for 42x42px display
- Fallback: Companies without a `logo` field display a monogram (initials in mono font)
- Currently configured for: Rappi, Nubank, BlackRock, Daimler AG

## 10. Project Identification

**Project Name:** Personal Portfolio Website

**Repository:** https://github.com/EmmanuelDiaz95/personal-web.git

**Owner:** Emmanuel Diaz

**Date of Last Update:** 2026-03-10
