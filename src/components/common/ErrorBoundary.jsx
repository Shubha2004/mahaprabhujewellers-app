import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('mpj_products_catalog');
      localStorage.removeItem('mpj_metal_rates');
      localStorage.removeItem('mpj_cart_items');
      localStorage.removeItem('mpj_wishlist_ids');
      localStorage.removeItem('mpj_all_orders');
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white border border-gold-200 rounded-3xl p-8 shadow-xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Maha Prabhu Jewellers
            </h2>
            <p className="text-xs text-slate-600">
              We encountered a display issue while loading the showroom collection.
            </p>
            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-mono text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset & Reload Showroom</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
