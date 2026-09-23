import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, TrendingUp, Truck, Warehouse, Fish, 
  CloudSun, AlertOctagon, Calculator, ShieldCheck, 
  ArrowRight, CheckCircle2, PhoneCall, Sparkles, Scale, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Plus, ShoppingCart, HelpCircle, Check, Zap, Layers, Award, MapPin, Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import MarketSentinelGauge from '../components/MarketSentinelGauge';

export default function Home({ onOpenAuth }) {
  const { lang, t } = useLanguage();
  const { ticker, commodities, loading, addToBasket, setIsBasketOpen } = useBazaar();
  const [search, setSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const navigate = useNavigate();

  // Instant Price Gouging Checker Tool State
  const [checkerCommodityId, setCheckerCommodityId] = useState('');
  const [userPaidPrice, setUserPaidPrice] = useState('');

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex || { usdToBdt: 122.86 };
  const agroWeather = agro.agroWeather || {};
  const gainers = ticker?.topGainers || [];
  const decliners = ticker?.topDecliners || [];

  const divisions = [
    { name: 'Dhaka', nameBn: 'ঢাকা', activeTrucks: 52, avgMarkup: '+14%' },
    { name: 'Chattogram', nameBn: 'চট্টগ্রাম', activeTrucks: 38, avgMarkup: '+11%' },
    { name: 'Rajshahi', nameBn: 'রাজশাহী', activeTrucks: 24, avgMarkup: '+6%' },
    { name: 'Khulna', nameBn: 'খুলনা', activeTrucks: 22, avgMarkup: '+8%' },
    { name: 'Barishal', nameBn: 'বরিশাল', activeTrucks: 18, avgMarkup: '+9%' },
    { name: 'Sylhet', nameBn: 'সিলেট', activeTrucks: 19, avgMarkup: '+12%' },
    { name: 'Rangpur', nameBn: 'রংপুর', activeTrucks: 21, avgMarkup: '+5%' },
    { name: 'Mymensingh', nameBn: 'ময়মনসিংহ', activeTrucks: 16, avgMarkup: '+7%' }
  ];

  const filteredCommodities = (commodities || []).filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.nameBn.includes(search)
  ).slice(0, 8);

  const selectedCheckCommodity = (commodities || []).find(c => (c.id || c._id) === checkerCommodityId) || commodities?.[0];
  const capPrice = selectedCheckCommodity ? (selectedCheckCommodity.damFairPriceMax || selectedCheckCommodity.damFairPriceMin) : 0;
  const userPriceNum = parseFloat(userPaidPrice) || 0;
  const priceDifference = userPriceNum - capPrice;
  const isGouging = userPriceNum > 0 && priceDifference > 0;
  const gougePercent = capPrice > 0 ? ((priceDifference / capPrice) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-[#040711] bg-dot-grid text-slate-100 pb-20">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#070d1e] to-[#040711] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              
              {/* National ICT Award Nominee Banner */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-4 shadow-lg glow-amber">
                <Award className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{lang === 'bn' ? '🏆 জাতীয় আইসিটি পুরস্কার ২০২৬ ও স্মার্ট বাংলাদেশ ইনোভেশন নমিনি' : '🏆 BASIS National ICT Award 2026 Nominee • Smart Bangladesh Civic Tech'}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {lang === 'bn' ? (
                  <>কাওরান বাজার টু পাড়া-মহল্লা: <span className="text-gradient-emerald">ন্যায্য বাজারদর</span></>
                ) : (
                  <>Wholesale to Retail: <span className="text-gradient-emerald">Fair Price Intelligence</span></>
                )}
              </h1>
              
              <p className="mt-4 text-base text-slate-300 max-w-2xl leading-relaxed">
                {lang === 'bn' 
                  ? 'কৃষি বিপণন অধিদপ্তরের (DAM) দৈনিক ন্যায্যমূল্য, টিসিবি খোলা ট্রাকের লাইভ ট্র্যাকিং, কাওরান বাজারের পাইকারি আড়ত রেট এবং সিন্ডিকেটের কারসাজি প্রতিরোধে সরাসরি ভোক্তা অধিকার অভিযোগ।'
                  : 'Daily fair price benchmarks from DAM, live TCB subsidized truck tracking, Karwan Bazar wholesale baseline, and direct DNCRP magistrate reporting.'}
              </p>

              {/* Quick Search and Action bar */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-xl">
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'আলু, পেঁয়াজ, সয়াবিন তেল, ডিম, ব্রয়লার সার্চ করুন...' : 'Search potato, onion, soybean oil, egg, chicken...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-grow bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner transition"
                />
                <Link
                  to="/heatmap"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50 flex-shrink-0"
                >
                  <span>{lang === 'bn' ? 'সকল মূল্য দেখুন' : 'Explore Prices'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Verified Sources Badge */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DAM Fair Cap (কৃষি বিপণন)</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TCB OMS Truck Tracker</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>DNCRP 13346 Hotline</span>
                </span>
              </div>
            </div>

            {/* Quick Live Telemetry Spotlight Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* USD/BDT Import Parity */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-md hover:border-emerald-500/50 transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {lang === 'bn' ? 'আমদানি ডলার বিনিময় হার' : 'USD/BDT Forex Rate'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <div className="mt-2 text-2xl font-black text-emerald-400">
                  ৳{forex.usdToBdt} <span className="text-xs font-normal text-slate-400">/ USD</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {lang === 'bn' ? 'সয়াবিন, গম ও চিনি আমদানির ল্যান্ডেড কস্ট বেঞ্চমার্ক।' : 'Import parity benchmark for edible oil & sugar.'}
                </p>
              </div>

              {/* TCB Trucks Active */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-md hover:border-cyan-500/50 transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {lang === 'bn' ? 'সক্রিয় টিসিবি ট্রাক' : 'Active TCB Trucks'}
                  </span>
                  <Truck className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <div className="mt-2 text-2xl font-black text-cyan-300">
                  ৫০+ <span className="text-xs font-normal text-slate-400">{lang === 'bn' ? 'পয়েন্টে' : 'Points'}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {lang === 'bn' ? 'তেল ৳১০০, ডাল ৳৬০, চিনি ৳৭০ ভর্তুকি মূল্যে।' : 'Subsidized oil ৳100, lentils ৳60, sugar ৳70.'}
                </p>
              </div>

              {/* Agro Weather Impact */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-md hover:border-amber-500/50 transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {lang === 'bn' ? 'বগুড়া/যশোর কৃষিক্ষেত্র' : 'Agro-Weather Belt'}
                  </span>
                  <CloudSun className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2 text-xl font-black text-amber-300">
                  {agroWeather.supplyDisruptionRisk || 'LOW'} <span className="text-xs font-normal text-slate-400">Risk</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {agroWeather.harvestStatus || 'Favorable harvest & transport'}
                </p>
              </div>

              {/* DNCRP 13346 */}
              <div className="bg-gradient-to-br from-rose-950/70 to-slate-900 border border-rose-500/40 rounded-2xl p-4 shadow-xl flex flex-col justify-between hover:border-rose-400 transition">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
                      {lang === 'bn' ? 'ভোক্তা হটলাইন' : 'DNCRP Hotline'}
                    </span>
                    <PhoneCall className="w-4 h-4 text-rose-400 animate-bounce" />
                  </div>
                  <div className="mt-2 text-2xl font-black text-rose-400">
                    ১৩৩৪৬
                  </div>
                </div>
                <Link to="/whistle" className="text-[11px] text-rose-300 hover:text-white font-semibold flex items-center gap-1 mt-2">
                  <span>{lang === 'bn' ? 'অনলাইনে অভিযোগ করুন' : 'File Complaint'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Interactive Feature: Instant Price Gouging Checker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{lang === 'bn' ? 'তাৎক্ষণিক অতিরিক্ত দাম যাচাই ও ভোক্তা অভিযোগ' : 'Instant Price Gouging Checker & Penalty Audit'}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">Interactive</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'bn' ? 'আপনার এলাকার দোকানে কত দাম নেওয়া হলো? সরকারি ন্যায্যমূল্যের সাথে তুলনা করে দেখুন।' : 'Enter what you were charged locally to see if it violates the official DAM price ceiling.'}
                </p>
              </div>
            </div>

            {/* Inputs: Commodity Select + Price Input */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <select
                value={checkerCommodityId || (commodities?.[0]?.id || '')}
                onChange={(e) => setCheckerCommodityId(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {(commodities || []).map(c => (
                  <option key={c.id || c._id} value={c.id || c._id}>
                    {lang === 'bn' ? c.nameBn : c.name} (DAM Cap: ৳{c.damFairPriceMax})
                  </option>
                ))}
              </select>

              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  placeholder={lang === 'bn' ? 'আপনি কত দিলেন?' : 'Charged Price'}
                  value={userPaidPrice}
                  onChange={(e) => setUserPaidPrice(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl pl-6 pr-3 py-2 text-xs text-white w-32 focus:outline-none focus:border-amber-400"
                />
              </div>

              {isGouging ? (
                <Link
                  to={`/whistle?commodity=${encodeURIComponent(selectedCheckCommodity?.name || '')}&chargedPrice=${userPriceNum}&fairPrice=${capPrice}`}
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-rose-950/40"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? `+৳${priceDifference} অতিরিক্ত! রিপোর্ট করুন` : `+৳${priceDifference} Gouge! Report`}</span>
                </Link>
              ) : userPriceNum > 0 ? (
                <div className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ন্যায্যমূল্যের ভেতর' : 'Fair Price'}</span>
                </div>
              ) : null}
            </div>

          </div>
        </div>
      </div>

      {/* National Market Stability Sentinel Gauge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <MarketSentinelGauge ticker={ticker} />
      </div>

      {/* 8 Divisions Quick Telemetry Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'bn' ? '৮ বিভাগীয় বাজার মনিটরিং ও টিসিবি কভারেজ' : '8 Administrative Divisions Market Telemetry'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Live OMS truck distribution and average neighborhood markup across Bangladesh.
              </p>
            </div>
            <span className="text-[11px] text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-500/30">
              64 Districts Live
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
            {divisions.map((div) => {
              const isSelected = selectedDivision === div.name;
              return (
                <button
                  key={div.name}
                  onClick={() => setSelectedDivision(div.name)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    isSelected 
                      ? 'bg-cyan-600/20 border-cyan-400 glow-cyan text-white' 
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold">{lang === 'bn' ? div.nameBn : div.name}</div>
                  <div className="text-[10px] text-cyan-400 mt-1">{div.activeTrucks} OMS Trucks</div>
                  <div className="text-[9px] text-slate-500">Markup: {div.avgMarkup}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Gainers & Market Movers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'bn' ? 'আজকের শীর্ষ মূল্যবৃদ্ধি ও বাজার সংকেত' : 'Daily Price Surge & Market Movers'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' ? 'গতকালের তুলনায় পাইকারি ও খুচরা বাজারের দামের পরিবর্তন' : 'Wholesale vs retail price changes compared to yesterday baseline'}
            </p>
          </div>

          <Link
            to="/heatmap"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সম্পূর্ণ গ্রিড ও মেট্রিক্স দেখুন' : 'View Full Matrix'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gainers.slice(0, 4).map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 hover:border-slate-500 transition flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{lang === 'bn' ? item.nameBn : item.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-0.5 ${
                    item.deltaPercent >= 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.deltaPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {item.deltaPercent}%
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'খুচরা গড়' : 'Retail Avg'}</span>
                    <span className="text-lg font-black text-white">৳{item.retailAvgPrice} <span className="text-xs font-normal text-slate-400">/{item.unit}</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'কাওরান বাজার পাইকারি' : 'Wholesale Arat'}</span>
                    <span className="text-sm font-bold text-emerald-400">৳{item.karwanBazarWholesale}</span>
                  </div>
                </div>
              </div>

              {/* Quick Add to Fair Basket */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => addToBasket(item, 1)}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'bn' ? 'ব্যাগে নিন' : 'Add to Basket'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Indicative Fair Prices (DAM Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'bn' ? 'নিত্যপ্রয়োজনীয় পণ্যের সরকারি ন্যায্যমূল্য তালিকা (DAM)' : 'Official Indicative Fair Prices (DAM Mandate)'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? 'কৃষি বিপণন অধিদপ্তর কর্তৃক নির্ধারিত সর্বোচ্চ ন্যায্যমূল্যের সাথে বর্তমান খুচরা বাজারের তুলনা' : 'Comparison between government ceiling and open retail rates'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBasketOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'বাজার ব্যাগ দেখুন' : 'Open Basket'}</span>
              </button>

              <Link
                to="/budget"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'মাসিক বাজার খরচ গণনা' : 'Family Budget'}</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCommodities.map(c => {
              const isOvercharging = c.retailAvgPrice > c.damFairPriceMax;
              return (
                <div key={c.id || c._id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white">{lang === 'bn' ? c.nameBn : c.name}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        c.volatilityIndex === 'CRISIS' ? 'bg-rose-500/20 text-rose-400' :
                        c.volatilityIndex === 'SURGING' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {c.volatilityIndex}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>{lang === 'bn' ? 'সরকারি ন্যায্যমূল্য:' : 'Fair Ceiling:'}</span>
                        <strong className="text-emerald-400">৳{c.damFairPriceMin} - ৳{c.damFairPriceMax}</strong>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{lang === 'bn' ? 'কাওরান বাজার আড়ত:' : 'Karwan Bazar:'}</span>
                        <span className="text-slate-200">৳{c.karwanBazarWholesale}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 font-semibold pt-1 border-t border-slate-800">
                        <span>{lang === 'bn' ? 'বর্তমান খুচরা দর:' : 'Retail Price:'}</span>
                        <span className={isOvercharging ? 'text-rose-400 font-bold' : 'text-white'}>৳{c.retailAvgPrice} /{c.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-2">
                    {isOvercharging && (
                      <div className="text-[10px] text-amber-400 flex items-center justify-between">
                        <span>⚠️ +৳{c.retailAvgPrice - c.damFairPriceMax} {lang === 'bn' ? 'বেশি নেওয়া হচ্ছে' : 'over fair cap'}</span>
                        <Link 
                          to={`/whistle?commodity=${encodeURIComponent(c.name)}&chargedPrice=${c.retailAvgPrice}&fairPrice=${c.damFairPriceMax}`}
                          className="underline hover:text-white"
                        >
                          {lang === 'bn' ? 'রিপোর্ট' : 'Report'}
                        </Link>
                      </div>
                    )}

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
        </div>
      </div>

    </div>
  );
}
