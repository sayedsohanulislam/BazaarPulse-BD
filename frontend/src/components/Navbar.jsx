import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, TrendingUp, Truck, Warehouse, Fish, 
  CloudSun, AlertOctagon, Calculator, ShieldCheck, 
  Globe, User, LogOut, RefreshCw, PhoneCall, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useBazaar } from '../context/BazaarContext';

export default function Navbar({ onOpenAuth }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { ticker, isRefreshing, forceRefresh } = useBazaar();
  const location = useLocation();

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex || { usdToBdt: 122.86 };
  const gainers = ticker?.topGainers || [];

  const links = [
    { to: '/', label: t('nav_home'), icon: ShoppingBag },
    { to: '/heatmap', label: t('nav_heatmap'), icon: TrendingUp },
    { to: '/tcb', label: t('nav_tcb'), icon: Truck },
    { to: '/supply', label: t('nav_supply'), icon: Warehouse },
    { to: '/fish-meat', label: t('nav_fish_meat'), icon: Fish },
    { to: '/agro', label: t('nav_agro'), icon: CloudSun },
    { to: '/whistle', label: t('nav_whistle'), icon: AlertOctagon },
    { to: '/budget', label: t('nav_budget'), icon: Calculator },
    { to: '/authority', label: t('nav_authority'), icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      {/* Top Real-Time Market Ticker Ribbon */}
      <div className="bg-slate-950 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap justify-between items-center gap-2 border-b border-slate-800/80">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            USD/BDT: <strong>৳{forex.usdToBdt}</strong> (Import Parity)
          </span>

          {gainers.slice(0, 2).map((item, idx) => (
            <span key={idx} className="border-l border-slate-800 pl-3 flex items-center gap-1 text-slate-300">
              <span>{lang === 'bn' ? item.nameBn : item.name}:</span>
              <strong className="text-white">৳{item.retailAvgPrice}/{item.unit}</strong>
              <span className={`text-[10px] font-bold flex items-center ${item.deltaPercent >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {item.deltaPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(item.deltaPercent)}%
              </span>
            </span>
          ))}

          <span className="border-l border-slate-800 pl-3 hidden lg:inline text-amber-400">
            {lang === 'bn' ? 'কাওরান বাজার আড়ত পাইকারি রেট সক্রিয়' : 'Karwan Bazar Wholesale Rates Live'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:13346"
            className="bg-rose-600/30 hover:bg-rose-600 border border-rose-500/40 text-rose-200 hover:text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition"
            title="DNCRP Consumer Rights Hotline"
          >
            <PhoneCall className="w-3 h-3" />
            <span>DNCRP 13346</span>
          </a>

          <button
            onClick={forceRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition disabled:opacity-50 text-[11px]"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
          </button>

          <button
            onClick={toggleLanguage}
            className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-2 py-0.5 rounded-lg border border-slate-700 flex items-center gap-1 text-[11px] font-bold"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-950">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-white leading-none">
              {t('brand')}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {t('brand_sub')}
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  isActive 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Button */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2 bg-slate-800 py-1 px-3 rounded-full border border-slate-700">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200 max-w-[110px] truncate">{user.name}</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full uppercase font-bold border border-emerald-500/30">
                {user.role}
              </span>
              <button onClick={logout} className="text-slate-400 hover:text-rose-400 ml-1">
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md shadow-emerald-950/40 flex items-center gap-1.5 transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('btn_login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
