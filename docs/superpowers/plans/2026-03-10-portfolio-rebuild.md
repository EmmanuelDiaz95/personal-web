# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Emmanuel Diaz's personal portfolio as a Next.js 14 + Tailwind + TypeScript app with a monochromatic design system and three pages (Experience, Projects, Blog).

**Architecture:** Next.js App Router with file-based routing. Static data files (no backend). Shared root layout renders Header and BottomNav. Theme switching via `next-themes`. All styling via Tailwind utility classes with CSS custom properties for the color palette.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 4, next-themes, lucide-react, IBM Plex Mono (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-10-portfolio-rebuild-design.md`
**Mockup:** `.superpowers/brainstorm/28906-1773185933/full-mockup-v3.html`

---

## File Map

### New files to create

| File | Responsibility |
|------|----------------|
| `src/app/layout.tsx` | Root layout: HTML shell, font loading, ThemeProvider, Header, BottomNav |
| `src/app/page.tsx` | Landing page — renders Experience content |
| `src/app/projects/page.tsx` | Projects grid page with search |
| `src/app/projects/[slug]/page.tsx` | Project detail page |
| `src/app/blog/page.tsx` | Blog page with sidebar filters |
| `src/app/blog/[slug]/page.tsx` | Blog post detail page |
| `src/app/globals.css` | Tailwind directives + CSS custom properties for dark/light themes |
| `src/components/layout/Header.tsx` | Name masthead + theme toggle |
| `src/components/layout/BottomNav.tsx` | Fixed bottom navigation bar |
| `src/components/ui/ProjectCard.tsx` | Project card with number, status, title, desc, tags |
| `src/components/ui/BlogPostCard.tsx` | Blog article card with date, read time, title, excerpt, tags |
| `src/components/ui/CompanyCard.tsx` | Company card with logo, date, name, role |
| `src/components/ui/SearchBar.tsx` | Search input component |
| `src/components/ui/StatusBadge.tsx` | Pill badge for shipped/in progress/archived |
| `src/components/ui/TagPill.tsx` | Tag pill component |
| `src/components/ui/StatBlock.tsx` | Stat number + label block |
| `src/components/ui/CTACard.tsx` | Dashed-border CTA tile |
| `src/components/ui/NewsletterForm.tsx` | Email input + subscribe button |
| `src/components/ThemeToggle.tsx` | Moon/Sun icon theme switch button |
| `src/data/projects.ts` | Project data array + helper |
| `src/data/blogPosts.ts` | Blog post data array + helper |
| `src/data/experience.ts` | Companies, stats, skills data |
| `src/data/constants.ts` | Contact info, social links |
| `src/lib/utils.ts` | Shared utilities (cn classname helper) |
| `tailwind.config.ts` | Tailwind configuration with custom theme |
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `postcss.config.js` | PostCSS config for Tailwind |
| `.nvmrc` | Node version |

### Files to delete (old CRA app)

The entire `src/` directory from the old CRA app will be replaced. Key files being replaced:
- `src/App.js`, `src/index.js`, `src/App.css`, `src/index.css`
- `src/components/` (all old components)
- `src/data/` (old JS data files → new TS files)
- `src/hooks/` (old hooks)
- `src/context/` (old ThemeContext)
- `public/index.html` (Next.js handles this)
- `config-overrides.js`, `.eslintrc.json`, `.prettierrc` (will be reconfigured)

---

## Chunk 1: Project Scaffolding & Design System

### Task 1: Initialize Next.js project

This task replaces the CRA project with a fresh Next.js setup. We keep the git history, `public/images/`, and docs.

**Files:**
- Create: `package.json` (overwrite), `next.config.js`, `tsconfig.json`, `postcss.config.js`, `.nvmrc`
- Delete: Old CRA source files

- [ ] **Step 1: Back up data and assets**

```bash
cd /Users/emmanueldiaz/Documents/Main_Brain/projects/personal_portafolio/personal-web
mkdir -p /tmp/personal-web-backup
cp -r src/data /tmp/personal-web-backup/
cp -r public/images /tmp/personal-web-backup/
cp -r docs /tmp/personal-web-backup/
```

- [ ] **Step 2: Remove old CRA source files**

```bash
rm -rf src/ public/index.html public/manifest.json public/robots.txt
rm -f config-overrides.js .eslintrc.json .prettierrc
```

- [ ] **Step 3: Initialize Next.js with TypeScript and Tailwind**

```bash
cd /Users/emmanueldiaz/Documents/Main_Brain/projects/personal_portafolio/personal-web
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

If prompted about overwriting, accept. This creates the Next.js boilerplate.

- [ ] **Step 4: Install additional dependencies**

```bash
npm install next-themes lucide-react
```

- [ ] **Step 5: Restore assets and docs**

```bash
cp -r /tmp/personal-web-backup/images public/
cp -r /tmp/personal-web-backup/docs .
mkdir -p public/images/logos
```

- [ ] **Step 6: Set Node version**

Write `.nvmrc`:
```
22
```

- [ ] **Step 7: Configure next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

`output: 'export'` enables static site generation for hosting anywhere. `images.unoptimized` since we're doing static export.

- [ ] **Step 8: Verify it builds**

```bash
npm run dev
```

Open http://localhost:3000 — should show the Next.js default page.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: replace CRA with Next.js 14 + TypeScript + Tailwind"
```

---

### Task 2: Design system — CSS custom properties and Tailwind config

**Files:**
- Create: `src/app/globals.css`, `tailwind.config.ts`

- [ ] **Step 1: Write globals.css with theme variables**

Create `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #f5f5f5;
    --surface: #ebebeb;
    --border: #d4d4d4;
    --border-hover: #b0b0b0;
    --text-primary: #0a0a0a;
    --text-secondary: #555555;
    --text-muted: #888888;
    --text-faint: #bbbbbb;
    --cta-border: #cccccc;
    --badge-bg: #e0e0e0;
    --logo-bg: #e0e0e0;
    --logo-border: #d0d0d0;
    --nav-bg: rgba(245, 245, 245, 0.92);
  }

  .dark {
    --bg: #0a0a0a;
    --surface: #111111;
    --border: #1a1a1a;
    --border-hover: #2a2a2a;
    --text-primary: #ffffff;
    --text-secondary: #888888;
    --text-muted: #555555;
    --text-faint: #333333;
    --cta-border: #272727;
    --badge-bg: #1a1a1a;
    --logo-bg: #181818;
    --logo-border: #222222;
    --nav-bg: rgba(10, 10, 10, 0.92);
  }

  body {
    background-color: var(--bg);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

- [ ] **Step 2: Write tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'SF Mono', 'Fira Code', 'monospace'],
        sans: ['-apple-system', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1440px',
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        'cta-border': 'var(--cta-border)',
        'badge-bg': 'var(--badge-bg)',
        'logo-bg': 'var(--logo-bg)',
        'logo-border': 'var(--logo-border)',
        'nav-bg': 'var(--nav-bg)',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat: add monochromatic design system with dark/light CSS variables"
```

---

### Task 3: Utility helpers

**Files:**
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Write cn helper**

```ts
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add cn classname utility"
```

---

### Task 4: Data layer — TypeScript data files

Port the existing JS data to typed TypeScript files and add experience data from the CV.

**Files:**
- Create: `src/data/projects.ts`, `src/data/blogPosts.ts`, `src/data/experience.ts`, `src/data/constants.ts`

- [ ] **Step 1: Write project types and data**

Create `src/data/projects.ts`:

```ts
export type ProjectStatus = 'shipped' | 'in progress' | 'archived';

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  role: string;
  status: ProjectStatus;
  tags: string[];
  methods: string;
  timeline: string;
  team: string;
  outcomes: string[];
}

