import CryptoJS from 'crypto-js';
import { ZodSchema } from 'zod';

function encrypt<T>(data: T, key: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

function decrypt<T>(data: string, key: string, schema: ZodSchema<T> | undefined = undefined): T | null {
  try {
    const bytes = CryptoJS.AES.decrypt(data, key);
    const parsedResult = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    if (schema) {
      return schema.parse(parsedResult);
    }
    return parsedResult;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const encryption = {
  encrypt,
  decrypt,
};
