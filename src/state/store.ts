import { observable } from '@legendapp/state';
import { Entry } from '../types/entry';

export const store = observable<{
  entries: Entry[];
  currentEntry: Entry | null;
}>({
  entries: [],
  currentEntry: null,
});
