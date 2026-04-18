import { db } from '../db';
import { testimonials, TestimonialInsert, TestimonialSelect } from '../db/schema';
import { eq, isNull, asc, sql } from 'drizzle-orm';

// ── Public: list non-deleted ──
export async function listTestimonials(): Promise<TestimonialSelect[]> {
  return db
    .select()
    .from(testimonials)
    .where(isNull(testimonials.deletedAt))
    .orderBy(asc(testimonials.displayOrder));
}

// ── Admin: list all ──
export async function listAllTestimonials(includeDeleted = false): Promise<TestimonialSelect[]> {
  if (includeDeleted) {
    return db.select().from(testimonials).orderBy(asc(testimonials.displayOrder));
  }
  return db
    .select()
    .from(testimonials)
    .where(isNull(testimonials.deletedAt))
    .orderBy(asc(testimonials.displayOrder));
}

// ── Get by ID ──
export async function getTestimonialById(id: number): Promise<TestimonialSelect | undefined> {
  const rows = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id))
    .limit(1);
  return rows[0];
}

// ── Create ──
export async function createTestimonial(
  data: Omit<TestimonialInsert, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
): Promise<number> {
  const result = await db.insert(testimonials).values(data);
  return result[0].insertId;
}

// ── Update ──
export async function updateTestimonial(
  id: number,
  data: Partial<TestimonialInsert>
): Promise<void> {
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

// ── Soft delete ──
export async function softDeleteTestimonial(id: number): Promise<void> {
  await db
    .update(testimonials)
    .set({ deletedAt: new Date() })
    .where(eq(testimonials.id, id));
}

// ── Restore ──
export async function restoreTestimonial(id: number): Promise<void> {
  await db
    .update(testimonials)
    .set({ deletedAt: null })
    .where(eq(testimonials.id, id));
}

// ── Count (non-deleted) ──
export async function countTestimonials(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(testimonials)
    .where(isNull(testimonials.deletedAt));
  return result[0].count;
}
