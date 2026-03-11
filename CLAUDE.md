# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React personal portfolio website (Create React App + Tailwind CSS) for a UX designer based in Monterrey, Mexico. Showcases projects and blog posts.

## Development Commands

- `npm start` - Dev server on localhost:3000
- `npm run build` - Production build
- `npm test` - Run tests with Jest (interactive watch mode; use `npm test -- --watchAll=false` for single run)
- `npm test -- --testPathPattern=App.test` - Run a single test file
- `npm run lint` - ESLint check
- `npm run lint:fix` - ESLint auto-fix
- `npm run format` - Prettier format
- `npm run format:check` - Prettier check
- `npm run setup` - Nuclear reinstall (deletes node_modules, clears cache, reinstalls)

Node.js >= 14.17.0 required.

## Architecture

### Routing & Code Splitting

`App.js` is the top-level component. It wraps everything in `ThemeProvider` > `BrowserRouter` > `AppContent`. All page components are lazy-loaded via `React.lazy()` with a shared `Suspense` fallback. Routes:

- `/` `/projects` `/projects/:slug` `/blog` `/blog/:slug` `/contact` `*` (404)

### Component Organization

- `src/components/layout/` — Header, Footer, Navigation (shared shell, always rendered)
- `src/components/pages/` — One component per route, all lazy-loaded
- `src/components/ui/` — Reusable pieces: ProjectCard, BlogPostCard, SearchBar, ContactForm

### Data Layer

No backend. Content lives in static JS files under `src/data/`:
- `projects.js` — Array of project objects with `slug` field; exported `getProjectBySlug()` helper
- `blogPosts.js` — Array of blog post objects with `slug` field
- `constants.js` — Contact info, social links, current year

Detail pages look up content by matching the `:slug` route param against these arrays. If no match, they redirect to 404.

### Dark Mode

`ThemeContext` wraps the app and exposes `darkMode` boolean + `toggleDarkMode`. The `useDarkMode` hook manages state and toggles the `dark` class on `document.documentElement`. Tailwind is configured with `darkMode: 'class'`. Default is dark mode on. Note: localStorage persistence is referenced in the hook name but not currently implemented — state resets on refresh.

### Styling

All styling is Tailwind utility classes. Dark mode uses conditional class strings (e.g., `darkMode ? 'bg-black text-white' : 'bg-white text-black'`) rather than Tailwind's `dark:` variant, because the dark state comes from React context, not just the CSS class.

### Icons

Uses `lucide-react` for all icons.

### Search

`useSearch` hook (used at the `AppContent` level) provides real search across projects and blog posts. Searches title, description, methods (projects) and title, excerpt, category (blog posts). Single result navigates directly; multiple results navigates to first match; no results shows an alert.

### Testing

Minimal test coverage — only `src/App.test.js` exists, testing navigation rendering and the home page heading. Uses `@testing-library/react`.

## Code Style

Prettier: single quotes, 100-char print width, trailing commas (ES5), semicolons, LF line endings.

ESLint notable rules:
- `no-console: warn` (console.warn/error allowed)
- `no-unused-vars: warn` (prefix with `_` to suppress)
- `react/prop-types: off`
- `jsx-a11y` plugin — accessibility rules enforced as warnings

## Key Patterns

- All images are placeholders (`via.placeholder.com`) — replace with real assets
- Contact form has validation and simulated submission (console.log only, no backend)
