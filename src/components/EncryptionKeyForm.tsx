import { useState } from 'react';
import useEncryptedKeys from '../hooks/useEncryptedKeys';

const EncryptionKeyForm = () => {
  const [input, setInput] = useState('');
  const { addKey } = useEncryptedKeys();

  const handleAddKey = () => {
    if (input) {
      addKey(input);
      setInput('');
    }
  };

  return (
    <form className="encryption-key-form">
      <div className="encryption-key-form__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          autoFocus
          placeholder='🔑 Dešifrovací klíč'
        />
      </div>
      <div>
        <button className="encryption-key-form__button" onClick={handleAddKey} type="button">
         Odemknout
        </button>
      </div>
    </form>
  );
};

export default EncryptionKeyForm;
