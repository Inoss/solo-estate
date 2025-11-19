import { prisma } from '../lib/db';

/**
 * Check gallery status for all projects
 */

async function checkGalleryStatus() {
  const projects = await prisma.project.findMany({
    select: {
      titleEn: true,
      coverImage: true,
      gallery: true,
    },
    orderBy: {
      titleEn: 'asc'
    }
  });

  console.log('\n=== GALLERY STATUS REPORT ===\n');

  let projectsWithCover = 0;
  let projectsWithGallery = 0;
  let totalGalleryImages = 0;
  let projectsWithEmptyGallery = 0;

  projects.forEach(p => {
    if (p.coverImage) projectsWithCover++;

    if (p.gallery) {
      try {
        const gallery = JSON.parse(p.gallery);
        if (gallery.length > 0) {
          projectsWithGallery++;
          totalGalleryImages += gallery.length;
        } else {
          projectsWithEmptyGallery++;
        }
      } catch (e) {
        // ignore
      }
    }
  });

  console.log(`Total projects: ${projects.length}`);
  console.log(`Projects with cover image: ${projectsWithCover}`);
  console.log(`Projects with gallery images: ${projectsWithGallery}`);
  console.log(`Projects with empty gallery: ${projectsWithEmptyGallery}`);
  console.log(`Average gallery size: ${(totalGalleryImages / projectsWithGallery).toFixed(1)} images`);
  console.log(`Total gallery images: ${totalGalleryImages}`);

  // Show a sample of a few projects
  console.log('\n=== SAMPLE PROJECTS ===\n');
  for (let i = 0; i < Math.min(5, projects.length); i++) {
    const p = projects[i];
    const gallery = p.gallery ? JSON.parse(p.gallery) : [];
    console.log(`${i + 1}. ${p.titleEn}`);
    console.log(`   Cover: ${p.coverImage ? '✓' : '✗'}`);
    console.log(`   Gallery: ${gallery.length} images`);
    console.log('');
  }

  await prisma.$disconnect();
}

checkGalleryStatus();
