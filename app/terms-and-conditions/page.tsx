import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Pureplush',
  description: 'Terms and Conditions governing your use of Pureplush website and personal care products.',
};

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: 'general-terms',
      title: '1. General Terms',
      content: (
        <div className="space-y-3">
          <p>
            These Terms and Conditions govern your use of the <strong>Pureplush</strong> website and services (operated and marketed by Nexora Trading Co). By accessing our website or purchasing products from us, you agree to comply with these terms.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/80 bg-cream/50 p-4 rounded-2xl border border-forest/10 leading-relaxed">
            Pureplush offers handcrafted soaps, solid shampoo bars, stone-ground botanical powders, and personal care formulations. Our products are formulated for cosmetic and personal hygiene care routines and are not intended to diagnose, treat, cure, or prevent any medical condition or skin disease.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
            Customers are advised to review product ingredients, directions, and perform a mandatory 24-hour patch test prior to regular usage.
          </p>
        </div>
      ),
    },
    {
      id: 'product-usage',
      title: '2. Product Usage & Patch Testing',
      content: (
        <div className="space-y-3">
          <p>
            Individual skin and hair sensitivity may vary. Always test a small quantity of the product on your inner arm or wrist 24 hours prior to full application. If irritation or discomfort occurs, discontinue use immediately and consult a healthcare professional.
          </p>
        </div>
      ),
    },
    {
      id: 'payment-terms',
      title: '3. Payment & Pricing',
      content: (
        <div className="space-y-3">
          <p>
            All prices listed on the Pureplush website are in Indian Rupees (INR) and inclusive of applicable taxes. Payments must be settled in full at checkout via our authorized payment gateways or designated Cash on Delivery (COD) services.
          </p>
        </div>
      ),
    },
    {
      id: 'refund-policy',
      title: '4. Returns & Replacements',
      content: (
        <div className="space-y-3">
          <p>
            Pureplush offers a 3-day replacement or refund policy specifically for items delivered in a damaged, defective, or incorrect state. Due to hygiene standards for personal care products, opened or used items cannot be returned. Please refer to our Refund Policy for complete guidelines.
          </p>
        </div>
      ),
    },
    {
      id: 'limitation-of-liability',
      title: '5. Limitation of Liability',
      content: (
        <div className="space-y-3">
          <p>
            Pureplush and Nexora Trading Co shall not be liable for any indirect, incidental, or consequential damages resulting from improper product storage, failure to perform a patch test, or misuse of products contrary to label directions.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-terms',
      title: '6. Modifications to Terms',
      content: (
        <div className="space-y-3">
          <p>
            We reserve the right to update or revise these Terms and Conditions at any time. Updated terms will take effect immediately upon being posted on this page.
          </p>
        </div>
      ),
    },
    {
      id: 'governing-law',
      title: '7. Governing Law & Jurisdiction',
      content: (
        <div className="space-y-3">
          <p>
            These terms are governed by and construed in accordance with the laws of India. Any legal proceedings or disputes shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
          </p>
        </div>
      ),
    },
    {
      id: 'contact-us',
      title: '8. Contact Us',
      content: (
        <div className="space-y-4">
          <p>
            For any questions, order support, or legal inquiries regarding these terms, please reach out to us:
          </p>
          <div className="bg-cream/80 p-4 rounded-2xl border border-forest/10 inline-block space-y-1">
            <span className="text-xs font-bold text-forest uppercase tracking-wider block">Support Contact</span>
            <p className="text-sm font-bold text-forest">nexoratradingco1@gmail.com | +91 84468 16247</p>
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
      title="Terms and Conditions"
      subtitle="These Terms and Conditions govern your use of Pureplush services, website, and personal care products."
      categoryBadge="Terms & Legal"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="nexoratradingco1@gmail.com"
    />
  );
}
