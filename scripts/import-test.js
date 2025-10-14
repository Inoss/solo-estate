/**
 * Test Import - First 10 projects only
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const { createClient } = require('@sanity/client');
const axios = require('axios');

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function mapStatus(korterStatus) {
  if (!korterStatus) return 'underConstruction';
  const status = korterStatus.toLowerCase();
  if (status.includes('готов') || status.includes('ready')) return 'ready';
  if (status.includes('строит') || status.includes('construction')) return 'underConstruction';
  if (status.includes('план') || status.includes('plan')) return 'offPlan';
  return 'underConstruction';
}

async function uploadImage(imageUrl, altText = '') {
  if (!imageUrl) return null;
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000,
    });

    const asset = await client.assets.upload('image', Buffer.from(response.data), {
      filename: path.basename(imageUrl).split('?')[0] || 'image.jpg',
    });

    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: altText,
    };
  } catch (error) {
    console.error(`   ✗ Image upload failed: ${error.message}`);
    return null;
  }
}

async function createDeveloper(developerData) {
  if (!developerData || !developerData.name || developerData.name === 'Unknown Developer') {
    return null;
  }

  const slug = generateSlug(developerData.name);
  const existing = await client.fetch(
    `*[_type == "developer" && slug.current == $slug][0]`,
    { slug }
  );

  if (existing) {
    return { _type: 'reference', _ref: existing._id };
  }

  const newDeveloper = await client.create({
    _type: 'developer',
    name: developerData.name,
    slug: { _type: 'slug', current: slug },
    description: { en: '', ka: '', ru: '', he: '', az: '', hy: '', uk: '' },
  });

  return { _type: 'reference', _ref: newDeveloper._id };
}

async function testImport() {
  console.log('🧪 Testing import with first 10 projects...\n');

  console.log('🔑 Sanity Config:');
  console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓' : '✗ MISSING'}`);
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
  console.log(`   Token: ${process.env.SANITY_API_TOKEN ? '✓' : '✗ MISSING'}\n`);

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is required!');
    process.exit(1);
  }

  const dataPath = path.join(__dirname, 'korter-all-pages.json');
  const allProjects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const projects = allProjects.slice(0, 10); // First 10 only

  console.log(`📦 Testing with ${projects.length} projects\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    try {
      console.log(`[${i + 1}/${projects.length}] ${project.title.en}`);

      const developerRef = await createDeveloper(project.developer);
      const coverImage = await uploadImage(project.coverImage, `${project.title.en} Cover`);

      const sanityProject = {
        _type: 'project',
        title: {
          en: project.title.en || 'Untitled',
          ka: project.title.ka || project.title.en,
          ru: project.title.ru || project.title.en,
          he: project.title.en,
          az: project.title.en,
          hy: project.title.en,
          uk: project.title.en,
        },
        slug: {
          _type: 'slug',
          current: project.slug || generateSlug(project.title.en),
        },
        developer: developerRef,
        status: mapStatus(project.status),
        propertyType: 'apartment',
        location: {
          city: project.location.city || 'Tbilisi',
          area: project.location.district || '',
          address: project.location.address || '',
          lat: project.location.latitude,
          lng: project.location.longitude,
        },
        pricing: {
          price: project.pricing.startingPrice || 0,
          pricePerSqm: project.pricing.pricePerSqm,
          currency: 'USD',
        },
        area: project.area,
        coverImage: coverImage,
        description: {
          en: project.description.en || '',
          ka: project.description.ka || '',
          ru: project.description.ru || '',
          he: '', az: '', hy: '', uk: '',
        },
        featured: false,
        publishedAt: new Date().toISOString(),
      };

      await client.create(sanityProject);
      success++;
      console.log(`   ✓ Success\n`);

      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      failed++;
      console.error(`   ✗ Failed: ${error.message}\n`);
    }
  }

  console.log(`\n📊 Test Results:`);
  console.log(`   Success: ${success}/${projects.length}`);
  console.log(`   Failed: ${failed}`);

  if (success === projects.length) {
    console.log('\n🎉 All test imports successful! Ready for full import.');
  }
}

testImport().catch(console.error);
