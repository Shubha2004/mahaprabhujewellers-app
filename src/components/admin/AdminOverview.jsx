import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  AlertTriangle, 
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const AdminOverview = ({ setActiveTab }) => {
  const { products, orders, categories } = useStore();
  const { users } = useAuth();

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const totalCustomersCount = users.length;
  const lowStockProducts = products.filter(p => p.stock <= 3);

  // Category items count
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.id).length
  }));

  return (
    <div className="space-y-6">
      
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Store Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="font-serif text-2xl font-bold text-white">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
              <span>{totalOrdersCount > 0 ? `${totalOrdersCount} verified order transactions` : 'Real in-store & online orders'}</span>
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Customer Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="font-serif text-2xl font-bold text-white">
              {totalOrdersCount} Orders
            </h3>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {orders.filter(o => o.status === 'In Transit').length} in transit now
            </span>
          </div>
        </div>

        {/* Catalog Items */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Catalog Items</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="font-serif text-2xl font-bold text-white">
              {totalProductsCount} Designs
            </h3>
            <span className="text-[11px] text-amber-400 mt-1 block">
              Across 9 distinct sections
            </span>
          </div>
        </div>

        {/* Registered Customers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Privilege Members</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="font-serif text-2xl font-bold text-white">
              {totalCustomersCount} Registered
            </h3>
            <span className="text-[11px] text-purple-300 mt-1 block">
              All accounts verified
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Category Inventory & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 9 Categories Inventory Breakdown */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h4 className="font-serif font-bold text-base text-white">
                Live Inventory Across 9 Store Sections
              </h4>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs text-amber-400 hover:underline"
            >
              Manage Products →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categoryCounts.map(cat => (
              <div
                key={cat.id}
                onClick={() => setActiveTab('products')}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-amber-400/50 cursor-pointer transition-colors"
              >
                <span className="text-[10px] text-amber-400 block font-serif truncate">
                  {cat.name}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-bold text-base text-white">{cat.count}</span>
                  <span className="text-[10px] text-slate-400">items</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Warning Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Showroom Low Stock Alerts</span>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-xs text-slate-400">All products have healthy inventory levels.</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 4).map(p => (
                <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/50">
                  <div className="truncate mr-2">
                    <p className="font-medium text-slate-200 truncate">{p.name}</p>
                    <span className="text-[10px] text-slate-400">{p.karat} • {p.category}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px] shrink-0">
                    Only {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setActiveTab('products')}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Update Inventory Stocks
          </button>
        </div>

      </div>

      {/* Recent Orders Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-base text-white">Recent Customer Orders</h4>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs text-amber-400 hover:underline"
          >
            View All Orders ({orders.length}) →
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs bg-slate-950/40 rounded-xl border border-slate-800/60">
            <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
            <p className="font-semibold text-slate-300">No real customer orders yet</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Orders placed by customers online or created in-store will appear here in real-time.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total (INR)</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {orders.slice(0, 4).map(order => (
                  <tr key={order.id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-mono font-semibold text-amber-400">{order.id}</td>
                    <td className="py-3 font-medium text-white">{order.customerName}</td>
                    <td className="py-3">{order.items?.length || 1} item(s)</td>
                    <td className="py-3 font-bold text-white">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="py-3 text-slate-400">{order.paymentMethod}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
