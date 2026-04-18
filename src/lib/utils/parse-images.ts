import { PortfolioImageSchema } from '@/lib/db/schema';

/**
 * Safely parse images from DB.
 * MySQL json columns via Drizzle/mysql2 may return a string instead of an array.
 */
export function parseImages(images: unknown): PortfolioImageSchema[] {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}
