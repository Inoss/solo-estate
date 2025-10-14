/**
 * Script to upload scraped BD Group projects to Sanity CMS
 * Run with: node scripts/upload-to-sanity.js
 */

const { createClient } = require('@sanity/client');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function uploadImage(imageUrl, projectTitle) {
  try {
    console.log(`  Downloading image: ${imageUrl}`);

    // Download image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const buffer = Buffer.from(response.data);

    // Determine mime type from URL or response
    let mimeType = response.headers['content-type'] || 'image/jpeg';
    if (!mimeType.startsWith('image/')) {
      mimeType = 'image/jpeg';
    }

    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: `${projectTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`,
      contentType: mimeType,
    });

    console.log(`  ✓ Image uploaded: ${asset._id}`);
    return asset;

  } catch (error) {
    console.error(`  ✗ Failed to upload image: ${error.message}`);
    return null;
  }
}

async function findOrCreateDeveloper(developerName) {
  if (!developerName) {
    return null;
  }

  try {
    // Search for existing developer
    const query = `*[_type == "developer" && name == $name][0]`;
    const existing = await client.fetch(query, { name: developerName });

    if (existing) {
      console.log(`  Using existing developer: ${developerName}`);
      return { _type: 'reference', _ref: existing._id };
    }

    // Create new developer
    console.log(`  Creating new developer: ${developerName}`);
    const newDeveloper = await client.create({
      _type: 'developer',
      name: developerName,
      rating: 4.5,
      projectsCount: 1,
      description: {
        en: `${developerName} is a reputable real estate developer.`,
        ka: `${developerName} არის სანდო უძრავი ქონების დეველოპერი.`,
        ru: `${developerName} — авторитетный застройщик недвижимости.`,
        he: `${developerName} הוא יזם נדל"ן מוכר.`,
        az: `${developerName} etibarlı daşınmaz əmlak tərtibatçısıdır.`,
        hy: `${developerName}-ը հեղինակավոր անշարժ գույքի մշակող է:`,
        uk: `${developerName} — авторитетний забудовник нерухомості.`,
      },
    });

    return { _type: 'reference', _ref: newDeveloper._id };

  } catch (error) {
    console.error(`  Error with developer: ${error.message}`);
    return null;
  }
}

async function uploadProject(projectData) {
  try {
    console.log(`\n📦 Processing: ${projectData.title.en}`);

    // Check if project already exists
    const query = `*[_type == "project" && slug.current == $slug][0]`;
    const existing = await client.fetch(query, { slug: projectData.slug.current });

    if (existing) {
      console.log(`  ⚠️  Project already exists, skipping...`);
      return existing;
    }

    // Handle developer
    const developerRef = await findOrCreateDeveloper(projectData._developerName);

    // Collect all image URLs
    const imageUrls = [];
    if (projectData._imageUrl) {
      imageUrls.push(projectData._imageUrl);
    }
    if (projectData._imageUrls && projectData._imageUrls.length > 0) {
      imageUrls.push(...projectData._imageUrls);
    }

    // Upload cover image
    let coverImageRef = null;
    if (imageUrls.length > 0) {
      const coverAsset = await uploadImage(imageUrls[0], projectData.title.en);
      if (coverAsset) {
        coverImageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: coverAsset._id,
          },
          alt: projectData.title.en,
        };
      }
    }

    // Upload gallery images (limit to 5 to save time)
    const galleryImages = [];
    if (imageUrls.length > 1) {
      const imagesToUpload = imageUrls.slice(1, 6);
      for (const imageUrl of imagesToUpload) {
        const asset = await uploadImage(imageUrl, projectData.title.en);
        if (asset) {
          galleryImages.push({
            _type: 'image',
            _key: Math.random().toString(36).substring(7),
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: projectData.title.en,
          });
        }
        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Prepare final document
    const document = {
      _type: 'project',
      title: projectData.title,
      slug: projectData.slug,
      developer: developerRef,
      status: projectData.status,
      propertyType: projectData.propertyType,
      location: projectData.location,
      pricing: projectData.pricing,
      investment: projectData.investment,
      delivery: projectData.delivery,
      area: projectData.area,
      description: projectData.description,
      highlights: projectData.highlights,
      featured: projectData.featured,
      publishedAt: projectData.publishedAt,
    };

    if (coverImageRef) {
      document.coverImage = coverImageRef;
    }

    if (galleryImages.length > 0) {
      document.gallery = galleryImages;
    }

    // Create document in Sanity
    console.log(`  📤 Uploading to Sanity...`);
    const result = await client.create(document);

    console.log(`  ✅ Successfully created: ${result._id}`);
    return result;

  } catch (error) {
    console.error(`  ❌ Error uploading project: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting Sanity upload process...\n');

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local');
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN not found in .env.local');
    console.error('   Please create a token at: https://www.sanity.io/manage');
    process.exit(1);
  }

  // Load scraped data - try multiple file names
  let dataPath = path.join(__dirname, 'sample-investment-projects.json');

  if (!fs.existsSync(dataPath)) {
    dataPath = path.join(__dirname, 'bdgroup-projects.json');
  }

  if (!fs.existsSync(dataPath)) {
    console.error('❌ Error: No project data file found');
    console.error('   Looked for: sample-investment-projects.json or bdgroup-projects.json');
    console.error('   Please run: node scripts/import-bdgroup-projects.js first');
    process.exit(1);
  }

  console.log(`📂 Loading projects from: ${path.basename(dataPath)}`);

  const projects = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`📊 Found ${projects.length} projects to upload\n`);

  // Upload projects one by one
  const results = {
    success: 0,
    skipped: 0,
    failed: 0,
  };

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    console.log(`\n[${i + 1}/${projects.length}] ${project.title.en}`);

    const result = await uploadProject(project);

    if (result) {
      if (result._id && result._id.startsWith('drafts.')) {
        results.success++;
      } else if (result._id) {
        results.skipped++;
      }
    } else {
      results.failed++;
    }

    // Small delay between projects
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully uploaded: ${results.success}`);
  console.log(`⚠️  Skipped (already exist): ${results.skipped}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📦 Total processed: ${projects.length}`);
  console.log('='.repeat(50));
  console.log('\n✨ Upload complete!');
  console.log(`\nView your projects in Sanity Studio:`);
  console.log(`http://localhost:3002/studio\n`);
}

// Run the upload
main().catch(console.error);
