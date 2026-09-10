import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { handleImageError } from '../../utils/imageFallback';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  PhoneCall, 
  Award, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight,
  Share2
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { 
    selectedProductModal, 
    setSelectedProductModal, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    setIsCheckoutOpen,
    showToast 
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProductModal) return null;
  const p = selectedProductModal;
  const wishlisted = isInWishlist(p.id);

  const images = p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'];

  const handleAddToCart = () => {
    addToCart(p, quantity);
  };

  const handleBuyNow = () => {
    addToCart(p, quantity);
    setSelectedProductModal(null);
    setIsCartOpen(true);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Namaste Maha Prabhu Jewellers! I am interested in purchasing:\n\n*Product:* ${p.name}\n*Category:* ${p.category}\n*Purity:* ${p.karat}\n*Weight:* ${p.grossWeight}g\n*Price:* ₹${p.price.toLocaleString('en-IN')}\n\nPlease share more details and availability at your showroom.`
    );
    window.open(`https://wa.me/919775219356?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gold-200 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="md:w-1/2 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
            <img
              src={images[activeImageIdx] || images[0]}
              alt={p.name}
              onError={handleImageError}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {p.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                {p.discountPercent}% FESTIVE DISCOUNT
              </span>
            )}
          </div>

          {/* Thumbnails if multiple */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx ? 'border-amber-600 ring-2 ring-amber-300' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" onError={handleImageError} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick trust tags */}
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% BIS Hallmarked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Insured Free Shipping</span>
            </div>
          </div>
        </div>

        {/* Right: Details & Buying actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Category & Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                {p.category.replace('-', ' ')} • {p.karat}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`p-2 rounded-full transition-colors ${
                    wishlisted ? 'bg-rose-50 text-rose-600' : 'hover:bg-slate-100 text-slate-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-950 leading-tight">
              {p.name}
            </h2>

            {/* Price Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                {p.originalPrice > p.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{p.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-900 font-medium mt-1">
                Prices include all making charges and 3% Indian GST.
              </p>
            </div>

            {/* Technical Jewelry Specifications Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <div className="bg-slate-100 font-semibold p-2.5 text-slate-800 border-b border-slate-200">
                Jewellery Specifications & Purity
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 text-slate-700">
                <div className="p-2.5 bg-white">
                  <span className="text-slate-400 block text-[10px]">Metal & Purity</span>
                  <strong className="font-semibold">{p.metal} ({p.karat})</strong>
                </div>
                <div className="p-2.5 bg-white">
                  <span className="text-slate-400 block text-[10px]">Gross Weight</span>
                  <strong className="font-semibold">{p.grossWeight} grams</strong>
                </div>
                <div className="p-2.5 bg-white">
                  <span className="text-slate-400 block text-[10px]">Net Weight</span>
                  <strong className="font-semibold">{p.netWeight || p.grossWeight} grams</strong>
                </div>
                <div className="p-2.5 bg-white">
                  <span className="text-slate-400 block text-[10px]">Certification</span>
                  <strong className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {p.hallmarkCert}
                  </strong>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Description & Craftsmanship
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {p.description}
              </p>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${p.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="font-medium text-slate-700">
                {p.stock > 0 ? `In Stock (${p.stock} units available at showroom)` : 'Currently Made to Order'}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity modifier */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:text-slate-950"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:text-slate-950"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* WhatsApp direct inquiry */}
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Enquire & Reserve on WhatsApp with Showroom</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
