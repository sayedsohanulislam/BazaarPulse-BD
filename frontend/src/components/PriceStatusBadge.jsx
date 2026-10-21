import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

export default function PriceStatusBadge({ retailPrice, fairPriceMax, showPercent = true }) {
  if (!retailPrice || !fairPriceMax) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
        N/A
      </span>
    );
  }

  const diff = retailPrice - fairPriceMax;
  const markupPercent = fairPriceMax > 0 ? ((diff / fairPriceMax) * 100) : 0;

  if (diff <= 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        <span>Fair Price</span>
      </span>
    );
  }

  if (markupPercent <= 10) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/30">
        <AlertTriangle className="w-3 h-3 text-amber-400" />
        <span>Slightly High</span>
        {showPercent && <span className="opacity-90">+{markupPercent.toFixed(0)}%</span>}
      </span>
    );
  }

  if (markupPercent <= 25) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-500/15 text-orange-400 border border-orange-500/30">
        <AlertCircle className="w-3 h-3 text-orange-400" />
        <span>Overpriced</span>
        {showPercent && <span className="opacity-90">+{markupPercent.toFixed(0)}%</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
      <AlertOctagon className="w-3 h-3 text-rose-400" />
      <span>Syndicate Gouging</span>
      {showPercent && <span className="opacity-90">+{markupPercent.toFixed(0)}%</span>}
    </span>
  );
}
