import { prisma } from '../lib/db';

async function listProjects() {
  const projects = await prisma.project.findMany({
    select: {
      titleEn: true,
      slug: true,
    },
    orderBy: {
      titleEn: 'asc'
    }
  });

  console.log(`\nTotal Projects: ${projects.length}\n`);
  projects.forEach((p, i) => {
    console.log(`${i + 1}. ${p.titleEn} (${p.slug})`);
  });

  await prisma.$disconnect();
}

listProjects();
