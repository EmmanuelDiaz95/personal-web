# Architecture Overview

This document serves as a critical, living template designed to equip agents with a rapid and comprehensive understanding of the codebase's architecture, enabling efficient navigation and effective contribution from day one. Update this document as the codebase evolves.

## 1. Project Structure

This section provides a high-level overview of the project's directory and file structure, categorised by architectural layer or major functional area. It is essential for quickly navigating the codebase, locating relevant files, and understanding the overall organization and separation of concerns.

```
personal-web/
├── public/                          # Publicly accessible static assets
│   ├── index.html                   # HTML template with SEO & Open Graph meta tags
│   ├── manifest.json                # PWA manifest (standalone display, blue theme)
│   ├── favicon.ico                  # Site favicon
│   ├── logo192.png                  # PWA icon (192x192)
│   ├── logo512.png                  # PWA icon (512x512)
│   ├── robots.txt                   # Search engine crawling rules
│   └── images/
│       └── main_page.jpeg           # Profile photo for HomePage
├── src/                             # Main application source code
│   ├── components/
│   │   ├── layout/                  # Persistent shell (always rendered)
│   │   │   ├── Header.js            # Sticky top bar: nav, search toggle, theme toggle
│   │   │   ├── Navigation.js        # NavLink buttons: About, Projects, Blog, Contact
│   │   │   └── Footer.js            # Fixed bottom bar: copyright, social links
│   │   ├── pages/                   # Route-level components (all lazy-loaded)
│   │   │   ├── HomePage.js          # Landing / About section with profile photo & bio
│   │   │   ├── ProjectsPage.js      # Projects listing grid
│   │   │   ├── ProjectDetailPage.js # Individual project view (slug-based lookup)
│   │   │   ├── BlogPage.js          # Blog posts listing
│   │   │   ├── BlogDetailPage.js    # Individual blog post view (slug-based lookup)
│   │   │   ├── ContactPage.js       # Contact info + form (two-column layout)
│   │   │   └── NotFoundPage.js      # 404 error page with "Go Home" link
│   │   └── ui/                      # Reusable presentational components
│   │       ├── ProjectCard.js       # Project preview card (image, title, methods, link)
│   │       ├── BlogPostCard.js      # Blog post preview card (date, excerpt, category)
│   │       ├── SearchBar.js         # Conditional search input overlay
│   │       └── ContactForm.js       # Validated contact form (simulated submission)
│   ├── contexts/                    # React Context providers (global state)
│   │   └── ThemeContext.js          # ThemeProvider + useTheme() hook for dark mode
│   ├── hooks/                       # Custom React hooks
│   │   ├── useDarkMode.js           # Dark/light mode toggle + DOM class management
│   │   └── useSearch.js             # Global search across projects and blog posts
│   ├── data/                        # Static data layer (no backend)
│   │   ├── projects.js              # Project objects array + getProjectBySlug()
│   │   ├── blogPosts.js             # Blog post objects array + getBlogPostBySlug()
│   │   └── constants.js             # CONTACT_INFO, SOCIAL_LINKS, CURRENT_YEAR
│   ├── App.js                       # Root component: ThemeProvider > Router > AppContent
│   ├── App.test.js                  # Smoke tests (navigation rendering, heading check)
│   ├── index.js                     # React entry point (renders App into #root)
│   ├── index.css                    # Tailwind CSS directives (@tailwind base/components/utilities)
│   ├── reportWebVitals.js           # Web Vitals performance monitoring (CLS, FID, FCP, LCP, TTFB)
│   └── setupTests.js               # Jest setup (@testing-library/jest-dom)
├── learning/                        # Learning materials (not part of the app)
│   ├── README.md
│   ├── LEARNING_PLAN.md
│   └── exercises/
├── tailwind.config.js               # Tailwind: darkMode 'class', no custom theme extensions
├── postcss.config.js                # PostCSS: tailwindcss + autoprefixer
├── .eslintrc.json                   # ESLint: react-app + jsx-a11y accessibility rules
├── .prettierrc                      # Prettier: single quotes, 100-char width, trailing commas
├── .eslintignore                    # ESLint ignore patterns
├── .prettierignore                  # Prettier ignore patterns
├── .nvmrc                           # Node version: v14.17.0
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies and scripts
├── CONTRIBUTING.md                  # Setup and contribution guide
├── CLAUDE.md                        # Agent-oriented project documentation
└── ARCHITECTURE.md                  # This document
```

## 2. High-Level System Diagram

This is a **static, frontend-only single-page application** with no backend services. All content is embedded in JavaScript data files and served client-side.

