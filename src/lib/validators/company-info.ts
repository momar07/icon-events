import { z } from 'zod';

// Team member sub-schema
export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
  photoUrl: z.string().nullable().optional(),
  displayOrder: z.number().int().min(0),
});

export const teamMembersSchema = z
  .array(teamMemberSchema)
  .max(12, 'Maximum 12 team members allowed');

// Timeline entry sub-schema
export const timelineEntrySchema = z.object({
  year: z.number().int().min(1900).max(2100),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export const timelineSchema = z.array(timelineEntrySchema);

// Statistics sub-schema
export const statisticsSchema = z.object({
  eventsCompleted: z.number().int().min(0).optional(),
  happyClients: z.number().int().min(0).optional(),
  yearsExperience: z.number().int().min(0).optional(),
  countriesServed: z.number().int().min(0).optional(),
}).passthrough();

// Generic company info update
export const updateCompanyInfoSchema = z.object({
  value: z.string().max(65535, 'Value too long'),
});

// Bilingual text (for story, vision, mission)
export const bilingualTextSchema = z.object({
  en: z.string().min(1, 'English text is required'),
  ar: z.string().min(1, 'Arabic text is required'),
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;
export type Statistics = z.infer<typeof statisticsSchema>;
export type UpdateCompanyInfoInput = z.infer<typeof updateCompanyInfoSchema>;
export type BilingualText = z.infer<typeof bilingualTextSchema>;
