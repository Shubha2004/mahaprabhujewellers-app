import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { handleImageError } from '../../utils/imageFallback';
import { 
  X, 
  User, 
  Package, 
  LogOut, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';

export const UserProfileModal = () => {
  const { isProfileOpen, setIsProfileOpen, orders, showToast } = useStore();
  const { currentUser, customerLogout } = useAuth();

  if (!isProfileOpen || !currentUser) return null;

  // Filter orders for this customer (or match by email or show existing sample orders)
  const customerOrders = orders.filter(
    (ord) => ord.customerEmail?.toLowerCase() === currentUser.email?.toLowerCase()
  );

  const handleLogout = () => {
    customerLogout();
    setIsProfileOpen(false);
    showToast('Signed out successfully', 'info');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Transit':
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Confirmed':
      case 'Processing':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gold-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 font-bold text-base flex items-center justify-center">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-950">{currentUser.name}</h3>
              <p className="text-xs text-amber-800 font-medium">Mahaprabhu Privilege Club Member</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-rose-300 text-xs font-semibold text-slate-600 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Customer Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{currentUser.phone || 'Phone not set'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">{currentUser.city || 'India'}</span>
            </div>
          </div>

          {/* Orders Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-600" />
                <span>My Jewellery Orders ({customerOrders.length})</span>
              </h4>
            </div>

            {customerOrders.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Package className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">You haven't placed any orders with this account yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3"
                  >
                    {/* Order top bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div>
                        <span className="font-bold text-xs text-slate-900">Order #{order.id}</span>
                        <span className="text-[11px] text-slate-400 ml-2">Placed on {order.date}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            {item.image && (
                              <img src={item.image} alt={item.name} onError={handleImageError} className="w-10 h-10 rounded-lg object-cover" />
                            )}
                            <div>
                              <p className="font-medium text-slate-800">{item.name}</p>
                              <span className="text-[10px] text-slate-400">{item.karat} • Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-bold text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer tracking info */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        Tracking: <strong className="text-slate-800 font-mono">{order.trackingNumber}</strong>
                      </div>
                      <div className="text-right">
                        <span>Total Paid: </span>
                        <strong className="text-slate-900 font-bold text-xs">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
