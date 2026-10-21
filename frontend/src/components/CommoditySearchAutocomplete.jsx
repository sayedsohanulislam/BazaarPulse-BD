import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBazaar } from '../context/BazaarContext';
import PriceStatusBadge from './PriceStatusBadge';

export default function CommoditySearchAutocomplete({ onSelectItem, placeholder }) {
  const { commodities, addToBasket } = useBazaar();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = (commodities || []).filter(c => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    const nameMatch = c.name.toLowerCase().includes(q);
    const catMatch = (c.category || '').toLowerCase().includes(q);
    return nameMatch || catMatch;
  }).slice(0, 6);

  const handleSelect = (item) => {
    setIsOpen(false);
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      navigate(`/heatmap?search=${encodeURIComponent(item.name)}`);
    }
  };

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addToBasket(item, 1);
    setAddedId(item.id || item._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={
            placeholder || 'Search rice, lentils, potato, onion, eggs, oil, beef, chicken...'
          }
          className="w-full bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xl shadow-emerald-950/20 transition backdrop-blur-md"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#090e1c] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          {results.length > 0 ? (
            results.map((item) => {
              const isAdded = addedId === (item.id || item._id);
              return (
                <div
                  key={item.id || item._id}
                  onClick={() => handleSelect(item)}
                  className="p-3.5 hover:bg-slate-800/60 cursor-pointer flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0">
                      {item.category === 'VEGETABLES' ? '🥔' :
                       item.category === 'PROTEIN' ? '🥩' :
                       item.category === 'OIL' ? '🛢️' :
                       item.category === 'SPICES' ? '🧅' : '🌾'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          ({item.category})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs">
                        <span className="text-emerald-400 font-bold">
                          ৳{item.retailAvgPrice} /{item.unit}
                        </span>
                        <span className="text-slate-500">|</span>
                        <span className="text-slate-400 text-[11px]">
                          DAM Cap: ৳{item.damFairPriceMax}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <PriceStatusBadge 
                      retailPrice={item.retailAvgPrice} 
                      fairPriceMax={item.damFairPriceMax} 
                    />
                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`p-2 rounded-xl transition ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                      title="Add to Basket"
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              <p>No matching commodities found.</p>
              <p className="mt-1 text-slate-500">
                Try searching for rice, onion, egg, potato, chicken, or soybean oil.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
