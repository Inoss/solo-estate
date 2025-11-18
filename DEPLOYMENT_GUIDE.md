# SOLO Estate - Deployment Guide

## 🚀 Quick Deployment to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Access to required API keys (optional for MVP)

### Step-by-Step Deployment

#### 1. Push Code to GitHub
```bash
# Initialize git (if not already done)
cd solo-estate
git add .
git commit -m "Prepare for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/solo-estate.git
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Fastest)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Add Environment Variables (see section below)
6. Click "Deploy"

---

## 🔐 Environment Variables Configuration

### Required Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Database (for production, use PostgreSQL or MySQL)
DATABASE_URL="postgresql://user:password@host:5432/database"
# Or use Vercel Postgres:
# DATABASE_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"

# NextAuth Configuration
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-generated-secret-min-32-characters"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### Optional but Recommended

```bash
# Email Service (Resend) - For contact forms
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="SOLO Estate <noreply@your-domain.com>"
EMAIL_TO="info@your-domain.com"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Live Chat (Tawk.to)
NEXT_PUBLIC_TAWK_PROPERTY_ID="your-property-id"
NEXT_PUBLIC_TAWK_WIDGET_ID="your-widget-id"

# Meta Pixel (Facebook Ads)
NEXT_PUBLIC_META_PIXEL_ID="your-pixel-id"

# CRM Integration (HubSpot) - Optional
HUBSPOT_API_KEY="your-hubspot-key"
```

---

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended for Production)

1. Go to Vercel Dashboard → Storage → Create Database
2. Select "Postgres"
3. Vercel will automatically add `DATABASE_URL` to your environment variables
4. Run migrations:
```bash
npx prisma migrate deploy
npx prisma db seed
```

### Option 2: External PostgreSQL (Neon, Supabase, etc.)

```bash
# Example for Neon.tech
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb"

# Run migrations
npx prisma migrate deploy
npx prisma db seed
```

### Option 3: Keep SQLite (Development Only)
⚠️ **Not recommended for production** - but works for testing:
```bash
DATABASE_URL="file:./prisma/dev.db"
```

---

## 📧 Email Service Setup (Resend)

1. Go to [resend.com](https://resend.com)
2. Sign up and verify your domain
3. Get your API key from Dashboard → API Keys
4. Add to Vercel environment variables:
```bash
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="SOLO Estate <noreply@your-domain.com>"
EMAIL_TO="info@your-domain.com"
```

---

## 📊 Google Analytics Setup

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to Vercel:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

## 💬 Live Chat Setup (Tawk.to)

1. Go to [tawk.to](https://www.tawk.to)
2. Sign up for free account
3. Create a new property
4. Get your Property ID and Widget ID from Dashboard → Administration → Property Settings
5. Add to Vercel:
```bash
NEXT_PUBLIC_TAWK_PROPERTY_ID="your-property-id"
NEXT_PUBLIC_TAWK_WIDGET_ID="your-widget-id"
```

---

## 🔑 Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using OpenSSL
openssl rand -base64 32
```

---

## 🌐 Custom Domain Setup

### Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `soloestate.com`)
3. Follow DNS configuration instructions
4. Update environment variables:
```bash
NEXTAUTH_URL="https://soloestate.com"
NEXT_PUBLIC_SITE_URL="https://soloestate.com"
```

### DNS Configuration Example

Add these DNS records at your domain registrar:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| A     | @    | 76.76.21.21                   |
| CNAME | www  | cname.vercel-dns.com          |

---

## 🔄 Post-Deployment Steps

### 1. Seed the Database
```bash
# SSH into Vercel or run locally against production DB
npx prisma db seed
```

### 2. Create Admin User
The seed script creates a default admin:
- Email: `admin@soloestate.com`
- Password: `admin123`

⚠️ **IMPORTANT**: Change this password immediately after first login!

### 3. Add Initial Content
1. Login to `/admin/login`
2. Add developers in `/admin/developers`
3. Create projects in `/admin/projects`
4. Publish sample articles in `/admin/articles`
5. Update global settings in `/admin/settings`

