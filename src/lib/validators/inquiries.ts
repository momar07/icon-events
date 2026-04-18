import { z } from 'zod';

export const createInquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be 255 characters or less'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(320),
  phone: z
    .string()
    .max(20)
    .regex(/^[+]?[\d\s()-]*$/, 'Invalid phone number format')
    .nullable()
    .optional(),
  eventType: z
    .string()
    .max(100)
    .nullable()
    .optional(),
  eventDate: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true;
        const d = new Date(val);
        return !isNaN(d.getTime()) && d > new Date();
      },
      { message: 'Event date must be a valid future date' }
    ),
  budgetRange: z
    .string()
    .max(100)
    .nullable()
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be 5000 characters or less'),
  // Honeypot field — must be empty
  website: z
    .string()
    .max(0, 'Invalid submission')
    .optional()
    .default(''),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'contacted']),
});

export const inquiryFiltersSchema = z.object({
  status: z.enum(['new', 'reviewed', 'contacted']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
export type InquiryFilters = z.infer<typeof inquiryFiltersSchema>;
