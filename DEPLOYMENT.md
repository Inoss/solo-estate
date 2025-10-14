# SOLO Estate - Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### 1. Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free at vercel.com)
- Sanity account (free at sanity.io)
- Resend account for emails (free at resend.com) - Optional but recommended

### 2. Push to Git Repository
```bash
cd solo-estate
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Next.js
4. Click "Deploy"

### 4. Configure Environment Variables in Vercel

Go to your project → Settings → Environment Variables and add:

#### Required Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

#### Email Configuration (Optional):
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=SOLO Estate <noreply@yourdomain.com>
EMAIL_TO=info@yourdomain.com
```

#### Analytics (Optional):
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Live Chat (Optional):
```
NEXT_PUBLIC_TAWK_PROPERTY_ID=xxxxx
NEXT_PUBLIC_TAWK_WIDGET_ID=xxxxx
```

### 5. Set Up Sanity Studio

1. Create a Sanity account at https://sanity.io
2. Create a new project
3. Copy your Project ID and add it to environment variables
4. Create an API token with "Editor" permissions
5. Access your Sanity Studio at: `https://yourdomain.com/studio`

### 6. Domain Configuration

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## 🔧 Alternative Deployment Options

### Deploy to Netlify

1. Push code to Git
2. Go to https://app.netlify.com/start
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables in Site Settings → Environment variables

### Deploy to Railway

1. Push code to Git
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variables
6. Railway will auto-deploy

### Self-Hosted (VPS/Cloud Server)

```bash
# 1. Clone repository
git clone YOUR_REPOSITORY_URL
cd solo-estate

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local
# Edit .env.local with your actual values

# 4. Build the application
npm run build

# 5. Start the production server
npm start
```

For production, use a process manager like PM2:
```bash
npm install -g pm2
pm2 start npm --name "solo-estate" -- start
pm2 save
pm2 startup
```

---

## 📧 Email Setup (Resend)

1. Create account at https://resend.com
2. Verify your domain or use their test domain
3. Create an API key
4. Add to environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM=SOLO Estate <noreply@yourdomain.com>
   EMAIL_TO=info@yourdomain.com
   ```

---

## 📊 Analytics Setup

### Google Analytics GA4
1. Create a GA4 property at https://analytics.google.com
2. Copy your Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## 💬 Live Chat Setup (Tawk.to - FREE)

1. Create account at https://www.tawk.to
2. Add a new property/website
3. Copy Property ID and Widget ID from the admin panel
4. Add to environment variables:
   ```
   NEXT_PUBLIC_TAWK_PROPERTY_ID=xxxxx
   NEXT_PUBLIC_TAWK_WIDGET_ID=xxxxx
   ```

---

## 🗄️ Database Setup (Sanity CMS)

1. Go to https://www.sanity.io/manage
2. Create a new project
3. Copy the Project ID
4. Generate an API token (Settings → API → Tokens)
5. Update environment variables
6. Access Sanity Studio at `/studio` on your deployed site
7. Start adding content (Projects, Articles, Settings)

---

## 🔐 Security Checklist

- [ ] All environment variables are set in production
- [ ] Sanity API tokens are kept secret
- [ ] Email API keys are not committed to git
- [ ] CORS is properly configured in Sanity
- [ ] Domain is set up with HTTPS
- [ ] CSP headers are configured (optional but recommended)

---

## 🧪 Testing Before Launch

```bash
# Test production build locally
npm run build
npm start

# Visit http://localhost:3000
```

### Pages to Test:
- [ ] Home page loads
- [ ] All 7 language versions work
- [ ] Projects page displays
- [ ] Project detail pages load
- [ ] About page renders
- [ ] Services page works
- [ ] FAQ page functions
- [ ] Contact form submits
- [ ] Insights/blog loads
- [ ] Sanity Studio accessible at `/studio`

---

## 📝 Post-Deployment Tasks

1. **Add Content to Sanity**
   - Create Developers
   - Add Projects
   - Write Articles
   - Configure Global Settings

2. **Test Forms**
   - Submit a test contact form
   - Submit a test project inquiry
   - Verify emails are received

3. **Configure Analytics**
   - Verify GA4 is tracking
   - Set up conversion goals
   - Configure custom events

4. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Verify all pages are indexed
   - Check mobile usability

5. **Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Optimize images in Sanity

---

## 🆘 Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Node.js version (18.x or higher)
- Check package.json for missing dependencies

### Forms Not Working
- Verify API endpoints are accessible
- Check Resend API key is valid
- Inspect browser console for errors

### Sanity Studio Not Loading
- Verify Project ID is correct
- Check API token permissions
- Clear browser cache

### Images Not Loading
- Verify Sanity CDN domain is in next.config.ts
- Check image URLs in Sanity
- Verify CORS settings

---

## 🔄 Continuous Deployment

With Vercel/Netlify, every push to `main` branch automatically deploys.

To deploy a specific branch:
1. Create a new branch
2. Push changes
3. Platform will create a preview deployment
4. Merge to main for production deployment

---

## 📞 Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- Sanity: https://www.sanity.io/docs

---

**Your SOLO Estate website is ready to launch! 🎉**
