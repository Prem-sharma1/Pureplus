import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';
import { Clock, CheckCircle, AlertTriangle, Sparkles, Droplets, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | Pureplush',
  description: 'Fair return & refund terms for botanical personal care products sold via Pureplush.',
};

export default function RefundPolicyPage() {
  const sections = [
    {
      id: 'general-policy',
      title: '1. General Refund & Return Policy',
      content: (
        <div className="space-y-4">
          <p>
            At <strong>Pureplush</strong> (marketed by Nexora Trading Co), customer trust and satisfaction are our top priorities. We strive to offer a fair and transparent refund and replacement process across all botanical personal care formulations we sell.
          </p>
          <p>
            We offer a <strong>3-day replacement or refund policy</strong> for damaged, defective, or incorrect items delivered, subject to personal care hygiene guidelines:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <Clock className="w-4 h-4 text-gold-dark" />
                <span>48-Hour / 3-Day Notice</span>
              </div>
              <p className="text-xs text-charcoal/80">Issues (damaged packaging, leakage, wrong item) must be reported within 48 hours to 3 days of delivery.</p>
            </div>

            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <CheckCircle className="w-4 h-4 text-forest" />
                <span>Unopened & Sealed State</span>
              </div>
              <p className="text-xs text-charcoal/80">Returned items must be unused, un-tampered, and in original outer packaging for hygiene compliance.</p>
            </div>

            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 text-gold-dark" />
                <span>Hygiene & Safety Exclusions</span>
              </div>
              <p className="text-xs text-charcoal/80">Opened or used personal care products (soaps, shampoo bars, powders, oils) are non-returnable due to health and safety standards.</p>
            </div>

            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <Clock className="w-4 h-4 text-forest" />
                <span>Refund Timeline</span>
              </div>
              <p className="text-xs text-charcoal/80">Once approved, refunds are credited back to your original payment method within 3–7 business days.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'category-guidelines',
      title: '2. Product Category Guidelines',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Handcrafted Soaps & Shampoo Bars */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Droplets className="w-4 h-4 text-gold-dark" />
                <span>Solid Soaps & Shampoo Bars</span>
              </div>
              <p className="text-xs text-charcoal/80">Replacements provided for transit damage or wrong product received. Opened soap/shampoo bars are non-refundable.</p>
            </div>

            {/* Herbal Powders & Masks */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-gold-dark" />
                <span>Botanical Powders & Facepacks</span>
              </div>
              <p className="text-xs text-charcoal/80">Must be returned in original sealed foil/jar. Please inspect outer seal before opening.</p>
            </div>

            {/* Oils & Remedies */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1 sm:col-span-2">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>Botanical Hair Oils & Care Remedies</span>
              </div>
              <p className="text-xs text-charcoal/80">In case of bottle breakage or leakage during transit, please share unboxing photo/video proof within 48 hours for immediate replacement.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'need-help',
      title: '3. Need Help?',
      content: (
        <div className="space-y-4">
          <p>
            If you received a damaged item or need assistance with your order, please contact our support team:
          </p>
          <div className="bg-cream/80 p-4 rounded-2xl border border-forest/10 inline-block space-y-2">
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Customer Support Email</span>
              <a href="mailto:nexoratradingco1@gmail.com" className="text-sm font-bold text-forest hover:text-gold transition-colors">
                nexoratradingco1@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Phone & WhatsApp Support</span>
              <a href="tel:+918446816247" className="text-sm font-bold text-forest hover:text-gold transition-colors">
                +91 84468 16247
              </a>
            </div>
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Support Hours</span>
              <p className="text-xs text-charcoal/80 font-medium">10:00 AM – 6:00 PM IST (Mon–Sat)</p>
            </div>
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
      title="Refund & Return Policy"
      subtitle="At Pureplush, customer satisfaction is our top priority. We offer a clear and transparent 3-day replacement policy for damaged or wrong items."
      categoryBadge="Returns & Refunds"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="nexoratradingco1@gmail.com"
      supportHours="10:00 AM – 6:00 PM IST (Mon–Sat)"
    />
  );
}
