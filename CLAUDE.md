# CLAUDE.md

## Project Overview

**sagnier-dot-com** — A portfolio website for a talented photographer. The project is in its initial scaffolding phase.

## Tech Stack (Planned)

- **Framework:** Next.js
- **Language:** TypeScript
- **Deployment:** Vercel
- **Package Manager:** npm or yarn

These are inferred from the `.gitignore` configuration. No source code, dependencies, or configuration files have been added yet.

## Repository Structure

```
/
├── .gitignore        # Configured for Next.js + TypeScript + Vercel
├── README.md         # Project title and description
└── CLAUDE.md         # This file
```

## Current State

The repository contains only `.gitignore` and `README.md` from the initial commit. No `package.json`, `tsconfig.json`, source code, or tooling configuration exists yet.

## Development Setup

Once the project is bootstrapped (e.g., via `create-next-app`), expect:

- `npm install` or `yarn` to install dependencies
- `npm run dev` or `yarn dev` to start the dev server
- `npm run build` or `yarn build` to produce a production build
- `npm run lint` or `yarn lint` to run the linter

## Conventions to Follow

- **TypeScript** for all source files (`.ts`, `.tsx`)
- **Environment variables** go in `.env.local` (never commit secrets)
- **Next.js App Router or Pages Router** — follow whichever pattern is adopted when the project is initialized
- Keep components modular and focused on the photography portfolio use case

## Git Workflow

- Main development happens on feature branches prefixed with `claude/`
- Commit messages should be clear and descriptive
- Do not commit `.env`, credentials, or build artifacts
