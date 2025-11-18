# SOLO Estate - Investment Real Estate Website

A modern, multilingual investment real estate platform built with Next.js 14, Sanity CMS, and Tailwind CSS.

## 🚀 What's Built So Far

### ✅ Core Infrastructure
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS v4** with custom design system
- **7-language support** (EN, KA, RU, HE, AZ, HY, UK) with next-intl
- RTL support for Hebrew
- Custom fonts for all languages (Inter, Noto Sans Georgian, Hebrew, Armenian)

### ✅ Sanity CMS - Easy Admin Panel
- **Visual Content Studio** at `/studio`
- **No-code friendly** schemas with helpful labels and tooltips
- **Multilingual content** management for all 7 languages

#### Content Types Created:
1. **Project** - Investment properties with:
   - Pricing (price, price/m², currency)
   - Investment metrics (yield, cap rate, IRR, monthly rent)
   - Location with map coordinates
   - Gallery, videos, floor plans
   - Documents (brochures, PDFs)
   - Highlights/features
   - SEO settings
   - Full multilingual support

2. **Developer** - Real estate developers with:
   - Logo, description
   - Rating and completed projects count
   - Multilingual descriptions

3. **Article/Blog** - Content marketing with:
   - Rich text content in all languages
   - Categories (Market Report, Investment Guide, etc.)
   - Tags, author info
   - SEO settings

4. **Global Settings** - Site-wide configuration:
   - Contact information
   - Social media links
   - Trust badges
   - Partner logos
   - Header CTAs
   - Default SEO settings

### ✅ UI Components
- Button (with variants: default, secondary, outline, ghost)
- Input fields
- Card components
- Language Switcher
- Project Card (for catalog display)

## 📋 Next Steps

### 1. Set Up Sanity CMS (Required to Continue)

See **[SETUP.md](SETUP.md)** for detailed instructions.

**Quick version:**
1. Go to https://www.sanity.io/ and create a free account
2. Create a new project named "solo-estate"
3. Copy your Project ID
4. Update `.env.local` with your credentials

### 2. Run the Development Server

```bash
npm run dev
```

Then open:
- **Website**: http://localhost:3000/en (or /ru, /ka, /he, etc.)
- **CMS Admin Panel**: http://localhost:3000/studio

### 3. Still To Build

- [ ] Home page with hero section
- [ ] Projects catalog page with filters
- [ ] Project detail page
- [ ] Request Offer form with CRM integration
- [ ] About, Services, FAQ pages
- [ ] Blog/Insights section
- [ ] Live chat integration (Intercom/Crisp)
- [ ] SEO configuration (metadata, sitemaps, hreflang)
- [ ] Google Analytics GA4
- [ ] Cookie consent banner

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Main CTAs, links
- **Accent**: Orange (#f59e0b) - Highlights, yields
- **Background**: White (#ffffff) / Dark (#0a0a0a)
- **Borders**: Light gray (#e2e8f0)

### Typography
- **Sans Serif**: Inter (Latin, Cyrillic)
- **Georgian**: Noto Sans Georgian
- **Hebrew**: Noto Sans Hebrew (RTL support)
- **Armenian**: Noto Sans Armenian

## 📁 Project Structure

```
solo-estate/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── layout.tsx      # Main layout with i18n
│   │   └── page.tsx        # Home page (to be built)
│   ├── studio/             # Sanity CMS Admin Panel
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── language-switcher.tsx
│   └── project-card.tsx
├── sanity/
│   ├── schemas/            # Content models
│   │   ├── project.ts
│   │   ├── developer.ts
│   │   ├── article.ts
│   │   └── settings.ts
│   ├── lib/               # Sanity utilities
│   └── sanity.config.ts
├── messages/              # Translations (7 languages)
├── lib/                   # Utility functions
└── i18n.ts               # i18n configuration
```

## 🌍 Supported Languages

| Code | Language | Script |
|------|----------|--------|
| en   | English  | Latin  |
| ka   | ქართული (Georgian) | Georgian |
| ru   | Русский (Russian) | Cyrillic |
| he   | עברית (Hebrew) | Hebrew (RTL) |
| az   | Azərbaycan (Azerbaijani) | Latin |
| hy   | Հայերեն (Armenian) | Armenian |
| uk   | Українська (Ukrainian) | Cyrillic |

## 🔧 Configuration Files

- **next.config.ts** - Next.js with i18n plugin, image optimization
- **middleware.ts** - Locale detection and routing
- **i18n.ts** - Supported locales and configuration
- **tailwind** - via postcss.config.mjs and globals.css

## 🎯 Key Features

- ✅ **7 Languages** with full localization
- ✅ **RTL Support** for Hebrew
- ✅ **Non-coder Admin Panel** (Sanity Studio)
- ✅ **Investment Metrics** (Yield, Cap Rate, IRR)
- ✅ **Image Optimization** (WebP/AVIF)
- ⏳ **Lead Generation** (Request forms + CRM)
- ⏳ **Live Chat** (Intercom/Crisp/Tawk.to)
- ⏳ **SEO Optimized** (sitemaps, hreflang, schema.org)

## 🚨 Important Notes

1. **Sanity Setup Required**: The project won't run without Sanity credentials
2. **No Online Payments**: This is lead generation only (as per spec)
3. **Mobile-First**: All designs are responsive
4. **Performance**: Lighthouse targets 90+ on all metrics

## 📞 Support

For questions about this project, refer to the technical specification or check:
- Next.js docs: https://nextjs.org/docs
- Sanity docs: https://www.sanity.io/docs
- next-intl docs: https://next-intl-docs.vercel.app/

---

**Built with** Next.js 14, Sanity CMS, Tailwind CSS, TypeScript

