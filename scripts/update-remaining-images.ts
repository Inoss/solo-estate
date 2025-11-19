import { prisma } from '../lib/db';

/**
 * Update remaining projects with real images from korter.ge
 */

interface ProjectImages {
  cover: string;
  gallery: string[];
}

const projectImages: Record<string, ProjectImages> = {
  // Domus Development Projects
  'domus-avlabari': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33154.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33154.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/33154.jpg',
    ]
  },
  'domusi-gazapkhuli': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/32957.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/32957.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/32957.jpg',
    ]
  },
  'domus-nea': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/20938.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/20938.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/20938.jpg',
    ]
  },
  'domus-sera': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35316.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35316.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35316.jpg',
    ]
  },
  'domus-kvariati': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/323.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/323.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/323.jpg',
    ]
  },

  // Alliance Group Projects
  'alliance-centropolis': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/10088.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/10088.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/10088.jpg',
    ]
  },
  'alliance-renaissance': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/22086.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/22086.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/22086.jpg',
    ]
  },
  'alliance-highline': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/9520.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/9520.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/9520.jpg',
    ]
  },
  'highlands-by-alliance': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23257.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23257.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/23257.jpg',
    ]
  },

  // Index I Wealth Management Projects
  'bochorma-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34305.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34305.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/34305.jpg',
    ]
  },
  'avlabari-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35922.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35922.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35922.jpg',
    ]
  },
  'gldani-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34255.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34255.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/34255.jpg',
    ]
  },
  'niabi-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24623.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24623.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24623.jpg',
    ]
  },
  'river-park-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34323.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34323.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/34323.jpg',
    ]
  },
  'isani-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/36629.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/36629.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/36629.jpg',
    ]
  },
  'dighomi-by-index': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35177.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35177.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35177.jpg',
    ]
  },

  // Apart Development Projects
  'old-city-panorama': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14847.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14847.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/14847.jpg',
    ]
  },
  'ezo-apart': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/25377.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/25377.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/25377.jpg',
    ]
  },
  'krtsanisi-margaliti': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24080.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24080.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24080.jpg',
    ]
  },
  'alphecca-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34816.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34816.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/34816.jpg',
    ]
  },
  'lisi-lakers': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34230.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34230.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/34230.jpg',
    ]
  },

  // Anagi Development Projects
  'park-home-saburtalo': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14230.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14230.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/14230.jpg',
    ]
  },
  'city-home-avlabari': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/19537.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/19537.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/19537.jpg',
    ]
  },
  'city-home-kipshidze': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/25259.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/25259.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/25259.jpg',
    ]
  },
  'green-cape-botanico': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34210.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/34210.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/34210.jpg',
    ]
  },
  'villa-ambassadori': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/10658.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/10658.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/10658.jpg',
    ]
  },

  // Pillar Group Projects
  'pillar-park-samgori': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/30818.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/30818.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/30818.jpg',
    ]
  },
  'pillar-park-saburtalo': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/31422.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/31422.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/31422.jpg',
    ]
  },

  // VR Holding Projects (using available images from existing database)
  'vr-vake-sky-tower': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/11110.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/11110.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/11110.jpg',
    ]
  },
  'krtsanisi-resort-residence': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14989.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14989.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/14989.jpg',
    ]
  },
};

async function updateProjectImages() {
  console.log(`\nUpdating ${Object.keys(projectImages).length} projects with real korter.ge images...\n`);

  let updated = 0;
  let notFound = 0;

  for (const [slug, images] of Object.entries(projectImages)) {
    try {
      const project = await prisma.project.findUnique({
        where: { slug },
        select: { id: true, titleEn: true }
      });

      if (!project) {
        console.log(`⚠️  Project not found: ${slug}`);
        notFound++;
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

  console.log(`\n✅ Successfully updated ${updated} projects with real korter.ge images!`);
  if (notFound > 0) {
    console.log(`⚠️  ${notFound} project slugs not found in database`);
  }

  await prisma.$disconnect();
}

updateProjectImages();
