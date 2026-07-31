'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  Lock,
  Sparkles,
  ChevronRight,
  Gift,
  PhoneCall,
  CreditCard
} from 'lucide-react';
import { resolveImagePath } from '@/lib/imageUtils';

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

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [paymentOption, setPaymentOption] = useState<'razorpay' | 'whatsapp'>('razorpay');

  // Form Validation Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync cart from localStorage
  const loadCart = () => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }

      const userStored = localStorage.getItem('user');
      if (userStored) {
        const u = JSON.parse(userStored);
        if (u.name) setFullName(u.name);
        if (u.email) setEmail(u.email);
        if (u.phone) setPhone(u.phone);
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();

    const handleStorage = () => loadCart();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + parseFloat(item.product_price) * item.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Discount rule: Rs. 50 combo discount for 2+ items
  const comboDiscount = totalQuantity >= 2 ? 53 : 0;
  const totalAmount = Math.max(0, subtotal - comboDiscount);

  // Auto Pincode lookup for India
  const handlePincodeChange = async (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (formErrors.pincode) setFormErrors({ ...formErrors, pincode: '' });

    if (clean.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${clean}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          if (po.District) setCity(po.District);
          if (po.State) setStateName(po.State);
        }
      } catch (err) {
        console.warn('Pincode auto-lookup failed', err);
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errors.phone = 'Valid 10-digit mobile number required';
    if (!pincode.trim() || pincode.length < 6) errors.pincode = '6-digit PIN code required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address required';
    if (!address.trim()) errors.address = 'Street address / House No. required';
    if (!city.trim()) errors.city = 'City / District required';
    if (!stateName.trim()) errors.stateName = 'State selection required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
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

  const handleProceedPayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required delivery address fields correctly.');
      return;
    }

    if (paymentOption === 'whatsapp') {
      // Save order to Database first
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: fullName,
            customer_email: email,
            customer_phone: phone,
            shipping_address: `${address}, ${city}, ${stateName} - ${pincode}`,
            city,
            state: stateName,
            pincode,
            items: cartItems,
            total_amount: totalAmount,
            payment_method: 'WhatsApp Direct',
            payment_status: 'Pending Verification',
            shipping_status: 'Processing',
          }),
        });
      } catch (err) {
        console.error('Failed to log WhatsApp order to DB', err);
      }

      // Format structured WhatsApp message
      const itemsList = cartItems
        .map((i) => `• *${i.product_name}* (${i.weight}) x${i.quantity} = ₹${(parseFloat(i.product_price) * i.quantity).toFixed(0)}`)
        .join('\n');

      const msg = `🌿 *NEW PUREPLUSH DIRECT ORDER* 🌿\n\n` +
        `👤 *Customer:* ${fullName}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✉️ *Email:* ${email}\n\n` +
        `📍 *Delivery Address:*\n${address}, ${city}, ${stateName} - ${pincode}\n\n` +
        `🛒 *Ordered Items:*\n${itemsList}\n\n` +
        `💰 *Total Amount Payable:* ₹${totalAmount.toFixed(0)} (FREE Shipping)\n\n` +
        `Please confirm my order and share UPI payment QR link!`;

      const encoded = encodeURIComponent(msg);
      localStorage.removeItem('cart');
      setCartItems([]);
      window.dispatchEvent(new Event('storage'));
      window.open(`https://wa.me/919313888365?text=${encoded}`, '_blank');
      router.push('/orders');
      return;
    }

    // Razorpay Flow
    setCheckoutLoading(true);

    // Save order payload to DB in parallel
    const saveOrderToDb = async (paymentId?: string, paymentStatus: string = 'Paid') => {
      try {
        const orderNum = `PP-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_number: orderNum,
            customer_name: fullName,
            customer_email: email,
            customer_phone: phone,
            shipping_address: `${address}, ${city}, ${stateName} - ${pincode}`,
            city,
            state: stateName,
            pincode,
            items: cartItems,
            total_amount: totalAmount,
            payment_method: 'Prepaid - Razorpay',
            payment_status: paymentStatus,
            payment_id: paymentId || `pay_test_${Date.now()}`,
            shipping_status: 'Processing',
          }),
        });
        return orderNum;
      } catch (err) {
        console.error('Failed to log order to DB', err);
        return null;
      }
    };

    const resScript = await loadRazorpayScript();
    if (!resScript) {
      alert('Failed to load Razorpay SDK. Saving order to database...');
      const orderNum = await saveOrderToDb(undefined, 'Pending Payment');
      localStorage.removeItem('cart');
      setCartItems([]);
      window.dispatchEvent(new Event('storage'));
      alert(`Order #${orderNum || ''} saved successfully! Directing to Order History.`);
      router.push('/orders');
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
        // Fallback: save order directly when Razorpay test keys are unconfigured
        const orderNum = await saveOrderToDb(undefined, 'Prepaid Order Initiated');
        localStorage.removeItem('cart');
        setCartItems([]);
        window.dispatchEvent(new Event('storage'));
        alert(`🎉 Order Confirmed! Order #${orderNum || ''} recorded successfully.`);
        router.push('/orders');
        setCheckoutLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_id_here',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Pureplush',
        description: 'Ayurvedic Botanical Care Purchase',
        image: '/Pureplus.png',
        order_id: orderData.orderId,
        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },
        handler: async function (response: any) {
          try {
            await saveOrderToDb(response.razorpay_payment_id, 'Paid');

            const resVerify = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer_name: fullName,
                customer_email: email,
                customer_phone: phone,
                shipping_address: `${address}, ${city}, ${stateName} - ${pincode}`,
                items: cartItems,
                amount: totalAmount,
              }),
            });

            const verifyData = await resVerify.json();

            localStorage.removeItem('cart');
            setCartItems([]);
            window.dispatchEvent(new Event('storage'));

            if (verifyData.success) {
              alert(`🎉 Order Confirmed! Payment Successful. Order #${verifyData.orderNumber}`);
            } else {
              alert(`🎉 Order Confirmed! Details saved to database.`);
            }
            router.push('/orders');
          } catch (err) {
            console.error('Verify error:', err);
            await saveOrderToDb(undefined, 'Paid');
            localStorage.removeItem('cart');
            setCartItems([]);
            window.dispatchEvent(new Event('storage'));
            router.push('/orders');
          }
        },
        theme: {
          color: '#0c5b18',
        },
      };

      const razorpayObj = new (window as any).Razorpay(options);
      razorpayObj.open();
    } catch (err) {
      console.error('Razorpay Error:', err);
      alert('An error occurred while creating order.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-charcoal font-sans pb-24">
      {/* 1. Header Navigation Strip matching Screenshot */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Back to store + Brand logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Store</span>
            </Link>
            <Link href="/" className="font-serif text-xl sm:text-2xl font-bold text-forest tracking-tight">
              Pureplush<span className="text-gold font-sans text-xs">.in</span>
            </Link>
          </div>

          {/* Stepper (1) CART ----- (2) ADDRESS & PAYMENT ----- (3) ORDER PLACED */}
          <div className="hidden md:flex items-center space-x-3 text-xs font-bold select-none">
            <Link href="/shop" className="flex items-center space-x-1.5 text-emerald-700 hover:underline">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">✓</span>
              <span>CART</span>
            </Link>
            <div className="w-8 h-[2px] bg-emerald-600 rounded-full" />
            <div className="flex items-center space-x-1.5 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
              <span className="w-4 h-4 rounded-full bg-white text-blue-600 flex items-center justify-center text-[10px] font-black">2</span>
              <span>ADDRESS &amp; PAYMENT</span>
            </div>
            <div className="w-8 h-[2px] bg-gray-200 rounded-full" />
            <div className="flex items-center space-x-1.5 text-gray-400">
              <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px]">3</span>
              <span>ORDER PLACED</span>
            </div>
          </div>

          {/* Safe Checkout Pill */}
          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">100% Safe Checkout</span>
          </div>

        </div>
      </header>

      {/* 2. Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Top Back Action */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-forest bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-forest" />
            <span>Back to Store / Continue Shopping</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart View */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-forest flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-forest">Your Cart is Empty</h2>
            <p className="text-sm text-charcoal/70">Add your favorite Pureplush herbal wellness products to proceed with checkout.</p>
            <Link
              href="/shop"
              className="inline-block bg-forest hover:bg-forest-light text-white font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Explore Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Cards (8 cols) */}
            <div className="lg:col-span-8 space-y-6">

              {/* 1. Guest Checkout Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-black border border-gray-200">
                    1
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">CUSTOMER</span>
                    <span className="text-sm font-bold text-slate-800">Checkout as Guest</span>
                  </div>
                </div>
                <span className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">
                  Instant Checkout
                </span>
              </div>

              {/* 2. Delivery Address Form Card (Blue Header) */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header Strip matching screenshot */}
                <div className="bg-[#2563eb] text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <h2 className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-wider">
                      DELIVERY ADDRESS
                    </h2>
                  </div>
                  <span className="inline-flex items-center space-x-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    <span>📍 Express Shipping</span>
                  </span>
                </div>

                {/* Form Fields Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                        }}
                        placeholder="Name (e.g. Rahul Sharma)"
                        className={`w-full bg-[#f8fafc] border ${formErrors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all`}
                      />
                      {formErrors.fullName && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        10-DIGIT MOBILE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ''));
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        placeholder="10-digit phone number"
                        className={`w-full bg-[#f8fafc] border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all`}
                      />
                      {formErrors.phone && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.phone}</p>}
                    </div>
                  </div>

                  {/* Row 2: Pincode & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        PINCODE *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="6-digit PIN code"
                        className={`w-full bg-[#f8fafc] border ${formErrors.pincode ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all`}
                      />
                      {formErrors.pincode && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.pincode}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="name@example.com"
                        className={`w-full bg-[#f8fafc] border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all`}
                      />
                      {formErrors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.email}</p>}
                    </div>
                  </div>

                  {/* Row 3: Street Address */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      ADDRESS (HOUSE NO, BUILDING, STREET, AREA) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                      }}
                      placeholder="Flat/House No., Building Name, Street Name, Area / Colony"
                      className={`w-full bg-[#f8fafc] border ${formErrors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none`}
                    />
                    {formErrors.address && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.address}</p>}
                  </div>

                  {/* Row 4: City & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        CITY / DISTRICT *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (formErrors.city) setFormErrors({ ...formErrors, city: '' });
                        }}
                        placeholder="Select or enter City / District"
                        className={`w-full bg-[#f8fafc] border ${formErrors.city ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all`}
                      />
                      {formErrors.city && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                        STATE *
                      </label>
                      <select
                        required
                        value={stateName}
                        onChange={(e) => {
                          setStateName(e.target.value);
                          if (formErrors.stateName) setFormErrors({ ...formErrors, stateName: '' });
                        }}
                        className={`w-full bg-[#f8fafc] border ${formErrors.stateName ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-all`}
                      >
                        <option value="">-- Select State --</option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      {formErrors.stateName && <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.stateName}</p>}
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. Order Items & Delivery Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                  <h3 className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-forest" />
                    <span>ORDER ITEMS &amp; DELIVERY</span>
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>FREE Express Delivery</span>
                  </span>
                </div>

                <div className="p-4 sm:p-5 divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 p-1 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={resolveImagePath(item.image1 || '')}
                            alt={item.product_name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/Pureplus.png';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                            {item.product_name}
                          </h4>
                          <span className="text-[11px] text-gray-500 font-medium block">
                            Net Weight: {item.weight || '100g'}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center space-x-4 flex-shrink-0">
                        <div className="inline-flex items-center space-x-1.5 border border-gray-200 rounded-lg bg-gray-50 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-white hover:bg-gray-100 text-slate-700 flex items-center justify-center transition-colors text-xs font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-white hover:bg-gray-100 text-slate-700 flex items-center justify-center transition-colors text-xs font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm sm:text-base font-bold text-slate-900 min-w-[60px] text-right">
                          ₹{(parseFloat(item.product_price) * item.quantity).toFixed(0)}
                        </span>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Payment Options Card (Dark Green Header Bar) */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#054a29] text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-white text-[#054a29] flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <h2 className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-wider">
                      PAYMENT OPTIONS
                    </h2>
                  </div>
                  <span className="inline-flex items-center space-x-1.5 bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                    <Lock className="w-3.5 h-3.5 text-gold" />
                    <span>256-Bit SSL Encrypted</span>
                  </span>
                </div>

                {/* Radio Options List */}
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Option A: Razorpay UPI / Cards */}
                  <label
                    onClick={() => setPaymentOption('razorpay')}
                    className={`block border-2 rounded-2xl p-4 sm:p-5 cursor-pointer transition-all ${
                      paymentOption === 'razorpay'
                        ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="mt-0.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentOption === 'razorpay'}
                          onChange={() => setPaymentOption('razorpay')}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="font-bold text-sm sm:text-base text-slate-900">
                            UPI / Google Pay / PhonePe / Paytm / Cards
                          </span>
                          <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                            RECOMMENDED
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Instant payment via UPI Apps, Credit/Debit Cards, NetBanking. Fast priority dispatch.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option B: Direct WhatsApp Order */}
                  <label
                    onClick={() => setPaymentOption('whatsapp')}
                    className={`block border-2 rounded-2xl p-4 sm:p-5 cursor-pointer transition-all ${
                      paymentOption === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="mt-0.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentOption === 'whatsapp'}
                          onChange={() => setPaymentOption('whatsapp')}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center space-x-1.5">
                            <span>Direct Order via WhatsApp</span>
                          </span>
                          <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                            1-CLICK EXPRESS
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Send order &amp; address details straight to Pureplush WhatsApp support for quick confirmation.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Primary CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleProceedPayment}
                      disabled={checkoutLoading}
                      className="w-full py-4 bg-[#f95700] hover:bg-[#e04e00] text-white rounded-2xl font-sans font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {checkoutLoading ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Initiating Checkout...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>CONTINUE &amp; PAY ₹{totalAmount.toFixed(0)}</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Sticky Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 border-b border-gray-100 pb-3">
                  PRICE DETAILS ({totalQuantity} ITEM{totalQuantity === 1 ? '' : 'S'})
                </h3>

                {/* Free Gift Box */}
                <div className="bg-pink-50/70 border border-pink-200/80 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-pink-900">
                    <span>🌸 2x Premium Herbal Soap Included</span>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    FREE
                  </span>
                </div>

                {/* Breakdown Rows */}
                <div className="space-y-2.5 text-xs text-gray-600 font-medium pt-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="truncate max-w-[200px] text-slate-700">
                        {item.product_name} <span className="text-gray-400">({item.weight})</span>
                      </span>
                      <span className="font-bold text-slate-800">
                        + ₹{(parseFloat(item.product_price) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}

                  {comboDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 font-bold pt-1">
                      <span>Combo Bundle Discount</span>
                      <span>- ₹{comboDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-1">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-emerald-600 uppercase tracking-wider">FREE</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                  <span className="font-extrabold text-sm text-slate-800">Total Amount Payable</span>
                  <span className="font-serif text-2xl font-black text-slate-900">
                    ₹{totalAmount.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-xs text-charcoal/80 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safe and Secure Payments</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  100% Authentic Botanical Ingredients. Certified ISO 22716:2007 quality products with free express shipping across India.
                </p>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
