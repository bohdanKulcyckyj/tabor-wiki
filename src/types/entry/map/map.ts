import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const MapContentSchema = z.array(BlockElementSchema);

export const MapLeafContent = z.object({
  contentType: z.literal("entry"),
  entry: MapContentSchema
})

export const MapBranchContent = z.object({
  contentType: z.literal("children"),
  children: z.array(z.lazy((): ZodSchema => MapEntrySchema))
})

export const EncryptedMapContentSchema = z.object({
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
})

export const DecryptedMapContentSchema = z.object({
  isEncrypted: z.literal(false),
  content: z.discriminatedUnion("contentType", [MapBranchContent, MapLeafContent])
})

export const MapEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('diary'),
  container: z.discriminatedUnion('isEncrypted', [EncryptedMapContentSchema, DecryptedMapContentSchema]),
})

export type MapEntry = z.infer<typeof MapEntrySchema>;
export type MapContent = z.infer<typeof MapContentSchema>;
export type MapEntryType = 'map';
