import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../utils/constants';

export const uploadImageSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  mimeType: z
    .string()
    .refine(
      (type) => (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(type),
      { message: `Accepted types: ${ACCEPTED_IMAGE_TYPES.join(', ')}` }
    ),
  size: z
    .number()
    .max(MAX_FILE_SIZE, `File size must be under ${MAX_FILE_SIZE / 1024 / 1024}MB`),
  alt: z.string().optional().default(''),
});

export type UploadImageInput = z.infer<typeof uploadImageSchema>;
