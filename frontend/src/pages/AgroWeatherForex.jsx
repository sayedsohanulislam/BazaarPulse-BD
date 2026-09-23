import React from 'react';
import { 
  CloudSun, DollarSign, Thermometer, Droplets, Wind, 
  TrendingUp, ShieldCheck, ArrowRight, RefreshCw, AlertCircle,
  Sparkles, Compass, Globe2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function AgroWeatherForex() {
  const { lang, t } = useLanguage();
  const { ticker, forceRefresh, isRefreshing, addToast } = useBazaar();

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex || { usdToBdt: 122.86 };
  const weather = agro.agroWeather || { boguraTempC: 25.4, humidityPct: 96, precipMm: 0, windKmh: 10.7 };
  const parity = agro.importParityBenchmarks || { soybeanOilLandedBdt: 134, lentilsLandedBdt: 89, sugarLandedBdt: 68 };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <CloudSun className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{lang === 'bn' ? 'কৃষি আবহাওয়া ও বৈদেশিক মুদ্রা বিনিময় নজরদারি' : 'Agrometeorological Harvest & Import Parity Radar'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {lang === 'bn' ? 'বগুড়া কৃষিক্ষেত্রের বৃষ্টিপাত ও ডলার রেটের প্রভাব' : 'Bogura Harvest Weather & USD/BDT Forex Benchmarks'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'ওপেন-মেটিও লাইভ স্যাটেলাইট ওয়েদার এবং আমদানি তেলের ডলার ল্যান্ডেড কস্ট মডেলিং।' 
                  : 'Automated harvest disruption analysis and imported essential landed cost parity.'}
              </p>
            </div>

            <button
              onClick={forceRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition shadow-lg shadow-amber-950/40 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : (lang === 'bn' ? 'লাইভ এপিআই সিঙ্ক' : 'Force Telemetry Sync')}</span>
            </button>
          </div>
        </div>

        {/* Dual Cards Grid: Agro Weather & Forex */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Agro Weather Telemetry Card */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CloudSun className="w-4 h-4" />
                <span>{lang === 'bn' ? 'বগুড়া ও উত্তরবঙ্গ কৃষিক্ষেত্র আবহাওয়া' : 'Bogura & Northern Agrometeorology Feed'}</span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <span className="text-4xl sm:text-5xl font-black text-white">{weather.boguraTempC || 25.4}°C</span>
                  <span className="text-xs text-slate-400 block mt-1">Open-Meteo Satellite Real-Time Feed</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                  weather.supplyDisruptionRisk === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                  weather.supplyDisruptionRisk === 'MODERATE' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {weather.supplyDisruptionRisk || 'LOW'} Supply Risk
                </span>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  <span>Humidity</span>
                </span>
                <strong className="text-white text-base mt-1 block">{weather.humidityPct || 96}%</strong>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span>Precipitation</span>
                </span>
                <strong className="text-white text-base mt-1 block">{weather.precipMm || 0} mm</strong>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3 text-slate-400" />
                  <span>Wind Speed</span>
                </span>
                <strong className="text-white text-base mt-1 block">{weather.windKmh || 10.7} km/h</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">{lang === 'bn' ? 'বর্তমান ফসলি অবস্থা ও মহাসড়ক পরিবহন:' : 'Harvest Condition & Highway Corridors:'}</span>
                <p className="mt-0.5 leading-relaxed text-slate-400">
                  {weather.harvestStatus || 'Favorable harvest and road transport conditions across northern highway corridors.'}
                </p>
              </div>
            </div>
          </div>

          {/* Forex & Landed Import Cost Parity Card */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <DollarSign className="w-4 h-4" />
                <span>{lang === 'bn' ? 'আমদানি প্যারিটি ও ডলার রেট প্রভাব' : 'Import Parity & Currency Telemetry'}</span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400">৳{forex.usdToBdt}</span>
                  <span className="text-xs text-slate-400 block mt-1">1 USD to BDT Spot Exchange Rate</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Open Exchange Rates
                </span>
              </div>
            </div>

            {/* Landed Benchmarks */}
            <div className="space-y-3">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white block">Soybean Oil Landed Parity</span>
                  <span className="text-[10px] text-slate-400">Crude degummed + refining & NBR duty</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400">৳{parity.soybeanOilLandedBdt}</span>
                  <span className="text-[10px] text-slate-400 block">DAM Cap: ৳167</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white block">Canadian Lentils Landed Parity</span>
                  <span className="text-[10px] text-slate-400">Coarse lentils landed Chattogram port</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400">৳{parity.lentilsLandedBdt}</span>
                  <span className="text-[10px] text-slate-400 block">DAM Cap: ৳105</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white block">Refined Sugar Landed Parity</span>
                  <span className="text-[10px] text-slate-400">Raw import + local mill refining</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400">৳{parity.sugarLandedBdt}</span>
                  <span className="text-[10px] text-slate-400 block">DAM Cap: ৳130</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 text-center pt-1 border-t border-slate-800">
              {parity.tariffAssumption}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
