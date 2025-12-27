
import React, { useState, useMemo } from 'react';
import { Collection, CollectionItem, CollectionCategory } from '../types';
import ItemRow from './ItemRow';
import { PlusIcon, BarcodeIcon, ArrowUpIcon, ArrowDownIcon } from './icons';

interface CollectionDetailViewProps {
  collection: Collection;
  onBack: () => void;
  onToggleOwned: (collectionId: string, itemId: string) => void;
  onGetValuation: (item: CollectionItem) => void;
  icon: React.ReactNode;
  onAddItem: () => void;
  onBulkAdd: () => void;
  onScan: () => void;
}

const CollectionDetailView: React.FC<CollectionDetailViewProps> = ({
  collection,
  onBack,
  onToggleOwned,
  onGetValuation,
  icon,
  onAddItem,
  onBulkAdd,
  onScan
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'rarity'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const rarityOrder: { [key: string]: number } = {
    'Country': 0,
    'Custom': 1,
    'Common': 2,
    'Uncommon': 3,
    'Rare': 4,
    'Secret': 5,
  };

  const sortedAndFilteredItems = useMemo(() => {
    const ownedItems = collection.items.filter(item => item.owned);
    const missingItems = collection.items.filter(item => !item.owned);

    const filteredOwned = ownedItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMissing = missingItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortFunction = (a: CollectionItem, b: CollectionItem) => {
      if (sortKey === 'rarity') {
        const rarityA = rarityOrder[a.rarity] ?? 99;
        const rarityB = rarityOrder[b.rarity] ?? 99;
        const result = rarityA - rarityB;
        if (result !== 0) {
            return sortDirection === 'asc' ? result : -result;
        }
      }
      // Default to name sort or as a fallback for equal rarity
      const nameResult = a.name.localeCompare(b.name);
      return sortDirection === 'asc' ? nameResult : -nameResult;
    };

    return {
      owned: filteredOwned.sort(sortFunction),
      missing: filteredMissing.sort(sortFunction),
    };
  }, [collection.items, searchTerm, sortKey, sortDirection]);


  const isSearchable = collection.category === CollectionCategory.COINS || collection.category === CollectionCategory.BANKNOTES;
  
  const handleToggleDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-8 text-2xl text-crt-blue hover:text-crt-blue-dark"
      >
        {'<'} BACK TO COLLECTIONS_
      </button>

      <header className="flex items-start justify-between gap-4 mb-6 flex-wrap border-2 border-crt-blue/40 p-4">
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
                {React.cloneElement(icon as React.ReactElement, { className: "h-10 w-10 text-crt-blue" })}
            </div>
            <div>
                <h1 className="text-4xl text-crt-blue-dark">{collection.name}</h1>
                <p className="text-xl text-crt-blue">{collection.description}</p>
            </div>
        </div>
        {collection.category === CollectionCategory.OTHERS && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
                onClick={onScan}
                className="flex items-center gap-2 bg-transparent hover:bg-crt-blue/20 text-crt-blue font-bold py-2 px-4 border-2 border-crt-blue/70"
            >
                <BarcodeIcon className="h-5 w-5" />
                SCAN
            </button>
             <button
                onClick={onBulkAdd}
                className="flex items-center gap-2 bg-transparent hover:bg-crt-blue/20 text-crt-blue font-bold py-2 px-4 border-2 border-crt-blue/70"
            >
                <PlusIcon className="h-5 w-5" />
                BULK ADD
            </button>
            <button
                onClick={onAddItem}
                className="flex items-center gap-2 bg-crt-blue hover:bg-crt-blue-dark text-black text-shadow-none font-bold py-2 px-4 border-2 border-crt-blue"
            >
                <PlusIcon className="h-5 w-5" />
                ADD
            </button>
          </div>
        )}
      </header>

      {isSearchable && (
        <div className="relative mb-8">
          <label htmlFor="search" className="text-2xl text-crt-blue pr-2">SEARCH:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 bg-crt-bg border-b-2 border-crt-blue p-1 text-2xl text-crt-blue focus:outline-none focus:bg-crt-blue/10"
          />
           <span className="animate-pulse">_</span>
        </div>
      )}

      <div className="flex justify-end items-center gap-4 my-4">
          <label className="text-xl text-crt-blue">
            SORT:
          </label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as 'name' | 'rarity')}
            className="bg-crt-bg border-2 border-crt-blue/70 p-1 text-xl text-crt-blue focus:outline-none focus:bg-crt-blue/10 cursor-pointer"
          >
            <option value="name">NAME</option>
            <option value="rarity">RARITY</option>
          </select>
          <button
            onClick={handleToggleDirection}
            className="flex items-center gap-2 bg-transparent hover:bg-crt-blue/20 text-crt-blue font-bold py-1 px-2 border-2 border-crt-blue/70"
            title={`Sort ${sortDirection === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortDirection === 'asc' ? <ArrowUpIcon className="h-6 w-6" /> : <ArrowDownIcon className="h-6 w-6" />}
            {sortDirection.toUpperCase()}
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-crt-blue-dark">OWNED ({sortedAndFilteredItems.owned.length})</h2>
          <div className="space-y-2 pr-2 max-h-[50vh] overflow-y-auto">
            {sortedAndFilteredItems.owned.length > 0 ? (
              sortedAndFilteredItems.owned.map(item => (
                <ItemRow
                  key={item.id}
                  item={item}
                  collectionId={collection.id}
                  category={collection.category}
                  onToggleOwned={onToggleOwned}
                  onGetValuation={onGetValuation}
                />
              ))
            ) : (
              <p className="text-xl text-crt-blue/80 italic">
                {searchTerm ? '...NO MATCHING ITEMS...' : '...NOTHING OWNED...'}
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-crt-blue-dark">MISSING ({sortedAndFilteredItems.missing.length})</h2>
          <div className="space-y-2 pr-2 max-h-[50vh] overflow-y-auto">
            {sortedAndFilteredItems.missing.length > 0 ? (
              sortedAndFilteredItems.missing.map(item => (
                <ItemRow
                  key={item.id}
                  item={item}
                  collectionId={collection.id}
                  category={collection.category}
                  onToggleOwned={onToggleOwned}
                  onGetValuation={onGetValuation}
                />
              ))
            ) : (
                <p className="text-xl text-crt-blue/80 italic">
                    {searchTerm ? '...NO MATCHING ITEMS...' : '...COLLECTION COMPLETE...'}
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailView;
