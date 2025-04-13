import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const EncyclopediaContentSchema = z.array(BlockElementSchema);

export const EncryptedEncyclopediaContentSchema = z.object({
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
});

export const EncyclopediaLeafContent = z.object({
  contentType: z.literal("entry"),
  entry: EncyclopediaContentSchema
})

export const EncyclopediaBranchContent = z.object({
  contentType: z.literal("children"),
  children: z.array(z.lazy((): ZodSchema => EncyclopediaEntrySchema))
})

export const DecryptedEncyclopediaContentSchema = z.object({
  isEncrypted: z.literal(false),
  content: z.discriminatedUnion("contentType", [EncyclopediaBranchContent, EncyclopediaLeafContent])
});

export const EncyclopediaEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('encyclopedia'),
  container: z.discriminatedUnion('isEncrypted', [
    EncryptedEncyclopediaContentSchema,
    DecryptedEncyclopediaContentSchema,
  ]),
});

export type EncyclopediaEntry = z.infer<typeof EncyclopediaEntrySchema>;
export type EncyclopediaContent = z.infer<typeof EncyclopediaContentSchema>;
export type EncyclopediaEntryType = 'encyclopedia';
