import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/PolicyLayout';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pureplush',
  description: 'Learn how Pureplush collects, uses, and safeguards your personal data.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'information-we-collect',
      title: '1. Information We Collect',
      content: (
        <div className="space-y-4">
          <p>
            At <strong>Pureplush</strong> (operated by Nexora Trading Co), we value transparency and are committed to protecting your personal information. When you interact with our website and services, we may collect personal details such as:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Full Name & Contact Info:</strong> Collected when making a purchase or contacting customer support.</span>
            </div>
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Email & Phone Number:</strong> Used for order confirmations, delivery tracking updates, and customer service.</span>
            </div>
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Shipping Address:</strong> Necessary to dispatch and deliver your ordered items accurately.</span>
            </div>
            <div className="flex items-start space-x-2.5 bg-cream/60 p-3.5 rounded-xl border border-forest/10">
              <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-xs"><strong>Transaction Details:</strong> Payment status processed securely through encrypted, PCI-DSS compliant gateways.</span>
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
            <p>• <strong>Customer Care:</strong> Answering inquiries and responding to support requests efficiently.</p>
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
            Payment transactions are processed securely through certified payment aggregators. We do not store raw card numbers or banking passwords on our servers.
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
            <strong>Pureplush</strong> reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.
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
          <div className="bg-cream/80 p-4 rounded-2xl border border-forest/10 inline-block space-y-1">
            <span className="text-xs font-bold text-forest uppercase tracking-wider block">Privacy Support Email</span>
            <a href="mailto:nexoratradingco1@gmail.com" className="text-sm font-bold text-forest hover:text-gold transition-colors">
              nexoratradingco1@gmail.com
            </a>
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
      title="Privacy Policy"
      subtitle="At Pureplush, we value transparency and are committed to protecting your personal information."
      categoryBadge="Data Privacy & Protection"
      lastUpdated="July 2026"
      sections={sections}
      contactEmail="nexoratradingco1@gmail.com"
    />
  );
}
