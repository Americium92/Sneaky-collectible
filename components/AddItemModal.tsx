import React, { useState } from 'react';

interface AddItemModalProps {
  onClose: () => void;
  onSave: (name: string, rarity: string, imageUrl: string) => void;
  initialName?: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onSave, initialName }) => {
  const [name, setName] = useState(initialName || '');
  const [rarity, setRarity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Item name required.');
      return;
    }
    setError('');
    onSave(name.trim(), rarity.trim() || 'Custom', imageUrl.trim());
    onClose();
  };
  
  const InputField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, required?: boolean}> = 
    ({label, value, onChange, placeholder, required}) => (
    <div>
        <label className="block text-xl text-crt-blue mb-1">
            {`> ${label}${required ? '*' : ''}`}
        </label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full bg-crt-bg border-b-2 border-crt-blue p-1 text-2xl text-crt-blue focus:outline-none focus:bg-crt-blue/10"
            placeholder={placeholder}
        />
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-crt-flicker"
      onClick={onClose}
    >
      <div
        className="bg-crt-bg border-4 border-crt-blue/80 p-6 m-4 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-3xl text-crt-blue-dark mb-6">ADD NEW COLLECTIBLE</h2>
        
        <div className="space-y-4">
          <InputField label="ITEM NAME" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Signed Baseball Card" required />
          {error && <p className="text-red-500 text-lg">{error}</p>}
          <InputField label="RARITY (OPTIONAL)" value={rarity} onChange={e => setRarity(e.target.value)} placeholder="e.g. Ultra Rare" />
          <InputField label="IMAGE URL (OPTIONAL)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
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
            SAVE ITEM
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;