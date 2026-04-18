import { z } from 'zod';

export const createTestimonialSchema = z.object({
  clientName: z
    .string()
    .min(1, 'Client name is required')
    .max(255, 'Client name must be 255 characters or less'),
  clientTitle: z
    .string()
    .max(255)
    .nullable()
    .optional(),
  clientLogo: z
    .string()
    .max(255)
    .nullable()
    .optional(),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(5000, 'Content must be 5000 characters or less'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .default(5),
  displayOrder: z
    .number()
    .int()
    .min(0)
    .default(0),
  featured: z
    .boolean()
    .default(false),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
