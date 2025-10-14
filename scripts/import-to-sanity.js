/**
 * Import Korter.ge Projects to Sanity CMS
 * Imports all 574 projects with developers and images
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const { createClient } = require('@sanity/client');

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

console.log('🔑 Sanity Config:');
console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓ Set' : '✗ Missing'}`);
console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
console.log(`   API Token: ${process.env.SANITY_API_TOKEN ? '✓ Set' : '✗ Missing'}\n`);

// Helper to generate slug from string
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper to map status
function mapStatus(korterStatus) {
  if (!korterStatus) return 'underConstruction';

  const status = korterStatus.toLowerCase();

  if (status.includes('готов') || status.includes('ready') || status.includes('completed')) {
    return 'ready';
  }
  if (status.includes('строит') || status.includes('construction') || status.includes('building')) {
    return 'underConstruction';
  }
  if (status.includes('план') || status.includes('plan') || status.includes('проект')) {
    return 'offPlan';
  }

  return 'underConstruction'; // Default
}

// Helper to upload image URL to Sanity
async function uploadImage(imageUrl, altText = '') {
  if (!imageUrl) return null;

  try {
    // Download image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      timeout: 10000,
    });

    // Upload to Sanity
    const asset = await client.assets.upload('image', Buffer.from(response.data), {
      filename: path.basename(imageUrl).split('?')[0] || 'image.jpg',
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`   ✗ Failed to upload image ${imageUrl}:`, error.message);
    return null;
  }
}

// Create or get developer
async function createDeveloper(developerData) {
  if (!developerData || !developerData.name || developerData.name === 'Unknown Developer') {
    return null;
  }

  const slug = generateSlug(developerData.name);

  // Check if developer already exists
  const existing = await client.fetch(
    `*[_type == "developer" && slug.current == $slug][0]`,
    { slug }
  );

  if (existing) {
    return {
      _type: 'reference',
      _ref: existing._id,
    };
  }

  // Create new developer
  const newDeveloper = await client.create({
    _type: 'developer',
    name: developerData.name,
    slug: {
      _type: 'slug',
      current: slug,
    },
    description: {
      en: '',
      ka: '',
      ru: '',
      he: '',
      az: '',
      hy: '',
      uk: '',
    },
  });

  return {
    _type: 'reference',
    _ref: newDeveloper._id,
  };
}

async function importProjects() {
  console.log('🚀 Starting import to Sanity CMS...\n');

  try {
    // Load scraped data
    const dataPath = path.join(__dirname, 'korter-all-pages.json');
    const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`📦 Loaded ${projects.length} projects\n`);

    let imported = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const num = i + 1;

      try {
        console.log(`[${num}/${projects.length}] Importing: ${project.title.en}...`);

        // Create developer reference
        console.log(`   → Creating developer: ${project.developer.name}`);
        const developerRef = await createDeveloper(project.developer);

        // Upload cover image
        console.log(`   → Uploading cover image...`);
        const coverImage = await uploadImage(
          project.coverImage,
          `${project.title.en} - Cover Image`
        );

        // Upload gallery images (limit to 5 for performance)
        console.log(`   → Uploading gallery images...`);
        const galleryImages = [];
        const galleryLimit = Math.min(project.gallery.length, 5);

        for (let g = 0; g < galleryLimit; g++) {
          const img = await uploadImage(
            project.gallery[g],
            `${project.title.en} - Gallery ${g + 1}`
          );
          if (img) galleryImages.push(img);
        }

        // Map data to Sanity format
        const sanityProject = {
          _type: 'project',
          title: {
            en: project.title.en || 'Untitled Project',
            ka: project.title.ka || project.title.en || 'უსახელო პროექტი',
            ru: project.title.ru || project.title.en || 'Проект без названия',
            he: project.title.en, // No Hebrew translation available
            az: project.title.en, // No Azerbaijani translation
            hy: project.title.en, // No Armenian translation
            uk: project.title.en, // No Ukrainian translation
          },
          slug: {
            _type: 'slug',
            current: project.slug || generateSlug(project.title.en),
          },
          developer: developerRef,
          status: mapStatus(project.status),
          propertyType: project.propertyType === 'apartment' ? 'apartment' : 'apartment',
          location: {
            city: project.location.city || 'Tbilisi',
            area: project.location.district || project.location.region || '',
            address: project.location.address || '',
            lat: project.location.latitude,
            lng: project.location.longitude,
          },
          pricing: {
            price: project.pricing.startingPrice || 0,
            pricePerSqm: project.pricing.pricePerSqm,
            currency: 'USD',
            priceRange: project.pricing.maxPrice ? {
              min: project.pricing.startingPrice,
              max: project.pricing.maxPrice,
            } : undefined,
          },
          investment: {
            yield: project.investment.projectedYield,
            capRate: project.investment.capRate,
            irr: project.investment.irr,
          },
          delivery: project.delivery.year ? {
            quarter: project.delivery.quarter,
            year: project.delivery.year,
          } : undefined,
          area: project.area,
          coverImage: coverImage,
          gallery: galleryImages,
          description: {
            en: project.description.en || '',
            ka: project.description.ka || '',
            ru: project.description.ru || '',
            he: '',
            az: '',
            hy: '',
            uk: '',
          },
          highlights: project.amenities && project.amenities.length > 0
            ? project.amenities
            : undefined,
          featured: false,
          publishedAt: new Date().toISOString(),
        };

        // Create in Sanity
        console.log(`   → Creating project in Sanity...`);
        await client.create(sanityProject);

        imported++;
        console.log(`   ✓ Success (${imported}/${projects.length})\n`);

        // Rate limiting
        await new Promise(r => setTimeout(r, 500));

      } catch (error) {
        failed++;
        const errorMsg = `Failed to import ${project.title.en}: ${error.message}`;
        console.error(`   ✗ ${errorMsg}\n`);
        errors.push(errorMsg);

        // Continue with next project
        continue;
      }
    }

    // Save results
    const results = {
      totalProjects: projects.length,
      imported: imported,
      failed: failed,
      successRate: ((imported / projects.length) * 100).toFixed(1),
      errors: errors,
      importedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(__dirname, 'import-results.json'),
      JSON.stringify(results, null, 2)
    );

    console.log('\n📊 Import Summary:');
    console.log(`   Total projects: ${projects.length}`);
    console.log(`   Successfully imported: ${imported}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Success rate: ${results.successRate}%`);

    if (errors.length > 0) {
      console.log(`\n   Errors saved to: import-results.json`);
    }

    return results;

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    throw error;
  }
}

if (require.main === module) {
  importProjects()
    .then((results) => {
      if (results.imported >= 500) {
        console.log('\n🎉 SUCCESS! Imported nearly all projects!');
      } else if (results.imported >= 100) {
        console.log(`\n✅ Imported ${results.imported} projects`);
      } else {
        console.log('\n⚠️  Limited imports - check for errors');
      }
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { importProjects };
