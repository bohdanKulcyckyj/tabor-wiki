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

export type EncyclopediaLeaf = z.infer<typeof EncyclopediaLeafContent>

export const EncyclopediaBranchContent = z.object({
  contentType: z.literal("children"),
  children: z.array(z.lazy((): ZodSchema => EncyclopediaEntrySchema))
})

export type EncyclopediaBranch = z.infer<typeof EncyclopediaBranchContent>

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

// Check if an entry is an EncyclopediaEntry
export function isEncyclopediaEntry(entry: unknown): entry is EncyclopediaEntry {
  const parsedResult = EncyclopediaEntrySchema.safeParse(entry);
  return parsedResult.success;
}

// Check if an EncyclopediaEntry is encrypted
export function isEncryptedEncyclopediaEntry(
  entry: unknown,
): entry is EncyclopediaEntry & {
  container: z.infer<typeof EncryptedEncyclopediaContentSchema>;
} {
  return isEncyclopediaEntry(entry) && entry.container.isEncrypted === true;
}

// Check if an EncyclopediaEntry is decrypted
export function isDecryptedEncyclopediaEntry(
  entry: unknown,
): entry is EncyclopediaEntry & {
  container: z.infer<typeof DecryptedEncyclopediaContentSchema>;
} {
  return isEncyclopediaEntry(entry) && entry.container.isEncrypted === false;
}

// Check if an EncyclopediaEntry is a leaf entry
export function isEncyclopediaLeafEntry(entry: unknown): entry is EncyclopediaEntry & {
  container: {
    isEncrypted: false;
    content: EncyclopediaLeaf;
  };
} {
  return (
    isEncyclopediaEntry(entry) &&
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'entry'
  );
}

// Check if an EncyclopediaEntry is a branch entry
export function isEncyclopediaBranchEntry(entry: unknown): entry is EncyclopediaEntry & {
  container: {
    isEncrypted: false;
    content: EncyclopediaBranch;
  };
} {
  return (
    isEncyclopediaEntry(entry) &&
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'children'
  );
}