import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  AlertOctagon, Shield, CheckCircle2, MapPin, Camera, 
  Send, Search, Clock, Scale, Lock, Eye, ArrowRight, Upload,
  X, Check, AlertTriangle, FileText, Smartphone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { whistleApi } from '../services/api';

export default function ConsumerWhistleblower() {
  const { addToast } = useBazaar();
  const [searchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchToken, setSearchToken] = useState('');
  const [filterViolation, setFilterViolation] = useState('ALL');
  const [selectedReportDetail, setSelectedReportDetail] = useState(null);

  // Evidence photo state
  const [photoPreview, setPhotoPreview] = useState(null);

  // Report Form state
  const [form, setForm] = useState({
    marketName: '',
    district: 'Dhaka',
    shopNumberOrSeller: '',
    violationType: 'PRICE_GOUGING',
    commodityInvolved: 'Local Onion',
    chargedPrice: 120,
    governmentCapPrice: 95,
    gpsCoordinates: '23.8103, 90.4125',
    reporterPhone: '',
    isAnonymous: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Read URL query params on load (e.g., from Heatmap or Home report clicks)
  useEffect(() => {
    const urlCommodity = searchParams.get('commodity');
    const urlCharged = searchParams.get('chargedPrice');
    const urlFair = searchParams.get('fairPrice');
    const urlViolation = searchParams.get('violation');

    if (urlCommodity || urlCharged || urlFair || urlViolation) {
      setForm(prev => ({
        ...prev,
        commodityInvolved: urlCommodity || prev.commodityInvolved,
        chargedPrice: urlCharged ? parseFloat(urlCharged) : prev.chargedPrice,
        governmentCapPrice: urlFair ? parseFloat(urlFair) : prev.governmentCapPrice,
        violationType: urlViolation || prev.violationType
      }));
      addToast('Prefilled complaint evidence from Price Heatmap!', 'info');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await whistleApi.getReports();
      if (res.data?.success && res.data.data) {
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
          addToast('GPS coordinates captured!', 'success');
        },
        () => addToast('Could not fetch GPS coordinates', 'error')
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        addToast('Evidence photograph attached!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.marketName) {
      alert('Please provide market name');
      return;
    }
    setSubmitting(true);
    try {
      const res = await whistleApi.submitReport(form);
      if (res.data?.success) {
        setSubmitResult(res.data.data);
        fetchReports();
        addToast('Whistleblower report submitted to DNCRP!', 'success');
        setForm({
          marketName: '',
          district: 'Dhaka',
          shopNumberOrSeller: '',
          violationType: 'PRICE_GOUGING',
          commodityInvolved: 'Local Onion',
          chargedPrice: 120,
          governmentCapPrice: 95,
          gpsCoordinates: '23.8103, 90.4125',
          reporterPhone: '',
          isAnonymous: true
        });
        setPhotoPreview(null);
      }
    } catch (err) {
      addToast('Failed to submit report', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Case Progress Timeline Stepper
  const getTimelineStep = (status) => {
    switch (status) {
      case 'FINE_IMPOSED':
      case 'RESOLVED':
        return 4;
      case 'MAGISTRATE_DISPATCHED':
        return 3;
      case 'VERIFYING':
        return 2;
      default:
        return 1;
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesToken = searchToken.trim() === '' || 
                         r.trackingToken.toLowerCase().includes(searchToken.toLowerCase()) ||
                         r.marketName.toLowerCase().includes(searchToken.toLowerCase());
    const matchesViolation = filterViolation === 'ALL' || r.violationType === filterViolation;
    return matchesToken && matchesViolation;
  });

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>National Directorate of Consumer Rights Protection (DNCRP)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Citizen Anti-Gouging & Fraud Whistleblower Portal
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                File anonymous or verified evidence against unfair price gouging, weight manipulation, and refusal to sell.
              </p>
            </div>

            <a
              href="tel:13346"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>DNCRP Speed Dial 13346</span>
            </a>
          </div>
        </div>

        {/* Success Modal / Token Certificate Banner */}
        {submitResult && (
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Complaint Recorded & Dispatched to Task Force!</span>
            </div>
            <p className="text-xs text-slate-300">
              Save your unique tracking token below to monitor mobile court enforcement progress.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="font-mono text-base font-black px-4 py-2 rounded-xl bg-slate-950 text-emerald-300 border border-emerald-500/40 select-all">
                {submitResult.trackingToken}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(submitResult.trackingToken);
                  addToast('Token copied to clipboard!', 'success');
                }}
                className="px-3 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-xs font-semibold border border-emerald-500/40 transition"
              >
                Copy Token
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Submit Evidentiary Complaint Form</span>
              </h3>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-Bit Encrypted</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Market Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Market Location Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mirpur-1 Kitchen Market"
                    value={form.marketName}
                    onChange={(e) => setForm({ ...form, marketName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    District
                  </label>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Bogura">Bogura</option>
                    <option value="Munshiganj">Munshiganj</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Rajshahi">Rajshahi</option>
                  </select>
                </div>

                {/* Stall Number / Seller */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Shop No. / Stall Row / Seller
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bhai Bhai Traders (Row #4)"
                    value={form.shopNumberOrSeller}
                    onChange={(e) => setForm({ ...form, shopNumberOrSeller: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Violation Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Violation Category
                  </label>
                  <select
                    value={form.violationType}
                    onChange={(e) => setForm({ ...form, violationType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="PRICE_GOUGING">Price Gouging</option>
                    <option value="DIGITAL_SCALE_FRAUD">Digital Scale Fraud</option>
                    <option value="REFUSAL_TO_SELL">Refusal to Sell / Hoarding</option>
                    <option value="CHEMICAL_ADULTERATION">Chemical Adulteration / Formalin</option>
                  </select>
                </div>

                {/* Commodity Involved */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Commodity Involved
                  </label>
                  <input
                    type="text"
                    value={form.commodityInvolved}
                    onChange={(e) => setForm({ ...form, commodityInvolved: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Prices: Charged vs Cap */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Charged (BDT)
                    </label>
                    <input
                      type="number"
                      value={form.chargedPrice}
                      onChange={(e) => setForm({ ...form, chargedPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Fair Cap
                    </label>
                    <input
                      type="number"
                      value={form.governmentCapPrice}
                      onChange={(e) => setForm({ ...form, governmentCapPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* GPS Coordinates with 1-click button */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-300">
                      GPS Coordinates
                    </label>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Detect GPS</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={form.gpsCoordinates}
                    onChange={(e) => setForm({ ...form, gpsCoordinates: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Reporter Phone (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="017XXXXXXXX"
                    value={form.reporterPhone}
                    onChange={(e) => setForm({ ...form, reporterPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

              </div>

              {/* Photographic Evidence Attachment */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Attach Photograph of Scale / Stall / Receipt (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>

                  {photoPreview && (
                    <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                      <img src={photoPreview} alt="Evidence Preview" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-[11px] text-emerald-400 font-medium">Image attached</span>
                      <button type="button" onClick={() => setPhotoPreview(null)} className="p-1 text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Anonymity Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={form.isAnonymous}
                  onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-700 text-emerald-600 focus:ring-0"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-slate-300 cursor-pointer">
                  Keep my identity 100% anonymous (Protected under Whistleblower Act)
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting to DNCRP...' : 'Submit Formal Report to DNCRP'}</span>
              </button>
            </form>
          </div>

          {/* Tracking & Timeline Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Token Search Box */}
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Track Existing Complaint Status</span>
              </h3>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Token (e.g. BZ-REP-91021)..."
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Case Progress Timeline Display (If search has match) */}
            {filteredReports.length > 0 && (
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Case Lifecycle Timeline
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">
                    {filteredReports[0].trackingToken}
                  </span>
                </div>

                {/* 4 Step Visual Progress Stepper */}
                {(() => {
                  const r = filteredReports[0];
                  const currentStep = getTimelineStep(r.status);
                  const steps = [
                    { title: '1. Received', desc: 'Case logged into registry' },
                    { title: '2. Under Audit', desc: 'Evidence verified by officer' },
                    { title: '3. Dispatched', desc: 'Magistrate mobile court on route' },
                    { title: '4. Action Taken', desc: 'Fine imposed or stall sealed' }
                  ];

                  return (
                    <div className="space-y-4 py-2">
                      <div className="space-y-3">
                        {steps.map((s, idx) => {
                          const isDone = currentStep >= (idx + 1);
                          return (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isDone ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                              }`}>
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <div>
                                <div className={`text-xs font-bold ${isDone ? 'text-white' : 'text-slate-500'}`}>
                                  {s.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {s.desc}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Official Action Notes */}
                      {r.actionTakenNotes && (
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Magistrate Action Ledger:</span>
                          <p className="text-slate-300 italic">{r.actionTakenNotes}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Recent Public Whistleblower Cases Ledger */}
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recent Public Enforcement Actions
              </h4>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {reports.slice(0, 4).map(r => (
                  <div key={r.id} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between items-start">
                      <strong className="text-white">{r.marketName}</strong>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        r.status === 'FINE_IMPOSED' ? 'bg-emerald-500/20 text-emerald-400' :
                        r.status === 'MAGISTRATE_DISPATCHED' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {r.commodityInvolved} • Charged: <span className="text-rose-400 font-bold">৳{r.chargedPrice}</span> (Cap: ৳{r.governmentCapPrice})
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
