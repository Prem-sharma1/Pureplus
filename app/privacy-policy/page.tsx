import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | pureplush',
  description: 'Learn how pureplush collects, uses, and safeguards your personal data.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'information-we-collect',
      title: '1. Information We Collect',
      content: (
        <div className="space-y-4">
          <p>
            At <strong>pureplush</strong>, we value transparency and are committed to protecting your personal information. When you interact with our website and services, we may collect personal details such as:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Full Name & Contact Info:</strong> Collected when making a purchase or contacting us.</span>
            </div>
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Email & Phone Number:</strong> Used for order confirmations, delivery updates, and support.</span>
            </div>
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Shipping Address:</strong> Necessary to dispatch and deliver your ordered items.</span>
            </div>
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Transaction Details:</strong> Payment status processed securely through encrypted gateways.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'how-we-use-information',
      title: '2. How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>
            The information collected is used to process orders, provide customer support, and improve our services.
          </p>
          <div className="bg-forest/5 p-4 rounded-xl border border-forest/15 text-xs space-y-2">
            <p>• <strong>Order Processing:</strong> Managing purchases, generating invoices, and shipping products.</p>
            <p>• <strong>Customer Care:</strong> Answering inquiries and responding to callback requests efficiently.</p>
            <p>• <strong>Service Enhancements:</strong> Optimizing store performance and product catalog availability.</p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-forest bg-gold/10 p-3.5 rounded-xl border border-gold/30">
            <ShieldCheck className="w-4 h-4 text-gold-dark flex-shrink-0" />
            <span>We do not sell, trade, or rent your personal data to third parties.</span>
          </div>
        </div>
      ),
    },
    {
      id: 'data-protection-security',
      title: '3. Data Protection and Security',
      content: (
        <div className="space-y-3">
          <p>
            We implement industry-standard security measures to protect your data against unauthorized access, loss, or misuse.
          </p>
          <p className="text-xs text-charcoal/80 leading-relaxed">
            However, no method of transmission over the Internet is 100% secure, so we encourage you to use strong passwords and avoid sharing sensitive details online.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-policy',
      title: '4. Changes to This Privacy Policy',
      content: (
        <div className="space-y-3">
          <p>
            <strong>pureplush</strong> reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page, and users are encouraged to review this policy periodically.
          </p>
        </div>
      ),
    },
    {
      id: 'contact-us',
      title: '5. Contact Us',
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions or concerns regarding this Privacy Policy, feel free to contact us at:
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
      title="Privacy Policy"
      subtitle="At pureplush, we value transparency and are committed to protecting your personal information."
      categoryBadge="Data Privacy & Protection"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="impexsaish@gmail.com"
    />
  );
}
