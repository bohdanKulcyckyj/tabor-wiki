import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const DiaryContentSchema = z.object({
  fullName: z.string(),
  nickname: z.string(),
  faction: z.string(),
  arsenal: z.array(z.string()),
  timeSpentInSector: z.string().optional(),
  rank: z.string().optional(),
  profilePicture: z.string(),
  additionalContent: z.array(BlockElementSchema),
});

export const DiaryLeafContent = z.object({
  contentType: z.literal('entry'),
  entry: DiaryContentSchema,
});

export type DiaryLeaf = z.infer<typeof DiaryLeafContent>;

export const DiaryBranchContent = z.object({
  contentType: z.literal('children'),
  children: z.array(z.lazy((): ZodSchema => DiaryEntrySchema)),
});

export type DiaryBranch = z.infer<typeof DiaryBranchContent>;

export const EncryptedDiaryContentSchema = z.object({
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
});

export const DecryptedDiaryContentSchema = z.object({
  isEncrypted: z.literal(false),
  content: z.discriminatedUnion('contentType', [
    DiaryBranchContent,
    DiaryLeafContent,
  ]),
});

export const DiaryEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('diary'),
  container: z.discriminatedUnion('isEncrypted', [
    EncryptedDiaryContentSchema,
    DecryptedDiaryContentSchema,
  ]),
});

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;
export type DiaryContent = z.infer<typeof DiaryContentSchema>;
export type DiaryEntryType = 'diary';

// Check if a DiaryEntry is encrypted
export function isEncryptedDiaryEntry(
  entry: DiaryEntry,
): entry is DiaryEntry & {
  container: z.infer<typeof EncryptedDiaryContentSchema>;
} {
  return entry.container.isEncrypted === true;
}

// Check if a DiaryEntry is decrypted
export function isDecryptedDiaryEntry(
  entry: DiaryEntry,
): entry is DiaryEntry & {
  container: z.infer<typeof DecryptedDiaryContentSchema>;
} {
  return entry.container.isEncrypted === false;
}

// Check if a DiaryEntry is a leaf entry
export function isDiaryLeafEntry(entry: DiaryEntry): entry is DiaryEntry & {
  container: {
    isEncrypted: false;
    content: DiaryLeaf;
  };
} {
  return (
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'entry'
  );
}

// Check if a DiaryEntry is a branch entry
export function isDiaryBranchEntry(entry: DiaryEntry): entry is DiaryEntry & {
  container: {
    isEncrypted: false;
    content: DiaryBranch;
  };
} {
  return (
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'children'
  );
}
