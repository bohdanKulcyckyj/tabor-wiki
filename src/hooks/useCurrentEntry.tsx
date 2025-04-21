import { useEffect, useState } from 'react';
import { Entry, EntryType } from '../types/entry/entry';
import useEntries from './useEntries';

const findCurrentEntryFactory = <T extends Entry = Entry>( entries: T[] ) => {
  return (slugPath?: string) => {
    console.log(slugPath)
    console.log(entries)
    console.log("NIIIIIIIIIIIIIIIIC SE NEDEJEEEEEEEEEEEE")
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

    console.log(result)
    return result;
  };
}

const useCurrentEntry = <T extends Entry = Entry>(
  pathname?: string,
  entryType: EntryType | "all" = "all",
) => {
  const { data: entries } = useEntries<T>(entryType);
  const [currentEntry, setCurrentEntry] = useState<T | undefined>(undefined);

  useEffect(() => {
    const findCurrentEntry = findCurrentEntryFactory<T>(entries)
    setCurrentEntry(findCurrentEntry(pathname))
  }, [entries, pathname])

  return { currentEntry, handleFindCurrentEntry: findCurrentEntryFactory<T>(entries) };
};

export default useCurrentEntry;
