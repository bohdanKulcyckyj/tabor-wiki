import { use$ } from '@legendapp/state/react';
import { useEffect } from 'react';
import { z } from 'zod';
import { store } from '../state/store';

const EncryptionKeysSchema = z.array(z.string());

const getKeys = (): string[] => {
  try {
    const encryptionKeys = localStorage.getItem('encryptionKeys');
    if (encryptionKeys) {
      const parsedKeys = EncryptionKeysSchema.parse(
        JSON.parse(encryptionKeys),
      );
      return parsedKeys;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

const storeKeys = (keys: string[]): void => {
  localStorage.setItem('encryptionKeys', JSON.stringify(keys));
};

const useEncryptedKeys = () => {
  const keys = use$(store.keys);

  useEffect(() => {
    const stored = getKeys();
    if (stored.length > 0) {
      store.keys.set(stored);
    }
  }, [])

  const addKey = (newKey: string) => {
    storeKeys([...keys, newKey]);
    store.keys.set((_prev) => [..._prev, newKey]);
  };

  return { keys: keys, addKey };
};

export default useEncryptedKeys;
