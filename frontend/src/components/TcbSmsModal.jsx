import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, Phone, Bell, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function TcbSmsModal({ isOpen, onClose }) {
  const { addToast } = useBazaar();
  const [phone, setPhone] = useState('');
  const [thana, setThana] = useState('Mirpur');
  const [subscribed, setSubscribed] = useState(false);
  const [simulatedSms, setSimulatedSms] = useState(null);

  if (!isOpen) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      alert('Please enter a valid 11-digit Bangladesh mobile number');
      return;
    }

    const smsMessage = `[TCB-ALERTS] OMS Subsidized Truck #DH-14 has reached ${thana} point. Soybean Oil Tk 100/L, Lentils Tk 60/kg, Sugar Tk 70/kg. Dealer Phone: 01712-445566. Consumer Rights Hotline: 13346.`;
    
    setSimulatedSms(smsMessage);
    setSubscribed(true);
    addToast('SMS Alert subscription active for your Thana!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Free TCB Truck Arrival SMS Alerts
              </h3>
              <p className="text-[11px] text-slate-400">
                Instant dispatch alerts straight to your phone
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Thana / Location
              </label>
              <select
                value={thana}
                onChange={(e) => setThana(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Mirpur">Mirpur</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Farmgate">Farmgate / Tejgaon</option>
                <option value="Uttara">Uttara</option>
                <option value="Jatrabari">Jatrabari</option>
                <option value="Mohammadpur">Mohammadpur</option>
                <option value="Gulshan">Gulshan / Badda</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Mobile Phone Number (11 Digits)
              </label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-[11px] text-cyan-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
              <span>
                Free civic service powered by TCB OMS telematics. No promotional spam.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-950/50 transition flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Activate Free Alerts</span>
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">
                SMS Subscription Activated!
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Real-time SMS alerts will be dispatched to {phone} as soon as trucks arrive in {thana}.
              </p>
            </div>

            {/* Simulated Live SMS Bubble */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-left text-xs space-y-1.5 shadow-inner">
              <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>Incoming Civic SMS Preview</span>
                </span>
                <span>Just Now</span>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px] font-mono">
                {simulatedSms}
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
