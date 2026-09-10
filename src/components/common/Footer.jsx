import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';
import { 
  Crown, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const Footer = ({ setCurrentView }) => {
  const { categories, setSelectedCategory, setIsAdminLoginOpen } = useStore();
  const { isAdminLoggedIn } = useAuth();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('shop');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold">100% BIS 916</h4>
              <p className="text-[11px] text-slate-400">Govt. Hallmarked Gold</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold">Certified Diamonds</h4>
              <p className="text-[11px] text-slate-400">IGI & SGL Authenticated</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold">Insured Transit</h4>
              <p className="text-[11px] text-slate-400">Doorstep Pan-India Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold">Lifetime Exchange</h4>
              <p className="text-[11px] text-slate-400">Transparent buyback guarantee</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                <img src={logoImg} alt="Maha Prabhu Jewellers Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif-title font-bold text-xl tracking-tight text-white">
                  MAHA PRABHU JEWELLERS
                </span>
                <p className="text-xs text-amber-400 font-serif">মহা প্রভু জুয়েলার্স - বিশুদ্ধতার প্রতীক</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Crafting extraordinary jewellery pieces for four decades. From heritage bridal necklaces to pure 999 silver pooja artifacts, we celebrate timeless artistry and authentic purity.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-slate-200">Showroom:</strong> Near Ramnagar High school, Ramnagar Tarakeshwar Road, West Bengal 712410
                </span>
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-slate-200">Helpline:</strong>{' '}
                  <a href="tel:+919775219356" className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition-colors">
                    +91 9775219356
                  </a>
                  {' '}/{' '}
                  <a href="tel:+919382924457" className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition-colors">
                    +91 9382924457
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:support@mahaprabhujewellers.com" className="hover:text-amber-300 transition-colors">
                  support@mahaprabhujewellers.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Sun: 10:00 AM - 8:30 PM</span>
              </p>
            </div>
          </div>

          {/* Jewellery Sections (1st Group) */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 border-l-2 border-amber-400 pl-2">
              Sections (1-5)
            </h5>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Jewellery Sections (2nd Group) */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wide uppercase mb-4 border-l-2 border-amber-400 pl-2">
              Sections (6-9)
            </h5>
            <ul className="space-y-2 text-xs">
              {categories.slice(5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => { setSelectedCategory('all'); setCurrentView('shop'); }}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  View All Collection →
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Store Governance */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </h5>
            <p className="text-[11px] text-slate-400 leading-normal">
              Secure store administration portal for inventory, live bullion rates, and order fulfillment.
            </p>
            <button
              onClick={() => {
                if (isAdminLoggedIn) setCurrentView('admin');
                else setIsAdminLoginOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Go to Admin Dashboard' : 'Login to Admin Dashboard'}</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Maha Prabhu Jewellers (মহা প্রভু জুয়েলার্স). All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>BIS Hallmark Guaranteed</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
