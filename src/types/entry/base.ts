import { z } from 'zod';

export const BaseEntrySchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  archivedAt: z.date().optional(),
});
