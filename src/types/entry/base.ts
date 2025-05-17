import { z } from 'zod';

export const BaseEntrySchema = z.object({
  id: z.string(),
  _id: z.string().optional(),
  _rev: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  archivedAt: z.string().datetime().optional(),
});
