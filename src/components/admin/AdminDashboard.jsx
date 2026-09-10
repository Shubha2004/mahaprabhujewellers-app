import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import logoImg from '../../assets/logo.jpg';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminRates } from './AdminRates';
import { 
  ShieldAlert, 
  Layers, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  LogOut, 
  Store, 
  Crown,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = ({ setCurrentView }) => {
  const { adminLogout, isAdminLoggedIn } = useAuth();
  const { activeAdminTab, setActiveAdminTab, showToast } = useStore();

  const handleAdminLogout = () => {
    adminLogout();
    setCurrentView('shop');
    showToast('Admin logged out securely', 'info');
  };

  const navTabs = [
    { id: 'overview', name: 'Overview & KPIs', icon: <Layers className="w-4 h-4" /> },
    { id: 'products', name: 'Jewellery Products (CRUD)', icon: <Package className="w-4 h-4" /> },
    { id: 'orders', name: 'Customer Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'customers', name: 'Registered Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'rates', name: 'Live Metal Rates', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Portal title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-gold-glow bg-white p-0.5 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Maha Prabhu Jewellers" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-white">
                  MAHA PRABHU JEWELLERS
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-serif">
                Complete Store Management Portal
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('shop')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={handleAdminLogout}
              className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-800 mb-6 text-xs">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeAdminTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-gold-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        {activeAdminTab === 'overview' && <AdminOverview setActiveTab={setActiveAdminTab} />}
        {activeAdminTab === 'products' && <AdminProducts />}
        {activeAdminTab === 'orders' && <AdminOrders />}
        {activeAdminTab === 'customers' && <AdminCustomers />}
        {activeAdminTab === 'rates' && <AdminRates />}

      </main>

    </div>
  );
};
