import { useEffect } from 'react';
import { store } from '../state/store';
import localDB from '../db/db';
import { useSelector } from '@legendapp/state/react';
import { Entry, EntryType } from '../types/entry/entry';
import { typeGuards } from '../utils/typeGuards';

export const useEntries = <T extends Entry = Entry>(entryType: EntryType | "all" = "all"): { data: T[], entryType: EntryType | "all" } => {
  const { data, entryType: currentEntryType }  = useSelector(store.entries);
  
  useEffect(() => {
    if(data.length === 0 || currentEntryType !== entryType) {
      localDB.allDocs({ include_docs: true }).then((result) => {
        let allEntries = result.rows.map((row) => row.doc!)
        if(entryType) {
          allEntries = allEntries.filter((entry) => entry.entryType === entryType)
        }
        console.log(allEntries)
        store.entries.set({data: allEntries, entryType: entryType});
      });
    }
  }, []);
  
  return { entryType: currentEntryType, data: data.filter((entry: Entry): entry is T => typeGuards(entryType)(entry))};
};

export default useEntries;
