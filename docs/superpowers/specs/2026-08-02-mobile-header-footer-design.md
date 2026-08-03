# Mobile header + footer

**Date:** 2026-08-02
**Status:** Approved, not yet implemented

## Problem

The site header overflows on phones. `src/components/layout/Header.tsx` is a plain
`flex justify-between items-center` with no breakpoints — the only component in the
app with no responsive treatment at all.

At a 390px viewport the content box is 350px (`max-md:px-5` in `layout.tsx`), but the
header asks for roughly 500px:

| Element | Width |
| --- | --- |
| Available content | 350px |
| Icon strip (6 × 40px targets + 5 × 8px gaps) | 280px |
| "EMMANUEL DIAZ" (`text-xl`, `tracking-[5px]`, mono) | ~220px |
| **Required** | **~500px** |

The name wraps to two lines and the icons crowd against it.

## Scope

Mobile only. Every change is gated behind `max-md:` (<768px) or lives inside an
`md:hidden` element. No unprefixed class changes, so rendering at ≥768px is
unchanged.

768px is Tailwind's default `md`, already the breakpoint `layout.tsx` uses for
padding — no new breakpoint vocabulary is introduced.

## Decisions

Made during brainstorming, recorded so they are not relitigated:

- **The mobile header keeps LinkedIn and GitHub only.** Strava, Goodreads, and
  Substack are hidden below 768px. Two icons plus the theme toggle fit at full
  40px tap targets with slack; three would force targets down to 36px.
- **A footer holds all five links, and it is mobile-only.** Desktop is off-limits,
  so the footer renders `md:hidden`. The desktop header already shows all five, so
  nothing is unreachable at any width.
- **Tap targets stay 40px.** Already under the WCAG 2.5.5 44px recommendation;
  shrinking them further would make an accessibility problem worse while fixing a
  layout one.

## Design

### 1. Header responsive sizing

`src/components/layout/Header.tsx`

- Masthead: add `max-md:text-base max-md:tracking-[3px]` (~220px → ~164px).
- Strava, Goodreads, Substack anchors: add `max-md:hidden` (strip 280px → 136px).
- Add `whitespace-nowrap` to the masthead and `shrink-0` to the icon cluster, so
  the two-line wrap becomes structurally impossible rather than incidentally absent.

At 390px: 164 + 136 = **300px into 350px**, ~50px slack.

**Smallest-phone tier.** At 320px the content box is 280px and 300 > 280 — with
`whitespace-nowrap` that overflows horizontally, which is worse than the current
wrap. So a second step, `max-[360px]:text-sm max-[360px]:tracking-[2px]`, brings the
name to ~135px for a total of **271px into 280px**.

### 2. Footer (new)

`src/components/layout/Footer.tsx`, mounted in `layout.tsx` after `<main>`,
rendered `md:hidden`.

Contents: all five social links at 40px tap targets in a single row, plus a
`© 2026 Emmanuel Diaz` line, separated from content by a `border-t`.

The footer intentionally repeats LinkedIn and GitHub, which are also in the mobile
header. It is the canonical list; a reader who scrolls to the bottom looking for
links should find all of them there, not a remainder set.

### 3. Shared link list

Header and Footer both need the same five links and the three custom SVG icons
(`StravaIcon`, `GoodreadsIcon`, `SubstackIcon`). Extract both to
`src/components/layout/socialLinks.tsx`; both components import from it.

This is a pure move — no behavior change. It exists so that adding a sixth link
later touches one file instead of two.

## Verification

1. `npm run lint` and `npm run build` pass.
2. **Desktop-unchanged proof:** every class added to `Header.tsx` is prefixed
   `max-md:` or `max-[360px]:`, and every new unprefixed class lives inside the
   `md:hidden` footer subtree. Verified by reading the diff.
3. Visual check at 320px, 390px, 768px, and 1440px, with the browser console open.
   A markup-level check (`curl` + `grep`) is not sufficient — it cannot see
   hydration errors or layout overflow.

**Blocker:** step 3 needs a working dev server. As of 2026-08-02 `next dev` in this
repo produces no output and binds no port, even with `.next` cleared and run under a
pty. Debugging that is a prerequisite task, tracked separately from this spec.

## Out of scope

- The `GoodreadsIcon` and `SubstackIcon` SVGs in `Header.tsx` are hand-drawn
  approximations, not brand marks; the Substack one reads as a download glyph.
  Real problem, separate content fix.
- Desktop layout, at any width ≥768px.
- The apex-domain 404 (`emmanuel-diaz.com` without `www`).
