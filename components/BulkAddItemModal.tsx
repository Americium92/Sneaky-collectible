
import React, { useState } from 'react';

interface BulkAddItemModalProps {
  onClose: () => void;
  onSave: (itemNames: string[]) => void;
}

const BulkAddItemModal: React.FC<BulkAddItemModalProps> = ({ onClose, onSave }) => {
  const [itemNames, setItemNames] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const names = itemNames.split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) {
      setError('Please enter at least one item name.');
      return;
    }
    setError('');
    onSave(names);
    onClose();
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-crt-flicker"
      onClick={onClose}
    >
      <div
        className="bg-crt-bg border-4 border-crt-blue/80 p-6 m-4 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-3xl text-crt-blue-dark mb-4">BULK ADD ITEMS</h2>
        <p className="text-lg text-crt-blue mb-6">
          Enter one collectible name per line. Each line will be added as a new item.
        </p>
        
        <div className="space-y-4">
            <textarea
                value={itemNames}
                onChange={(e) => setItemNames(e.target.value)}
                className="w-full h-48 bg-crt-bg border-2 border-crt-blue p-2 text-xl text-crt-blue focus:outline-none focus:bg-crt-blue/10 resize-none"
                placeholder={"Pikachu Plush\nSigned Baseball Card\nVintage Stamp..."}
            />
            {error && <p className="text-red-500 text-lg">{error}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-crt-blue/20 text-crt-blue font-bold py-2 px-4 border-2 border-crt-blue/70"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="bg-crt-blue hover:bg-crt-blue-dark text-black text-shadow-none font-bold py-2 px-4 border-2 border-crt-blue"
          >
            SAVE ITEMS
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkAddItemModal;
