# Icon Events — Project Checklist

> Last updated: Script 08-FINAL

---

## Sprint 0 — Project Structure & Core Configs
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

## Sprint 1 — i18n, Auth & Middleware
- [x] i18n routing config (next-intl)
- [x] i18n request config
- [x] i18n navigation helpers
- [x] English messages (messages/en.json)
- [x] Arabic messages (messages/ar.json)
- [x] Utility: cn (clsx + tailwind-merge)
- [x] Utility: api-response helpers
- [x] Utility: pagination helpers
- [x] Utility: constants
- [x] Utility: parse-images
- [x] Type definitions (src/types/index.ts)
- [x] Auth: JWT sign/verify helpers
- [x] Auth: session helper
- [x] Auth: cookie helpers
- [x] Auth: password hash/verify
- [x] Auth: admin guard for API routes
- [x] Next.js middleware (route protection)
- [x] Password hash script (scripts/hash-password.ts)

## Sprint 2 — Database Schema & Seed
- [x] Drizzle schema (all tables)
- [x] DB connection helper
- [x] Seed script with companyInfo keys
- [x] Schema validation tests

## Sprint 3 — Data Access Layer & Validators
- [x] Zod validators (all entities)
- [x] Services repository
- [x] Portfolio repository
- [x] Testimonials repository
- [x] Inquiries repository
- [x] Company info repository
- [x] Repository index (re-exports)

## Sprint 4 — API Route Handlers
- [x] Auth routes (login/logout/me)
- [x] Services routes
- [x] Portfolio routes
- [x] Testimonials routes
- [x] Inquiries routes
- [x] Company info routes
- [x] Upload route (images to DB)
- [x] Image serving route

## Sprint 5 — SEO & Metadata
- [x] SEO utility functions
- [x] sitemap.ts
- [x] robots.ts
- [x] Global metadata setup

## Sprint 6 — Design System & Global CSS
- [x] Cyberpunk CSS variables & globals
- [x] shadcn/ui component configs
- [x] Reusable UI components
- [x] Loading/Error/Empty state components

## Sprint 7 — Layout, Navbar, Footer & Hero
- [x] Root layout with i18n
- [x] Locale layout
- [x] Public layout (navbar + footer)
- [x] Navbar component
- [x] Mobile menu
- [x] Footer component
- [x] Hero section
- [x] Home page

## Sprint 8 — Services Page
- [x] Services page
- [x] Service card component

## Sprint 9 — Portfolio Pages
- [x] Portfolio grid page
- [x] Portfolio filters
- [x] Portfolio detail page
- [x] Portfolio card component

## Sprint 10 — About Page
- [x] About page
- [x] Team section
- [x] Timeline section
- [x] Stats counter section

## Sprint 11 — Testimonials Section
- [x] Testimonials carousel/grid
- [x] Testimonial card component
- [x] Star rating component

## Sprint 12 — Contact Form
- [x] Contact form component
- [x] Form validation (shared Zod)
- [x] Honeypot field
- [x] Success/error toasts
- [ ] Email notification (optional)

## Sprint 13 — Admin Layout & Login
- [x] Admin layout with sidebar/topbar
- [x] Admin login page
- [x] Admin login layout (no shell)
- [x] Admin redirect (/admin -> dashboard)
- [x] AdminShell component
- [x] Sidebar component
- [x] Topbar component

## Sprint 14 — Admin Dashboard
- [x] Dashboard page
- [x] StatCard component
- [x] RecentInquiries component

## Sprint 15 — Admin Services Management
- [x] Services list page
- [x] Service create page
- [x] Service edit page
- [x] ServiceForm component
- [x] ServiceDeleteBtn component

## Sprint 16 — Admin Portfolio Management
- [x] Portfolio list page
- [x] Portfolio create page
- [x] Portfolio edit page
- [x] PortfolioForm component
- [x] PortfolioDeleteBtn component
- [x] ImageUpload component

## Sprint 17 — Admin Testimonials Management
- [x] Testimonials list page
- [x] Testimonial create page
- [x] Testimonial edit page
- [x] TestimonialForm component
- [x] TestimonialDeleteBtn component

## Sprint 18 — Admin Inquiries Management
- [x] Inquiries list page
- [x] Inquiry detail page

## Sprint 19 — Admin Settings
- [x] Settings page (company info editor)

## Sprint 20 — Testing & Deployment
- [ ] Unit tests (vitest)
- [ ] E2E tests (playwright)
- [ ] Production build verification
- [ ] Performance review
- [ ] Accessibility review
- [ ] Final deployment prep\n