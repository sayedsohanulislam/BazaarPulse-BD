import React, { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Phone, Clock, CheckCircle2, AlertCircle, 
  Search, ShieldCheck, ShoppingCart, ArrowRight, RefreshCw,
  Navigation, Map as MapIcon, LayoutGrid, Split, Bell
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { tcbApi } from '../services/api';
import TcbMap from '../components/TcbMap';
import TcbSmsModal from '../components/TcbSmsModal';

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
}

export default function TcbTruckLocator() {
  const { lang, t } = useLanguage();
  const { addToast } = useBazaar();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'map' | 'cards'
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    setLoading(true);
    try {
      const res = await tcbApi.getTrucks();
      if (res.data?.success && res.data.data) {
        setTrucks(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching TCB trucks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocating(false);
        addToast('Trucks sorted by distance to your current location!', 'success');
      },
      (err) => {
        console.error(err);
        setLocating(false);
        addToast('Could not access current location', 'error');
      }
    );
  };

  let filteredTrucks = trucks.filter(t => {
    const matchesStatus = selectedStatus === 'ALL' || t.arrivalStatus === selectedStatus;
    const matchesSearch = t.locationName.toLowerCase().includes(search.toLowerCase()) || 
                          t.thana.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (userLocation) {
    filteredTrucks = [...filteredTrucks].sort((a, b) => {
      const distA = a.coordinates ? calculateDistanceKm(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng) : 999;
      const distB = b.coordinates ? calculateDistanceKm(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng) : 999;
      return distA - distB;
    });
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>Trading Corporation of Bangladesh (TCB) OMS Network</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Live TCB Subsidized Truck Locator & Stock Radar
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Geospatial GPS tracking of subsidized sales trucks across Dhaka with live inventory and queue duration.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSmsModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition shadow-sm"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>SMS Alerts</span>
              </button>

              <button
                onClick={handleLocateMe}
                disabled={locating}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition disabled:opacity-50"
              >
                <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Locating...' : 'Near Me'}</span>
              </button>

              <button
                onClick={fetchTrucks}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subsidized Price vs Market Price Savings Banner */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/70 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <span className="text-[11px] text-emerald-400 uppercase font-bold tracking-wider">
                TCB Subsidized Rates Comparison
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Average Citizen Savings: ৳ 1,050+ per Family Basket
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                Oil: <strong className="text-emerald-400">৳100</strong> <span className="text-slate-500 line-through text-[10px]">৳167</span>
              </span>
              <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                Lentils: <strong className="text-emerald-400">৳60</strong> <span className="text-slate-500 line-through text-[10px]">৳135</span>
              </span>
              <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                Sugar: <strong className="text-emerald-400">৳70</strong> <span className="text-slate-500 line-through text-[10px]">৳130</span>
              </span>
              <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                Rice: <strong className="text-emerald-400">৳30</strong> <span className="text-slate-500 line-through text-[10px]">৳65</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar with View Mode Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80 shadow-xl">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search area or thana (e.g. Mirpur, Dhanmondi)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <div className="flex gap-1.5">
              {['ALL', 'STATIONED_SELLING', 'DISPATCHED', 'STOCK_OUT'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedStatus === status 
                      ? 'bg-cyan-600 text-white shadow-md' 
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {status === 'ALL' ? 'All' :
                   status === 'STATIONED_SELLING' ? 'Selling' :
                   status === 'DISPATCHED' ? 'En Route' : 'Empty'}
                </button>
              ))}
            </div>

            {/* View Switcher: Split | Map | Cards */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'split' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Split View"
              >
                <Split className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'map' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Map Only"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'cards' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Cards Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

          </div>
        </div>

        {/* Map Visualization (Shown in split and map mode) */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive Dhaka Subsidized Sales Network</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Click any pin to inspect stock & queue wait time
              </span>
            </div>
            <TcbMap
              trucks={filteredTrucks}
              selectedTruck={selectedTruck}
              onSelectTruck={(t) => setSelectedTruck(t)}
            />
          </div>
        )}

        {/* Trucks List Grid (Shown in split and cards mode) */}
        {(viewMode === 'split' || viewMode === 'cards') && (
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Active Subsidized Sale Points</span>
              </h3>
              <span className="text-xs text-slate-400">
                {filteredTrucks.length} locations active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTrucks.map(t => {
                const isSelling = t.arrivalStatus === 'STATIONED_SELLING';
                const isStockOut = t.arrivalStatus === 'STOCK_OUT';
                const isSelected = selectedTruck?.id === t.id;
                const distance = (userLocation && t.coordinates) 
                  ? calculateDistanceKm(userLocation.lat, userLocation.lng, t.coordinates.lat, t.coordinates.lng) 
                  : null;

                return (
                  <div 
                    key={t.id || t._id}
                    onClick={() => setSelectedTruck(t)}
                    className={`bg-slate-900/80 border rounded-2xl p-5 transition flex flex-col justify-between cursor-pointer ${
                      isSelected 
                        ? 'border-cyan-400 glow-cyan ring-1 ring-cyan-400/50' 
                        : 'border-slate-700/80 hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-base font-bold text-white leading-tight">
                            {t.locationName}
                          </h3>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            <span>Thana: {t.thana}, {t.district}</span>
                            {distance && (
                              <span className="text-cyan-400 font-bold ml-1">({distance} km away)</span>
                            )}
                          </p>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border flex-shrink-0 ${
                          isSelling ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          isStockOut ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {isSelling ? 'Selling Live' : isStockOut ? 'Stock Out' : 'En Route'}
                        </span>
                      </div>

                      {/* Stock Levels Breakdown with Visual Meters */}
                      <div className="mt-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Truck Inventory:</span>
                        
                        {/* Oil */}
                        <div>
                          <div className="flex justify-between text-slate-300 mb-0.5">
                            <span>Soybean Oil:</span>
                            <strong className={t.stockLevels.soybeanOilLiters < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                              {t.stockLevels.soybeanOilLiters} L
                            </strong>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (t.stockLevels.soybeanOilLiters/500)*100)}%` }}></div>
                          </div>
                        </div>

                        {/* Lentils */}
                        <div>
                          <div className="flex justify-between text-slate-300 mb-0.5">
                            <span>Lentils:</span>
                            <strong className={t.stockLevels.lentilsKg < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                              {t.stockLevels.lentilsKg} kg
                            </strong>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (t.stockLevels.lentilsKg/400)*100)}%` }}></div>
                          </div>
                        </div>

                        {/* Sugar */}
                        <div>
                          <div className="flex justify-between text-slate-300 mb-0.5">
                            <span>Sugar:</span>
                            <strong className="text-slate-200">{t.stockLevels.sugarKg} kg</strong>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (t.stockLevels.sugarKg/300)*100)}%` }}></div>
                          </div>
                        </div>

                        {/* Rice */}
                        <div>
                          <div className="flex justify-between text-slate-300 mb-0.5">
                            <span>Rice:</span>
                            <strong className="text-slate-200">{t.stockLevels.riceKg} kg</strong>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (t.stockLevels.riceKg/500)*100)}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Queue & Dealer Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${t.queueEstimatedWaitMins > 20 ? 'text-rose-400' : 'text-emerald-400'}`} />
                        <span>Queue: <strong className="text-white">{t.queueEstimatedWaitMins} mins</strong></span>
                      </span>

                      <a 
                        href={`tel:${t.dealerPhone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold transition"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Dealer</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Citizen TCB SMS Alert Subscription Modal */}
        <TcbSmsModal 
          isOpen={isSmsModalOpen} 
          onClose={() => setIsSmsModalOpen(false)} 
        />

      </div>
    </div>
  );
}