export const projects: Project[] = [
  {
    slug: 'choice-empowers',
    title: 'Choice Empowers',
    description: 'Home building platform making affordable housing accessible through intuitive UX design.',
    fullDescription: 'Choice Empowers is a comprehensive platform designed to democratize home building for families seeking affordable housing solutions.\n\nThe project involved extensive user research to understand the pain points families face when trying to design and build their homes. Through field studies and user interviews, we identified key barriers in the existing platform.\n\nOur team conducted card sorting exercises to reorganize the information architecture, making it more intuitive for users with varying levels of technical expertise.',
    role: 'Lead UX Designer + Researcher',
    status: 'shipped',
    tags: ['UX Design', 'Research', 'Prototyping'],
    methods: 'User interviews, field studies, card sorting, usability testing, paper prototyping, rapid prototyping',
    timeline: '6 months',
    team: '3 designers, 2 developers',
    outcomes: [
      'Increased user completion rate by 40%',
      'Reduced support tickets by 25%',
      'Improved user satisfaction scores',
    ],
  },
  {
    slug: 'proyectos-productivos',
    title: 'Proyectos Productivos',
    description: 'Digital government application process for Monterrey, Mexico. 60% faster processing.',
    fullDescription: 'Proyectos Productivos aimed to transform the bureaucratic process of applying for city funding into a streamlined digital experience.\n\nWorking closely with the municipality of Monterrey, we mapped out the existing paper-based processes and identified opportunities for digitization while ensuring accessibility for users with limited technical literacy.\n\nThe project required careful consideration of interoperability with existing government systems and data privacy requirements.',
    role: 'UX Designer + Researcher',
    status: 'shipped',
    tags: ['Gov Tech', 'UX', 'Process Design'],
    methods: 'Process mapping, field study, user interviews, interoperability analysis, data review',
    timeline: '4 months',
    team: '2 designers, 3 developers, 1 project manager',
    outcomes: [
      'Reduced application processing time by 60%',
      'Increased application submissions by 35%',
      'Enabled remote access for rural business owners',
    ],
  },
  {
    slug: 'tarahumara-ultra-tracker',
    title: 'Tarahumara Ultra Tracker',
    description: 'Training plan manager with Garmin Connect integration for a 59km ultramarathon.',
    fullDescription: 'A CLI-based training plan manager for a 30-week ultra marathon preparation. Syncs with Garmin Connect to track actual workouts against planned training targets.\n\nBuilt with Python, it manages a structured training plan with daily workouts for the first 4 weeks and weekly targets for weeks 5-30. Includes sync, report, and status scripts.',
    role: 'Developer',
    status: 'in progress',
    tags: ['Python', 'Health', 'CLI'],
    methods: 'Python, garminconnect library, JSON data management',
    timeline: 'Ongoing',
    team: 'Solo',
    outcomes: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Write blog post types and data**

Create `src/data/blogPosts.ts`:

```ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'intersection-urban-design-technology',
    title: 'The Intersection of Urban Design and Technology',
    date: 'March 15, 2023',
    excerpt: 'Exploring how technology is reshaping urban spaces and community engagement in city planning.',
    content: 'Technology is fundamentally transforming how we design, plan, and experience urban spaces. From smart city initiatives to digital participation platforms, the intersection of urban design and technology offers unprecedented opportunities for creating more responsive, inclusive, and sustainable cities.\n\nIn this article, we explore how emerging technologies are enabling new forms of community engagement, data-driven decision making, and innovative approaches to addressing urban challenges. We examine case studies from cities around the world that are leveraging technology to reimagine the relationship between people, place, and infrastructure.',
    readTime: '5 min read',
    category: 'Urban Design',
    tags: ['UX', 'urban'],
  },
  {
    slug: 'participatory-design-in-practice',
    title: 'Participatory Design in Practice',
    date: 'February 28, 2023',
    excerpt: 'A deep dive into successful participatory design methodologies and their impact on community outcomes.',
    content: 'Participatory design is more than a methodology—it\'s a fundamental shift in how we approach problem-solving and decision-making. By centering the voices and experiences of those most affected by design decisions, we create solutions that are more effective, equitable, and sustainable.\n\nThis article examines successful participatory design processes, from initial community engagement through implementation and evaluation. We discuss key principles, common challenges, and practical strategies for facilitating meaningful participation across diverse communities.',
    readTime: '7 min read',
    category: 'Design Methods',
    tags: ['UX', 'research'],
  },
  {
    slug: 'spatial-justice-digital-age',
    title: 'Spatial Justice in the Digital Age',
    date: 'February 10, 2023',
    excerpt: 'How digital tools can help address spatial inequalities and create more equitable urban environments.',
    content: 'Spatial justice examines how power, resources, and opportunities are distributed across geographic space. In the digital age, new technologies offer both opportunities and challenges for addressing spatial inequalities.\n\nThis article explores how digital mapping, data visualization, and online participation platforms can make spatial inequalities visible and empower communities to advocate for change. We also examine the risks of digital divides and technological solutions that may reinforce existing inequalities if not implemented thoughtfully.',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['AI', 'fintech'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

export function getAllTags(): string[] {
  return [...new Set(blogPosts.flatMap((p) => p.tags))];
}
```

- [ ] **Step 3: Write experience data**

Create `src/data/experience.ts`:

```ts
export interface Company {
  name: string;
  role: string;
  period: string;
  logo?: string;
  monogram: string;
}

export interface Stats {
  label: string;
  value: string;
}

export const profileSummary = 'Finance operations leader with 7+ years building treasury and finance systems from scratch at high-growth startups across Latin America. Comfortable owning the full finance ops stack in fast-moving environments where structure doesn\'t exist yet.';

export const stats: Stats[] = [
  { value: '7+', label: 'YEARS' },
  { value: '8+', label: 'COUNTRIES' },
  { value: '9', label: 'COMPANIES' },
  { value: '$105M', label: 'AUM MANAGED' },
];

export const companies: Company[] = [
  { name: 'Cascade Debt', role: 'Capital Markets Ops Manager', period: '2025 – Present', monogram: 'CD' },
  { name: 'Vaas', role: 'Ops & Implementations Manager', period: '2024 – 2025', monogram: 'V' },
  { name: 'Concourse', role: 'Product · YC / a16z', period: '2024', monogram: 'C' },
  { name: 'Rappi', role: 'Global FP&A Treasury Manager', period: '2023 – 2024', logo: '/images/logos/rappi.png', monogram: 'R' },
  { name: 'Nowports', role: 'Treasury Leader · 8 countries', period: '2022 – 2023', monogram: 'NP' },
  { name: 'Mundi', role: 'Treasury Leader', period: '2022', monogram: 'M' },
  { name: 'Nubank', role: 'Finance Ops & Treasury Specialist', period: '2021 – 2022', logo: '/images/logos/nubank.png', monogram: 'Nu' },
  { name: 'BlackRock', role: 'Corporate Treasury LatAm', period: '2020 – 2021', logo: '/images/logos/blackrock.png', monogram: 'BR' },
  { name: 'Daimler AG', role: 'Cash Management, NAFTA', period: '2018 – 2020', logo: '/images/logos/daimler.png', monogram: 'D' },
];

export const earlierRoles = '+ ED&F Man · Sensient Technologies';
```

- [ ] **Step 4: Write constants**

Create `src/data/constants.ts`:

```ts
export const CONTACT = {
  email: 'emmanueldc95@hotmail.com',
  phone: '+52 722 382 6544',
  location: 'Mexico City, Mexico',
};

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/emmanuel-diaz-50643093/',
  github: 'https://github.com/EmmanuelDiaz95',
};

export const SITE = {
  name: 'EMMANUEL DIAZ',
  title: 'Emmanuel Diaz — Finance Operations & Projects',
};
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data layer with projects, blog posts, experience, and constants"
```

---

## Chunk 2: Layout Shell & Shared Components

### Task 5: ThemeToggle component

**Files:**
- Create: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Write ThemeToggle**

```tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg border border-border" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-border-hover hover:text-text-primary transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle component with next-themes"
```

---

### Task 6: Header component

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Write Header**

```tsx
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center pb-11">
      <Link href="/" className="font-mono text-xl font-semibold tracking-[5px] text-text-primary transition-colors duration-300">
        EMMANUEL DIAZ
      </Link>
      <ThemeToggle />
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add Header component with name masthead and theme toggle"
```

---

### Task 7: BottomNav component

**Files:**
- Create: `src/components/layout/BottomNav.tsx`

- [ ] **Step 1: Write BottomNav**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/data/constants';

const navItems = [
  { href: '/', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg backdrop-blur-[12px] border-t border-border z-50 px-16 max-md:px-5 transition-all duration-300">
      <div className="max-w-page mx-auto flex gap-9 items-center font-mono text-sm py-4">
        {navItems.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors duration-150',
                isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {label}
            </Link>
          );
        })}
        <span className="ml-auto text-xs text-text-muted transition-colors duration-300">
          {CONTACT.email}
        </span>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/BottomNav.tsx
git commit -m "feat: add BottomNav with active state and email"
```

---

### Task 8: Root layout

**Files:**
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Write root layout with ThemeProvider, fonts, Header, BottomNav**

```tsx
import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { SITE } from '@/data/constants';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SITE.title,
  description: 'Finance operations leader. Projects, blog, and experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="max-w-page mx-auto px-16 max-lg:px-10 max-md:px-5 pt-9 pb-24 min-h-screen">
            <Header />
            <main>{children}</main>
          </div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify layout renders**

```bash
npm run dev
```

Open http://localhost:3000 — should see "EMMANUEL DIAZ" header, theme toggle, and bottom nav on a dark background.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add root layout with ThemeProvider, Header, and BottomNav"
```

---

### Task 9: Shared UI components

**Files:**
- Create: `src/components/ui/StatusBadge.tsx`, `src/components/ui/TagPill.tsx`, `src/components/ui/StatBlock.tsx`, `src/components/ui/SearchBar.tsx`, `src/components/ui/CTACard.tsx`, `src/components/ui/NewsletterForm.tsx`

- [ ] **Step 1: Write StatusBadge**

```tsx
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/projects';

const statusStyles: Record<ProjectStatus, string> = {
  shipped: 'text-text-secondary',
  'in progress': 'text-text-muted',
  archived: 'text-text-faint',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn('font-mono text-[11px] px-3.5 py-0.5 rounded-[14px] bg-badge-bg transition-all duration-300', statusStyles[status])}>
      {status}
    </span>
  );
}
```

- [ ] **Step 2: Write TagPill**

```tsx
export default function TagPill({ label }: { label: string }) {
  return (
    <span className="font-mono text-[11px] text-text-muted bg-bg px-3 py-1 rounded-xl transition-all duration-300">
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Write StatBlock**

```tsx
export default function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-[32px] font-semibold text-text-primary transition-colors duration-300">
        {value}
      </div>
      <div className="font-mono text-[11px] tracking-[2px] text-text-muted mt-1 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write SearchBar**

```tsx
'use client';

export default function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-surface border border-border rounded-lg px-4 py-2.5 font-mono text-[13px] text-text-muted w-[260px] max-md:w-full outline-none focus:border-border-hover transition-all duration-300"
    />
  );
}
```

- [ ] **Step 5: Write CTACard**

```tsx
import Link from 'next/link';

