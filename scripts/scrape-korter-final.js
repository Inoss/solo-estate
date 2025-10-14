/**
 * Korter.ge Final Scraper - Extract from navigationStore.geoObjects
 * Fetches ALL 572 projects from the proper data source
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Helper to extract INITIAL_STATE
function extractInitialState(html) {
  const regex = /window\.INITIAL_STATE\s*=\s*({[\s\S]*?});[\s\n]/;
  const match = html.match(regex);

  if (!match) return null;

  try {
    const jsonStr = match[1].replace(/,(\s*[}\]])/g, '$1');
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Error parsing INITIAL_STATE:', e.message);
    return null;
  }
}

// Recursive function to extract buildings from geoObjects
function extractBuildingsFromGeoObjects(geoObjects, buildings = []) {
  if (!geoObjects || typeof geoObjects !== 'object') {
    return buildings;
  }

  // If this is an array, process each item
  if (Array.isArray(geoObjects)) {
    geoObjects.forEach(obj => extractBuildingsFromGeoObjects(obj, buildings));
    return buildings;
  }

  // If this geoObject has buildings array, add them
  if (geoObjects.buildings && Array.isArray(geoObjects.buildings)) {
    buildings.push(...geoObjects.buildings);
  }

  // If this has a single building object, add it
  if (geoObjects.building && typeof geoObjects.building === 'object') {
    buildings.push(geoObjects.building);
  }

  // Recursively check nested geoObjects
  if (geoObjects.children) {
    extractBuildingsFromGeoObjects(geoObjects.children, buildings);
  }

  if (geoObjects.geoObjects) {
    extractBuildingsFromGeoObjects(geoObjects.geoObjects, buildings);
  }

  // Check all properties for nested objects
  Object.values(geoObjects).forEach(value => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (value.buildings || value.geoObjects || value.children) {
        extractBuildingsFromGeoObjects(value, buildings);
      }
    }
  });

  return buildings;
}

async function scrapeFinalKorterData() {
  console.log('🚀 Final scraper - accessing navigationStore.geoObjects...\n');

  try {
    const allBuildings = new Map();

    // Fetch the listings page
    console.log('📥 Fetching listings page...');
    const response = await axios.get('https://korter.ge/mshenebare-binebi-tbilisi', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    console.log('✅ Page fetched\n');

    // Extract INITIAL_STATE
    console.log('🔍 Extracting INITIAL_STATE...');
    const initialState = extractInitialState(response.data);

    if (!initialState) {
      throw new Error('Could not extract INITIAL_STATE');
    }

    console.log('✅ INITIAL_STATE extracted\n');

    // Extract buildings from navigationStore
    if (initialState.navigationStore) {
      console.log('📦 Processing navigationStore...');

      // Get geoObjects
      if (initialState.navigationStore.geoObjects) {
        const geoBuildings = extractBuildingsFromGeoObjects(initialState.navigationStore.geoObjects);
        geoBuildings.forEach(b => {
          if (b.buildingId || b.id) {
            allBuildings.set(b.buildingId || b.id, b);
          }
        });
        console.log(`   ✓ Found ${geoBuildings.length} buildings in geoObjects`);
      }

      // Also check if there's a direct buildings list
      if (initialState.navigationStore.buildings) {
        initialState.navigationStore.buildings.forEach(b => {
          allBuildings.set(b.buildingId || b.id, b);
        });
        console.log(`   ✓ Found ${initialState.navigationStore.buildings.length} in buildings list`);
      }
    }

    // Also check searchPageStore (if exists)
    if (initialState.searchPageStore) {
      console.log('\n📦 Processing searchPageStore...');

      if (initialState.searchPageStore.buildings) {
        initialState.searchPageStore.buildings.forEach(b => {
          allBuildings.set(b.buildingId || b.id, b);
        });
        console.log(`   ✓ Found ${initialState.searchPageStore.buildings.length} buildings`);
      }

      if (initialState.searchPageStore.results) {
        initialState.searchPageStore.results.forEach(b => {
          allBuildings.set(b.buildingId || b.id, b);
        });
        console.log(`   ✓ Found ${initialState.searchPageStore.results.length} in results`);
      }
    }

    // Check buildingsPageStore
    if (initialState.buildingsPageStore) {
      console.log('\n📦 Processing buildingsPageStore...');

      if (initialState.buildingsPageStore.buildings) {
        initialState.buildingsPageStore.buildings.forEach(b => {
          allBuildings.set(b.buildingId || b.id, b);
        });
        console.log(`   ✓ Found ${initialState.buildingsPageStore.buildings.length} buildings`);
      }
    }

    // Check ALL stores for building data
    console.log('\n🔍 Scanning all stores for building data...');
    Object.keys(initialState).forEach(storeKey => {
      const store = initialState[storeKey];
      if (store && typeof store === 'object') {
        // Check for buildings array
        if (Array.isArray(store.buildings)) {
          store.buildings.forEach(b => {
            if (b.buildingId || b.id) {
              allBuildings.set(b.buildingId || b.id, b);
            }
          });
        }

        // Check for results array
        if (Array.isArray(store.results)) {
          store.results.forEach(b => {
            if (b.buildingId || b.id) {
              allBuildings.set(b.buildingId || b.id, b);
            }
          });
        }

        // Check for items array
        if (Array.isArray(store.items)) {
          store.items.forEach(b => {
            if (b.buildingId || b.id) {
              allBuildings.set(b.buildingId || b.id, b);
            }
          });
        }
      }
    });

    console.log(`\n✅ Total unique buildings collected: ${allBuildings.size}\n`);

    // Transform to our format
    console.log('🔄 Transforming data...');
    const transformedProjects = Array.from(allBuildings.values()).map((building, index) => {
      const developer = building.developers && building.developers[0]
        ? building.developers[0].name
        : (building.developer || building.developerName || 'Unknown Developer');

      const city = building.city || 'Tbilisi';
      const address = building.address || building.location || '';

      const coverImage = building.image || building.mainImage || (building.images && building.images[0]) || '';
      const gallery = building.images || [];

      const slug = building.url
        ? building.url.replace(/^\//, '')
        : (building.slug || `mshenebare-${building.buildingId || building.id || index}`);

      return {
        korterBuildingId: building.buildingId || building.id,
        slug: slug,

        title: {
          en: building.name || building.title || address || `Property ${building.buildingId || building.id}`,
          ka: building.nameKa || building.name || address || `ობიექტი ${building.buildingId || building.id}`,
          ru: building.nameRu || building.name || address || `Объект ${building.buildingId || building.id}`,
        },

        developer: {
          name: developer,
          link: building.developers && building.developers[0]
            ? building.developers[0].link
            : null,
        },

        location: {
          city: city,
          address: address,
          district: building.district || building.neighborhood || '',
          region: building.region || building.area || '',
          coordinates: building.coordinates || building.location || null,
          latitude: building.lat || building.latitude || null,
          longitude: building.lng || building.longitude || null,
        },

        propertyType: building.propertyType || building.type || 'apartment',
        status: building.constructionStatus || building.status || 'active',

        pricing: {
          startingPrice: building.minPrice || building.price || building.startingPrice || null,
          pricePerSqm: building.minPriceSqm || building.pricePerSqm || null,
          maxPrice: building.maxPrice || null,
          currency: building.currency || 'USD',
        },

        coverImage: coverImage,
        gallery: gallery,

        description: {
          en: building.description || building.descriptionEn || '',
          ka: building.descriptionKa || building.description || '',
          ru: building.descriptionRu || building.description || '',
        },

        investment: {
          projectedYield: building.yield || building.projectedYield || null,
          capRate: building.capRate || null,
          irr: building.irr || null,
        },

        delivery: {
          completionDate: building.completionDate || building.deliveryDate || null,
          quarter: building.deliveryQuarter || building.quarter || null,
          year: building.deliveryYear || building.year || null,
        },

        area: building.area || building.size || null,
        roomsCount: building.rooms || building.roomCount || building.bedroomCount || null,
        floorsCount: building.floors || building.floorsCount || null,
        amenities: building.amenities || building.features || [],

        sourceUrl: `https://korter.ge${building.url || ('/' + slug)}`,
        originalData: building,

        scrapedAt: new Date().toISOString(),
        source: 'korter.ge',
      };
    });

    // Save to JSON
    const outputPath = path.join(__dirname, 'korter-final-projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(transformedProjects, null, 2));

    console.log(`\n✅ Data transformed and saved`);
    console.log(`📁 Output: ${outputPath}\n`);

    // Statistics
    console.log('📊 Final Statistics:');
    console.log(`   Total projects: ${transformedProjects.length}`);
    console.log(`   Target: 572 projects`);
    console.log(`   Coverage: ${((transformedProjects.length / 572) * 100).toFixed(1)}%\n`);

    const cities = [...new Set(transformedProjects.map(p => p.location.city))];
    console.log(`   Cities: ${cities.join(', ')}`);

    const developers = [...new Set(transformedProjects.map(p => p.developer.name))];
    console.log(`   Unique developers: ${developers.length}`);

    const withPrices = transformedProjects.filter(p => p.pricing.startingPrice).length;
    console.log(`   Projects with pricing: ${withPrices}`);

    const withImages = transformedProjects.filter(p => p.coverImage).length;
    console.log(`   Projects with images: ${withImages}`);

    // Save summary
    const summary = {
      totalProjects: transformedProjects.length,
      targetProjects: 572,
      coveragePercent: ((transformedProjects.length / 572) * 100).toFixed(1),
      cities: cities,
      uniqueDevelopers: developers.length,
      projectsWithPricing: withPrices,
      projectsWithImages: withImages,
      scrapedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(__dirname, 'korter-scrape-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    return transformedProjects;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
    }
    console.error(error.stack);
    throw error;
  }
}

if (require.main === module) {
  scrapeFinalKorterData()
    .then((projects) => {
      if (projects.length >= 500) {
        console.log('\n🎉 SUCCESS! Got nearly all projects!');
      } else if (projects.length >= 100) {
        console.log('\n✅ Got substantial data, but may need additional approaches for full 572');
      } else {
        console.log('\n⚠️  Got limited data - may need browser automation');
      }
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { scrapeFinalKorterData };
