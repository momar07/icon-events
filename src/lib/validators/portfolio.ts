import { z } from 'zod';

// Portfolio image sub-schema
export const portfolioImageSchema = z.object({
  id: z.number().int().optional(),
  url: z.string().min(1, 'Image URL is required'),
  alt: z.string().min(1, 'Alt text is required'),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  isCover: z.boolean().optional().default(false),
});

export const portfolioImagesSchema = z
  .array(portfolioImageSchema)
  .refine(
    (images) => {
      const coverCount = images.filter((img) => img.isCover).length;
      return coverCount <= 1;
    },
    { message: 'Only one image can be set as cover' }
  );

// Base object (without refine) — so .partial() works
const portfolioBaseSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be 255 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(10000, 'Description must be 10000 characters or less'),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(100),
  clientName: z
    .string()
    .max(255)
    .nullable()
    .optional(),
  clientLogo: z
    .string()
    .max(255)
    .nullable()
    .optional(),
  images: portfolioImagesSchema
    .optional()
    .default([]),
  year: z
    .number()
    .int()
    .min(1900)
    .max(2100)
    .nullable()
    .optional(),
  budgetMin: z
    .number()
    .int()
    .min(0)
    .nullable()
    .optional(),
  budgetMax: z
    .number()
    .int()
    .min(0)
    .nullable()
    .optional(),
  budgetDisplay: z
    .string()
    .max(100)
    .nullable()
    .optional(),
  teamSize: z
    .number()
    .int()
    .min(1)
    .nullable()
    .optional(),
  displayOrder: z
    .number()
    .int()
    .min(0)
    .default(0),
  featured: z
    .boolean()
    .default(false),
});

// Create schema = base + budget refinement
export const createPortfolioSchema = portfolioBaseSchema.refine(
  (data) => {
    if (data.budgetMin != null && data.budgetMax != null) {
      return data.budgetMin <= data.budgetMax;
    }
    return true;
  },
  {
    message: 'budgetMin must be less than or equal to budgetMax',
    path: ['budgetMax'],
  }
);

// Update schema = partial of base (no refine needed for partial updates)
export const updatePortfolioSchema = portfolioBaseSchema.partial();

// Filters for portfolio listing
export const portfolioFiltersSchema = z.object({
  category: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  year: z.coerce.number().int().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  search: z.string().optional(),
});

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
export type PortfolioFilters = z.infer<typeof portfolioFiltersSchema>;
export type PortfolioImage = z.infer<typeof portfolioImageSchema>;
