import { Entry } from './entry/entry';

type EncryptionSuccess = {
  success: true;
  data: Entry;
};

type EncryptionFail = {
  success: false;
  error: string;
};

export type EncryptionResult = EncryptionSuccess | EncryptionFail;
