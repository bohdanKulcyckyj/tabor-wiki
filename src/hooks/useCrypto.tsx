import { Entry, EntrySchema } from '../types/entry/entry';
import useEncryptedKeys from './useEncryptedKeys';
import { encryption } from '../utils/encryption';
import { use$ } from '@legendapp/state/react';
import { store } from '../state/store';
import localDB from '../db/db';

function findParentEntry(entries: Entry[], childId: string): Entry | undefined {
  const innerFind = (children: Entry[]): Entry | undefined => {
    for (const childEntry of children) {
      if (childEntry.id === childId) {
        return childEntry;
      }
      if (childEntry.container.isEncrypted) {
        continue;
      }
      if (
        childEntry.container.content.contentType === 'children' &&
        childEntry.container.content.children
      ) {
        const found = innerFind(childEntry.container.content.children);
        if (found) {
          return found;
        }
      }
    }
  };

  for (const entry of entries) {
    if (entry.id === childId) {
      return entry;
    }
    if (entry.container.isEncrypted) {
      continue;
    }
    if (
      entry.container.content.contentType === 'children' &&
      entry.container.content.children
    ) {
      const found = innerFind(entry.container.content.children);
      if (found) {
        return entry;
      }
    }
  }
}

function updateNestedEntryById<T extends Entry>(
  obj: T,
  targetId: string,
  updateFn: (entry: T) => T,
): T {
  // If this is the target, apply the update
  if (obj.id === targetId) {
    return updateFn(obj);
  }
  if (
    obj.container.isEncrypted ||
    obj.container.content.contentType !== 'children'
  ) {
    return obj; // No need to recurse further
  }

  const children = obj?.container?.content?.children;

  // If there are children, recurse into them
  if (Array.isArray(children)) {
    const updatedChildren = children.map((child) =>
      updateNestedEntryById(child, targetId, updateFn),
    );

    // Only return a new object if something changed
    const hasChanged = children.some(
      (child, index) => child !== updatedChildren[index],
    );
    if (hasChanged) {
      return {
        ...obj,
        container: {
          ...obj.container,
          content: {
            ...obj.container?.content,
            children: updatedChildren,
          },
        },
      };
    }
  }

  return obj;
}

const useCrypto = () => {
  const { keys } = useEncryptedKeys();
  const { data } = use$(store.entries);

  const tryDecrypt = (encryptedEntry: Entry) => {
    for (const key of keys) {
      const decryptionResult = encryption.decrypt(encryptedEntry, key);
      if (decryptionResult.success) {
        const entryToUpdate = findParentEntry(data, encryptedEntry.id);
        console.log('entryToUpdate', entryToUpdate);
        if (entryToUpdate) {
          const updatedEntry = updateNestedEntryById(
            entryToUpdate,
            decryptionResult.data.id,
            (param) => ({
              ...param,
              ...decryptionResult.data,
            }),
          );

          localDB
            .put({...updatedEntry, updatedAt: new Date().toISOString()}, { force: true })
            .then((res) => {
              if (res.ok) {
                store.entries.set((prev) => ({
                  ...prev,
                  data: [
                    ...prev.data.filter(
                      (entry) => entry.id !== updatedEntry.id,
                    ),
                    updatedEntry,
                  ],
                }));
                store.currentEntry.set(() => decryptionResult.data);
              }
            })
            .catch((err) => console.log(err));
        }
        return decryptionResult.data;
      }
    }
    return undefined;
  };

  return { tryDecrypt };
};

export default useCrypto;
