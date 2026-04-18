# Icon Events — Project Checklist

> Auto-updated by setup scripts. Do not edit manually.
> Last updated: Script 05-C

---

## Script 01-A: Project Structure & Core Configs
- [x] Directory structure created
- [x] package.json
- [x] tsconfig.json
- [x] next.config.mjs
- [x] postcss.config.mjs
- [x] eslint.config.mjs
- [x] .prettierrc
- [x] drizzle.config.ts
- [x] vitest.config.ts
- [x] .env.example & .env.local
- [x] .gitignore
- [x] CHECKLIST.md

## Script 01-B: i18n, Utilities & Type Definitions
- [x] i18n routing config (next-intl)
- [x] i18n request config
- [x] i18n navigation helpers
- [x] English messages (messages/en.json)
- [x] Arabic messages (messages/ar.json)
- [x] Utility: cn (clsx + tailwind-merge)
- [x] Utility: api-response helpers
- [x] Utility: pagination helpers
- [x] Utility: constants
- [x] Type definitions (src/types/index.ts)
- [x] Test setup file

## Script 01-C: Auth Utilities & Password Script
- [x] Auth: JWT sign/verify helpers
- [x] Auth: session helper
- [x] Auth: cookie helpers
- [x] Auth: password hash/verify
- [x] Auth: admin guard for API routes
- [x] Next.js middleware (route protection)
- [x] Password hash script (scripts/hash-password.ts)

## Script 02: Database Schema & Seed
- [x] Drizzle schema (all tables)
- [x] DB connection helper
- [x] Seed script with companyInfo keys
- [x] Schema validation tests

## Script 03: Data Access Layer & Validators
- [x] Zod validators (all entities)
- [x] Services repository
- [x] Portfolio repository
- [x] Testimonials repository
- [x] Inquiries repository
- [x] Company info repository

## Script 04: API Route Handlers
- [x] Auth routes (login/logout/me)
- [x] Services routes (public + admin)
- [x] Portfolio routes (public + admin)
- [x] Testimonials routes (public + admin)
- [x] Inquiries routes (public + admin)
- [x] Company info routes (public + admin)
- [x] Upload route (images to DB)
- [x] Image serving route

## Script 05: SEO & Metadata
- [x] SEO utility functions
- [x] sitemap.ts
- [x] robots.ts
- [x] Global metadata setup

## Script 06: Design System & Global CSS
- [x] Cyberpunk CSS variables & globals
- [x] shadcn/ui component configs
- [x] Reusable UI components (Button, Input, etc.)
- [x] Loading/Error/Empty state components

## Script 07: Layout, Navbar, Footer & Hero
- [x] Root layout with i18n
- [x] Locale layout
- [x] Public layout (navbar + footer)
- [x] Navbar component
- [x] Mobile menu
- [x] Footer component
- [x] Hero section
- [x] Home page

## Script 08: Services Page
- [ ] Services page
- [ ] Service card component

## Script 09: Portfolio Pages
- [ ] Portfolio grid page
- [ ] Portfolio filters
- [ ] Portfolio detail page
- [ ] Portfolio card component

## Script 10: About Page
- [ ] About page
- [ ] Team section
- [ ] Timeline section
- [ ] Stats counter section

## Script 11: Testimonials Section
- [ ] Testimonials carousel/grid
- [ ] Testimonial card component
- [ ] Star rating component

## Script 12: Contact Form & Notifications
- [ ] Contact form component
- [ ] Form validation (shared Zod)
- [ ] Honeypot field
- [ ] Success/error toasts
- [ ] Email notification (optional)

## Script 13: Admin Layout & Login
- [ ] Admin layout with sidebar
- [ ] Admin login page
- [ ] File upload component
- [ ] Admin dashboard page
- [ ] Stats cards

## Script 14: Admin Portfolio Management
- [ ] Portfolio list/table
- [ ] Portfolio create/edit form
- [ ] Portfolio archive/delete

## Script 15: Admin Services Management
- [ ] Services list/table
- [ ] Services create/edit form
- [ ] Services reorder

## Script 16: Admin Inquiries Management
- [ ] Inquiries list/table
- [ ] Inquiry detail modal
- [ ] Status update workflow

## Script 17: Admin Testimonials & Company Info
- [ ] Testimonials CRUD
- [ ] Company info editor
- [ ] Team members JSON editor

## Script 18: Testing & Final Polish
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance review
- [ ] Accessibility review
- [ ] Final deployment prep
