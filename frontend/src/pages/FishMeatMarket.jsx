import React, { useState } from 'react';
import { 
  Fish, Drumstick, Egg, AlertTriangle, CheckCircle2, 
  ShieldCheck, Sparkles, Scale, Info, ArrowRight, Calculator,
  AlertOctagon, Check, ShieldAlert, HeartPulse, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { Link } from 'react-router-dom';

export default function FishMeatMarket() {
  const { addToBasket } = useBazaar();

  // Hilsha Interactive Calculator State
  const [hilshaGrams, setHilshaGrams] = useState(1000);
  const [hilshaOrigin, setHilshaOrigin] = useState('padma'); // 'padma' | 'marine'

  // Formalin Diagnostic Wizard State
  const [testGills, setTestGills] = useState('safe'); // 'safe' | 'danger'
  const [testFlies, setTestFlies] = useState('safe');
  const [testEyes, setTestEyes] = useState('safe');
  const [testSlime, setTestSlime] = useState('safe');

  // Hilsha Grading Tiers
  const hilshaTiers = [
    { size: '500g - 700g (Small)', padmaRate: 950, marineRate: 750, desc: 'Tender flesh, suitable for mustard hilsha (shorshe ilish)' },
    { size: '800g - 900g (Medium)', padmaRate: 1350, marineRate: 1050, desc: 'High oil content, authentic river aroma' },
    { size: '1.0kg - 1.2kg (Standard)', padmaRate: 1750, marineRate: 1400, desc: 'Premium Padma flavor, high festive demand' },
    { size: '1.5kg+ (Giant Grade)', padmaRate: 2400, marineRate: 1950, desc: 'Collector item, high-society banquets' }
  ];

  // Poultry & Meat Rates
  const poultryItems = [
    { name: 'Tejgaon Egg Arat Wholesale (100 Eggs Crate)', wholesale: 1140, retailPerHali: 56, capFairHali: 50, unit: '100 eggs' },
    { name: 'Live Broiler Chicken', wholesale: 168, retailPerHali: 195, capFairHali: 180, unit: 'kg' },
    { name: 'Sonali Chicken', wholesale: 265, retailPerHali: 320, capFairHali: 290, unit: 'kg' },
    { name: 'Local Deshi Chicken', wholesale: 480, retailPerHali: 580, capFairHali: 520, unit: 'kg' },
    { name: 'Beef Bone-In', wholesale: 680, retailPerHali: 780, capFairHali: 720, unit: 'kg' },
    { name: 'Mutton / Khashi', wholesale: 980, retailPerHali: 1150, capFairHali: 1050, unit: 'kg' }
  ];

  // Dynamic Hilsha Price Calculation
  const getHilshaRatePerKg = (weightGrams, origin) => {
    let tier = hilshaTiers[0];
    if (weightGrams >= 1500) tier = hilshaTiers[3];
    else if (weightGrams >= 1000) tier = hilshaTiers[2];
    else if (weightGrams >= 800) tier = hilshaTiers[1];

    return origin === 'padma' ? tier.padmaRate : tier.marineRate;
  };

  const calculatedHilshaPerKg = getHilshaRatePerKg(hilshaGrams, hilshaOrigin);
  const calculatedHilshaTotal = Math.round((calculatedHilshaPerKg * hilshaGrams) / 1000);
  const marineEquivalentTotal = Math.round((getHilshaRatePerKg(hilshaGrams, 'marine') * hilshaGrams) / 1000);
  const padmaPremium = calculatedHilshaTotal - marineEquivalentTotal;

  // Formalin Score Calculation
  let riskPoints = 0;
  if (testGills === 'danger') riskPoints += 25;
  if (testFlies === 'danger') riskPoints += 30; // heavy weight on fly test
  if (testEyes === 'danger') riskPoints += 25;
  if (testSlime === 'danger') riskPoints += 20;

  const isSevereAdulteration = riskPoints >= 70;
  const isModerateCaution = riskPoints >= 30 && riskPoints < 70;

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Fish className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>Hilsha Grading, Poultry Auction & Formalin Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Padma Hilsha Weight Tiers & Tejgaon Egg Arat Tracker
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Padma vs marine Hilsha grade pricing, Tejgaon egg auction crate benchmarks, and formalin test guidelines.
            </p>
          </div>
        </div>

        {/* Interactive Hilsha Weight & Price Calculator */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 uppercase mb-2">
                <Calculator className="w-3 h-3" />
                <span>Smart Fish Calculator</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Hilsha Weight-Class & River Authenticity Calculator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Enter weight in grams to calculate authentic Padma River vs Coastal Marine pricing.
              </p>
            </div>

            {/* Price Result Tile */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Calculated Estimated Price</span>
                <div className="text-2xl font-black text-emerald-400">৳{calculatedHilshaTotal.toLocaleString()}</div>
                <span className="text-[10px] text-slate-500">Rate: ৳{calculatedHilshaPerKg}/kg</span>
              </div>
              {hilshaOrigin === 'padma' && padmaPremium > 0 && (
                <div className="border-l border-slate-800 pl-6 hidden sm:block">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">Padma Flavor Premium</span>
                  <div className="text-lg font-black text-amber-300">+৳{padmaPremium.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-500">vs Marine Hilsha</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Grams input slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Selected Fish Weight:</span>
                <strong className="text-sky-300 text-sm">{hilshaGrams} grams ({(hilshaGrams/1000).toFixed(2)} kg)</strong>
              </div>
              <input
                type="range"
                min="500"
                max="2200"
                step="50"
                value={hilshaGrams}
                onChange={(e) => setHilshaGrams(parseInt(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Small (500g)</span>
                <span>Standard (1kg)</span>
                <span>Medium (1.2kg)</span>
                <span>Giant (2.2kg)</span>
              </div>
            </div>

            {/* Origin Radio Switcher */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-center justify-around">
              <button
                onClick={() => setHilshaOrigin('padma')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  hilshaOrigin === 'padma'
                    ? 'bg-emerald-600 text-white shadow-lg glow-emerald'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <span>🌊 Authentic Padma River</span>
              </button>
              <button
                onClick={() => setHilshaOrigin('marine')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  hilshaOrigin === 'marine'
                    ? 'bg-cyan-600 text-white shadow-lg glow-cyan'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <span>⚓ Coastal Marine Hilsha</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hilsha Weight-Class & River/Marine Grading Board */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Fish className="w-5 h-5 text-sky-400" />
                <span>Hilsha Weight-Class & River/Marine Grading Board</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Padma River (Mawa/Chandpur) vs Marine Coastal Hilsha
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hilshaTiers.map((h, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-600 transition">
                <div>
                  <span className="text-xs font-bold text-sky-300 block">
                    {h.size}
                  </span>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Padma River Hilsha</span>
                      <span className="text-xl font-black text-emerald-400">৳{h.padmaRate} <span className="text-xs font-normal text-slate-400">/kg</span></span>
                    </div>

                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Marine Coastal Hilsha</span>
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

        {/* Interactive Formalin & Chemical Adulteration Diagnostic Wizard */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase mb-2">
                <HeartPulse className="w-3 h-3" />
                <span>Food Safety Diagnostic Tool</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                4-Step Interactive Formalin Adulteration Diagnostic Wizard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Check off real-world biological indicators to compute the algorithmic adulteration risk score.
              </p>
            </div>

            {/* Score Tile */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${
              isSevereAdulteration 
                ? 'bg-rose-950/60 border-rose-500/50 glow-rose text-rose-300' 
                : isModerateCaution 
                ? 'bg-amber-950/60 border-amber-500/50 glow-amber text-amber-300'
                : 'bg-emerald-950/60 border-emerald-500/50 glow-emerald text-emerald-300'
            }`}>
              <ShieldAlert className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider block">Adulteration Risk</span>
                <div className="text-xl font-black">{riskPoints}% Risk</div>
                <span className="text-[10px] font-semibold">
                  {isSevereAdulteration ? 'SEVERE FORMALIN SUSPECTED!' :
                   isModerateCaution ? 'MODERATE CAUTION REQUIRED' : 'SAFE / CHEMICAL FREE'}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Interactive Checks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Test 1: Gills */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-white">1. Gill Color Test</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${testGills === 'danger' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {testGills === 'danger' ? 'Suspicious' : 'Natural'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fresh natural fish has bright crimson/blood-red gills. Formalin turns them dull brown or bleached pale grey.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTestGills('safe')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testGills === 'safe' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ✓ Bright Crimson
                </button>
                <button
                  onClick={() => setTestGills('danger')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testGills === 'danger' ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ⚠️ Dull Grey / Brown
                </button>
              </div>
            </div>

            {/* Test 2: Fly Attraction */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-white">2. Housefly Attraction Test</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${testFlies === 'danger' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {testFlies === 'danger' ? 'Suspicious' : 'Natural'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Flies naturally swarm over fresh fish stalls. If no flies touch the fish in a warm open market, formalin is heavily suspected.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTestFlies('safe')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testFlies === 'safe' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ✓ Flies Swarming
                </button>
                <button
                  onClick={() => setTestFlies('danger')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testFlies === 'danger' ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ⚠️ Zero Flies Landing
                </button>
              </div>
            </div>

            {/* Test 3: Eyes */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-white">3. Eye Clarity Test</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${testEyes === 'danger' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {testEyes === 'danger' ? 'Suspicious' : 'Natural'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fresh fish has convex, crystal-clear protruding eyes. Chemical formalin turns pupils sunken and milky-clouded.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTestEyes('safe')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testEyes === 'safe' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ✓ Clear & Bulging
                </button>
                <button
                  onClick={() => setTestEyes('danger')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testEyes === 'danger' ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ⚠️ Sunken & Milky
                </button>
              </div>
            </div>

            {/* Test 4: Slime */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-white">4. Slime & Skin Texture</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${testSlime === 'danger' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {testSlime === 'danger' ? 'Suspicious' : 'Natural'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Natural fish is coated with watery transparent slime. Chemical preservation creates abnormal rubbery rigidity.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTestSlime('safe')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testSlime === 'safe' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ✓ Slippery & Soft
                </button>
                <button
                  onClick={() => setTestSlime('danger')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    testSlime === 'danger' ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  ⚠️ Stiff & Dry
                </button>
              </div>
            </div>

          </div>

          {/* Action Callout if High Risk */}
          {isSevereAdulteration && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h4 className="text-sm font-bold text-rose-200">
                  CRITICAL WARNING: High Formalin Adulteration Suspected!
                </h4>
                <p className="text-xs text-rose-300/80 mt-0.5">
                  Do not consume this produce. Report immediately to the DNCRP Task Force for rapid stall raid and laboratory inspection.
                </p>
              </div>
              <Link
                to="/whistle?violation=CHEMICAL_ADULTERATION"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex-shrink-0"
              >
                File BSTI / DNCRP Complaint
              </Link>
            </div>
          )}

        </div>

        {/* Poultry & Meat Benchmarks */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Drumstick className="w-5 h-5 text-amber-400" />
                <span>Tejgaon Egg Auction & Livestock Price Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Wholesale crate auction rates vs urban neighborhood retail
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {poultryItems.map((item, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Wholesale Rate:</span>
                      <strong className="text-cyan-300">৳{item.wholesale}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>DAM Fair Ceiling:</span>
                      <strong className="text-emerald-400">৳{item.capFairHali}</strong>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-slate-800">
                      <span>Retail Price:</span>
                      <span className="text-white">৳{item.retailPerHali}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-500">{item.unit}</span>
                  <Link 
                    to="/heatmap"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <span>View Matrix</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
