/**
 * Korter.ge Multi-Page Scraper
 * Scrapes ALL pages to get all 572 projects
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeAllPages() {
  console.log('🚀 Starting multi-page scraper for korter.ge...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const allBuildings = new Map();
    let currentPage = 1;
    let hasNextPage = true;
    const maxPages = 50; // Safety limit

    while (hasNextPage && currentPage <= maxPages) {
      const url = currentPage === 1
        ? 'https://korter.ge/mshenebare-binebi-tbilisi'
        : `https://korter.ge/mshenebare-binebi-tbilisi?page=${currentPage}`;

      console.log(`📥 Fetching page ${currentPage}...`);
      console.log(`   URL: ${url}`);

      try {
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 60000
        });

        await new Promise(r => setTimeout(r, 2000));

        // Extract buildings from this page
        const pageBuildings = await page.evaluate(() => {
          const buildings = new Map();

          // Extract from window.INITIAL_STATE
          if (window.INITIAL_STATE) {
            function extractBuildings(obj, buildings = new Map()) {
              if (!obj || typeof obj !== 'object') return buildings;

              if (Array.isArray(obj)) {
                obj.forEach(item => extractBuildings(item, buildings));
                return buildings;
              }

              // If this is a building object
              if (obj.buildingId || obj.id) {
                if (obj.name || obj.address || obj.url) {
                  buildings.set(obj.buildingId || obj.id, obj);
                }
              }

              // Recursively check all properties
              Object.values(obj).forEach(value => {
                extractBuildings(value, buildings);
              });

              return buildings;
            }

            extractBuildings(window.INITIAL_STATE, buildings);
          }

          return Array.from(buildings.values());
        });

        console.log(`   ✓ Found ${pageBuildings.length} buildings on this page`);

        if (pageBuildings.length === 0) {
          console.log(`   ! No buildings found, stopping pagination`);
          hasNextPage = false;
          break;
        }

        // Add to our collection
        pageBuildings.forEach(building => {
          const id = building.buildingId || building.id;
          if (id) {
            allBuildings.set(id, building);
          }
        });

        console.log(`   Total unique buildings so far: ${allBuildings.size}\n`);

        // Check if this page looks identical to previous (means we've hit the end)
        if (currentPage > 1 && pageBuildings.length < 5) {
          console.log(`   ! Very few buildings, likely reached the end`);
          hasNextPage = false;
          break;
        }

        // If we've reached 572 or more, we can stop
        if (allBuildings.size >= 572) {
          console.log(`   ✓ Reached target of 572+ buildings!`);
          hasNextPage = false;
          break;
        }

        currentPage++;
        await new Promise(r => setTimeout(r, 1000)); // Rate limiting

      } catch (error) {
        console.error(`   ✗ Error on page ${currentPage}:`, error.message);
        hasNextPage = false;
      }
    }

    console.log(`\n✅ Scraping completed`);
    console.log(`📊 Total pages scraped: ${currentPage}`);
    console.log(`📊 Total unique buildings: ${allBuildings.size}\n`);

    // Transform data
    console.log('🔄 Transforming data...\n');

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
          en: building.name || building.title || address || `Property ${building.buildingId || building.id || index}`,
          ka: building.nameKa || building.name || address || `ობიექტი ${building.buildingId || building.id || index}`,
          ru: building.nameRu || building.name || address || `Объект ${building.buildingId || building.id || index}`,
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
    const outputPath = path.join(__dirname, 'korter-all-pages.json');
    fs.writeFileSync(outputPath, JSON.stringify(transformedProjects, null, 2));

    console.log(`✅ Data saved`);
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
    console.log(`   Projects with images: ${withImages}\n`);

    // Save summary
    const summary = {
      totalProjects: transformedProjects.length,
      targetProjects: 572,
      coveragePercent: ((transformedProjects.length / 572) * 100).toFixed(1),
      pagesScraped: currentPage,
      scrapingMethod: 'multi-page-puppeteer',
      cities: cities,
      uniqueDevelopers: developers.length,
      projectsWithPricing: withPrices,
      projectsWithImages: withImages,
      scrapedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(__dirname, 'korter-all-pages-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    await browser.close();
    return transformedProjects;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    await browser.close();
    throw error;
  }
}

if (require.main === module) {
  scrapeAllPages()
    .then((projects) => {
      if (projects.length >= 500) {
        console.log('🎉 SUCCESS! Got nearly all 572 projects!');
      } else if (projects.length >= 100) {
        console.log(`✅ Got ${projects.length} projects (${((projects.length/572)*100).toFixed(1)}% of target)`);
      } else {
        console.log(`⚠️  Only got ${projects.length} projects - need alternative approach`);
      }
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { scrapeAllPages };
