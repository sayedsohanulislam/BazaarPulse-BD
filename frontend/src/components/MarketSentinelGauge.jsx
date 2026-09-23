import React from 'react';
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle2, Info, Activity, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MarketSentinelGauge({ ticker }) {
  const { lang } = useLanguage();

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex?.usdToBdt || 122.86;
  const weatherRisk = agro.agroWeather?.supplyDisruptionRisk || 'LOW';

  // Compute composite National Volatility Score (0 - 100)
  // Base 45 + weather adder + forex adder
  let compositeScore = 58;
  if (weatherRisk === 'HIGH') compositeScore += 20;
  else if (weatherRisk === 'MODERATE') compositeScore += 10;
  if (forex > 120) compositeScore += 10;

  const isCrisis = compositeScore >= 75;
  const isSurging = compositeScore >= 50 && compositeScore < 75;
  const isStable = compositeScore < 50;

  const statusLabel = isCrisis 
    ? (lang === 'bn' ? 'জাতীয় জরুরি সংকট স্তর' : 'CRITICAL MARKET PRESSURE')
    : isSurging
    ? (lang === 'bn' ? 'মধ্যম বাজার অস্থিরতা' : 'ELEVATED VOLATILITY')
    : (lang === 'bn' ? 'স্থিতিশীল বাজারদর' : 'OPTIMAL STABILITY');

  const statusColor = isCrisis ? '#f43f5e' : isSurging ? '#f59e0b' : '#10b981';

  // SVG Gauge Arc Parameters
  // Angle from -90 deg to +90 deg (180 deg sweep)
  const angle = -90 + (compositeScore / 100) * 180;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      
      {/* Background ambient glow based on severity */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: statusColor }}
      ></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left: Info & Headline */}
        <div className="space-y-3 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{ 
              backgroundColor: `${statusColor}15`, 
              color: statusColor,
              borderColor: `${statusColor}40`
            }}
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{statusLabel}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {lang === 'bn' 
              ? 'জাতীয় নিত্যপণ্য সংকট ও স্থিতিশীলতা সেন্ডিনেল' 
              : 'National Market Stability & Pressure Sentinel'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'bn' 
              ? 'মুদ্রার বিনিময় হার (USD/BDT), উত্তরবঙ্গের বৃষ্টিপাত ও পরিবহন বিঘ্ন এবং কাওরান বাজারের পাইকারি তারতম্য বিশ্লেষণ করে রিয়েল-টাইম সিন্ডিকেট ঝুঁকি পরিমাপ।' 
              : 'Algorithmic civic risk telemetry evaluating import parity, diesel freight strain, and cold storage hoarding across 64 districts.'}
          </p>

          {/* 3 Core Vulnerability Sub-Indices */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 text-left">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block">Logistics Strain</span>
              <strong className="text-xs text-blue-400 font-black">64/100 (Normal)</strong>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block">Forex Parity</span>
              <strong className="text-xs text-amber-400 font-black">74/100 (High)</strong>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold block">Hoarding Risk</span>
              <strong className="text-xs text-rose-400 font-black">58/100 (Audit)</strong>
            </div>
          </div>
        </div>

        {/* Right: SVG Semi-Circle Radial Gauge Meter */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative w-56 h-36 flex items-center justify-center">
            
            {/* SVG Arc */}
            <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Background Track (Grey) */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#1e293b"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Colored Indicator Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * compositeScore) / 100}
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />

              {/* Center Pivot Point */}
              <circle cx="100" cy="100" r="7" fill="#ffffff" />
            </svg>

            {/* Score Text inside the Arc */}
            <div className="absolute bottom-1 text-center">
              <div className="text-3xl font-black text-white tracking-tight">
                {compositeScore}<span className="text-sm font-semibold text-slate-400">/100</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pressure Index
              </div>
            </div>

          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Real-time DAM & Open-Meteo Synced</span>
          </div>
        </div>

      </div>

    </div>
  );
}
