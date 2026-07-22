'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FounderVisionSection from '@/components/FounderVisionSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import { motion } from 'framer-motion';
import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col font-sans">
      <Navbar />

      {/* Hero Header Banner */}
      <section className="pt-32 pb-16 bg-forest text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cream/10 text-gold text-xs font-bold uppercase tracking-widest border border-cream/15">
              <Leaf className="w-3.5 h-3.5" />
              <span>About Pureplush</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Rooted in Nature, Crafted with Purpose
            </h1>
            <p className="text-sage-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Discover the heart behind Pureplush, our Ayurvedic roots, founder's journey, vision for holistic wellness, and our official brand marketing partner Nexora Trading Co.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Founder & Vision Section */}
      <main className="flex-grow">
        <FounderVisionSection />
      </main>

      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}
