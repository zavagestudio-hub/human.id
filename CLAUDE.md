# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HumanID (human-id.app) is an emergency medical profile app for runners and athletes. Users get a physical QR code (card, keychain, or pendant) that links to their digital medical profile — viewable by anyone without an app or login. The UI and all content are in **Spanish (es_MX)**.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint (extends next/core-web-vitals)
- `npm start` — Serve production build

## Architecture

- **Next.js 14** with App Router, TypeScript, CSS Modules
- Path alias: `@/*` maps to `./src/*`
- All pages are client components (`'use client'`)

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing page (single-page with anchor sections) |
| `/perfil` | Full medical profile with QR code and printable CR-80 card |

### Key Data Flow

Profile data is **static** — defined in `src/data/profile.ts` as a single `HumanProfile` object. Both the profile page and QR code generation read from this file. The `HumanProfile` type (in `src/types/index.ts`) is comprehensive: allergies with severity levels, medications with dosage, surgeries, vaccines, insurance, runner info, emergency contacts, and paramedic instructions.

To change the demo profile, edit `src/data/profile.ts`. The QR code and all displayed data update automatically.

### Components

- `src/components/Logo.tsx` — SVG logo with light/dark variants (used in both pages)
- `src/components/Badge.tsx` — `MedicalBadge` component with types: allergy, chronic, ok, meds (styled via global CSS classes `badge-*`)

### Styling

- CSS Modules for page-level styles (`page.module.css`)
- Global styles in `src/app/globals.css` (includes badge classes used by `MedicalBadge`)
- CSS custom properties for brand colors (`--color-brand-primary`, `--color-brand-accent`, `--color-brand-deep`)

### QR Code

Generated client-side using the `qrcode` library. Points to `https://human-id.app/p/{profile.slug}`. The profile URL helper in `src/lib/utils.ts` returns localhost in dev, production URL in prod.

## Future Direction

The project plans to add Supabase for multi-user profiles, authentication, i18n (ES/EN), and PDF export for printable QR keychains.
