import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const MapContentSchema = z.array(BlockElementSchema);

export const MapLeafContent = z.object({
  contentType: z.literal("entry"),
  entry: MapContentSchema
})

export type MapLeaf = z.infer<typeof MapLeafContent>

export const MapBranchContent = z.object({
  contentType: z.literal("children"),
  children: z.array(z.lazy((): ZodSchema => MapEntrySchema))
})

export type MapBranch = z.infer<typeof MapBranchContent>

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
  entryType: z.literal('map'),
  container: z.discriminatedUnion('isEncrypted', [EncryptedMapContentSchema, DecryptedMapContentSchema]),
})

export type MapEntry = z.infer<typeof MapEntrySchema>;
export type MapContent = z.infer<typeof MapContentSchema>;
export type MapEntryType = 'map';

export function isMapEntry(entry: unknown): entry is MapEntry {
  const parsedResult = MapEntrySchema.safeParse(entry);
  return parsedResult.success;
}

// Check if a MapEntry is encrypted
export function isEncryptedMapEntry(
  entry: unknown,
): entry is MapEntry & {
  container: z.infer<typeof EncryptedMapContentSchema>;
} {
  return isMapEntry(entry) && entry.container.isEncrypted === true;
}

// Check if a MapEntry is decrypted
export function isDecryptedMapEntry(
  entry: unknown,
): entry is MapEntry & {
  container: z.infer<typeof DecryptedMapContentSchema>;
} {
  return isMapEntry(entry) && entry.container.isEncrypted === false;
}

// Check if a MapEntry is a leaf entry
export function isMapLeafEntry(entry: unknown): entry is MapEntry & {
  container: {
    isEncrypted: false;
    content: MapLeaf;
  };
} {
  return (
    isMapEntry(entry) &&
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'entry'
  );
}

// Check if a MapEntry is a branch entry
export function isMapBranchEntry(entry: unknown): entry is MapEntry & {
  container: {
    isEncrypted: false;
    content: MapBranch;
  };
} {
  return (
    isMapEntry(entry) &&
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'children'
  );
}