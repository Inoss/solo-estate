# Quick Setup Guide for SOLO Estate

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Set Up Sanity CMS

#### A. Create Sanity Account
1. Go to https://www.sanity.io/
2. Sign up with Google/GitHub or email
3. Click "Create Project"
4. Project name: **solo-estate**
5. Choose "Free" plan
6. Copy your **Project ID** (looks like: abc123xy)

#### B. Get API Token
1. Go to https://www.sanity.io/manage
2. Select your "solo-estate" project
3. Click "API" in the left sidebar
4. Click "Tokens" tab
5. Click "+ Add API token"
6. Name: **Development**
7. Permissions: **Editor**
8. Click "Add token"
9. **Copy the token immediately** (you won't see it again!)

#### C. Update Environment File
Open `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

### 3. Initialize Sanity Dataset

Run this command to create the dataset:
```bash
npx sanity dataset create production
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open the Application

- **Frontend (English)**: http://localhost:3000/en
- **Admin Panel (CMS)**: http://localhost:3000/studio

### 6. First Login to Sanity Studio

1. Go to http://localhost:3000/studio
2. Click "Login with Sanity"
3. Use the same account you created
4. You're in! 🎉

### 7. Add Your First Content

#### Create a Developer:
1. In Sanity Studio, click "Developer" (left sidebar)
2. Click "+ Create new Developer"
3. Fill in:
   - Name: e.g., "Premium Developers LLC"
   - Slug: Auto-generates from name
   - Upload a logo (optional)
   - Add description in English (other languages optional for now)
   - Rating: 4.5
   - Completed Projects: 25
4. Click "Publish"

#### Create a Project:
1. Click "Project" in left sidebar
2. Click "+ Create new Project"
3. Fill in required fields:
   - **Title**: Add at least English title
   - **Slug**: Click "Generate" button
   - **Status**: Choose from Off-Plan/Under Construction/Ready
   - **Property Type**: Apartment/Aparthotel/Commercial/Villa
   - **Developer**: Select the developer you just created
   - **Location**:
     - City: e.g., "Tbilisi"
     - Area: e.g., "Vake"
     - Latitude: 41.7151 (example)
     - Longitude: 44.8271 (example)
   - **Pricing**:
     - Total Price: e.g., 150000
     - Price per m²: e.g., 2500
     - Currency: USD
   - **Investment Metrics**:
     - Projected Yield: e.g., 8.5 (for 8.5%)
     - Est. Monthly Rent: e.g., 1200
   - **Delivery**:
     - Quarter: Q4
     - Year: 2025
   - **Cover Image**: Upload a property image
   - **Description**: Add English description
   - **Highlights**: Add tags like "Fully Managed", "High ROI", "Prime Location"
   - **Featured**: Check this to show on homepage
4. Click "Publish"

### 8. View Your Project on Frontend

1. Go to http://localhost:3000/en
2. You should see your project once we build the home page!

## Troubleshooting

### Issue: "Project ID not found"
- Make sure you copied the correct Project ID from Sanity dashboard
- Check that `.env.local` has no extra spaces
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Issue: "Unauthorized" in Sanity Studio
- Your API token might be wrong
- Create a new token with "Editor" permissions
- Update `.env.local` with the new token

### Issue: Sanity Studio shows blank screen
- Check browser console for errors (F12)
- Make sure you're logged into Sanity (click login button)

### Issue: Can't see content on frontend
- Make sure you clicked "Publish" in Sanity (not just Save)
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly

## Next: Build the Frontend Pages

Once Sanity is working and you have test content:
1. Build the Home page with hero section
2. Create Projects catalog page with filters
3. Add Project detail page with metrics
4. Implement Request form
5. Add remaining pages (About, FAQ, Contact)

## Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## File Locations

- **Environment Variables**: `.env.local` (in root)
- **Translations**: `messages/*.json`
- **Sanity Schemas**: `sanity/schemas/*.ts`
- **Components**: `components/**/*.tsx`
- **Pages**: `app/[locale]/**/*.tsx`

---

You're all set! Start creating content in Sanity and build out the frontend pages. 🚀
