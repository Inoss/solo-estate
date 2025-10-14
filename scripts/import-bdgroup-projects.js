/**
 * Script to scrape projects from bdgroup.ge and import them to Sanity
 * Run with: node scripts/import-bdgroup-projects.js
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://bdgroup.ge';
const PROJECTS_URL = `${BASE_URL}/objects_ru/`;

// Status mapping
const mapStatus = (deliveryDate) => {
  if (!deliveryDate) return 'ready';
  if (deliveryDate.toLowerCase().includes('сдан') || deliveryDate.toLowerCase().includes('completed')) {
    return 'ready';
  }
  const year = parseInt(deliveryDate);
  const currentYear = new Date().getFullYear();
  if (year && year <= currentYear) {
    return 'ready';
  }
  return 'underConstruction';
};

// Extract delivery info
const extractDelivery = (deliveryText) => {
  if (!deliveryText) return null;
  const year = parseInt(deliveryText.match(/\d{4}/)?.[0]);
  if (!year) return null;
  return {
    quarter: 'Q4',
    year: year
  };
};

// Extract area range
const extractAreaRange = (areaText) => {
  if (!areaText) return null;
  const match = areaText.match(/(\d+)-(\d+)/);
  if (match) {
    return {
      min: parseInt(match[1]),
      max: parseInt(match[2])
    };
  }
  const singleMatch = areaText.match(/(\d+)/);
  if (singleMatch) {
    return {
      min: parseInt(singleMatch[1]),
      max: parseInt(singleMatch[1])
    };
  }
  return null;
};

// Extract price range
const extractPriceRange = (priceText) => {
  if (!priceText) return null;
  // Remove currency symbols and commas
  const cleaned = priceText.replace(/[$,]/g, '');
  const match = cleaned.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (match) {
    return {
      min: parseFloat(match[1]),
      max: parseFloat(match[2])
    };
  }
  const singleMatch = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (singleMatch) {
    const price = parseFloat(singleMatch[1]);
    return {
      min: price,
      max: price
    };
  }
  return null;
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

async function scrapeProjectsList() {
  try {
    console.log('Fetching projects list from:', PROJECTS_URL);
    const response = await axios.get(PROJECTS_URL);
    const $ = cheerio.load(response.data);

    const projects = [];

    // Find all project cards
    $('.object-card, .project-card, .property-card, [class*="object"]').each((i, element) => {
      const $card = $(element);

      // Extract basic info
      const titleElement = $card.find('h2, h3, .title, .object-title, [class*="title"]').first();
      const title = titleElement.text().trim();

      if (!title) return; // Skip if no title

      // Extract developer name (usually before "by" or in subtitle)
      let developer = '';
      const fullTitle = title;
      if (fullTitle.includes(' by ')) {
        const parts = fullTitle.split(' by ');
        developer = parts[1]?.trim() || '';
      }

      // Extract location
      const locationElement = $card.find('.location, .address, [class*="location"], [class*="address"]');
      const location = locationElement.text().trim();

      // Extract delivery date
      const deliveryElement = $card.find('.delivery, .date, [class*="delivery"], [class*="date"]').filter((i, el) => {
        const text = $(el).text().toLowerCase();
        return text.includes('20') || text.includes('сда') || text.includes('delivery');
      }).first();
      const deliveryText = deliveryElement.text().trim();

      // Extract area
      const areaElement = $card.find('.area, .size, [class*="area"], [class*="size"]').filter((i, el) => {
        const text = $(el).text();
        return text.includes('m²') || text.includes('м²');
      }).first();
      const areaText = areaElement.text().trim();

      // Extract price
      const priceElement = $card.find('.price, [class*="price"]').first();
      const priceText = priceElement.text().trim();

      // Extract distance to sea
      const distanceElement = $card.find('.distance, [class*="distance"]').filter((i, el) => {
        const text = $(el).text().toLowerCase();
        return text.includes('sea') || text.includes('море') || text.includes('м');
      }).first();
      const distanceText = distanceElement.text().trim();

      // Extract image
      const imageElement = $card.find('img').first();
      const imageUrl = imageElement.attr('src') || imageElement.attr('data-src');

      // Extract project link
      const linkElement = $card.find('a[href*="objects"]').first();
      let projectLink = linkElement.attr('href') || '';
      if (projectLink && !projectLink.startsWith('http')) {
        projectLink = BASE_URL + (projectLink.startsWith('/') ? '' : '/') + projectLink;
      }

      // Parse extracted data
      const areaRange = extractAreaRange(areaText);
      const priceRange = extractPriceRange(priceText);
      const delivery = extractDelivery(deliveryText);
      const status = mapStatus(deliveryText);

      const project = {
        title: title,
        developer: developer,
        location: location,
        deliveryText: deliveryText,
        delivery: delivery,
        status: status,
        areaText: areaText,
        areaRange: areaRange,
        priceText: priceText,
        priceRange: priceRange,
        distanceToSea: distanceText,
        imageUrl: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : BASE_URL + imageUrl) : null,
        projectUrl: projectLink,
        slug: generateSlug(title)
      };

      projects.push(project);
    });

    console.log(`Found ${projects.length} projects`);
    return projects;

  } catch (error) {
    console.error('Error scraping projects list:', error.message);
    return [];
  }
}

async function scrapeProjectDetails(projectUrl) {
  try {
    console.log('Fetching project details from:', projectUrl);
    const response = await axios.get(projectUrl);
    const $ = cheerio.load(response.data);

    // Extract additional details from project page
    const details = {
      description: '',
      features: [],
      images: [],
      specifications: {}
    };

    // Description
    const descriptionElement = $('.description, .about, [class*="description"]').first();
    details.description = descriptionElement.text().trim();

    // Gallery images
    $('.gallery img, .slider img, [class*="gallery"] img').each((i, img) => {
      const src = $(img).attr('src') || $(img).attr('data-src');
      if (src) {
        const fullUrl = src.startsWith('http') ? src : BASE_URL + src;
        details.images.push(fullUrl);
      }
    });

    // Features/amenities
    $('.features li, .amenities li, [class*="feature"] li').each((i, li) => {
      const feature = $(li).text().trim();
      if (feature) {
        details.features.push(feature);
      }
    });

    return details;

  } catch (error) {
    console.error('Error scraping project details:', error.message);
    return null;
  }
}

function transformToSanityFormat(project, details) {
  // Calculate average price and area
  const avgPrice = project.priceRange ?
    (project.priceRange.min + project.priceRange.max) / 2 :
    50000;

  const avgArea = project.areaRange ?
    (project.areaRange.min + project.areaRange.max) / 2 :
    50;

  const pricePerSqm = avgPrice / avgArea;

  // Extract city from location
  const city = project.location.includes('Batumi') ? 'Batumi' :
                project.location.includes('Tbilisi') ? 'Tbilisi' :
                'Batumi';

  return {
    _type: 'project',
    title: {
      en: project.title,
      ka: project.title,
      ru: project.title,
      he: project.title,
      az: project.title,
      hy: project.title,
      uk: project.title,
    },
    slug: {
      _type: 'slug',
      current: project.slug
    },
    status: project.status,
    propertyType: 'apartment',
    location: {
      city: city,
      area: '',
      address: project.location,
      lat: city === 'Batumi' ? 41.6168 : 41.7151,
      lng: city === 'Batumi' ? 41.6367 : 44.8271,
    },
    pricing: {
      price: Math.round(avgPrice),
      pricePerSqm: Math.round(pricePerSqm),
      currency: 'USD',
      priceRange: project.priceRange ? {
        min: Math.round(project.priceRange.min),
        max: Math.round(project.priceRange.max)
      } : null
    },
    investment: {
      yield: 8.0,
      capRate: 7.5,
      monthlyRent: Math.round(avgPrice * 0.006),
      occupancy: 85,
      managementFee: 15
    },
    delivery: project.delivery,
    area: avgArea,
    description: {
      en: details?.description || `Investment property in ${city}. ${project.title}`,
      ka: details?.description || `საინვესტიციო უძრავი ქონება ${city}-ში. ${project.title}`,
      ru: details?.description || `Инвестиционная недвижимость в ${city}. ${project.title}`,
      he: details?.description || `נכס להשקעה ב-${city}. ${project.title}`,
      az: details?.description || `${city}-də investisiya əmlakı. ${project.title}`,
      hy: details?.description || `Ներդրումային գույք ${city}-ում. ${project.title}`,
      uk: details?.description || `Інвестиційна нерухомість у ${city}. ${project.title}`,
    },
    highlights: details?.features || [
      'Prime Location',
      'High ROI Potential',
      'Modern Design',
      'Near Sea',
      'Investment Opportunity'
    ],
    featured: false,
    publishedAt: new Date().toISOString(),
    // Note: Images and developer reference need to be handled separately
    _imageUrls: [project.imageUrl, ...(details?.images || [])].filter(Boolean),
    _developerName: project.developer,
    _sourceUrl: project.projectUrl,
    _distanceToSea: project.distanceToSea
  };
}

async function main() {
  console.log('Starting BD Group project scraper...\n');

  // Step 1: Scrape projects list
  const projects = await scrapeProjectsList();

  if (projects.length === 0) {
    console.log('No projects found. Exiting...');
    return;
  }

  console.log(`\nProcessing ${projects.length} projects...\n`);

  // Step 2: Scrape details for each project (limit to first 10 to avoid overwhelming)
  const detailedProjects = [];
  const limit = Math.min(projects.length, 15); // Process up to 15 projects

  for (let i = 0; i < limit; i++) {
    const project = projects[i];
    console.log(`[${i + 1}/${limit}] Processing: ${project.title}`);

    let details = null;
    if (project.projectUrl) {
      details = await scrapeProjectDetails(project.projectUrl);
      // Wait a bit between requests to be polite
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const sanityFormat = transformToSanityFormat(project, details);
    detailedProjects.push(sanityFormat);
  }

  // Step 3: Save to JSON file
  const outputPath = path.join(__dirname, 'bdgroup-projects.json');
  fs.writeFileSync(outputPath, JSON.stringify(detailedProjects, null, 2));

  console.log(`\n✅ Successfully scraped ${detailedProjects.length} projects`);
  console.log(`📁 Data saved to: ${outputPath}`);
  console.log('\nNext steps:');
  console.log('1. Review the generated JSON file');
  console.log('2. Run: node scripts/upload-to-sanity.js');
  console.log('   This will upload the projects to your Sanity CMS\n');
}

// Run the scraper
main().catch(console.error);
