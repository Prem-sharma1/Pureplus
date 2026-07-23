import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';
import { Clock, Truck, DollarSign, MapPin, AlertCircle, PackageCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | pureplush',
  description: 'Learn about pureplush shipping times, delivery rates, order tracking, and cancellation terms.',
};

export default function ShippingPolicyPage() {
  const sections = [
    {
      id: 'shipping-time-processing',
      title: '1. Shipping Time & Processing',
      content: (
        <div className="space-y-4">
          <p>
            At <strong>pureplush</strong>, we strive to provide fast and reliable delivery services to ensure a smooth shopping experience.
          </p>
          <ul className="text-xs sm:text-sm text-charcoal/80 space-y-2 list-disc list-inside bg-cream/50 p-4 rounded-2xl border border-forest/10">
            <li>Orders are typically processed within 1-2 business days after confirmation.</li>
            <li>Once shipped, delivery times vary based on the location, usually taking 5-7 business days.</li>
            <li>Orders placed on weekends or public holidays will be processed on the next working day.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'shipping-charges',
      title: '2. Shipping Charges',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cream/60 p-4 rounded-2xl border border-forest/10 space-y-1">
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Standard Shipping</span>
              <p className="text-xl font-bold text-forest">₹100</p>
              <p className="text-xs text-charcoal/70">Varies based on location.</p>
            </div>
            <div className="bg-forest text-white p-4 rounded-2xl border border-gold/30 space-y-1">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">Free Shipping</span>
              <p className="text-xl font-bold text-white">Available</p>
              <p className="text-xs text-sage-light">Available on orders above ₹1500.</p>
            </div>
          </div>
          <p className="text-xs text-charcoal/75 italic">
            Additional charges may apply for remote locations or express shipping options.
          </p>
        </div>
      ),
    },
    {
      id: 'order-tracking',
      title: '3. Order Tracking',
      content: (
        <div className="space-y-3">
          <ul className="text-xs sm:text-sm text-charcoal/80 space-y-2 list-disc list-inside">
            <li>Once your order is shipped, you will receive a tracking ID via email/SMS.</li>
            <li>You can track your order status using the tracking link provided.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'damaged-or-missing-products',
      title: '4. Damaged or Missing Products',
      content: (
        <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-charcoal/85">
          <p>• If your order arrives damaged or incomplete, please contact us within 24 hours of delivery.</p>
          <p>• We may require images/videos of the product and packaging for verification.</p>
        </div>
      ),
    },
    {
      id: 'cancellation-and-changes',
      title: '5. Cancellation & Changes',
      content: (
        <div className="space-y-3">
          <ul className="text-xs sm:text-sm text-charcoal/80 space-y-2 list-disc list-inside">
            <li>Orders can be canceled or modified only before shipping.</li>
            <li>Once shipped, cancellations or address changes may not be possible.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact-us',
      title: '6. Contact Us',
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions or concerns regarding shipping and delivery, please contact us at:
          </p>
          <div className="bg-cream/80 p-4 rounded-2xl border border-forest/10 inline-block">
            <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1">Email Contact</span>
            <a href="mailto:impexsaish@gmail.com" className="text-sm font-bold text-forest hover:text-gold transition-colors">
              impexsaish@gmail.com
            </a>
          </div>
          <p className="text-xs text-forest/90 font-medium pt-1">
            Thank you for choosing <strong>pureplush</strong>!
          </p>
        </div>
      ),
    },
  ];

  return (
    <PolicyLayout
      title="Shipping & Delivery Policy"
      subtitle="Fast and reliable delivery services across India to ensure a smooth shopping experience."
      categoryBadge="Shipping & Logistics"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="impexsaish@gmail.com"
    />
  );
}
