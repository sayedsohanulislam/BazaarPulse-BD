import React, { useState, useEffect } from 'react';
import { 
  Warehouse, Truck, DollarSign, AlertTriangle, CheckCircle2, 
  MapPin, ShieldAlert, BarChart3, RefreshCw, Layers, Sliders,
  HelpCircle, ArrowRight, TrendingDown, Percent
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { hoardingApi } from '../services/api';

export default function SupplyChainRadar() {
  const { lang, t } = useLanguage();
  const { addToast } = useBazaar();
  const [coldStorages, setColdStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  // Interactive Middleman & Logistics Simulator State
  const [farmerBasePrice, setFarmerBasePrice] = useState(20);
  const [dieselFreightMultiplier, setDieselFreightMultiplier] = useState(1.0);
  const [extortionTollFactor, setExtortionTollFactor] = useState(1.0);
  const [aratdarCommissionFactor, setAratdarCommissionFactor] = useState(1.0);

  useEffect(() => {
    fetchStorages();
  }, []);

  const fetchStorages = async () => {
    setLoading(true);
    try {
      const res = await hoardingApi.getColdStorages();
      if (res.data?.success && res.data.data) {
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
      if (res.data?.success) {
        addToast(`Cold storage inspection status updated to "${newStatus}"!`, 'success');
        fetchStorages();
      }
    } catch (err) {
      addToast('Failed to update inspection status', 'error');
    }
  };

  // Dynamic cost components based on simulator sliders
  const laborCost = 4;
  const freightCost = 8 * dieselFreightMultiplier;
  const tollAndExtortionCost = (3 + 5) * extortionTollFactor;
  const aratdarCommissionCost = 12 * aratdarCommissionFactor;
  const retailProfitAndWastage = 8;

  const totalSimulatedRetailPrice = (
    farmerBasePrice + 
    laborCost + 
    freightCost + 
    tollAndExtortionCost + 
    aratdarCommissionCost + 
    retailProfitAndWastage
  ).toFixed(1);

  const farmerSharePct = ((farmerBasePrice / totalSimulatedRetailPrice) * 100).toFixed(1);
  const middlemanSharePct = (((totalSimulatedRetailPrice - farmerBasePrice) / totalSimulatedRetailPrice) * 100).toFixed(1);

  const marginBreakdown = [
    { label: 'Farmer Direct Gate Price (কৃষকের মূল্য)', bdt: farmerBasePrice, color: 'bg-emerald-500', desc: 'Received by Bogura/Faridpur grower' },
    { label: 'Sorting, Sacks & Field Labor (শ্রমিক ও বস্তা)', bdt: laborCost, color: 'bg-teal-500', desc: 'Gunny bags and loading workers' },
    { label: 'Highway Trucking Diesel (ট্রাক ভাড়া ও জ্বালানি)', bdt: freightCost, color: 'bg-blue-500', desc: 'Freight from North Bengal to Dhaka' },
    { label: 'Bridge Tolls & Market Extortion (টোল ও চাঁদাবাজি)', bdt: tollAndExtortionCost, color: 'bg-rose-500', desc: 'Bridge electronic toll & unregulated local doles' },
    { label: 'Wholesale Aratdar Commission (আড়তদারি কমিশন)', bdt: aratdarCommissionCost, color: 'bg-amber-500', desc: 'Middleman commission at Karwan Bazar' },
    { label: 'Retailer Profit & Rot Wastage (খুচরা লাভ ও পচন)', bdt: retailProfitAndWastage, color: 'bg-purple-500', desc: 'Local neighborhood stall markup' }
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Warehouse className="w-4 h-4 text-amber-400" />
                <span>{lang === 'bn' ? 'সাপ্লাই চেইন বিশ্লেষণ ও কোল্ড স্টোরেজ নজরদারি' : 'Supply Chain Freight & Cold Storage Hoarding Radar'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{lang === 'bn' ? 'রিফ্রেশ' : 'Refresh Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Middleman Margin Simulator */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase mb-2">
                <Sliders className="w-3 h-3" />
                <span>Interactive Policy Simulator</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'bn' ? 'সাপ্লাই চেইন খরচ সিমুলেটর: চাঁদাবাজি ও সিন্ডিকেট কমালে দাম কত হবে?' : 'Policy Impact Simulator: What If We Cut Tolls & Syndicate Extortion?'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'স্লাইডার পরিবর্তন করে দেখুন কিভাবে পরিবহন ও মধ্যস্বত্বভোগীদের ফি ঢাকার খুচরা দামকে প্রভাবিত করে।' : 'Adjust logistics and aratdar multipliers to calculate simulated retail prices and farmer profit shares.'}
              </p>
            </div>

            {/* Results Callout Tile */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Simulated Retail Price</span>
                <div className="text-2xl font-black text-emerald-400">৳{totalSimulatedRetailPrice} <span className="text-xs text-slate-400">/kg</span></div>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Farmer Share</span>
                <div className="text-xl font-black text-cyan-300">{farmerSharePct}%</div>
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Slider 1: Diesel Freight */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Highway Diesel & Freight:</span>
                <strong className="text-blue-400">৳{freightCost.toFixed(1)}/kg</strong>
              </div>
              <input 
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={dieselFreightMultiplier}
                onChange={(e) => setDieselFreightMultiplier(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>-50% Fuel Cost</span>
                <span>Normal (1.0x)</span>
                <span>+100% Fuel Spike</span>
              </div>
            </div>

            {/* Slider 2: Tolls & Extortion */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Bridge Tolls & Market Doles:</span>
                <strong className="text-rose-400">৳{tollAndExtortionCost.toFixed(1)}/kg</strong>
              </div>
              <input 
                type="range"
                min="0"
                max="2.0"
                step="0.1"
                value={extortionTollFactor}
                onChange={(e) => setExtortionTollFactor(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Zero Extortion (0x)</span>
                <span>Current (1.0x)</span>
                <span>Severe Extortion</span>
              </div>
            </div>

            {/* Slider 3: Wholesale Aratdar Syndicate Commission */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Aratdar Syndicate Cut:</span>
                <strong className="text-amber-400">৳{aratdarCommissionCost.toFixed(1)}/kg</strong>
              </div>
              <input 
                type="range"
                min="0.3"
                max="1.8"
                step="0.1"
                value={aratdarCommissionFactor}
                onChange={(e) => setAratdarCommissionFactor(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Fair 2-3% Fee</span>
                <span>Current High Cut</span>
                <span>Syndicate Monopoly</span>
              </div>
            </div>

          </div>

          {/* Stacked Cost Breakdown Visual Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Cost Composition Breakdown</span>
              <span>100% of Final Consumer Price</span>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              {marginBreakdown.map((item, idx) => {
                const pct = ((item.bdt / totalSimulatedRetailPrice) * 100);
                return (
                  <div
                    key={idx}
                    className={`${item.color} h-full transition-all duration-300 relative group cursor-pointer`}
                    style={{ width: `${pct}%` }}
                    title={`${item.label}: ৳${item.bdt} (${pct.toFixed(1)}%)`}
                  ></div>
                );
              })}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 text-[11px]">
              {marginBreakdown.map((item, idx) => (
                <div key={idx} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                    <span>৳{item.bdt.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] line-clamp-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Cold Storage Hoarding Surveillance Registry */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-cyan-400" />
                <span>{lang === 'bn' ? 'মুন্সীগঞ্জ ও উত্তরবঙ্গ আলু হিমাগার কৃত্রিম সংকট নজরদারি' : 'Munshiganj & North Bengal Cold Storage Hoarding Surveillance'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'গেট রিলিজ প্রাইস (৳২৭-৩২) বনাম ঢাকার খুচরা মূল্যের ব্যবধান নিরীক্ষা' : 'Auditing gate release rates vs Dhaka retail price exploitation'}
              </p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {coldStorages.length} {lang === 'bn' ? 'টি হিমাগার নিরীক্ষিত' : 'facilities audited'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coldStorages.map(cs => {
              const isHoarding = cs.inspectionStatus === 'HOARDING_SUSPECTED';
              return (
                <div 
                  key={cs.id || cs._id}
                  className={`bg-slate-950/80 border rounded-2xl p-5 transition flex flex-col justify-between ${
                    isHoarding ? 'border-rose-500/40 glow-rose' : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white">{cs.facilityName}</h4>
                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{cs.upazila}, {cs.district}</span>
                        </span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        isHoarding ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {cs.inspectionStatus}
                      </span>
                    </div>

                    {/* Capacity & Occupancy Radar Bar */}
                    <div className="mt-4 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Current Stock:</span>
                        <strong className="text-white">{cs.currentStockBags.toLocaleString()} / {cs.capacityBags.toLocaleString()} bags</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${isHoarding ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${cs.occupancyPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                        <span>Occupancy: <strong>{cs.occupancyPercent}%</strong></span>
                        <span>Commodity: <strong>{cs.commodityStored}</strong></span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Gate Release Price</span>
                        <strong className="text-emerald-400 text-sm">৳{cs.gateReleasePriceKg} <span className="text-[10px] font-normal text-slate-400">/kg</span></strong>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Rent / Bag / Mo</span>
                        <strong className="text-slate-200 text-sm">৳{cs.rentPerBagPerMonth}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Authority Inspection Status Trigger */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-slate-400">
                      Owner: <strong>{cs.ownerName}</strong>
                    </span>

                    <button
                      onClick={() => handleUpdateStatus(cs.id || cs._id, isHoarding ? 'COMPLIANT' : 'HOARDING_SUSPECTED')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition ${
                        isHoarding 
                          ? 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border-emerald-500/30' 
                          : 'bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border-rose-500/30'
                      }`}
                    >
                      {isHoarding ? 'Mark Compliant' : 'Flag Hoarding'}
                    </button>
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
