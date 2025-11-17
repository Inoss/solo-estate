# SOLO Estate Admin Dashboard - Testing Guide

## Server Status
The development server is running at: **http://localhost:3002**

---

## Test 1: Authentication System

### Login Test
1. Visit: http://localhost:3002/admin/login
2. Use these credentials:
   - **Email**: `admin@soloestate.com`
   - **Password**: `admin123`
3. Click "Sign In"
4. **Expected Result**: You should be redirected to the dashboard

### Protected Routes Test
1. Try to access: http://localhost:3002/admin/dashboard without logging in
2. **Expected Result**: You should be redirected to the login page
3. After logging in, try the same URL
4. **Expected Result**: You should see the dashboard

---

## Test 2: Dashboard Overview

### Navigate Dashboard
1. After logging in, you should see:
   - **Statistics Cards**: Total Projects, Developers, Articles (currently 0)
   - **Quick Actions**: Links to add new content
   - **Sidebar Navigation**: Dashboard, Projects, Developers, Articles, Settings

### Sidebar Navigation Test
1. Click on each menu item in the sidebar:
   - Dashboard ✓
   - Projects ✓
   - Developers (not created yet)
   - Articles (not created yet)
   - Settings (not created yet)

---

## Test 3: Projects Management (Complete CRUD)

### View Projects List
1. Click "Projects" in the sidebar
2. Visit: http://localhost:3002/admin/projects
3. **Expected Result**: Empty table with "No projects yet" message
4. You should see an "Add New Project" button

### Create New Project
1. Click "Add New Project" button
2. You should see a comprehensive form with sections:
   - **Basic Information**
   - **Property Details**
   - **Pricing**
   - **Media**
   - **Publishing**

3. **Fill in the form** (test multilingual features):
   - Title in English: `Luxury Apartment in Tbilisi`
   - Switch language tabs (🇬🇧 🇬🇪 🇷🇺 🇮🇱 🇦🇿 🇦🇲 🇺🇦)
   - Add titles in other languages if you want
   - Slug: Auto-generated (or enter custom: `luxury-apartment-tbilisi`)
   - Description: Add some text
   - Status: Select `Off Plan`
   - Property Type: Select `Apartment`
   - Area: `120.5`
   - Price: `250000`
   - Currency: `USD`

4. **Test Image Upload**:
   - Click "Click to upload image" in Cover Image section
   - Select an image from your computer (PNG, JPG, GIF - max 5MB)
   - **Expected**: Upload progress, then image preview appears
   - You should see an X button to remove the image

5. **Test Gallery Upload**:
   - Click "Click to upload images" in Project Gallery section
   - Select multiple images
   - **Expected**: All images upload and appear in a grid
   - Hover over images to see the delete button

6. **Publishing Options**:
   - Check/uncheck "Publish immediately"

7. Click "Create Project"
8. **Expected Result**: Redirected to projects list with your new project

### View Projects List (With Data)
1. You should now see your project in the table:
   - Title
   - Type (Apartment)
   - Status (Off Plan badge)
   - Price (USD 250,000)
   - Published status (green badge)
   - Edit and Delete buttons

### Edit Project
1. Click the "Edit" button on your project
2. **Expected**: Form loads with all your data pre-filled
3. Make changes:
   - Change price to `275000`
   - Upload a new gallery image
   - Add description in another language
4. Click "Save Changes"
5. **Expected**: Redirected to projects list with updated data

### Delete Project
1. Click the "Delete" button on your project
2. **Expected**: Confirmation dialog appears
3. Confirm deletion
4. **Expected**: Project disappears from the list

---

## Test 4: Multilingual Input Component

### Test Language Tabs
1. Create a new project
2. In the Title field, click different language tabs:
   - 🇬🇧 English
   - 🇬🇪 Georgian
   - 🇷🇺 Russian
   - 🇮🇱 Hebrew
   - 🇦🇿 Azerbaijani
   - 🇦🇲 Armenian
   - 🇺🇦 Ukrainian

3. Enter different text in each language
4. Switch between tabs
5. **Expected**: Each language tab remembers its content
6. Save the project
7. Edit it again
8. **Expected**: All language content is preserved

---

## Test 5: File Upload System

### Test Single Image Upload
1. Create new project
2. Upload a cover image
3. **Expected Behavior**:
   - Upload progress indicator
   - Image preview appears
   - Image is saved to `public/uploads/images/`
   - URL is like `/uploads/images/1234567890-abc123.jpg`

