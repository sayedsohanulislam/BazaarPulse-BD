import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, TrendingUp, Truck, Warehouse, Fish, 
  CloudSun, AlertOctagon, Calculator, ShieldCheck, 
  ArrowRight, CheckCircle2, PhoneCall, Sparkles, Scale, AlertTriangle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function Home({ onOpenAuth }) {
  const { lang, t } = useLanguage();
  const { ticker, commodities, loading } = useBazaar();
  const [search, setSearch] = useState('');

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex || { usdToBdt: 122.86 };
  const agroWeather = agro.agroWeather || {};
  const gainers = ticker?.topGainers || [];
  const decliners = ticker?.topDecliners || [];

  const filteredCommodities = (commodities || []).filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.nameBn.includes(search)
  ).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{lang === 'bn' ? 'জাতীয় নিত্যপণ্য নজরদারি ও ন্যায্যমূল্য' : 'National Fair Price Intelligence'}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {lang === 'bn' ? 'কাওরান বাজার টু পাড়া-মহল্লা: সঠিক বাজারদর' : 'Fair Price Benchmark & Anti-Gouging Intelligence'}
              </h1>
              <p className="mt-4 text-base text-slate-300 max-w-2xl leading-relaxed">
                {lang === 'bn' 
                  ? 'কৃষি বিপণন অধিদপ্তরের (DAM) দৈনিক ন্যায্যমূল্য, টিসিবি খোলা ট্রাকের অবস্থান, কাওরান বাজারের পাইকারি আড়ত রেট এবং সিন্ডিকেটের কারসাজি প্রতিরোধে সরাসরি ভোক্তা অধিকার অভিযোগ।'
                  : 'Daily fair price benchmarks from the Department of Agricultural Marketing (DAM), live TCB subsidized truck tracking, wholesale vs retail margins, and direct DNCRP magistrate reporting.'}
              </p>

              {/* Quick Search */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'আলু, পেঁয়াজ, সয়াবিন তেল, ডিম, ব্রয়লার সার্চ করুন...' : 'Search potato, onion, soybean oil, egg, chicken...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-grow bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
                />
                <Link
                  to="/heatmap"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50"
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TCB OMS Truck Tracker</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DNCRP 13346 Helpline</span>
                </span>
              </div>
            </div>

            {/* Quick Live Telemetry Spotlight Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* USD/BDT Import Parity */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl">
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
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {lang === 'bn' ? 'সক্রিয় টিসিবি ট্রাক' : 'Active TCB Trucks'}
                  </span>
                  <Truck className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-2 text-2xl font-black text-cyan-300">
                  ৫০+ <span className="text-xs font-normal text-slate-400">{lang === 'bn' ? 'পয়েন্টে' : 'Points'}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {lang === 'bn' ? 'তেল ৳১০০, ডাল ৳৬০, চিনি ৳৭০ ভর্তুকি মূল্যে।' : 'Subsidized oil ৳100, lentils ৳60, sugar ৳70.'}
                </p>
              </div>

              {/* Agro Weather Impact */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl">
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
              <div className="bg-gradient-to-br from-rose-950/60 to-slate-800 border border-rose-500/40 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
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

      {/* Top Gainers & Market Movers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'bn' ? 'আজকের শীর্ষ মূল্যবৃদ্ধি ও স্থিতিশীল পণ্য' : 'Daily Price Surge & Market Movers'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' ? 'গতকালের তুলনায় পাইকারি ও খুচরা বাজারের তারতম্য' : 'Wholesale vs retail price changes compared to yesterday'}
            </p>
          </div>

          <Link
            to="/heatmap"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সম্পূর্ণ গ্রিড দেখুন' : 'View Full Matrix'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gainers.slice(0, 4).map((item, idx) => (
            <div key={idx} className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 hover:border-slate-600 transition">
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

              <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-slate-700/50">
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
          ))}
        </div>
      </div>

      {/* Fair Price Quick Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
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

            <Link
              to="/budget"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'bn' ? 'মাসিক বাজার খরচ গণনা' : 'Family Budget Calculator'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCommodities.map(c => {
              const isOvercharging = c.retailAvgPrice > c.damFairPriceMax;
              return (
                <div key={c.id || c._id} className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between">
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

                  {isOvercharging && (
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400 flex items-center justify-between">
                      <span>⚠️ {c.retailAvgPrice - c.damFairPriceMax} ৳ {lang === 'bn' ? 'বেশি নেওয়া হচ্ছে' : 'over fair cap'}</span>
                      <Link to="/whistle" className="underline hover:text-white">{lang === 'bn' ? 'রিপোর্ট' : 'Report'}</Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
