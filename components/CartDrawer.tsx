'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface CartItem {
  id: number;
  product_name: string;
  product_price: string;
  weight: string;
  quantity: number;
  brief_details?: string;
  image1?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_LIMIT = 499;

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync authentication state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setIsLoggedIn(!!localStorage.getItem('user'));
    }
  }, [isOpen]);

  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');

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
      alert('Failed to load Razorpay payment SDK. Please check your internet connection.');
      setCheckoutLoading(false);
      return;
    }

    const totalAmount = subtotal + (subtotal >= FREE_SHIPPING_LIMIT ? 0 : 50);

    try {
      const resOrder = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await resOrder.json();

      if (!orderData.success) {
        alert(orderData.error || 'Failed to initiate transaction. Please make sure Razorpay keys are configured.');
        setCheckoutLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_id_here',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Pureplush',
        description: 'Apothecary Collection Purchase',
        image: '/uploads/Artboard 1.png',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const resVerify = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer_name: shippingName,
                customer_email: shippingEmail,
                customer_phone: shippingPhone,
                shipping_address: `${shippingAddress}, Pincode: ${shippingPincode}`,
                items: cartItems.map(item => ({
                  id: item.id,
                  product_name: item.product_name,
                  product_price: item.product_price,
                  weight: item.weight,
                  quantity: item.quantity
                })),
                amount: totalAmount
              }),
            });

            const verifyData = await resVerify.json();

            if (verifyData.success) {
              alert(`Payment successful! 🎉 Order #${verifyData.orderNumber} placed. Assigned Courier: ${verifyData.courierPartner}. Tracking ID: ${verifyData.trackingNumber}`);
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
          color: '#2d5a27',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Checkout initialization error:', error);
      alert('An error occurred during checkout initialization.');
    } finally {
      setCheckoutLoading(false);
    }
  };

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
    // Trigger custom storage event to update the Navbar counter
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.product_price) * item.quantity, 0);
  };

  const subtotal = getSubtotal();
  const amountToFreeShipping = FREE_SHIPPING_LIMIT - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm cursor-pointer"
          />

          {/* Cart Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-cream-light border-l border-forest/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-forest/10 flex items-center justify-between bg-cream">
              <div className="flex items-center space-x-2.5">
                <ShoppingCart className="w-5 h-5 text-forest" />
                <span className="font-serif text-lg font-bold text-forest">Your Shopping Cart</span>
                <span className="bg-forest/5 text-forest text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-charcoal hover:bg-forest/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator (Best Cart Functionality) */}
            {cartItems.length > 0 && (
              <div className="bg-cream/40 border-b border-forest/5 px-6 py-4 space-y-2">
                {amountToFreeShipping > 0 ? (
                  <p className="text-xs text-charcoal/80 font-medium">
                    Add <span className="font-bold text-forest">₹{amountToFreeShipping.toFixed(0)}</span> more to unlock <span className="font-bold uppercase tracking-wider text-forest">Free Shipping</span>!
                  </p>
                ) : (
                  <p className="text-xs text-green-800 font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-700 animate-bounce" />
                    <span>🎉 Congratulations! You have unlocked FREE Shipping!</span>
                  </p>
                )}
                {/* Progress bar container */}
                <div className="w-full h-2 bg-forest/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List or Shipping Form */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {showShippingForm ? (
                <div className="space-y-5">
                  <h3 className="font-serif text-base font-bold text-forest border-b border-forest/10 pb-2">
                    Shipping & Contact Information
                  </h3>
                  <div className="space-y-4 text-xs text-charcoal">
                    <div>
                      <label className="block font-semibold mb-1.5 text-forest/85">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingName} 
                        onChange={e => setShippingName(e.target.value)} 
                        className="w-full border border-forest/15 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-forest text-xs font-medium" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5 text-forest/85">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={shippingEmail} 
                        onChange={e => setShippingEmail(e.target.value)} 
                        className="w-full border border-forest/15 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-forest text-xs font-medium" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5 text-forest/85">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={shippingPhone} 
                        onChange={e => setShippingPhone(e.target.value)} 
                        className="w-full border border-forest/15 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-forest text-xs font-medium" 
                        placeholder="9876543210" 
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5 text-forest/85">Shipping Address</label>
                      <textarea 
                        rows={3} 
                        required 
                        value={shippingAddress} 
                        onChange={e => setShippingAddress(e.target.value)} 
                        className="w-full border border-forest/15 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-forest text-xs font-medium resize-none leading-relaxed" 
                        placeholder="Flat/House No., Building Name, Street, Landmark..." 
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5 text-forest/85">Pincode</label>
                      <input 
                        type="text" 
                        required 
                        maxLength={6}
                        value={shippingPincode} 
                        onChange={e => setShippingPincode(e.target.value)} 
                        className="w-full border border-forest/15 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-forest text-xs font-medium" 
                        placeholder="600001" 
                      />
                    </div>
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-forest/5 flex items-center justify-center text-forest/45">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-forest">Your cart is empty</h3>
                  <p className="text-xs text-charcoal/60 max-w-[220px]">
                    Looks like you haven&apos;t added any wellness blends yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-forest text-cream text-xs font-bold uppercase tracking-wider rounded-full hover:bg-forest-light transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between space-x-4 p-4 rounded-xl bg-white border border-forest/5 shadow-sm group hover:border-forest/15 transition-all"
                  >
                    {/* Item Image with Fallback */}
                    <div className="w-16 h-16 bg-cream rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-forest/5">
                      {item.image1 ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.image1.startsWith('uploads/') ? `/${item.image1}` : `/uploads/${item.image1}`}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <span className="text-xl absolute">🌱</span>
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-bold text-forest truncate">{item.product_name.replace(/^Pureplush\s+/i, '')}</h4>
                      {item.brief_details && (
                        <p className="text-[10px] text-charcoal/60 line-clamp-1 mt-0.5 leading-snug">
                          {item.brief_details}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[9px] text-sage-dark font-bold bg-forest/5 rounded px-1.5 py-0.5">
                          {item.weight}
                        </span>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center space-x-2 mt-2.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 border border-forest/10 hover:border-forest/30 rounded-md text-charcoal hover:bg-forest/5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-forest px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 border border-forest/10 hover:border-forest/30 rounded-md text-charcoal hover:bg-forest/5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price and delete */}
                    <div className="flex flex-col items-end justify-between h-16">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-charcoal/30 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-serif font-bold text-forest leading-none">
                        ₹{(parseFloat(item.product_price) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-forest/10 bg-cream">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs text-charcoal/70">
                    <span>Shipping</span>
                    <span className="text-green-700 font-medium">
                      {subtotal >= FREE_SHIPPING_LIMIT ? 'FREE' : '₹50'}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-serif text-sm font-bold text-forest">Subtotal</span>
                    <span className="font-serif text-xl font-bold text-forest">
                      ₹{(subtotal + (subtotal >= FREE_SHIPPING_LIMIT ? 0 : 50)).toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {showShippingForm ? (
                    <>
                      <button
                        onClick={handleCheckout}
                        disabled={checkoutLoading || !shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingPincode}
                        className="w-full inline-flex items-center justify-center space-x-2 py-3.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 group disabled:bg-sage disabled:cursor-not-allowed"
                      >
                        {checkoutLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <>
                            <span>Pay with Razorpay</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowShippingForm(false)}
                        className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-forest/75 hover:text-forest transition-colors"
                      >
                        Back to Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowShippingForm(true)}
                        className="w-full inline-flex items-center justify-center space-x-2 py-3.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 group"
                      >
                        <span>Proceed to Checkout</span>
                        <ShoppingCart className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-forest/75 hover:text-forest transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
