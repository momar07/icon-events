import { db } from '../db';
import { images, ImageInsert, ImageSelect } from '../db/schema';
import { eq, desc, sql } from 'drizzle-orm';

// ── Upload (store in DB) ──
export async function storeImage(
  data: Omit<ImageInsert, 'id' | 'createdAt'>
): Promise<number> {
  const result = await db.insert(images).values(data);
  return result[0].insertId;
}

// ── Get by ID (without data, for metadata) ──
export async function getImageMeta(id: number): Promise<Omit<ImageSelect, 'data'> | undefined> {
  const rows = await db
    .select({
      id: images.id,
      filename: images.filename,
      mimeType: images.mimeType,
      size: images.size,
      alt: images.alt,
      createdAt: images.createdAt,
    })
    .from(images)
    .where(eq(images.id, id))
    .limit(1);
  return rows[0];
}

// ── Get by ID (full, with blob data) ──
export async function getImageFull(id: number): Promise<ImageSelect | undefined> {
  const rows = await db
    .select()
    .from(images)
    .where(eq(images.id, id))
    .limit(1);
  return rows[0];
}

// ── Delete ──
export async function deleteImage(id: number): Promise<void> {
  await db.delete(images).where(eq(images.id, id));
}

// ── List recent (metadata only) ──
export async function listRecentImages(limit = 20): Promise<Omit<ImageSelect, 'data'>[]> {
  return db
    .select({
      id: images.id,
      filename: images.filename,
      mimeType: images.mimeType,
      size: images.size,
      alt: images.alt,
      createdAt: images.createdAt,
    })
    .from(images)
    .orderBy(desc(images.createdAt))
    .limit(limit);
}

// ── Count ──
export async function countImages(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(images);
  return result[0].count;
}
