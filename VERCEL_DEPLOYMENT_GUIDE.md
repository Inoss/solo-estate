# 🚀 SOLO Estate - Vercel Deployment Guide

## Step-by-Step Deployment Instructions

### Part 1: Create GitHub Repository (5 minutes)

1. **Go to GitHub**
   - Visit: https://github.com
   - Sign in (or create account if you don't have one)

2. **Create New Repository**
   - Click the **"+"** button (top right)
   - Select **"New repository"**
   - Name: `solo-estate` (or any name you prefer)
   - Description: "SOLO Estate - Investment Real Estate Platform"
   - Choose **Private** (recommended) or Public
   - **DO NOT** check "Initialize with README" (we already have one)
   - Click **"Create repository"**

3. **Copy the Repository URL**
   - GitHub will show you a page with commands
   - Copy the repository URL (looks like: `https://github.com/YOUR_USERNAME/solo-estate.git`)

### Part 2: Push Code to GitHub (2 minutes)

1. **Open your terminal/command prompt in the solo-estate folder**

2. **Run these commands:**
   ```bash
   cd solo-estate
   git remote add origin YOUR_GITHUB_URL_HERE
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_GITHUB_URL_HERE` with the URL you copied from GitHub.

3. **Refresh GitHub page** - you should see all your files uploaded!

### Part 3: Deploy to Vercel (5 minutes)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click **"Sign Up"** or **"Login"**
   - Choose **"Continue with GitHub"** (easiest option)
   - Authorize Vercel to access your GitHub

2. **Import Your Project**
   - Click **"Add New..."** → **"Project"**
   - Find `solo-estate` in your repository list
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

4. **Add Environment Variables**
   Click **"Environment Variables"** and add these:

   **Essential (add these first):**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = placeholder
   NEXT_PUBLIC_SANITY_DATASET = production
   SANITY_API_TOKEN = placeholder
   NEXT_PUBLIC_SITE_URL = https://your-project-name.vercel.app
   ```

   **Optional (add later when you set up services):**
   ```
   RESEND_API_KEY = (get from resend.com)
   EMAIL_FROM = SOLO Estate <noreply@yourdomain.com>
   EMAIL_TO = info@yourdomain.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID = (get from Google Analytics)
   NEXT_PUBLIC_TAWK_PROPERTY_ID = (get from tawk.to)
   NEXT_PUBLIC_TAWK_WIDGET_ID = (get from tawk.to)
   ```

5. **Deploy!**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `https://solo-estate-xyz123.vercel.app`

6. **Visit Your Site!**
   - Click the URL to see your live website! 🎉

### Part 4: Connect Your Custom Domain from domanebi.ge (10 minutes)

1. **In Vercel Dashboard**
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Enter your domain name (e.g., `yourdomain.ge`)
   - Click **"Add"**

2. **Vercel will show you DNS records to add**
   You'll see something like:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Log into domanebi.ge**
   - Go to your domain management panel
   - Find **"DNS Settings"** or **"DNS Zone Editor"**

4. **Add DNS Records**
   - Add the **A record** that Vercel gave you:
     - Type: A
     - Host: @ (or leave blank)
     - Points to: 76.76.21.21 (Vercel's IP)
     - TTL: 3600 (or Auto)

   - Add the **CNAME record**:
     - Type: CNAME
     - Host: www
     - Points to: cname.vercel-dns.com
     - TTL: 3600 (or Auto)

5. **Wait for DNS Propagation**
   - DNS changes take 5 minutes to 24 hours (usually 30 minutes)
   - Vercel will automatically verify and issue SSL certificate
   - You'll get a green checkmark when it's ready

6. **Done!**
   Your site will be live at:
   - `https://yourdomain.ge`
   - `https://www.yourdomain.ge`

### Part 5: Set Up Sanity CMS (10 minutes)

1. **Create Sanity Account**
   - Go to: https://www.sanity.io
   - Click **"Get started"**
   - Sign up with Google/GitHub (easiest)

2. **Create New Project**
   - Click **"Create new project"**
   - Name: "SOLO Estate"
   - Choose **"Free"** plan
   - Click **"Create project"**

3. **Get Your Credentials**
   - After creation, you'll see:
     - **Project ID** (looks like: `abc123xyz`)
   - Copy this!

4. **Create API Token**
   - In Sanity dashboard, go to **"API"** tab
   - Click **"Add API token"**
   - Name: "Production Token"
   - Permissions: **"Editor"**
   - Click **"Create"**
   - **Copy the token immediately** (you won't see it again!)

5. **Add to Vercel**
   - Go back to Vercel
   - Go to your project → **"Settings"** → **"Environment Variables"**
   - **Edit** these variables:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID = YOUR_PROJECT_ID_HERE
     SANITY_API_TOKEN = YOUR_TOKEN_HERE
     ```
   - Click **"Save"**

6. **Redeploy**
   - Go to **"Deployments"** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**
   - Wait 2 minutes

7. **Access Sanity Studio**
   - Visit: `https://yourdomain.ge/studio` (or your Vercel URL)
   - Sign in with your Sanity account
   - You can now add projects, developers, blog posts!

### Part 6: Import Sample Projects (5 minutes)

1. **Option A: Manual Import via Studio**
   - Go to `https://yourdomain.ge/studio`
   - Click **"Project"** → **"+"** to create new project
   - Fill in the details from `scripts/sample-investment-projects.json`
   - Upload images
   - Publish

2. **Option B: Automated Import (if Sanity is set up)**
   - On your local machine, update `.env.local` with Sanity credentials
   - Run: `node scripts/upload-to-sanity.js`
   - This will import all 5 sample projects automatically

---

## 📊 What You'll Have After Deployment

✅ **Live Website** at your custom domain
✅ **Automatic SSL** (HTTPS)
✅ **Sanity CMS** for content management
✅ **7 Languages** working (EN, KA, RU, HE, AZ, HY, UK)
✅ **All Pages**:
   - Home page with hero & featured projects
   - Projects listing with filters
   - Individual project pages
   - About, Services, FAQ, Contact, Insights
✅ **SEO Optimized** with sitemap & metadata
✅ **Mobile Responsive**
✅ **Lightning Fast** performance

---

## 🔄 Future Updates

When you want to update your site:

1. **Make changes locally**
2. **Commit to Git:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Vercel auto-deploys!** (takes 2-3 minutes)

---

## 💰 Costs

- **Vercel Hosting:** FREE (for your needs)
- **Sanity CMS:** FREE (up to 10 users, unlimited projects)
- **Domain:** Already paid at domanebi.ge
- **Total monthly cost:** $0 🎉

---

## 🆘 Troubleshooting

### Build fails on Vercel
- Check the build logs
- Usually it's a missing environment variable
- Make sure `NEXT_PUBLIC_SITE_URL` is set correctly

### Domain not connecting
- DNS can take up to 24 hours
- Double-check the A and CNAME records
- Make sure there are no conflicting records

### Sanity Studio shows errors
- Verify Project ID is correct
- Check that API token has Editor permissions
- Try redeploying after adding credentials

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Built with Next.js 15, Sanity CMS, and ❤️**
