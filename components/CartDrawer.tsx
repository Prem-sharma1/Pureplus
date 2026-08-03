'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { resolveImagePath } from '@/lib/imageUtils';
import { calculateCartTotals } from '@/lib/comboPricing';

interface CartItem {
  id: number;
  product_name: string;
  product_price: string;
  weight: string;
  quantity: number;
  brief_details?: string;
  image1?: string;
  product_category?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const getCategoryBadge = (name: string, category?: string): string => {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();
  if (n.includes('shampoo') || c.includes('shampoo')) return 'SOLID SHAMPOO BARS';
  if (n.includes('soap') || c.includes('soaps')) return 'HANDCRAFTED SOAPS';
  if (n.includes('powder') || n.includes('pack') || n.includes('facewash') || c.includes('powders')) return 'PREMIX POWDERS';
  if (n.includes('kesh') || n.includes('oil')) return 'AYURVEDIC OILS';
  return 'WELLNESS CARE';
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  // Form State
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');

  // Sync cart items with localStorage
  const loadCart = () => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCart();
      try {
        const userStored = localStorage.getItem('user');
        if (userStored) {
          const userObj = JSON.parse(userStored);
          setShippingName(userObj.name || '');
          setShippingEmail(userObj.email || '');
        }
      } catch (err) {
        console.error(err);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowShippingForm(false);
    }

    const handleStorageChange = () => {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isOpen]);

