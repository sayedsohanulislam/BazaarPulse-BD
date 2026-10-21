import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, HeartHandshake, PhoneCall, ExternalLink, Mail, Check, Github, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';

export default function Footer() {
  const { lang, t } = useLanguage();
  const { addToast } = useBazaar();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    if (addToast) addToast('Subscribed to Weekly Civic Price Digest!', 'success');
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 text-xs no-print">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand & Mission Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">{t('brand')}</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Open-access civic market intelligence platform integrating DAM fair price caps, TCB subsidized trucks, and DNCRP consumer law enforcement.
          </p>
          <div className="flex items-center gap-3 pt-2 text-slate-400">
            <a href="https://github.com/sayedsohanulislam/BazaarPulse-BD" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Regulatory Sources & Transparency */}
        <div>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            Regulatory Data Sources
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>DAM: Department of Agricultural Marketing</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
              <span>TCB: Trading Corporation of Bangladesh</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              <span>DNCRP: Directorate of Consumer Rights</span>
            </li>
            <li className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>BBS: Bangladesh Bureau of Statistics</span>
            </li>
          </ul>
        </div>

        {/* Consumer Hotlines */}
        <div>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            Emergency Citizen Hotlines
          </h4>
          <div className="space-y-2 text-[11px]">
            <a href="tel:13346" className="block bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:border-slate-700 transition">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>13346 (DNCRP Hotline)</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Report overcharging & artificial hoarding</div>
            </a>
            <a href="tel:16122" className="block bg-slate-900 border border-slate-800 p-2 rounded-xl hover:border-slate-700 transition">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3" />
                <span>16122 (DAM Krishi Helpline)</span>
              </div>
              <div className="text-[10px] text-slate-500">Agricultural rates & cold storage disputes</div>
            </a>
          </div>
        </div>

        {/* Weekly Price Digest Newsletter */}
        <div>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            Weekly Price Digest
          </h4>
          <p className="text-[11px] leading-relaxed text-slate-400 mb-3">
            Get every Friday's Karwan Bazar wholesale price movement and weekend market outlook delivered to your inbox.
          </p>
          {subscribed ? (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="citizen@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
              >
                Join Free Digest
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Legal & Indicative Disclaimer Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
        <div>
          © 2026 BazaarPulse BD. Built for the citizens, farmers, and fair traders of Bangladesh. Indicative prices synthesized from DAM, TCB, and community whistleblowers.
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400">Agricultural Marketing Act 2018</span>
          <span>•</span>
          <span className="hover:text-slate-400">DNCRP Act 2009 (Sec 40)</span>
          <span>•</span>
          <span className="hover:text-slate-400">Open Data License</span>
        </div>
      </div>
    </footer>
  );
}
