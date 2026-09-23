import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Gavel, AlertOctagon, CheckCircle2, Warehouse, 
  Send, FileSpreadsheet, RefreshCw, Eye, UserCheck, Flame, Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { authorityApi } from '../services/api';

export default function AuthorityCommand() {
  const { lang } = useLanguage();
  const { user, loginAsRole } = useAuth();
  const [raids, setRaids] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  // Raid logging form
  const [raidForm, setRaidForm] = useState({
    magistrateName: '',
    targetMarket: '',
    district: 'Dhaka',
    infraction: '',
    fineAmountBdt: 25000,
    goodsSeizedKg: 500,
    shopsSealedCount: 1
  });
  const [loggingRaid, setLoggingRaid] = useState(false);

  // Bulletin publishing form
  const [bulletinForm, setBulletinForm] = useState({
    title: '',
    titleBn: '',
    severity: 'HIGH',
    directive: ''
  });
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [raidsRes, auditRes] = await Promise.all([
        authorityApi.getRaids(),
        authorityApi.getAuditLogs()
      ]);
      if (raidsRes.data.success) setRaids(raidsRes.data.data);
      if (auditRes.data.success) setAuditLogs(auditRes.data.data);
    } catch (err) {
      console.error('Error fetching authority data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogRaid = async (e) => {
    e.preventDefault();
    if (!raidForm.targetMarket || !raidForm.infraction) {
      alert('Target market and infraction required');
      return;
    }
    setLoggingRaid(true);
    try {
      const res = await authorityApi.logRaid(raidForm);
      if (res.data.success) {
        setActionMsg(lang === 'bn' ? 'ভ্রাম্যমাণ আদালতের অভিযান সফলভাবে নিবন্ধিত হয়েছে!' : 'Mobile court raid recorded successfully!');
        setRaidForm({
          magistrateName: '',
          targetMarket: '',
          district: 'Dhaka',
          infraction: '',
          fineAmountBdt: 25000,
          goodsSeizedKg: 500,
          shopsSealedCount: 1
        });
        fetchData();
      }
    } catch (err) {
      alert('Failed to log raid');
    } finally {
      setLoggingRaid(false);
      setTimeout(() => setActionMsg(''), 4000);
    }
  };

  const handlePublishBulletin = async (e) => {
    e.preventDefault();
    if (!bulletinForm.title || !bulletinForm.directive) {
      alert('Title and directive required');
      return;
    }
    setPublishing(true);
    try {
      const res = await authorityApi.publishBulletin(bulletinForm);
      if (res.data.success) {
        setActionMsg(lang === 'bn' ? 'জাতীয় বাজার সতর্কবার্তা দেশজুড়ে লাইভ জারি হয়েছে!' : 'Emergency market bulletin published live!');
        setBulletinForm({ title: '', titleBn: '', severity: 'HIGH', directive: '' });
      }
    } catch (err) {
      alert('Failed to publish bulletin');
    } finally {
      setPublishing(false);
      setTimeout(() => setActionMsg(''), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Role Switcher */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Gavel className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>{lang === 'bn' ? 'জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) নিয়ন্ত্রণ কক্ষ' : 'DNCRP & Executive Magistrate Enforcement Room'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'bn' ? 'ভ্রাম্যমাণ আদালত, সিন্ডিকেট দমন ও জরিমানা লেজার' : 'Mobile Court Actions & Anti-Syndicate Raid Ledger'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'কাওরান বাজার ও জেলাভিত্তিক পাইকারি আড়তে মূল্য তালিকা প্রদর্শন, ডিজিটাল স্কেল যাচাই ও জরিমানা আদায়।' 
                  : 'Official enforcement logs, confiscation records, and national emergency directives under Consumer Rights Act 2009.'}
              </p>
            </div>

            {/* Role Demo Switcher */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'বর্তমান ভূমিকা:' : 'Active Role:'} <strong className="text-emerald-400 uppercase">{user?.role || 'Guest / Citizen'}</strong>
              </span>
              <div className="flex gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-700">
                {['citizen', 'trader', 'magistrate', 'admin'].map(r => (
                  <button
                    key={r}
                    onClick={() => loginAsRole(r)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      user?.role === r 
                        ? 'bg-rose-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {actionMsg && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionMsg}</span>
            </div>
          )}
        </div>

        {/* National Enforcement KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-850 border border-slate-700/80 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">{lang === 'bn' ? 'মোট ভ্রাম্যমাণ আদালত জরিমানা' : 'Total Fines Imposed'}</span>
            <div className="text-2xl font-black text-rose-400 mt-2">৳ ৮৫.৫০ লাখ</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Consumer Rights Act 2009</span>
          </div>

          <div className="bg-slate-850 border border-slate-700/80 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">{lang === 'bn' ? 'জব্দকৃত মজুত আলু ও তেল' : 'Seized Hoarded Staples'}</span>
            <div className="text-2xl font-black text-amber-400 mt-2">১২০ টন</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Distributed via TCB Trucks</span>
          </div>

          <div className="bg-slate-850 border border-slate-700/80 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">{lang === 'bn' ? 'সিলগালাকৃত অবৈধ আড়ত' : 'Shops Sealed / Suspended'}</span>
            <div className="text-2xl font-black text-cyan-400 mt-2">৪৮ টি</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Tejgaon & Karwan Bazar</span>
          </div>

          <div className="bg-slate-850 border border-slate-700/80 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">{lang === 'bn' ? 'জব্দকৃত কারসাজির ডিজিটাল স্কেল' : 'Confiscated Tampered Scales'}</span>
            <div className="text-2xl font-black text-emerald-400 mt-2">৬৫০ টি</div>
            <span className="text-[10px] text-slate-500 mt-1 block">BSTI Calibration Drives</span>
          </div>
        </div>

        {/* Dual Actions Grid: Log Raid & Publish Bulletin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Log Raid Form */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ভ্রাম্যমাণ আদালতের অভিযান লিপিবদ্ধকরণ' : 'Record Mobile Court Enforcement Action'}</span>
            </div>
            <h3 className="text-base font-bold text-white mb-4">
              {lang === 'bn' ? 'অভিযান ও জরিমানা নথিভুক্ত করুন' : 'Log Market Raid & Penalties'}
            </h3>

            <form onSubmit={handleLogRaid} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Magistrate / Officer Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Abdul Jabbar"
                    value={raidForm.magistrateName}
                    onChange={(e) => setRaidForm({...raidForm, magistrateName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Target Market</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Karwan Bazar Arat"
                    value={raidForm.targetMarket}
                    onChange={(e) => setRaidForm({...raidForm, targetMarket: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Infraction / Legal Violation</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Failure to display price list board & egg price manipulation"
                  value={raidForm.infraction}
                  onChange={(e) => setRaidForm({...raidForm, infraction: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Fine (BDT)</label>
                  <input 
                    type="number" 
                    value={raidForm.fineAmountBdt}
                    onChange={(e) => setRaidForm({...raidForm, fineAmountBdt: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Seized (kg)</label>
                  <input 
                    type="number" 
                    value={raidForm.goodsSeizedKg}
                    onChange={(e) => setRaidForm({...raidForm, goodsSeizedKg: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Sealed Shops</label>
                  <input 
                    type="number" 
                    value={raidForm.shopsSealedCount}
                    onChange={(e) => setRaidForm({...raidForm, shopsSealedCount: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loggingRaid}
                className="w-full mt-2 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/40 transition flex items-center justify-center gap-2"
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>{loggingRaid ? 'Logging...' : 'Submit Mobile Court Record'}</span>
              </button>
            </form>
          </div>

          {/* Publish Bulletin Form */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertOctagon className="w-4 h-4 text-amber-500" />
              <span>{lang === 'bn' ? 'জাতীয় বাজার নির্দেশিকা ও জরুরি সতর্কতা প্রচার' : 'Publish National Market Directive'}</span>
            </div>
            <h3 className="text-base font-bold text-white mb-4">
              {lang === 'bn' ? 'নাগরিকদের জন্য ব্রডকাস্ট জারি করুন' : 'Dispatch Public Pricing Directive'}
            </h3>

            <form onSubmit={handlePublishBulletin} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Bulletin Title (English)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Strict Warning Against Egg Arat Syndicate"
                  value={bulletinForm.title}
                  onChange={(e) => setBulletinForm({...bulletinForm, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Bulletin Title (Bangla)</label>
                <input 
                  type="text" 
                  required
                  placeholder="যেমন: ডিমের আড়তে মূল্যতালিকা বাধ্যতামূলক প্রদর্শনের নির্দেশ"
                  value={bulletinForm.titleBn}
                  onChange={(e) => setBulletinForm({...bulletinForm, titleBn: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Directive Details & Legal Warning</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Retailers charging above DAM indicative cap will face immediate closure under Section 40."
                  value={bulletinForm.directive}
                  onChange={(e) => setBulletinForm({...bulletinForm, directive: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={publishing}
                className="w-full mt-2 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{publishing ? 'Publishing...' : 'Broadcast Directive Nationally'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Mobile Court Raid History Ledger */}
        <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Gavel className="w-5 h-5 text-rose-400" />
              <span>{lang === 'bn' ? 'সাম্প্রতিক ভ্রাম্যমাণ আদালত অভিযান ও জব্দ তালিকা' : 'Recent Mobile Court Raids & Confiscations'}</span>
            </h3>
            <span className="text-xs text-slate-400">Total: {raids.length} Operations</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Target Market</th>
                  <th className="p-3">Infraction</th>
                  <th className="p-3">Fine Imposed</th>
                  <th className="p-3">Goods Seized</th>
                  <th className="p-3">Shops Sealed</th>
                  <th className="p-3 text-right">Magistrate / Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {raids.map(r => (
                  <tr key={r.id || r._id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-white">{r.targetMarket} ({r.district})</td>
                    <td className="p-3 text-slate-300">{r.infraction}</td>
                    <td className="p-3 font-bold text-rose-400">৳{r.fineAmountBdt.toLocaleString()}</td>
                    <td className="p-3 text-amber-400">{r.goodsSeizedKg ? `${r.goodsSeizedKg} kg` : 'None'}</td>
                    <td className="p-3">{r.shopsSealedCount || 0}</td>
                    <td className="p-3 text-right text-slate-400">{r.magistrateName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Immutable Audit Log */}
        <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-slate-400" />
            <span>{lang === 'bn' ? 'অডিট ও প্রয়োগ কার্যক্রমের ইতিহাস' : 'Enforcement & Inspection Audit Log'}</span>
          </h3>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-slate-400 ml-2">by {log.performedBy}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
