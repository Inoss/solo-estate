import { prisma } from '../lib/db';

/**
 * Remove duplicate images from project galleries
 * - Remove duplicates within gallery
 * - Remove cover image from gallery if it's duplicated there
 */

async function removeDuplicateImages() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      titleEn: true,
      slug: true,
      coverImage: true,
      gallery: true,
    },
  });

  console.log('\n=== REMOVING DUPLICATE IMAGES ===\n');

  let updated = 0;

  for (const project of projects) {
    if (!project.gallery) continue;

    try {
      const galleryImages = JSON.parse(project.gallery);

      // Remove duplicates from gallery
      const uniqueGallery = Array.from(new Set(galleryImages));

      // Remove cover image from gallery if it exists there
      const finalGallery = uniqueGallery.filter(img => img !== project.coverImage);

      // Only update if there's a change
      if (finalGallery.length !== galleryImages.length) {
        await prisma.project.update({
          where: { id: project.id },
          data: {
            gallery: JSON.stringify(finalGallery)
          }
        });

        updated++;
        console.log(`✓ ${updated}. ${project.titleEn} - Removed ${galleryImages.length - finalGallery.length} duplicate(s)`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${project.titleEn}:`, error);
    }
  }

  console.log(`\n✅ Successfully removed duplicates from ${updated} projects!`);

  await prisma.$disconnect();
}

removeDuplicateImages();
