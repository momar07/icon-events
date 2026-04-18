import { PortfolioImageSchema } from '@/lib/db/schema';

/**
 * Safely parse images from DB.
 * Handles double-encoded JSON strings from Drizzle + mysql2.
 */
export function parseImages(images: unknown): PortfolioImageSchema[] {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  if (typeof images === 'string') {
    try {
      let parsed = JSON.parse(images);
      // Handle double-encoded: parse again if still a string
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}
