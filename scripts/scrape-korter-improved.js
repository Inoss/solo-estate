/**
 * Korter.ge Advanced Project Scraper
 * Fetches ALL projects from korter.ge using their data structure
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeKorterProjects() {
  console.log('🚀 Starting advanced scraper for korter.ge...\n');

  try {
    // Fetch the main page
    console.log('📥 Fetching main page...');
    const response = await axios.get('https://korter.ge/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = response.data;
    console.log('✅ Page fetched successfully\n');

    // Extract window.INITIAL_STATE
    console.log('🔍 Parsing JavaScript data...');
    const regex = /window\.INITIAL_STATE\s*=\s*({[\s\S]*?});[\s\n]/;
    const match = html.match(regex);

    if (!match) {
      throw new Error('Could not find INITIAL_STATE in page');
    }

    let initialState;
    try {
      // Clean up the JSON (remove trailing commas, etc.)
      let jsonStr = match[1];
      initialState = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Error parsing JSON:', e.message);
      // Try to fix common JSON issues
      let jsonStr = match[1]
        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
        .replace(/\n/g, ' ')
        .replace(/\r/g, '');
      initialState = JSON.parse(jsonStr);
    }

    console.log('✅ Data parsed successfully\n');

    // Extract projects from popularBuildings and other sources
    const allProjects = [];

    if (initialState.indexPageStore) {
      const store = initialState.indexPageStore;

      // Get popular buildings
      if (store.popularBuildings && Array.isArray(store.popularBuildings)) {
        console.log(`📦 Found ${store.popularBuildings.length} popular buildings`);
        allProjects.push(...store.popularBuildings);
      }

      // Get all buildings if available
      if (store.buildings && Array.isArray(store.buildings)) {
        console.log(`📦 Found ${store.buildings.length} total buildings`);
        allProjects.push(...store.buildings);
      }

      // Get featured or promoted buildings
      if (store.featuredBuildings && Array.isArray(store.featuredBuildings)) {
        console.log(`📦 Found ${store.featuredBuildings.length} featured buildings`);
        allProjects.push(...store.featuredBuildings);
      }
    }

    // Remove duplicates based on buildingId
    const uniqueProjects = Array.from(
      new Map(allProjects.map(p => [p.buildingId || p.id, p])).values()
    );

    console.log(`\n✅ Total unique projects found: ${uniqueProjects.length}\n`);

    // Transform to our format
    console.log('🔄 Transforming data to our format...');
    const transformedProjects = uniqueProjects.map((building, index) => {
      // Extract developer info
      const developer = building.developers && building.developers[0]
        ? building.developers[0].name
        : (building.developer || 'Unknown Developer');

      // Extract location
      const city = building.city || 'Tbilisi';
      const address = building.address || '';

      // Extract images
      const coverImage = building.image || (building.images && building.images[0]) || '';
      const gallery = building.images || [];

      // Create slug from name or URL
      const slug = building.url
        ? building.url.replace(/^\//, '')
        : `project-${building.buildingId || index}`;

      return {
        // IDs
        korterBuildingId: building.buildingId,
        slug: slug,

        // Basic Info
        title: {
          en: building.name || building.address || `Property ${building.buildingId}`,
          ka: building.name || building.address || `ობიექტი ${building.buildingId}`,
          ru: building.name || building.address || `Объект ${building.buildingId}`,
        },

        // Developer
        developer: {
          name: developer,
          link: building.developers && building.developers[0]
            ? building.developers[0].link
            : null,
        },

        // Location
        location: {
          city: city,
          address: address,
          district: building.district || '',
          region: building.region || '',
        },

        // Property Type
        propertyType: building.propertyType || building.type || 'apartment',
        status: building.constructionStatus || building.status || 'active',

        // Pricing
        pricing: {
          startingPrice: building.minPrice || building.price || null,
          pricePerSqm: building.minPriceSqm || building.pricePerSqm || null,
          maxPrice: building.maxPrice || null,
          currency: 'USD',
        },

        // Images
        coverImage: coverImage,
        gallery: gallery,

        // Description
        description: {
          en: building.description || '',
          ka: building.descriptionKa || building.description || '',
          ru: building.descriptionRu || building.description || '',
        },

        // Investment Metrics (if available)
        investment: {
          projectedYield: building.yield || null,
          capRate: building.capRate || null,
          irr: building.irr || null,
        },

        // Delivery
        delivery: {
          completionDate: building.completionDate || building.deliveryDate || null,
          quarter: building.deliveryQuarter || null,
          year: building.deliveryYear || null,
        },

        // Additional Info
        area: building.area || null,
        roomsCount: building.rooms || building.roomCount || null,
        floorsCount: building.floors || null,

        // Source Info
        sourceUrl: `https://korter.ge${building.url || ''}`,
        originalData: building, // Keep original for reference

        // Metadata
        scrapedAt: new Date().toISOString(),
        source: 'korter.ge',
      };
    });

    // Save to JSON
    const outputPath = path.join(__dirname, 'korter-projects-full.json');
    fs.writeFileSync(outputPath, JSON.stringify(transformedProjects, null, 2));

    console.log(`✅ Data transformed and saved\n`);
    console.log(`📁 Output file: ${outputPath}\n`);

    // Print statistics
    console.log('📊 Statistics:');
    console.log(`   Total projects: ${transformedProjects.length}`);

    const cities = [...new Set(transformedProjects.map(p => p.location.city))];
    console.log(`   Cities: ${cities.join(', ')}`);

    const developers = [...new Set(transformedProjects.map(p => p.developer.name))];
    console.log(`   Unique developers: ${developers.length}`);

    const withPrices = transformedProjects.filter(p => p.pricing.startingPrice).length;
    console.log(`   Projects with pricing: ${withPrices}`);

    const withImages = transformedProjects.filter(p => p.coverImage).length;
    console.log(`   Projects with images: ${withImages}`);

    return transformedProjects;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  scrapeKorterProjects()
    .then(() => {
      console.log('\n🎉 Scraping completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Scraping failed');
      process.exit(1);
    });
}

module.exports = { scrapeKorterProjects };
