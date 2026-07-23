import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';

export const metadata: Metadata = {
  title: 'Terms and Conditions | pureplush',
  description: 'Terms and Conditions governing your use of pureplush services and website.',
};

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: 'general-terms',
      title: '1. General Terms',
      content: (
        <div className="space-y-3">
          <p>
            These Terms and Conditions govern your use of <strong>pureplush</strong> services and website. By accessing or purchasing from us, you agree to these terms.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/80 bg-cream/50 p-4 rounded-2xl border border-forest/10 leading-relaxed">
            By using this website or purchasing from pureplush, you acknowledge that all accessories are tested. pureplush is committed to providing reliable products, but few items may show minor cosmetic imperfections.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
            You agree to inspect all products thoroughly upon receipt. Your acceptance of the product upon delivery indicates that you are satisfied with its condition and functionality.
          </p>
        </div>
      ),
    },
    {
      id: 'payment-terms',
      title: '2. Payment Terms',
      content: (
        <div className="space-y-3">
          <p>
            All payments must be made in full at the time of purchase. pureplush accepts multiple payment methods as displayed during checkout. In the event of a failed payment, the order will not be processed.
          </p>
        </div>
      ),
    },
    {
      id: 'refund-policy',
      title: '3. Refund Policy',
      content: (
        <div className="space-y-3">
          <p>
            pureplush offers a 3-day refund policy. To qualify for a refund, customers must adhere to the conditions outlined in our Refund Policy. Refund requests outside the 3-day period will not be entertained.
          </p>
        </div>
      ),
    },
    {
      id: 'warranty-policy',
      title: '4. Warranty Policy',
      content: (
        <div className="space-y-3">
          <p>
            Some product come with a Brand warranty, which covers service-related issues. This warranty is provided by brand not by pureplush. Full details are available in our Warranty Policy.
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
            pureplush is not liable for any damages arising from the use or inability to use our products. Customers are responsible for ensuring proper use and maintenance of product purchased from us.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-terms',
      title: '6. Changes to Terms',
      content: (
        <div className="space-y-3">
          <p>
            pureplush reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Continued use of our services indicates acceptance of the revised terms.
          </p>
        </div>
      ),
    },
    {
      id: 'governing-law',
      title: '7. Governing Law',
      content: (
        <div className="space-y-3">
          <p>
            These Terms and Conditions are governed by the laws of the jurisdiction where pureplush operates. Any disputes arising will be resolved under these laws.
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
            For any questions or concerns regarding these terms, please contact us at:
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
      title="Terms and Conditions"
      subtitle="These Terms and Conditions govern your use of pureplush services and website."
      categoryBadge="Terms & Legal"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="impexsaish@gmail.com"
    />
  );
}
