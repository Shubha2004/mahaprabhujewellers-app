import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { CATEGORIES } from '../data/categories';

const StoreContext = createContext();

export const getFormattedCurrentTime = () => {
  const d = new Date();
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) + ', ' + d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }) + ' IST';
};

const DEFAULT_RATES = {
  marketLocation: 'Kolkata, West Bengal',
  gold24k: 155510, // per 10g Kolkata live bullion rate
  gold22k: 142550, // per 10g Kolkata 22K (BIS 916)
  gold18k: 116630, // per 10g Kolkata 18K (750)
  silver1kg: 102000, // per 1kg Kolkata fine silver 999
  silver10g: 1020,   // per 10g
  lastUpdated: `${getFormattedCurrentTime()} (Kolkata Market)`
};

const INITIAL_ORDERS = [];

export const StoreProvider = ({ children }) => {
  // 1. Products Catalog
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_products_catalog_v2');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mpj_products_catalog_v2', JSON.stringify(products));
    } catch (e) {
      console.warn('Unable to persist products', e);
    }
  }, [products]);

  // 2. Metal Rates (Configurable by Admin, Kolkata Benchmark)
  const [metalRates, setMetalRates] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_metal_rates_kolkata_v1');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.gold24k) return parsed;
      }
      return DEFAULT_RATES;
    } catch (e) {
      return DEFAULT_RATES;
    }
  });

  const updateMetalRates = (newRates, customTimestamp = null) => {
    const updated = {
      ...metalRates,
      ...newRates,
      marketLocation: 'Kolkata, West Bengal',
      lastUpdated: customTimestamp || `${getFormattedCurrentTime()} (Kolkata Market)`
    };
    setMetalRates(updated);
    try {
      localStorage.setItem('mpj_metal_rates_kolkata_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to save metal rates', e);
    }
    showToast('Kolkata live bullion rates updated successfully', 'success');
  };

  const refreshMetalRatesTimestamp = () => {
    const updated = {
      ...metalRates,
      lastUpdated: `${getFormattedCurrentTime()} (Kolkata Live)`
    };
    setMetalRates(updated);
    try {
      localStorage.setItem('mpj_metal_rates_kolkata_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to save metal rates', e);
    }
    showToast('Kolkata bullion rates synchronized with live exchange', 'info');
  };

  // 3. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_cart_items');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mpj_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.warn('Unable to persist cart', e);
    }
  }, [cart]);

  // 4. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_wishlist_ids');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return ['mpj-nkl-01', 'mpj-rng-01'];
    } catch (e) {
      return ['mpj-nkl-01', 'mpj-rng-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mpj_wishlist_ids', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Unable to persist wishlist', e);
    }
  }, [wishlist]);

  // 5. Orders Database (Real Store & Online Orders Only)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_real_store_orders_v1');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any legacy mock order IDs
          return parsed.filter(o => o.id !== 'MPJ-ORD-8821' && o.id !== 'MPJ-ORD-7714' && !o.customerEmail?.includes('example.com'));
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mpj_real_store_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.warn('Unable to persist real orders', e);
    }
  }, [orders]);

  // 6. Navigation and Filter State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPurity, setSelectedPurity] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(1000000);

  // 7. Modal Controls
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // overview, products, orders, customers, rates

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to bag!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Apply Coupon
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FESTIVE10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon('FESTIVE10');
      setCouponDiscount(discount);
      showToast('Coupon FESTIVE10 applied (10% OFF)!', 'success');
      return true;
    } else if (clean === 'MAHAPRABHU') {
      const discount = 2500;
      setAppliedCoupon('MAHAPRABHU');
      setCouponDiscount(discount);
      showToast('Special ₹2,500 Store discount applied!', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try FESTIVE10 or MAHAPRABHU', 'error');
      return false;
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalMakingCharges = cart.reduce((sum, item) => sum + (item.product.makingCharge || 0) * item.quantity, 0);
  const gstTax = Math.round(cartSubtotal * 0.03); // 3% GST on jewellery in India
  const cartFinalTotal = Math.max(0, cartSubtotal + gstTax - couponDiscount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Place Order
  const placeOrder = (orderData) => {
    const orderId = `MPJ-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      ...orderData,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      paymentStatus: 'Paid',
      trackingNumber: `MPJ-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Admin Product Operations
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: `mpj-${newProduct.category.slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      price: Number(newProduct.price),
      grossWeight: Number(newProduct.grossWeight || 0),
      netWeight: Number(newProduct.netWeight || 0),
      makingCharge: Number(newProduct.makingCharge || 0),
      stock: Number(newProduct.stock || 1),
      rating: 5.0,
      reviewsCount: 1,
      images: newProduct.images?.length ? newProduct.images : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80']
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Added "${product.name}" to catalog!`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const resetToInitialProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('mpj_products_catalog_v2', JSON.stringify(INITIAL_PRODUCTS));
    showToast('Catalog restored to default showroom collection', 'success');
  };

  // Admin Order Operations
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order #${orderId} marked as "${newStatus}"`, 'success');
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    showToast(`Order #${orderId} deleted`, 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        metalRates,
        updateMetalRates,
        refreshMetalRatesTimestamp,
        getFormattedCurrentTime,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        totalMakingCharges,
        gstTax,
        couponDiscount,
        appliedCoupon,
        applyCoupon,
        cartFinalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToInitialProducts,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedPurity,
        setSelectedPurity,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        selectedProductModal,
        setSelectedProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        isProfileOpen,
        setIsProfileOpen,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        activeAdminTab,
        setActiveAdminTab,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
