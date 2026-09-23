import React, { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Phone, Clock, CheckCircle2, AlertCircle, 
  Search, ShieldCheck, ShoppingCart, ArrowRight, RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { tcbApi } from '../services/api';

export default function TcbTruckLocator() {
  const { lang } = useLanguage();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    setLoading(true);
    try {
      const res = await tcbApi.getTrucks();
      if (res.data.success && res.data.data) {
        setTrucks(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching TCB trucks:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrucks = trucks.filter(t => {
    const matchesStatus = selectedStatus === 'ALL' || t.arrivalStatus === selectedStatus;
    const matchesSearch = t.locationName.toLowerCase().includes(search.toLowerCase()) || 
                          t.locationNameBn.includes(search) ||
                          t.thana.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>{lang === 'bn' ? 'টিসিবি খোলা ট্রাক ও ওএমএস ন্যায্যমূল্য কেন্দ্র' : 'Trading Corporation of Bangladesh (TCB) OMS Network'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'bn' ? 'টিসিবি ট্রাকের লাইভ অবস্থান ও মজুত তালিকা' : 'Live TCB Subsidized Truck Locator & Stock Tracker'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'নিম্ন ও মধ্যবিত্ত নাগরিকদের জন্য সয়াবিন তেল (৳১০০), মসুর ডাল (৳৬০), চিনি (৳৭০) ও চালের সুলভ বিক্রি।' 
                  : 'Track stationary subsidized sale points across Dhaka with live inventory and queue wait times.'}
              </p>
            </div>

            <button
              onClick={fetchTrucks}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{lang === 'bn' ? 'রিফ্রেশ' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Subsidized Price vs Market Price Savings Banner */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-850 to-emerald-950/80 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[11px] text-emerald-400 uppercase font-bold tracking-wider">
                {lang === 'bn' ? 'টিসিবি ফ্যামিলি কার্ড ও খোলা ট্রাকের ভর্তুকি মূল্য' : 'TCB Subsidized Rates Comparison'}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {lang === 'bn' ? 'খোলা বাজারে প্যাকেজ প্রতি সাশ্রয়: ৳ ১,০৫০+ টাকা' : 'Average Citizen Savings: ৳ 1,050+ per Family Basket'}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Oil: <strong className="text-emerald-400">৳১০০</strong> <span className="text-slate-500 line-through text-[10px]">৳১৬৭</span>
              </span>
              <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Lentils: <strong className="text-emerald-400">৳৬০</strong> <span className="text-slate-500 line-through text-[10px]">৳১৩৫</span>
              </span>
              <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Sugar: <strong className="text-emerald-400">৳৭০</strong> <span className="text-slate-500 line-through text-[10px]">৳১৩০</span>
              </span>
              <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Rice: <strong className="text-emerald-400">৳৩০</strong> <span className="text-slate-500 line-through text-[10px]">৳৬৫</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? 'এলাকা বা থানা সার্চ করুন (যেমন: মিরপুর, ধানমন্ডি)...' : 'Search area or thana (e.g. Mirpur, Dhanmondi)...'}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-2">
            {['ALL', 'STATIONED_SELLING', 'DISPATCHED', 'STOCK_OUT'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedStatus === status 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {status === 'ALL' ? (lang === 'bn' ? 'সকল ট্রাক' : 'All Trucks') :
                 status === 'STATIONED_SELLING' ? (lang === 'bn' ? 'বিক্রি চলছে' : 'Selling Live') :
                 status === 'DISPATCHED' ? (lang === 'bn' ? 'পথিমধ্যে' : 'Dispatched') :
                 (lang === 'bn' ? 'স্টক শেষ' : 'Stock Out')}
              </button>
            ))}
          </div>
        </div>

        {/* Trucks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTrucks.map(t => {
            const isSelling = t.arrivalStatus === 'STATIONED_SELLING';
            const isStockOut = t.arrivalStatus === 'STOCK_OUT';
            return (
              <div 
                key={t.id || t._id}
                className="bg-slate-850 border border-slate-700/80 rounded-2xl p-5 hover:border-slate-600 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {lang === 'bn' ? t.locationNameBn : t.locationName}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>Thana: {t.thana}, {t.district}</span>
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                      isSelling ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      isStockOut ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {isSelling ? 'Selling Live' : isStockOut ? 'Stock Out' : 'En Route'}
                    </span>
                  </div>

                  {/* Stock Levels Breakdown */}
                  <div className="mt-4 bg-slate-900/70 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Current Truck Inventory:</span>
                    <div className="flex justify-between text-slate-300">
                      <span>Soybean Oil (সয়াবিন তেল):</span>
                      <strong className={t.stockLevels.soybeanOilLiters < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                        {t.stockLevels.soybeanOilLiters} Liters
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Lentils (মসুর ডাল):</span>
                      <strong className={t.stockLevels.lentilsKg < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                        {t.stockLevels.lentilsKg} kg
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Sugar (চিনি):</span>
                      <strong className={t.stockLevels.sugarKg < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                        {t.stockLevels.sugarKg} kg
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Rice (চাল):</span>
                      <strong className="text-slate-200">{t.stockLevels.riceKg} kg</strong>
                    </div>
                  </div>
                </div>

                {/* Queue & Dealer Footer */}
                <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Est. Queue: <strong className="text-white">{t.queueEstimatedWaitMins} mins</strong></span>
                  </span>

                  <a 
                    href={`tel:${t.dealerPhone}`}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{t.dealerPhone}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
