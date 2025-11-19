import { prisma } from '../lib/db';

/**
 * Update projects with real images from korter.ge
 * All image URLs collected from https://korter.ge developer pages
 */

interface ProjectImages {
  cover: string;
  gallery: string[];
}

// Map of project slugs to their real images from korter.ge
const projectImages: Record<string, ProjectImages> = {
  // Next Group Projects
  'next-downtown-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/31252.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/31252.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/31252.jpg',
    ]
  },
  'wyndham-residence-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/16322.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/16322.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/16322.jpg',
    ]
  },
  'tbilisi-downtown-next': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35083.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35083.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35083.jpg',
    ]
  },
  'radisson-residences-gonio': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/17654.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/17654.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/17654.jpg',
    ]
  },
  'next-address-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/22629.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/22629.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/22629.jpg',
    ]
  },
  'next-collection-makhinjauri': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24112.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24112.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24112.jpg',
    ]
  },
  'tbilisi-oriental-by-next': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/37155.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/37155.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/37155.jpg',
    ]
  },
  'next-gardens-gonio': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28868.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28868.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/28868.jpg',
    ]
  },

  // Biograpi Living Projects
  'hisni-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/30050.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/30050.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/30050.jpg',
    ]
  },
  'sakeni-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23239.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23239.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/23239.jpg',
    ]
  },
  'bare-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35632.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35632.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35632.jpg',
    ]
  },
  'matiani-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24473.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24473.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24473.jpg',
    ]
  },
  'daira-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/36438.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/36438.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/36438.jpg',
    ]
  },
  'chantan-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/26329.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/26329.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/26329.jpg',
    ]
  },
  'libretto-by-biograpi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35937.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35937.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35937.jpg',
    ]
  },

  // Archi Projects
  'archi-kokhta-bakuriani': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/15456.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/15456.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/15456.jpg',
    ]
  },
  'archi-lilac': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/13448.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/13448.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/13448.jpg',
    ]
  },
  'archi-varketili': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/8163.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/8163.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/8163.jpg',
    ]
  },
  'archi-isani': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/2506.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/2506.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/2506.jpg',
    ]
  },
  'archi-rustavi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/29591.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/29591.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/29591.jpg',
    ]
  },
  'archi-guramishvili': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14280.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14280.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/14280.jpg',
    ]
  },
  'archi-kikvidze-garden': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/13438.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/13438.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/13438.jpg',
    ]
  },
  'archi-akhmeteli': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14460.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14460.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/14460.jpg',
    ]
  },

  // X2 Development Projects
  'bakuriani-4rest': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/12058.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/12058.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/12058.jpg',
    ]
  },
  'dighomi-residence-x2': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21887.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21887.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/21887.jpg',
    ]
  },
  'kazbegi-residence-x2': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21840.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21840.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/21840.jpg',
    ]
  },
  'riverfront-residence-x2': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23717.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23717.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/23717.jpg',
    ]
  },
  'zenx-dighomi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21841.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21841.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/21841.jpg',
    ]
  },

  // Metropol Projects
  'metropol-oval': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33055.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33055.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/33055.jpg',
    ]
  },
  'metropol-cube': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33048.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33048.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/33048.jpg',
    ]
  },
  'the-parallel': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/25740.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/25740.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/25740.jpg',
    ]
  },
  'metropol-ortachala': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/29999.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/29999.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/29999.jpg',
    ]
  },
  'metropol-kavtaradze': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23563.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23563.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/23563.jpg',
    ]
  },

  // Blox Projects
  'blox-krtsanisi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28560.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28560.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/28560.jpg',
    ]
  },
  'blox-beliashvili-2': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23937.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23937.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/23937.jpg',
    ]
  },
  'blox-gudauri': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/31827.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/31827.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/31827.jpg',
    ]
  },
  'blox-varketili': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23664.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/23664.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/23664.jpg',
    ]
  },
  'blox-ortachala': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35962.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35962.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35962.jpg',
    ]
  },
  'blox-didi-dighomi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/32089.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/32089.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/32089.jpg',
    ]
  },
  'blox-sarajishvili': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/32822.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/32822.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/32822.jpg',
    ]
  },

  // ELT Building Projects
  'compact-house-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21955.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/21955.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/21955.jpg',
    ]
  },
  'barcelo-tbilisi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24244.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24244.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24244.jpg',
    ]
  },
  'status-house-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33008.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/33008.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/33008.jpg',
    ]
  },
  'marina-club-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/20095.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/20095.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/20095.jpg',
    ]
  },
  'optima-residence-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/19713.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/19713.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/19713.jpg',
    ]
  },

  // Gumbati Group Projects
  'portline-by-gumbati': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/13947.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/13947.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/13947.jpg',
    ]
  },
  'midtown-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/22215.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/22215.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/22215.jpg',
    ]
  },
  'montemar-gonio': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24806.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/24806.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/24806.jpg',
    ]
  },
  'boulevard-point-batumi': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/20749.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/20749.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/20749.jpg',
    ]
  },
  'subtropic-city': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/36153.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/36153.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/36153.jpg',
    ]
  },

  // Monolith Group Projects
  'monolith-ethno-city': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28880.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/28880.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/28880.jpg',
    ]
  },
  'monolith-green-city': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14977.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/14977.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/14977.jpg',
    ]
  },
  'monolith-dighomi-city': {
    cover: 'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35654.jpg',
    gallery: [
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/840x630/35654.jpg',
      'https://storage.googleapis.com/bd-ge-01/buildings-v2/420x315/35654.jpg',
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
