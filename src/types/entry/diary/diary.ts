import { z } from 'zod';
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

export const EncryptedDiaryEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('diary.encrypted'),
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
});

export const DecryptedDiaryEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('diary'),
  isEncrypted: z.literal(false),
  content: z.union([DiaryContentSchema, EncryptedDiaryEntrySchema, z.lazy((): z.ZodSchema => DecryptedDiaryEntrySchema)]),
});

export const DiaryEntrySchema = z.discriminatedUnion("isEncrypted", [
  DecryptedDiaryEntrySchema,
  EncryptedDiaryEntrySchema,
]);
export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;
export type DiaryContent = z.infer<typeof DiaryContentSchema>;
export type EncryptedDiaryEntry = z.infer<typeof EncryptedDiaryEntrySchema>;
export type DecryptedDiaryEntry = z.infer<typeof DecryptedDiaryEntrySchema>;
export type DiaryEntryType = 'diary';
