import { Entry } from '../types/entry/entry';
import useEncryptedKeys from './useEncryptedKeys';
import { encryption } from '../utils/encryption';

const useCrypto = () => {
  const { keys } = useEncryptedKeys();

  const tryDecrypt = (encryptedEntry: Entry) => {
    for (const key of keys) {
      const res = encryption.decrypt(encryptedEntry, key);
      if (res.success) {
        return res.data;
      }
    }
    return undefined;
  };

  return { tryDecrypt };
};

export default useCrypto;
