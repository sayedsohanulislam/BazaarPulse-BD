import React, { useState } from 'react';
import { 
  Fish, Drumstick, Egg, AlertTriangle, CheckCircle2, 
  ShieldCheck, Sparkles, Scale, Info, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FishMeatMarket() {
  const { lang } = useLanguage();

  // Hilsha Grading Board
  const hilshaTiers = [
    { size: '500g - 700g (Small)', sizeBn: '৫০০ - ৭০০ গ্রাম (ছোট)', padmaRate: 950, marineRate: 750, desc: 'Tender flesh, suitable for mustard hilsha' },
    { size: '800g - 900g (Medium)', sizeBn: '৮০০ - ৯০০ গ্রাম (মাঝারি)', padmaRate: 1350, marineRate: 1050, desc: 'High oil content, authentic river aroma' },
    { size: '1.0kg - 1.2kg (Standard)', sizeBn: '১.০ - ১.২ কেজি (আদর্শ)', padmaRate: 1750, marineRate: 1400, desc: 'Premium Padma flavor, high demand' },
    { size: '1.5kg+ (Giant Grade)', sizeBn: '১.৫ কেজি+ (জায়ান্ট গ্রেড)', padmaRate: 2400, marineRate: 1950, desc: 'Collector item, festive banquets' }
  ];

  // Poultry & Egg Ticker
  const poultryItems = [
    { name: 'Tejgaon Egg Arat Wholesale (১০০ ডিমের খাঁচা)', wholesale: 1140, retailPerHali: 56, capFairHali: 50 },
    { name: 'Live Broiler Chicken (ব্রয়লার কেজি)', wholesale: 168, retailPerHali: 195, capFairHali: 180 },
    { name: 'Sonali Chicken (সোনালি মুরগি কেজি)', wholesale: 265, retailPerHali: 320, capFairHali: 290 },
    { name: 'Local Deshi Chicken (দেশি মুরগি কেজি)', wholesale: 480, retailPerHali: 580, capFairHali: 520 },
    { name: 'Beef Bone-In (হাড়সহ গরুর মাংস কেজি)', wholesale: 680, retailPerHali: 780, capFairHali: 720 },
    { name: 'Mutton / Khashi (খাসির মাংস কেজি)', wholesale: 980, retailPerHali: 1150, capFairHali: 1050 }
  ];

  // Formalin Verification Checklist
  const formalChecklist = [
    { title: 'Gill Color Test (ফুলকার রঙ)', rule: 'Natural fresh fish has bright crimson/blood-red gills. Formalin-treated fish turns dull brown, grey, or bleached pink.' },
    { title: 'The Housefly Test (মাছি বসার পরীক্ষা)', rule: 'Houseflies immediately swarm over chemical-free fish. If no flies touch the fish in a warm open stall, chemical preservation is suspected.' },
    { title: 'Eye Translucency (চোখের স্বচ্ছতা)', rule: 'Fresh fish eyes are bulging, crystal-clear and prominent. Formalin or decayed fish has sunken, clouded, milky-white pupils.' },
    { title: 'Stiff Texture vs Natural Slime (ত্বকের পিচ্ছিলতা)', rule: 'Fresh fish has a natural watery mucus coating. Chemical formalin makes skin abnormally dry, stiff and leathery like rubber.' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Fish className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>{lang === 'bn' ? 'ইলিশ গ্রেডিং, ডিমের পাইকারি আড়ত ও ফরমালিন অডিট' : 'Hilsha Grading, Poultry Auction & Formalin Verification'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'পদ্মার খাঁটি ইলিশ, তেজগাঁও ডিমের আড়ত ও মাংসের দর' : 'Padma Hilsha Weight Tiers & Tejgaon Egg Arat Tracker'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {lang === 'bn' 
                ? 'পদ্মা বনাম সাগরের ইলিশের দামের ব্যবধান, তেজগাঁও ডিমের নিলাম দর এবং রাসায়নিক ফরমালিন চেনার ঘরোয়া উপায়।' 
                : 'Padma vs marine Hilsha grade pricing, Tejgaon egg auction crate benchmarks, and formalin test guidelines.'}
            </p>
          </div>
        </div>

        {/* Padma vs Marine Hilsha Grading Board */}
        <div className="bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Fish className="w-5 h-5 text-sky-400" />
                <span>{lang === 'bn' ? 'জাতীয় ইলিশ গ্রেডিং ও দামের পার্থক্য' : 'Hilsha Weight-Class & River/Marine Grading Board'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'মাওয়া ও চাঁদপুর পদ্মা ঘাট বনাম বরিশাল সাগর ইলিশ' : 'Padma River (Mawa/Chandpur) vs Marine Coastal Hilsha'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hilshaTiers.map((h, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-300 block">
                    {lang === 'bn' ? h.sizeBn : h.size}
                  </span>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Padma River (পদ্মার ইলিশ)</span>
                      <span className="text-xl font-black text-emerald-400">৳{h.padmaRate} <span className="text-xs font-normal text-slate-400">/kg</span></span>
                    </div>

                    <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Marine Saltwater (সাগরের ইলিশ)</span>
                      <span className="text-lg font-black text-cyan-300">৳{h.marineRate} <span className="text-xs font-normal text-slate-400">/kg</span></span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tejgaon Poultry & Meat Price Cap Matrix */}
        <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Egg className="w-5 h-5 text-amber-400" />
              <span>{lang === 'bn' ? 'তেজগাঁও ডিমের আড়ত নিলাম ও মাংসের বাজারদর' : 'Tejgaon Egg Auction & Poultry/Meat Wholesale vs Retail'}</span>
            </h3>
            <span className="text-xs text-slate-400">Tejgaon Arat Auction Live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Commodity Item</th>
                  <th className="p-3">Wholesale Arat Rate</th>
                  <th className="p-3">Average Retail Rate</th>
                  <th className="p-3">Government Fair Cap</th>
                  <th className="p-3 text-right">Retail Premium Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {poultryItems.map((item, idx) => {
                  const marginPct = Number((((item.retailPerHali - item.capFairHali) / item.capFairHali) * 100).toFixed(1));
                  return (
                    <tr key={idx} className="hover:bg-slate-800/50">
                      <td className="p-3 font-semibold text-white">{item.name}</td>
                      <td className="p-3 text-cyan-300 font-bold">৳{item.wholesale}</td>
                      <td className="p-3 font-bold text-white">৳{item.retailPerHali}</td>
                      <td className="p-3 text-emerald-400 font-bold">৳{item.capFairHali}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          marginPct > 10 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          +{marginPct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formalin & Chemical Test Verification Guide */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{lang === 'bn' ? 'মাছে রাসায়নিক ফরমালিন চেনার ৪টি বৈজ্ঞানিক লক্ষণ' : '4 Scientific Tests to Detect Formalin in Fish'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {formalChecklist.map((c, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-700/60 p-4 rounded-xl">
                <div className="font-bold text-emerald-400">{c.title}</div>
                <div className="text-[11px] text-slate-300 mt-1 leading-relaxed">{c.rule}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
