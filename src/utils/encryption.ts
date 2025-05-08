import CryptoJS from 'crypto-js';
import { Entry, EntrySchema } from '../types/entry/entry';
import { EncryptionResult, encryptionResultSchema } from '../types/encryption';

function encrypt(data: Entry, key: string): EncryptionResult {
  try {
    return {
      success: true,
      data: {
        ...data,
        container: {
          isEncrypted: true,
          encryptedKey: CryptoJS.AES.encrypt(
            JSON.stringify(key),
            key,
          ).toString(),
          content: CryptoJS.AES.encrypt(
            JSON.stringify(data.container.content),
            key,
          ).toString(),
        },
      },
    };
  } catch (e) {
    return {
      success: false,
      error: (e as Error)?.message ?? 'Encryption failed',
    };
  }
}

const toStorageKey = (id: string, key: string) => {
  return `${id}-${key}-decrypt-result`;
};

function decrypt(data: Entry, key: string): EncryptionResult {
  try {
    const cachedResult = sessionStorage.getItem(toStorageKey(data._id, key));
    if (cachedResult) {
      console.log('cached result: ' + cachedResult);
      return encryptionResultSchema.parse(JSON.parse(cachedResult));
    }
  } catch (e) {
    console.error(e);
    sessionStorage.removeItemItem(toStorageKey(data._id, key));
  }

  if (!data.container.isEncrypted || !data.container.encryptedKey) {
    return {
      success: false,
      error: 'Data is not encrypted',
    };
  }

  try {
    const decryptedKey = CryptoJS.AES.decrypt(
      data.container.encryptedKey,
      key,
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedKey !== key) {
      const failedResponse: EncryptionResult = {
        success: false,
        error: 'Invalid key',
      };
      sessionStorage.setItem(toStorageKey(data._id, key), JSON.stringify(failedResponse));
      return failedResponse;
    }

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
      },
    };
    const parsedDecryptedEntry = EntrySchema.parse(decryptedEntry);
    const response: EncryptionResult = {
      success: true,
      data: parsedDecryptedEntry,
    };
    sessionStorage.setItem(
      toStorageKey(data._id, key),
      JSON.stringify(response),
    );
    return response;
  } catch (e) {
    const failResponse: EncryptionResult = {
      success: false,
      error: (e as Error)?.message ?? 'Decryption failed',
    };
    sessionStorage.setItem(
      toStorageKey(data._id, key),
      JSON.stringify(failResponse),
    );
    return failResponse;
  }
}

export const encryption = {
  encrypt,
  decrypt,
};
