import React, { useState, useEffect } from 'react';
import { 
  AlertOctagon, Shield, CheckCircle2, MapPin, Camera, 
  Send, Search, Clock, Scale, Lock, Eye, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { whistleApi } from '../services/api';

export default function ConsumerWhistleblower() {
  const { lang } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchToken, setSearchToken] = useState('');
  const [filterViolation, setFilterViolation] = useState('ALL');

  // Report Form state
  const [form, setForm] = useState({
    marketName: '',
    district: 'Dhaka',
    shopNumberOrSeller: '',
    violationType: 'PRICE_GOUGING',
    commodityInvolved: 'Local Onion (দেশি পেঁয়াজ)',
    chargedPrice: 120,
    governmentCapPrice: 95,
    gpsCoordinates: '23.8103, 90.4125',
    reporterPhone: '',
    isAnonymous: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await whistleApi.getReports();
      if (res.data.success && res.data.data) {
        setReports(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm(prev => ({
            ...prev,
            gpsCoordinates: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
          }));
          alert(lang === 'bn' ? 'জিপিএস স্থানাঙ্ক সংযুক্ত হয়েছে!' : 'GPS coordinates captured!');
        },
        () => alert('Could not fetch GPS')
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.marketName) {
      alert(lang === 'bn' ? 'বাজারের নাম লিখুন' : 'Please provide market name');
      return;
    }
    setSubmitting(true);
    try {
      const res = await whistleApi.submitReport(form);
      if (res.data.success) {
        setSubmitResult(res.data.data);
        fetchReports();
        setForm({
          marketName: '',
          district: 'Dhaka',
          shopNumberOrSeller: '',
          violationType: 'PRICE_GOUGING',
          commodityInvolved: 'Local Onion (দেশি পেঁয়াজ)',
          chargedPrice: 120,
          governmentCapPrice: 95,
          gpsCoordinates: '23.8103, 90.4125',
          reporterPhone: '',
          isAnonymous: true
        });
      }
    } catch (err) {
      alert('Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await whistleApi.updateStatus(id, { 
        status: newStatus,
        actionTakenNotes: 'DNCRP Executive Magistrate raided stall and enforced compliance.' 
      });
      if (res.data.success) {
        fetchReports();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesViolation = filterViolation === 'ALL' || r.violationType === filterViolation;
    const matchesSearch = !searchToken || 
                          (r.trackingToken || '').toLowerCase().includes(searchToken.toLowerCase()) ||
                          (r.marketName || '').toLowerCase().includes(searchToken.toLowerCase()) ||
                          (r.commodityInvolved || '').toLowerCase().includes(searchToken.toLowerCase());
    return matchesViolation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertOctagon className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>{lang === 'bn' ? 'ভোক্তা অধিকার সংরক্ষণ হুইসেলব্লোয়ার পোর্টাল' : 'DNCRP Anti-Gouging Whistleblower Portal'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'bn' ? 'অতিরিক্ত দাম, ওজনে কম ও মজুতদারির অভিযোগ' : 'Report Price Gouging & Digital Scale Cheating'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'bn' 
                  ? 'জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) বরাবর সরাসরি ডিজিটাল অভিযোগ ও ট্র্যাকিং।' 
                  : 'Submit price gouging or weight cheating violations with optional 100% anonymous protection.'}
              </p>
            </div>
          </div>
        </div>

        {/* Complaint Filing Form & Tracking Ledger Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Complaint Form */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-850 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Shield className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন অভিযোগ দাখিল ফরম' : 'File Consumer Complaint (Protected)'}</span>
            </div>

            {submitResult ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {lang === 'bn' ? 'অভিযোগ সফলভাবে নিবন্ধিত হয়েছে!' : 'Complaint Registered Successfully!'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {lang === 'bn' ? 'আপনার ট্র্যাকিং টোকেনটি সংরক্ষণ করুন:' : 'Keep this tracking token safe:'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 font-mono text-center text-emerald-400 font-bold tracking-widest text-sm">
                  {submitResult.trackingToken || 'BZ-REP-91021'}
                </div>

                <button
                  onClick={() => setSubmitResult(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
                >
                  {lang === 'bn' ? 'আরেকটি অভিযোগ করুন' : 'File Another Complaint'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {lang === 'bn' ? 'কাঁচাবাজারের নাম:' : 'Market Name:'}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Mirpur-1 Kitchen Market"
                      value={form.marketName}
                      onChange={(e) => setForm({...form, marketName: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {lang === 'bn' ? 'জেলা:' : 'District:'}
                    </label>
                    <select 
                      value={form.district}
                      onChange={(e) => setForm({...form, district: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Munshiganj">Munshiganj</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {lang === 'bn' ? 'দোকান নম্বর / বিক্রেতা:' : 'Shop Number or Stall Name:'}
                    </label>
                    <input 
                      type="text" 
                      placeholder="Shop #34, Bhai Bhai Store"
                      value={form.shopNumberOrSeller}
                      onChange={(e) => setForm({...form, shopNumberOrSeller: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {lang === 'bn' ? 'অভিযোগের ধরন:' : 'Violation Category:'}
                    </label>
                    <select 
                      value={form.violationType}
                      onChange={(e) => setForm({...form, violationType: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                    >
                      <option value="PRICE_GOUGING">Price Gouging (অতিরিক্ত দাম নেওয়া)</option>
                      <option value="DIGITAL_SCALE_FRAUD">Digital Scale Fraud (ওজনে কারসাজি)</option>
                      <option value="ARTIFICIAL_HOARDING">Artificial Hoarding (মজুতদারি)</option>
                      <option value="REFUSAL_TO_SELL">Refusal to Sell (বিক্রিতে অস্বীকৃতি)</option>
                      <option value="MANDATORY_RECEIPT_ABSENCE">No Receipt (ক্রয় রশিদ না দেওয়া)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    {lang === 'bn' ? 'সংশ্লিষ্ট পণ্য:' : 'Commodity Involved:'}
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Local Onion / Soybean Oil / Potato"
                    value={form.commodityInvolved}
                    onChange={(e) => setForm({...form, commodityInvolved: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {lang === 'bn' ? 'দাবিকৃত দাম (টাকা):' : 'Charged Price (BDT):'}
                    </label>
                    <input 
                      type="number" 
                      value={form.chargedPrice}
                      onChange={(e) => setForm({...form, chargedPrice: Number(e.target.value)})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {lang === 'bn' ? 'সরকারি ন্যায্যমূল্য (টাকা):' : 'Fair Cap Price (BDT):'}
                    </label>
                    <input 
                      type="number" 
                      value={form.governmentCapPrice}
                      onChange={(e) => setForm({...form, governmentCapPrice: Number(e.target.value)})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] text-slate-400">
                      {lang === 'bn' ? 'ঘটনাস্থলের জিপিএস অবস্থান:' : 'GPS Coordinates:'}
                    </label>
                    <button 
                      type="button"
                      onClick={handleGetLocation}
                      className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{lang === 'bn' ? 'লাইভ জিপিএস নিন' : 'Capture Live GPS'}</span>
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={form.gpsCoordinates}
                    onChange={(e) => setForm({...form, gpsCoordinates: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">{lang === 'bn' ? 'শতভাগ বেনামী অভিযোগ' : '100% Anonymous Mode'}</div>
                      <div className="text-[10px] text-slate-400">{lang === 'bn' ? 'পরিচয় সম্পূর্ণ গোপন রাখা হবে' : 'Identity kept completely private'}</div>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={form.isAnonymous}
                    onChange={(e) => setForm({...form, isAnonymous: e.target.checked})}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : (lang === 'bn' ? 'অভিযোগ দাখিল করুন' : 'Submit Whistleblower Report')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Tracking Ledger */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  placeholder={lang === 'bn' ? 'টোকেন দিয়ে আপনার অভিযোগ খুঁজুন...' : 'Search complaint by token or market...'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {['ALL', 'PRICE_GOUGING', 'DIGITAL_SCALE_FRAUD', 'REFUSAL_TO_SELL'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterViolation(type)}
                    className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                      filterViolation === type ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredReports.map(r => (
                <div key={r.id || r._id} className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="text-xs font-mono font-bold text-rose-400">
                        #{r.trackingToken}
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">{r.commodityInvolved}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{r.marketName} ({r.district})</span>
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      r.status === 'FINE_IMPOSED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      r.status === 'MAGISTRATE_DISPATCHED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      r.status === 'VERIFYING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-slate-700 text-slate-300 border-slate-600'
                    }`}>
                      {r.status || 'RECEIVED'}
                    </span>
                  </div>

                  <div className="mt-2 bg-slate-900/60 p-2 rounded-lg text-xs flex justify-between">
                    <span>Charged: <strong className="text-rose-400">৳{r.chargedPrice}</strong></span>
                    <span>Cap: <strong className="text-emerald-400">৳{r.governmentCapPrice}</strong></span>
                    <span>Overcharge: <strong className="text-amber-400">+{r.overchargeMarginPct}%</strong></span>
                  </div>

                  {r.actionTakenNotes && (
                    <p className="text-[11px] text-emerald-300 mt-2 bg-emerald-950/20 p-2 rounded border border-emerald-500/20">
                      ⚖️ {r.actionTakenNotes}
                    </p>
                  )}

                  {/* Actions for demo testing */}
                  <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-[10px] text-slate-400">
                    <span>Violation: {r.violationType}</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleUpdateStatus(r.id || r._id, 'MAGISTRATE_DISPATCHED')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700"
                      >
                        Dispatch Raid
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(r.id || r._id, 'FINE_IMPOSED')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
                      >
                        Fine Imposed
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