export default function CTACard() {
  return (
    <Link
      href="mailto:emmanueldc95@hotmail.com"
      className="bg-transparent border border-dashed border-cta-border rounded-[10px] p-7 flex flex-col items-center justify-center text-center hover:border-text-muted transition-all duration-300 min-h-[200px]"
    >
      <div className="text-4xl text-text-faint mb-3 font-light transition-colors duration-300">+</div>
      <div className="text-[15px] text-text-muted mb-2 transition-colors duration-300">Want to collaborate?</div>
      <div className="font-mono text-sm text-text-primary underline underline-offset-[3px] transition-colors duration-300">
        Let&apos;s talk &rarr;
      </div>
    </Link>
  );
}
```

- [ ] **Step 6: Write NewsletterForm**

```tsx
'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="border border-dashed border-cta-border rounded-[10px] p-5 transition-all duration-300">
      <div className="text-[15px] font-medium mb-1">Stay updated</div>
      <div className="text-[13px] text-text-secondary mb-3.5 transition-colors duration-300">New articles, monthly.</div>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-surface border border-border rounded-md px-3.5 py-2.5 text-[13px] text-text-muted w-full mb-2.5 outline-none font-mono transition-all duration-300"
        required
      />
      <button
        type="submit"
        className="bg-text-primary text-bg border-none rounded-md px-4 py-2.5 text-[13px] font-semibold cursor-pointer w-full font-sans transition-all duration-300"
      >
        Subscribe
      </button>
    </form>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shared UI components (StatusBadge, TagPill, StatBlock, SearchBar, CTACard, NewsletterForm)"
