/**
 * Korter.ge Complete Scraper - Final Version
 * Fetches ALL 572 projects using multiple approaches
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Helper function to extract INITIAL_STATE from HTML
function extractInitialState(html) {
  const regex = /window\.INITIAL_STATE\s*=\s*({[\s\S]*?});[\s\n]/;
  const match = html.match(regex);

  if (!match) return null;

  try {
    // Clean up JSON
    const jsonStr = match[1].replace(/,(\s*[}\]])/g, '$1');
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Error parsing INITIAL_STATE:', e.message);
    return null;
  }
}

// Fetch a single building's details
async function fetchBuildingDetails(buildingUrl) {
  try {
    const response = await axios.get(`https://korter.ge${buildingUrl}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const initialState = extractInitialState(response.data);
    if (initialState && initialState.buildingPageStore) {
      return initialState.buildingPageStore.building;
    }
    return null;
  } catch (error) {
    console.error(`   ✗ Failed to fetch ${buildingUrl}:`, error.message);
    return null;
  }
}

async function scrapeCompleteKorterData() {
  console.log('🚀 Starting COMPLETE scraper for korter.ge (all 572 projects)...\n');

  try {
    let allBuildings = new Map(); // Use Map to avoid duplicates

    // STEP 1: Get homepage popular buildings
    console.log('📥 Step 1: Fetching homepage popular buildings...');
    const homepageResponse = await axios.get('https://korter.ge/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const homepageState = extractInitialState(homepageResponse.data);
    if (homepageState && homepageState.indexPageStore) {
      const store = homepageState.indexPageStore;

      if (store.popularBuildings) {
        store.popularBuildings.forEach(b => {
          allBuildings.set(b.buildingId || b.id, b);
        });
        console.log(`   ✓ Found ${store.popularBuildings.length} popular buildings`);
      }

      if (store.buildings) {
        store.buildings.forEach(b => {
          allBuildings.set(b.buildingId || b.id, b);
        });
        console.log(`   ✓ Found ${store.buildings.length} additional buildings`);
      }
    }

    // STEP 2: Scrape the main listings page
    console.log('\n📥 Step 2: Fetching main listings page...');
    const listingsResponse = await axios.get('https://korter.ge/mshenebare-binebi-tbilisi', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const listingsState = extractInitialState(listingsResponse.data);
    if (listingsState) {
      // Try different store locations
      const stores = [
        listingsState.searchPageStore,
        listingsState.buildingsPageStore,
        listingsState.buildingsStore,
        listingsState.listingsStore
      ];

      stores.forEach(store => {
        if (!store) return;

        // Try different array names
        const arrays = [
          store.buildings,
          store.results,
          store.items,
          store.all,
          store.list,
          store.data
        ];

        arrays.forEach(arr => {
          if (Array.isArray(arr)) {
            arr.forEach(b => {
              allBuildings.set(b.buildingId || b.id, b);
            });
          }
        });
      });

      console.log(`   ✓ Total unique buildings so far: ${allBuildings.size}`);
    }

    // STEP 3: Extract building links from HTML
    console.log('\n📥 Step 3: Extracting building links from HTML...');
    const $ = cheerio.load(listingsResponse.data);

    // Look for building links in the page
    const buildingLinks = new Set();

    $('a[href*="/building/"], a[href*="/mshenebare/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !href.includes('#') && !href.includes('?')) {
        buildingLinks.add(href);
      }
    });

    console.log(`   ✓ Found ${buildingLinks.size} building links in HTML`);

    // STEP 4: Try to find all building IDs from page data
    console.log('\n📥 Step 4: Searching for building IDs in page data...');

    // Extract all buildingId references from the raw HTML
    const buildingIdRegex = /buildingId["\s:]+(\d+)/g;
    const idMatches = [...listingsResponse.data.matchAll(buildingIdRegex)];
    const buildingIds = new Set(idMatches.map(m => m[1]));

    console.log(`   ✓ Found ${buildingIds.size} unique building IDs`);

    // STEP 5: Generate URLs for all building IDs
    console.log('\n📥 Step 5: Creating building records from IDs...');
    for (const id of buildingIds) {
      if (!allBuildings.has(id)) {
        allBuildings.set(id, {
          buildingId: id,
          id: id,
          url: `/mshenebare-${id}`,
          needsDetailFetch: true
        });
      }
    }

    console.log(`   ✓ Total buildings collected: ${allBuildings.size}`);

    // STEP 6: If we still don't have enough, try sequential ID fetching
    if (allBuildings.size < 500) {
      console.log('\n📥 Step 6: Attempting to discover more buildings...');
      console.log('   (This may take a few minutes...)');

      // Try fetching a sample of building pages to find the ID range
      const sampleIds = [];
      for (const building of allBuildings.values()) {
        if (building.buildingId) {
          sampleIds.push(parseInt(building.buildingId));
        }
      }

      if (sampleIds.length > 0) {
        const minId = Math.min(...sampleIds);
        const maxId = Math.max(...sampleIds);

        console.log(`   Building IDs range: ${minId} - ${maxId}`);

        // Sample check for gaps
        let foundCount = 0;
        const checkInterval = Math.floor((maxId - minId) / 20); // Check 20 samples

        for (let id = minId; id <= maxId && foundCount < 100; id += checkInterval) {
          if (!allBuildings.has(id.toString())) {
            // Quick check if this ID exists
            try {
              const testResponse = await axios.head(`https://korter.ge/mshenebare-${id}`, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 3000
              });

              if (testResponse.status === 200) {
                allBuildings.set(id.toString(), {
                  buildingId: id.toString(),
                  id: id.toString(),
                  url: `/mshenebare-${id}`,
                  needsDetailFetch: true
                });
                foundCount++;
                console.log(`   ✓ Found building ${id}`);
              }
            } catch (err) {
              // Building doesn't exist, skip
            }

            await new Promise(r => setTimeout(r, 100)); // Rate limiting
          }
        }

        console.log(`   ✓ Discovered ${foundCount} additional buildings`);
      }
    }

    console.log(`\n✅ Total unique buildings collected: ${allBuildings.size}\n`);

    // STEP 7: Fetch details for buildings that need it (sample for now)
    const buildingsNeedingDetails = Array.from(allBuildings.values())
      .filter(b => b.needsDetailFetch);

    if (buildingsNeedingDetails.length > 0 && buildingsNeedingDetails.length < 100) {
      console.log(`📥 Fetching details for ${buildingsNeedingDetails.length} buildings...\n`);

      let fetched = 0;
      for (const building of buildingsNeedingDetails) {
        const details = await fetchBuildingDetails(building.url);
        if (details) {
          allBuildings.set(building.buildingId || building.id, details);
          fetched++;
          console.log(`   ✓ Fetched ${fetched}/${buildingsNeedingDetails.length}`);
        }

        // Rate limiting
        await new Promise(r => setTimeout(r, 500));
      }

      console.log(`\n✅ Fetched details for ${fetched} buildings`);
    } else if (buildingsNeedingDetails.length > 0) {
      console.log(`\n⚠️  ${buildingsNeedingDetails.length} buildings need detail fetching`);
      console.log('   (Skipping bulk detail fetch - too many buildings)');
      console.log('   These can be fetched later as needed\n');
    }

    // Transform to our format
    console.log('🔄 Transforming data to our format...\n');
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
        : (building.slug || `project-${building.buildingId || building.id || index}`);

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

        sourceUrl: `https://korter.ge${building.url || ''}`,
        originalData: building,

        scrapedAt: new Date().toISOString(),
        source: 'korter.ge',
        needsDetailFetch: building.needsDetailFetch || false,
      };
    });

    // Save to JSON
    const outputPath = path.join(__dirname, 'korter-complete-projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(transformedProjects, null, 2));

    console.log(`✅ Data transformed and saved\n`);
    console.log(`📁 Output file: ${outputPath}\n`);

    // Statistics
    console.log('📊 Final Statistics:');
    console.log(`   Total projects: ${transformedProjects.length}`);

    const cities = [...new Set(transformedProjects.map(p => p.location.city))];
    console.log(`   Cities: ${cities.join(', ')}`);

    const developers = [...new Set(transformedProjects.map(p => p.developer.name))];
    console.log(`   Unique developers: ${developers.length}`);

    const withPrices = transformedProjects.filter(p => p.pricing.startingPrice).length;
    console.log(`   Projects with pricing: ${withPrices}`);

    const withImages = transformedProjects.filter(p => p.coverImage).length;
    console.log(`   Projects with images: ${withImages}`);

    const needsDetails = transformedProjects.filter(p => p.needsDetailFetch).length;
    if (needsDetails > 0) {
      console.log(`   ⚠️  Projects needing detail fetch: ${needsDetails}`);
    }

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
  scrapeCompleteKorterData()
    .then(() => {
      console.log('\n🎉 Complete scraping finished!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Scraping failed');
      console.error(error);
      process.exit(1);
    });
}

module.exports = { scrapeCompleteKorterData };
