import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  UserPlus, 
  Trash2, 
  MessageCircle, 
  X,
  Check
} from 'lucide-react';

export const AdminCustomers = () => {
  const { users, addCustomerManually, deleteCustomer } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Tarakeshwar, West Bengal',
    address: ''
  });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.phone && u.phone.includes(searchTerm))
  );

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!newCustomerData.name.trim() || !newCustomerData.phone.trim()) {
      alert('Please provide customer name and phone number.');
      return;
    }
    addCustomerManually(newCustomerData);
    setNewCustomerData({
      name: '',
      phone: '',
      email: '',
      city: 'Tarakeshwar, West Bengal',
      address: ''
    });
    setIsAddModalOpen(false);
  };

  const getCleanPhone = (phone) => {
    return (phone || '').replace(/\D/g, '').slice(-10);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Real Customer Directory & In-Store Database
          </h3>
          <p className="text-xs text-slate-400">
            Real registered customers from online store signups, checkout orders, and showroom walk-ins
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Total Registered: </span>
            <span className="text-xs font-bold text-amber-400">{users.length} Customers</span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Walk-in Customer</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="relative max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search real customer by name, phone or email..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Customers Table / Empty State */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {users.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-600">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-slate-200">
                No Real Customers Registered Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                This store database only shows genuine customers. When buyers create accounts, complete checkout orders, or you register walk-in showroom visitors, they will appear here.
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register First Showroom Customer</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px] uppercase">
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Contact & Quick Actions</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4">Orders</th>
                  <th className="py-3 px-4 text-right">Total Spent</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredUsers.map(user => {
                  const cleanPhone = getCleanPhone(user.phone);
                  return (
                    <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center text-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-white block">{user.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{user.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Actions */}
                      <td className="py-3.5 px-4">
                        <p className="text-slate-300 font-mono">{user.phone || 'No phone'}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{user.email}</p>
                        
                        {/* Quick WhatsApp / Call */}
                        {cleanPhone && (
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=Namaste%20${encodeURIComponent(user.name)},%20Maha%20Prabhu%20Jewellers%20welcomes%20you!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800"
                              title="Message Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${user.phone}`}
                              className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800"
                              title="Call Customer Directly"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-300 block">{user.city || 'West Bengal'}</span>
                        {user.address && (
                          <span className="text-[10px] text-slate-500 truncate max-w-[160px] block">
                            {user.address}
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {user.joinedDate || 'Today'}
                      </td>

                      {/* Orders count */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">
                          {user.ordersCount || 0} order(s)
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="py-3.5 px-4 text-right font-bold text-amber-400 font-mono text-sm">
                        ₹{(user.totalSpent || 0).toLocaleString('en-IN')}
                      </td>

                      {/* Delete */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Remove customer record "${user.name}"?`)) {
                              deleteCustomer(user.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Customer Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredUsers.length === 0 && users.length > 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No customers match your search term.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Walk-in Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <h4 className="font-serif font-bold text-base text-white">
                  Register Showroom Walk-in Customer
                </h4>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCustomerData.name}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })}
                  placeholder="e.g. Subhankar Ghosh"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={newCustomerData.phone}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, phone: e.target.value })}
                  placeholder="e.g. 9775219356"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={newCustomerData.email}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
                  placeholder="customer@email.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  City / Village / Town
                </label>
                <input
                  type="text"
                  value={newCustomerData.city}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, city: e.target.value })}
                  placeholder="e.g. Tarakeshwar, Hooghly"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Address / Landmark
                </label>
                <textarea
                  rows="2"
                  value={newCustomerData.address}
                  onChange={(e) => setNewCustomerData({ ...newCustomerData, address: e.target.value })}
                  placeholder="Street, Landmark, Tarakeshwar"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Customer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
