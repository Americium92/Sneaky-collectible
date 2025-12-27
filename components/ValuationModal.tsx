import React from 'react';
import { CollectionItem } from '../types';
import { ValuationResult } from '../services/geminiService';

interface ValuationData {
  item: CollectionItem;
  result: ValuationResult;
}

const ValuationModal: React.FC<{ isLoading: boolean, result: ValuationData | null, onClose: () => void; }> = ({ isLoading, result, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-crt-flicker"
      onClick={onClose}
    >
      <div 
        className="bg-crt-bg border-4 border-crt-blue/80 p-6 m-4 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="text-center text-crt-blue">
            <div className="text-4xl animate-spin mb-4">[■]</div>
            <h3 className="text-2xl mb-2">ESTIMATING VALUE...</h3>
            <p className="text-xl">Gemini is generating a valuation. Please wait.</p>
          </div>
        ) : result && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              {result.item.imageUrl && (
                <img 
                  src={result.item.imageUrl} 
                  alt={result.item.name} 
                  className="h-20 w-20 object-cover border-2 border-crt-blue/50 flex-shrink-0"
                />
              )}
              <h2 className="text-3xl text-crt-blue-dark">{result.item.name}</h2>
            </div>

            <div className="bg-black/50 p-4 border-2 border-crt-blue/30 mb-6">
                <p className="text-2xl text-crt-blue whitespace-pre-wrap">{result.result.value}</p>
            </div>

            <p className="text-sm text-crt-blue/70 mt-4 italic">
                *Valuation is an AI-powered estimate and may not reflect true market value.
            </p>

            <div className="text-right mt-6">
              <button
                onClick={onClose}
                className="bg-crt-blue hover:bg-crt-blue-dark text-black text-shadow-none font-bold py-2 px-4 border-2 border-crt-blue"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValuationModal;