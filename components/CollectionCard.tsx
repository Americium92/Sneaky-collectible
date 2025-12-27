import React from 'react';
import { Collection } from '../types';
import TextProgressBar from './TextProgressBar';

interface CollectionCardProps {
  collection: Collection;
  onSelect: () => void;
  icon: React.ReactNode;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onSelect, icon }) => {
  const totalItems = collection.items.length;
  const ownedItems = collection.items.filter(item => item.owned).length;
  const completionPercentage = totalItems > 0 ? (ownedItems / totalItems) * 100 : 0;

  return (
    <div
      onClick={onSelect}
      className="bg-black/50 p-4 border-2 border-crt-blue/40 hover:border-crt-blue/80 hover:bg-crt-blue/10 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-crt-blue" })}
            <h3 className="text-2xl text-crt-blue-dark tracking-wide">{collection.name}</h3>
          </div>
          <p className="text-lg text-crt-blue h-12">{collection.description}</p>
          <div className="mt-4 text-lg text-crt-blue">
            {ownedItems} / {totalItems} items collected
          </div>
        </div>
        <div className="flex-shrink-0">
          <TextProgressBar percentage={completionPercentage} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;