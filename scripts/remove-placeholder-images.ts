import { prisma } from '../lib/db';

/**
 * Remove placeholder Unsplash images from all projects
 */

async function removePlaceholderImages() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      titleEn: true,
      coverImage: true,
    }
  });

  // Find projects with Unsplash images
  const projectsWithUnsplash = projects.filter(
    p => p.coverImage && p.coverImage.includes('unsplash.com')
  );

  console.log(`\nFound ${projectsWithUnsplash.length} projects with Unsplash placeholder images`);
  console.log('Removing placeholder images...\n');

  let updated = 0;

  for (const project of projectsWithUnsplash) {
    try {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          coverImage: null,
          gallery: null
        }
      });

      updated++;
      console.log(`✓ ${updated}/${projectsWithUnsplash.length} - Removed images from ${project.titleEn}`);
    } catch (error) {
      console.error(`✗ Failed to update ${project.titleEn}:`, error);
    }
  }

  console.log(`\n✅ Successfully removed placeholder images from ${updated} projects!`);
  await prisma.$disconnect();
}

removePlaceholderImages();
