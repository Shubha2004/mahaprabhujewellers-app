import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, TrendingUp, Clock, RefreshCw, ChevronRight } from 'lucide-react';

export const LiveRatesBar = () => {
  const { metalRates, refreshMetalRatesTimestamp } = useStore();

  const scrollToRatesSection = () => {
    const el = document.getElementById('live-rates-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-amber-200/95 text-xs py-2 px-3 sm:px-4 border-b border-gold-500/25 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        
        {/* Left: Live Indicator & Assurance */}
        <div className="flex items-center justify-between md:justify-start gap-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>KOLKATA LIVE</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Kolkata Bullion Standard • BIS 916 Hallmarked</span>
              <span className="sm:hidden">Kolkata 916</span>
            </div>
          </div>

          {/* Mobile visible Updated Time */}
          <div className="flex items-center gap-1 text-[10px] text-amber-200/80 md:hidden bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
            <Clock className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate max-w-[130px]">{metalRates.lastUpdated}</span>
          </div>
        </div>

        {/* Center: Live Rates Ticker (24K, 22K, 18K, Silver) */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto py-0.5 scrollbar-none text-[11px] sm:text-xs">
          
          {/* 24K Pure Gold */}
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-slate-900/90 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <span className="text-amber-400 font-bold">Kolkata 24K:</span>
            <span className="font-semibold text-white">₹{metalRates.gold24k.toLocaleString('en-IN')}</span>
            <span className="text-slate-400 text-[10px]">/10g</span>
          </div>

          {/* 22K Standard Gold (BIS 916) */}
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
            <span className="text-amber-300 font-bold">Kolkata 22K (916):</span>
            <span className="font-bold text-amber-200">₹{metalRates.gold22k.toLocaleString('en-IN')}</span>
            <span className="text-amber-400/70 text-[10px]">/10g</span>
          </div>

          {/* 18K Diamond Gold */}
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/60">
            <span className="text-slate-300 font-semibold">Kolkata 18K:</span>
            <span className="font-semibold text-white">₹{metalRates.gold18k.toLocaleString('en-IN')}</span>
            <span className="text-slate-400 text-[10px]">/10g</span>
          </div>

          {/* 999 Fine Silver */}
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/60">
            <span className="text-slate-300 font-semibold">Silver 999:</span>
            <span className="font-semibold text-white">₹{metalRates.silver1kg.toLocaleString('en-IN')}</span>
            <span className="text-slate-400 text-[10px]">/kg</span>
          </div>
        </div>

        {/* Right: Updated info on desktop + Rate Card Link */}
        <div className="hidden md:flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/70">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Updated: <strong className="text-amber-200">{metalRates.lastUpdated}</strong></span>
          </div>

          <button
            onClick={scrollToRatesSection}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 hover:text-white transition-all font-semibold cursor-pointer"
            title="View Full Live Rate Card & Jewellery Calculator"
          >
            <span>Rate Card</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
