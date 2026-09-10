import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

export const CategoryCards = () => {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>৯টি বিশেষ জুয়েলারি বিভাগ (9 Dedicated Sections)</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              আমাদের জুয়েলারি সেকশনসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              যেকোনো সেকশনে ক্লিক করে আমাদের সোনা, হিরে ও খাঁটি রুপোর এক্সক্লুসিভ কালেকশন দেখুন
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelect('all')}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-gold-400 border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-gold-400'
              }`}
            >
              সব কালেকশন দেখুন ({categories.length})
            </button>
          </div>
        </div>

        {/* 9 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white border ${
                  isSelected
                    ? 'ring-2 ring-amber-600 border-amber-600 shadow-lg -translate-y-1'
                    : 'border-slate-200/80 hover:border-amber-400 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Image Container */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Purity Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/70 backdrop-blur-sm text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded-md border border-amber-500/20">
                    {cat.purity}
                  </div>

                  {/* Category Title on image overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-xs text-amber-300 block font-serif tracking-wide font-medium">
                      {cat.bengaliName || cat.hindiName}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base leading-tight drop-shadow-sm">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Footer Info of card */}
                <div className="p-3 bg-white flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    {cat.itemCount}+ ডিজাইন
                  </span>
                  <div className={`flex items-center gap-1 font-semibold text-[11px] ${
                    isSelected ? 'text-amber-700' : 'text-slate-700 group-hover:text-amber-700'
                  }`}>
                    <span>{isSelected ? 'দেখা হচ্ছে' : 'দেখুন'}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