  const updateQuantity = (id: number, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calculate Tier Combo Savings & Subtotals using lib/comboPricing
  const {
    standardSubtotal: subtotal,
    totalAmount,
    comboSavings: comboDiscount,
    nextTierMessage,
    nonOilCount,
    hasFreeGift,
    freeGiftCount,
  } = calculateCartTotals(cartItems);
  
  // Shipping is ALWAYS FREE
  const shippingFee = 0;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    const resScript = await loadRazorpayScript();
    if (!resScript) {
      alert('Failed to load Razorpay SDK. Please check internet connectivity.');
      setCheckoutLoading(false);
      return;
    }

    try {
      const resOrder = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await resOrder.json();

      if (!orderData.success) {
        alert(orderData.error || 'Failed to initiate checkout.');
        setCheckoutLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_id_here',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Pureplush',
        description: 'Apothecary Wellness Purchase',
        image: '/Pureplus.png',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const resVerify = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer_name: shippingName,
                customer_email: shippingEmail,
                customer_phone: shippingPhone,
                shipping_address: `${shippingAddress}, Pincode: ${shippingPincode}`,
                items: cartItems,
                amount: totalAmount
              }),
            });

            const verifyData = await resVerify.json();

            if (verifyData.success) {
              alert(`Payment successful! 🎉 Order #${verifyData.orderNumber} confirmed.`);
              localStorage.removeItem('cart');
              setCartItems([]);
              window.dispatchEvent(new Event('storage'));
              setShowShippingForm(false);
              onClose();
            } else {
              alert(verifyData.error || 'Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            alert('Failed to verify payment signature.');
          }
        },
        prefill: {
          name: shippingName,
          email: shippingEmail,
          contact: shippingPhone,
        },
        theme: {
          color: '#0c5b18',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout initialization.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Expanded Cart Drawer Panel: Wider desktop width up to 680px */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[60vw] lg:w-[650px] max-w-[700px] bg-white border-l border-gray-200 shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Top Header & Stepper */}
            <div className="bg-white flex-shrink-0 border-b border-gray-100">
              <div className="p-3.5 sm:p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-800">Your Cart</h2>
                  <span className="bg-sky-50 text-sky-600 border border-sky-200/60 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-gray-400 hover:text-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stepper Navigation: (1) CART ------ (2) SHIPPING */}
              <div className="flex items-center justify-center space-x-4 py-2 text-xs font-bold tracking-wider select-none bg-gray-50/50">
                <div className={`flex items-center space-x-2 ${!showShippingForm ? 'text-slate-800' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${!showShippingForm ? 'bg-forest text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </span>
                  <span>CART</span>
                </div>
                <div className={`w-12 sm:w-16 h-[2px] rounded-full transition-colors ${showShippingForm ? 'bg-forest' : 'bg-gray-200'}`} />
                <div className={`flex items-center space-x-2 ${showShippingForm ? 'text-slate-800' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${showShippingForm ? 'bg-forest text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </span>
                  <span>SHIPPING</span>
                </div>
              </div>

              {/* Build Your Own Wellness Combo Tier Banner */}
              {cartItems.length > 0 && (
                <div className="bg-gradient-to-r from-forest/10 via-amber-500/10 to-forest/10 p-2.5 sm:p-3 border-t border-forest/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-forest flex items-center space-x-1">
                      <span>🌿</span>
                      <span>Build Your Own Wellness Combo</span>
                    </span>
                    {hasFreeGift && (
                      <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                        Free Herbal Soap Gift
                      </span>
                    )}
                  </div>

                  {/* Tier Pills */}
                  <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold">
                    <div className={`p-1 rounded ${nonOilCount === 1 ? 'bg-forest text-white shadow-2xs' : 'bg-white/80 text-forest border border-forest/15'}`}>
                      1 Pack: ₹289
                    </div>
                    <div className={`p-1 rounded ${nonOilCount === 2 ? 'bg-forest text-white shadow-2xs' : 'bg-white/80 text-forest border border-forest/15'}`}>
                      Pack of 2: ₹545
                    </div>
                    <div className={`p-1 rounded ${nonOilCount === 3 ? 'bg-forest text-white shadow-2xs' : 'bg-white/80 text-forest border border-forest/15'}`}>
                      Pack of 3: ₹789
                    </div>
                    <div className={`p-1 rounded ${nonOilCount >= 4 && nonOilCount % 4 === 0 ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white/80 text-forest border border-forest/15'}`}>
                      Pack of 4: ₹995
                    </div>
                  </div>

                  {nextTierMessage && (
                    <p className="text-[11px] font-bold text-amber-900 text-center animate-pulse pt-0.5">
                      {nextTierMessage}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Scrollable Products List Container (EXPANDS MAXIMUM VERTICAL SPACE) */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-2.5 custom-scrollbar bg-gray-50/30">
              {showShippingForm ? (
                /* Step 2: Shipping Form */
                <div className="space-y-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-serif text-base font-bold text-forest border-b border-gray-100 pb-2">
                    Shipping &amp; Delivery Details
                  </h3>
                  <div className="space-y-3 text-xs text-charcoal">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-forest text-sm font-medium"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-slate-700">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-forest text-sm font-medium"
                          placeholder="10-digit mobile"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-slate-700">Pincode *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={shippingPincode}
                          onChange={(e) => setShippingPincode(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-forest text-sm font-medium"
                          placeholder="6-digit pincode"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-forest text-sm font-medium"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-slate-700">Shipping Address *</label>
                      <textarea
                        rows={3}
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-forest text-sm font-medium resize-none leading-relaxed"
                        placeholder="House No, Building, Street, Area, City, State"
                      />
                    </div>
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart View */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-800">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Explore handcrafted soaps, shampoo bars, and botanical face packs.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-forest text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-forest-light transition-colors shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                /* High-Density Compact Item Cards */
                <div className="space-y-2 sm:space-y-2.5">
                  {/* Free Gift Card */}
                  {hasFreeGift && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 border border-amber-200/90 shadow-2xs flex items-center space-x-3">
                      <div className="w-13 h-13 bg-white rounded-lg overflow-hidden border border-amber-200 flex-shrink-0 relative flex items-center justify-center text-2xl shadow-inner">
                        🌸
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                            FREE GIFT
                          </span>
                          <span className="text-[10px] text-amber-900 font-bold">Order Special</span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-amber-950 font-serif truncate mt-0.5">
                          {freeGiftCount > 1 ? `${freeGiftCount}x ` : ''}Free Handcrafted Herbal Soap Bar{freeGiftCount > 1 ? 's' : ''}
                        </h4>
                        <p className="text-[10px] text-amber-800/90 truncate font-medium">
                          Automatically included with your order
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="line-through text-[10px] text-gray-400 block">Rs. 199</span>
                        <span className="font-black text-xs text-emerald-600 uppercase tracking-wider">FREE</span>
                      </div>
                    </div>
                  )}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 sm:p-3 rounded-xl bg-white border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all flex items-center space-x-3"
                    >
                      {/* Product Image Thumbnail */}
                      <div className="w-14 h-14 bg-cream rounded-lg overflow-hidden border border-gray-200/60 flex-shrink-0 relative">
                        {item.image1 ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={resolveImagePath(item.image1)}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                      </div>

                      {/* Main Details */}
                      <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                        {/* Inline Badges */}
                        <div className="flex items-center space-x-1.5 mb-0.5">
                          <span className="bg-sky-50 text-sky-600 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border border-sky-100">
                            {getCategoryBadge(item.product_name, item.product_category)}
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-200/70">
                            {item.weight || '100g'}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-800 truncate leading-snug">
                          {item.product_name.replace(/^Pureplush\s+/i, '')}
                        </h4>

                        {/* Controls & Price Inline */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="inline-flex items-center border border-gray-200 rounded-full bg-gray-50/80 px-2 py-0.5 space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-gray-500 hover:text-slate-800 text-xs font-bold px-1 active:scale-95 transition-transform"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-slate-800 min-w-[10px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-gray-500 hover:text-slate-800 text-xs font-bold px-1 active:scale-95 transition-transform"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-serif text-xs sm:text-sm font-bold text-slate-900">
                            Rs. {(parseFloat(item.product_price) * item.quantity).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Trash Icon */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-colors flex-shrink-0 self-start"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compact Bottom Summary Footer */}
            {cartItems.length > 0 && (
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white space-y-2 shadow-lg flex-shrink-0">
                {/* 1. Free Herbal Soap Banner */}
                {hasFreeGift && (
                  <div className="bg-[#FFF8F0] border border-[#FFE4C4] rounded-lg p-2 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#8A4B08]">
                      <span className="text-sm">🌸</span>
                      <span>{freeGiftCount}x Premium Herbal Soap Included</span>
                    </div>
                    <span className="bg-[#00A859] text-white font-black text-[9px] uppercase px-2 py-0.5 rounded tracking-wider shadow-sm flex-shrink-0">
                      FREE GIFT
                    </span>
                  </div>
                )}

                {/* 2. Itemized Breakdown List */}
                <div className="max-h-20 overflow-y-auto space-y-0.5 border-b border-gray-100 pb-1.5 custom-scrollbar text-xs">
                  {cartItems.map((i) => (
                    <div key={`summary-${i.id}`} className="flex justify-between text-[11px] sm:text-xs text-gray-600 font-medium">
                      <span className="truncate pr-2">
                        {i.product_name.replace(/^Pureplush\s+/i, '')}{' '}
                        <span className="text-gray-400 font-normal">({i.weight || '100g'}{i.quantity > 1 ? ` x${i.quantity}` : ''})</span>
                      </span>
                      <span className="font-semibold text-slate-800 flex-shrink-0">
                        Rs. {(parseFloat(i.product_price) * i.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
                  
                  {comboDiscount > 0 && (
                    <div className="flex justify-between text-[11px] sm:text-xs text-emerald-600 font-bold pt-0.5">
                      <span>Combo Bundle Discount</span>
                      <span>- Rs. {comboDiscount.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[11px] sm:text-xs text-gray-600 font-medium pt-0.5">
                    <span>Shipping &amp; Handling</span>
                    <span className="font-bold text-emerald-600 uppercase tracking-wider">
                      FREE
                    </span>
                  </div>
                </div>

                {/* 3. TOTAL AMOUNT Row */}
                <div className="flex justify-between items-center py-0.5">
                  <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    TOTAL AMOUNT
                  </span>
                  <span className="font-serif text-base sm:text-xl font-extrabold text-slate-900">
                    Rs. {totalAmount.toFixed(0)}
                  </span>
                </div>

                {/* 4. Action CTA Button */}
                {showShippingForm ? (
                  <div className="space-y-1.5">
                    <button
                      onClick={handleCheckout}
                      disabled={checkoutLoading || !shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingPincode}
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-forest hover:bg-forest-light text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 group disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {checkoutLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <>
                          <span>PAY WITH RAZORPAY</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowShippingForm(false)}
                      className="w-full text-center text-xs font-bold uppercase tracking-wider text-forest hover:underline pt-0.5"
                    >
                      ← Back to Cart Items
                    </button>
                  </div>
                ) : (
                <a
                  href="/checkout"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 sm:py-3.5 bg-forest hover:bg-forest-light text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                )}

                {/* 5. Security Footer */}
                <div className="pt-0.5 text-center text-[10px] text-gray-500 font-medium flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Payment</span>
                  <span>•</span>
                  <span>Free Nationwide Delivery</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
