import React from 'react';
import { useStore } from '../../context/StoreContext';
import { handleImageError } from '../../utils/imageFallback';
import logoImg from '../../assets/logo.jpg';
import { Sparkles, ShieldCheck, Tag, ArrowRight, Award } from 'lucide-react';

export const HeroBanner = () => {
  const { setSelectedCategory } = useStore();

  const handleCta = (catId) => {
    setSelectedCategory(catId);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.18),transparent_50%)]" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_70%_70%,rgba(184,134,11,0.15),transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Offers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1 shadow-gold-glow border-2 border-amber-400/70 shrink-0">
                <img src={logoImg} alt="Maha Prabhu Jewellers" className="w-full h-full object-contain" />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Timeless Heritage • Mahaprabhu Craftsmanship</span>
              </div>
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Where Pure Gold Meets <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic">Divine Artistry</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-light">
              Explore 9 signature collections from grand 22K bridal chokers and IGI certified solitaires to auspicious mangalsutras and 999 fine silver pooja artifacts.
            </p>

            {/* Coupons & Highlights banner */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Code <strong className="text-amber-300">FESTIVE10</strong>: 10% Off</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Code <strong className="text-amber-300">MAHAPRABHU</strong>: ₹2,500 Off</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => handleCta('necklaces')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-gold-glow flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Necklaces</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCta('silver-items')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <span>Pure Silver Items</span>
              </button>

              <button
                onClick={() => handleCta('rings')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <span>Solitaire Rings</span>
              </button>
            </div>

            {/* Micro assurance */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>BIS 916 HUID Hallmarked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>IGI & SGL Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Outer decorative gold ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/40 via-amber-300/30 to-amber-700/40 rounded-3xl blur-md"></div>
              
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-gold-500/30 shadow-2xl">
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                    alt="Bridal Heritage Gold Choker"
                    onError={handleImageError}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                    Signature Bridal 2025
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-amber-300 text-xs px-2.5 py-1 rounded-full border border-amber-500/30">
                    22K Hallmarked
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs text-amber-300 font-serif">Masterpiece Creation</p>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Rajgharana Heritage Choker
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-amber-400 font-bold text-sm">₹3,25,000</span>
                      <span className="text-slate-300">42.50 gms • HUID Verified</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/90 flex items-center justify-between border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-slate-300 font-medium">In Showroom Ready to Ship</span>
                  </div>
                  <button
                    onClick={() => handleCta('necklaces')}
                    className="text-amber-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Piece</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
