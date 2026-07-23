'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Mail, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  categoryBadge: string;
  lastUpdated?: string;
  sections: Section[];
  contactEmail?: string;
  supportHours?: string;
}

export default function PolicyLayout({
  title,
  subtitle,
  categoryBadge,
  lastUpdated = 'July 2026',
  sections,
  contactEmail = 'impexsaish@gmail.com',
  supportHours = '10:00 AM – 6:00 PM (Mon–Sat)',
}: PolicyLayoutProps) {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfdfc] text-charcoal font-sans pt-24 pb-20">
      {/* Background Decorative Blur */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-forest/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      {/* Hero Header Section - 100% Full Width */}
      <div className="w-full bg-gradient-to-b from-forest-dark via-forest to-forest-dark text-white relative overflow-hidden py-14 sm:py-16 px-4 sm:px-8 lg:px-12 shadow-md">
        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-sage-light mb-4 justify-center">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white/80 font-medium">Policies</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-gold font-semibold">{title}</span>
          </nav>

          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-light">{categoryBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-sage-light/90 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-5 inline-block text-xs text-sage-light/80 bg-black/20 px-3.5 py-1 rounded-full border border-white/10">
            Last Updated: <strong className="text-white font-medium">{lastUpdated}</strong>
          </div>
        </div>
      </div>

      {/* Main Content Area - 100% Full Width (max-w-7xl) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-10">
        
        {/* Quick Nav Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 pb-6 border-b border-forest/10">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="text-xs px-4 py-2 rounded-full bg-white hover:bg-forest hover:text-white text-forest border border-forest/20 font-medium transition-all shadow-sm flex items-center space-x-2"
            >
              <span className="text-[11px] opacity-70 font-bold">0{idx + 1}.</span>
              <span>{sec.title.replace(/^[0-9]+\.\s*/, '')}</span>
            </button>
          ))}
        </div>

        {/* Policy Sections - Full Width Container */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-12 lg:p-16 border border-forest/10 shadow-xl shadow-forest/5 space-y-12">
          {sections.map((sec, idx) => (
            <motion.div
              key={sec.id}
              id={sec.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3 }}
              className={`space-y-4 ${idx !== sections.length - 1 ? 'pb-12 border-b border-forest/10' : ''}`}
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold text-sm flex-shrink-0">
                  0{idx + 1}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-forest leading-tight">
                  {sec.title.replace(/^[0-9]+\.\s*/, '')}
                </h2>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none text-charcoal/85 leading-relaxed space-y-4 font-sans text-sm sm:text-base">
                {sec.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Width Bottom Support Banner */}
        <div className="w-full mt-10 bg-gradient-to-r from-forest via-forest-dark to-forest text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-white">Have questions about this policy?</h3>
            <p className="text-xs sm:text-sm text-sage-light">
              Our customer care team is available {supportHours}.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gold hover:bg-gold-light text-forest font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all border border-white/20"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
