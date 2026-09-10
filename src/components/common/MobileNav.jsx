import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { Home, Grid, Heart, ShoppingBag, User, ShieldAlert } from 'lucide-react';

export const MobileNav = ({ currentView, setCurrentView }) => {
  const { cartCount, wishlist, setIsCartOpen, setIsProfileOpen, setIsAuthOpen, setSelectedCategory } = useStore();
  const { currentUser, isAdminLoggedIn } = useAuth();

  const handleAccountClick = () => {
    if (isAdminLoggedIn && currentView !== 'admin') {
      setCurrentView('admin');
    } else if (currentUser) {
      setIsProfileOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setCurrentView('shop');
            setSelectedCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'shop' ? 'text-amber-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            setCurrentView('shop');
            const el = document.getElementById('categories-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sections</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setCurrentView('wishlist')}
          className={`flex flex-col items-center gap-1 relative transition-colors ${
            currentView === 'wishlist' ? 'text-rose-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 relative text-slate-500 hover:text-amber-600"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Bag</span>
        </button>

        {/* Account / Admin */}
        <button
          onClick={handleAccountClick}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'admin' ? 'text-amber-700' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {isAdminLoggedIn ? (
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="text-[10px] font-medium">
            {isAdminLoggedIn ? 'Admin' : currentUser ? 'Profile' : 'Sign In'}
          </span>
        </button>
      </div>
    </div>
  );
};
