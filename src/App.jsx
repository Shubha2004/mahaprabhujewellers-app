import React, { useState, useMemo } from 'react';
import { useStore } from './context/StoreContext';
import { useAuth } from './context/AuthContext';
import { LiveRatesBar } from './components/common/LiveRatesBar';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HeroBanner } from './components/customer/HeroBanner';
import { LiveRatesSection } from './components/customer/LiveRatesSection';
import { CategoryCards } from './components/customer/CategoryCards';
import { ProductCard } from './components/customer/ProductCard';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { WishlistView } from './components/customer/WishlistView';
import { AuthModal } from './components/customer/AuthModal';
import { UserProfileModal } from './components/customer/UserProfileModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  Filter, 
  Sparkles, 
  ArrowUpDown, 
  X, 
  Search, 
  Check, 
  SlidersHorizontal,
  Crown
} from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState('shop'); // 'shop' | 'wishlist' | 'admin'

  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    selectedPurity,
    setSelectedPurity,
    sortBy,
    setSortBy
  } = useStore();

  const { isAdminLoggedIn } = useAuth();

  // Filtered & Sorted products computation
  const displayedProducts = useMemo(() => {
    let list = [...products];

    // 1. Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.karat.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // 3. Purity / Karat filter
    if (selectedPurity && selectedPurity !== 'all') {
      list = list.filter((p) => p.karat === selectedPurity);
    }

    // 4. Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return list;
  }, [products, selectedCategory, searchQuery, selectedPurity, sortBy]);

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  // If view is admin and admin is logged in, show Admin Dashboard
  if (currentView === 'admin' && isAdminLoggedIn) {
    return (
      <>
        <Toast />
        <AdminDashboard setCurrentView={setCurrentView} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Toast />

      {/* Top Live Rates Bar */}
      <LiveRatesBar />

      {/* Main Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* View Switcher */}
      {currentView === 'wishlist' ? (
        <WishlistView setCurrentView={setCurrentView} />
      ) : (
        <main className="flex-1 pb-16">
          
          {/* Hero Carousel & Banner */}
          <HeroBanner />

          {/* Live 24K, 22K, 18K Gold & Silver Bullion Rates with Real-time Clock */}
          <LiveRatesSection />

          {/* 9 Dedicated Jewellery Sections Grid */}
          <CategoryCards />

          {/* Catalog / Showroom Products Section */}
          <section id="catalog-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
            
            {/* Catalog Header & Filters Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-gold-600" />
                    <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-slate-900">
                      {selectedCategory === 'all'
                        ? 'All Fine Jewellery Designs'
                        : `${currentCategoryObj?.name || selectedCategory} Collection`}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {displayedProducts.length} certified pieces
                    {currentCategoryObj && ` • ${currentCategoryObj.bengaliName || currentCategoryObj.hindiName}`}
                  </p>
                </div>

                {/* Filter Controls Row */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Purity Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                    <span className="text-slate-400 font-medium">Purity:</span>
                    <select
                      value={selectedPurity}
                      onChange={(e) => setSelectedPurity(e.target.value)}
                      className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Purities</option>
                      <option value="22K">22K Gold (916)</option>
                      <option value="18K">18K Gold (750)</option>
                      <option value="14K">14K Gold (585)</option>
                      <option value="999 Silver">999 Silver</option>
                      <option value="925 Silver">925 Silver</option>
                    </select>
                  </div>

                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured Collection</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">New Arrivals First</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Clear all active filters if any are set */}
                  {(selectedCategory !== 'all' || selectedPurity !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedPurity('all');
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Active search banner if user searched */}
              {searchQuery && (
                <div className="flex items-center justify-between text-xs bg-amber-50 text-amber-900 px-3.5 py-2 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-amber-600" />
                    <span>Searching for: <strong>"{searchQuery}"</strong></span>
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-amber-800 font-bold hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Quick Section Pills (All 9) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs pt-1 border-t border-slate-100">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-gold-400 font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Showroom
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-600 text-white font-semibold shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

            </div>

            {/* Products Grid */}
            {displayedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-800">
                  No matching jewellery found
                </h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search keyword, category selection, or purity filter to see more showroom pieces.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPurity('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
                >
                  View Full Showroom Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </section>

        </main>
      )}

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Mobile Native-style Bottom Nav */}
      <MobileNav currentView={currentView} setCurrentView={setCurrentView} />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <UserProfileModal />
      <AdminLoginModal setCurrentView={setCurrentView} />

    </div>
  );
}
