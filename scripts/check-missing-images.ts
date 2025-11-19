import { prisma } from '../lib/db';

async function checkMissingImages() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      titleEn: true,
      slug: true,
      coverImage: true,
      gallery: true,
      developer: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      titleEn: 'asc'
    }
  });

  const projectsWithoutCoverImage = projects.filter(p => !p.coverImage);
  const projectsWithoutGallery = projects.filter(p => !p.gallery || p.gallery === '[]' || p.gallery === 'null');
  const projectsWithNoImages = projects.filter(p => !p.coverImage && (!p.gallery || p.gallery === '[]' || p.gallery === 'null'));

  console.log(`\n=== IMAGE STATUS REPORT ===\n`);
  console.log(`Total Projects: ${projects.length}`);
  console.log(`Projects without cover image: ${projectsWithoutCoverImage.length}`);
  console.log(`Projects without gallery: ${projectsWithoutGallery.length}`);
  console.log(`Projects with NO images at all: ${projectsWithNoImages.length}`);

  if (projectsWithNoImages.length > 0) {
    console.log(`\n=== PROJECTS WITH NO IMAGES ===\n`);
    projectsWithNoImages.forEach((p, i) => {
      console.log(`${i + 1}. ${p.titleEn} (${p.developer?.name || 'Unknown Developer'})`);
    });
  }

  await prisma.$disconnect();
}

checkMissingImages();
