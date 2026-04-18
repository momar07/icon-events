// ============================================================================
// Icon Events — Shared Type Definitions
// ============================================================================

// Image in portfolio JSON
export interface PortfolioImage {
  id?: number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isCover?: boolean;
}

// Team member in companyInfo JSON
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  displayOrder: number;
}

// Timeline entry in companyInfo JSON
export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
}

// Statistics in companyInfo JSON
export interface Statistics {
  eventsCompleted?: number;
  happyClients?: number;
  yearsExperience?: number;
  countriesServed?: number;
  [key: string]: number | undefined;
}

// Service type
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  displayOrder: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Portfolio project type
export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  clientName: string | null;
  clientLogo: string | null;
  images: PortfolioImage[] | null;
  year: number | null;
  budgetMin: number | null;
  budgetMax: number | null;
  budgetDisplay: string | null;
  teamSize: number | null;
  displayOrder: number;
  featured: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Testimonial type
export interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string | null;
  clientLogo: string | null;
  content: string;
  rating: number;
  displayOrder: number;
  featured: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Contact inquiry type
export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  eventType: string | null;
  eventDate: Date | null;
  budgetRange: string | null;
  message: string;
  status: 'new' | 'reviewed' | 'contacted';
  createdAt: Date;
  updatedAt: Date;
}

// Company info type
export interface CompanyInfo {
  id: number;
  key: string;
  value: string | null;
  updatedAt: Date;
}

// API pagination meta
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Generic API response types
export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
