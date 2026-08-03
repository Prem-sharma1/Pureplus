'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Gift, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PromoBannerProps {
  onComboClick?: () => void;
}

export default function PromoBanner({ onComboClick }: PromoBannerProps) {
  const handleScrollToProducts = (e: React.MouseEvent) => {
    if (onComboClick) {
      onComboClick();
      return;
    }
    const productsSection = document.getElementById('products');
    if (productsSection) {
      e.preventDefault();
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-r from-forest-dark via-forest to-sage-dark text-cream py-3 sm:py-4 px-4 sm:px-6 lg:px-8 border-y border-gold/30 shadow-lg select-none">
      {/* Background Animated Glows & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute -top-12 left-1/4 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-12 right-1/4 w-80 h-80 bg-sage-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Subtle Diagonal Shimmer Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,215,94,0.08)_40%,transparent_60%)] animate-shimmer pointer-events-none" />
      </div>

      {/* Main Banner Content Layout */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        
        {/* Left Pill Button: BUILD YOUR OWN WELLNESS COMBO */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-auto flex justify-center md:justify-start"
        >
          <Link
            href="/shop"
            onClick={handleScrollToProducts}
            className="group relative inline-flex items-center space-x-2 px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-gold/40 hover:border-gold backdrop-blur-md transition-all duration-300 shadow-md text-xs sm:text-sm font-bold text-cream hover:text-white tracking-wide uppercase cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '4s' }} />
            <span>BUILD YOUR OWN WELLNESS COMBO</span>
            <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Center Text: CHOOSE ANY WELLNESS COMBO (3D Gold Metallic Styling, No Price Mentioned) */}
        <div className="text-center flex flex-col items-center justify-center my-1 md:my-0">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-xl md:text-2xl font-extrabold tracking-wider uppercase font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-gold to-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(245,166,35,0.3)',
            }}
          >
            BUILD YOUR OWN WELLNESS COMBO
          </motion.h3>
          <p className="text-[10px] sm:text-xs font-sans tracking-wide text-cream-light/90 font-semibold uppercase mt-0.5">
            Choose any 4 items at ₹995 (1 Pack: ₹289 | Pack of 2: ₹545 | Pack of 3: ₹789 | Pack of 4: ₹995)
          </p>
        </div>

        {/* Right White Pill Badge: ⚡ FREE HERBAL SOAP WITH POWDERS & HAIRCARE ⚡ */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="w-full md:w-auto flex justify-center md:justify-end"
        >
          <div className="inline-flex items-center space-x-2 px-5 py-2 sm:py-2.5 rounded-full bg-white text-forest shadow-xl border border-gold/30 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce" />
            <span className="text-forest font-extrabold">FREE HERBAL SOAP WITH POWDERS &amp; HAIRCARE</span>
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
