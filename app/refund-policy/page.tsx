import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';
import { Clock, CheckCircle, AlertTriangle, Smartphone, Shirt, Sparkles, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | pureplush',
  description: 'Fair 3-day return & refund terms across all product categories sold via pureplush.',
};

export default function RefundPolicyPage() {
  const sections = [
    {
      id: 'general-policy',
      title: '1. General Refund & Return Policy',
      content: (
        <div className="space-y-4">
          <p>
            At <strong>pureplush</strong>, customer satisfaction is our top priority. We strive to offer a fair and transparent refund and return process across all categories of products we sell.
          </p>
          <p>
            We offer a <strong>3-day return or refund policy</strong> on most items sold via pureplush, subject to the product category and return eligibility. Please ensure the following conditions are met:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <Clock className="w-4 h-4 text-gold-dark" />
                <span>3-Day Window</span>
              </div>
              <p className="text-xs text-charcoal/80">Return/refund request must be initiated within 3 days of delivery.</p>
            </div>

            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <CheckCircle className="w-4 h-4 text-forest" />
                <span>Original Packaging</span>
              </div>
              <p className="text-xs text-charcoal/80">Item must be unused, undamaged, and returned in original packaging with all accessories, manuals, and tags intact.</p>
            </div>

            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 text-gold-dark" />
                <span>Non-Returnable Items</span>
              </div>
              <p className="text-xs text-charcoal/80">Products like personal care, cosmetics, innerwear, food items, or custom orders are non-returnable unless defective or damaged.</p>
            </div>

            <div className="bg-cream/60 p-4 rounded-xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 text-forest font-semibold text-xs">
                <Clock className="w-4 h-4 text-forest" />
                <span>Refund Timeline</span>
              </div>
              <p className="text-xs text-charcoal/80">Once the return is approved and the product is inspected, a refund will be processed to your original payment method within 3–10 business days.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'category-guidelines',
      title: '2. Category-Specific Guidelines',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Electronics */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Smartphone className="w-4 h-4 text-gold-dark" />
                <span>Electronics (Mobiles, Laptops, Accessories)</span>
              </div>
              <p className="text-xs text-charcoal/80">Returns accepted only for defective, damaged, or incorrect products.</p>
            </div>

            {/* Fashion */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Shirt className="w-4 h-4 text-gold-dark" />
                <span>Fashion & Lifestyle</span>
              </div>
              <p className="text-xs text-charcoal/80">Returns allowed for size issues or if the product is not as described. Must be returned unused and with tags.</p>
            </div>

            {/* Beauty */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>Beauty & Personal Care</span>
              </div>
              <p className="text-xs text-charcoal/80">Returns allowed only if item is damaged or different from what was ordered. Products must be sealed and unused.</p>
            </div>

            {/* Home */}
            <div className="bg-cream/50 p-4 rounded-2xl border border-forest/10 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-forest text-xs uppercase tracking-wider">
                <Home className="w-4 h-4 text-gold-dark" />
                <span>Home & Appliances</span>
              </div>
              <p className="text-xs text-charcoal/80">Returns accepted for defective or wrong items within 3 days. Installation issues must be reported with supporting photos/videos.</p>
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
            If you need help with a return or refund, contact our support team:
          </p>
          <div className="bg-cream/80 p-4 rounded-2xl border border-forest/10 inline-block space-y-2">
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Email Contact</span>
              <a href="mailto:impexsaish@gmail.com" className="text-sm font-bold text-forest hover:text-gold transition-colors">
                impexsaish@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Support Hours</span>
              <p className="text-xs text-charcoal/80 font-medium">10:00 AM – 6:00 PM (Mon–Sat)</p>
            </div>
          </div>
          <p className="text-xs text-forest/90 font-medium pt-1">
            Thank you for shopping with <strong>pureplush</strong>!
          </p>
        </div>
      ),
    },
  ];

  return (
    <PolicyLayout
      title="Refund & Return Policy"
      subtitle="At pureplush, customer satisfaction is our top priority. We offer a fair and transparent 3-day return policy."
      categoryBadge="Returns & Refunds"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="impexsaish@gmail.com"
      supportHours="10:00 AM – 6:00 PM (Mon–Sat)"
    />
  );
}
