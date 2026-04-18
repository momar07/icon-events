import { db } from '../db';
import {
  portfolioProjects,
  PortfolioProjectInsert,
  PortfolioProjectSelect,
} from '../db/schema';
import { eq, isNull, asc, desc, and, like, sql } from 'drizzle-orm';
import { paginationOffset } from '../utils/pagination';

export interface PortfolioListOptions {
  category?: string;
  featured?: boolean;
  year?: number;
  search?: string;
  page?: number;
  limit?: number;
  includeDeleted?: boolean;
}

// ── Public: list with filters + pagination ──
export async function listPortfolioProjects(
  opts: PortfolioListOptions = {}
): Promise<{ data: PortfolioProjectSelect[]; total: number }> {
  const {
    category,
    featured,
    year,
    search,
    page = 1,
    limit = 12,
    includeDeleted = false,
  } = opts;

  const conditions = [];
  if (!includeDeleted) conditions.push(isNull(portfolioProjects.deletedAt));
  if (category) conditions.push(eq(portfolioProjects.category, category));
  if (featured !== undefined) conditions.push(eq(portfolioProjects.featured, featured));
  if (year) conditions.push(eq(portfolioProjects.year, year));
  if (search) conditions.push(like(portfolioProjects.title, `%${search}%`));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [data, countResult] = await Promise.all([
    db
      .select()
      .from(portfolioProjects)
      .where(where)
      .orderBy(desc(portfolioProjects.featured), asc(portfolioProjects.displayOrder))
      .limit(limit)
      .offset(paginationOffset(page, limit)),
    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(portfolioProjects)
      .where(where),
  ]);

  return { data, total: countResult[0].count };
}

// ── Get by ID ──
export async function getPortfolioProjectById(
  id: number
): Promise<PortfolioProjectSelect | undefined> {
  const rows = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.id, id))
    .limit(1);
  return rows[0];
}

// ── Create ──
export async function createPortfolioProject(
  data: Omit<PortfolioProjectInsert, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
): Promise<number> {
  const result = await db.insert(portfolioProjects).values(data);
  return result[0].insertId;
}

// ── Update ──
export async function updatePortfolioProject(
  id: number,
  data: Partial<PortfolioProjectInsert>
): Promise<void> {
  await db.update(portfolioProjects).set(data).where(eq(portfolioProjects.id, id));
}

// ── Soft delete ──
export async function softDeletePortfolioProject(id: number): Promise<void> {
  await db
    .update(portfolioProjects)
    .set({ deletedAt: new Date() })
    .where(eq(portfolioProjects.id, id));
}

// ── Restore ──
export async function restorePortfolioProject(id: number): Promise<void> {
  await db
    .update(portfolioProjects)
    .set({ deletedAt: null })
    .where(eq(portfolioProjects.id, id));
}

// ── Count (non-deleted) ──
export async function countPortfolioProjects(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(portfolioProjects)
    .where(isNull(portfolioProjects.deletedAt));
  return result[0].count;
}

// ── Get distinct categories ──
export async function getPortfolioCategories(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ category: portfolioProjects.category })
    .from(portfolioProjects)
    .where(isNull(portfolioProjects.deletedAt));
  return rows.map((r) => r.category);
}
