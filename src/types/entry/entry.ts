import { z } from 'zod';
import { DiaryEntrySchema } from './diary';
import { EncyclopediaEntrySchema } from './encyclopedia';
import { MapEntrySchema } from './map';
import { TaskEntrySchema } from './task';

export const EntrySchema = z.discriminatedUnion('entryType', [
  DiaryEntrySchema,
  EncyclopediaEntrySchema,
  MapEntrySchema,
  TaskEntrySchema,
]);
export type Entry = z.infer<typeof EntrySchema>;
export type EntryType = Entry['entryType'];

export function isEntry(data: unknown): data is Entry {
  const parsedRes = EntrySchema.safeParse(data)
  return parsedRes.success
}