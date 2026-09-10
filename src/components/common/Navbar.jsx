import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronDown, 
  Crown,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView }) => {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    cartCount, 
    cartSubtotal,
    wishlist, 
    setIsCartOpen, 
    setIsAuthOpen, 
    setIsProfileOpen, 
    setIsAdminLoginOpen 
  } = useStore();

  const { currentUser, isAdminLoggedIn, adminLogout, customerLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('shop');
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gold-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setCurrentView('shop'); setSelectedCategory('all'); }}
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-gold-glow group-hover:scale-105 transition-transform duration-300 bg-white p-1 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Maha Prabhu Jewellers" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-title font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-gold-700 transition-colors">
                  MAHA PRABHU
                </span>
                <span className="text-[10px] tracking-widest font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                  Est. 1984
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-serif text-gold-600 tracking-wider font-semibold">
                  JEWELLERS
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">| মহা প্রভু জুয়েলার্স</span>
              </div>
            </div>
          </div>

          {/* Search Bar - Center Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search necklaces, solitaire rings, bangles, silver pooja items..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-200/50 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Icons & Accounts */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* WhatsApp Store Help link */}
            <a
              href="https://wa.me/919775219356?text=Hello%20Maha%20Prabhu%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Chat with Jewellery Expert"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Expert Help</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2 text-slate-700 hover:text-gold-600 rounded-full hover:bg-gold-50 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-gold-600 rounded-full hover:bg-gold-50 transition-colors flex items-center gap-1.5"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-semibold text-slate-800">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </button>

            {/* Customer User Account */}
            {currentUser ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 hover:bg-gold-50 text-slate-800 text-xs font-medium border border-slate-200 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gold-500 text-slate-950 font-bold text-[11px] flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-gold-50 text-slate-700 text-xs font-semibold border border-slate-200 hover:border-gold-300 transition-colors"
              >
                <User className="w-4 h-4 text-gold-600" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Admin Portal Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={() => setCurrentView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                  currentView === 'admin'
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                }`}
                title="Admin Dashboard Active"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-amber-800 hover:bg-amber-50/80 border border-transparent hover:border-amber-200 transition-colors"
                title="Admin Login (admin / Password8989$$)"
              >
                <ShieldAlert className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                <span className="hidden lg:inline">Admin</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search necklaces, rings, bangles, silver..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-gold-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Horizontal Category Nav Bar (All 9 Requested Sections) */}
      <div className="bg-[#FAF8F5] border-t border-gold-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 scrollbar-none text-xs">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all' && currentView === 'shop'
                  ? 'bg-slate-900 text-gold-400 shadow-sm'
                  : 'text-slate-600 hover:text-gold-700 hover:bg-gold-50/80'
              }`}
            >
              ✨ All Showroom
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id && currentView === 'shop'
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-slate-700 hover:text-gold-700 hover:bg-amber-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-3">
          <p className="text-xs uppercase font-bold tracking-wider text-slate-400 px-1">
            Shop by Category
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                selectedCategory === 'all' ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-800'
              }`}
            >
              ✨ All Showroom
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-left px-3 py-2 rounded-lg text-xs ${
                  selectedCategory === cat.id ? 'bg-amber-600 text-white font-semibold' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isAdminLoggedIn) setCurrentView('admin');
                else setIsAdminLoginOpen(true);
              }}
              className="flex items-center gap-1.5 text-amber-800 font-semibold py-1"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Open Admin Panel' : 'Admin Login (Protected)'}</span>
            </button>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setCurrentView('wishlist');
              }}
              className="flex items-center gap-1 text-slate-600 py-1"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
