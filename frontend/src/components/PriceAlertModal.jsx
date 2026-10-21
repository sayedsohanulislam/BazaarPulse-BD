import React, { useState } from 'react';
import { X, Bell, Mail, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function PriceAlertModal({ isOpen, onClose, preselectedCommodity }) {
  const { lang } = useLanguage();
  const { commodities, addToast } = useBazaar();
  
  const [channel, setChannel] = useState('email'); // 'email' | 'telegram'
  const [contact, setContact] = useState('');
  const [selectedCommodityId, setSelectedCommodityId] = useState(
    preselectedCommodity?.id || preselectedCommodity?._id || commodities?.[0]?.id || ''
  );
  const [alertCondition, setAlertCondition] = useState('gouging_10');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.trim()) {
      if (addToast) addToast('Please enter your contact details', 'error');
      return;
    }

    const selectedComm = (commodities || []).find(c => (c.id || c._id) === selectedCommodityId) || commodities?.[0];
    setSubmitted(true);

    if (addToast) {
      addToast(
        `Alert activated! You will be notified when ${selectedComm?.name || 'commodity'} changes price.`,
        'success'
      );
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setContact('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#090e1c] border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Real-Time Price Alert Subscription
              </h3>
              <span className="text-[10px] text-slate-400">Email & Telegram Dispatch</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Subscription Active!</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
                We've linked your {channel === 'email' ? 'email' : 'Telegram'} (<strong className="text-white">{contact}</strong>) to real-time price monitoring feeds.
              </p>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-xs text-slate-400 text-left">
              <span className="text-emerald-400 font-bold block mb-1">✓ Automated Dispatch Rule:</span>
              Daily morning price digest + instant flash alert whenever price exceeds 10% above DAM Fair Price.
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950/40"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Channel Tabs */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Delivery Channel
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setChannel('email')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    channel === 'email'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Digest</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('telegram')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    channel === 'telegram'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram Bot</span>
                </button>
              </div>
            </div>

            {/* Contact Input */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {channel === 'email' ? 'Your Email Address' : 'Telegram Handle / Number'}
              </label>
              <input
                type={channel === 'email' ? 'email' : 'text'}
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={channel === 'email' ? 'citizen@example.com' : '@username or +88017...'}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Commodity Select */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Commodity to Monitor
              </label>
              <select
                value={selectedCommodityId}
                onChange={(e) => setSelectedCommodityId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Essential Groceries (Daily Digest)</option>
                {(commodities || []).map(c => (
                  <option key={c.id || c._id} value={c.id || c._id}>
                    {c.name} - Retail: ৳{c.retailAvgPrice} / {c.unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Select */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Alert Trigger Condition
              </label>
              <select
                value={alertCondition}
                onChange={(e) => setAlertCondition(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="gouging_10">When price exceeds 10% above DAM Fair Cap</option>
                <option value="gouging_25">Severe Syndicate Surge (25%+ over Fair Cap)</option>
                <option value="fair_drop">When price returns down to Government Fair Price</option>
                <option value="daily_digest">Daily Morning 7:00 AM Price Summary</option>
              </select>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-950/40"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Activate Price Alert</span>
            </button>

            <p className="text-[10px] text-slate-500 text-center">
              100% Free Civic Service. No spam. One-click unsubscribe anytime.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
