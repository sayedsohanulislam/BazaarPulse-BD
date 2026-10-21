import React, { useState } from 'react';
import { X, TrendingUp, Download, Calendar, ArrowUpRight, ArrowDownRight, Scale, ShieldCheck, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PriceStatusBadge from './PriceStatusBadge';

export default function PriceTrendModal({ commodity, isOpen, onClose, onOpenShareCard }) {
  const { lang } = useLanguage();
  const [timeframe, setTimeframe] = useState('30d'); // '7d' | '30d' | '90d'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!isOpen || !commodity) return null;

  // Generate deterministic realistic historical price curves based on commodity metrics
  const getHistoricalData = () => {
    const pointsCount = timeframe === '7d' ? 7 : timeframe === '30d' ? 15 : 24;
    const baseRetail = commodity.retailAvgPrice || 100;
    const baseWholesale = commodity.karwanBazarWholesale || (baseRetail * 0.82);
    const baseFair = commodity.damFairPriceMax || (baseRetail * 0.88);

    const data = [];
    const now = new Date();

    for (let i = pointsCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - (i * (timeframe === '90d' ? 4 : timeframe === '30d' ? 2 : 1)));
      
      // Controlled harmonic fluctuation
      const wave = Math.sin((i / pointsCount) * Math.PI * 2) * (baseRetail * 0.08);
      const randomNoise = ((i % 3) - 1) * 2;
      const retail = Math.round(baseRetail - wave + randomNoise);
      const wholesale = Math.round(baseWholesale - (wave * 0.7) + (randomNoise * 0.5));
      const fair = Math.round(baseFair);

      data.push({
        date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        retail,
        wholesale,
        fair
      });
    }
    return data;
  };

  const data = getHistoricalData();
  const retailValues = data.map(d => d.retail);
  const minVal = Math.min(...data.map(d => Math.min(d.wholesale, d.fair, d.retail))) * 0.92;
  const maxVal = Math.max(...data.map(d => Math.max(d.wholesale, d.fair, d.retail))) * 1.08;

  // SVG Chart Dimensions
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index) => paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
  const getY = (val) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);

  const retailPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.retail)}`).join(' ');
  const wholesalePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.wholesale)}`).join(' ');
  const fairPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.fair)}`).join(' ');

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Commodity', 'Retail Price (BDT)', 'Karwan Wholesale (BDT)', 'DAM Fair Cap (BDT)'];
    const rows = data.map(d => [
      d.date,
      commodity.name,
      d.retail,
      d.wholesale,
      d.fair
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${commodity.name.replace(/\s+/g, '_')}_price_trends_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#090e1c] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Price Intelligence History</span>
              </span>
              <PriceStatusBadge 
                retailPrice={commodity.retailAvgPrice} 
                fairPriceMax={commodity.damFairPriceMax} 
              />
            </div>
            <h3 className="text-2xl font-black text-white">
              {lang === 'bn' ? commodity.nameBn : commodity.name}
              <span className="text-sm font-normal text-slate-400 ml-2">
                ({commodity.unit})
              </span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Timeframe & Export */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: '90 Days' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  timeframe === t.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onOpenShareCard && (
              <button
                onClick={() => {
                  onClose();
                  onOpenShareCard(commodity);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Share Card</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold border border-emerald-500/30 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium px-2">
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-3 h-1 rounded bg-rose-500"></span>
            <span>Retail Market Price</span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-1 rounded bg-emerald-500"></span>
            <span>DAM Fair Ceiling</span>
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-3 h-1 rounded bg-cyan-500"></span>
            <span>Karwan Bazar Wholesale</span>
          </span>
        </div>

        {/* SVG Interactive Line Chart */}
        <div className="mt-3 bg-slate-950/90 rounded-2xl border border-slate-800/90 p-3 relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 overflow-visible">
            {/* Horizontal Grid lines */}
            {[0, 0.33, 0.66, 1].map((ratio, idx) => {
              const y = paddingY + ratio * (height - 2 * paddingY);
              const val = Math.round(maxVal - ratio * (maxVal - minVal));
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 4}
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="end"
                    fontWeight="bold"
                  >
                    ৳{val}
                  </text>
                </g>
              );
            })}

            {/* Price Curves */}
            <path d={wholesalePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
            <path d={fairPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
            <path d={retailPath} fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

            {/* Interactive Data Nodes */}
            {data.map((d, idx) => {
              const cx = getX(idx);
              const cy = getY(d.retail);
              const isHovered = hoveredPoint === idx;

              return (
                <g key={idx} onMouseEnter={() => setHoveredPoint(idx)} onMouseLeave={() => setHoveredPoint(null)}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 3.5}
                    fill={isHovered ? '#fff' : '#f43f5e'}
                    stroke="#090e1c"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                  />
                  <text
                    x={cx}
                    y={height - 8}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {d.date}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Callout */}
          {hoveredPoint !== null && data[hoveredPoint] && (
            <div className="absolute top-4 right-4 bg-slate-900/95 border border-slate-700 p-2.5 rounded-xl text-xs shadow-xl backdrop-blur-md pointer-events-none">
              <div className="font-bold text-white mb-1">{data[hoveredPoint].date}</div>
              <div className="text-rose-400">Retail: <strong>৳{data[hoveredPoint].retail}</strong></div>
              <div className="text-emerald-400">DAM Cap: <strong>৳{data[hoveredPoint].fair}</strong></div>
              <div className="text-cyan-400">Wholesale: <strong>৳{data[hoveredPoint].wholesale}</strong></div>
            </div>
          )}
        </div>

        {/* Footer KPI summary */}
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Lowest Price</span>
            <span className="text-base font-black text-emerald-400">৳{Math.min(...retailValues)}</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Highest Recorded</span>
            <span className="text-base font-black text-rose-400">৳{Math.max(...retailValues)}</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Volatility</span>
            <span className="text-base font-black text-amber-400">{commodity.volatilityIndex || 'NORMAL'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
