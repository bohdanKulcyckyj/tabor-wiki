import { useState } from 'react';
import { z } from 'zod';

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
  const [keys, setKeys] = useState(() => getKeys());

  const addKey = (newKey: string) => {
    storeKeys([...keys, newKey]);
    setKeys((_prev) => [..._prev, newKey]);
  };

  return { keys, addKey };
};

export default useEncryptedKeys;
