# Ultra Tracker Article — Rewrite and Reading-Experience Redesign

**Date:** 2026-07-26
**Status:** Approved design, pending implementation plan

## Problem

The blog post `building-my-own-ultra-training-tracker` has two independent problems.

**The content is four months stale.** It was written 2026-03-15 and closes with "28 weeks to go" — the Ultra Trail Tarahumara is now roughly 10 weeks out. It also describes an architecture that no longer exists: a `http.server` backend and JSON-file storage, both replaced in April. Two-thirds of the project's history postdates the article.

**The post has no reading format.** `src/app/blog/[slug]/page.tsx` renders `post.content` into a single `whitespace-pre-line` div. There is no markdown pipeline, so: headings are an ALL-CAPS text convention, the Week 1 comparison table renders as literal `|` pipes in a sans-serif face, the two closing URLs are inert text, and there is no way to place an image at all. The text column is `max-w-2xl` (672px) at 15px body, which measures roughly 90 characters per line — above the WCAG 1.4.8 ceiling of 80 and well above the 50–75 optimum.

The second problem blocks a stated goal: showing real screenshots of the project.

## Goals

1. Rewrite the article as a single current-state piece, ~1,800 words.
2. Give the blog a real reading format: markdown, corrected typography, figures with captions.
3. Illustrate the article with six figures — real screenshots of the dashboard, styled blocks for terminal output.

## Non-goals

- Un-hiding the Blog tab. The post stays reachable by direct URL only; publishing is a separate decision.
- The other three blog posts (2023 UX stubs). Untouched.
- Any page outside `/blog`. Home, Experience, and Projects are not modified.
- Heading anchors, sticky table of contents, reading-progress bar, callout asides. Considered and deferred as polish.

## Part 1 — Content

### Spine

Ship, then improve. The article is a chronological log of five versions, each earning the next. This preserves the original's thesis and structure while absorbing the new material.

### Sections (~1,800 words)

| § | Section | Words | Notes |
|---|---------|-------|-------|
| 1 | Open — five versions deep, ~10 weeks out | 150 | Thesis stated up front, not saved for the close |
| 2 | The question no tool would answer | 200 | Compressed. Strava knows distance, Garmin knows physiology, neither knows the plan |
| 3 | v1 — the CLI | 250 | One weekend, three scripts, Week 1 numbers, the 53% long-run flag |
| 4 | v2 — the dashboard | 250 | Single-file PWA, compliance ring, Garmin's datacenter-IP block solved by seeded OAuth tokens, security hardening |
| 5 | v3 — the coach | 250 | Rule engine + LLM narrator; the split is deliberate — deterministic logic decides, the model only writes. SSE chat drawer |
| 6 | v4 — Postgres | 250 | Where JSON files ran out: daily health data, a mutable plan needing an audit trail. FastAPI replaces `http.server` |
| 7 | The two months it lied to me | 300 | Sync dies 2026-05-04 (Garmin auth deadlock, global cooldown locking out healthy clients). Travel and injury meant nobody was looking. Found late June, weeks 10–17 backfilled |
| 8 | v5 — teaching it to heal | 250 | Gap detectors, refresh engine, `coach.py checkin` as one front door. Plan rebuilt from actual current fitness |
| 9 | Close | 150 | Honest state ~10 weeks out. No triumph — the race hasn't happened |

Sections 3 and 4 lose the most detail from the original; they are backstory now. Sections 7 and 8 are new and carry the most weight.

### Threads deliberately excluded

- **Papá's plan** (297-activity import, multi-profile, shared long runs). Real engineering, but widens the piece past the author's own tracker.
- **The ultra-vs-marathon long-run lesson.** Domain insight, not an engineering beat.

### Field changes in `src/data/blogPosts.ts`

| Field | Change |
|-------|--------|
| `slug` | Unchanged — preserves the URL |
| `content` | Full rewrite, now markdown |
| `date` | `March 15, 2026` → `July 26, 2026` |
| `readTime` | `10 min read` → `8 min read` (the old label was inflated; the post was 1,312 words) |
| `excerpt` | Rewritten to match the new arc |
| `tags` | Add `Postgres`, `FastAPI` |
| `category` | Unchanged (`Projects`) |

