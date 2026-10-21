import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, TrendingUp, Truck, Warehouse, Fish, 
  CloudSun, AlertOctagon, Calculator, ShieldCheck, 
  Globe, User, LogOut, RefreshCw, PhoneCall, ArrowUpRight, ArrowDownRight,
  Search, ShoppingCart, Menu, X, Command, Clock, Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useBazaar } from '../context/BazaarContext';

export default function Navbar({ onOpenAuth }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { 
    ticker, 
    isRefreshing, 
    forceRefresh, 
    basket, 
    setIsBasketOpen, 
    setIsCommandPaletteOpen 
  } = useBazaar();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bstTime, setBstTime] = useState(() => {
    return new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setBstTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex || { usdToBdt: 122.86 };
  const gainers = ticker?.topGainers || [];
  const basketCount = basket.reduce((acc, item) => acc + item.qty, 0);

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
    <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md shadow-lg no-print">
      
      {/* Top Real-Time Market Ticker Ribbon */}
      <div className="bg-slate-950 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap justify-between items-center gap-2 border-b border-slate-800/80">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            USD/BDT: <strong>৳{forex.usdToBdt}</strong> <span className="text-[10px] text-slate-400 hidden sm:inline">(Import Parity)</span>
          </span>

          {gainers.slice(0, 2).map((item, idx) => (
            <span key={idx} className="border-l border-slate-800 pl-3 hidden md:flex items-center gap-1 text-slate-300">
              <span>{item.name}:</span>
              <strong className="text-white">৳{item.retailAvgPrice}/{item.unit}</strong>
              <span className={`text-[10px] font-bold flex items-center ${item.deltaPercent >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {item.deltaPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(item.deltaPercent)}%
              </span>
            </span>
          ))}

          <span className="border-l border-slate-800 pl-3 hidden xl:inline text-amber-400">
            Karwan Wholesale Baseline Active
          </span>

          <span className="border-l border-slate-800 pl-3 hidden lg:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>BST: <strong className="text-white">{bstTime}</strong></span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:13346"
            className="bg-rose-600/30 hover:bg-rose-600 border border-rose-500/40 text-rose-200 hover:text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition"
            title="DNCRP Consumer Rights Hotline"
          >
            <PhoneCall className="w-3 h-3" />
            <span>13346</span>
          </a>

          <button
            onClick={forceRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition disabled:opacity-50 text-[11px]"
            title="Synchronize live agricultural & forex telemetry"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-950 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-white leading-none group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                <span>{t('brand')}</span>
                <span className="hidden 2xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Award className="w-2.5 h-2.5" />
                  <span>National ICT Nominee</span>
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium hidden sm:block">
                {t('brand_sub')}
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Links (1280px+) */}
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

        {/* Right Action Icons: Command Search, Fair Basket, Auth, and Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Command Palette Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs transition"
            title="Search commodities or pages (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline text-slate-400 text-[11px]">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-slate-800 text-[10px] text-slate-400 border border-slate-700 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Citizen Fair Basket Trigger */}
          <button
            onClick={() => setIsBasketOpen(true)}
            className="relative p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-amber-400 transition"
            title="Citizen Fair Price Basket"
          >
            <ShoppingCart className="w-4 h-4" />
            {basketCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {basketCount}
              </span>
            )}
          </button>

          {/* User Profile / Login */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 py-1 px-2.5 rounded-xl border border-slate-700">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">{user.name}</span>
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
              <span className="hidden sm:inline">{t('btn_login')}</span>
            </button>
          )}

          {/* Mobile Hamburger Button (visible below xl: 1280px) */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Responsive Slide-Down Drawer for Tablet & Mobile screens (< 1280px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-3 animate-fadeIn backdrop-blur-lg max-h-[80vh] overflow-y-auto">
          
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Platform Modules & Portals
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                    isActive 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile User Profile if logged in */}
          {user && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">{user.name}</div>
                  <span className="text-[10px] text-emerald-400 uppercase font-semibold">{user.role}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold"
              >
                Logout
              </button>
            </div>
          )}

          {/* Quick DNCRP Hotline in Mobile Drawer */}
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex justify-between items-center">
            <span className="text-xs font-bold text-rose-200">
              DNCRP Complaint Speed Dial
            </span>
            <a
              href="tel:13346"
              className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-black flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>13346</span>
            </a>
          </div>

        </div>
      )}

    </header>
  );
}
