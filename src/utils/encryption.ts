import CryptoJS from 'crypto-js';
import { Entry, EntrySchema } from '../types/entry/entry';
import { EncryptionResult } from '../types/encryption';

function encrypt(data: Entry, key: string): EncryptionResult {
  try {
    return {
      success: true,
      data: {
        ...data,
        content: CryptoJS.AES.encrypt(
          JSON.stringify(data.content),
          key,
        ).toString(),
        isEncrypted: true,
        encryptedKey: CryptoJS.AES.encrypt(JSON.stringify(key), key).toString(),
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
  if (!data.isEncrypted || !data.encryptedKey) {
    return {
      success: false,
      error: 'Data is not encrypted',
    };
  }

  const decryptedKey = CryptoJS.AES.decrypt(data.encryptedKey, key).toString(
    CryptoJS.enc.Utf8,
  );
  if (decryptedKey !== key) {
    return {
      success: false,
      error: 'Invalid key',
    };
  }

  try {
    if (typeof data.content !== 'string') {
      return {
        success: false,
        error: 'Invalid content format',
      };
    }
    const bytes = CryptoJS.AES.decrypt(data.content, key);
    const parsedContent = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const decryptedEntry = {
      ...data,
      content: parsedContent,
      isEncrypted: false,
    };
    EntrySchema.parse(decryptedEntry);
    return {
      success: true,
      data: decryptedEntry,
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
