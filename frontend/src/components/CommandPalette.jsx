import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, ShoppingBag, TrendingUp, Truck, Warehouse, Fish, 
  CloudSun, AlertOctagon, Calculator, ShieldCheck, PhoneCall, ArrowRight, CornerDownLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, commodities, addToBasket } = useBazaar();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickPages = [
    { to: '/', name: 'Market Overview', icon: ShoppingBag, desc: 'Daily market summary & top price movers' },
    { to: '/heatmap', name: 'Fair Price Grid', icon: TrendingUp, desc: 'DAM fair price caps vs open retail' },
    { to: '/tcb', name: 'TCB OMS Truck Locator', icon: Truck, desc: 'Subsidized sales points & live stock' },
    { to: '/supply', name: 'Supply Chain Radar', icon: Warehouse, desc: 'Middleman margins & cold storage audits' },
    { to: '/fish-meat', name: 'Fish & Poultry Market', icon: Fish, desc: 'Padma Hilsha grading & Tejgaon egg auctions' },
    { to: '/agro', name: 'Agro-Weather & Forex', icon: CloudSun, desc: 'Open-Meteo satellite feed & USD import parity' },
    { to: '/whistle', name: 'Report Price Gouging', icon: AlertOctagon, desc: 'File anonymous complaint to DNCRP' },
    { to: '/budget', name: 'Family Grocery Planner', icon: Calculator, desc: 'Household grocery & Ramadan budget calculator' },
    { to: '/authority', name: 'DNCRP Magistrate Portal', icon: ShieldCheck, desc: 'Mobile court enforcement & raid ledger' }
  ];

  const filteredPages = quickPages.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCommodities = (commodities || []).filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);

  const handleSelectPage = (to) => {
    setIsCommandPaletteOpen(false);
    navigate(to);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={() => setIsCommandPaletteOpen(false)}></div>

      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commodities, intelligence modules, hotlines..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 rounded-md">
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-3 space-y-4">
          
          {/* Direct Emergency Helpline */}
          <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <PhoneCall className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-bold text-rose-200">
                  DNCRP Consumer Rights Speed Dial 13346
                </div>
                <div className="text-[11px] text-rose-400/80">
                  Instant 24/7 telephonic complaint line
                </div>
              </div>
            </div>
            <a
              href="tel:13346"
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
            >
              <span>Call 13346</span>
            </a>
          </div>

          {/* Commodities Matching */}
          {filteredCommodities.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                Commodities & DAM Fair Caps
              </div>
              <div className="space-y-1">
                {filteredCommodities.map((c) => (
                  <div
                    key={c.id || c._id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition group border border-transparent hover:border-slate-700"
                  >
                    <div 
                      className="flex-grow cursor-pointer"
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        navigate('/heatmap');
                      }}
                    >
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({c.category})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-3">
                        <span>DAM Cap: <strong className="text-emerald-400">৳{c.damFairPriceMin} - ৳{c.damFairPriceMax}</strong></span>
                        <span>Retail Avg: <strong className="text-white">৳{c.retailAvgPrice}/{c.unit}</strong></span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToBasket(c, 1)}
                      className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-[11px] font-semibold transition border border-emerald-500/30"
                    >
                      + Add to Basket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Pages Matching */}
          {filteredPages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                Platform Modules & Tools
              </div>
              <div className="space-y-1">
                {filteredPages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.to}
                      onClick={() => handleSelectPage(p.to)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition group border border-transparent hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-400">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {p.desc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && filteredCommodities.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-xs">
              No matching commodities or modules found
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950 text-[10px] text-slate-500 border-t border-slate-800 flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="w-3 h-3" />
            <span>Select</span>
          </span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
