import { prisma } from '../lib/db';

/**
 * Check for projects with duplicate images in their gallery
 */

async function checkDuplicateImages() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      titleEn: true,
      slug: true,
      coverImage: true,
      gallery: true,
    },
    orderBy: {
      titleEn: 'asc'
    }
  });

  console.log('\n=== CHECKING FOR DUPLICATE IMAGES ===\n');

  let projectsWithDuplicates = 0;
  const duplicateDetails: Array<{
    title: string;
    slug: string;
    coverImage: string | null;
    gallery: string[];
    duplicates: string[];
  }> = [];

  for (const project of projects) {
    if (!project.gallery) continue;

    try {
      const galleryImages = JSON.parse(project.gallery);

      // Check for duplicates in gallery
      const uniqueImages = new Set<string>();
      const duplicates = new Set<string>();

      galleryImages.forEach((img: string) => {
        if (uniqueImages.has(img)) {
          duplicates.add(img);
        }
        uniqueImages.add(img);
      });

      // Check if cover image is also in gallery
      if (project.coverImage && galleryImages.includes(project.coverImage)) {
        duplicates.add(project.coverImage);
      }

      if (duplicates.size > 0) {
        projectsWithDuplicates++;
        duplicateDetails.push({
          title: project.titleEn,
          slug: project.slug,
          coverImage: project.coverImage,
          gallery: galleryImages,
          duplicates: Array.from(duplicates)
        });
      }
    } catch (error) {
      console.error(`Error parsing gallery for ${project.titleEn}:`, error);
    }
  }

  console.log(`Total projects checked: ${projects.length}`);
  console.log(`Projects with duplicate images: ${projectsWithDuplicates}\n`);

  if (projectsWithDuplicates > 0) {
    console.log('=== PROJECTS WITH DUPLICATES ===\n');
    duplicateDetails.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title}`);
      console.log(`   Gallery has ${p.gallery.length} images`);
      console.log(`   Duplicates found: ${p.duplicates.length}`);
      console.log('');
    });
  }

  await prisma.$disconnect();
}

checkDuplicateImages();
