import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  TrendingUp, 
  Clock, 
  RefreshCw, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  PhoneCall,
  Scale
} from 'lucide-react';

export const LiveRatesSection = () => {
  const { metalRates, refreshMetalRatesTimestamp } = useStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Real-time digital clock for showroom
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedLiveClock = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedLiveDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Interactive Jewellery Calculator State
  const [calcPurity, setCalcPurity] = useState('22k'); // '24k' | '22k' | '18k' | 'silver'
  const [calcWeight, setCalcWeight] = useState(10); // in grams
  const [calcMakingPercent, setCalcMakingPercent] = useState(10); // %

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetalRatesTimestamp();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Calculations
  const getRatePerGram = () => {
    switch (calcPurity) {
      case '24k':
        return metalRates.gold24k / 10;
      case '22k':
        return metalRates.gold22k / 10;
      case '18k':
        return metalRates.gold18k / 10;
      case 'silver':
        return metalRates.silver1kg / 1000;
      default:
        return metalRates.gold22k / 10;
    }
  };

  const ratePerGram = getRatePerGram();
  const metalCost = Math.round(ratePerGram * (parseFloat(calcWeight) || 0));
  const makingCharges = Math.round((metalCost * (parseFloat(calcMakingPercent) || 0)) / 100);
  const gstTax = Math.round((metalCost + makingCharges) * 0.03); // 3% GST on jewellery
  const totalEstimatedCost = metalCost + makingCharges + gstTax;

  const handleWhatsAppCalculation = () => {
    const purityName = calcPurity === '24k' ? '24K Pure Gold' : calcPurity === '22k' ? '22K Hallmarked Gold' : calcPurity === '18k' ? '18K Diamond Gold' : '999 Fine Silver';
    const text = encodeURIComponent(
      `Namaste Maha Prabhu Jewellers! I calculated a price estimate on your live rate portal:\n\n*Metal & Purity:* ${purityName}\n*Weight:* ${calcWeight}g\n*Today's Rate:* ₹${ratePerGram.toLocaleString('en-IN')}/g\n*Approx Total (with making & GST):* ₹${totalEstimatedCost.toLocaleString('en-IN')}\n\nPlease let me know about available designs and showroom booking.`
    );
    window.open(`https://wa.me/919775219356?text=${text}`, '_blank');
  };

  return (
    <section id="live-rates-section" className="py-10 bg-gradient-to-b from-[#FAF8F5] via-amber-50/30 to-[#FAF8F5] border-y border-amber-200/50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Live Clock & Rates Synchronization */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Kolkata Bullion Market • কলকাতা লাইভ সোনার বাজার দর</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950">
              Kolkata Live Gold & Silver Rates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
              <span>Official Kolkata Sarafa Benchmark • Maha Prabhu Jewellers (Near Ramnagar High school, Tarakeshwar, WB)</span>
            </p>
          </div>

          {/* Real-time Time Widget & Refresh Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Showroom Clock */}
            <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">
                  Showroom Live Clock
                </span>
                <span className="font-mono font-bold text-sm sm:text-base text-amber-300">
                  {formattedLiveClock}
                </span>
              </div>
            </div>

            {/* Last Rates Synchronization Badge */}
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">
                  Rates Last Updated:
                </span>
                <strong className="text-xs sm:text-sm text-slate-900">
                  {metalRates.lastUpdated}
                </strong>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all cursor-pointer"
                title="Synchronize live bullion rate"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards: 24K, 22K, 18K Gold and 999 Silver */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. 24K Gold Card */}
          <div className="relative bg-white rounded-3xl p-6 border-2 border-amber-300/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-200/40 to-transparent rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100/90 px-2.5 py-1 rounded-full">
                  99.9% Pure Fine Gold
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Bullion Benchmark</span>
                </span>
              </div>

              <h3 className="font-serif-title font-bold text-xl text-slate-900">
                Kolkata 24K Pure Gold
              </h3>
              <p className="text-xs text-amber-700 font-serif mb-4">
                ২৪ ক্যারেট খাঁটি সোনা (কলকাতা মার্কেট)
              </p>

              {/* Main Price (10 grams) */}
              <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200/70 mb-4">
                <span className="text-[11px] text-slate-600 block">Rate per 10 Grams (১০ গ্রাম)</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-bold text-2xl text-slate-950">
                    ₹{metalRates.gold24k.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Breakdowns: 1g and 8g (1 Vori / ১ ভরি) */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
                <div className="flex justify-between items-center py-1 border-b border-slate-100/80">
                  <span className="text-slate-500">Per 1 Gram (১ গ্রাম):</span>
                  <strong className="text-slate-900 font-mono">
                    ₹{(metalRates.gold24k / 10).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100/80">
                  <span className="text-slate-500">Per 8 Grams (১ ভরি / Pavan):</span>
                  <strong className="text-amber-900 font-mono font-bold">
                    ₹{Math.round((metalRates.gold24k / 10) * 8).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Benchmark:</span>
                  <span className="text-[11px] text-slate-700 font-medium">999 Hallmark Bullion</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                Pure Sovereign
              </span>
              <span className="text-amber-700 font-semibold">Coins & Bars</span>
            </div>
          </div>

          {/* 2. 22K Gold Card (Most Popular) */}
          <div className="relative bg-gradient-to-b from-amber-500/10 via-white to-white rounded-3xl p-6 border-2 border-amber-500 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group ring-4 ring-amber-400/20">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-600 to-amber-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl shadow-sm tracking-wider">
              ⭐ Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between mb-3 mt-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-200/80 px-2.5 py-1 rounded-full">
                  91.6% BIS 916 Hallmark
                </span>
              </div>

              <h3 className="font-serif-title font-bold text-xl text-slate-950">
                Kolkata 22K Gold (916)
              </h3>
              <p className="text-xs text-amber-700 font-serif mb-4">
                ২২ ক্যারেট হলমার্ক সোনা (কলকাতা গহনা)
              </p>

              {/* Main Price (10 grams) */}
              <div className="bg-gradient-to-r from-amber-100/90 to-amber-50 rounded-2xl p-3.5 border border-amber-300 mb-4">
                <span className="text-[11px] text-amber-900 font-semibold block">Rate per 10 Grams (১০ গ্রাম)</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-bold text-2xl text-amber-950">
                    ₹{metalRates.gold22k.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Breakdowns: 1g and 8g (1 Vori / ১ ভরি) */}
              <div className="space-y-2 text-xs border-t border-amber-100 pt-3 text-slate-600">
                <div className="flex justify-between items-center py-1 border-b border-amber-100/80">
                  <span className="text-slate-600">Per 1 Gram (১ গ্রাম):</span>
                  <strong className="text-slate-950 font-mono font-bold">
                    ₹{(metalRates.gold22k / 10).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-100/80">
                  <span className="text-slate-600">Per 8 Grams (১ ভরি / Pavan):</span>
                  <strong className="text-amber-900 font-mono font-bold text-sm">
                    ₹{Math.round((metalRates.gold22k / 10) * 8).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Hallmark:</span>
                  <span className="text-[11px] text-amber-900 font-semibold">100% BIS 916 HUID</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Wedding Jewellery
              </span>
              <span className="text-amber-800 font-bold">Best Investment</span>
            </div>
          </div>

          {/* 3. 18K Gold Card */}
          <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-slate-100 to-transparent rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                  75.0% Fine Gold
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Diamond Standard
                </span>
              </div>

              <h3 className="font-serif-title font-bold text-xl text-slate-900">
                Kolkata 18K Gold
              </h3>
              <p className="text-xs text-slate-500 font-serif mb-4">
                ১৮ ক্যারেট সোনা (হীরা ও আধুনিক গহনা)
              </p>

              {/* Main Price (10 grams) */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 mb-4">
                <span className="text-[11px] text-slate-600 block">Rate per 10 Grams (১০ গ্রাম)</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-bold text-2xl text-slate-950">
                    ₹{metalRates.gold18k.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Breakdowns: 1g and 8g */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
                <div className="flex justify-between items-center py-1 border-b border-slate-100/80">
                  <span className="text-slate-500">Per 1 Gram (১ গ্রাম):</span>
                  <strong className="text-slate-900 font-mono">
                    ₹{(metalRates.gold18k / 10).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100/80">
                  <span className="text-slate-500">Per 8 Grams (১ ভরি):</span>
                  <strong className="text-slate-900 font-mono font-bold">
                    ₹{Math.round((metalRates.gold18k / 10) * 8).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Purity Standard:</span>
                  <span className="text-[11px] text-slate-700 font-medium">750 Hallmarked Gold</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Solitaire & Rings
              </span>
              <span className="text-slate-700 font-semibold">Daily Wear</span>
            </div>
          </div>

          {/* 4. Silver 999 Card */}
          <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-slate-200/50 to-transparent rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                  99.9% Fine Silver
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Pooja Standard
                </span>
              </div>

              <h3 className="font-serif-title font-bold text-xl text-slate-900">
                Kolkata Fine Silver 999
              </h3>
              <p className="text-xs text-slate-500 font-serif mb-4">
                ৯৯৯ খাঁটি রূপোর দর (কলকাতা মার্কেট)
              </p>

              {/* Main Price (1 kg) */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 mb-4">
                <span className="text-[11px] text-slate-600 block">Rate per 1 Kilogram (১ কেজি)</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-bold text-2xl text-slate-950">
                    ₹{metalRates.silver1kg.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Breakdowns: 10g and 100g */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
                <div className="flex justify-between items-center py-1 border-b border-slate-100/80">
                  <span className="text-slate-500">Per 10 Grams (১০ গ্রাম):</span>
                  <strong className="text-slate-900 font-mono">
                    ₹{Math.round(metalRates.silver1kg / 100).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100/80">
                  <span className="text-slate-500">Per 100 Grams (১০০ গ্রাম):</span>
                  <strong className="text-slate-900 font-mono font-bold">
                    ₹{Math.round(metalRates.silver1kg / 10).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Purity Standard:</span>
                  <span className="text-[11px] text-slate-700 font-medium">999 Fine Silver Bar</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Utensils & Coins
              </span>
              <span className="text-slate-700 font-semibold">Puja Ready</span>
            </div>
          </div>

        </div>

        {/* Live Gold Price Calculator Widget */}
        <div className="mt-10 bg-white rounded-3xl border border-amber-200/90 shadow-lg p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-700 shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-lg sm:text-xl text-slate-900">
                  Kolkata Live Jewellery Price Calculator (কলকাতা স্বর্ণমূল্য ক্যালকুলেটর)
                </h3>
                <p className="text-xs text-slate-500">
                  Estimate real-time jewellery cost based on Kolkata bullion rates with transparent making & 3% GST breakdown
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Includes standard 3% GST applicable on jewellery</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-xs">
              {/* Select Purity */}
              <div>
                <label className="block font-semibold text-slate-700 mb-2">
                  1. Select Metal & Karat Purity:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcPurity('24k')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      calcPurity === '24k'
                        ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <span className="block font-bold">24K Gold</span>
                    <span className="text-[10px] opacity-90">Pure 999</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcPurity('22k')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      calcPurity === '22k'
                        ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <span className="block font-bold">22K Gold</span>
                    <span className="text-[10px] opacity-90">BIS 916 (Jewellery)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcPurity('18k')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      calcPurity === '18k'
                        ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <span className="block font-bold">18K Gold</span>
                    <span className="text-[10px] opacity-90">Diamond 750</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcPurity('silver')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      calcPurity === 'silver'
                        ? 'bg-slate-800 text-white font-bold border-slate-800 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block font-bold">Silver 999</span>
                    <span className="text-[10px] opacity-90">Pure Fine</span>
                  </button>
                </div>
              </div>

              {/* Weight in Grams */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700">
                    2. Weight (in Grams):
                  </label>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {calcWeight} grams ≈ {(calcWeight / 8).toFixed(2)} Vori (ভরি)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-semibold focus:outline-none focus:border-amber-600"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">Grams</span>
                  </div>
                </div>

                {/* Quick Weight Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[1, 4, 8, 10, 15, 20, 50].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setCalcWeight(w)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                        calcWeight == w
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {w}g {w === 8 ? '(১ ভরি)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Making Charge selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700">
                    3. Estimated Making Charges (%):
                  </label>
                  <span className="text-slate-500 text-[11px]">
                    Current: {calcMakingPercent}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[0, 6, 8, 10, 12, 15].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCalcMakingPercent(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        calcMakingPercent === m
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {m}% {m === 0 ? '(Bullion/Coin)' : ''}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Result Card (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl border border-slate-800">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Showroom Estimate Breakdown
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Live Rate: ₹{Math.round(ratePerGram).toLocaleString('en-IN')}/g
                  </span>
                </div>

                <div className="space-y-2.5 text-xs pt-4">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Base Metal Price ({calcWeight}g):</span>
                    <span className="font-mono text-white font-semibold">
                      ₹{metalCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Making Charges ({calcMakingPercent}%):</span>
                    <span className="font-mono text-white font-semibold">
                      +₹{makingCharges.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>GST (3% on Gold & Making):</span>
                    <span className="font-mono text-amber-300 font-semibold">
                      +₹{gstTax.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-amber-200">
                      Approximate Showroom Price:
                    </span>
                    <span className="font-serif text-2xl font-bold text-amber-400">
                      ₹{totalEstimatedCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppCalculation}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Enquire This Weight on WhatsApp</span>
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  Visit our Ramnagar Tarakeshwar showroom for exact weight & custom design quotes
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
