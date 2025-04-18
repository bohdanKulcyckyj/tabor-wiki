import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const TaskContentSchema = z.array(BlockElementSchema);

export const TaskLeafContent = z.object({
  contentType: z.literal("entry"),
  entry: TaskContentSchema
})

export const TaskBranchContent = z.object({
  contentType: z.literal("children"),
  children: z.array(z.lazy((): ZodSchema => TaskEntrySchema))
})

export const EncryptedTaskContentSchema = z.object({
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
})

export const DecryptedTaskContentSchema = z.object({
  isEncrypted: z.literal(false),
  content: z.discriminatedUnion("contentType", [TaskBranchContent, TaskLeafContent])
})

export const TaskEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('diary'),
  container: z.discriminatedUnion('isEncrypted', [EncryptedTaskContentSchema, DecryptedTaskContentSchema]),
})

export type TaskEntry = z.infer<typeof TaskEntrySchema>;
export type TaskContent = z.infer<typeof TaskContentSchema>;
export type TaskEntryType = 'task';
