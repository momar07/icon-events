import { db } from '../db';
import { companyInfo, CompanyInfoSelect } from '../db/schema';
import { eq } from 'drizzle-orm';

// ── Get by key ──
export async function getCompanyInfoByKey(
  key: string
): Promise<CompanyInfoSelect | undefined> {
  const rows = await db
    .select()
    .from(companyInfo)
    .where(eq(companyInfo.key, key))
    .limit(1);
  return rows[0];
}

// ── Get value by key (parsed JSON if possible) ──
export async function getCompanyInfoValue<T = string>(
  key: string
): Promise<T | null> {
  const row = await getCompanyInfoByKey(key);
  if (!row || !row.value) return null;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return row.value as T;
  }
}

// ── List all ──
export async function listCompanyInfo(): Promise<CompanyInfoSelect[]> {
  return db.select().from(companyInfo);
}

// ── Upsert (set value by key) ──
export async function setCompanyInfo(key: string, value: string): Promise<void> {
  await db
    .insert(companyInfo)
    .values({ key, value })
    .onDuplicateKeyUpdate({ set: { value } });
}

// ── Delete by key ──
export async function deleteCompanyInfo(key: string): Promise<void> {
  await db.delete(companyInfo).where(eq(companyInfo.key, key));
}
