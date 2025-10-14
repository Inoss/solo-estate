/**
 * Get Korter Projects
 * Loads real projects from korter.ge data
 */

import type { Locale } from '@/i18n';

export interface KorterProject {
  _id: string;
  _type: 'project';
  title: Record<Locale, string>;
  slug: { current: string };
  developer: { _type: 'reference'; _ref: string } | null;
  status: 'offPlan' | 'underConstruction' | 'ready';
  propertyType: string;
  location: {
    city: string;
    area: string;
    address: string;
    lat: number | null;
    lng: number | null;
  };
  pricing: {
    price: number;
    pricePerSqm: number | null;
    currency: string;
    priceRange?: {
      min: number;
      max: number;
    };
  };
  investment: {
    yield: number | null;
    capRate: number | null;
    irr: number | null;
  };
  delivery: {
    quarter: string | null;
    year: number;
  } | null;
  area: number | null;
  coverImageUrl: string | null;
  galleryUrls: string[];
  description: Record<Locale, string>;
  highlights: string[];
  featured: boolean;
  publishedAt: string;
  sourceUrl: string;
  korterBuildingId: string;
}

let cachedProjects: KorterProject[] | null = null;

export async function getKorterProjects(): Promise<KorterProject[]> {
  // Return cached if available
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    // Load from public data folder
    const fs = await import('fs');
    const path = await import('path');

    const dataPath = path.join(process.cwd(), 'public', 'data', 'projects.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const projects = JSON.parse(data) as KorterProject[];

    cachedProjects = projects;
    return projects;
  } catch (error) {
    console.error('Error loading Korter projects:', error);
    return [];
  }
}

export async function getFeaturedKorterProjects(limit = 6): Promise<KorterProject[]> {
  const projects = await getKorterProjects();

  // Get projects with images and pricing
  const goodProjects = projects.filter(
    p => p.coverImageUrl && p.pricing.price > 0
  );

  // Return first N projects
  return goodProjects.slice(0, limit);
}

export async function getKorterProjectBySlug(slug: string): Promise<KorterProject | null> {
  const projects = await getKorterProjects();
  return projects.find(p => p.slug.current === slug) || null;
}

export async function getKorterStats() {
  const projects = await getKorterProjects();

  const withPricing = projects.filter(p => p.pricing.price > 0);
  const avgPrice = withPricing.length > 0
    ? Math.round(withPricing.reduce((sum, p) => sum + p.pricing.price, 0) / withPricing.length)
    : 0;

  return {
    totalProjects: projects.length,
    avgPrice,
    cities: [...new Set(projects.map(p => p.location.city))].length,
    withImages: projects.filter(p => p.coverImageUrl).length,
  };
}
