import { z } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const TaskContentSchema = z.array(BlockElementSchema);

export const EncryptedTaskEntrySchema = BaseEntrySchema.extend({
  start: z.date().optional(),
  end: z.date().optional(),
  entryType: z.literal('task.encrypted'),
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
});

export const DecryptedTaskEntrySchema = BaseEntrySchema.extend({
  start: z.date().optional(),
  end: z.date().optional(),
  entryType: z.literal('task'),
  isEncrypted: z.literal(false),
  content: z.union([TaskContentSchema, EncryptedTaskEntrySchema, z.lazy((): z.ZodSchema => DecryptedTaskEntrySchema)]),
});

export const TaskEntrySchema = z.discriminatedUnion('isEncrypted', [
  DecryptedTaskEntrySchema,
  EncryptedTaskEntrySchema,
]);
export type TaskEntry = z.infer<typeof TaskEntrySchema>;
export type EncryptedTaskEntry = z.infer<typeof EncryptedTaskEntrySchema>;
export type DecryptedTaskEntry = z.infer<typeof DecryptedTaskEntrySchema>;
export type TaskContent = z.infer<typeof TaskContentSchema>;
export type TaskEntryType = 'task';
