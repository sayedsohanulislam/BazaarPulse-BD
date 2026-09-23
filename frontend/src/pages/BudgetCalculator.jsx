import React, { useState, useEffect } from 'react';
import { 
  Calculator, Users, ShoppingBag, DollarSign, ArrowRight, 
  CheckCircle2, Sparkles, Scale, Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { analyticsApi } from '../services/api';

export default function BudgetCalculator() {
  const { lang } = useLanguage();
  const [familySize, setFamilySize] = useState(4);
  const [budgetResult, setBudgetResult] = useState(null);
  const [iftarResult, setIftarResult] = useState(null);

  useEffect(() => {
    fetchBudget();
    fetchIftar();
  }, [familySize]);

  const fetchBudget = async () => {
    try {
      const res = await analyticsApi.calcBudget({ familySize });
      if (res.data.success) {
        setBudgetResult(res.data.data);
      }
    } catch (err) {
      console.error('Error calculating budget:', err);
    }
  };

  const fetchIftar = async () => {
    try {
      const res = await analyticsApi.calcIftarBasket();
      if (res.data.success) {
        setIftarResult(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching iftar basket:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>{lang === 'bn' ? 'পারিবারিক নিত্যপণ্য বাজেট ও রমজান ইফতার প্ল্যানার' : 'Family Grocery Budget & Ramadan Iftar Planner'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'ন্যায্যমূল্যের মাসিক বাজেট ও সাশ্রয় ক্যালকুলেটর' : 'Monthly Grocery Budget & Fair Price Savings Estimator'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {lang === 'bn' 
                ? 'পরিবারের সদস্য সংখ্যা অনুযায়ী মাসিক চাল, ডাল, তেল ও মাংসের খরচ এবং পাড়া-মহল্লার বাড়তি দামের হিসাব।' 
                : 'Estimate monthly staples costs based on family size and compare fair government rates against open retail rates.'}
            </p>
          </div>
        </div>

        {/* Family Size Selector & Budget Spotlight */}
        <div className="bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'bn' ? 'পরিবারের সদস্য সংখ্যা নির্বাচন করুন:' : 'Select Family Household Size:'}</span>
              </h3>
            </div>

            <div className="flex gap-2">
              {[2, 3, 4, 5, 6, 8].map(size => (
                <button
                  key={size}
                  onClick={() => setFamilySize(size)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    familySize === size 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40' 
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {size} {lang === 'bn' ? 'সদস্য' : 'Persons'}
                </button>
              ))}
            </div>
          </div>

          {budgetResult && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">
                  {lang === 'bn' ? 'সরকারি ন্যায্যমূল্যে মাসিক খরচ' : 'Cost at Government Fair Caps'}
                </span>
                <div className="text-3xl font-black text-emerald-400 mt-2">
                  ৳{budgetResult.fairMonthlyTotal.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Based on DAM retail benchmarks</span>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">
                  {lang === 'bn' ? 'খোলা বাজারে বর্তমান খরচ' : 'Cost at Current Retail Rates'}
                </span>
                <div className="text-3xl font-black text-rose-400 mt-2">
                  ৳{budgetResult.marketMonthlyTotal.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Neighborhood grocery average</span>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">
                  {lang === 'bn' ? 'ন্যায্যমূল্যে আপনার সম্ভাব্য সাশ্রয়' : 'Potential Monthly Savings'}
                </span>
                <div className="text-3xl font-black text-cyan-300 mt-2">
                  ৳{budgetResult.monthlySavingAtFairPrices.toLocaleString()}
                </div>
                <span className="text-[10px] text-amber-400 mt-1 block">
                  +{budgetResult.inflationOverFairPct}% retail markup
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Ramadan Iftar Basket Section */}
        {iftarResult && (
          <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>{iftarResult.bundleName}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'bn' ? '৩০ দিনের পূর্ণাঙ্গ ইফতার প্যাকেজ (ছোলা, খেজুর, বেসন, চিনি ও পেঁয়াজ)' : 'Full 30-Day Ramadan Basket Itemized Breakdown'}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'প্যাকেজে মোট সাশ্রয়:' : 'Total Basket Savings:'}</span>
                <span className="text-xl font-black text-emerald-400">৳{iftarResult.totalSavings.toLocaleString()}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Package Item</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Fair Cost (সরকারি)</th>
                    <th className="p-3">Open Market Cost</th>
                    <th className="p-3 text-right">Savings (সাশ্রয়)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {iftarResult.items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50">
                      <td className="p-3 font-semibold text-white">{it.item}</td>
                      <td className="p-3 text-slate-400">{it.qty}</td>
                      <td className="p-3 text-emerald-400 font-bold">৳{it.fairCost}</td>
                      <td className="p-3 text-rose-400">৳{it.marketCost}</td>
                      <td className="p-3 text-right font-bold text-cyan-300">৳{it.saving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
