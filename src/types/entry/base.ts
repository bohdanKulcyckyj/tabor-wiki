import { z } from 'zod';

export const BaseEntrySchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  archivedAt: z.string().datetime().optional(),
});
