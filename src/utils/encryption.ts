import CryptoJS from 'crypto-js';
import { Entry, EntrySchema } from '../types/entry/entry';
import { EncryptionResult } from '../types/encryption';

function encrypt(data: Entry, key: string): EncryptionResult {
  try {
    return {
      success: true,
      data: {
        ...data,
        container: {
          isEncrypted: true,
          encryptedKey: CryptoJS.AES.encrypt(JSON.stringify(key), key).toString(),
          content: CryptoJS.AES.encrypt(
            JSON.stringify(data.container.content),
            key,
          ).toString(),
        }
      },
    };
  } catch (e) {
    return {
      success: false,
      error: (e as Error)?.message ?? 'Encryption failed',
    };
  }
}

function decrypt(data: Entry, key: string): EncryptionResult {
  if (!data.container.isEncrypted || !data.container.encryptedKey) {
    return {
      success: false,
      error: 'Data is not encrypted',
    };
  }

  const decryptedKey = CryptoJS.AES.decrypt(data.container.encryptedKey, key).toString(
    CryptoJS.enc.Utf8,
  );
  if (decryptedKey !== key) {
    return {
      success: false,
      error: 'Invalid key',
    };
  }

  try {
    if (typeof data.container.content !== 'string') {
      return {
        success: false,
        error: 'Invalid content format',
      };
    }
    const bytes = CryptoJS.AES.decrypt(data.container.content, key);
    const parsedContent = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const decryptedEntry = {
      ...data,
      container: {
        content: parsedContent,
        isEncrypted: false,
      }
    };
    const parsedDecryptedEntry = EntrySchema.parse(decryptedEntry);
    return {
      success: true,
      data: parsedDecryptedEntry,
    };
  } catch (e) {
    return {
      success: false,
      error: (e as Error)?.message ?? 'Decryption failed',
    };
  }
}

export const encryption = {
  encrypt,
  decrypt,
};