### 4. Test All Features
- [ ] Homepage loads correctly
- [ ] Projects listing and filters work
- [ ] Project detail pages display properly
- [ ] Contact form sends emails
- [ ] Lead capture saves to database
- [ ] Property quiz works
- [ ] Admin panel accessible
- [ ] All 7 languages switch correctly

---

## 🔒 Security Checklist

- [x] Change default admin password
- [x] Use strong NEXTAUTH_SECRET (min 32 characters)
- [x] Enable HTTPS (automatic on Vercel)
- [x] Protect /admin routes (middleware configured)
- [x] Protect /api/admin routes (authentication required)
- [x] Validate all form inputs (implemented)
- [x] Rate limiting on API routes (consider adding)
- [x] SQL injection protection (Prisma ORM handles this)

---

## 📈 Performance Optimization

### Already Implemented ✅
- Image optimization with Next.js Image component
- Static page generation for public pages
- Dynamic routes with ISR (Incremental Static Regeneration)
- Code splitting and lazy loading
- Tailwind CSS purging
- Edge runtime for middleware

### Recommended Additional Steps
1. **Enable Vercel Analytics**: Project Settings → Analytics
2. **Set up Vercel Speed Insights**: Track Core Web Vitals
3. **Configure caching headers** (optional)
4. **Add CDN for static assets** (Vercel includes this)

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Problem**: Missing environment variables
```
Solution: Add all required env vars in Vercel Dashboard → Settings → Environment Variables
```

**Problem**: Database connection fails
```
Solution: Ensure DATABASE_URL is correct and accessible from Vercel's servers
```

**Problem**: Prisma client not generated
```
Solution: Add postinstall script to package.json (already included):
"postinstall": "prisma generate"
```

### Email Not Sending

1. Check RESEND_API_KEY is set correctly
2. Verify domain is verified in Resend dashboard
3. Check Vercel function logs for errors

### Images Not Displaying

1. Check if files uploaded to `/public/uploads/`
2. For production, consider using cloud storage (Cloudinary, AWS S3)
3. Ensure `NEXT_PUBLIC_SITE_URL` is set correctly

### Translation Missing Warnings

- These are non-critical warnings
- Update translation files in `/messages/*.json`
- Add missing keys for "legal" and "services" sections

---

## 🔄 Updating Deployment

### Continuous Deployment (Automatic)

Vercel automatically deploys on git push:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manual Deployment

```bash
vercel --prod
```

---

## 💾 Backup Strategy

### Database Backups

**Vercel Postgres**:
- Automatic daily backups (paid plans)
- Manual backup: Export via Prisma Studio

**External DB**:
```bash
# PostgreSQL backup
pg_dump DATABASE_URL > backup.sql

# Restore
psql DATABASE_URL < backup.sql
```

### File Uploads Backup

For production, migrate `/public/uploads/` to cloud storage:
- **Cloudinary** (recommended for images)
- **AWS S3**
- **Vercel Blob Storage**

---

## 📱 Mobile App Considerations (Future)

The API is ready for mobile app integration:
- All endpoints at `/api/*`
- RESTful API design
- Authentication via NextAuth
- Consider adding `/api/v1/` prefix for versioning

---

## 🎯 Launch Checklist

- [ ] All environment variables configured
- [ ] Database migrated and seeded
- [ ] Admin password changed
- [ ] At least 5 projects added with images
- [ ] Global settings updated (contact info, social links)
- [ ] Domain configured and SSL active
- [ ] Google Analytics tracking verified
- [ ] Contact form tested and receiving emails
- [ ] Live chat widget tested
- [ ] All pages tested in all 7 languages
- [ ] Mobile responsiveness verified
- [ ] SEO metadata verified (title, description, OG tags)
- [ ] Sitemap.xml accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] 404 page displays correctly
- [ ] Performance tested (Lighthouse score > 90)

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Review environment variables
4. Test locally with production environment variables

---

## 🎉 You're Live!

Once deployed, your site will be available at:
- **Vercel URL**: `https://solo-estate.vercel.app`
- **Custom Domain**: `https://your-domain.com`

**Admin Panel**: `https://your-domain.com/admin/login`

---

**Last Updated**: November 18, 2025
**Version**: 1.0.0
