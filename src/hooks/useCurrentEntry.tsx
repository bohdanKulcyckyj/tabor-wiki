import { useEffect, useState } from 'react';
import { Entry, EntryType } from '../types/entry/entry';
import { use$ } from '@legendapp/state/react';
import { store } from '../state/store';
import localDB from '../db/db';

const findCurrentEntryFactory = <T extends Entry = Entry>( entries: T[] ) => {
  return (slugPath?: string) => {
    if (!slugPath) return undefined;
    const entriesPath = slugPath.split('/').slice(2);
    let findAmongEntries = entries;
    let result: T | undefined = undefined;
    for (const slug of entriesPath) {
      result = findAmongEntries.find((_entry) => _entry.slug === slug);
      if (!result) {
        break;
      }
      if (
        !result.container.isEncrypted &&
        result.container.content.contentType === 'children'
      ) {
        findAmongEntries = result.container.content.children || [];
      }
    }

    return result;
  };
}

const useCurrentEntry = <T extends Entry = Entry>(
  pathname?: string,
  entryType: EntryType | "all" = "all",
) => {
  const { data: entries } = use$(store.entries);
  const currentEntry = use$(store.currentEntry);

  useEffect(() => {
    localDB.allDocs({ include_docs: true }).then((result) => {
      let allEntries = result.rows.map((row) => row.doc!);
      if(entryType !== 'all') {
        allEntries = allEntries.filter(
          (entry): entry is T => entry.entryType === entryType,
        );
      }

      const findCurrentEntry = findCurrentEntryFactory<T>(allEntries as T[]);
      store.currentEntry.set(findCurrentEntry(pathname))
    });
  }, [entries, entryType, pathname])

  return { currentEntry };
};

export default useCurrentEntry;