### Test Gallery Upload
1. Select 3-5 images at once
2. **Expected**:
   - All images upload in parallel
   - Grid of thumbnails appears
   - Each has a delete button on hover

### Test Image Removal
1. Click X button on uploaded image
2. **Expected**: Image preview disappears immediately

### Test File Validation
1. Try to upload a very large file (>5MB)
2. **Expected**: Error message about file size
3. Try to upload a non-image file (.pdf, .txt)
4. **Expected**: Error message about file type

---

## Test 6: Form Validation

### Required Fields
1. Try to create a project without filling required fields
2. Click "Create Project"
3. **Expected**: Browser validation messages appear
4. Required fields:
   - Title (English)
   - Slug
   - Status
   - Property Type
   - Price

### Auto-Slug Generation
1. Start typing English title: "My Awesome Project"
2. **Expected**: Slug field auto-fills with: `my-awesome-project`
3. You can manually edit the slug if needed

---

## Test 7: Logout

1. Click "Sign Out" button in sidebar
2. **Expected**: Redirected to login page
3. Try to access admin pages
4. **Expected**: Redirected back to login

---

## What's Working (✅ Completed)

1. ✅ **Authentication System**
   - Login with email/password
   - Session management
   - Protected routes
   - Logout functionality

2. ✅ **Admin Dashboard**
   - Statistics overview
   - Quick actions
   - Responsive sidebar navigation

3. ✅ **Projects CRUD**
   - ✅ List all projects
   - ✅ Create new project
   - ✅ Edit existing project
   - ✅ Delete project
   - ✅ Multilingual support (7 languages)
   - ✅ Image uploads (single + gallery)
   - ✅ Form validation
   - ✅ Auto-slug generation

4. ✅ **Database**
   - SQLite local database
   - Prisma ORM
   - Automatic migrations

5. ✅ **File Storage**
   - Local file uploads
   - Image preview
   - Multiple file support

---

## What's NOT Yet Built (⏳ Pending)

1. ⏳ Developers Management (CRUD)
2. ⏳ Articles Management (CRUD)
3. ⏳ Global Settings
4. ⏳ Public API Routes (for frontend)
5. ⏳ Frontend Integration with new API
6. ⏳ Remove Sanity dependencies

---

## Common Issues & Solutions

### Issue: Can't login
**Solution**: Make sure you ran the seed script:
```bash
cd solo-estate
npm run db:seed
```

### Issue: Images not uploading
**Solution**: Check that `public/uploads` directories exist:
```bash
mkdir -p public/uploads/images public/uploads/documents public/uploads/gallery
```

### Issue: Database errors
**Solution**: Reset the database:
```bash
cd solo-estate
npx prisma migrate reset
npm run db:seed
```

### Issue: Page not found
**Solution**: Make sure dev server is running:
```bash
npm run dev
```

---

## File Structure Created

```
solo-estate/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   │   └── page.tsx            # Dashboard home
│   │   └── projects/
│   │       ├── layout.tsx          # Projects layout
│   │       ├── page.tsx            # Projects list
│   │       ├── new/page.tsx        # Create project form
│   │       └── [id]/page.tsx       # Edit project form
│   └── api/
│       └── admin/
│           ├── upload/route.ts     # File upload endpoint
│           └── projects/
│               ├── route.ts        # GET, POST projects
│               └── [id]/route.ts   # GET, PUT, DELETE project
├── components/
│   └── admin/
│       ├── Sidebar.tsx             # Admin navigation
│       ├── MultilingualInput.tsx   # 7 language tabs component
│       ├── ImageUpload.tsx         # Single image uploader
│       └── GalleryManager.tsx      # Multiple images uploader
├── lib/
│   ├── db.ts                       # Prisma client
│   └── upload.ts                   # File upload utilities
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── seed.ts                     # Seed admin user
│   └── dev.db                      # SQLite database file
└── public/
    └── uploads/                    # Uploaded files storage
        ├── images/
        ├── documents/
        └── gallery/
```

---

## Next Steps for Testing

1. **Create Multiple Projects** - Test with different:
   - Property types (Apartment, Villa, Commercial)
   - Statuses (Off Plan, Under Construction, Ready)
   - Currencies (USD, EUR, GEL, RUB)
   - With and without images

2. **Test Edge Cases**:
   - Very long titles
   - Special characters in slugs
   - Decimal prices
   - Multiple gallery images (10+)

3. **Test Workflow**:
   - Create → Edit → Delete cycle
   - Create draft → Publish later
   - Add images → Remove → Add different ones

Happy Testing! 🎉
