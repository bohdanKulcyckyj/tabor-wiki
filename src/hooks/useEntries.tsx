import { useEffect } from 'react';
import { store } from '../state/store';
import localDB from '../db/db';
import { useSelector } from '@legendapp/state/react';
import { Entry, EntryType } from '../types/entry/entry';

export const useEntries = <T extends Entry>(entryType: EntryType): T[] => {
  const entries = useSelector<Entry[]>(store.entries);
  console.log(entries)

  useEffect(() => {
    localDB.allDocs({ include_docs: true }).then((result) => {
      console.log(result.rows)
      store.entries.set(
        result.rows
          .map((row) => row.doc!)
          .filter((entry) => entry.entryType === entryType),
      );
    });
  }, [entryType]);
  return entries as T[];
};

export default useEntries;
