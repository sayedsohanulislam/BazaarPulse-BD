import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Truck, Warehouse, Fish, 
  CloudSun, AlertOctagon, Calculator, ShieldCheck, 
  ArrowRight, CheckCircle2, PhoneCall, Scale, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Plus, ShoppingCart, Award, MapPin, Search, Bell, Share2, 
  ChevronDown, ChevronUp, Copy, Check, Terminal, ExternalLink, Users, FileText, Database, HeartHandshake,
  Mail, Send, CreditCard, UserCheck, Briefcase
} from 'lucide-react';
import { useBazaar } from '../context/BazaarContext';
import MarketSentinelGauge from '../components/MarketSentinelGauge';
import CommoditySearchAutocomplete from '../components/CommoditySearchAutocomplete';
import PriceStatusBadge from '../components/PriceStatusBadge';
import PriceTrendModal from '../components/PriceTrendModal';
import SharePriceCardModal from '../components/SharePriceCardModal';
import PriceAlertModal from '../components/PriceAlertModal';
import MethodologyModal from '../components/MethodologyModal';

export default function Home({ onOpenAuth }) {
  const { ticker, commodities, loading, addToBasket, setIsBasketOpen, addToast } = useBazaar();
  const navigate = useNavigate();

  // Active Division Selector State (Dynamic)
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');

  // Instant Price Gouging Checker State (Dynamic)
  const [checkerCommodityId, setCheckerCommodityId] = useState('');
  const [userPaidPrice, setUserPaidPrice] = useState('');

  // Top Risers / Fallers Tab State (Dynamic)
  const [moverTab, setMoverTab] = useState('risers'); // 'risers' | 'fallers'

  // Interactive How-It-Works Active Step (Dynamic)
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  // FAQ Search & Open Accordion State (Dynamic)
  const [faqCategory, setFaqCategory] = useState('ALL');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Modals State (Dynamic)
  const [trendModalCommodity, setTrendModalCommodity] = useState(null);
  const [shareModalCommodity, setShareModalCommodity] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Quick API Test State (Dynamic)
  const [copiedApi, setCopiedApi] = useState(false);

  // Section 12 Extra Section Interactive Tabs: 'pricing' | 'team' | 'contact' | 'api'
  const [extraTab, setExtraTab] = useState('pricing');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Whistleblower Inquiry', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const agro = ticker?.agroTelemetry || {};
  const forex = agro.forex || { usdToBdt: 122.86 };
  const agroWeather = agro.agroWeather || {};
  const gainers = ticker?.topGainers || [];
  const decliners = ticker?.topDecliners || [];

  const divisions = [
    { name: 'Dhaka', activeTrucks: 52, avgMarkup: '+14%', status: 'HIGH_DEMAND' },
    { name: 'Chattogram', activeTrucks: 38, avgMarkup: '+11%', status: 'PORT_TRANSIT' },
    { name: 'Rajshahi', activeTrucks: 24, avgMarkup: '+6%', status: 'PRODUCTION_HUB' },
    { name: 'Khulna', activeTrucks: 22, avgMarkup: '+8%', status: 'STABLE' },
    { name: 'Barishal', activeTrucks: 18, avgMarkup: '+9%', status: 'RIVER_TRANSIT' },
    { name: 'Sylhet', activeTrucks: 19, avgMarkup: '+12%', status: 'MONITORING' },
    { name: 'Rangpur', activeTrucks: 21, avgMarkup: '+5%', status: 'PRODUCTION_HUB' },
    { name: 'Mymensingh', activeTrucks: 16, avgMarkup: '+7%', status: 'STABLE' }
  ];

  // Gouging Checker Calculations
  const selectedCheckCommodity = (commodities || []).find(c => (c.id || c._id) === checkerCommodityId) || commodities?.[0];
  const capPrice = selectedCheckCommodity ? (selectedCheckCommodity.damFairPriceMax || selectedCheckCommodity.damFairPriceMin) : 0;
  const userPriceNum = parseFloat(userPaidPrice) || 0;
  const priceDifference = userPriceNum - capPrice;
  const isGouging = userPriceNum > 0 && priceDifference > 0;
  const gougePercent = capPrice > 0 ? ((priceDifference / capPrice) * 100).toFixed(1) : 0;

  // Workflow Steps
  const workflowSteps = [
    {
      step: '01',
      title: 'Real-Time Telemetry Ingestion',
      desc: 'Automated crawlers ingest wholesale auction prices at Karwan Bazar, Open-Meteo satellite agrometeorology, and live USD/BDT forex import parity every 15 minutes.',
      metric: '15m refresh frequency • 3 official data streams'
    },
    {
      step: '02',
      title: 'Algorithmic Fair Price Modeling',
      desc: 'Based on the Agricultural Marketing Act 2018: Farmgate cost + diesel freight per ton + cold storage preservation fees + statutory 12% maximum retail margin.',
      metric: 'Statutory 12% ceiling cap enforced'
    },
    {
      step: '03',
      title: 'Syndicate Anomaly Detection',
      desc: 'Cross-checks wholesale-to-retail price spreads against potato cold-storage holding inventories to detect artificial hoarding and price-fixing rings.',
      metric: 'Identifies markup anomalies > 15%'
    },
    {
      step: '04',
      title: 'Citizen Action & DNCRP 13346 Filing',
      desc: 'Empowers citizens to buy at subsidized TCB trucks, audit grocery baskets, and generate pre-filled evidence dossiers for mobile court magistrates.',
      metric: 'Direct legal recourse with 25% reward provision'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Dr. Rasheda Akhter',
      role: 'Agricultural Supply Chain Economist, BARI',
      quote: 'BazaarPulse BD bridges the long-standing information gap between primary farmers and urban consumers. By displaying Karwan Bazar wholesale baseline alongside DAM fair price caps, it eliminates artificial middleman manipulation.',
      avatar: 'RA'
    },
    {
      name: 'Tanvir Hasan',
      role: 'Student Market Vigilance Volunteer, Dhaka University',
      quote: 'During our student market monitoring drives, BazaarPulse BD was our primary verified source. We could instantly prove to shopkeepers what the official DAM cap was and alert the local magistrate via 13346.',
      avatar: 'TH'
    },
    {
      name: 'Farhana Sultana',
      role: 'Mother of 3 & Homemaker, Mirpur-10',
      quote: 'The TCB truck tracker and budget calculator saved our family over ৳3,500 last month. Knowing exactly when the subsidized soybean oil truck reaches Mirpur makes a massive difference on a fixed salary.',
      avatar: 'FS'
    }
  ];

  // FAQs
  const faqs = [
    {
      cat: 'FAIR_PRICE',
      q: 'How is the Government DAM Fair Price benchmark calculated?',
      a: 'Under the Agricultural Marketing Act 2018, the Department of Agricultural Marketing (DAM) calculates fair prices by adding primary farmgate production costs, verified transport freight, cold storage preservation fees, and a maximum allowable 12% retail profit margin.'
    },
    {
      cat: 'TCB',
      q: 'How often are TCB truck locations and stock counts updated?',
      a: 'TCB truck GPS positions and inventory levels are updated throughout the day from 8:00 AM to 5:00 PM based on dealer dispatch logs and citizen-verified confirmations across all 50+ sales points in Dhaka.'
    },
    {
      cat: 'LEGAL',
      q: 'Can I legally file a complaint if a shopkeeper charges above the fair price?',
      a: 'Yes. Under Section 40 of the Consumer Rights Protection Act 2009, overcharging or refusing to display prices is punishable by up to 1-year imprisonment or a ৳50,000 fine. Verified whistleblowers are legally entitled to 25% of the fine collected.'
    },
    {
      cat: 'GENERAL',
      q: 'Is BazaarPulse BD free to use for citizens and researchers?',
      a: 'Yes, 100% free and open-source civic tech. We also provide a public REST API for journalists, student task forces, and academic researchers to inspect commodity price trends.'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCat = faqCategory === 'ALL' || f.cat === faqCategory;
    const matchesQuery = f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#040711] bg-dot-grid text-slate-100 pb-20">
      
      {/* SECTION 2: HERO (Dynamic) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#070d1e] to-[#040711] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Ticker Tape */}
          <div className="mb-6 flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl py-2 px-4 shadow-xl overflow-hidden backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Live Arat Ticker:</span>
            </span>
            <div className="flex items-center gap-6 overflow-x-auto text-xs whitespace-nowrap scrollbar-none py-0.5">
              {(commodities || []).slice(0, 8).map(c => (
                <span key={c.id || c._id} className="inline-flex items-center gap-1.5 text-slate-300">
                  <span className="font-semibold text-white">{c.name}:</span>
                  <span className="text-emerald-400 font-bold">৳{c.retailAvgPrice}</span>
                  <span className="text-slate-500 text-[10px]">(Cap: ৳{c.damFairPriceMax})</span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              
              {/* National ICT Award Nominee Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-4 shadow-lg glow-amber">
                <Award className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>🏆 BASIS National ICT Award 2026 Nominee • Smart Bangladesh Civic Tech</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Wholesale to Retail: <span className="text-gradient-emerald">Fair Price Intelligence</span>
              </h1>
              
              <p className="mt-4 text-base text-slate-300 max-w-2xl leading-relaxed">
                Real-time commodity price benchmarks from DAM, live GPS tracking for subsidized TCB trucks, Karwan Bazar wholesale spread analytics, and automated DNCRP magistrate reporting.
              </p>

              {/* Dynamic Autocomplete Search Bar */}
              <div className="mt-6 max-w-xl">
                <CommoditySearchAutocomplete />
              </div>

              {/* Quick Action Navigation CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/heatmap"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Explore Price Radar</span>
                </Link>

                <Link
                  to="/tcb"
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-sm px-5 py-3 rounded-xl transition flex items-center gap-2 border border-slate-700"
                >
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>TCB Truck Locator</span>
                </Link>

                <button
                  onClick={() => setIsAlertModalOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm px-4 py-3 rounded-xl transition flex items-center gap-2 border border-amber-500/30"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Price Alerts</span>
                </button>
              </div>

            </div>

            {/* Quick Live Telemetry Spotlight Bento Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* USD/BDT Import Parity */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-md hover:border-emerald-500/50 transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    USD/BDT Forex Rate
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <div className="mt-2 text-2xl font-black text-emerald-400">
                  ৳{forex.usdToBdt} <span className="text-xs font-normal text-slate-400">/ USD</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Import parity benchmark for edible oil & sugar.
                </p>
              </div>

              {/* TCB Trucks Active */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-md hover:border-cyan-500/50 transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Active TCB Trucks
                  </span>
                  <Truck className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <div className="mt-2 text-2xl font-black text-cyan-300">
                  50+ <span className="text-xs font-normal text-slate-400">Sale Points</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Subsidized oil ৳100, lentils ৳60, sugar ৳70.
                </p>
              </div>

              {/* Agro Weather Impact */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl backdrop-blur-md hover:border-amber-500/50 transition">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Agro-Weather Belt
                  </span>
                  <CloudSun className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2 text-xl font-black text-amber-300">
                  {agroWeather.supplyDisruptionRisk || 'LOW'} <span className="text-xs font-normal text-slate-400">Risk</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {agroWeather.harvestStatus || 'Favorable harvest & transport'}
                </p>
              </div>

              {/* DNCRP 13346 */}
              <div className="bg-gradient-to-br from-rose-950/70 to-slate-900 border border-rose-500/40 rounded-2xl p-4 shadow-xl flex flex-col justify-between hover:border-rose-400 transition">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
                      DNCRP Hotline
                    </span>
                    <PhoneCall className="w-4 h-4 text-rose-400 animate-bounce" />
                  </div>
                  <div className="mt-2 text-2xl font-black text-rose-400">
                    13346
                  </div>
                </div>
                <Link to="/whistle" className="text-[11px] text-rose-300 hover:text-white font-semibold flex items-center gap-1 mt-2">
                  <span>File Complaint</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: TRUSTED BY & LIVE STATS BENTO (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Authoritative Governance & Open Telemetry
              </span>
              <h3 className="text-lg font-bold text-white">
                Trusted Public Sources & Live Operational Counters
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>DAM (Agricultural Marketing)</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>TCB (Trading Corporation)</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                <span>DNCRP (Consumer Protection)</span>
              </span>
            </div>
          </div>

          {/* 4 Live Stats Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Tracked Commodities</span>
              <div className="text-3xl font-black text-white mt-1">16+</div>
              <span className="text-[10px] text-emerald-400 mt-1 block">Rice, Oil, Eggs, Meat, Spices</span>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Markets & Coverage</span>
              <div className="text-3xl font-black text-cyan-400 mt-1">8 Div / 64 Dist</div>
              <span className="text-[10px] text-slate-500 mt-1 block">All administrative regions</span>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Verified Reports Today</span>
              <div className="text-3xl font-black text-amber-400 mt-1">142+</div>
              <span className="text-[10px] text-amber-300 mt-1 block">Citizen evidence submissions</span>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Telemetry Ingestion</span>
              <div className="text-3xl font-black text-emerald-400 mt-1">15s Cycle</div>
              <span className="text-[10px] text-slate-400 mt-1 block">Satellite weather & forex API</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: FEATURES & CIVIC SERVICES BENTO (Dynamic & Interactive) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Market Sentinel Radial Gauge Component */}
        <MarketSentinelGauge ticker={ticker} />

        {/* Interactive Instant Price Gouging Checker */}
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Instant Price Gouging Checker & Penalty Audit</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">Interactive</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enter what you were charged locally to see if it violates the official DAM price ceiling.
                </p>
              </div>
            </div>

            {/* Inputs: Commodity Select + Price Input */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <select
                value={checkerCommodityId || (commodities?.[0]?.id || '')}
                onChange={(e) => setCheckerCommodityId(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {(commodities || []).map(c => (
                  <option key={c.id || c._id} value={c.id || c._id}>
                    {c.name} (DAM Cap: ৳{c.damFairPriceMax})
                  </option>
                ))}
              </select>

              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  placeholder="Charged Price"
                  value={userPaidPrice}
                  onChange={(e) => setUserPaidPrice(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl pl-6 pr-3 py-2 text-xs text-white w-32 focus:outline-none focus:border-amber-400"
                />
              </div>

              {isGouging ? (
                <Link
                  to={`/whistle?commodity=${encodeURIComponent(selectedCheckCommodity?.name || '')}&chargedPrice=${userPriceNum}&fairPrice=${capPrice}`}
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-rose-950/40"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>+৳{priceDifference} Gouge! Report</span>
                </Link>
              ) : userPriceNum > 0 ? (
                <div className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fair Price</span>
                </div>
              ) : null}
            </div>

          </div>
        </div>

        {/* 8 Divisions Interactive Selector */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>8 Administrative Divisions Market Telemetry</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click any division to inspect local subsidized TCB truck coverage and average neighborhood markup.
              </p>
            </div>
            <span className="text-[11px] text-cyan-400 font-bold bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-500/30">
              64 Districts Live
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
            {divisions.map((div) => {
              const isSelected = selectedDivision === div.name;
              return (
                <button
                  key={div.name}
                  onClick={() => setSelectedDivision(div.name)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    isSelected 
                      ? 'bg-cyan-600/20 border-cyan-400 glow-cyan text-white' 
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold">{div.name}</div>
                  <div className="text-[10px] text-cyan-400 mt-1">{div.activeTrucks} OMS Trucks</div>
                  <div className="text-[9px] text-slate-500">Markup: {div.avgMarkup}</div>
                </button>
              );
            })}
          </div>
        </div>

      </section>

      {/* SECTION 5: ABOUT / WHY CHOOSE US (Mission & Anti-Syndicate Architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-slate-900 via-[#071026] to-slate-950 border border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Why BazaarPulse BD Exists
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Democratizing Market Transparency for 170 Million Citizens Against Artificial Price Syndicates
            </h2>
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              Every day, middlemen and informal syndicates exploit information asymmetry between primary agricultural production belts (like Bogura, Rangpur, and Jashore) and Dhaka's neighborhood retail markets. BazaarPulse BD combines government fair price mandates, satellite weather risk, and real-time wholesale data into a tamper-proof civic defense platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-800">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Algorithmic Benchmarking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Replaces guesswork with strict statutory pricing formulas derived from primary farmgate costs, freight tonnage rates, and legal 12% retail margin caps.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-sm font-bold text-white">Geospatial TCB Accessibility</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects working families with government subsidized trucks (oil ৳100, lentils ৳60, sugar ৳70) through live OpenStreetMap tracking and SMS arrival alerts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Direct Legal Recourse</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enables instantaneous evidence collection for DNCRP Section 40 mobile court actions, where citizen whistleblowers are legally entitled to 25% penalty payouts.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS (Interactive Stepper Workflow) (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            System Architecture & Civic Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            How BazaarPulse BD Protects Your Grocery Budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Click through each stage to explore how data travels from Karwan Bazar arats into citizen legal enforcement.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {workflowSteps.map((ws, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkflowStep(idx)}
              className={`p-4 rounded-2xl border text-left transition ${
                activeWorkflowStep === idx
                  ? 'bg-emerald-600/20 border-emerald-500 glow-emerald text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">{ws.step}</span>
              <div className="text-xs font-bold text-white">{ws.title}</div>
            </button>
          ))}
        </div>

        {/* Active Step Deep-Dive Box */}
        <div className="mt-4 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                Stage {workflowSteps[activeWorkflowStep].step} Deep Dive
              </span>
              <h3 className="text-lg font-bold text-white">
                {workflowSteps[activeWorkflowStep].title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {workflowSteps[activeWorkflowStep].desc}
              </p>
            </div>
            
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Key Performance Metric</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">
                {workflowSteps[activeWorkflowStep].metric}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED PRODUCTS & MARKET MOVERS (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Section Header with Risers / Fallers Tab */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Daily Market Movers & Commodity Watch</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Compare retail prices against official DAM fair caps, inspect 7/30/90d trend curves, or generate shareable social cards.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setMoverTab('risers')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
                moverTab === 'risers'
                  ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
              <span>Top Risers (+%)</span>
            </button>

            <button
              onClick={() => setMoverTab('fallers')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
                moverTab === 'fallers'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>Top Fallers (-%)</span>
            </button>
          </div>
        </div>

        {/* Commodity Watchcards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(commodities || []).slice(0, 8).map(c => {
            const isOvercharging = c.retailAvgPrice > c.damFairPriceMax;
            return (
              <div 
                key={c.id || c._id} 
                className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-500 transition shadow-lg group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                        {c.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{c.category} • {c.unit}</span>
                    </div>

                    <PriceStatusBadge 
                      retailPrice={c.retailAvgPrice} 
                      fairPriceMax={c.damFairPriceMax} 
                    />
                  </div>

                  {/* Pricing Matrix */}
                  <div className="mt-3 space-y-1.5 text-xs pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-slate-400">
                      <span>DAM Fair Cap:</span>
                      <strong className="text-emerald-400">৳{c.damFairPriceMax}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Karwan Wholesale:</span>
                      <span className="text-slate-200">৳{c.karwanBazarWholesale}</span>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-slate-800/80">
                      <span>Retail Market:</span>
                      <span className={isOvercharging ? 'text-rose-400 font-black' : 'text-white'}>
                        ৳{c.retailAvgPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Controls: Trends, Share Card, Add to Basket */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTrendModalCommodity(c)}
                      className="py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 flex items-center justify-center gap-1 transition"
                    >
                      <TrendingUp className="w-3 h-3 text-cyan-400" />
                      <span>Trends (7-90d)</span>
                    </button>

                    <button
                      onClick={() => setShareModalCommodity(c)}
                      className="py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 flex items-center justify-center gap-1 transition"
                    >
                      <Share2 className="w-3 h-3 text-emerald-400" />
                      <span>Share Alert</span>
                    </button>
                  </div>

                  <button
                    onClick={() => addToBasket(c, 1)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/30 flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Fair Basket</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* SECTION 8: TESTIMONIALS (Community Voices) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Community Voices & Endorsements
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            What Economists, Activists & Citizens Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
            >
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{t.quote}"
              </p>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: FAQ (Dynamic Accordion & Filter) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Answers & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Search & Category Tabs */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions about fair prices, TCB trucks, or reporting..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {[
              { id: 'ALL', label: 'All FAQs' },
              { id: 'FAIR_PRICE', label: 'Fair Pricing Formula' },
              { id: 'TCB', label: 'TCB Trucks' },
              { id: 'LEGAL', label: 'Whistleblowing & Law' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFaqCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  faqCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/90 border border-slate-700/80 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-slate-800/50 transition"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 10: FINAL CTA & PRICE ALERT SUBSCRIPTION (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Citizen Vigilance Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Never Overpay for Essential Groceries Again
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get notified immediately via Email or Telegram when prices jump, track subsidized TCB trucks near your home, or file verified evidence directly with mobile court magistrates.
            </p>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
              <button
                onClick={() => setIsAlertModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition"
              >
                <Bell className="w-4 h-4" />
                <span>Activate Free Price Alerts</span>
              </button>

              <Link
                to="/whistle"
                className="px-6 py-3.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-rose-500/40 transition"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Report Price Gouging (13346)</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 12: EXTRA SECTION — PRICING / TEAM / CONTACT & DEVELOPER API (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Header & Interactive Tab Selectors */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Transparency, Governance & Access
              </span>
              <h3 className="text-xl font-black text-white">
                Civic Access Pricing, Leadership Team &amp; Operations Center
              </h3>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setExtraTab('pricing')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  extraTab === 'pricing'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pricing &amp; Access</span>
              </button>

              <button
                onClick={() => setExtraTab('team')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  extraTab === 'team'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Leadership Team</span>
              </button>

              <button
                onClick={() => setExtraTab('contact')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  extraTab === 'contact'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact &amp; Dispatch</span>
              </button>

              <button
                onClick={() => setExtraTab('api')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  extraTab === 'api'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open REST API</span>
              </button>
            </div>
          </div>

          {/* TAB 1: PRICING & CIVIC ACCESS TIERS */}
          {extraTab === 'pricing' && (
            <div className="mt-8 animate-fade-in-up">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h4 className="text-lg font-bold text-white">Democratic, Public-Good Civic Tech</h4>
                <p className="text-xs text-slate-400 mt-1">
                  BazaarPulse BD operates under open-access principles for 170M Bangladeshi citizens, subsidized by civic innovation research grants.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tier 1: Citizens */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                      Citizen Freedom
                    </span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">৳0</span>
                      <span className="text-xs text-slate-400">/ forever free</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Full access for everyday consumers and homemakers to protect household budgets.
                    </p>

                    <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Unlimited price lookup &amp; Karwan wholesale spread</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Live TCB subsidized truck GPS locator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Anonymous DNCRP 13346 evidence filing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Monthly Grocery Basket Budget audit tool</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onOpenAuth?.()}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/30 transition text-center"
                  >
                    Start Free Citizen Access
                  </button>
                </div>

                {/* Tier 2: Journalists & Researchers */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Most Popular for Media
                  </div>

                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                      Journalists &amp; NGOs
                    </span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">৳0</span>
                      <span className="text-xs text-slate-400">/ Civic Grant</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Designed for consumer rights reporters, student vigilance committees, and universities.
                    </p>

                    <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>All Citizen Freedom features included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>Direct REST API access (10,000 req/day)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>7, 30 &amp; 90-day historical CSV exports</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>Real-time syndicate anomaly webhook alerts</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setExtraTab('api')}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition text-center shadow-lg shadow-cyan-950/50"
                  >
                    View API Access Credentials
                  </button>
                </div>

                {/* Tier 3: Ministries & Municipalities */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                      Public Sector &amp; Magistracy
                    </span>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white">Inter-Agency</span>
                      <span className="text-xs text-slate-400">/ Partnership</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Direct integration for DNCRP mobile courts, DC offices, and DAM monitoring taskforces.
                    </p>

                    <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>Mobile Court Section 40 dossier generator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>Sub-second wholesale auction price feed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>District-level cold-storage syndicate telemetry</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>Dedicated liaison officer support channel</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setExtraTab('contact')}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white text-xs font-bold border border-amber-500/30 transition text-center"
                  >
                    Request Ministry Integration
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: LEADERSHIP TEAM & ADVISORY BOARD */}
          {extraTab === 'team' && (
            <div className="mt-8 animate-fade-in-up">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h4 className="text-lg font-bold text-white">The Minds Behind BazaarPulse BD</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Engineered by civic-tech software architects, agricultural supply chain economists, and legal advocates dedicated to fair markets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Person 1 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm mb-3">
                    SI
                  </div>
                  <h5 className="text-sm font-bold text-white">Sayed Sohanul Islam</h5>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Lead Civic Architect</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Full-Stack Systems Engineer specializing in real-time telemetry, Leaflet GIS pipelines, and high-performance civic architectures.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                    Focus: React 18, Node.js &amp; GIS
                  </div>
                </div>

                {/* Person 2 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm mb-3">
                    RA
                  </div>
                  <h5 className="text-sm font-bold text-white">Dr. Rasheda Akhter</h5>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Agri-Economist Advisor</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Agricultural supply chain scientist advising on DAM statutory price formulas, farmgate transport spreads, and cold storage margins.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                    Focus: Agricultural Marketing Act 2018
                  </div>
                </div>

                {/* Person 3 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-rose-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-sm mb-3">
                    BA
                  </div>
                  <h5 className="text-sm font-bold text-white">Barrister Rafiqul Alam</h5>
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">Consumer Legal Counsel</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Supreme Court advocate directing compliance for DNCRP Section 40 complaints and citizen whistleblower 25% reward provisions.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                    Focus: Consumer Rights Act 2009
                  </div>
                </div>

                {/* Person 4 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 transition">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm mb-3">
                    NR
                  </div>
                  <h5 className="text-sm font-bold text-white">Kazi Naimur Rahman</h5>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Wholesale Arat Auditor</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Field operations coordinator auditing primary auction volumes at Karwan Bazar, Badamtoli, and Khatunganj wholesale centers.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                    Focus: Real-time Auction Verification
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & EMERGENCY DISPATCH */}
          {extraTab === 'contact' && (
            <div className="mt-8 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Operations Desk Info */}
                <div className="lg:col-span-5 space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block mb-1">
                      Direct Operational Desks
                    </span>
                    <h4 className="text-base font-bold text-white">
                      Karwan Bazar Operations Headquarters
                    </h4>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      Reach our 24/7 civic oversight team, verified wholesale monitors, and legal dispatch liaison officers.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Central Monitoring Command:</strong>
                        <span className="text-slate-400 text-[11px]">Level 4, Wholesale Arat Complex, Karwan Bazar, Dhaka-1215</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <PhoneCall className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Emergency Hotlines:</strong>
                        <span className="text-slate-400 text-[11px]">
                          DNCRP Hotline: <a href="tel:13346" className="text-rose-400 font-bold hover:underline">13346</a> • Agri Info: <a href="tel:16123" className="text-emerald-400 font-bold hover:underline">16123</a>
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Official Electronic Dispatch:</strong>
                        <span className="text-slate-400 text-[11px]">
                          Citizen Inquiries: <span className="text-emerald-300">dispatch@bazaarpulse.bd</span><br />
                          Journalists &amp; Media: <span className="text-cyan-300">media@bazaarpulse.bd</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Message Dispatch Form */}
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Send Verified Whistleblower Tip or Partnership Inquiry</span>
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Directly encrypted and dispatched to our civic verification desk within 15 minutes.
                  </p>

                  {contactSubmitted ? (
                    <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <strong className="font-bold text-white block">Inquiry Dispatched Successfully!</strong>
                        <span>Thank you. Our market monitors have queued your message for priority review.</span>
                      </div>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!contactForm.name || !contactForm.message) {
                          addToast('Please complete all required fields', 'error');
                          return;
                        }
                        setContactSubmitted(true);
                        addToast('Message dispatched to BazaarPulse operations team!', 'success');
                        setTimeout(() => {
                          setContactSubmitted(false);
                          setContactForm({ name: '', email: '', subject: 'Whistleblower Inquiry', message: '' });
                        }, 4000);
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Your Name / Alias *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Citizen Reporter"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Email / Telegram</label>
                          <input
                            type="text"
                            placeholder="reporter@domain.com or @handle"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Subject</label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Whistleblower Inquiry">Price Gouging Whistleblower Tip</option>
                          <option value="TCB Stock Anomaly">Subsidized TCB Truck Issue</option>
                          <option value="Media/Academic Data Request">Journalist / Academic Dataset Access</option>
                          <option value="Government Collaboration">DGHS / DNCRP Institutional Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Detailed Message *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe the market name, charged price vs DAM cap, or your research inquiry..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch to Operations Command</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: DEVELOPER REST API CONSOLE */}
          {extraTab === 'api' && (
            <div className="mt-8 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left: Code Snippet / API Explorer */}
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs">
                  <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>GET /api/commodities</span>
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('curl -s https://bazaarpulse-bd.vercel.app/api/commodities');
                        setCopiedApi(true);
                        setTimeout(() => setCopiedApi(false), 2000);
                      }}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedApi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedApi ? 'Copied' : 'Copy cURL'}</span>
                    </button>
                  </div>

                  <pre className="text-slate-300 text-[11px] overflow-x-auto">
{`{
  "status": "success",
  "data": [
    {
      "name": "Local Onion",
      "damFairPriceMax": 85,
      "karwanBazarWholesale": 75,
      "retailAvgPrice": 105,
      "overchargeMarginBdt": 20,
      "volatilityIndex": "SURGING",
      "timestamp": "2026-10-21T10:00:00Z"
    }
  ]
}`}
                  </pre>
                </div>

                {/* Right: NGO & Media Usage */}
                <div className="lg:col-span-5 space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="font-bold text-white block mb-0.5">For Investigative Journalists</span>
                    <p className="text-slate-400 text-[11px]">
                      Track middleman price discrepancies and download daily historical CSVs for market cartels reporting.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="font-bold text-white block mb-0.5">For Consumer Rights Volunteers</span>
                    <p className="text-slate-400 text-[11px]">
                      Instant access to DNCRP Section 40 templates with pre-computed statutory violation calculations.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href="tel:13346"
                      className="flex-1 py-2 px-3 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30 font-bold text-center transition"
                    >
                      Hotline 13346
                    </a>
                    <button
                      onClick={() => setIsMethodologyOpen(true)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 font-bold text-center transition"
                    >
                      Inspect DAM Math
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* Dynamic Modals */}
      <PriceTrendModal
        commodity={trendModalCommodity}
        isOpen={Boolean(trendModalCommodity)}
        onClose={() => setTrendModalCommodity(null)}
        onOpenShareCard={(comm) => setShareModalCommodity(comm)}
      />

      <SharePriceCardModal
        commodity={shareModalCommodity}
        isOpen={Boolean(shareModalCommodity)}
        onClose={() => setShareModalCommodity(null)}
      />

      <PriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

    </div>
  );
}
