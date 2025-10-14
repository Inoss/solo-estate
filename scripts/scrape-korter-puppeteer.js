/**
 * Korter.ge Puppeteer Scraper
 * Uses headless browser to handle lazy-loaded content and get ALL 572 projects
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeWithPuppeteer() {
  console.log('🚀 Starting Puppeteer scraper for korter.ge...\n');

  let browser;
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('✅ Browser launched\n');

    // Navigate to listings page
    console.log('📥 Navigating to listings page...');
    await page.goto('https://korter.ge/mshenebare-binebi-tbilisi', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('✅ Page loaded\n');

    // Wait for content to load
    await new Promise(r => setTimeout(r, 3000));

    // Auto-scroll to trigger lazy loading
    console.log('📜 Scrolling to load all buildings...');
    console.log('   (This may take a few minutes...)\n');

    let previousHeight = 0;
    let scrollAttempts = 0;
    const maxScrollAttempts = 100; // Prevent infinite loop

    while (scrollAttempts < maxScrollAttempts) {
      // Scroll to bottom
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      // Wait for new content to load
      await new Promise(r => setTimeout(r, 2000));

      // Check if we've reached the bottom
      const currentHeight = await page.evaluate(() => document.body.scrollHeight);

      if (currentHeight === previousHeight) {
        console.log('   ✓ Reached bottom of page');
        break;
      }

      previousHeight = currentHeight;
      scrollAttempts++;

      if (scrollAttempts % 10 === 0) {
        console.log(`   ↓ Scroll attempt ${scrollAttempts}...`);
      }
    }

    console.log(`\n✅ Scrolling completed (${scrollAttempts} scrolls)\n`);

    // Extract building data from the page
    console.log('🔍 Extracting building data...');

    const buildingsData = await page.evaluate(() => {
      // Try to get data from window.INITIAL_STATE if available
      if (window.INITIAL_STATE) {
        const allBuildings = new Map();

        // Helper to recursively extract buildings from any object
        function extractBuildings(obj, buildings = new Map()) {
          if (!obj || typeof obj !== 'object') return buildings;

          if (Array.isArray(obj)) {
            obj.forEach(item => extractBuildings(item, buildings));
            return buildings;
          }

          // If this looks like a building object
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

        // Extract from entire INITIAL_STATE
        extractBuildings(window.INITIAL_STATE, allBuildings);

        return Array.from(allBuildings.values());
      }

      // Fallback: try to extract from DOM
      const buildings = [];
      const buildingCards = document.querySelectorAll('[class*="building"], [class*="card"], [class*="property"]');

      buildingCards.forEach((card, index) => {
        const link = card.querySelector('a[href*="mshenebare"]');
        if (link) {
          buildings.push({
            url: link.getAttribute('href'),
            buildingId: link.getAttribute('href')?.split('-').pop() || `dom-${index}`,
            needsDetailFetch: true
          });
        }
      });

      return buildings;
    });

    console.log(`✅ Extracted ${buildingsData.length} buildings\n`);

    // Transform data
    console.log('🔄 Transforming data...');

    const transformedProjects = buildingsData.map((building, index) => {
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
        needsDetailFetch: building.needsDetailFetch || false,
      };
    });

    // Save to JSON
    const outputPath = path.join(__dirname, 'korter-puppeteer-projects.json');
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

    const needsDetails = transformedProjects.filter(p => p.needsDetailFetch).length;
    if (needsDetails > 0) {
      console.log(`   ⚠️  Projects needing detail fetch: ${needsDetails}`);
    }

    // Save summary
    const summary = {
      totalProjects: transformedProjects.length,
      targetProjects: 572,
      coveragePercent: ((transformedProjects.length / 572) * 100).toFixed(1),
      scrapingMethod: 'puppeteer',
      cities: cities,
      uniqueDevelopers: developers.length,
      projectsWithPricing: withPrices,
      projectsWithImages: withImages,
      projectsNeedingDetails: needsDetails,
      scrapedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(__dirname, 'korter-puppeteer-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    await browser.close();
    return transformedProjects;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);

    if (browser) {
      await browser.close();
    }

    throw error;
  }
}

if (require.main === module) {
  scrapeWithPuppeteer()
    .then((projects) => {
      if (projects.length >= 500) {
        console.log('\n🎉 SUCCESS! Got nearly all 572 projects!');
      } else if (projects.length >= 100) {
        console.log('\n✅ Got substantial data (' + projects.length + ' projects)');
      } else {
        console.log('\n⚠️  Got limited data (' + projects.length + ' projects)');
        console.log('   May need to investigate further or use alternative methods');
      }
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

module.exports = { scrapeWithPuppeteer };
