import { prisma } from '../lib/db';

async function checkProjectsWithImages() {
  const projects = await prisma.project.findMany({
    select: {
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

  const projectsWithImages = projects.filter(p => p.coverImage || (p.gallery && p.gallery !== '[]' && p.gallery !== 'null'));

  console.log(`\n=== PROJECTS WITH IMAGES (${projectsWithImages.length}) ===\n`);
  projectsWithImages.forEach((p, i) => {
    const galleryCount = p.gallery && p.gallery !== '[]' && p.gallery !== 'null'
      ? JSON.parse(p.gallery).length
      : 0;
    console.log(`${i + 1}. ${p.titleEn} (${p.developer?.name || 'Unknown'})`);
    console.log(`   Cover: ${p.coverImage ? '✓' : '✗'}`);
    console.log(`   Gallery: ${galleryCount} images\n`);
  });

  await prisma.$disconnect();
}

checkProjectsWithImages();
