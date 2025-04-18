import { Entry, EntryType } from '../types/entry/entry';
import useEntries from './useEntries';

const useCurrentEntry = <T extends Entry>(
  entryType: EntryType,
  pathname: string,
): T | undefined => {
  const entries = useEntries<T>(entryType);
  const entriesPath = pathname.split('/').slice(2);
  console.log(entries);
  console.log(entriesPath);
  const findEntry = () => {
    let findAmongEntries = entries;
    let currentEntry: T | undefined = undefined;
    for (const slug of entriesPath) {
      currentEntry = findAmongEntries.find((_entry) => _entry.slug === slug);
      if (!currentEntry) {
        break;
      }
      if(!currentEntry.container.isEncrypted && currentEntry.container.content.contentType === "children") {
        findAmongEntries = currentEntry.container.content.children || [];
      }
    }
    return currentEntry;
  };
  return findEntry();
};

export default useCurrentEntry;
