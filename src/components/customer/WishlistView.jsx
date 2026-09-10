import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export const WishlistView = ({ setCurrentView }) => {
  const { wishlist, products, addToCart, showToast } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
    showToast('All wishlist items added to shopping bag!', 'success');
  };

  return (
    <div className="py-10 min-h-[70vh] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('shop')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              title="Back to Showroom"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900">
                  Your Saved Pieces
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {wishlistedProducts.length} favourite jewellery item(s) bookmarked
              </p>
            </div>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Shopping Bag</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 mx-auto flex items-center justify-center text-rose-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-800">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore our 9 jewellery categories and click the heart icon on any design you love to save it here.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md inline-block"
            >
              Explore Showroom
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
