import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import useCurrentEntry from '../hooks/useCurrentEntry';
import useCrypto from '../hooks/useCrypto';
import EncryptionKeyForm from './EncryptionKeyForm';
import useEncryptedKeys from '../hooks/useEncryptedKeys';

const DecryptEntryMiddleware = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { currentEntry } = useCurrentEntry(location.pathname);
  const { tryDecrypt } = useCrypto();
  const { keys } = useEncryptedKeys();

  useEffect(() => {
    console.log(currentEntry)
    if (currentEntry?.container?.isEncrypted) {
      tryDecrypt(currentEntry);
    }
  }, [currentEntry, tryDecrypt, keys]);

  if (currentEntry?.container?.isEncrypted) {
    return <EncryptionKeyForm />
  }

  return <>{children}</>;
};

export default DecryptEntryMiddleware;
