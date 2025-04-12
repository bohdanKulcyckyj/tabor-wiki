import { ZodSchema } from 'zod';
import { Entry, EntrySchema } from '../types/entry/entry';
import {
  EncryptedDiaryEntry,
  DecryptedDiaryEntry,
  EncryptedDiaryEntrySchema,
  DecryptedDiaryEntrySchema,
  DiaryContent,
  DiaryContentSchema,
} from '../types/entry/diary';
import {
  EncryptedEncyclopediaEntry,
  DecryptedEncyclopediaEntry,
  EncryptedEncyclopediaSchema,
  DecryptedEncyclopediaEntrySchema,
} from '../types/entry/encyclopedia';
import {
  DecryptedMapEntry,
  DecryptedMapEntrySchema,
  EncryptedMapEntry,
  EncryptedMapEntrySchema,
} from '../types/entry/map';
import {
  DecryptedTaskEntry,
  DecryptedTaskEntrySchema,
  EncryptedTaskEntry,
  EncryptedTaskEntrySchema,
} from '../types/entry/task';

function createTypeGuard<T>(schema: ZodSchema<T>) {
  return (entry: unknown): entry is T => schema.safeParse(entry).success;
}

export const isEncryptedDiaryEntry = createTypeGuard<EncryptedDiaryEntry>(
  EncryptedDiaryEntrySchema,
);
export const isDecryptedDiaryEntry = createTypeGuard<DecryptedDiaryEntry>(
  DecryptedDiaryEntrySchema,
);

export const isEncryptedEncyclopediaEntry =
  createTypeGuard<EncryptedEncyclopediaEntry>(EncryptedEncyclopediaSchema);
export const isDecryptedEncyclopediaEntry =
  createTypeGuard<DecryptedEncyclopediaEntry>(DecryptedEncyclopediaEntrySchema);
export const isEncryptedMapEntry = createTypeGuard<EncryptedMapEntry>(
  EncryptedMapEntrySchema,
);
export const isDecryptedMapEntry = createTypeGuard<DecryptedMapEntry>(
  DecryptedMapEntrySchema,
);
export const isEncryptedTaskEntry = createTypeGuard<EncryptedTaskEntry>(
  EncryptedTaskEntrySchema,
);
export const isDecryptedTaskEntry = createTypeGuard<DecryptedTaskEntry>(
  DecryptedTaskEntrySchema,
);

export const isEntry = createTypeGuard<Entry>(EntrySchema);

export const isLeafEntry = (entry: Entry): boolean => {
  return !EntrySchema.safeParse(entry.content).success;
}
