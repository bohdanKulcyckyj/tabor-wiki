import { observable } from '@legendapp/state';
import { Entry, EntryType } from '../types/entry/entry';

export const store = observable<{
  entries: { data: Entry[]; entryType: EntryType | 'all' };
  currentEntry: Entry | undefined;
  keys: string[];
  ui: {
    aside: {
      isExpanded: boolean;
      entries: Array<{ slug: string; id: string; title: string, type: EntryType }>;
    };
  };
}>({
  entries: { data: [], entryType: 'all' },
  currentEntry: undefined,
  keys: [],
  ui: {
    aside: { isExpanded: true, entries: [] },
  },
});
