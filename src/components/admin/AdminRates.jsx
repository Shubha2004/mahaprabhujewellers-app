import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { TrendingUp, Check, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminRates = () => {
  const { metalRates, updateMetalRates } = useStore();

  const [ratesData, setRatesData] = useState({
    gold24k: metalRates.gold24k,
    gold22k: metalRates.gold22k,
    gold18k: metalRates.gold18k,
    silver1kg: metalRates.silver1kg,
    silver10g: metalRates.silver10g
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setRatesData({ ...ratesData, [e.target.name]: Number(e.target.value) });
  };

  const handleAutoCalculate = () => {
    if (!ratesData.gold24k) return;
    const g24 = Number(ratesData.gold24k);
    // Standard BIS ratios: 22K = 22/24 (approx 91.67%), 18K = 18/24 (75%)
    const g22 = Math.round(g24 * (22 / 24));
    const g18 = Math.round(g24 * (18 / 24));
    setRatesData({
      ...ratesData,
      gold22k: g22,
      gold18k: g18
    });
  };

  const handleLoadKolkataBenchmark = () => {
    setRatesData({
      gold24k: 155510,
      gold22k: 142550,
      gold18k: 116630,
      silver1kg: 102000,
      silver10g: 1020
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMetalRates(ratesData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      
      {/* Header */}
      <div>
        <h3 className="font-serif font-bold text-xl text-white">
          Kolkata Bullion & Metal Rates Controller
        </h3>
        <p className="text-xs text-slate-400">
          Configure real-time Kolkata market gold (24K, 22K, 18K) and silver rates displayed with timestamps across the showroom
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Kolkata bullion rates updated successfully! Live time has been stamped across all customer tickers and rate cards.</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm">
        
        {/* Quick Helper Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-center gap-2 text-xs text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kolkata Live Market Tools:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLoadKolkataBenchmark}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-semibold text-xs transition-colors cursor-pointer"
            >
              Load Kolkata Live Benchmark
            </button>
            <button
              type="button"
              onClick={handleAutoCalculate}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Auto Calculate 22K & 18K
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 24K Gold */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                24K Pure Gold (₹ per 10 grams)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="gold24k"
                  required
                  value={ratesData.gold24k}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">INR / 10g</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Per Gram: ₹{Math.round(ratesData.gold24k / 10).toLocaleString('en-IN')}
              </span>
            </div>

            {/* 22K Gold */}
            <div>
              <label className="block text-amber-300 font-semibold mb-1">
                22K Standard Gold (₹ per 10 grams) • BIS 916
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="gold22k"
                  required
                  value={ratesData.gold22k}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-amber-500/50 text-amber-400 font-mono text-sm font-bold focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">INR / 10g</span>
              </div>
              <span className="text-[10px] text-amber-300/80 mt-1 block">
                Per Gram: ₹{Math.round(ratesData.gold22k / 10).toLocaleString('en-IN')} | 8g (Vori): ₹{Math.round((ratesData.gold22k / 10) * 8).toLocaleString('en-IN')}
              </span>
            </div>

            {/* 18K Gold */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                18K Diamond Gold (₹ per 10 grams)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="gold18k"
                  required
                  value={ratesData.gold18k}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">INR / 10g</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Per Gram: ₹{Math.round(ratesData.gold18k / 10).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Silver 1kg */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                999 Fine Silver (₹ per 1 Kilogram)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="silver1kg"
                  required
                  value={ratesData.silver1kg}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">INR / kg</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Per 10 Grams: ₹{Math.round(ratesData.silver1kg / 100).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Currently published rates: <strong className="text-amber-300">{metalRates.lastUpdated}</strong></span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publish & Stamp Current Time</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
