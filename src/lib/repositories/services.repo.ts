import { db } from '../db';
import { services, ServiceInsert, ServiceSelect } from '../db/schema';
import { eq, isNull, asc, sql } from 'drizzle-orm';

// ── Public: list non-deleted, ordered ──
export async function listServices(): Promise<ServiceSelect[]> {
  return db
    .select()
    .from(services)
    .where(isNull(services.deletedAt))
    .orderBy(asc(services.displayOrder));
}

// ── Admin: list all (including soft-deleted) ──
export async function listAllServices(includeDeleted = false): Promise<ServiceSelect[]> {
  const query = db.select().from(services);
  if (!includeDeleted) {
    return query.where(isNull(services.deletedAt)).orderBy(asc(services.displayOrder));
  }
  return query.orderBy(asc(services.displayOrder));
}

// ── Get by ID ──
export async function getServiceById(id: number): Promise<ServiceSelect | undefined> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  return rows[0];
}

// ── Create ──
export async function createService(data: Omit<ServiceInsert, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<number> {
  const result = await db.insert(services).values(data);
  return result[0].insertId;
}

// ── Update ──
export async function updateService(id: number, data: Partial<ServiceInsert>): Promise<void> {
  await db.update(services).set(data).where(eq(services.id, id));
}

// ── Soft delete ──
export async function softDeleteService(id: number): Promise<void> {
  await db.update(services).set({ deletedAt: new Date() }).where(eq(services.id, id));
}

// ── Restore ──
export async function restoreService(id: number): Promise<void> {
  await db.update(services).set({ deletedAt: null }).where(eq(services.id, id));
}

// ── Count (non-deleted) ──
export async function countServices(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(services)
    .where(isNull(services.deletedAt));
  return result[0].count;
}
