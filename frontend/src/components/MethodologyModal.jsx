import React from 'react';
import { X, Scale, Calculator, ShieldCheck, CheckCircle2, BookOpen, AlertOctagon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MethodologyModal({ isOpen, onClose }) {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#090e1c] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                Algorithmic Integrity & Governance
              </span>
              <h3 className="text-xl font-black text-white">
                {lang === 'bn' ? 'সরকারি ন্যায্যমূল্য নির্ধারণ পদ্ধতি ও সূত্র' : 'Government Fair Price (DAM) Methodology'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Formula Box */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 shadow-lg">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
            <Calculator className="w-4 h-4" />
            <span>The Statutory Pricing Equation (কৃষি বিপণন আইন ২০১৮)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto">
            Fair Retail Price = Farmgate Base + Packaging + Cold Storage/Wastage + Freight/Tolls + Max 12% Retail Margin
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            The Department of Agricultural Marketing (DAM), under the Ministry of Agriculture, establishes daily fair retail ceilings based on primary grower costs collected at production belts (e.g. Bogura, Rangpur, Jashore) combined with verified logistical expenses.
          </p>
        </div>

        {/* 4 Cost Breakdown Components */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Mathematical Component Weights:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">1. Farmgate Base Cost</span>
              <p className="text-slate-400 text-[11px]">
                Fertilizer, seed, irrigation, labor, and fair grower margin (typically 20% on production cost).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">2. Transport & Highway Tolls</span>
              <p className="text-slate-400 text-[11px]">
                Diesel freight rate per truck divided by tonnage, plus Padma/Jamuna bridge tolls and fuel surcharge.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">3. Cold Storage & Transit Wastage</span>
              <p className="text-slate-400 text-[11px]">
                Preservation charges (৳৫-৭/kg for potatoes) + 3-5% allowance for perishable spoilage during transit.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">4. Statutory Retail Markup Cap</span>
              <p className="text-slate-400 text-[11px]">
                Regulated at maximum 8-12% above Karwan Bazar wholesale arat auction price for neighborhood vendors.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Enforcement */}
        <div className="mt-6 p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3 text-xs">
          <AlertOctagon className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-rose-300">Consumer Rights Protection Act 2009 (Section 40)</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Charging above the displayed fair price or creating artificial bottlenecks is a criminal offense punishable by fine and imprisonment. Citizens who file verified complaints through BazaarPulse BD are legally entitled to <strong>25% of the penalty amount</strong> recovered by mobile court magistrates.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950/40"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
}
