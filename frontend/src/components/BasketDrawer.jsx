import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, Printer, ArrowRight, 
  CheckCircle2, AlertTriangle, ShieldCheck, QrCode, FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBazaar } from '../context/BazaarContext';
import { Link } from 'react-router-dom';

export default function BasketDrawer() {
  const { 
    basket, 
    isBasketOpen, 
    setIsBasketOpen, 
    removeFromBasket, 
    updateBasketQty, 
    clearBasket, 
    getBasketTotals,
    commodities,
    addToBasket
  } = useBazaar();

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptDate] = useState(() => new Date().toLocaleString());
  const [receiptId] = useState(() => `BZ-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isBasketOpen && !showReceiptModal) return null;

  const { fairTotal, wholesaleTotal, retailTotal, itemCount } = getBasketTotals();
  const overchargeAmount = retailTotal - fairTotal;
  const isOvercharged = overchargeAmount > 0;
  const overchargePct = fairTotal > 0 ? ((overchargeAmount / fairTotal) * 100).toFixed(1) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Slide-over Drawer for Fair Basket */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden no-print">
          <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsBasketOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Citizen Fair Price Basket
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {itemCount} items selected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {basket.length > 0 && (
                    <button 
                      onClick={clearBasket}
                      className="text-xs text-rose-400 hover:text-rose-300 p-1 flex items-center gap-1"
                      title="Clear basket"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button 
                    onClick={() => setIsBasketOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Basket Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {basket.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Your grocery basket is empty
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                        Add staples from the Fair Price Grid to calculate real-time wholesale and retail margins.
                      </p>
                    </div>

                    {/* Quick Add Suggestions */}
                    <div className="pt-2">
                      <div className="text-[11px] text-slate-400 font-semibold mb-2">
                        Quick Add Popular Essentials:
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {(commodities || []).slice(0, 4).map(c => (
                          <button
                            key={c.id || c._id}
                            onClick={() => addToBasket(c, 1)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition"
                          >
                            + {c.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  basket.map(item => {
                    const c = item.commodity;
                    const fairMax = c.damFairPriceMax || c.damFairPriceMin;
                    const itemOvercharge = (c.retailAvgPrice - fairMax) * item.qty;
                    return (
                      <div key={c.id || c._id} className="bg-slate-850 border border-slate-700/80 rounded-xl p-3 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <div className="text-xs font-bold text-white">
                              {c.name}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Unit: {c.unit} • DAM Fair: ৳{fairMax}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromBasket(c.id || c._id)}
                            className="text-slate-500 hover:text-rose-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price Breakdown per item */}
                        <div className="mt-2 text-xs flex justify-between items-center pt-2 border-t border-slate-800">
                          <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                            <button
                              onClick={() => updateBasketQty(c.id || c._id, item.qty - 1)}
                              className="text-slate-400 hover:text-white p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white min-w-[20px] text-center">{item.qty}</span>
                            <button
                              onClick={() => updateBasketQty(c.id || c._id, item.qty + 1)}
                              className="text-slate-400 hover:text-white p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Retail: ৳{c.retailAvgPrice * item.qty}</span>
                            <span className="text-xs font-bold text-emerald-400">Fair: ৳{fairMax * item.qty}</span>
                          </div>
                        </div>

                        {itemOvercharge > 0 && (
                          <div className="mt-1 text-[10px] text-rose-400 text-right font-medium">
                            +৳{itemOvercharge} markup
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Basket Summary & 3-Way Comparator Footer */}
              {basket.length > 0 && (
                <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>DAM Fair Price Total:</span>
                      <strong className="text-emerald-400">৳{fairTotal.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Karwan Wholesale Cost:</span>
                      <span className="text-cyan-300">৳{wholesaleTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-slate-800">
                      <span>Neighborhood Retail Total:</span>
                      <span className="text-white">৳{retailTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Overcharge Callout */}
                  {isOvercharged ? (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span>{`Overcharge: +৳${overchargeAmount} (+${overchargePct}%)`}</span>
                      </span>
                      <Link 
                        to={`/whistle?chargedPrice=${retailTotal}&fairPrice=${fairTotal}`}
                        onClick={() => setIsBasketOpen(false)}
                        className="text-[11px] underline font-bold hover:text-white"
                      >
                        Report
                      </Link>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Within official fair pricing ceiling!</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setIsBasketOpen(false);
                        setShowReceiptModal(true);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View Receipt</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowReceiptModal(true);
                        setTimeout(handlePrint, 300);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-950/50"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Receipt</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Official Verifiable Receipt Modal / Printable View */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-2xl shadow-2xl p-6 overflow-hidden printable-receipt">
            
            {/* Modal Controls (Hidden in print) */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200 no-print">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Citizen Price Audit Document
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-emerald-500 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Receipt Document Header */}
            <div className="text-center pb-4 border-b border-dashed border-slate-300">
              <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 mb-1">
                Government Fair Price Verification Audit
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                BAZAARPULSE BD — CITIZEN AUDIT
              </h2>
              <p className="text-xs text-slate-600">
                Department of Agricultural Marketing (DAM) Benchmark Reference
              </p>
              <div className="mt-2 text-[11px] text-slate-500 flex justify-between px-2">
                <span>Receipt: <strong>{receiptId}</strong></span>
                <span>Date: {receiptDate}</span>
              </div>
            </div>

            {/* Receipt Table */}
            <div className="py-4">
              <table className="w-full text-xs text-left text-slate-700">
                <thead>
                  <tr className="border-b border-slate-300 text-[10px] text-slate-500 uppercase">
                    <th className="py-1.5">Item & Qty</th>
                    <th className="py-1.5 text-right">DAM Fair</th>
                    <th className="py-1.5 text-right">Wholesale</th>
                    <th className="py-1.5 text-right">Retail Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {basket.map(item => {
                    const c = item.commodity;
                    const fairMax = c.damFairPriceMax || c.damFairPriceMin;
                    return (
                      <tr key={c.id || c._id}>
                        <td className="py-2">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-500">{item.qty} {c.unit}</div>
                        </td>
                        <td className="py-2 text-right text-emerald-700 font-semibold">৳{fairMax * item.qty}</td>
                        <td className="py-2 text-right text-slate-600">৳{c.karwanBazarWholesale * item.qty}</td>
                        <td className="py-2 text-right font-bold text-slate-900">৳{c.retailAvgPrice * item.qty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Receipt Total Calculation */}
            <div className="pt-3 border-t-2 border-slate-900 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Total at DAM Fair Cap:</span>
                <strong className="text-emerald-700">৳{fairTotal.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total at Karwan Wholesale:</span>
                <span className="text-slate-600">৳{wholesaleTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-black border-t border-slate-300 pt-1">
                <span>Total Retail Paid:</span>
                <span>৳{retailTotal.toLocaleString()}</span>
              </div>

              {isOvercharged && (
                <div className="p-2 mt-2 bg-rose-50 border border-rose-200 rounded text-rose-800 text-[11px] font-bold flex justify-between items-center">
                  <span>DISCREPANCY (OVERCHARGE):</span>
                  <span>+৳{overchargeAmount} ({overchargePct}%)</span>
                </div>
              )}
            </div>

            {/* Verification Footer with QR Code */}
            <div className="mt-6 pt-4 border-t border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-700 uppercase">
                  Consumer Rights Verification
                </div>
                <p className="text-[10px] text-slate-500 max-w-[260px]">
                  Under Bangladesh Consumer Rights Protection Act 2009, overcharging above government fair price caps is punishable by law.
                </p>
                <div className="text-[10px] font-bold text-rose-700">
                  Hotline: 13346 (DNCRP)
                </div>
              </div>
              <div className="p-2 border border-slate-300 rounded-lg text-center bg-slate-50">
                <QrCode className="w-12 h-12 text-slate-800 mx-auto" />
                <span className="text-[9px] font-mono text-slate-600 block mt-0.5">VERIFIED</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
