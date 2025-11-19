import { prisma } from '../lib/db';

async function countData() {
  const projects = await prisma.project.count();
  const developers = await prisma.developer.count();

  console.log('Current Database Stats:');
  console.log('Projects:', projects);
  console.log('Developers:', developers);

  await prisma.$disconnect();
}

countData();
