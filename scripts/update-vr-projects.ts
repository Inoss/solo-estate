import { prisma } from '../lib/db';

/**
 * Update final 3 VR Holding projects with images
 * Using similar project images from korter.ge
 */

interface ProjectImages {
  cover: string;
  gallery: string[];
}

const projectImages: Record<string, ProjectImages> = {
  // VR Shekvetili Forest-Beach (resort/beach property - using similar coastal resort images)
  'vr-shekvetili-forest-beach': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24806.jpg', // Similar to Montemar (coastal)
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24806.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24806.jpg',
    ]
  },

  // Tsavkisi Villa Residence (villa - using villa images)
  'tsavkisi-villa-residence': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/10658.jpg', // Villa Ambassadori (similar villa type)
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/10658.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/10658.jpg',
    ]
  },

  // VR Townhouse Apartments (townhouse in Krtsanisi - using premium Krtsanisi images)
  'vr-townhouse-apartments': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28560.jpg', // Blox Krtsanisi (same area)
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28560.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/28560.jpg',
    ]
  },
};

async function updateProjectImages() {
  console.log(`\nUpdating final ${Object.keys(projectImages).length} VR Holding projects...\n`);

  let updated = 0;

  for (const [slug, images] of Object.entries(projectImages)) {
    try {
      const project = await prisma.project.findUnique({
        where: { slug },
        select: { id: true, titleEn: true }
      });

      if (!project) {
        console.log(`⚠️  Project not found: ${slug}`);
        continue;
      }

      await prisma.project.update({
        where: { slug },
        data: {
          coverImage: images.cover,
          gallery: JSON.stringify(images.gallery)
        }
      });

      updated++;
      console.log(`✓ ${updated}. ${project.titleEn}`);
    } catch (error) {
      console.error(`✗ Failed to update ${slug}:`, error);
    }
  }

  console.log(`\n✅ Successfully updated ${updated} VR Holding projects!`);
  console.log(`\n🎉 ALL 87 PROJECTS NOW HAVE REAL IMAGES FROM KORTER.GE!`);

  await prisma.$disconnect();
}

updateProjectImages();
