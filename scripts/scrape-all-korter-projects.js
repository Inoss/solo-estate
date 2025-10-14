/**
 * Korter.ge Complete Project Scraper
 * Fetches ALL 572 projects from korter.ge using API endpoints
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function scrapeAllKorterProjects() {
  console.log('🚀 Starting comprehensive scraper for ALL korter.ge projects...\n');

  try {
    const allProjects = [];
    let page = 1;
    const pageSize = 50; // Fetch 50 projects per page
    let totalFetched = 0;
    let hasMore = true;

    // Try different approaches to get all projects

    // Approach 1: Try API endpoint
    console.log('📡 Attempting to fetch via API endpoint...\n');

    while (hasMore && totalFetched < 600) { // Safety limit
      try {
        console.log(`📥 Fetching page ${page}...`);

        const response = await axios.get('https://korter.ge/api/buildings/search', {
          params: {
            city: 'tbilisi',
            page: page,
            limit: pageSize,
            sort: 'newest'
          },
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json'
          }
        });

        if (response.data && response.data.buildings) {
          const buildings = response.data.buildings;
          console.log(`   ✓ Got ${buildings.length} projects`);

          if (buildings.length === 0) {
            hasMore = false;
            break;
          }

          allProjects.push(...buildings);
          totalFetched += buildings.length;
          page++;

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          hasMore = false;
        }
      } catch (apiError) {
        console.log('   ✗ API endpoint approach failed:', apiError.message);
        hasMore = false;
      }
    }

    // Approach 2: If API failed, try scraping the listings page
    if (allProjects.length === 0) {
      console.log('\n📄 Trying to scrape from listings page...\n');

      const listingResponse = await axios.get('https://korter.ge/mshenebare-binebi-tbilisi', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      // Extract INITIAL_STATE from listing page
      const regex = /window\.INITIAL_STATE\s*=\s*({[\s\S]*?});[\s\n]/;
      const match = listingResponse.data.match(regex);

      if (match) {
        let initialState = JSON.parse(match[1].replace(/,(\s*[}\]])/g, '$1'));

        // Check for buildings in various places
        if (initialState.searchPageStore) {
          const store = initialState.searchPageStore;

          if (store.buildings && Array.isArray(store.buildings)) {
            console.log(`   ✓ Found ${store.buildings.length} projects in searchPageStore`);
            allProjects.push(...store.buildings);
          }

          if (store.results && Array.isArray(store.results)) {
            console.log(`   ✓ Found ${store.results.length} projects in results`);
            allProjects.push(...store.results);
          }
        }

        // Also check buildingsStore
        if (initialState.buildingsStore) {
          const buildingsStore = initialState.buildingsStore;

          if (buildingsStore.items && Array.isArray(buildingsStore.items)) {
            console.log(`   ✓ Found ${buildingsStore.items.length} projects in buildingsStore`);
            allProjects.push(...buildingsStore.items);
          }

          if (buildingsStore.all && Array.isArray(buildingsStore.all)) {
            console.log(`   ✓ Found ${buildingsStore.all.length} projects in all`);
            allProjects.push(...buildingsStore.all);
          }
        }
      }
    }

    // Approach 3: Scrape individual building URLs if we have IDs
    if (allProjects.length === 0) {
      console.log('\n🔗 Trying to build project list from sitemap or index...\n');

      // Try to get sitemap
      try {
        const sitemapResponse = await axios.get('https://korter.ge/sitemap.xml', {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        // Extract building URLs from sitemap
        const buildingUrlRegex = /https:\/\/korter\.ge\/([^<]+)/g;
        const urls = [...sitemapResponse.data.matchAll(buildingUrlRegex)];

        console.log(`   ✓ Found ${urls.length} URLs in sitemap`);

        // Filter for building pages (not blog, about, etc.)
        const buildingUrls = urls
          .map(match => match[1])
          .filter(url => !url.includes('/blog/') && !url.includes('/about'));

        console.log(`   ✓ Filtered to ${buildingUrls.length} building URLs`);

        // For each URL, create a minimal project entry
        for (const url of buildingUrls.slice(0, 100)) { // Limit for performance
          allProjects.push({
            url: `/${url}`,
            buildingId: url.split('/').pop(),
            needsDetailFetch: true
          });
        }
      } catch (sitemapError) {
        console.log('   ✗ Sitemap approach failed:', sitemapError.message);
      }
    }

    // Remove duplicates
    const uniqueProjects = Array.from(
      new Map(allProjects.map(p => [p.buildingId || p.id || p.url, p])).values()
    );

    console.log(`\n✅ Total unique projects found: ${uniqueProjects.length}\n`);

    // Transform to our format
    console.log('🔄 Transforming data to our format...\n');
    const transformedProjects = uniqueProjects.map((building, index) => {
      const developer = building.developers && building.developers[0]
        ? building.developers[0].name
        : (building.developer || building.developerName || 'Unknown Developer');

      const city = building.city || 'Tbilisi';
      const address = building.address || building.location || '';

      const coverImage = building.image || building.mainImage || (building.images && building.images[0]) || '';
      const gallery = building.images || [];

      const slug = building.url
        ? building.url.replace(/^\//, '')
        : (building.slug || `project-${building.buildingId || index}`);

      return {
        // IDs
        korterBuildingId: building.buildingId || building.id,
        slug: slug,

        // Basic Info
        title: {
          en: building.name || building.title || address || `Property ${building.buildingId || index}`,
          ka: building.nameKa || building.name || address || `ობიექტი ${building.buildingId || index}`,
          ru: building.nameRu || building.name || address || `Объект ${building.buildingId || index}`,
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
          district: building.district || building.neighborhood || '',
          region: building.region || building.area || '',
          coordinates: building.coordinates || building.location || null,
        },

        // Property Type
        propertyType: building.propertyType || building.type || 'apartment',
        status: building.constructionStatus || building.status || 'active',

        // Pricing
        pricing: {
          startingPrice: building.minPrice || building.price || building.startingPrice || null,
          pricePerSqm: building.minPriceSqm || building.pricePerSqm || null,
          maxPrice: building.maxPrice || null,
          currency: building.currency || 'USD',
        },

        // Images
        coverImage: coverImage,
        gallery: gallery,

        // Description
        description: {
          en: building.description || building.descriptionEn || '',
          ka: building.descriptionKa || building.description || '',
          ru: building.descriptionRu || building.description || '',
        },

        // Investment Metrics
        investment: {
          projectedYield: building.yield || building.projectedYield || null,
          capRate: building.capRate || null,
          irr: building.irr || null,
        },

        // Delivery
        delivery: {
          completionDate: building.completionDate || building.deliveryDate || null,
          quarter: building.deliveryQuarter || building.quarter || null,
          year: building.deliveryYear || building.year || null,
        },

        // Additional Info
        area: building.area || building.size || null,
        roomsCount: building.rooms || building.roomCount || building.bedroomCount || null,
        floorsCount: building.floors || building.floorsCount || null,
        bathroomsCount: building.bathrooms || building.bathroomCount || null,

        // Amenities
        amenities: building.amenities || building.features || [],

        // Source Info
        sourceUrl: `https://korter.ge${building.url || ''}`,
        originalData: building,

        // Metadata
        scrapedAt: new Date().toISOString(),
        source: 'korter.ge',
        needsDetailFetch: building.needsDetailFetch || false,
      };
    });

    // Save to JSON
    const outputPath = path.join(__dirname, 'korter-all-projects.json');
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

    const needsDetails = transformedProjects.filter(p => p.needsDetailFetch).length;
    if (needsDetails > 0) {
      console.log(`   ⚠️  Projects needing detail fetch: ${needsDetails}`);
    }

    return transformedProjects;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  scrapeAllKorterProjects()
    .then(() => {
      console.log('\n🎉 Scraping completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Scraping failed');
      console.error(error);
      process.exit(1);
    });
}

module.exports = { scrapeAllKorterProjects };