```

---

## Chunk 3: Page Components

### Task 10: CompanyCard component + Experience page (landing)

**Files:**
- Create: `src/components/ui/CompanyCard.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Write CompanyCard**

```tsx
import Image from 'next/image';
import type { Company } from '@/data/experience';

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="bg-surface border border-border rounded-[10px] p-7 hover:border-border-hover transition-all duration-300 cursor-default">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-[42px] h-[42px] rounded-[10px] bg-logo-bg border border-logo-border flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300">
          {company.logo ? (
            <Image
              src={company.logo}
              alt={company.name}
              width={42}
              height={42}
              className="object-cover rounded-[10px]"
            />
          ) : (
            <span className="font-mono text-sm font-semibold text-text-muted transition-colors duration-300">
              {company.monogram}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-text-muted transition-colors duration-300">
          {company.period}
        </span>
      </div>
      <div className="text-[17px] font-semibold mb-1 transition-colors duration-300">{company.name}</div>
      <div className="text-sm text-text-secondary transition-colors duration-300">{company.role}</div>
    </div>
  );
}
```

- [ ] **Step 2: Write Experience page (root page.tsx)**

```tsx
import StatBlock from '@/components/ui/StatBlock';
import CompanyCard from '@/components/ui/CompanyCard';
import { profileSummary, stats, companies, earlierRoles } from '@/data/experience';

export default function ExperiencePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Experience
        </h1>
      </div>

      <p className="text-[17px] text-text-secondary leading-[1.7] mb-8 max-w-[740px] transition-colors duration-300">
        {profileSummary}
      </p>

      <div className="flex gap-14 py-6 border-t border-b border-border mb-8 flex-wrap transition-colors duration-300">
        {stats.map((stat) => (
          <StatBlock key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4">
        {companies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>

      <p className="font-mono text-[13px] text-text-muted text-center mt-2 transition-colors duration-300">
        {earlierRoles}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Verify Experience page renders**

```bash
npm run dev
```

Open http://localhost:3000 — should show the Experience page with stats, company cards, and bottom nav.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/CompanyCard.tsx src/app/page.tsx
git commit -m "feat: add Experience page as landing with stats banner and company cards"
```

