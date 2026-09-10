import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { handleImageError } from '../../utils/imageFallback';
import logoImg from '../../assets/logo.jpg';
import { 
  Package, 
  Search, 
  Eye, 
  Truck, 
  CheckCircle2, 
  Clock, 
  X, 
  Printer, 
  Trash2,
  Filter,
  PlusCircle,
  Check
} from 'lucide-react';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder, showToast, products, placeOrder } = useStore();
  const { recordCustomerOrder } = useAuth();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

  const [newOrderForm, setNewOrderForm] = useState({
    productId: products[0]?.id || '',
    quantity: 1,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    shippingAddress: 'Near Ramnagar High school, Tarakeshwar, WB 712410',
    paymentMethod: 'Cash (Showroom Counter)'
  });

  const handleInStoreOrderSubmit = (e) => {
    e.preventDefault();
    if (!newOrderForm.customerName.trim() || !newOrderForm.customerPhone.trim()) {
      alert('Please provide customer name and phone number.');
      return;
    }

    const selProduct = products.find(p => p.id === newOrderForm.productId) || products[0];
    if (!selProduct) {
      alert('Please select a product.');
      return;
    }

    const qty = parseInt(newOrderForm.quantity) || 1;
    const subtotal = selProduct.price * qty;
    const taxGst = Math.round(subtotal * 0.03);
    const totalAmount = subtotal + taxGst;

    const orderPayload = {
      customerName: newOrderForm.customerName.trim(),
      customerEmail: newOrderForm.customerEmail.trim() || `${newOrderForm.customerPhone.replace(/\D/g, '')}@store.mahaprabhujewellers.com`,
      customerPhone: newOrderForm.customerPhone.trim(),
      shippingAddress: newOrderForm.shippingAddress.trim(),
      paymentMethod: newOrderForm.paymentMethod,
      items: [
        {
          id: selProduct.id,
          name: selProduct.name,
          karat: selProduct.karat,
          grossWeight: selProduct.grossWeight,
          price: selProduct.price,
          quantity: qty,
          image: selProduct.images[0]
        }
      ],
      subtotal,
      taxGst,
      discount: 0,
      totalAmount,
      status: 'Delivered' // Counter sales are instantly handed over
    };

    const created = placeOrder(orderPayload);
    if (recordCustomerOrder) {
      recordCustomerOrder(orderPayload, totalAmount);
    }
    showToast(`In-store order #${created.id} recorded successfully!`, 'success');
    setIsCreateOrderOpen(false);
    setSelectedInvoiceOrder(created); // Automatically offer invoice print
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = !searchTerm || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700';
      case 'In Transit':
      case 'Shipped':
        return 'bg-blue-950 text-blue-300 border-blue-700';
      case 'Processing':
      case 'Confirmed':
        return 'bg-amber-950 text-amber-300 border-amber-700';
      case 'Cancelled':
        return 'bg-rose-950 text-rose-300 border-rose-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Real Customer Orders & Showroom Fulfillment
          </h3>
          <p className="text-xs text-slate-400">
            Real orders placed online by buyers and in-store counter purchases with hallmarked invoice receipts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Total Orders: </span>
            <span className="text-xs font-bold text-amber-400">{orders.length}</span>
          </div>

          <button
            onClick={() => setIsCreateOrderOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create In-Store Order</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between">
        
        {/* Status filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {['all', 'Confirmed', 'In Transit', 'Delivered', 'Cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID or Customer..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-600">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-slate-200">
                No Real Customer Orders Recorded Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Only genuine customer orders placed online or in-store counter sales will appear here. All demo orders have been removed for real store operation.
              </p>
            </div>
            <button
              onClick={() => setIsCreateOrderOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record In-Store Counter Sale</span>
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px] uppercase">
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Purchased Items</th>
                    <th className="py-3 px-4">Grand Total</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Order ID & Date */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-amber-400 block">{order.id}</span>
                        <span className="text-[10px] text-slate-500">{order.date}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {order.trackingNumber}
                        </span>
                      </td>

                      {/* Customer Details */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-white">{order.customerName}</p>
                        <p className="text-[11px] text-slate-400">{order.customerPhone}</p>
                        <p className="text-[10px] text-slate-500 truncate max-w-xs">{order.shippingAddress}</p>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          {order.items.map((it, i) => (
                            <div key={i} className="flex items-center gap-2">
                              {it.image && (
                                <img src={it.image} alt={it.name} onError={handleImageError} className="w-6 h-6 rounded object-cover" />
                              )}
                              <span className="truncate max-w-[180px] text-slate-300">
                                {it.name} (x{it.quantity})
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-amber-400 text-sm block">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400 capitalize">
                          {order.paymentMethod}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-semibold focus:outline-none cursor-pointer ${getStatusBadgeClass(order.status)}`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors"
                            title="View / Print Tax Invoice"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete order #${order.id}?`)) {
                                deleteOrder(order.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No orders match the selected status or search term.
              </div>
            )}
          </>
        )}
      </div>

      {/* INVOICE INSPECTION MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-2xl border border-gold-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-slate-900">
                  Tax Invoice & Consignment Details
                </h4>
                <p className="text-xs text-amber-700 font-serif">Maha Prabhu Jewellers Official Record</p>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Consignee</span>
                  <strong className="text-slate-800">{selectedInvoiceOrder.customerName}</strong>
                  <p className="text-slate-600">{selectedInvoiceOrder.customerPhone}</p>
                  <p className="text-slate-600">{selectedInvoiceOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Consignment Info</span>
                  <p>Order ID: <strong className="font-mono text-slate-900">{selectedInvoiceOrder.id}</strong></p>
                  <p>Courier Tracking: <strong className="font-mono text-slate-900">{selectedInvoiceOrder.trackingNumber}</strong></p>
                  <p>Payment: <strong className="text-emerald-700">{selectedInvoiceOrder.paymentMethod} (PAID)</strong></p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Purchased Pieces</span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {selectedInvoiceOrder.items.map((item, i) => (
                    <div key={i} className="p-2.5 flex justify-between items-center bg-white text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <span className="text-[10px] text-slate-500">{item.karat} • Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 space-y-1 text-right">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{selectedInvoiceOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (3%)</span>
                  <span>+₹{selectedInvoiceOrder.taxGst.toLocaleString('en-IN')}</span>
                </div>
                {selectedInvoiceOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-₹{selectedInvoiceOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-slate-950 pt-1 border-t border-amber-200">
                  <span>Grand Total Paid</span>
                  <span>₹{selectedInvoiceOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE IN-STORE ORDER MODAL */}
      {isCreateOrderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-amber-400">
                  Record In-Store Counter Sale
                </h4>
                <p className="text-xs text-slate-400">
                  Instantly issue hallmarked tax invoice & record customer in showroom database
                </p>
              </div>
              <button
                onClick={() => setIsCreateOrderOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInStoreOrderSubmit} className="space-y-4 text-xs">
              {/* Select Product */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Jewellery Piece *</label>
                <select
                  value={newOrderForm.productId}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, productId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.karat}) - ₹{p.price.toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newOrderForm.quantity}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    value={newOrderForm.customerName}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, customerName: e.target.value })}
                    placeholder="e.g. Subhendu Ghosh"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mobile / Phone Number *</label>
                  <input
                    type="tel"
                    value={newOrderForm.customerPhone}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, customerPhone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Email (Optional)</label>
                <input
                  type="email"
                  value={newOrderForm.customerEmail}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, customerEmail: e.target.value })}
                  placeholder="Optional, for digital receipt dispatch"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Showroom Counter / Address */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Billing / Delivery Address</label>
                <input
                  type="text"
                  value={newOrderForm.shippingAddress}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, shippingAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Counter Payment Mode</label>
                <select
                  value={newOrderForm.paymentMethod}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Cash (Showroom Counter)">Cash (Showroom Counter)</option>
                  <option value="UPI / QR Code Scan">UPI / QR Code Scan (GooglePay / PhonePe / Paytm)</option>
                  <option value="Card (POS Machine)">Credit / Debit Card (Showroom POS)</option>
                  <option value="Bank IMPS / NEFT">Bank IMPS / NEFT Transfer</option>
                </select>
              </div>

              {/* Live Price Calculation Summary */}
              {(() => {
                const prod = products.find(p => p.id === newOrderForm.productId) || products[0];
                const qty = parseInt(newOrderForm.quantity) || 1;
                const price = prod ? prod.price : 0;
                const sub = price * qty;
                const gst = Math.round(sub * 0.03);
                const tot = sub + gst;
                return (
                  <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Base Rate ({qty} unit{qty > 1 ? 's' : ''}):</span>
                      <span>₹{sub.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>GST (3%):</span>
                      <span>+₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-amber-400 border-t border-slate-800 pt-1 text-sm">
                      <span>Total Invoice Amount:</span>
                      <span>₹{tot.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOrderOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-gold-glow flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Sale & Print Tax Bill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
