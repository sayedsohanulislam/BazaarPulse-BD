import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Truck, Search, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function MobileBottomNav({ onOpenMobileMenu }) {
  const { lang, t } = useLanguage();
  const { basket, setIsBasketOpen, setIsCommandPaletteOpen } = useBazaar();
  const location = useLocation();

  const basketCount = basket.reduce((acc, item) => acc + item.qty, 0);

  const navItems = [
    { to: '/', label: lang === 'bn' ? 'বাজার' : 'Home', icon: ShoppingBag },
    { to: '/heatmap', label: lang === 'bn' ? 'দাম' : 'Prices', icon: TrendingUp },
    { to: '/tcb', label: lang === 'bn' ? 'টিসিবি' : 'TCB OMS', icon: Truck },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg px-2 py-1.5 shadow-2xl mobile-bottom-nav">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </NavLink>
          );
        })}

        {/* Fair Basket Trigger */}
        <button
          onClick={() => setIsBasketOpen(true)}
          className="flex flex-col items-center py-1 px-3 rounded-xl relative text-slate-400 hover:text-white transition"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            {basketCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {basketCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 text-amber-300 font-medium">
            {lang === 'bn' ? 'ব্যাগ' : 'Basket'}
          </span>
        </button>

        {/* Global Search / Menu Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-400 hover:text-white transition"
        >
          <Search className="w-5 h-5 text-cyan-400" />
          <span className="text-[10px] mt-0.5 text-cyan-300 font-medium">
            {lang === 'bn' ? 'অনুসন্ধান' : 'Search'}
          </span>
        </button>
      </div>
    </div>
  );
}
