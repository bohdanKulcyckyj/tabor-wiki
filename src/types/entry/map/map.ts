import { z } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const MapContentSchema = z.array(BlockElementSchema);

export const EncryptedMapEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('map.encrypted'),
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
});

export const DecryptedMapEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('map'),
  isEncrypted: z.literal(false),
  content: z.union([MapContentSchema, EncryptedMapEntrySchema, z.lazy((): z.ZodSchema => DecryptedMapEntrySchema)]),
});

export const MapEntrySchema = z.discriminatedUnion('isEncrypted', [
  DecryptedMapEntrySchema,
  EncryptedMapEntrySchema,
]);
export type MapEntry = z.infer<typeof MapEntrySchema>;
export type EncryptedMapEntry = z.infer<typeof EncryptedMapEntrySchema>;
export type DecryptedMapEntry = z.infer<typeof DecryptedMapEntrySchema>;
export type MapContent = z.infer<typeof MapContentSchema>;
export type MapEntryType = 'map';
