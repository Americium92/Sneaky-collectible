
import React, { useState, useCallback } from 'react';
import { Collection, CollectionItem, CollectionCategory } from './types';
import { INITIAL_COLLECTIONS } from './constants';
import CollectionCard from './components/CollectionCard';
import CollectionDetailView from './components/CollectionDetailView';
import { getValuation, ValuationResult } from './services/geminiService';
import ValuationModal from './components/ValuationModal';
import AddItemModal from './components/AddItemModal';
import ScannerModal from './components/ScannerModal';
import BulkAddItemModal from './components/BulkAddItemModal';
import { BearbrickIcon, CoinIcon, BanknoteIcon, PlushieIcon, OtherIcon } from './components/icons';

interface ValuationData {
  item: CollectionItem;
  result: ValuationResult;
}

const App: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isValuationLoading, setIsValuationLoading] = useState(false);
  const [valuationResult, setValuationResult] = useState<ValuationData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isBulkAddItemModalOpen, setIsBulkAddItemModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [initialAddItemName, setInitialAddItemName] = useState('');


  const handleSelectCollection = (collection: Collection) => {
    setSelectedCollection(collection);
  };
  
  const handleBack = () => {
    setSelectedCollection(null);
    setValuationResult(null);
  };

  const handleToggleOwned = (collectionId: string, itemId: string) => {
    setCollections(prevCollections =>
      prevCollections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            items: collection.items.map(item =>
              item.id === itemId ? { ...item, owned: !item.owned } : item
            ),
          };
        }
        return collection;
      })
    );
     // Also update selectedCollection if it's the one being modified
    if (selectedCollection && selectedCollection.id === collectionId) {
      setSelectedCollection(prev => prev ? ({
          ...prev,
          items: prev.items.map(item =>
            item.id === itemId ? { ...item, owned: !item.owned } : item
          ),
      }) : null)
    }
  };

  const handleGetValuation = useCallback(async (item: CollectionItem) => {
    setIsValuationLoading(true);
    setValuationResult(null);
    try {
      const result = await getValuation(item.name);
      setValuationResult({ item: item, result });
    } catch (error) {
      console.error("Failed to get valuation:", error);
      setValuationResult({ item: item, result: { value: "Could not retrieve an estimate. Please try again." } });
    } finally {
      setIsValuationLoading(false);
    }
  }, []);

  const closeValuationModal = () => {
    setValuationResult(null);
  };

  const handleAddItem = (name: string, rarity: string, imageUrl: string) => {
    const newItem: CollectionItem = {
      id: `custom-${Date.now()}`,
      name,
      rarity,
      imageUrl: imageUrl || `https://placehold.co/100x100/000020/00ffff/png?text=${name.charAt(0)}`,
      owned: false,
    };

    const othersCollectionId = 'others-custom';

    setCollections(prevCollections =>
      prevCollections.map(collection => {
        if (collection.id === othersCollectionId) {
          return {
            ...collection,
            items: [...collection.items, newItem],
          };
        }
        return collection;
      })
    );

    if (selectedCollection && selectedCollection.id === othersCollectionId) {
        setSelectedCollection(prev => prev ? ({
            ...prev,
            items: [...prev.items, newItem],
        }) : null);
    }
  };

  const handleBulkAddItem = (itemNames: string[]) => {
    const newItems: CollectionItem[] = itemNames.map(name => ({
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      rarity: 'Custom',
      imageUrl: `https://placehold.co/100x100/000020/00ffff/png?text=${name.charAt(0)}`,
      owned: false,
    }));

    const othersCollectionId = 'others-custom';

    setCollections(prevCollections =>
      prevCollections.map(collection => {
        if (collection.id === othersCollectionId) {
          return {
            ...collection,
            items: [...collection.items, ...newItems],
          };
        }
        return collection;
      })
    );

    if (selectedCollection && selectedCollection.id === othersCollectionId) {
      setSelectedCollection(prev => prev ? ({
          ...prev,
          items: [...prev.items, ...newItems],
      }) : null);
    }
  };

  const openAddItemModal = () => {
    setInitialAddItemName('');
    setIsAddItemModalOpen(true);
  };
  const closeAddItemModal = () => setIsAddItemModalOpen(false);

  const openBulkAddItemModal = () => setIsBulkAddItemModalOpen(true);
  const closeBulkAddItemModal = () => setIsBulkAddItemModalOpen(false);

  const openScannerModal = () => setIsScannerOpen(true);
  const closeScannerModal = () => setIsScannerOpen(false);

  const handleBarcodeScanned = (code: string) => {
    closeScannerModal();
    // Use a short delay for a smoother transition between modals
    setTimeout(() => {
        setInitialAddItemName(code);
        setIsAddItemModalOpen(true);
    }, 150);
  };

  const renderIcon = (category: string) => {
    // Colors are applied in CollectionCard to ensure consistency
    switch (category) {
      case 'Bearbrick':
        return <BearbrickIcon className="h-8 w-8" />;
      case 'Coins':
        return <CoinIcon className="h-8 w-8" />;
      case 'Banknotes':
        return <BanknoteIcon className="h-8 w-8" />;
      case 'Plushies':
        return <PlushieIcon className="h-8 w-8" />;
      case 'Others':
        return <OtherIcon className="h-8 w-8" />;
      default:
        return null;
    }
  };

  const categories = ['All', ...Object.values(CollectionCategory)];
  const filteredCollections = collections.filter(collection => 
    selectedCategory === 'All' || collection.category === selectedCategory
  );

  return (
    <div className="p-4 md:p-8 h-full animate-text-flicker">
      <main className="container mx-auto">
        {!selectedCollection ? (
          <>
            <header className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl tracking-widest">
                Sneaky Collectible
              </h1>
              <p className="mt-4 text-2xl">
                Your digital vault for treasured collectibles.
              </p>
            </header>

            <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 flex-wrap p-2 border-2 border-crt-blue/50">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-1 text-xl border-2 transition-all duration-200 ${
                            selectedCategory === category
                            ? 'bg-crt-blue text-black text-shadow-none'
                            : 'border-crt-blue/70 text-crt-blue hover:bg-crt-blue/20'
                        }`}
                    >
                        {'>'} {category.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCollections.map(collection => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onSelect={() => handleSelectCollection(collection)}
                  icon={renderIcon(collection.category)}
                />
              ))}
            </div>
          </>
        ) : (
          <CollectionDetailView
            collection={selectedCollection}
            onBack={handleBack}
            onToggleOwned={handleToggleOwned}
            onGetValuation={handleGetValuation}
            icon={renderIcon(selectedCollection.category)}
            onAddItem={openAddItemModal}
            onBulkAdd={openBulkAddItemModal}
            onScan={openScannerModal}
          />
        )}
      </main>
      
      {(isValuationLoading || valuationResult) && (
        <ValuationModal
            isLoading={isValuationLoading}
            result={valuationResult}
            onClose={closeValuationModal}
        />
      )}

      {isAddItemModalOpen && (
        <AddItemModal
          onClose={closeAddItemModal}
          onSave={handleAddItem}
          initialName={initialAddItemName}
        />
      )}

      {isBulkAddItemModalOpen && (
        <BulkAddItemModal
          onClose={closeBulkAddItemModal}
          onSave={handleBulkAddItem}
        />
      )}

      {isScannerOpen && (
        <ScannerModal 
            onClose={closeScannerModal}
            onBarcodeScan={handleBarcodeScanned}
        />
      )}

      <footer className="text-center py-8 mt-12 border-t-2 border-crt-blue/30">
        <p className="text-lg text-crt-blue/80">Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
