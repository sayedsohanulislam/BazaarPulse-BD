import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, loginAsRole } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('citizen');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let res;
    if (isRegister) {
      res = await register({ name, email, password, role });
    } else {
      res = await login(email, password);
    }
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Authentication failed');
    }
  };

  const handleDemo = async (demoRole) => {
    setLoading(true);
    await loginAsRole(demoRole);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {isRegister ? 'Create Account' : 'BazaarPulse Login'}
          </h3>
        </div>

        {/* Quick Demo Role Logins */}
        <div className="mt-4 mb-5 p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
            One-Click Demo Access:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemo('citizen')}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-slate-700 text-left truncate"
            >
              👤 Consumer
            </button>
            <button
              onClick={() => handleDemo('trader')}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-slate-700 text-left truncate"
            >
              🏬 Wholesale Aratdar
            </button>
            <button
              onClick={() => handleDemo('magistrate')}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 border border-slate-700 text-left truncate"
            >
              ⚖️ DNCRP Magistrate
            </button>
            <button
              onClick={() => handleDemo('admin')}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-violet-300 border border-slate-700 text-left truncate"
            >
              🛡️ System Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-2.5 mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                placeholder="e.g. Asif Mahmud"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              placeholder="user@bazaarpulse.bd"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              placeholder="••••••••"
            />
          </div>

          {isRegister && (
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="citizen">Citizen Consumer</option>
                <option value="trader">Wholesale Aratdar / Retailer</option>
                <option value="magistrate">DNCRP Magistrate</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg shadow-emerald-900/40 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-xs text-emerald-400 hover:underline"
          >
            {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
