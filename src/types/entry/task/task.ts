import { z, ZodSchema } from 'zod';
import { BaseEntrySchema } from '../base';
import { BlockElementSchema } from '../content';

export const TaskContentSchema = z.array(BlockElementSchema);

export const TaskLeafContent = z.object({
  contentType: z.literal("entry"),
  entry: TaskContentSchema
})

export const TaskBranchContent = z.object({
  contentType: z.literal("children"),
  children: z.array(z.lazy((): ZodSchema => TaskEntrySchema))
});

export type TaskBranch = z.infer<typeof TaskBranchContent>;

export const EncryptedTaskContentSchema = z.object({
  isEncrypted: z.literal(true),
  encryptedKey: z.string(),
  content: z.string(),
})

export const DecryptedTaskContentSchema = z.object({
  isEncrypted: z.literal(false),
  content: z.discriminatedUnion("contentType", [TaskBranchContent, TaskLeafContent])
})

export const TaskEntrySchema = BaseEntrySchema.extend({
  entryType: z.literal('task'),
  container: z.discriminatedUnion('isEncrypted', [EncryptedTaskContentSchema, DecryptedTaskContentSchema]),
})

export type TaskEntry = z.infer<typeof TaskEntrySchema>;
export type TaskContent = z.infer<typeof TaskContentSchema>;
export type TaskEntryType = 'task';
export type TaskLeaf = z.infer<typeof TaskLeafContent>;

// Check if an entry is a TaskEntry
export function isTaskEntry(entry: unknown): entry is TaskEntry {
  const parsedResult = TaskEntrySchema.safeParse(entry);
  return parsedResult.success;
}

// Check if a TaskEntry is encrypted
export function isEncryptedTaskEntry(
  entry: unknown,
): entry is TaskEntry & {
  container: z.infer<typeof EncryptedTaskContentSchema>;
} {
  return isTaskEntry(entry) && entry.container.isEncrypted === true;
}

// Check if a TaskEntry is decrypted
export function isDecryptedTaskEntry(
  entry: unknown,
): entry is TaskEntry & {
  container: z.infer<typeof DecryptedTaskContentSchema>;
} {
  return isTaskEntry(entry) && entry.container.isEncrypted === false;
}

// Check if a TaskEntry is a leaf entry
export function isTaskLeafEntry(entry: unknown): entry is TaskEntry & {
  container: {
    isEncrypted: false;
    content: TaskLeaf;
  };
} {
  return (
    isTaskEntry(entry) &&
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'entry'
  );
}

// Check if a TaskEntry is a branch entry
export function isTaskBranchEntry(entry: unknown): entry is TaskEntry & {
  container: {
    isEncrypted: false;
    content: TaskBranch;
  };
} {
  return (
    isTaskEntry(entry) &&
    entry.container.isEncrypted === false &&
    entry.container.content.contentType === 'children'
  );
}