```
                          ┌──────────────────────────────────────────────┐
                          │              Browser (Client)                │
                          │                                              │
[User] <──────────────>   │  ┌──────────────────────────────────────┐    │
                          │  │           React Application           │    │
                          │  │                                        │    │
                          │  │  ThemeProvider (dark/light mode)       │    │
                          │  │    └── BrowserRouter                   │    │
                          │  │          └── AppContent                │    │
                          │  │               ├── Header + SearchBar   │    │
                          │  │               ├── Routes (lazy-loaded) │    │
                          │  │               │    ├── HomePage         │    │
                          │  │               │    ├── ProjectsPage     │    │
                          │  │               │    ├── ProjectDetailPage│    │
                          │  │               │    ├── BlogPage         │    │
                          │  │               │    ├── BlogDetailPage   │    │
                          │  │               │    ├── ContactPage      │    │
                          │  │               │    └── NotFoundPage     │    │
                          │  │               └── Footer               │    │
                          │  │                                        │    │
                          │  │  ┌─────────────────────────────┐       │    │
                          │  │  │  Static Data Layer (src/data)│       │    │
                          │  │  │  projects.js | blogPosts.js  │       │    │
                          │  │  │  constants.js                │       │    │
                          │  │  └─────────────────────────────┘       │    │
                          │  └──────────────────────────────────────┘    │
                          └──────────────────────────────────────────────┘

Data Flow:
  Static Data (data/*.js) ──> Custom Hooks (useSearch) ──> App Component
                                                              │
  ThemeContext (useDarkMode) ───────────────────────────────>  │
                                                              ▼
                                                    Layout Components
                                                    (Header, Footer)
                                                              │
                                                              ▼
                                                    Page Components
                                                    (via React Router)
                                                              │
                                                              ▼
                                                    UI Components
                                                    (Cards, Forms, SearchBar)
```

## 3. Key Components

### 3.1. Frontend

**Name:** Personal Portfolio Web App

**Description:** A single-page application serving as a professional portfolio for a Tech-Finance Professional based in Monterrey, Mexico. Users can browse project case studies, read blog posts about urban design and technology, and submit a contact form. Features include dark/light mode toggle, global search across all content, and SEO-optimized markup.

**Technologies:** React 18.3.1, React Router DOM 6.30.2, Tailwind CSS 3.4.13, Lucide React (icons), Create React App 5.0.1, PostCSS, Autoprefixer

**Deployment:** Static build (`npm run build` produces `build/` directory). Suitable for any static hosting (Vercel, Netlify, GitHub Pages, S3/CloudFront). No server-side rendering.

### 3.2. Backend Services

**Not applicable.** This is a fully static frontend application with no backend. The contact form currently simulates submission via `console.log` and `setTimeout` (see `ContactForm.js`). A backend or third-party form service would need to be integrated for real form handling.

## 4. Data Stores

### 4.1. Static JavaScript Data Files

**Name:** Embedded Content Store

**Type:** In-memory JavaScript modules (`src/data/*.js`)

**Purpose:** Stores all portfolio content — project case studies, blog posts, and site-wide constants. Eliminates the need for a database or CMS at the current scale.

**Key files:**

| File | Description | Schema highlights |
|------|-------------|-------------------|
| `projects.js` | Array of 2 project objects | `slug`, `title`, `image`, `description`, `fullDescription`, `role`, `methods`, `timeline`, `team`, `outcomes[]` |
| `blogPosts.js` | Array of 3 blog post objects | `id`, `slug`, `title`, `date`, `excerpt`, `fullContent`, `readTime`, `category` |
| `constants.js` | Site metadata | `CONTACT_INFO` (email, phone, location), `SOCIAL_LINKS` (linkedin, github, twitter), `CURRENT_YEAR` |

**Lookup pattern:** Both `projects.js` and `blogPosts.js` export a `getBySlug()` helper function used by detail pages to match the `:slug` route param.

### 4.2. Browser State

**Name:** React State (in-memory)

**Type:** React Context + useState hooks

**Purpose:** Manages UI state (dark mode, search visibility, form data). No data persists across page refreshes — there is no `localStorage` or `sessionStorage` usage currently.

## 5. External Integrations / APIs

**None currently.** The application is fully self-contained with no external API calls.

**Planned / potential integrations:**

| Integration | Purpose | Status |
|-------------|---------|--------|
| Form submission service (e.g., Formspree, EmailJS) | Handle contact form submissions | TODO (see `ContactForm.js`) |
| Headless CMS (e.g., Contentful, Sanity) | Manage blog/project content externally | Not planned |
| Google Analytics / Plausible | Usage analytics | Not implemented |

## 6. Deployment & Infrastructure

**Cloud Provider:** Not yet configured for production deployment. The project produces a static `build/` directory suitable for any static host.

**Key Services Used:** Create React App's build toolchain (Webpack, Babel)

**CI/CD Pipeline:** None configured. No `.github/workflows` or CI configuration files present.

