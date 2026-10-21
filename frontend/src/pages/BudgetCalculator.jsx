import React, { useState, useEffect } from 'react';
import { 
  Calculator, Users, ShoppingBag, DollarSign, ArrowRight, 
  CheckCircle2, Sparkles, Scale, Info, Sliders, Printer, 
  ShoppingCart, Calendar, TrendingDown, Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { analyticsApi } from '../services/api';

// Interactive SVG Expenditure Donut Chart Component
function ExpenditureDonutChart({ carbsCost, proteinCost, oilCost, vegCost, totalCost }) {
  const safeTotal = totalCost || 1;
  const carbsPct = ((carbsCost / safeTotal) * 100).toFixed(0);
  const proteinPct = ((proteinCost / safeTotal) * 100).toFixed(0);
  const oilPct = ((oilCost / safeTotal) * 100).toFixed(0);
  const vegPct = ((vegCost / safeTotal) * 100).toFixed(0);

  const radius = 55;
  const circumference = 2 * Math.PI * radius; // ~345.57

  const carbsLen = (carbsCost / safeTotal) * circumference;
  const proteinLen = (proteinCost / safeTotal) * circumference;
  const oilLen = (oilCost / safeTotal) * circumference;
  const vegLen = (vegCost / safeTotal) * circumference;

  let offset = 0;
  const carbsOffset = offset;
  offset -= carbsLen;
  const proteinOffset = offset;
  offset -= proteinLen;
  const oilOffset = offset;
  offset -= oilLen;
  const vegOffset = offset;

  return (
    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 150 150" className="w-full h-full transform -rotate-90 overflow-visible">
            <circle cx="75" cy="75" r={radius} fill="none" stroke="#1e293b" strokeWidth="18" />
            <circle cx="75" cy="75" r={radius} fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray={`${carbsLen} ${circumference}`} strokeDashoffset={carbsOffset} strokeLinecap="round" />
            <circle cx="75" cy="75" r={radius} fill="none" stroke="#f43f5e" strokeWidth="18" strokeDasharray={`${proteinLen} ${circumference}`} strokeDashoffset={proteinOffset} strokeLinecap="round" />
            <circle cx="75" cy="75" r={radius} fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray={`${oilLen} ${circumference}`} strokeDashoffset={oilOffset} strokeLinecap="round" />
            <circle cx="75" cy="75" r={radius} fill="none" stroke="#06b6d4" strokeWidth="18" strokeDasharray={`${vegLen} ${circumference}`} strokeDashoffset={vegOffset} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Allocation</span>
            <span className="text-sm font-black text-white">৳{totalCost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 flex-grow text-xs w-full">
        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Carbs & Grains: {carbsPct}%</span>
          </div>
          <div className="text-sm font-black text-white mt-1">৳{carbsCost.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">Miniket Rice & Atta</span>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span>Protein & Eggs: {proteinPct}%</span>
          </div>
          <div className="text-sm font-black text-white mt-1">৳{proteinCost.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">Beef Bone-In & Farm Eggs</span>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Edible Oils: {oilPct}%</span>
          </div>
          <div className="text-sm font-black text-white mt-1">৳{oilCost.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">Bottled Soybean Oil</span>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Vegetables & Pulses: {vegPct}%</span>
          </div>
          <div className="text-sm font-black text-white mt-1">৳{vegCost.toLocaleString()}</div>
          <span className="text-[10px] text-slate-500">Potatoes & Red Lentils</span>
        </div>
      </div>
    </div>
  );
}

export default function BudgetCalculator() {
  const { addToBasket, setIsBasketOpen, addToast, commodities } = useBazaar();
  const [familySize, setFamilySize] = useState(4);
  const [budgetResult, setBudgetResult] = useState(null);
  const [iftarResult, setIftarResult] = useState(null);

  // Custom Monthly Consumption Sliders (Scaled by household size)
  const [riceKg, setRiceKg] = useState(25);
  const [lentilsKg, setLentilsKg] = useState(5);
  const [oilLiters, setOilLiters] = useState(5);
  const [potatoesKg, setPotatoesKg] = useState(15);
  const [beefKg, setBeefKg] = useState(3);
  const [eggsHali, setEggsHali] = useState(10); // 40 eggs

  // Auto adjust consumption defaults when family size changes
  useEffect(() => {
    setRiceKg(familySize * 6);
    setLentilsKg(Math.round(familySize * 1.25));
    setOilLiters(Math.round(familySize * 1.25));
    setPotatoesKg(familySize * 4);
    setBeefKg(Math.round(familySize * 0.75));
    setEggsHali(familySize * 3);
  }, [familySize]);

  useEffect(() => {
    fetchBudget();
    fetchIftar();
  }, [familySize]);

  const fetchBudget = async () => {
    try {
      const res = await analyticsApi.calcBudget({ familySize });
      if (res.data?.success) {
        setBudgetResult(res.data.data);
      }
    } catch (err) {
      console.error('Error calculating budget:', err);
    }
  };

  const fetchIftar = async () => {
    try {
      const res = await analyticsApi.calcIftarBasket();
      if (res.data?.success) {
        setIftarResult(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching iftar basket:', err);
    }
  };

  // Custom Dynamic Calculation based on sliders
  const miniketRicePrice = 72;
  const lentilPrice = 135;
  const oilPrice = 167;
  const potatoPrice = 50;
  const beefPrice = 750;
  const eggPrice = 52; // per hali

  const customFairTotal = (
    riceKg * miniketRicePrice +
    lentilsKg * lentilPrice +
    oilLiters * oilPrice +
    potatoesKg * potatoPrice +
    beefKg * beefPrice +
    eggsHali * eggPrice
  );

  const carbsCost = riceKg * miniketRicePrice;
  const proteinCost = beefKg * beefPrice + eggsHali * eggPrice;
  const oilCost = oilLiters * oilPrice;
  const vegCost = potatoesKg * potatoPrice + lentilsKg * lentilPrice;

  const customRetailTotal = Math.round(customFairTotal * 1.18); // 18% urban retail markup
  const customSavings = customRetailTotal - customFairTotal;

  const handleAddAllToBasket = () => {
    const rice = commodities?.find(c => c.name.includes('Rice')) || { name: 'Miniket Rice', damFairPriceMax: miniketRicePrice, retailAvgPrice: 78, unit: 'kg' };
    const oil = commodities?.find(c => c.name.includes('Oil')) || { name: 'Soybean Oil', damFairPriceMax: oilPrice, retailAvgPrice: 167, unit: 'liter' };
    const potato = commodities?.find(c => c.name.includes('Potato')) || { name: 'Granola Potato', damFairPriceMax: potatoPrice, retailAvgPrice: 58, unit: 'kg' };
    
    addToBasket(rice, riceKg);
    addToBasket(oil, oilLiters);
    addToBasket(potato, potatoesKg);
    addToast('Monthly grocery quantities transferred to Citizen Fair Basket!', 'success');
    setIsBasketOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Family Grocery Budget & Ramadan Iftar Planner</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Monthly Grocery Budget & Fair Price Savings Estimator
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Estimate monthly staples costs based on household size and compare fair government rates against open retail rates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddAllToBasket}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Fair Basket</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition no-print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Budget</span>
              </button>
            </div>
          </div>
        </div>

        {/* Family Size Selector & Budget Spotlight */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-855 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Select Family Household Size:</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically configures monthly nutritional requirements based on BBS household surveys.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[2, 3, 4, 5, 6, 8].map(size => (
                <button
                  key={size}
                  onClick={() => setFamilySize(size)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    familySize === size 
                      ? 'bg-emerald-600 text-white shadow-lg glow-emerald' 
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {size} Persons
                </button>
              ))}
            </div>
          </div>

          {/* 3-Way Monthly KPI Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">
                Cost at Government Fair Caps
              </span>
              <div className="text-3xl font-black text-emerald-400 mt-2">
                ৳{customFairTotal.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Based on DAM retail benchmarks</span>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">
                Neighborhood Open Retail Cost
              </span>
              <div className="text-3xl font-black text-rose-400 mt-2">
                ৳{customRetailTotal.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Includes middleman markups</span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/70 to-slate-950 p-5 rounded-2xl border border-emerald-500/40">
              <span className="text-[11px] text-emerald-400 uppercase font-bold block">
                Net Citizen Monthly Savings
              </span>
              <div className="text-3xl font-black text-white mt-2">
                ৳{customSavings.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-300 mt-1 block">Saved by enforcing fair pricing</span>
            </div>

          </div>

          {/* SVG Expenditure Allocation Donut Chart */}
          <ExpenditureDonutChart 
            carbsCost={carbsCost} 
            proteinCost={proteinCost} 
            oilCost={oilCost} 
            vegCost={vegCost} 
            totalCost={customFairTotal} 
          />

          {/* Interactive Item Quantity Sliders */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Customize Household Monthly Consumption:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Rice */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Miniket Rice:</span>
                  <strong className="text-emerald-400">{riceKg} kg (৳{riceKg * miniketRicePrice})</strong>
                </div>
                <input 
                  type="range" min="10" max="60" value={riceKg} 
                  onChange={(e) => setRiceKg(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Oil */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Soybean Oil:</span>
                  <strong className="text-emerald-400">{oilLiters} L (৳{oilLiters * oilPrice})</strong>
                </div>
                <input 
                  type="range" min="2" max="20" value={oilLiters} 
                  onChange={(e) => setOilLiters(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Lentils */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Red Lentils:</span>
                  <strong className="text-emerald-400">{lentilsKg} kg (৳{lentilsKg * lentilPrice})</strong>
                </div>
                <input 
                  type="range" min="1" max="15" value={lentilsKg} 
                  onChange={(e) => setLentilsKg(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Potatoes */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Potatoes:</span>
                  <strong className="text-emerald-400">{potatoesKg} kg (৳{potatoesKg * potatoPrice})</strong>
                </div>
                <input 
                  type="range" min="5" max="40" value={potatoesKg} 
                  onChange={(e) => setPotatoesKg(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Beef */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Beef Bone-in:</span>
                  <strong className="text-emerald-400">{beefKg} kg (৳{beefKg * beefPrice})</strong>
                </div>
                <input 
                  type="range" min="0" max="10" value={beefKg} 
                  onChange={(e) => setBeefKg(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Eggs */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Farm Eggs:</span>
                  <strong className="text-emerald-400">{eggsHali * 4} pcs (৳{eggsHali * eggPrice})</strong>
                </div>
                <input 
                  type="range" min="2" max="30" value={eggsHali} 
                  onChange={(e) => setEggsHali(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

            </div>
          </div>

        </div>

        {/* 30-Day Ramadan Family Iftar Basket Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase mb-2">
                <Calendar className="w-3 h-3" />
                <span>Special Religious & Festive Intelligence</span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>30-Day Ramadan Family Iftar & Sahri Basket Audit</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Chickpeas, dates, oil, sugar, and onion bundle calculated over 30 days.
              </p>
            </div>

            {iftarResult && (
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">30-Day Ramadan Total</span>
                <span className="text-2xl font-black text-amber-400">৳{iftarResult.thirtyDayTotal.toLocaleString()}</span>
              </div>
            )}
          </div>

          {iftarResult && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {iftarResult.bundleItems.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-xs font-bold text-white leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Monthly: <strong>{item.thirtyDayQty} {item.unit}</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-xs flex justify-between">
                    <span className="text-slate-400">Total:</span>
                    <strong className="text-emerald-400">৳{item.fairTotalCost}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