Both URLs in the original were verified live (HTTP 200) on 2026-07-26 and are retained.

## Part 2 — Rendering

### Markdown pipeline

Add `react-markdown@^10.1.0` and `remark-gfm@^4.0.1`. Version 10 peers on `react >=18`, so React 19 is satisfied. `react-markdown` does not use `dangerouslySetInnerHTML` and renders no raw HTML by default, so the existing CSP and the clean security review stand.

The `BlogPost.content` field stays a string on the same TypeScript data object — consistent with the project's "data layer is static TypeScript files" convention. MDX was considered and rejected: it would move posts to separate files for a blog holding one real post.

### Typography

| Property | Now | Target | Why |
|----------|-----|--------|-----|
| Body size | 15px | 17px | Butterick: 15–25px web body; long-form wants the upper half |
| Measure | 672px ≈ 90ch | ~68ch | 50–75 optimal, 66 ideal, WCAG caps at 80 |
| Line height | 1.625 | 1.7 | Long-form comfort |
| Paragraph breaks | `whitespace-pre-line` | Margin between `<p>` | Real paragraphs, not preserved newlines |
| Section headings | ALL-CAPS text | `<h2>` in IBM Plex Mono | Matches the site's existing display face |

Raising body size is what fixes the measure — larger type fits fewer characters in the same column, so both problems resolve together. The monochromatic palette is unchanged.

### New components — `src/components/blog/`

**`PostBody.tsx`** — wraps `react-markdown` with the component map. Owns the prose type scale. Maps `img` → `Figure`, fenced `console` blocks → `TerminalBlock`, and styles `h2`/`h3`, lists, links, `table`, and `blockquote`.

**`Figure.tsx`** — image plus caption. Breaks out wider than the 68ch measure so screenshots stay legible; the caption stays at measure width. Captions are written as interpretive full sentences, not labels.

**`TerminalBlock.tsx`** — dark surface, IBM Plex Mono, subtle window chrome. Renders selectable text, never an image.

Each has one job and a single prop interface, so `[slug]/page.tsx` stays a thin route component.

## Part 3 — Figures

Six figures, one per phase, so the ship-then-improve progression is visible rather than merely asserted.

| # | Kind | Content | Source |
|---|------|---------|--------|
| 1 | Real screenshot | Actual terminal running `scripts/status.py` — countdown, week, targets | User captures |
| 2 | Terminal block | Weekly report: compliance score and the 53% long-run alert firing | Real command output |
| 3 | Screenshot | Dashboard — compliance ring and metric cards | Chrome capture, live Railway |
| 4 | Screenshot | 30-week volume chart, planned vs actual | Chrome capture, live Railway |
| 5 | Screenshot | Coach chat drawer mid-answer | Chrome capture, live Railway |
| 6 | Terminal block | `coach.py checkin` gap-filling | Real command output |

Figure 1 is the only terminal image — the "CLI era" hero, where an authentic capture of the author's own terminal is worth the tradeoff. Every other terminal moment is a `TerminalBlock`, because code and terminal output as images are unselectable, illegible on mobile, and invisible to screen readers.

### Asset handling

`next.config.js` sets `images: { unoptimized: true }`, so `next/image` will not compress anything — every asset must be optimized before it lands in `public/`. Screenshots are captured at 2x, converted to WebP, resized to ~1600px wide, and held under 200KB each. They go in `public/images/blog/ultra-tracker/` with descriptive filenames.

### Capture dependencies

- **Dashboard figures (3, 4, 5)** require driving Chrome against the live Railway dashboard, which needs the browser extension's site permission for that host.
- **Figure 1** requires the user to run a given command and capture their own terminal window; it cannot be produced from this session.

Both are hand-off points, not blockers for the rest of the work.

## Verification

- `npm run build` and `npm run lint` pass.
- The post renders at `localhost:3000/blog/building-my-own-ultra-training-tracker` with real headings, a real table, clickable links, and all six figures.
- Measure confirmed at 65–75 characters at desktop width.
- Light and dark themes both checked.
- Mobile width checked — figures and terminal blocks scroll or scale rather than overflowing the page.
- The three other blog posts still render without regression, since they share the renderer.
- Author reviews the full post on localhost. Nothing is committed or pushed to production before that approval.