**Monitoring & Logging:**
- `reportWebVitals.js` is integrated for client-side performance metrics (CLS, FID, FCP, LCP, TTFB) but currently only logs to console
- No server-side monitoring (not applicable)

**Build & Dev Commands:**

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server on `localhost:3000` |
| `npm run build` | Production build to `build/` |
| `npm test` | Jest tests (watch mode) |
| `npm test -- --watchAll=false` | Jest single run |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format |
| `npm run format:check` | Prettier check |
| `npm run setup` | Nuclear reinstall (rm node_modules, clean cache, reinstall) |

## 7. Security Considerations

**Authentication:** Not applicable (static site, no user accounts)

**Authorization:** Not applicable

**Data Encryption:** Standard HTTPS when deployed to a hosting provider with TLS

**Key Security Practices:**
- External links use `rel="noopener noreferrer"` to prevent tab-nabbing
- Contact form includes client-side validation (email regex, required fields, minimum length)
- No sensitive data stored client-side
- Content Security Policy and other HTTP headers depend on hosting configuration (not set at app level)
- ESLint `jsx-a11y` plugin enforces accessibility best practices

## 8. Development & Testing Environment

**Local Setup Instructions:** See `CONTRIBUTING.md`. Requires Node.js >= 14.17.0 (pinned in `.nvmrc`).

**Testing Frameworks:**
- **Jest** (via react-scripts) — test runner
- **@testing-library/react** 13.4.0 — component rendering and queries
- **@testing-library/jest-dom** 5.17.0 — custom DOM matchers
- **@testing-library/user-event** 13.5.0 — user interaction simulation

**Current test coverage:** Minimal — only `App.test.js` with 2 tests:
1. Navigation elements render correctly (4 links)
2. HomePage heading contains expected text

**Code Quality Tools:**

| Tool | Config file | Purpose |
|------|-------------|---------|
| ESLint | `.eslintrc.json` | Linting with react-app + jsx-a11y rules |
| Prettier | `.prettierrc` | Formatting (single quotes, 100-char width, trailing commas ES5, semicolons, LF) |
| jsx-a11y | via ESLint plugin | Accessibility rule enforcement (warnings) |

**Key ESLint rules:**
- `no-console: warn` (console.warn/error allowed)
- `no-unused-vars: warn` (prefix with `_` to suppress)
- `react/prop-types: off`

## 9. Future Considerations / Roadmap

- **localStorage persistence for dark mode:** The `useDarkMode` hook resets theme on page refresh. Adding `localStorage` read/write would preserve user preference.
- **Real contact form submission:** Replace the simulated `setTimeout` in `ContactForm.js` with an actual API call (e.g., Formspree, EmailJS, or a custom backend endpoint).
- **Replace placeholder images:** All project images use `via.placeholder.com` URLs. Replace with optimized real assets.
- **Expand test coverage:** Add component-level tests for hooks (`useDarkMode`, `useSearch`), UI components, and page routing.
- **Search results page:** Currently navigates directly to the first match. Consider a dedicated search results view with filtering.
- **CI/CD pipeline:** Add GitHub Actions for automated linting, testing, and deployment on push.
- **Dynamic meta tags per route:** Improve SEO with route-specific `<title>` and Open Graph tags (e.g., via `react-helmet`).
- **Content management:** As content grows, consider migrating from static data files to a headless CMS.
- **Analytics integration:** Add privacy-respecting analytics (e.g., Plausible, Fathom) for usage insights.

## 10. Project Identification

**Project Name:** Personal Portfolio Website

**Repository URL:** https://github.com/EmmanuelDiaz95/personal-web.git

**Primary Contact/Team:** Emmanuel Diaz

**Date of Last Update:** 2026-03-09

## 11. Glossary / Acronyms

| Term | Definition |
|------|------------|
| **CRA** | Create React App — the React project bootstrapping tool used for this project |
| **SPA** | Single Page Application — the app loads once and handles routing client-side |
| **PWA** | Progressive Web App — the app includes a `manifest.json` for installability |
| **Slug** | A URL-safe string identifier used in routes (e.g., `/projects/choice-empowers`) |
| **Lazy Loading** | React.lazy() + Suspense pattern to code-split page components and reduce initial bundle size |
| **Dark Mode** | Theme toggled via React Context; adds/removes `dark` class on `<html>` element |
| **Tailwind CSS** | Utility-first CSS framework; all styling uses utility classes (no custom CSS files beyond directives) |
| **Lucide** | Icon library (`lucide-react`) used for all SVG icons throughout the app |
| **jsx-a11y** | ESLint plugin that enforces web accessibility best practices in JSX |
| **Web Vitals** | Google's metrics for measuring real-world user experience (CLS, FID, FCP, LCP, TTFB) |
