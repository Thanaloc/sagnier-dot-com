# CLAUDE.md

## Project Overview

Portfolio website for Ruben Sagnier, surf and ocean photographer. Clean, minimal
design that puts the photos first, with smooth scroll-driven animations.
Content is managed by the photographer himself through an embedded Sanity Studio.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Runtime:** React 19.2.3
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 (`@theme inline` in `globals.css`, no config file)
- **Animations:** Framer Motion 12
- **Smooth Scroll:** Lenis
- **CMS:** Sanity 4 + next-sanity 11, Studio embedded at `/studio`
- **Contact form:** Formspree (client-side POST)
- **Deployment:** Vercel
- **Package Manager:** npm
- **Node:** >= 20.19 (required by Sanity 4: `>=20.19 <22 || >=22.12`)

## Commands

```bash
npm ci                # Install from lockfile
npm run dev           # Dev server on :3000, Studio on :3000/studio
npm run build         # Production build - the only reliable pre-push check
npm run start         # Serve the production build
npm run lint          # ESLint
npm run gen:placeholders  # Regenerate the SVG fallback images
```

`npm run dev` does not catch prerender or server-component errors. Always run
`npm run build` before pushing.

## Environment Variables

Copy `.env.example` to `.env.local`.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Without it, `isSanityConfigured` is false and the site silently serves SVG placeholders |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | `production` |
| `SANITY_REVALIDATE_SECRET` | yes | Shared secret for the Sanity webhook; `/api/revalidate` returns 500 without it |
| `NEXT_PUBLIC_FORMSPREE_ID` | yes | Without it the contact form goes straight to the error state |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical site URL. Falls back to the Vercel production URL, then localhost. Set this once a custom domain is bought |

`NEXT_PUBLIC_*` variables are inlined at build time: adding one in Vercel
requires a redeploy to take effect.

## Architecture

### Content flow

Sanity is the source of truth. Nothing else.

```
Sanity dataset
  -> src/sanity/queries.ts     GROQ queries
  -> src/sanity/client.ts      returns null when unconfigured
  -> src/sanity/fetch.ts       safeFetch + mapping to the Photo type
  -> Server Components         pages fetch, client components receive props
```

`src/data/photos.ts` is a **fallback only**, used when Sanity is unconfigured or
unreachable. It is not the content source and must never be reintroduced as one.
The images it points to (`public/photos/*.svg`) are generated placeholders.

### Caching and revalidation

- Pages declare `export const revalidate = 3600` (ISR).
- Sanity fetches are tagged via `SANITY_CACHE_TAGS` (`sanity:photos`, `sanity:settings`).
- `POST /api/revalidate` verifies a shared secret and calls `revalidateTag` for
  the tag matching the document `_type`, or all tags if none is provided.
- A Sanity webhook points at that route so Studio edits go live without a redeploy.

### Two Sanity document types

- `photo` — title, image (hotspot, lqip + palette metadata), alt, category, featured, order
- `siteSettings` — singleton: hero image and subtitle, about portrait and texts,
  contact background, Instagram and LinkedIn URLs

Photo categories: `surf`, `ocean`, `portrait`, `paysage`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout: fonts, metadata, nav, footer, smooth scroll
│   ├── page.tsx                Home: HeroSection + FeaturedGrid
│   ├── globals.css             Tailwind theme tokens + base styles
│   ├── robots.ts               Robots + sitemap reference
│   ├── sitemap.ts              Static sitemap
│   ├── collection/page.tsx     Gallery with category filtering
│   ├── a-propos/page.tsx       About
│   ├── contact/page.tsx        Contact form
│   ├── studio/[[...tool]]/     Embedded Sanity Studio
│   └── api/revalidate/route.ts Sanity webhook receiver
├── components/
│   ├── layout/                 Navigation, Footer, PageTransition, SmoothScroll
│   ├── ui/                     Button, PhotoCard, Lightbox, SectionTitle
│   ├── home/                   HeroSection, FeaturedGrid
│   ├── collection/             Gallery, GalleryFilter, ParallaxPhoto
│   ├── about/                  AboutContent, AboutPortrait
│   └── contact/                ContactForm
├── config/                     theme.ts (colors, transitions, navigation)
├── sanity/
│   ├── env.ts                  Config resolution + isSanityConfigured guard
│   ├── client.ts               Lazy singleton client, null when unconfigured
│   ├── image.ts                Image URL builder
│   ├── queries.ts              GROQ
│   ├── fetch.ts                Typed fetchers, cache tags, fallback logic
│   └── schema/                 photo.ts, siteSettings.ts
├── data/photos.ts              Fallback dataset only
└── types/photo.ts              Photo, SanityPhoto, PhotoCategory, categoryLabels
```

## Design System

### Concept: "Tidal Memory"

The site behaves like the ocean: smooth continuous transitions, progressive
reveals, no cliché surf effects. **Motion is driven by the user's scroll, never
by idle loops.** Ambient animations that run on their own contradict the concept
and are not used.

### Colors

| Token | Hex | Usage |
|---|---|---|
| background | `#0B3C5D` | Main background |
| foreground | `#FAFAFA` | Primary text on dark background |
| titles | `#0E0E0E` | Headings on light background |
| cta | `#E46A2E` | Buttons, CTAs |
| hover | `#1E88A8` | Hover states |
| detail | `#C9A66B` | Accents, active nav, eyebrow labels |

Defined as CSS custom properties in `globals.css` under `@theme inline`, used as
Tailwind classes: `bg-background`, `text-cta`, `text-detail`.

### Fonts

- **Display (headings):** Fraunces — `font-display`
- **Body:** Inter — `font-sans`

### Easing curves

- `tidal` — `[0.25, 0.1, 0.25, 1]`, slow and organic
- `drift` — `[0.4, 0, 0.2, 1]`, gentle

### Animation presets

In `src/config/theme.ts` as `transitions`: `page`, `fadeUp`, `fadeIn`,
`scaleIn`, `slideUp`, `parallaxReveal`, `stagger`.

## Code Conventions

- No excessive comments, no emojis in code
- Quality over simplicity: modular, well-structured, durable
- Split by feature into subdirectories and multiple linked files rather than
  concentrating logic in one place
- **No inline `style` for layout.** Spacing, padding and margins go through
  Tailwind classes or the shared spacing constants. Inline `style` is reserved
  for values that genuinely cannot be expressed as classes (motion values,
  dynamic background images, computed dimensions)
- Any repeated class string belongs in a config constant, written as a complete
  literal class name so the Tailwind scanner picks it up
- Performance first: `priority` on above-the-fold images, lazy load the rest
- `"use client"` only where interactivity requires it; Server Components by default
- Types in `src/types/`, config in `src/config/`, Sanity access in `src/sanity/`
- French in user-facing copy, with correct accents, including metadata
- English in code, identifiers and comments

## Versioning and Git Workflow

- Classic versioning: MVP, V0, V1.0, V1.1, V2.0
- One branch per version increment: `claude/v1.0-layout-hygiene`
- Bump `version` in `package.json` at the end of each increment
- Clear, descriptive commit messages, one logical change per commit
- Never commit `.env`, credentials or build artifacts
- Every increment must end with `npm run lint` and `npm run build` both clean