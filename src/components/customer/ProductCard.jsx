import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, ShieldCheck, Star } from 'lucide-react';
import { handleImageError } from '../../utils/imageFallback';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProductModal } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Image Section */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-50">
        <img
          src={product.images && product.images[0] ? product.images[0] : ''}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {product.tag}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => setSelectedProductModal(product)}
          className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-slate-950/85 hover:bg-slate-950 text-white text-xs font-semibold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick View Details</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Karat and Weight specs */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              {product.karat} {product.metal}
            </span>
            <span className="font-medium text-slate-600">
              Wt: {product.grossWeight}g
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProductModal(product)}
            className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Hallmark verification */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-1">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{product.hallmarkCert}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base sm:text-lg text-slate-950">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block">Making + GST included</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shrink-0"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
