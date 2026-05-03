# MERYT Platform

Global verified talent ranking platform. NOT social credit scoring — pure proof-of-work NI Score based on 5 verifiable pillars.

## Tech Stack

- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind v4 (`@tailwindcss/postcss`), CSS variables in `globals.css` — NO `tailwind.config.js`
- **Fonts**: Syne (display), DM Mono (mono), Bricolage Grotesque (body) — loaded via `<link>` in `layout.tsx`
- **Dark mode**: `next-themes` via `.dark` class on `<html>`
- **Auth**: localStorage stub (no Firebase) — `AuthContext.tsx`
- **Path alias**: `@/*` maps to `meryt/` root (so `@/src/...` = `meryt/src/...`)

## Project Structure

```
meryt/
  app/
    page.tsx                    # Main leaderboard homepage (hero, podium, full table, how-it-works, CTA)
    layout.tsx                  # Root layout with ThemeProvider, fonts, full metadata (OG, Twitter, robots)
    globals.css                 # CSS vars (light/dark), animations, responsive utilities, .show-mobile
    not-found.tsx               # Enhanced 404 page with quick links
    error.tsx                   # Enhanced error boundary with error message display
    loading.tsx                 # Global skeleton loading state
    sitemap.ts                  # Sitemap generator (static + profile + org pages)
    robots.ts                   # Robots.txt
    opengraph-image.tsx         # Enhanced OG image (1200×630)
    leaderboard/page.tsx        # Full dedicated leaderboard: region tabs, sort, load more, stats, footer
    profile/
      [id]/page.tsx             # Full public profile: hero, score breakdown, sidebar, ShareCard button
      [id]/card/route.ts        # GET /profile/:id/card — embeddable HTML rank card
      loading.tsx               # Profile skeleton loader
    dashboard/page.tsx          # Personal dashboard: rank history, pillar breakdown, activity feed
    verify/page.tsx             # Verification workflow: 5 pillars, evidence submission, progress
    pricing/page.tsx            # Pricing tiers: Explorer/Pro/Elite, monthly/yearly toggle
    search/page.tsx             # Full search + category filter + sort
    search/loading.tsx          # Search skeleton loader
    about/page.tsx              # About MERYT: mission, how NI Score works, team
    admin/page.tsx              # Admin panel: overview, users, verifications, scores, reports
    api-docs/page.tsx           # REST API reference: endpoints, params, examples, rate limits
    changelog/page.tsx          # Version history timeline (v2.0–v2.4)
    settings/page.tsx           # Settings: Profile / Account / Notifications / Privacy / API Keys / Danger Zone
    notifications/page.tsx      # Notifications: read/unread filter, mark all read
    org/[slug]/page.tsx         # Organization profiles: stats, top members, claim CTA
    api/
      leaderboard/route.ts      # GET /api/leaderboard
      profile/[id]/route.ts     # GET /api/profile/:id
      scores/route.ts           # GET /api/scores
      verify/route.ts           # POST /api/verify
      stats/route.ts            # GET /api/stats — platform statistics
      org/[slug]/route.ts       # GET /api/org/:slug — organization data
  src/
    types/index.ts              # All TypeScript types (Contestant, Pillar, Category, etc.)
    lib/
      data.ts                   # 20 contestants + 12 ticker items (seed data)
      utils.ts                  # cn(), formatScore(), getInitials(), clampScore(), pluralize()
    components/
      auth/
        AuthContext.tsx          # Auth state (localStorage, signIn/signUp/signOut)
        AuthModal.tsx            # Sign in / Sign up modal + OAuth stubs
      layout/
        Header.tsx               # Full nav, dark mode toggle, auth user menu, Settings/Notifications links, mobile hamburger drawer
        Footer.tsx               # Reusable footer with nav columns and brand section
        ThemeProvider.tsx        # Wraps NextThemesProvider + AuthProvider
        Ticker.tsx               # Live ranking changes ticker strip
      leaderboard/
        CategoryChips.tsx        # Category filter chips (All/Research/Tech/Creative/Gaming/Social)
        FilterRow.tsx            # Timeframe buttons + search input
        LeaderboardRow.tsx       # Single leaderboard row with rank, avatar, score, delta
        PodiumCard.tsx           # Top-3 podium card (gold/silver/bronze)
        ProfileModal.tsx         # Quick-view profile modal (leaderboard version)
      profile/
        ProfileModal.tsx         # Full profile modal (homepage version)
      scoring/
        NIScoreEngine.ts         # NI Score calculation logic, weights, category normalization
      ui/
        Badge.tsx                # Reusable badge with color variants
        Button.tsx               # Reusable button with primary/secondary/ghost variants
        ShareCard.tsx            # Share/embed rank card modal (copy URL, copy embed code, social share)
        SkeletonRow.tsx          # Skeleton loading: SkeletonRow, SkeletonCard, SkeletonProfile
```

