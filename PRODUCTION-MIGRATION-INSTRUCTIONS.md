# Production Database Migration Instructions

## Overview

Your local SQLite database has **87 real projects with korter.ge images**, but your production PostgreSQL database only has 6 sample projects.

This guide explains how to migrate all 87 projects to production.

## Files

- `production-data.json` - Exported data containing all 87 projects with images (16 developers + 87 projects)
- `scripts/import-to-production.ts` - Script to import data into production PostgreSQL database

## Option 1: Import via Command Line (Recommended)

If you have access to a terminal with Node.js and can connect to your production database:

```bash
# Make sure you're in the project root directory
cd /path/to/solo-estate

# Run the import script with production DATABASE_URL
DATABASE_URL="your-production-postgres-url" npx tsx scripts/import-to-production.ts
```

Replace `your-production-postgres-url` with your actual production PostgreSQL connection string from `.env.production`.

The script will:
1. Read `production-data.json`
2. Import all 16 developers
3. Import all 87 projects with their real korter.ge images
4. Show progress for each project
5. Display final statistics

## Option 2: Import via Vercel CLI

If you're using Vercel, you can run the import directly:

```bash
# Connect to Vercel project
vercel link

# Run the import script in Vercel environment
vercel env pull .env.production
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2-)" npx tsx scripts/import-to-production.ts
```

## Option 3: Manual Import via Admin Dashboard

If you prefer, you can manually add projects through the admin dashboard at `/admin/dashboard`. However, this would require adding all 87 projects one by one, which is time-consuming.

## What Gets Imported

### Developers (16 total)
- Next Group
- Biograpi Living
- Archi
- X2 Development
- Metropol
- Blox
- ELT Building
- Gumbati Group
- Monolith Group
- Domus Development
- Alliance Group
- Index I Wealth Management
- Apart Development
- Anagi Development
- Pillar Group
- VR Holding

### Projects (87 total)
All projects include:
- ✅ Cover images from korter.ge (Google Cloud Storage)
- ✅ Gallery images
- ✅ Multilingual titles (EN, KA, RU)
- ✅ Descriptions
- ✅ Location information
- ✅ Property type and status
- ✅ Developer association

## Verification

After running the import, verify on your production site:
1. Visit https://soloestate.ge/en/projects
2. You should see all 87 projects with images
3. Check that images load correctly

## Troubleshooting

### "Provider mismatch" error
The Prisma schema must be set to `provider = "postgresql"` when running the import. The script expects this.

### "Table doesn't exist" error
Run migrations on production first:
```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

### Images not showing
Verify that the image URLs are accessible:
- All images are hosted at: `https://storage.googleapis.com/bd-ge-01/buildings-v2/`
- Check your `next.config.ts` allows this domain

## Notes

- The import script uses `upsert` logic - it will update existing projects and create new ones
- No data will be deleted - only added or updated
- The script is idempotent - safe to run multiple times
- Estimated time: 2-3 minutes for all 87 projects

## Support

If you encounter issues:
1. Check that your production DATABASE_URL is correct
2. Verify the production database schema is up to date
3. Ensure Node.js and tsx are installed
4. Check the error messages - they usually indicate the specific issue
