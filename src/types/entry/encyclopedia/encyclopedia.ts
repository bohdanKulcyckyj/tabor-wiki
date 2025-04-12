import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const EncyclopediaContentSchema = z.array(BlockElementSchema);

export const EncryptedEncyclopediaSchema = BaseEntrySchema.extend({
  entryType: z.literal('encyclopedia.encrypted'),
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
});

export const DecryptedEncyclopediaEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('encyclopedia'),
  isEncrypted: z.literal(false),
  content: z.union([EncyclopediaContentSchema, EncryptedEncyclopediaSchema, z.lazy((): ZodSchema => DecryptedEncyclopediaEntrySchema)]),
});

export const EncyclopediaEntrySchema = z.discriminatedUnion('isEncrypted', [
  DecryptedEncyclopediaEntrySchema,
  EncryptedEncyclopediaSchema,
]);

export type EncyclopediaEntry = z.infer<typeof EncyclopediaEntrySchema>;
export type EncryptedEncyclopediaEntry = z.infer<
  typeof EncryptedEncyclopediaSchema
>;
export type DecryptedEncyclopediaEntry = z.infer<
  typeof DecryptedEncyclopediaEntrySchema
>;
export type EncyclopediaContent = z.infer<typeof EncyclopediaContentSchema>;
export type EncyclopediaEntryType = 'encyclopedia';
