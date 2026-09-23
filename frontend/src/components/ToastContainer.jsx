import React from 'react';
import { useBazaar } from '../context/BazaarContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useBazaar();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isError
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-100 glow-rose'
                : isInfo
                ? 'bg-cyan-950/90 border-cyan-500/50 text-cyan-100 glow-cyan'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 glow-emerald'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              ) : isInfo ? (
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
              <span className="text-xs font-medium leading-relaxed">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition ml-2 flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
