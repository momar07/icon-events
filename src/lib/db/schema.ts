import {
  mysqlTable,
  int,
  bigint,
  varchar,
  text,
  longtext,
  boolean,
  timestamp,
  date,
  json,
  mysqlEnum,
  index,
  uniqueIndex,
  check,
} from 'drizzle-orm/mysql-core';
import { customType } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// Custom longblob type
const longblob = customType<{ data: Buffer }>({
  dataType() {
    return 'longblob';
  },
});

// ============================================================================
// SERVICES
// ============================================================================
export const services = mysqlTable(
  'services',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    icon: varchar('icon', { length: 255 }),
    displayOrder: int('displayOrder').default(0).notNull(),
    deletedAt: timestamp('deletedAt', { mode: 'date' }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index('idx_services_displayOrder').on(table.displayOrder),
    index('idx_services_deletedAt').on(table.deletedAt),
    index('idx_services_createdAt').on(table.createdAt),
  ]
);

// ============================================================================
// PORTFOLIO PROJECTS
// ============================================================================
export const portfolioProjects = mysqlTable(
  'portfolioProjects',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    clientName: varchar('clientName', { length: 255 }),
    clientLogo: varchar('clientLogo', { length: 255 }),
    images: json('images').$type<PortfolioImageSchema[]>(),
    year: int('year'),
    budgetMin: int('budgetMin'),
    budgetMax: int('budgetMax'),
    budgetDisplay: varchar('budgetDisplay', { length: 100 }),
    teamSize: int('teamSize'),
    displayOrder: int('displayOrder').default(0).notNull(),
    featured: boolean('featured').default(false).notNull(),
    deletedAt: timestamp('deletedAt', { mode: 'date' }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index('idx_portfolio_category').on(table.category),
    index('idx_portfolio_featured').on(table.featured),
    index('idx_portfolio_displayOrder').on(table.displayOrder),
    index('idx_portfolio_deletedAt').on(table.deletedAt),
    index('idx_portfolio_createdAt').on(table.createdAt),
    index('idx_portfolio_year').on(table.year),
  ]
);

// ============================================================================
// TESTIMONIALS
// ============================================================================
export const testimonials = mysqlTable(
  'testimonials',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    clientName: varchar('clientName', { length: 255 }).notNull(),
    clientTitle: varchar('clientTitle', { length: 255 }),
    clientLogo: varchar('clientLogo', { length: 255 }),
    content: text('content').notNull(),
    rating: int('rating').default(5).notNull(),
    displayOrder: int('displayOrder').default(0).notNull(),
    featured: boolean('featured').default(false).notNull(),
    deletedAt: timestamp('deletedAt', { mode: 'date' }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    check('chk_testimonials_rating', sql`${table.rating} BETWEEN 1 AND 5`),
    index('idx_testimonials_featured').on(table.featured),
    index('idx_testimonials_displayOrder').on(table.displayOrder),
    index('idx_testimonials_deletedAt').on(table.deletedAt),
    index('idx_testimonials_createdAt').on(table.createdAt),
  ]
);

// ============================================================================
// CONTACT INQUIRIES
// ============================================================================
export const contactInquiries = mysqlTable(
  'contactInquiries',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 320 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    eventType: varchar('eventType', { length: 100 }),
    eventDate: date('eventDate', { mode: 'date' }),
    budgetRange: varchar('budgetRange', { length: 100 }),
    message: text('message').notNull(),
    status: mysqlEnum('status', ['new', 'reviewed', 'contacted']).default('new').notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index('idx_inquiries_status').on(table.status),
    index('idx_inquiries_createdAt').on(table.createdAt),
  ]
);

// ============================================================================
// COMPANY INFO
// ============================================================================
export const companyInfo = mysqlTable(
  'companyInfo',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    key: varchar('key', { length: 100 }).notNull(),
    value: longtext('value'),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_companyInfo_key').on(table.key),
  ]
);

// ============================================================================
// IMAGES (stored as LONGBLOB in DB)
// ============================================================================
export const images = mysqlTable(
  'images',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    filename: varchar('filename', { length: 255 }).notNull(),
    mimeType: varchar('mimeType', { length: 100 }).notNull(),
    size: int('size').notNull(),
    data: longblob('data').notNull(),
    alt: varchar('alt', { length: 500 }),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_images_createdAt').on(table.createdAt),
  ]
);

// ============================================================================
// TYPE HELPERS
// ============================================================================
export interface PortfolioImageSchema {
  id?: number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isCover?: boolean;
}

export type ServiceInsert = typeof services.$inferInsert;
export type ServiceSelect = typeof services.$inferSelect;
export type PortfolioProjectInsert = typeof portfolioProjects.$inferInsert;
export type PortfolioProjectSelect = typeof portfolioProjects.$inferSelect;
export type TestimonialInsert = typeof testimonials.$inferInsert;
export type TestimonialSelect = typeof testimonials.$inferSelect;
export type ContactInquiryInsert = typeof contactInquiries.$inferInsert;
export type ContactInquirySelect = typeof contactInquiries.$inferSelect;
export type CompanyInfoInsert = typeof companyInfo.$inferInsert;
export type CompanyInfoSelect = typeof companyInfo.$inferSelect;
export type ImageInsert = typeof images.$inferInsert;
export type ImageSelect = typeof images.$inferSelect;
