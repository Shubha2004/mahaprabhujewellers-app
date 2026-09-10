import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import logoImg from '../../assets/logo.jpg';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Building2, 
  Printer, 
  ArrowRight,
  Crown,
  Lock
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    gstTax, 
    couponDiscount, 
    cartFinalTotal,
    placeOrder 
  } = useStore();

  const { currentUser, recordCustomerOrder } = useAuth();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [completedOrder, setCompletedOrder] = useState(null);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || 'Tarakeshwar',
    state: currentUser?.state || 'West Bengal',
    pincode: currentUser?.pincode || '712410',
    paymentMethod: 'UPI (GPay / PhonePe)'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill all required delivery details.');
      return;
    }
    setStep(2);
  };

  const handleCompleteOrder = () => {
    const orderPayload = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      paymentMethod: formData.paymentMethod,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        karat: item.product.karat,
        grossWeight: item.product.grossWeight,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      subtotal: cartSubtotal,
      taxGst: gstTax,
      discount: couponDiscount,
      totalAmount: cartFinalTotal
    };

    const newOrder = placeOrder(orderPayload);
    setCompletedOrder(newOrder);
    if (recordCustomerOrder) {
      recordCustomerOrder(orderPayload, cartFinalTotal);
    }
    setStep(3);

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFD700', '#B8860B', '#0F172A', '#10B981']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gold-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/50 bg-white p-0.5 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Maha Prabhu Jewellers" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-slate-900">
                {step === 3 ? 'Order Confirmed' : 'Maha Prabhu Jewellers Secure Checkout'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {step === 1 && 'Step 1 of 2: Insured Delivery Address'}
                {step === 2 && 'Step 2 of 2: Select Payment Method'}
                {step === 3 && `Order ID: #${completedOrder?.id}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          
          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Recipient Name"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone (for OTP & Delivery) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 97752 19356"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (for Invoice & Hallmark Certificate) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="recipient@example.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Street Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat/House No, Building, Landmark, Street"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 400050"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Order summary mini-strip */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Items ({cart.length}) Total: </span>
                  <strong className="text-slate-900 font-bold">₹{cartFinalTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free Insured Transit</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="text-xs text-slate-600 font-medium">
                Choose your preferred payment method. All transactions are 100% encrypted & certified.
              </p>

              <div className="space-y-3">
                {/* UPI Option */}
                <label 
                  onClick={() => setFormData({ ...formData, paymentMethod: 'UPI (GPay / PhonePe / Paytm)' })}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod.includes('UPI')
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod.includes('UPI')}
                    onChange={() => {}}
                    className="accent-amber-600"
                  />
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-900">Instant UPI / QR Code</h4>
                    <p className="text-[11px] text-slate-500">Google Pay, PhonePe, BHIM, Paytm UPI</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Instant Approval
                  </span>
                </label>

                {/* Credit / Debit Cards */}
                <label 
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Credit / Debit Card' })}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'Credit / Debit Card'
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'Credit / Debit Card'}
                    onChange={() => {}}
                    className="accent-amber-600"
                  />
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-900">Credit or Debit Card</h4>
                    <p className="text-[11px] text-slate-500">Visa, MasterCard, RuPay, Amex</p>
                  </div>
                </label>

                {/* Net Banking */}
                <label 
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Net Banking' })}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'Net Banking'
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'Net Banking'}
                    onChange={() => {}}
                    className="accent-amber-600"
                  />
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-900">Internet Banking</h4>
                    <p className="text-[11px] text-slate-500">SBI, HDFC, ICICI, Axis, Kotak & 50+ Banks</p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label 
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery (Showroom Verified)' })}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod.includes('Cash on Delivery')
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod.includes('Cash on Delivery')}
                    onChange={() => {}}
                    className="accent-amber-600"
                  />
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-900">Showroom Insured COD</h4>
                    <p className="text-[11px] text-slate-500">Pay cash/card to courier agent upon inspection</p>
                  </div>
                </label>
              </div>

              {/* Total Summary */}
              <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-900 block font-medium">Payable Amount:</span>
                  <strong className="font-serif text-xl font-bold text-slate-950">
                    ₹{cartFinalTotal.toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <span>Includes 3% GST & Making</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  ← Back to Address
                </button>

                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-all shadow-gold-glow flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm & Authorize Order</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation & Receipt */}
          {step === 3 && completedOrder && (
            <div className="space-y-6">
              
              {/* Success Banner */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you for shopping at <strong>Maha Prabhu Jewellers</strong>. Your hallmarked jewellery is being prepared for insured courier dispatch.
                </p>
              </div>

              {/* Printable Invoice Card */}
              <div id="printable-invoice" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-500/50 bg-white p-0.5 flex items-center justify-center shrink-0">
                      <img src={logoImg} alt="Maha Prabhu Jewellers Logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-base text-slate-900 block leading-tight">MAHA PRABHU JEWELLERS</span>
                      <p className="text-[10px] text-amber-700 font-serif">মহা প্রভু জুয়েলার্স • BIS Hallmarked Showroom</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">
                        Near Ramnagar High school, Ramnagar Tarakeshwar Road, WB 712410 | Ph: +91 9775219356, 9382924457
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">{completedOrder.id}</span>
                    <p className="text-[10px] text-slate-400">Date: {completedOrder.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Customer</span>
                    <strong className="text-slate-800">{completedOrder.customerName}</strong>
                    <p>{completedOrder.customerPhone}</p>
                    <p>{completedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Shipping To</span>
                    <p className="text-slate-800">{completedOrder.shippingAddress}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      Tracking: {completedOrder.trackingNumber}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="border-t border-slate-200 pt-3">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-2">Purchased Items</span>
                  <div className="space-y-2">
                    {completedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200/50">
                        <div>
                          <p className="font-semibold text-slate-800">{item.name}</p>
                          <span className="text-[10px] text-slate-500">{item.karat} • {item.quantity} unit(s)</span>
                        </div>
                        <span className="font-bold text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financials */}
                <div className="border-t border-slate-200 pt-2 space-y-1 text-slate-600 text-right">
                  <div>Subtotal: ₹{completedOrder.subtotal.toLocaleString('en-IN')}</div>
                  <div>GST (3%): +₹{completedOrder.taxGst.toLocaleString('en-IN')}</div>
                  {completedOrder.discount > 0 && (
                    <div className="text-emerald-700">Festival Discount: -₹{completedOrder.discount.toLocaleString('en-IN')}</div>
                  )}
                  <div className="text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                    Grand Total Paid: ₹{completedOrder.totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrintInvoice}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Tax Invoice / Receipt</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Continue Browsing Showroom
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
