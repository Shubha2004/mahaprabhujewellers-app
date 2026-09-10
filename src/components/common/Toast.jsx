import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-gold-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 shadow-emerald-950/30',
    error: 'border-rose-500/40 shadow-rose-950/30',
    info: 'border-gold-500/40 shadow-gold-950/30'
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] max-w-sm animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 text-white border shadow-2xl backdrop-blur-md ${
          borderColors[toast.type] || borderColors.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium tracking-wide">{toast.message}</p>
      </div>
    </div>
  );
};