---

### Task 11: ProjectCard component + Projects page

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`, `src/app/projects/page.tsx`

- [ ] **Step 1: Write ProjectCard**

```tsx
import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';
import TagPill from '@/components/ui/TagPill';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="bg-surface border border-border rounded-[10px] p-7 hover:border-border-hover transition-all duration-300 block"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-[13px] text-text-faint transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        <StatusBadge status={project.status} />
      </div>
      <h2 className="text-lg font-semibold mb-2 leading-tight transition-colors duration-300">{project.title}</h2>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-4 transition-colors duration-300">{project.description}</p>
      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write Projects page**

```tsx
'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import SearchBar from '@/components/ui/SearchBar';
import CTACard from '@/components/ui/CTACard';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) =>
    [p.title, p.description, ...p.tags].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-7 max-md:flex-col max-md:items-start max-md:gap-4">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Selected Work
        </h1>
        <SearchBar placeholder="Search projects..." value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-10">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
        <CTACard />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify Projects page**

```bash
npm run dev
```

Open http://localhost:3000/projects — should show project cards grid with search and CTA tile.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProjectCard.tsx src/app/projects/page.tsx
git commit -m "feat: add Projects page with card grid, search, and CTA tile"
```

---

### Task 12: Project detail page

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Write project detail page**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects, getProjectBySlug } from '@/data/projects';
import StatusBadge from '@/components/ui/StatusBadge';
import TagPill from '@/components/ui/TagPill';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary transition-colors duration-150 mb-8"
      >
        <ArrowLeft size={14} /> Back to projects
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <StatusBadge status={project.status} />
      </div>

      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-[10px] p-5">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-2">ROLE</div>
          <div className="text-sm">{project.role}</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-5">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-2">TIMELINE</div>
          <div className="text-sm">{project.timeline}</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-5">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-2">TEAM</div>
          <div className="text-sm">{project.team}</div>
        </div>
      </div>

      <div className="text-[15px] text-text-secondary leading-relaxed mb-8 whitespace-pre-line transition-colors duration-300">
        {project.fullDescription}
      </div>

      {project.outcomes.length > 0 && (
        <div className="mb-8">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-4">OUTCOMES</div>
          <ul className="space-y-2">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-text-muted mt-0.5">—</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/\\[slug\\]/page.tsx
git commit -m "feat: add project detail page with role, timeline, outcomes"
```

---

### Task 13: BlogPostCard component + Blog page

**Files:**
- Create: `src/components/ui/BlogPostCard.tsx`, `src/app/blog/page.tsx`

- [ ] **Step 1: Write BlogPostCard**

```tsx
import Link from 'next/link';
import TagPill from '@/components/ui/TagPill';
import type { BlogPost } from '@/data/blogPosts';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-surface border border-border rounded-[10px] p-7 hover:border-border-hover transition-all duration-300 block"
    >
      <div className="flex justify-between font-mono text-xs text-text-muted mb-3 transition-colors duration-300">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      <h2 className="text-lg font-medium mb-1.5 leading-tight transition-colors duration-300">{post.title}</h2>
      <p className="text-[15px] text-text-secondary leading-relaxed transition-colors duration-300">{post.excerpt}</p>
      <div className="mt-3 flex gap-2">
        <TagPill label={post.category} />
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write Blog page with sidebar**

```tsx
'use client';

import { useState } from 'react';
import { blogPosts, getCategories, getAllTags } from '@/data/blogPosts';
import BlogPostCard from '@/components/ui/BlogPostCard';
import SearchBar from '@/components/ui/SearchBar';
import TagPill from '@/components/ui/TagPill';
import NewsletterForm from '@/components/ui/NewsletterForm';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = getCategories();
  const tags = getAllTags();

  const filtered = blogPosts.filter((post) => {
    const matchesSearch = [post.title, post.excerpt, post.category]
      .some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Blog
        </h1>
      </div>

      <div className="flex gap-10 max-md:flex-col">
        {/* Sidebar */}
        <aside className="w-60 max-md:w-full shrink-0">
          <div className="mb-7">
            <SearchBar placeholder="Search articles..." value={search} onChange={setSearch} />
          </div>

          <div className="mb-7">
            <div className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase mb-3.5 transition-colors duration-300">Categories</div>
            <div
              onClick={() => setActiveCategory('All')}
              className={cn(
                'text-[15px] py-1.5 cursor-pointer transition-colors duration-150',
                activeCategory === 'All' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              All
            </div>
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'text-[15px] py-1.5 cursor-pointer transition-colors duration-150',
                  activeCategory === cat ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {cat}
              </div>
            ))}
          </div>

          <div className="mb-7">
            <div className="font-mono text-[11px] tracking-[2px] text-text-muted uppercase mb-3.5 transition-colors duration-300">Tags</div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          </div>

          <NewsletterForm />
        </aside>

        {/* Articles */}
        <div className="flex-1 flex flex-col gap-4">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
          {filtered.length === 0 && (
            <p className="text-text-muted font-mono text-sm">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify Blog page**

```bash
npm run dev
```

Open http://localhost:3000/blog — should show sidebar with categories/tags/newsletter and article cards.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/BlogPostCard.tsx src/app/blog/page.tsx
git commit -m "feat: add Blog page with sidebar filters, search, categories, tags, and newsletter"
```

---

### Task 14: Blog post detail page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Write blog detail page**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts';
import TagPill from '@/components/ui/TagPill';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary transition-colors duration-150 mb-8"
      >
        <ArrowLeft size={14} /> Back to blog
      </Link>

      <div className="flex justify-between font-mono text-xs text-text-muted mb-4 transition-colors duration-300">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6 leading-tight">{post.title}</h1>

      <div className="text-[15px] text-text-secondary leading-relaxed whitespace-pre-line mb-8 transition-colors duration-300">
        {post.content}
      </div>

      <div className="flex gap-2 flex-wrap">
        <TagPill label={post.category} />
        {post.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/blog/\\[slug\\]/page.tsx
git commit -m "feat: add blog post detail page"
```

---

## Chunk 4: Polish & Ship

### Task 15: 404 page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Write not-found page**

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="font-mono text-6xl font-semibold text-text-faint mb-4">404</div>
      <p className="text-text-secondary mb-6">Page not found.</p>
      <Link
        href="/"
        className="font-mono text-sm text-text-primary underline underline-offset-[3px] hover:text-text-secondary transition-colors duration-150"
      >
        Back to home &rarr;
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add 404 page"
```

---

### Task 16: Build verification and cleanup

- [ ] **Step 1: Run production build**

```bash
cd /Users/emmanueldiaz/Documents/Main_Brain/projects/personal_portafolio/personal-web
npm run build
```

Expected: Build succeeds with no errors. Static pages generated for all routes.

- [ ] **Step 2: Fix any build errors**

Address any TypeScript or build errors that come up. Common ones:
- Missing type imports
- `Image` component needing width/height
- CSS class conflicts

- [ ] **Step 3: Test all routes manually**

```bash
npm run dev
```

Test:
- `http://localhost:3000` → Experience page with stats, companies
- `http://localhost:3000/projects` → Project grid with search, CTA
- `http://localhost:3000/projects/choice-empowers` → Project detail
- `http://localhost:3000/blog` → Blog with sidebar, categories, newsletter
- `http://localhost:3000/blog/intersection-urban-design-technology` → Blog post
- `http://localhost:3000/nonexistent` → 404 page
- Theme toggle works on every page
- Bottom nav active state is correct on each page

- [ ] **Step 4: Update CLAUDE.md**

Update the project's `CLAUDE.md` to reflect the new stack and commands.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: build verification and CLAUDE.md update for Next.js rebuild"
```

---

## Summary

| Chunk | Tasks | What it delivers |
|-------|-------|------------------|
| 1: Scaffolding & Design System | Tasks 1–4 | Next.js project, CSS variables, Tailwind config, typed data |
| 2: Layout Shell & Shared Components | Tasks 5–9 | Theme toggle, Header, BottomNav, root layout, 6 UI components |
| 3: Page Components | Tasks 10–14 | All 3 pages + 2 detail pages + 2 more UI components |
| 4: Polish & Ship | Tasks 15–16 | 404 page, build verification, docs update |

Total: 16 tasks, ~60 steps. Each task produces a working commit.
