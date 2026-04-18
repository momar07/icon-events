export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Icon Events';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

// File upload constraints
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// Company info seed keys
export const COMPANY_INFO_KEYS = [
  'brand_tagline',
  'company_story',
  'vision',
  'mission',
  'statistics',
  'team_members',
  'timeline',
] as const;

export type CompanyInfoKey = (typeof COMPANY_INFO_KEYS)[number];

// Inquiry statuses
export const INQUIRY_STATUSES = ['new', 'reviewed', 'contacted'] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

// Portfolio categories
export const PORTFOLIO_CATEGORIES = [
  'Exhibitions',
  'Corporate Events',
  'Trade Shows',
  'Product Launches',
  'Conferences',
  'Brand Activations',
  'Weddings',
  'Other',
] as const;

// Budget ranges for contact form
export const BUDGET_RANGES = [
  'under10k',
  '10kTo25k',
  '25kTo50k',
  '50kTo100k',
  'above100k',
] as const;
