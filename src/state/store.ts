import { observable } from '@legendapp/state';
import { Entry, EntryType } from '../types/entry/entry';

export const store = observable<{
  entries: { data: Entry[]; entryType: EntryType | 'all' };
  currentEntry: Entry | undefined;
  keys: string[];
}>({
  entries: { data: [], entryType: 'all' },
  currentEntry: undefined,
  keys: []
});
