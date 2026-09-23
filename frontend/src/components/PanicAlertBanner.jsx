import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function PanicAlertBanner() {
  const { lang } = useLanguage();
  const { ticker } = useBazaar();

  const highRiskItems = ticker?.highSyndicateItems || [];
  if (highRiskItems.length === 0) return null;

  const firstItem = highRiskItems[0];

  return (
    <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-amber-950 border-b border-amber-600/40 text-amber-200 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>
            <strong className="text-white">
              {lang === 'bn' ? 'বাজার সিন্ডিকেট ও কৃত্রিম সংকট সতর্কতা:' : 'Syndicate & Price Volatility Alert:'}
            </strong>{' '}
            {lang === 'bn' 
              ? `${firstItem.nameBn}-এর খুচরা বাজারে অতিরিক্ত মুনাফা ও মজুতদারি লক্ষ্য করা গেছে। কৃষি বিপণন অধিদপ্তরের নির্ধারিত সর্বোচ্চ দাম ৳${firstItem.damFairPriceMax}/${firstItem.unit}।`
              : `High margin volatility detected in ${firstItem.name}. Government DAM fair cap is ৳${firstItem.damFairPriceMax}/${firstItem.unit}.`}
          </span>
        </div>

        <Link
          to="/whistle"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-white bg-amber-900/40 hover:bg-amber-900/80 px-2.5 py-1 rounded-lg border border-amber-500/40 transition shrink-0"
        >
          <span>{lang === 'bn' ? 'অতিরিক্ত দামের রিপোর্ট করুন' : 'File Gouging Report'}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
