import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, Home, TrendingUp, Truck, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/80 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        
        <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto animate-bounce">
          <AlertOctagon className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl font-black text-white mt-1">
            Lost in the Bazaar?
          </h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            The market intelligence module or commodity link you are trying to visit does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/heatmap"
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Price Heatmap</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
