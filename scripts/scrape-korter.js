/**
 * Korter.ge Project Scraper
 * This script fetches all projects from korter.ge and saves them to a JSON file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Function to fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to extract initial state from HTML
function extractInitialState(html) {
  const regex = /window\.INITIAL_STATE\s*=\s*({[\s\S]*?});/;
  const match = html.match(regex);

  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      console.error('Error parsing INITIAL_STATE:', e);
      return null;
    }
  }
  return null;
}

// Main scraping function
async function scrapeKorterProjects() {
  console.log('🚀 Starting to scrape projects from korter.ge...');

  try {
    // Fetch the main page
    console.log('📥 Fetching main page...');
    const html = await fetchUrl('https://korter.ge/');

    // Extract initial state
    console.log('🔍 Extracting project data...');
    const initialState = extractInitialState(html);

    if (!initialState) {
      throw new Error('Could not extract INITIAL_STATE from page');
    }

    // Extract projects from the initial state
    const projects = [];

    if (initialState.indexPageStore && initialState.indexPageStore.buildings) {
      const buildings = initialState.indexPageStore.buildings;

      console.log(`✅ Found ${buildings.length} projects`);

      buildings.forEach((building, index) => {
        const project = {
          // Basic info
          id: building.id || `project-${index}`,
          title: building.name || 'Unnamed Project',
          slug: building.slug || building.url || '',

          // Developer
          developer: building.developer || building.developerName || '',

          // Location
          location: {
            city: building.city || building.location || 'Tbilisi',
            address: building.address || '',
            district: building.district || '',
            coordinates: building.coordinates || null,
          },

          // Property details
          propertyType: building.type || 'apartment',
          status: building.status || 'active',

          // Pricing
          pricing: {
            startingPrice: building.minPrice || building.price || null,
            pricePerSqm: building.pricePerSqm || null,
            currency: building.currency || 'USD',
          },

          // Images
          coverImage: building.image || building.mainImage || '',
          gallery: building.images || [],

          // Description
          description: building.description || '',

          // Additional info
          completionDate: building.completionDate || building.deliveryDate || '',
          roomsCount: building.rooms || building.roomCount || null,
          area: building.area || null,

          // Original data
          originalUrl: `https://korter.ge${building.slug || building.url}`,
          sourceUrl: 'https://korter.ge',

          // Metadata
          scrapedAt: new Date().toISOString(),
        };

        projects.push(project);
      });
    }

    // Save to JSON file
    const outputPath = path.join(__dirname, 'korter-projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

    console.log(`\n✅ Successfully scraped ${projects.length} projects!`);
    console.log(`📁 Data saved to: ${outputPath}`);

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`   Total projects: ${projects.length}`);

    const cities = [...new Set(projects.map(p => p.location.city))];
    console.log(`   Cities: ${cities.join(', ')}`);

    const developers = [...new Set(projects.map(p => p.developer).filter(Boolean))];
    console.log(`   Developers: ${developers.length}`);

    return projects;

  } catch (error) {
    console.error('❌ Error scraping projects:', error.message);
    throw error;
  }
}

// Run the scraper
if (require.main === module) {
  scrapeKorterProjects()
    .then(() => {
      console.log('\n🎉 Scraping completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Scraping failed:', error);
      process.exit(1);
    });
}

module.exports = { scrapeKorterProjects };
