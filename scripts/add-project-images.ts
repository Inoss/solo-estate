import { prisma } from '../lib/db';

/**
 * Script to add high-quality real estate images to projects
 * Uses Unsplash images as placeholders based on project type and location
 */

async function addProjectImages() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      slug: true,
      titleEn: true,
      coverImage: true,
      gallery: true,
      propertyType: true,
      locationCity: true,
      developer: {
        select: {
          name: true
        }
      }
    }
  });

  const projectsWithoutImages = projects.filter(
    p => !p.coverImage && (!p.gallery || p.gallery === '[]' || p.gallery === 'null')
  );

  console.log(`\nFound ${projectsWithoutImages.length} projects without images`);
  console.log('Adding Unsplash placeholder images...\n');

  let updated = 0;

  for (const project of projectsWithoutImages) {
    const imageUrls = getImageUrlsForProject(project);

    try {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          coverImage: imageUrls.cover,
          gallery: JSON.stringify(imageUrls.gallery)
        }
      });

      updated++;
      console.log(`✓ ${updated}/${projectsWithoutImages.length} - ${project.titleEn}`);
    } catch (error) {
      console.error(`✗ Failed to update ${project.titleEn}:`, error);
    }
  }

  console.log(`\n✅ Successfully updated ${updated} projects with images!`);
  await prisma.$disconnect();
}

function getImageUrlsForProject(project: any) {
  const { propertyType, locationCity } = project;

  // Base Unsplash URL with high quality settings
  const baseUrl = 'https://images.unsplash.com/photo-';

  // Curated collection of real estate images for different types and locations
  const images = {
    // Tbilisi Apartments
    tbilisi_apartment: [
      `${baseUrl}1545324418-3f75f18c8628?w=1200&q=85`, // Modern apartment
      `${baseUrl}1502672260266-ee1c2b6bb6e7?w=1200&q=85`, // Luxury living room
      `${baseUrl}1522708323590-d24dbb6b0267?w=1200&q=85`, // Modern building exterior
      `${baseUrl}1512917774080-9991f1c4c750?w=1200&q=85`, // Apartment building
      `${baseUrl}1560448204-e02f11c3d0e2?w=1200&q=85`, // Modern architecture
    ],

    // Batumi Apartments (Coastal)
    batumi_apartment: [
      `${baseUrl}1571055107559-3e67626fa8be?w=1200&q=85`, // Coastal building
      `${baseUrl}1571003123894-1f0594d2b5d9?w=1200&q=85`, // Beachfront property
      `${baseUrl}1559827260-2c8c7c6f2c96?w=1200&q=85`, // Coastal resort
      `${baseUrl}1566073771259-6a8506099945?w=1200&q=85`, // Beach property
      `${baseUrl}1559827291-72ee739d0d9a?w=1200&q=85`, // Waterfront building
    ],

    // Villas
    villa: [
      `${baseUrl}1600585154340-be06b84a99f0?w=1200&q=85`, // Luxury villa
      `${baseUrl}1600596542815-f7e88b5de35e?w=1200&q=85`, // Modern villa
      `${baseUrl}1600607687939-ce8a6c25118c?w=1200&q=85`, // Villa exterior
      `${baseUrl}1613490493576-7fde63acd811?w=1200&q=85`, // Villa with pool
      `${baseUrl}1600607687920-4e2a09cf159d?w=1200&q=85`, // Luxury house
    ],

    // Aparthotels / Resorts
    aparthotel: [
      `${baseUrl}1551882547-ff40c63fe5fa?w=1200&q=85`, // Hotel exterior
      `${baseUrl}1542314831-068cd1dbfeeb?w=1200&q=85`, // Luxury hotel
      `${baseUrl}1566073771259-6a8506099945?w=1200&q=85`, // Resort property
      `${baseUrl}1582719478250-c89cae4dc85b?w=1200&q=85`, // Hotel building
      `${baseUrl}1564501049412-61c2a3083791?w=1200&q=85`, // Boutique hotel
    ],

    // Mountain Resorts (Bakuriani, Gudauri)
    mountain_resort: [
      `${baseUrl}1605276374104-5f8c6966c6fd?w=1200&q=85`, // Mountain resort
      `${baseUrl}1571806076126-c7cec9f4c73d?w=1200&q=85`, // Ski resort
      `${baseUrl}1544124680-1d9c4f8b81e1?w=1200&q=85`, // Alpine property
      `${baseUrl}1605007493699-c973fa019758?w=1200&q=85`, // Mountain architecture
      `${baseUrl}1609137144818-a9d6b3f2d935?w=1200&q=85`, // Winter resort
    ],

    // Premium/Luxury
    premium: [
      `${baseUrl}1600607687644-f1aa1ef28d08?w=1200&q=85`, // Luxury property
      `${baseUrl}1600585154526-909f4851c6e9?w=1200&q=85`, // Premium apartment
      `${baseUrl}1600607687920-4e2a09cf159d?w=1200&q=85`, // High-end residence
      `${baseUrl}1512917774080-9991f1c4c750?w=1200&q=85`, // Modern luxury
      `${baseUrl}1613977257363-707ba9348fc7?w=1200&q=85`, // Premium building
    ]
  };

  // Determine which category to use
  let category = 'tbilisi_apartment'; // default

  if (propertyType === 'villa') {
    category = 'villa';
  } else if (propertyType === 'aparthotel') {
    category = 'aparthotel';
  } else if (locationCity?.toLowerCase().includes('batumi') ||
             locationCity?.toLowerCase().includes('gonio') ||
             locationCity?.toLowerCase().includes('kobuleti')) {
    category = 'batumi_apartment';
  } else if (locationCity?.toLowerCase().includes('bakuriani') ||
             locationCity?.toLowerCase().includes('gudauri')) {
    category = 'mountain_resort';
  } else if (locationCity?.toLowerCase().includes('tbilisi')) {
    category = 'tbilisi_apartment';
  }

  // Get random images from the category
  const categoryImages = images[category as keyof typeof images] || images.tbilisi_apartment;
  const randomIndex = Math.floor(Math.random() * categoryImages.length);

  // Rotate through images to avoid duplicates
  const galleryImages = [
    categoryImages[randomIndex],
    categoryImages[(randomIndex + 1) % categoryImages.length],
    categoryImages[(randomIndex + 2) % categoryImages.length],
  ];

  return {
    cover: categoryImages[randomIndex],
    gallery: galleryImages
  };
}

addProjectImages();
