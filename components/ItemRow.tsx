import React from 'react';
import { CollectionItem, CollectionCategory } from '../types';

interface ItemRowProps {
  item: CollectionItem;
  collectionId: string;
  category: CollectionCategory;
  onToggleOwned: (collectionId: string, itemId: string) => void;
  onGetValuation: (item: CollectionItem) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, collectionId, category, onToggleOwned, onGetValuation }) => {
  const rarityColorClasses: { [key: string]: string } = {
    'Common': 'bg-blue-900/70 border-blue-700',
    'Uncommon': 'bg-blue-800/70 border-blue-600',
    'Rare': 'bg-blue-700/70 border-blue-500',
    'Secret': 'bg-cyan-600/70 border-cyan-400 text-crt-blue-dark',
    'Country': 'bg-teal-900/70 border-teal-700',
    'Custom': 'bg-gray-700/70 border-gray-500',
  };

  const rarityBorderClasses: { [key: string]: string } = {
    'Common': 'border-blue-500',
    'Uncommon': 'border-green-500',
    'Rare': 'border-purple-500',
    'Secret': 'border-yellow-400',
    'Country': 'border-teal-500',
    'Custom': 'border-gray-500',
  };

  return (
    <div className={`p-2 flex items-center justify-between transition-colors duration-300 border-l-4 ${item.owned ? 'bg-crt-blue/10' : 'bg-black/30'} ${rarityBorderClasses[item.rarity] || 'border-transparent'}`}>
      <div className="flex items-center gap-3 flex-grow min-w-0">
         <div 
            onClick={() => onToggleOwned(collectionId, item.id)}
            className="text-2xl text-crt-blue cursor-pointer"
            role="checkbox"
            aria-checked={item.owned}
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onToggleOwned(collectionId, item.id)}
         >
            {item.owned ? '[X]' : '[ ]'}
        </div>
        {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-cover bg-black border-2 border-crt-blue/30 flex-shrink-0" />
        )}
        <div className="flex-grow min-w-0">
          <p className={`text-xl truncate ${item.owned ? 'text-crt-blue-dark' : 'text-crt-blue/80'}`}>{item.name}</p>
          <span className={`text-sm px-2 py-0.5 border-b-2 ${rarityColorClasses[item.rarity] || 'bg-gray-700/70 border-gray-500'}`}>
            {item.rarity.toUpperCase()}
          </span>
        </div>
      </div>
      {(category !== CollectionCategory.COINS && category !== CollectionCategory.BANKNOTES) && (
        <button
            onClick={() => onGetValuation(item)}
            className="text-lg bg-transparent hover:bg-crt-blue/20 text-crt-blue font-bold py-1 px-3 border-2 border-crt-blue/70 ml-4 flex-shrink-0"
            title="Get AI Valuation"
        >
            VALUE?
        </button>
      )}
    </div>
  );
};

export default ItemRow;