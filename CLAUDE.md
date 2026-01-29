# CLAUDE.md

## Project Overview

Portfolio website for a surf/ocean photographer. Clean, minimal design that puts the photos first, with smooth page animations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Package Manager:** npm

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (nav + footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind theme
│   ├── collection/
│   │   └── page.tsx        # Photo gallery with filtering
│   ├── a-propos/
│   │   └── page.tsx        # About page
│   └── contact/
│       └── page.tsx        # Contact form page
├── components/
│   ├── layout/             # Navigation, Footer, PageTransition
│   ├── ui/                 # Reusable: Button, PhotoCard, Lightbox, SectionTitle
│   ├── home/               # HeroSection, FeaturedGrid
│   ├── collection/         # Gallery, GalleryFilter
│   ├── about/              # AboutContent
│   └── contact/            # ContactForm
├── config/
│   └── theme.ts            # Colors, transitions, navigation config
├── data/
│   └── photos.ts           # Photo data and query helpers
└── types/
    └── photo.ts            # Photo and PhotoCategory types
scripts/
└── generate-placeholders.ts  # Generate SVG placeholder images
public/
└── photos/                 # Photo assets (SVG placeholders for now)
```

## Design System

### Colors
| Token        | Hex       | Usage                  |
|-------------|-----------|------------------------|
| background  | `#0B3C5D` | Main background        |
| foreground  | `#FAFAFA` | Primary text on dark bg |
| titles      | `#0E0E0E` | Headings on light bg   |
| cta         | `#E46A2E` | Buttons, CTAs          |
| hover       | `#1E88A8` | Hover states           |
| detail      | `#C9A66B` | Accents, active nav    |

### Tailwind Usage
Colors are defined as CSS custom properties in `globals.css` via `@theme inline` and used as Tailwind classes: `bg-background`, `text-cta`, `text-detail`, etc.

### Animation Presets
Defined in `src/config/theme.ts` as `transitions` object. Use via Framer Motion's `variants` prop:
- `page` — page enter/exit
- `fadeUp` — scroll reveal (upward fade)
- `fadeIn` — simple opacity fade
- `scaleIn` — scale + fade
- `stagger` — stagger children

## Code Conventions

- No excessive comments, no emojis in code
- Quality over simplicity: modular, well-structured, durable
- Split into multiple files and subdirectories by feature
- Performance first: use `priority` on above-fold images, lazy load the rest
- All components in `src/components/` grouped by feature domain
- Shared/reusable components go in `src/components/ui/`
- Page-specific components go in `src/components/{page-name}/`
- Types in `src/types/`, config in `src/config/`, data in `src/data/`
- Use `"use client"` only where needed (interactive components)
- Server Components by default (pages, layouts)

## Photo System

Photos are currently defined as static data in `src/data/photos.ts`. Each photo has:
- `id`, `src`, `alt`, `width`, `height`, `category`, `featured`, `order`
- Categories: `surf`, `ocean`, `portrait`, `paysage`

Current photos are SVG placeholders. Replace files in `public/photos/` with real images and update `src/data/photos.ts` extensions from `.svg` to `.jpg`.

### Future: Admin System
An admin interface is planned for the photographer to upload photos and manage featured images on the home page. This will require:
- Authentication system
- File upload API (likely Vercel Blob or similar)
- Database for photo metadata (replacing static `data/photos.ts`)

## Git Workflow

- Feature branches prefixed with `claude/`
- Clear, descriptive commit messages
- Never commit `.env`, credentials, or build artifacts
- Push to Vercel for deployment
