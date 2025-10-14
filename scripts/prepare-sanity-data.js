/**
 * Prepare Korter Data for Sanity Import
 * Transforms all 574 projects into Sanity-ready format
 * Output can be imported via Sanity CLI or API
 */

const fs = require('fs');
const path = require('path');

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

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

  return 'underConstruction';
}

async function prepareSanityData() {
  console.log('🔄 Preparing Sanity-ready data from Korter projects...\n');

  try {
    // Load scraped data
    const dataPath = path.join(__dirname, 'korter-all-pages.json');
    const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`📦 Loaded ${projects.length} projects\n`);

    // Extract unique developers
    const developersMap = new Map();

    projects.forEach(project => {
      if (project.developer && project.developer.name && project.developer.name !== 'Unknown Developer') {
        const slug = generateSlug(project.developer.name);
        if (!developersMap.has(slug)) {
          developersMap.set(slug, {
            _type: 'developer',
            _id: `developer-${slug}`,
            name: project.developer.name,
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
            website: project.developer.link || null,
          });
        }
      }
    });

    const developers = Array.from(developersMap.values());
    console.log(`👥 Found ${developers.length} unique developers\n`);

    // Transform projects to Sanity format
    console.log('🔄 Transforming projects...\n');

    const sanityProjects = projects.map((project, index) => {
      const developerSlug = project.developer && project.developer.name && project.developer.name !== 'Unknown Developer'
        ? generateSlug(project.developer.name)
        : null;

      return {
        _type: 'project',
        _id: `project-${project.korterBuildingId || index}`,

        title: {
          en: project.title.en || 'Untitled Project',
          ka: project.title.ka || project.title.en || 'უსახელო პროექტი',
          ru: project.title.ru || project.title.en || 'Проект без названия',
          he: project.title.en,
          az: project.title.en,
          hy: project.title.en,
          uk: project.title.en,
        },

        slug: {
          _type: 'slug',
          current: project.slug || generateSlug(project.title.en || `project-${index}`),
        },

        developer: developerSlug ? {
          _type: 'reference',
          _ref: `developer-${developerSlug}`,
        } : null,

        status: mapStatus(project.status),

        propertyType: 'apartment',

        location: {
          city: project.location.city || 'Tbilisi',
          area: project.location.district || project.location.region || '',
          address: project.location.address || '',
          lat: project.location.latitude || null,
          lng: project.location.longitude || null,
        },

        pricing: {
          price: project.pricing.startingPrice || 0,
          pricePerSqm: project.pricing.pricePerSqm || null,
          currency: 'USD',
          priceRange: project.pricing.maxPrice ? {
            min: project.pricing.startingPrice,
            max: project.pricing.maxPrice,
          } : undefined,
        },

        investment: {
          yield: project.investment.projectedYield || null,
          capRate: project.investment.capRate || null,
          irr: project.investment.irr || null,
        },

        delivery: project.delivery && project.delivery.year ? {
          quarter: project.delivery.quarter || null,
          year: project.delivery.year,
        } : null,

        area: project.area || null,

        // Image URLs (to be uploaded separately)
        coverImageUrl: project.coverImage || null,
        galleryUrls: project.gallery && project.gallery.length > 0
          ? project.gallery.slice(0, 10) // Limit to 10 images
          : [],

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
          ? project.amenities.slice(0, 20) // Limit to 20 amenities
          : [],

        featured: false,

        publishedAt: new Date().toISOString(),

        // Metadata
        sourceUrl: project.sourceUrl,
        korterBuildingId: project.korterBuildingId,
      };
    });

    // Save developers
    const developersPath = path.join(__dirname, 'sanity-developers.json');
    fs.writeFileSync(developersPath, JSON.stringify(developers, null, 2));

    // Save projects
    const projectsPath = path.join(__dirname, 'sanity-projects.json');
    fs.writeFileSync(projectsPath, JSON.stringify(sanityProjects, null, 2));

    // Create NDJSON format for Sanity import
    const ndjsonDevelopers = developers.map(d => JSON.stringify(d)).join('\n');
    const ndjsonProjects = sanityProjects.map(p => JSON.stringify(p)).join('\n');
    const ndjsonAll = ndjsonDevelopers + '\n' + ndjsonProjects;

    fs.writeFileSync(path.join(__dirname, 'sanity-import.ndjson'), ndjsonAll);

    console.log('✅ Data transformation completed\n');

    console.log('📁 Output files:');
    console.log(`   ${developersPath}`);
    console.log(`   ${projectsPath}`);
    console.log(`   ${path.join(__dirname, 'sanity-import.ndjson')}\n`);

    console.log('📊 Statistics:');
    console.log(`   Developers: ${developers.length}`);
    console.log(`   Projects: ${sanityProjects.length}`);

    const withPrices = sanityProjects.filter(p => p.pricing.price > 0).length;
    console.log(`   Projects with pricing: ${withPrices}`);

    const withImages = sanityProjects.filter(p => p.coverImageUrl).length;
    console.log(`   Projects with images: ${withImages}`);

    console.log('\n📝 Next steps:');
    console.log('   1. Set up Sanity project and get API credentials');
    console.log('   2. Update .env.local with real Sanity credentials');
    console.log('   3. Run: node scripts/import-to-sanity.js');
    console.log('   OR use Sanity CLI: sanity dataset import sanity-import.ndjson production\n');

    // Create a summary
    const summary = {
      totalProjects: sanityProjects.length,
      totalDevelopers: developers.length,
      projectsWithPricing: withPrices,
      projectsWithImages: withImages,
      preparedAt: new Date().toISOString(),
      status: 'ready-for-import',
      files: {
        developers: 'sanity-developers.json',
        projects: 'sanity-projects.json',
        ndjson: 'sanity-import.ndjson',
      },
    };

    fs.writeFileSync(
      path.join(__dirname, 'sanity-preparation-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    return summary;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    throw error;
  }
}

if (require.main === module) {
  prepareSanityData()
    .then((summary) => {
      console.log('🎉 Data preparation successful!');
      console.log(`   Ready to import ${summary.totalProjects} projects\n`);
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { prepareSanityData };
