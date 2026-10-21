import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare, AlertOctagon, Scale, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function SharePriceCardModal({ commodity, isOpen, onClose }) {
  const { lang } = useLanguage();
  const { addToast } = useBazaar();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !commodity) return null;

  const retail = commodity.retailAvgPrice || 0;
  const fair = commodity.damFairPriceMax || (retail * 0.85);
  const diff = retail - fair;
  const markup = fair > 0 ? ((diff / fair) * 100).toFixed(0) : 0;
  const isGouging = diff > 0;

  const headlineEn = `${commodity.name} is ${markup}% above fair price in Dhaka today!`;
  const headlineBn = `আজ ঢাকায় ${commodity.nameBn} সরকারি ন্যায্যমূল্যের চেয়ে ${markup}% বেশি দামে বিক্রি হচ্ছে!`;
  const shareText = `${headlineEn}\n\nRetail Price: ৳${retail}/${commodity.unit}\nDAM Fair Cap: ৳${fair}/${commodity.unit}\nOvercharge: ৳${diff}\n\nTrack real-time prices & report price gouging: https://bazaarpulse-bd.vercel.app/heatmap`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    if (addToast) addToast('Price alert copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://bazaarpulse-bd.vercel.app/')}&quote=${encodeURIComponent(headlineEn)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#090e1c] border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Share Price Alert Card</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shareable Card Graphic Preview */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b1329] to-slate-950 border-2 border-emerald-500/40 shadow-xl relative overflow-hidden">
          
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              <span>BazaarPulse BD Citizen Alert</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <div className="mt-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'bn' ? commodity.nameBn : commodity.name} • {commodity.unit}
            </div>
            <h4 className="text-xl font-black text-white mt-1 leading-snug">
              {isGouging ? (
                <>
                  <span className="text-rose-400 font-extrabold">+{markup}%</span> {lang === 'bn' ? 'অতিরিক্ত দামে বিক্রি হচ্ছে!' : 'above official fair cap!'}
                </>
              ) : (
                <span className="text-emerald-400">Selling at Government Fair Cap</span>
              )}
            </h4>
          </div>

          {/* Pricing Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Retail Price</span>
              <span className="text-lg font-black text-rose-400">৳{retail}</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">DAM Fair Cap</span>
              <span className="text-lg font-black text-emerald-400">৳{fair}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
            <span>Verified Source: DAM & Karwan Arats</span>
            <span className="text-emerald-400 font-bold">bazaarpulse-bd.vercel.app</span>
          </div>
        </div>

        {/* Action Buttons: WhatsApp, Facebook, Copy Text */}
        <div className="mt-5 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-950/40"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </button>
            <button
              onClick={handleShareFacebook}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-blue-950/40"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on Facebook</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Card Text'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