## Key Design Decisions

- **No `tailwind.config.js`** — Tailwind v4 is configured entirely via CSS `@import "tailwindcss"` + CSS custom properties
- **CSS variables** for all color tokens — enables seamless dark mode via `.dark` class swap
- **Sequential GitHub pushes** — GitHub Contents API requires fresh SHAs; parallel pushes cause SHA mismatch failures
- **Two ProfileModal files** — `leaderboard/ProfileModal.tsx` (quick view) and `profile/ProfileModal.tsx` (full view used on homepage)
- **`@/*` alias** resolves to `meryt/` root, NOT `meryt/src/` — always use `@/src/...` for src files
- **Mobile hamburger** — `.show-mobile { display: flex !important }` at ≤768px; `.nav-links { display: none }` at mobile
- **metadata exports** — `"use client"` pages cannot export `metadata`; static server pages use `export const metadata`
- **Footer** — extracted to `src/components/layout/Footer.tsx`, imported on homepage and `/leaderboard`

## Dev Server

```
cd meryt && npm run dev
```

Runs on port 5000, `0.0.0.0`. Workflow "Start application" manages this.

## GitHub

Repo: `Noorislam-XD/learderboard` (branch: `main`)
Push method: sequential GitHub Contents REST API via `/tmp/push_phase2.mjs`
Token: `GITHUB_PERSONAL_ACCESS_TOKEN` env secret

## NI Score Pillars

| Pillar | Weight | Sources |
|---|---|---|
| Academic | 25% | GPA, degrees, awards |
| Research | 25% | Papers, citations, patents |
| Code | 20% | GitHub commits, OSS impact |
| Creator | 15% | Portfolio, reach, quality |
| Social | 15% | Community, mentorship |

## Phases Completed

- ✅ Phase 1: Auth (AuthContext, AuthModal, OAuth stubs)
- ✅ Phase 2: Profiles (Contestant type, data.ts with 20 entries)
- ✅ Phase 3: Dashboard (rank history, pillar breakdown, activity feed)
- ✅ Phase 4: Verify (5-pillar verification workflow, evidence submission)
- ✅ Phase 5: NI Score Engine (weights, tier, top strength, grade)
- ✅ Phase 6: Pricing (Explorer/Pro/Elite, monthly/yearly toggle)
- ✅ Phase 7: Search (full-text, category, sort)
- ✅ Phase 8: About (mission, how it works, team, CTA)
- ✅ Phase 9: Admin (verification queue, user management, analytics)
- ✅ Phase 10: API Docs (endpoint reference with try-it examples)
- ✅ Phase 11: Settings (6-tab settings page with toggles)
- ✅ Phase 12: Notifications (read/unread filter, mark all read)
- ✅ Phase 13: Changelog (version timeline v2.0–v2.4)
- ✅ Phase 14: Org profiles (/org/[slug] with stats, top members)
- ✅ Phase 15: ShareCard (rank card modal, copy URL, embed code)
- ✅ Phase 16: Footer (extracted reusable Footer component)
- ✅ Phase 17: SEO (per-page metadata, OG image, sitemap, loading skeletons, 404/error enhanced)
