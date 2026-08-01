import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';
import { Clock, Truck, DollarSign, MapPin, AlertCircle, PackageCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Pureplush',
  description: 'Learn about Pureplush shipping times, delivery rates, order tracking, and COD terms.',
};

export default function ShippingPolicyPage() {
  const sections = [
    {
      id: 'shipping-time-processing',
      title: '1. Shipping Time & Processing',
      content: (
        <div className="space-y-4">
          <p>
            At <strong>Pureplush</strong> (marketed by Nexora Trading Co), we strive to provide fast and reliable delivery services across India.
          </p>
          <ul className="text-xs sm:text-sm text-charcoal/80 space-y-2 list-disc list-inside bg-cream/50 p-4 rounded-2xl border border-forest/10">
            <li>Orders are dispatched within 24 to 48 hours after payment or COD verification.</li>
            <li>Standard delivery timelines range between 3 to 7 business days depending on delivery pincode location.</li>
            <li>Orders placed on Sundays or public holidays will be processed on the next business day.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'shipping-charges',
      title: '2. Shipping Charges & Cash on Delivery (COD)',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cream/60 p-4 rounded-2xl border border-forest/10 space-y-1">
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Standard Shipping</span>
              <p className="text-xl font-bold text-forest">Nominal Rate</p>
              <p className="text-xs text-charcoal/70">Calculated at checkout for orders under ₹499.</p>
            </div>
            <div className="bg-forest text-white p-4 rounded-2xl border border-gold/30 space-y-1">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">Free Shipping Offer</span>
              <p className="text-xl font-bold text-white">Free Above ₹499</p>
              <p className="text-xs text-sage-light">Applies automatically to all prepaid and COD orders above ₹499.</p>
            </div>
          </div>
          <p className="text-xs text-charcoal/75 italic">
            Cash on Delivery (COD) is available for serviceable pincodes across India.
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
            <li>Once your shipment is dispatched, you will receive a tracking link via SMS/WhatsApp/Email.</li>
            <li>You can track real-time delivery status using the courier partner tracking link.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'damaged-or-missing-products',
      title: '4. Transit Damage or Wrong Item Delivered',
      content: (
        <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-charcoal/85">
          <p>• If your package arrives damaged or incomplete, please notify us within 48 hours of delivery.</p>
          <p>• Sharing an unboxing photo or video helps our team expedite replacement dispatch immediately.</p>
        </div>
      ),
    },
    {
      id: 'cancellation-and-changes',
      title: '5. Order Cancellation & Address Modification',
      content: (
        <div className="space-y-3">
          <ul className="text-xs sm:text-sm text-charcoal/80 space-y-2 list-disc list-inside">
            <li>Orders can be cancelled or modified prior to dispatch by reaching out to support.</li>
            <li>Once the order has been handed over to the courier partner, address modifications cannot be guaranteed.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact-us',
      title: '6. Support & Contact',
      content: (
        <div className="space-y-4">
          <p>
            For delivery inquiries, tracking support, or address changes, please contact us at:
          </p>
          <div className="bg-cream/80 p-4 rounded-2xl border border-forest/10 inline-block space-y-1">
            <span className="text-xs font-bold text-forest uppercase tracking-wider block">Logistics Support Email</span>
            <a href="mailto:nexoratradingco1@gmail.com" className="text-sm font-bold text-forest hover:text-gold transition-colors">
              nexoratradingco1@gmail.com
            </a>
            <p className="text-xs font-bold text-forest">Phone / WhatsApp: +91 84468 16247</p>
            <p className="text-xs text-charcoal/70">Nexora Trading Co, Dhanori, Pune, Maharashtra - 411015</p>
          </div>
          <p className="text-xs text-forest/90 font-medium pt-1">
            Thank you for choosing <strong>Pureplush</strong>!
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
      contactEmail="nexoratradingco1@gmail.com"
    />
  );
}
