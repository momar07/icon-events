import { db } from '../db';
import {
  contactInquiries,
  ContactInquiryInsert,
  ContactInquirySelect,
} from '../db/schema';
import { eq, desc, and, like, sql } from 'drizzle-orm';
import { paginationOffset } from '../utils/pagination';

export interface InquiryListOptions {
  status?: 'new' | 'reviewed' | 'contacted';
  search?: string;
  page?: number;
  limit?: number;
}

// ── List with filters + pagination ──
export async function listInquiries(
  opts: InquiryListOptions = {}
): Promise<{ data: ContactInquirySelect[]; total: number }> {
  const { status, search, page = 1, limit = 20 } = opts;

  const conditions = [];
  if (status) conditions.push(eq(contactInquiries.status, status));
  if (search) {
    conditions.push(
      like(contactInquiries.name, `%${search}%`)
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [data, countResult] = await Promise.all([
    db
      .select()
      .from(contactInquiries)
      .where(where)
      .orderBy(desc(contactInquiries.createdAt))
      .limit(limit)
      .offset(paginationOffset(page, limit)),
    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(contactInquiries)
      .where(where),
  ]);

  return { data, total: countResult[0].count };
}

// ── Get by ID ──
export async function getInquiryById(
  id: number
): Promise<ContactInquirySelect | undefined> {
  const rows = await db
    .select()
    .from(contactInquiries)
    .where(eq(contactInquiries.id, id))
    .limit(1);
  return rows[0];
}

// ── Create ──
export async function createInquiry(
  data: Omit<ContactInquiryInsert, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<number> {
  const result = await db.insert(contactInquiries).values(data);
  return result[0].insertId;
}

// ── Update status ──
export async function updateInquiryStatus(
  id: number,
  status: 'new' | 'reviewed' | 'contacted'
): Promise<void> {
  await db
    .update(contactInquiries)
    .set({ status })
    .where(eq(contactInquiries.id, id));
}

// ── Hard delete ──
export async function deleteInquiry(id: number): Promise<void> {
  await db.delete(contactInquiries).where(eq(contactInquiries.id, id));
}

// ── Count by status ──
export async function countInquiriesByStatus(
  status?: 'new' | 'reviewed' | 'contacted'
): Promise<number> {
  const where = status ? eq(contactInquiries.status, status) : undefined;
  const result = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(contactInquiries)
    .where(where);
  return result[0].count;
}

// ── Count new inquiries (for badge) ──
export async function countNewInquiries(): Promise<number> {
  return countInquiriesByStatus('new');
}
