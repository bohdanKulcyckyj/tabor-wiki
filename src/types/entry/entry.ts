import { z } from 'zod';
import { DiaryEntrySchema } from './diary';
import { EncyclopediaEntrySchema } from './encyclopedia';
import { MapEntrySchema } from './map';
import { TaskEntrySchema } from './task';

export const EntrySchema = z.discriminatedUnion('entryType', [
  ...DiaryEntrySchema.options,
  ...EncyclopediaEntrySchema.options,
  ...MapEntrySchema.options,
  ...TaskEntrySchema.options,
]);
export type Entry = z.infer<typeof EntrySchema>;
export type EntryType = Entry['entryType'];
