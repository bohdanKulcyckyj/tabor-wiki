import { z } from 'zod';

export const DairyEntrySchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  isProtected: z.boolean(), // isProtected indicates if the diary entry is password protected
  entryType: z.literal('diary'),
});

export type DiaryEntry = z.infer<typeof DairyEntrySchema>;

export const TaskEntrySchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  dueDate: z.string(),
  isProtected: z.boolean(), // isProtected indicates if the task entry is password protected
  entryType: z.literal('task'),
});

export type TaskEntry = z.infer<typeof TaskEntrySchema>;

export const EntrySchema = z.discriminatedUnion("entryType", [DairyEntrySchema, TaskEntrySchema]);

export type Entry = z.infer<typeof EntrySchema>;
