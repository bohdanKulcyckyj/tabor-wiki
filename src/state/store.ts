import { observable } from '@legendapp/state';
import { Entry } from '../types/entry/entry';

export const store = observable<{
  entries: Entry[];
  currentEntry: Entry | null;
}>({
  entries: [],
  currentEntry: null,
});
