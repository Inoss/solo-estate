# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SOLO Estate is a multilingual investment real estate platform built with Next.js 15, Prisma (SQLite), and NextAuth. It supports 7 languages (EN, KA, RU, HE, AZ, HY, UK) with full RTL support for Hebrew. The platform consists of a public-facing website for property listings and an authenticated admin dashboard for content management.

## Development Commands

```bash
# Development
npm run dev          # Start dev server on port 3002

# Database
npm run db:seed      # Seed database with initial data (uses tsx to run prisma/seed.ts)
npx prisma studio    # Open Prisma Studio for database management
npx prisma migrate dev --name <migration_name>  # Create new migration
npx prisma generate  # Regenerate Prisma Client after schema changes

# Build & Lint
npm run build        # Build for production
npm run lint         # Run ESLint
```

## Architecture

### Routing Structure

The app uses Next.js App Router with two distinct routing hierarchies:

1. **Public Routes** (`app/[locale]/`): Internationalized routes with locale prefix (e.g., `/en/projects`, `/ru/about`)
   - All public pages are under `app/[locale]/` directory
   - Middleware (middleware.ts) handles locale detection and routing
   - Locale is always present in URL (localePrefix: 'always')

2. **Admin Routes** (`app/admin/`): Protected routes without internationalization
   - Admin dashboard at `/admin/dashboard`
   - Login page at `/admin/login`
   - Middleware redirects unauthenticated users to login
   - Uses NextAuth v5 with credentials provider and JWT strategy

### Internationalization (i18n)

- **Supported locales**: en, ka, ru, he, az, hy, uk (defined in `i18n.ts`)
- **Translation files**: Located in `messages/<locale>.json`
- **RTL support**: Hebrew (`he`) has RTL text direction
- **Implementation**: Uses `next-intl` with server-side configuration
- **Middleware**: Handles locale routing and authentication (see middleware.ts)

### Database & Prisma

- **Database**: SQLite (dev.db) located in `prisma/prisma/dev.db`
- **Schema**: `prisma/schema.prisma`
- **Models**:
  - `Admin`: Admin users with role-based access
  - `Developer`: Real estate developers (multilingual fields)
  - `Project`: Properties with multilingual content, pricing, investment metrics, location, media
  - `Article`: Blog/insights content (multilingual)
  - `Settings`: Global site settings (singleton with id="global")
  - `Lead`: Phone number captures
  - `QuizSubmission`: Property quiz submissions

- **Multilingual Pattern**: Each translatable field has separate columns (e.g., `titleEn`, `titleKa`, `titleRu`, etc.)
- **Prisma Client**: Initialized in `lib/db.ts` and `lib/prisma.ts` (both export the same singleton instance)

### Authentication

- **Provider**: NextAuth v5 (auth.ts)
- **Strategy**: Credentials with bcrypt password hashing
- **Session**: JWT-based (not database sessions)
- **Protected routes**: Admin routes are protected via middleware
- **User model**: `Admin` model in Prisma with roles (admin, editor, viewer)

### API Routes

Located in `app/api/`:
- `admin/`: Admin-related operations
- `articles/`: Article CRUD
- `auth/`: NextAuth handlers
- `contact/`: Contact form submission
- `developers/`: Developer CRUD
- `leads/`: Lead capture
- `projects/`: Project CRUD
- `quiz/`: Property quiz submission
- `settings/`: Global settings
- `submit-request/`: Request offer form

### Key Components

- **Language Switcher** (`components/language-switcher.tsx`): Dropdown for locale switching
- **Project Card** (`components/project-card.tsx`): Property listing card with investment metrics
- **Project Filters** (`components/project-filters.tsx`): Filter projects by type, status, location
- **Header/Footer**: Internationalized navigation
- **Admin Components** (`components/admin/`): Dashboard-specific components
- **Forms** (`components/forms/`): Reusable form components with react-hook-form and Zod

### Image Optimization

- Configured in `next.config.ts`
- Allowed remote patterns: Unsplash, Pexels, Google Cloud Storage
- Formats: AVIF, WebP
- Quality levels: 75, 85, 90, 100

### Path Aliases

`@/*` maps to project root (configured in tsconfig.json)

Example: `import { prisma } from '@/lib/db'`

## Important Patterns

### Working with Multilingual Content

When creating or updating content, always handle all 7 languages:
```typescript
{
  titleEn: "English Title",
  titleKa: "ქართული სათაური",
  titleRu: "Русский заголовок",
  // ... etc for he, az, hy, uk
}
```

### Using Prisma Client

Always import from the singleton:
```typescript
import { prisma } from '@/lib/db'
// or
import { prisma } from '@/lib/prisma'
```

### Accessing Translations in Components

In client components:
```typescript
import { useTranslations } from 'next-intl'
const t = useTranslations('namespace')
```

In server components:
```typescript
import { getTranslations } from 'next-intl/server'
const t = await getTranslations('namespace')
```

### Admin Authentication Check

```typescript
import { auth } from "@/auth"
const session = await auth()
if (!session) {
  redirect('/admin/login')
}
```

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URL`: SQLite database path (default: file:./prisma/dev.db)
- `NEXTAUTH_SECRET`: Secret for NextAuth JWT
- `NEXTAUTH_URL`: Base URL for NextAuth (http://localhost:3002 in dev)
- `NEXT_PUBLIC_SITE_URL`: Public site URL
- Optional: HubSpot, Intercom, Google Analytics credentials

## Build Configuration

- **TypeScript**: Errors ignored during build (typescript.ignoreBuildErrors: true)
- **ESLint**: Errors ignored during build (eslint.ignoreDuringBuilds: true)
- **Port**: Development server runs on port 3002 (not default 3000)

## Database Seeding

The seed script (`prisma/seed.ts`) initializes:
- Admin user (check seed file for credentials)
- Sample developers
- Sample projects with multilingual content
- Global settings

Run with: `npm run db:seed`

## Working with the Admin Dashboard

The admin dashboard provides CRUD operations for:
- Projects (create, edit, delete, publish/unpublish)
- Developers
- Articles/Blog posts
- Global settings
- Lead management
- Quiz submission review

Access at: `http://localhost:3002/admin/dashboard` (after authentication)
