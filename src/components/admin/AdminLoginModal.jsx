import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';
import { X, Lock, ShieldAlert } from 'lucide-react';

export const AdminLoginModal = ({ setCurrentView }) => {
  const { isAdminLoginOpen, setIsAdminLoginOpen, showToast } = useStore();
  const { adminLogin } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = adminLogin(username, password);
    if (res.success) {
      showToast('Admin access authorized! Welcome to Admin Dashboard.', 'success');
      setIsAdminLoginOpen(false);
      setCurrentView('admin');
      setUsername('');
      setPassword('');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-slate-900 border border-amber-500/30 text-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/50 bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
              <img src={logoImg} alt="Maha Prabhu Jewellers" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Admin Control Portal
              </h3>
              <p className="text-[11px] text-amber-400 font-mono">Confidential Store Administration</p>
            </div>
          </div>
          <button
            onClick={() => { setIsAdminLoginOpen(false); setError(''); }}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="text-center mb-5">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-amber-500/60 bg-white p-1.5 mx-auto shadow-gold-glow mb-2 flex items-center justify-center">
              <img src={logoImg} alt="Maha Prabhu Jewellers" className="w-full h-full object-contain" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white">MAHA PRABHU JEWELLERS</h4>
            <p className="text-[11px] text-amber-400 font-serif">মহা প্রভু জুয়েলার্স • Authorized Admin Sign In</p>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800/90 text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800/90 text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Verify & Access Admin Portal</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
