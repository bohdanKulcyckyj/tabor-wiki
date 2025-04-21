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
      <h4>Nový dešifrovací klíč</h4>
      <div className="encryption-key-form__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <button onClick={handleAddKey} type="button">
          Potvrdit
        </button>
      </div>
    </form>
  );
};

export default EncryptionKeyForm;
