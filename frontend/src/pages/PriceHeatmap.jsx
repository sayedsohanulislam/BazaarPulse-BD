import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Search, Filter, AlertTriangle, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, Scale, RefreshCw, Layers, MapPin,
  LayoutGrid, Table, ArrowUpDown, Plus, ShoppingCart, AlertOctagon,
  Sparkles, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { analyticsApi } from '../services/api';

// Simple SVG sparkline component for price trajectory visual
function PriceSparkline({ delta = 0 }) {
  const isUp = delta >= 0;
  const strokeColor = isUp ? '#f43f5e' : '#10b981'; // red if price surge, green if stable/drop
  const points = isUp 
    ? '0,18 8,14 16,16 24,10 32,12 40,6 48,2' 
    : '0,4 8,8 16,6 24,12 32,10 40,16 48,20';

  return (
    <svg width="48" height="22" className="overflow-visible inline-block">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

// Linear graduated price range spectrum bar
function GraduatedPriceRangeSpectrum({ fairMin, fairMax, wholesale, retail, unit }) {
  const minVal = Math.min(fairMin * 0.85, wholesale * 0.9);
  const maxVal = Math.max(fairMax * 1.25, retail * 1.05);
  const range = maxVal - minVal || 1;

  const fairMinPct = Math.max(0, ((fairMin - minVal) / range) * 100);
  const fairMaxPct = Math.min(100, ((fairMax - minVal) / range) * 100);
  const retailPct = Math.min(100, Math.max(0, ((retail - minVal) / range) * 100));

  const isOver = retail > fairMax;

  return (
    <div className="mt-3 bg-slate-950/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>Arat: <strong className="text-cyan-300">৳{wholesale}</strong></span>
        <span className="text-emerald-400 font-bold">Fair Cap: ৳{fairMax}</span>
        <span className={isOver ? "text-rose-400 font-bold" : "text-white"}>Retail: ৳{retail}</span>
      </div>

      <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-visible">
        {/* Fair Price Legal Range Band (Green) */}
        <div 
          className="absolute h-full bg-emerald-500/30 border-l border-r border-emerald-400 rounded"
          style={{ left: `${fairMinPct}%`, width: `${Math.max(4, fairMaxPct - fairMinPct)}%` }}
        ></div>

        {/* Current Retail Price Glow Marker */}
        <div 
          className={`absolute -top-1 w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 shadow-lg transition-all ${
            isOver ? 'bg-rose-500 glow-rose' : 'bg-emerald-400 glow-emerald'
          }`}
          style={{ left: `${retailPct}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-[9px] text-slate-500 pt-0.5">
        <span>Wholesale Baseline</span>
        <span className={isOver ? "text-rose-400" : "text-emerald-400"}>
          {isOver ? `+৳${retail - fairMax} over ceiling` : 'Compliant'}
        </span>
      </div>
    </div>
  );
}

export default function PriceHeatmap() {
  const { lang, t } = useLanguage();
  const { commodities, loading, forceRefresh, isRefreshing, addToBasket, setIsBasketOpen } = useBazaar();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [marketSpreads, setMarketSpreads] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortBy, setSortBy] = useState('overcharge'); // 'overcharge' | 'priceDesc' | 'priceAsc' | 'risk'
  const [onlyOvercharged, setOnlyOvercharged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    analyticsApi.getMarketSpread().then(res => {
      if (res.data?.success) setMarketSpreads(res.data.data);
    }).catch(() => {});
  }, []);

  const categories = [
    'ALL', 'Vegetables', 'Spices', 'Oils & Fats', 'Poultry & Meat', 'Fish', 'Grains & Rice', 'Lentils & Pulses'
  ];

  // Filtering
  let filtered = (commodities || []).filter(c => {
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.nameBn.includes(search) ||
                          (c.supplyOrigin && c.supplyOrigin.toLowerCase().includes(search.toLowerCase()));
    const isOver = c.retailAvgPrice > (c.damFairPriceMax || c.damFairPriceMin);
    const matchesOverchargeOnly = onlyOvercharged ? isOver : true;
    return matchesCat && matchesSearch && matchesOverchargeOnly;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    const aOver = a.retailAvgPrice - (a.damFairPriceMax || a.damFairPriceMin);
    const bOver = b.retailAvgPrice - (b.damFairPriceMax || b.damFairPriceMin);

    if (sortBy === 'overcharge') return bOver - aOver;
    if (sortBy === 'priceDesc') return b.retailAvgPrice - a.retailAvgPrice;
    if (sortBy === 'priceAsc') return a.retailAvgPrice - b.retailAvgPrice;
    if (sortBy === 'risk') return (b.syndicateRiskScore || 0) - (a.syndicateRiskScore || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{lang === 'bn' ? 'নিত্যপণ্যের পূর্ণাঙ্গ ন্যায্যমূল্য গ্রিড' : 'National Essential Commodities Price Heatmap'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {lang === 'bn' ? 'কৃষি বিপণন অধিদপ্তর ন্যায্যমূল্য বনাম বাজার রেট' : 'DAM Fair Price Range vs Open Retail Rates'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'কাওরান বাজার পাইকারি আড়ত, সরকারি দাম এবং সিন্ডিকেটের কৃত্রিম মূল্যবৃদ্ধির ঝুঁকি সূচক।' 
                  : 'Real-time retail comparison against Karwan Bazar wholesale baseline and syndicate risk scores.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBasketOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-slate-700 transition"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span>{lang === 'bn' ? 'বাজার ব্যাগ' : 'Fair Basket'}</span>
              </button>

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
        </div>

        {/* Filter, Search, Sort & View Switcher Bar */}
        <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'bn' ? 'পণ্যের নাম বা উৎস সার্চ করুন...' : 'Search commodity name or origin...'}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Controls: Sort, Overcharge filter, and View Mode */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Overcharge Only Toggle */}
              <button
                onClick={() => setOnlyOvercharged(prev => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  onlyOvercharged 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>{lang === 'bn' ? 'শুধু অতিরিক্ত দামের পণ্য' : 'Overcharged Only'}</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium cursor-pointer"
                >
                  <option value="overcharge" className="bg-slate-900">{t('sort_overcharge')}</option>
                  <option value="priceDesc" className="bg-slate-900">{t('sort_price_desc')}</option>
                  <option value="priceAsc" className="bg-slate-900">{t('sort_price_asc')}</option>
                  <option value="risk" className="bg-slate-900">{t('sort_risk')}</option>
                </select>
              </div>

              {/* View Mode Toggle: Grid vs Financial Table */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                    viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title={t('view_card')}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'bn' ? 'কার্ড' : 'Grid'}</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                    viewMode === 'table' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title={t('view_table')}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'bn' ? 'টেবিল' : 'Matrix'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950' 
                    : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? (lang === 'bn' ? 'সকল পণ্য' : 'All Categories') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* View 1: Card Grid Mode */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(c => {
              const fairCap = c.damFairPriceMax || c.damFairPriceMin;
              const overcharge = c.retailAvgPrice - fairCap;
              const isHighOvercharge = overcharge > 0;
              return (
                <div 
                  key={c.id || c._id}
                  className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 hover:border-slate-500 transition flex flex-col justify-between shadow-lg"
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
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">DAM Fair Cap</span>
                        <strong className="text-emerald-400">৳{c.damFairPriceMin} - ৳{c.damFairPriceMax}</strong>
                      </div>

                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Karwan Arat</span>
                        <strong className="text-cyan-300">৳{c.karwanBazarWholesale}</strong>
                      </div>

                      <div className="col-span-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Retail Average</span>
                          <span className="text-xl font-black text-white">৳{c.retailAvgPrice} <span className="text-xs font-normal text-slate-400">/{c.unit}</span></span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">7-Day Trajectory</span>
                          <PriceSparkline delta={c.deltaPercent} />
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

                    {/* Linear Graduated Price Range Spectrum */}
                    <GraduatedPriceRangeSpectrum 
                      fairMin={c.damFairPriceMin}
                      fairMax={fairCap}
                      wholesale={c.karwanBazarWholesale}
                      retail={c.retailAvgPrice}
                      unit={c.unit}
                    />
                  </div>

                  {/* Overcharge Callout & Action Triggers */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
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
                        to={`/whistle?commodity=${encodeURIComponent(c.name)}&chargedPrice=${c.retailAvgPrice}&fairPrice=${fairCap}`}
                        className="px-2 py-0.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] font-semibold border border-rose-500/30 transition"
                      >
                        {lang === 'bn' ? 'রিপোর্ট' : 'Report'}
                      </Link>
                    </div>

                    <button
                      onClick={() => addToBasket(c, 1)}
                      className="w-full py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold border border-emerald-500/30 flex items-center justify-center gap-1.5 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ন্যায্যমূল্য ব্যাগে নিন' : 'Add to Fair Basket'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View 2: Dense Financial Matrix View (Bloomberg / CoinMarketCap Style) */}
        {viewMode === 'table' && (
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Commodity</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">DAM Fair Cap</th>
                    <th className="p-3.5">Karwan Wholesale</th>
                    <th className="p-3.5">Retail Paid</th>
                    <th className="p-3.5">Overcharge Delta</th>
                    <th className="p-3.5">7-Day Trend</th>
                    <th className="p-3.5">Syndicate Risk</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filtered.map(c => {
                    const fairCap = c.damFairPriceMax || c.damFairPriceMin;
                    const overcharge = c.retailAvgPrice - fairCap;
                    const isOver = overcharge > 0;
                    return (
                      <tr key={c.id || c._id} className="hover:bg-slate-800/50 transition">
                        <td className="p-3.5">
                          <div className="font-bold text-white text-sm">{lang === 'bn' ? c.nameBn : c.name}</div>
                          <div className="text-[10px] text-slate-400">{c.supplyOrigin}</div>
                        </td>
                        <td className="p-3.5 text-slate-400">{c.category}</td>
                        <td className="p-3.5 text-emerald-400 font-bold">৳{c.damFairPriceMin} - ৳{c.damFairPriceMax}</td>
                        <td className="p-3.5 text-cyan-300 font-semibold">৳{c.karwanBazarWholesale}</td>
                        <td className="p-3.5 font-bold text-white">৳{c.retailAvgPrice} <span className="text-[10px] text-slate-500">/{c.unit}</span></td>
                        <td className="p-3.5">
                          {isOver ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              +৳{overcharge} ({((overcharge/fairCap)*100).toFixed(0)}%)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Fair (0%)
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <PriceSparkline delta={c.deltaPercent} />
                        </td>
                        <td className="p-3.5">
                          <span className={`text-xs font-bold ${c.syndicateRiskScore > 70 ? 'text-rose-400' : 'text-slate-300'}`}>
                            {c.syndicateRiskScore}%
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5">
                          <button
                            onClick={() => addToBasket(c, 1)}
                            className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-xs font-semibold transition border border-emerald-500/30"
                          >
                            + Basket
                          </button>
                          {isOver && (
                            <Link
                              to={`/whistle?commodity=${encodeURIComponent(c.name)}&chargedPrice=${c.retailAvgPrice}&fairPrice=${fairCap}`}
                              className="px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-semibold transition border border-rose-500/30"
                            >
                              Report
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inter-Market Spread Comparison Table */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'bn' ? 'কাওরান বাজার পাইকারি আড়ত বনাম খুচরা বাজার মূল্যের ব্যবধান' : 'Wholesale Arat vs Urban Retail Spread Matrix'}</span>
            </h3>
            <span className="text-xs text-slate-400">Audited Daily Feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
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
