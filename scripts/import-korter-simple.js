/**
 * Simple Korter Import - No Image Upload
 * Creates projects in Sanity using external image URLs
 * This is faster and works without API token
 */

const fs = require('fs');
const path = require('path');

// Load the prepared data
const projectsPath = path.join(__dirname, 'sanity-projects.json');
const developersPath = path.join(__dirname, 'sanity-developers.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const developers = JSON.parse(fs.readFileSync(developersPath, 'utf8'));

console.log('📊 Data loaded:');
console.log(`   Projects: ${projects.length}`);
console.log(`   Developers: ${developers.length}\n`);

// For now, let's create a JSON file that can be manually imported
// or used directly by the frontend

// Helper to extract image URL from Korter image object
function getImageUrl(imageObj) {
  if (!imageObj) return null;
  if (typeof imageObj === 'string') return imageObj;
  if (imageObj.mediaSrc?.default?.x1) return imageObj.mediaSrc.default.x1;
  if (imageObj.mediaSrc?.default?.x2) return imageObj.mediaSrc.default.x2;
  return null;
}

// Transform to include image URLs that can be used directly
const frontendReadyProjects = projects.map(project => ({
  _id: project._id,
  _type: 'project',
  title: project.title,
  slug: project.slug,
  developer: project.developer,
  status: project.status,
  propertyType: project.propertyType,
  location: project.location,
  pricing: project.pricing,
  investment: project.investment,
  delivery: project.delivery,
  area: project.area,

  // Extract actual image URLs from Korter format
  coverImageUrl: getImageUrl(project.coverImageUrl),
  galleryUrls: project.galleryUrls?.map(getImageUrl).filter(Boolean) || [],

  description: project.description,
  highlights: project.highlights,
  featured: project.featured,
  publishedAt: project.publishedAt,

  // Source metadata
  sourceUrl: project.sourceUrl,
  korterBuildingId: project.korterBuildingId,
}));

// Save frontend-ready data
const outputPath = path.join(__dirname, 'korter-frontend-ready.json');
fs.writeFileSync(outputPath, JSON.stringify(frontendReadyProjects, null, 2));

console.log(`✅ Frontend-ready data created: ${outputPath}`);
console.log('\n📝 Usage:');
console.log('   1. Copy this file to a lib/korter-projects.ts');
console.log('   2. Use it directly in your components');
console.log('   3. Later, import to Sanity when credentials are ready\n');

// Also create a sample of 50 projects for immediate use
const sampleProjects = frontendReadyProjects.slice(0, 50);
const samplePath = path.join(__dirname, 'korter-sample-50.json');
fs.writeFileSync(samplePath, JSON.stringify(sampleProjects, null, 2));

console.log(`✅ Sample data (50 projects): ${samplePath}\n`);

// Create TypeScript file for direct import
const tsContent = `/**
 * Korter.ge Projects - Real Data
 * ${projects.length} projects from korter.ge
 * Generated: ${new Date().toISOString()}
 */

export const korterProjects = ${JSON.stringify(frontendReadyProjects, null, 2)} as const;

export const korterDevelopers = ${JSON.stringify(developers, null, 2)} as const;

// Quick stats
export const stats = {
  totalProjects: ${projects.length},
  totalDevelopers: ${developers.length},
  avgPrice: ${Math.round(projects.reduce((sum, p) => sum + (p.pricing?.price || 0), 0) / projects.length)},
  citiesCount: ${[...new Set(projects.map(p => p.location?.city))].length},
} as const;
`;

const tsPath = path.join(__dirname, '..', 'lib', 'korter-data.ts');
fs.writeFileSync(tsPath, tsContent);

console.log(`✅ TypeScript data file: ${tsPath}`);
console.log('\n🎉 Ready to use! Import with:');
console.log('   import { korterProjects } from "@/lib/korter-data"\n');
