/**
 * Improved script to scrape projects from bdgroup.ge using Puppeteer
 * Run with: node scripts/import-bdgroup-projects-v2.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://bdgroup.ge';
const PROJECTS_URL = `${BASE_URL}/objects_ru/`;

// Status mapping
const mapStatus = (deliveryText) => {
  if (!deliveryText) return 'ready';
  const lower = deliveryText.toLowerCase();
  if (lower.includes('сдан') || lower.includes('completed') || lower.includes('готов')) {
    return 'ready';
  }
  const year = parseInt(deliveryText.match(/\d{4}/)?.[0]);
  const currentYear = new Date().getFullYear();
  if (year && year <= currentYear) {
    return 'ready';
  }
  if (year && year > currentYear) {
    return 'underConstruction';
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

// Generate slug from title
const generateSlug = (title) => {
  if (!title) return 'project-' + Date.now();
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

async function scrapeWithPuppeteer() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('Navigating to:', PROJECTS_URL);
    await page.goto(PROJECTS_URL, { waitUntil: 'networkidle0', timeout: 30000 });

    console.log('Extracting project data...');

    // Extract all projects from the page
    const projects = await page.evaluate((baseUrl) => {
      const projectElements = Array.from(document.querySelectorAll('.object-item, .project-item, [class*="object"]'));

      return projectElements.map(element => {
        // Try multiple selectors for each piece of information
        const getTextContent = (selectors) => {
          for (const selector of selectors) {
            const el = element.querySelector(selector);
            if (el && el.textContent.trim()) {
              return el.textContent.trim();
            }
          }
          return '';
        };

        const getAttribute = (selectors, attr) => {
          for (const selector of selectors) {
            const el = element.querySelector(selector);
            if (el) {
              const value = el.getAttribute(attr);
              if (value) return value;
            }
          }
          return '';
        };

        // Extract title
        const title = getTextContent([
          '.object-name',
          '.project-title',
          '.object-title',
          'h2',
          'h3',
          '[class*="title"]',
          '[class*="name"]'
        ]);

        // Extract image
        let imageUrl = getAttribute(['img'], 'src') || getAttribute(['img'], 'data-src');
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = imageUrl.startsWith('/') ? baseUrl + imageUrl : baseUrl + '/' + imageUrl;
        }

        // Extract link
        let projectLink = getAttribute(['a'], 'href');
        if (projectLink && !projectLink.startsWith('http')) {
          projectLink = baseUrl + (projectLink.startsWith('/') ? '' : '/') + projectLink;
        }

        // Extract all info items (usually in a list or grid)
        const infoItems = Array.from(element.querySelectorAll('[class*="info"] li, [class*="param"] li, .characteristic-item'));
        const infoText = infoItems.map(item => item.textContent.trim()).join(' | ');

        // Try to parse specific info
        const allText = element.textContent;

        // Price
        const priceMatch = allText.match(/\$\s*([\d\s,]+)\s*-\s*\$\s*([\d\s,]+)/);
        let priceMin = null, priceMax = null;
        if (priceMatch) {
          priceMin = parseInt(priceMatch[1].replace(/[^\d]/g, ''));
          priceMax = parseInt(priceMatch[2].replace(/[^\d]/g, ''));
        }

        // Area
        const areaMatch = allText.match(/(\d+)\s*-\s*(\d+)\s*м²/);
        let areaMin = null, areaMax = null;
        if (areaMatch) {
          areaMin = parseInt(areaMatch[1]);
          areaMax = parseInt(areaMatch[2]);
        }

        // Delivery
        const deliveryMatch = allText.match(/(\d{4})|сдан|готов/i);
        const deliveryText = deliveryMatch ? deliveryMatch[0] : '';

        // Developer (usually in title)
        let developer = '';
        if (title.includes(' by ')) {
          developer = title.split(' by ')[1];
        } else if (title.includes('|')) {
          const parts = title.split('|');
          developer = parts[parts.length - 1].trim();
        }

        return {
          title: title || 'Untitled Project',
          developer,
          imageUrl,
          projectLink,
          priceMin,
          priceMax,
          areaMin,
          areaMax,
          deliveryText,
          allInfo: infoText,
          rawText: allText.substring(0, 500) // First 500 chars for debugging
        };
      }).filter(p => p.title && p.title !== 'Untitled Project');
    }, BASE_URL);

    console.log(`Found ${projects.length} projects on listing page`);

    // Now scrape detail pages for better information
    const detailedProjects = [];

    for (let i = 0; i < Math.min(projects.length, 15); i++) {
      const project = projects[i];
      console.log(`\n[${i + 1}/15] Processing: ${project.title}`);

      if (!project.projectLink) {
        console.log('  No link found, skipping...');
        continue;
      }

      try {
        const detailPage = await browser.newPage();
        await detailPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        console.log(`  Fetching: ${project.projectLink}`);
        await detailPage.goto(project.projectLink, { waitUntil: 'networkidle0', timeout: 15000 });

        const details = await detailPage.evaluate(() => {
          const getTextContent = (selectors) => {
            for (const selector of selectors) {
              const el = document.querySelector(selector);
              if (el && el.textContent.trim()) {
                return el.textContent.trim();
              }
            }
            return '';
          };

          // Extract description
          const description = getTextContent([
            '.object-description',
            '.description',
            '[class*="description"]',
            '.about-text',
            'article p'
          ]);

          // Extract gallery images
          const images = Array.from(document.querySelectorAll('.gallery img, .slider img, [class*="gallery"] img, [class*="slider"] img'))
            .map(img => img.src || img.dataset.src)
            .filter(Boolean)
            .slice(0, 8); // Limit to 8 images

          // Extract features
          const features = Array.from(document.querySelectorAll('.features li, .amenities li, [class*="feature"] li, [class*="infrastructure"] li'))
            .map(li => li.textContent.trim())
            .filter(Boolean);

          // Extract location
          const location = getTextContent([
            '.location',
            '.address',
            '[class*="location"]',
            '[class*="address"]'
          ]);

          return {
            description,
            images,
            features,
            location
          };
        });

        await detailPage.close();

        // Merge with list data
        const mergedProject = {
          ...project,
          ...details
        };

        detailedProjects.push(mergedProject);
        console.log(`  ✓ Extracted ${details.images.length} images, ${details.features.length} features`);

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1500));

      } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
        detailedProjects.push(project); // Add without details
      }
    }

    return detailedProjects;

  } finally {
    await browser.close();
  }
}

function transformToSanityFormat(project) {
  // Calculate averages
  const avgPrice = project.priceMin && project.priceMax ?
    (project.priceMin + project.priceMax) / 2 :
    (project.priceMin || project.priceMax || 75000);

  const avgArea = project.areaMin && project.areaMax ?
    (project.areaMin + project.areaMax) / 2 :
    (project.areaMin || project.areaMax || 50);

  const pricePerSqm = avgPrice / avgArea;

  // Extract city
  const locationText = project.location || project.allInfo || '';
  const city = locationText.includes('Batumi') || locationText.includes('Батуми') ? 'Batumi' :
                locationText.includes('Tbilisi') || locationText.includes('Тбилиси') ? 'Tbilisi' :
                'Batumi';

  const delivery = extractDelivery(project.deliveryText);
  const status = mapStatus(project.deliveryText);
  const slug = generateSlug(project.title);

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
      current: slug
    },
    status: status,
    propertyType: 'apartment',
    location: {
      city: city,
      area: '',
      address: project.location || locationText,
      lat: city === 'Batumi' ? 41.6168 : 41.7151,
      lng: city === 'Batumi' ? 41.6367 : 44.8271,
    },
    pricing: {
      price: Math.round(avgPrice),
      pricePerSqm: Math.round(pricePerSqm),
      currency: 'USD',
      priceRange: project.priceMin && project.priceMax ? {
        min: Math.round(project.priceMin),
        max: Math.round(project.priceMax)
      } : null
    },
    investment: {
      yield: 8.0,
      capRate: 7.5,
      monthlyRent: Math.round(avgPrice * 0.006),
      occupancy: 85,
      managementFee: 15
    },
    delivery: delivery,
    area: Math.round(avgArea),
    description: {
      en: project.description || `Investment property in ${city}. ${project.title}`,
      ka: project.description || `საინვესტიციო უძრავი ქონება ${city}-ში.`,
      ru: project.description || `Инвестиционная недвижимость в ${city}.`,
      he: project.description || `נכס להשקעה ב-${city}.`,
      az: project.description || `${city}-də investisiya əmlakı.`,
      hy: project.description || `Ներդրումային գույք ${city}-ում.`,
      uk: project.description || `Інвестиційна нерухомість у ${city}.`,
    },
    highlights: project.features && project.features.length > 0 ? project.features : [
      'Prime Location',
      'High ROI Potential',
      'Modern Design',
      'Investment Opportunity'
    ],
    featured: false,
    publishedAt: new Date().toISOString(),
    _imageUrls: [project.imageUrl, ...(project.images || [])].filter(Boolean),
    _developerName: project.developer,
    _sourceUrl: project.projectLink
  };
}

async function main() {
  console.log('Starting improved BD Group project scraper with Puppeteer...\n');

  try {
    const projects = await scrapeWithPuppeteer();

    if (projects.length === 0) {
      console.log('No projects found. Exiting...');
      return;
    }

    console.log(`\n\nTransforming ${projects.length} projects to Sanity format...`);

    const sanityProjects = projects.map(transformToSanityFormat);

    // Save to JSON file
    const outputPath = path.join(__dirname, 'bdgroup-projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(sanityProjects, null, 2));

    console.log(`\n✅ Successfully scraped ${sanityProjects.length} projects`);
    console.log(`📁 Data saved to: ${outputPath}`);
    console.log('\nNext steps:');
    console.log('1. Review the generated JSON file');
    console.log('2. Run: node scripts/upload-to-sanity.js');
    console.log('   This will upload the projects to your Sanity CMS\n');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the scraper
main().catch(console.error);
