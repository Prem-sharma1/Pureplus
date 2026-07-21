'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ShieldAlert, 
  Package, 
  Calendar, 
  CreditCard, 
  Truck, 
  RefreshCw, 
  MapPin, 
  Phone 
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  product_name: string;
  product_price: string;
  weight: string;
  quantity: number;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  payment_status: string;
  payment_id: string;
  order_date: string;
  shipping_status: string;
  courier_partner: string;
  tracking_number: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.location.href = '/';
  }, []);

  const fetchOrders = async (email: string) => {
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to fetch orders from database:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-cream-light">
        <div className="w-16 h-16 rounded-full bg-forest/5 flex items-center justify-center text-forest/45 mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest">Sign in to view orders</h2>
        <p className="text-xs text-charcoal/65 mt-2 max-w-sm leading-relaxed">
          Please log in with your Pureplush account to check your package delivery status and past purchase history.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-forest hover:bg-forest-light text-cream text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-cream-light flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-cream-light py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center space-x-3 mb-12 border-b border-forest/10 pb-6">
          <ClipboardList className="w-8 h-8 text-forest" />
          <div>
            <h1 className="font-serif text-3xl font-bold text-forest">Order History</h1>
            <p className="text-xs text-charcoal/65 mt-1">Track and review your Pureplush purchases</p>
          </div>
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="bg-white border border-forest/10 p-12 text-center rounded-2xl shadow-sm flex flex-col items-center">
            <Package className="w-12 h-12 text-sage mb-4" />
            <h3 className="font-serif text-lg font-bold text-forest">No orders found</h3>
            <p className="text-xs text-charcoal/60 mt-1">You haven&apos;t placed any orders yet.</p>
            <Link href="/" className="mt-6 px-6 py-2 bg-forest text-cream text-xs font-bold uppercase tracking-wider rounded-full hover:bg-forest-light transition-all">
              Go to Store
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-cream/40 border-b border-forest/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                    <div>
                      <span className="text-charcoal/50 uppercase tracking-wider font-semibold block text-[10px]">Order Date</span>
                      <span className="font-bold text-forest flex items-center space-x-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-sage" />
                        <span>{order.order_date}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal/50 uppercase tracking-wider font-semibold block text-[10px]">Order Number</span>
                      <span className="font-mono font-bold text-forest mt-0.5 block">#{order.order_number}</span>
                    </div>
                    <div>
                      <span className="text-charcoal/50 uppercase tracking-wider font-semibold block text-[10px]">Payment ID</span>
                      <span className="font-mono font-semibold text-neutral-500 mt-0.5 block truncate max-w-[130px]">{order.payment_id}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                      order.shipping_status === 'delivered'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                    }`}>
                      <Truck className="w-3.5 h-3.5 mr-1" />
                      <span>{order.shipping_status === 'dispatched' ? 'Dispatched' : order.shipping_status}</span>
                    </span>
                  </div>
                </div>

                {/* Order Details Body */}
                <div className="p-6 divide-y divide-forest/5">
                  {/* Items List */}
                  <div className="space-y-4 pb-4">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center flex-shrink-0 text-xl border border-forest/5 shadow-inner">
                            🌱
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-bold text-forest leading-tight">{item.product_name}</h4>
                            <p className="text-[10px] text-charcoal/50 mt-0.5">
                              Quantity: <span className="font-semibold">{item.quantity}</span> | Weight: <span className="font-semibold">{item.weight}</span>
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-forest">₹{parseFloat(item.product_price).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Logistics Status & Shipping Info */}
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-charcoal/80">
                    <div className="space-y-2">
                      <h5 className="font-semibold text-forest uppercase tracking-wider text-[10px]">Shipping Details</h5>
                      <p className="flex items-start space-x-1.5 leading-relaxed">
                        <MapPin className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                        <span>{order.shipping_address}</span>
                      </p>
                      <p className="flex items-center space-x-1.5 font-medium">
                        <Phone className="w-3.5 h-3.5 text-sage" />
                        <span>{order.customer_phone}</span>
                      </p>
                    </div>

                    <div className="space-y-2 bg-cream/20 p-4 rounded-xl border border-forest/5">
                      <h5 className="font-semibold text-forest uppercase tracking-wider text-[10px]">Logistics Partner (Bot Tracker)</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-charcoal/40 block">Courier</span>
                          <span className="font-semibold text-forest">{order.courier_partner || 'Assigning...'}</span>
                        </div>
                        <div>
                          <span className="text-charcoal/40 block">Tracking ID</span>
                          <span className="font-mono font-semibold text-forest">{order.tracking_number || 'Pending'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer total */}
                <div className="bg-cream/20 border-t border-forest/5 px-6 py-4 flex items-center justify-between">
                  <span className="text-xs text-charcoal/50 font-medium">Paid via Razorpay Secure</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xs text-charcoal/50">Total Amount:</span>
                    <span className="text-lg font-sans font-extrabold text-forest">₹{parseFloat(order.total_amount as any).toFixed(0)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
