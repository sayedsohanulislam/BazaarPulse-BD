import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Search, Filter, AlertTriangle, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, Scale, RefreshCw, Layers, MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { analyticsApi } from '../services/api';

export default function PriceHeatmap() {
  const { lang } = useLanguage();
  const { commodities, loading, forceRefresh, isRefreshing } = useBazaar();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [marketSpreads, setMarketSpreads] = useState([]);

  useEffect(() => {
    analyticsApi.getMarketSpread().then(res => {
      if (res.data.success) setMarketSpreads(res.data.data);
    }).catch(() => {});
  }, []);

  const categories = [
    'ALL', 'Vegetables', 'Spices', 'Oils & Fats', 'Poultry & Meat', 'Fish', 'Grains & Rice', 'Lentils & Pulses'
  ];

  const filtered = (commodities || []).filter(c => {
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.nameBn.includes(search);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{lang === 'bn' ? 'নিত্যপণ্যের পূর্ণাঙ্গ ন্যায্যমূল্য গ্রিড' : 'National Essential Commodities Price Heatmap'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'bn' ? 'কৃষি বিপণন অধিদপ্তর ন্যায্যমূল্য বনাম বাজার রেট' : 'DAM Fair Price Range vs Open Retail Rates'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'কাওরান বাজার পাইকারি আড়ত, সরকারি দাম এবং সিন্ডিকেটের কৃত্রিম মূল্যবৃদ্ধির ঝুঁকি সূচক।' 
                  : 'Real-time retail comparison against Karwan Bazar wholesale baseline and syndicate risk scores.'}
              </p>
            </div>

            <button
              onClick={forceRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-950/40 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : (lang === 'bn' ? 'লাইভ রিফ্রেশ' : 'Refresh Telemetry')}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? 'পণ্যের নাম সার্চ করুন...' : 'Search commodity name...'}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {cat === 'ALL' ? (lang === 'bn' ? 'সকল পণ্য' : 'All Categories') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Commodity Heatmap Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(c => {
            const overcharge = c.retailAvgPrice - c.damFairPriceMax;
            const isHighOvercharge = overcharge > 0;
            return (
              <div 
                key={c.id || c._id}
                className="bg-slate-850 border border-slate-700/80 rounded-2xl p-5 hover:border-slate-600 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {lang === 'bn' ? c.nameBn : c.name}
                      </h3>
                      <span className="text-[11px] text-slate-400">{c.category} • {c.supplyOrigin}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      c.volatilityIndex === 'CRISIS' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      c.volatilityIndex === 'SURGING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {c.volatilityIndex}
                    </span>
                  </div>

                  {/* Price Metrics Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">DAM Fair Cap</span>
                      <strong className="text-emerald-400">৳{c.damFairPriceMin} - ৳{c.damFairPriceMax}</strong>
                    </div>

                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Karwan Arat</span>
                      <strong className="text-cyan-300">৳{c.karwanBazarWholesale}</strong>
                    </div>

                    <div className="col-span-2 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Current Retail Average</span>
                        <span className="text-xl font-black text-white">৳{c.retailAvgPrice} <span className="text-xs font-normal text-slate-400">/{c.unit}</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Delta vs Yesterday</span>
                        <span className={`text-xs font-bold ${c.deltaPercent >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {c.deltaPercent >= 0 ? `+${c.deltaPercent}%` : `${c.deltaPercent}%`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Syndicate Risk Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Syndicate / Hoarding Risk</span>
                      <strong className={c.syndicateRiskScore > 70 ? 'text-rose-400' : 'text-slate-300'}>{c.syndicateRiskScore}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full ${c.syndicateRiskScore > 70 ? 'bg-rose-500' : c.syndicateRiskScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${c.syndicateRiskScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Overcharge Callout & Whistle Trigger */}
                <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs">
                  {isHighOvercharge ? (
                    <span className="text-[11px] text-rose-400 font-bold">
                      ⚠️ +৳{overcharge} over fair cap
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-medium">
                      ✓ Compliant with fair price
                    </span>
                  )}

                  <Link 
                    to="/whistle" 
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700"
                  >
                    {lang === 'bn' ? 'রিপোর্ট' : 'Report'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inter-Market Spread Comparison Table */}
        <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'bn' ? 'কাওরান বাজার পাইকারি আড়ত বনাম খুচরা বাজার মূল্যের ব্যবধান' : 'Wholesale Arat vs Urban Retail Spread Matrix'}</span>
            </h3>
            <span className="text-xs text-slate-400">Audited Today</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Market Location</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Onion (পেঁয়াজ)</th>
                  <th className="p-3">Potato (আলু)</th>
                  <th className="p-3">Broiler Chicken</th>
                  <th className="p-3">Eggs (১ হালি)</th>
                  <th className="p-3 text-right">Spread vs Karwan Arat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {marketSpreads.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lang === 'bn' ? m.marketNameBn : m.marketName}</span>
                    </td>
                    <td className="p-3 text-slate-400">{m.type}</td>
                    <td className="p-3">৳{m.onionPrice}</td>
                    <td className="p-3">৳{m.potatoPrice}</td>
                    <td className="p-3">৳{m.broilerPrice}</td>
                    <td className="p-3">৳{m.eggHali}</td>
                    <td className="p-3 text-right">
                      {m.spreadVsKarwanBazarPct ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          +{m.spreadVsKarwanBazarPct}%
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Baseline (0%)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
