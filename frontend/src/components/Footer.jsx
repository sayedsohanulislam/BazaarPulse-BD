import React from 'react';
import { ShoppingBag, ShieldCheck, HeartHandshake, PhoneCall, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">{t('brand')}</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {lang === 'bn' 
              ? 'কৃষি বিপণন অধিদপ্তর (DAM), টিসিবি (TCB) এবং জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) এর তথ্যের ওপর ভিত্তি করে নির্মিত উন্মুক্ত নাগরিক প্ল্যাটফর্ম।'
              : 'Open civic market intelligence platform integrating DAM fair prices, TCB OMS trucks, and DNCRP anti-gouging enforcement.'}
          </p>
        </div>

        {/* Essential Agencies */}
        <div>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            {lang === 'bn' ? 'সরকারি নজরদারি সংস্থা' : 'Regulatory Agencies'}
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li className="flex items-center gap-1.5 hover:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>DNCRP (ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর)</span>
            </li>
            <li className="flex items-center gap-1.5 hover:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>DAM (কৃষি বিপণন অধিদপ্তর)</span>
            </li>
            <li className="flex items-center gap-1.5 hover:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>TCB (ট্রেডিং কর্পোরেশন অব বাংলাদেশ)</span>
            </li>
            <li className="flex items-center gap-1.5 hover:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>BSTI (ডিজিটাল ওজন ও পরিমাপ মানদণ্ড)</span>
            </li>
          </ul>
        </div>

        {/* Consumer Hotlines */}
        <div>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            {lang === 'bn' ? 'জরুরি ভোক্তা হটলাইন' : 'Consumer Hotlines'}
          </h4>
          <div className="space-y-2 text-[11px]">
            <a href="tel:13346" className="block bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:border-slate-700 transition">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>13346 (DNCRP Hotline)</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">অতিরিক্ত দাম ও প্রতারণার অভিযোগ</div>
            </a>
            <a href="tel:16122" className="block bg-slate-900 border border-slate-800 p-2 rounded-xl hover:border-slate-700 transition">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3" />
                <span>16122 (DAM Krishi Hotline)</span>
              </div>
              <div className="text-[10px] text-slate-500">কৃষি পণ্য বাজারদর ও কোল্ড স্টোরেজ</div>
            </a>
          </div>
        </div>

        {/* Civic Commitment */}
        <div>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            {lang === 'bn' ? 'নাগরিক সচেতনতা' : 'Civic Commitment'}
          </h4>
          <p className="text-[11px] leading-relaxed text-slate-400">
            {lang === 'bn'
              ? 'ন্যায্যমূল্যের রশিদ সংগ্রহ করুন। পণ্য কেনার সময় ডিজিটাল স্কেলের শূন্য (Zero tare) যাচাই করুন। অতিরিক্ত দাম নিলে তাৎক্ষণিক ১৩৩৪৬ নম্বরে কল করুন।'
              : 'Always demand a sales receipt. Verify digital scale zero-tare before weighing. Report price gouging directly via 13346.'}
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-900 text-center text-[10px] text-slate-500">
        © 2026 BazaarPulse BD. Built for the citizens, farmers, and fair traders of Bangladesh.
      </div>
    </footer>
  );
}
