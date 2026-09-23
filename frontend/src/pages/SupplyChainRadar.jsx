import React, { useState, useEffect } from 'react';
import { 
  Warehouse, Truck, DollarSign, AlertTriangle, CheckCircle2, 
  MapPin, ShieldAlert, BarChart3, RefreshCw, Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { hoardingApi } from '../services/api';

export default function SupplyChainRadar() {
  const { lang } = useLanguage();
  const [coldStorages, setColdStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetchStorages();
  }, []);

  const fetchStorages = async () => {
    setLoading(true);
    try {
      const res = await hoardingApi.getColdStorages();
      if (res.data.success && res.data.data) {
        setColdStorages(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching cold storages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await hoardingApi.updateInspection(id, { inspectionStatus: newStatus });
      if (res.data.success) {
        setActionMsg(`Cold storage inspection status updated to "${newStatus}"!`);
        fetchStorages();
        setTimeout(() => setActionMsg(''), 4000);
      }
    } catch (err) {
      alert('Failed to update inspection');
    }
  };

  // Farmer to Consumer Margin Disaggregation
  const marginBreakdown = [
    { label: 'Farmer Direct Gate Price (কৃষকের মূল্য)', bdt: 20, pct: 33, color: 'bg-emerald-500', desc: 'Received by Bogura/Faridpur grower' },
    { label: 'Sorting, Sacks & Field Labor (শ্রমিক ও বস্তা)', bdt: 4, pct: 7, color: 'bg-teal-500', desc: 'Gunny bags and loading workers' },
    { label: 'Highway Trucking Diesel (ট্রাক ভাড়া ও জ্বালানি)', bdt: 8, pct: 13, color: 'bg-blue-500', desc: 'Freight from North Bengal to Dhaka' },
    { label: 'Padma / Bangabandhu Bridge Toll (সেতু টোল)', bdt: 3, pct: 5, color: 'bg-cyan-500', desc: 'RFID Electronic Toll collection' },
    { label: 'Wholesale Aratdar Commission (আড়তদারি কমিশন)', bdt: 12, pct: 20, color: 'bg-amber-500', desc: 'Middleman commission at Karwan Bazar' },
    { label: 'Market Doles & Extortion (চাঁদাবাজি ও বাজার ইজারা)', bdt: 5, pct: 8, color: 'bg-rose-500', desc: 'Unregulated local market collection' },
    { label: 'Retailer Profit & Rot Wastage (খুচরা লাভ ও পচন)', bdt: 8, pct: 14, color: 'bg-purple-500', desc: 'Local neighborhood stall markup' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Warehouse className="w-4 h-4 text-amber-400" />
                <span>{lang === 'bn' ? 'সাপ্লাই চেইন বিশ্লেষণ ও কোল্ড স্টোরেজ নজরদারি' : 'Supply Chain Freight & Cold Storage Hoarding Radar'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'bn' ? 'কৃষকের ২০ টাকা কেন ঢাকায় ৬০ টাকা হয়?' : 'Where Does the ৳40 Middleman Margin Go?'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'কৃষক থেকে খুচরা ক্রেতার হাত পর্যন্ত পরিবহন খরচ, টোল, চাঁদাবাজি এবং মুন্সীগঞ্জ-বগুড়ার আলু হিমাগার অডিট।' 
                  : 'Transparent cost dissection of freight, highway tolls, arat commissions, and cold storage inventories.'}
              </p>
            </div>

            <button
              onClick={fetchStorages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{lang === 'bn' ? 'রিফ্রেশ' : 'Refresh'}</span>
            </button>
          </div>

          {actionMsg && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionMsg}</span>
            </div>
          )}
        </div>

        {/* Farmer Gate vs City Retail Dissection */}
        <div className="bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'bn' ? '১ কেজি সবজির মূল্য বিভাজন (বগুড়া ➔ ঢাকা)' : '1 kg Cabbage/Vegetable Value Chain Dissection'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'মোট খুচরা বিক্রয় মূল্য: ৬০ টাকা' : 'Total Consumer Retail Price: 60 BDT'}
              </p>
            </div>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full bg-slate-900 rounded-full h-5 overflow-hidden flex shadow-inner">
            {marginBreakdown.map((item, idx) => (
              <div 
                key={idx}
                className={`${item.color} h-full transition-all`}
                style={{ width: `${item.pct}%` }}
                title={`${item.label}: ৳${item.bdt} (${item.pct}%)`}
              ></div>
            ))}
          </div>

          {/* Breakdown Legend Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {marginBreakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color} shrink-0`}></span>
                  <span className="text-xs font-bold text-slate-200 truncate">{item.label}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-black text-white">৳{item.bdt}</span>
                  <span className="text-xs font-semibold text-slate-400">{item.pct}%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cold Storage Hoarding Surveillance Ledger */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-amber-400" />
              <span>{lang === 'bn' ? 'মুন্সীগঞ্জ ও বগুড়া কোল্ড স্টোরেজ আলুর মজুত অডিট' : 'Cold Storage Potato Hoarding Surveillance Ledger'}</span>
            </h3>
            <span className="text-xs text-slate-400">Total: {coldStorages.length} Inspected</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coldStorages.map(cs => {
              const isHoarding = cs.inspectionStatus === 'HOARDING_SUSPECTED';
              return (
                <div key={cs.id || cs._id} className="bg-slate-850 border border-slate-700/80 rounded-2xl p-5 hover:border-slate-600 transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white">{cs.facilityName}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{cs.upazila}, {cs.district}</span>
                        </p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        cs.inspectionStatus === 'COMPLIANT' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        isHoarding ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {cs.inspectionStatus}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-slate-900/60 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Total Capacity</span>
                        <strong className="text-slate-200">{(cs.capacityBags / 1000).toFixed(0)}k Bags</strong>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Current Stock</span>
                        <strong className={isHoarding ? 'text-rose-400' : 'text-slate-200'}>
                          {cs.occupancyPercent}% ({ (cs.currentStockBags / 1000).toFixed(0) }k)
                        </strong>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Gate Release Price</span>
                        <strong className="text-emerald-400">৳{cs.gateReleasePriceKg}/kg</strong>
                      </div>
                    </div>
                  </div>

                  {/* Magistrate Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[11px]">Owner: {cs.ownerName || 'Verified'}</span>
                    
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(cs.id || cs._id, 'COMPLIANT')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-800/40 text-[10px] text-emerald-300 border border-slate-700"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(cs.id || cs._id, 'HOARDING_SUSPECTED')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-800/40 text-[10px] text-rose-300 border border-slate-700"
                      >
                        Flag Hoarding
                      </button>
                    </div>
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
