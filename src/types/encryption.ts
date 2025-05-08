import { z } from 'zod';
import { EntrySchema } from './entry/entry';

const encryptionSuccessSchema = z.object({
  success: z.literal(true),
  data: EntrySchema,
})

const encryptionFailSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export const encryptionResultSchema = z.discriminatedUnion('success', [
  encryptionSuccessSchema,
  encryptionFailSchema,
]);

export type EncryptionResult = z.infer<typeof encryptionResultSchema>;
