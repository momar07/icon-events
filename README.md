# Icon Events

Cyberpunk-themed event exhibition website built with Next.js 15.
Bilingual (English/Arabic) public site + full admin dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TurboPack)
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4 (cyberpunk design)
- **Database**: MySQL 8 via Drizzle ORM
- **Auth**: JWT + httpOnly cookies (bcryptjs)
- **i18n**: next-intl (EN + AR with RTL)
- **Validation**: Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Testing**: Vitest + Playwright

## Features

### Public Site
- Responsive cyberpunk/neon design
- Bilingual EN/AR with RTL support
- SEO with sitemap.ts and robots.ts
- Pages: Home, Services, Portfolio, About, Contact
- Contact form with Zod + honeypot

### Admin Dashboard
- JWT authentication
- Stats dashboard + recent inquiries
- CRUD: Services, Portfolio, Testimonials
- Inquiry management (new/reviewed/contacted)
- Image upload (MySQL LONGBLOB)
- Company settings editor
- Soft delete with restore

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8+

### Installation

```bash
git clone https://github.com/momar07/icon-events.git
cd icon-events
npm install
cp .env.example .env.local

Environment Setup

Edit .env.local:

DATABASE_URL=mysql://root:yourpassword@localhost:3306/icon_events
JWT_SECRET=your-random-secret-minimum-32-characters-long
ADMIN_EMAIL=admin@iconevents.com
ADMIN_PASSWORD_HASH=<generated-hash>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Icon Events
NEXT_PUBLIC_DEFAULT_LOCALE=en

Important: Escape $ in the bcrypt hash:

ADMIN_PASSWORD_HASH=\\\\$2a\\\\$12\\\\$abc...xyz

Generate Password Hash

npx tsx scripts/hash-password.ts YourPassword123

Database Setup

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS icon_events;"
npm run db:push
npm run db:seed

Development

npm run dev

    Public site: http://localhost:3000
    Admin panel: http://localhost:3000/en/admin/login

Production

npm run build
npm start

Project Structure

icon-events/
  messages/          # i18n (en.json, ar.json)
  scripts/           # hash-password.ts
  src/
    app/
      [locale]/
        (public)/    # Public pages
        admin/       # Admin pages
      api/           # API routes
    components/
      admin/         # Admin components
      sections/      # Public sections
      ui/            # Reusable UI
    lib/
      auth/          # JWT, password
      db/            # Drizzle schema, seed
      repositories/  # Data access
      utils/         # Helpers
      validators/    # Zod schemas
    types/           # TypeScript types
  middleware.ts      # Auth + i18n

Scripts
Script 	Description
npm run dev 	Dev server (TurboPack)
npm run build 	Production build
npm start 	Production server
npm run lint 	ESLint
npm run format 	Prettier
npm test 	Vitest tests
npm run db:push 	Push schema to DB
npm run db:seed 	Seed database
npm run db:studio 	Drizzle Studio
npm run hash-password 	Generate bcrypt hash
License

Private project. """

f.write_text(content.strip() + "\n", encoding="utf-8")

if f.exists(): print(f"OK: README.md ({f.stat().st_size} bytes)") else: print("FAIL: README.md")

print("Script 08-C done.") print("") print("All 3 scripts complete!") print(" 08-A: Cleaned debug logs") print(" 08-B: Updated CHECKLIST.md") print(" 08-C: Created README.md") print("") print("Next: npm run dev")
