'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream/30 via-cream to-cream-light py-12 md:py-24 lg:py-32">
      {/* Decorative Floating Leaves (SVG) */}
      <div className="absolute top-10 left-[5%] w-16 h-16 opacity-20 pointer-events-none leaf-animate-1">
        <Leaf className="w-full h-full text-forest" />
      </div>
      <div className="absolute bottom-12 right-[8%] w-24 h-24 opacity-15 pointer-events-none leaf-animate-2">
        <Leaf className="w-full h-full text-sage rotate-45" />
      </div>
      <div className="absolute top-1/3 right-[12%] w-12 h-12 opacity-10 pointer-events-none leaf-animate-3">
        <Leaf className="w-full h-full text-gold -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 items-start">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-forest/5 border border-forest/10 px-3.5 py-1.5 rounded-full self-start"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-wider uppercase text-forest font-sans">
                100% Pure, Natural & Authentic
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest leading-[1.15]"
            >
              Pureplush – Natural Goodness, <br />
              <span className="text-sage-dark relative inline-block">
                Instant Wellness
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/20 -z-10 rounded-full"></span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-charcoal/70 max-w-xl leading-relaxed text-left"
            >
              Discover Pureplush&apos;s handcrafted premium soaps, organic hair powders, and luxury shampoo bars. We blend ancient Ayurvedic wisdom with modern wellness for a healthier lifestyle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <Link
                href="#categories"
                className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-forest hover:bg-forest-light text-cream rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group text-sm animate-pulse-subtle"
              >
                <span>Shop Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-white border border-forest/10 hover:border-forest/35 text-forest rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
              >
                <span>Explore Products</span>
              </Link>
            </motion.div>

            {/* Micro Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-forest/10 w-full"
            >
              <div className="flex items-center space-x-2 text-charcoal/80">
                <ShieldCheck className="w-5 h-5 text-sage" />
                <span className="text-xs font-semibold uppercase tracking-wider">Lab Tested</span>
              </div>
              <div className="flex items-center space-x-2 text-charcoal/80">
                <Leaf className="w-5 h-5 text-sage" />
                <span className="text-xs font-semibold uppercase tracking-wider">Vegan & Organic</span>
              </div>
              <div className="flex items-center space-x-2 text-charcoal/80 col-span-2 md:col-span-1">
                <Sparkles className="w-5 h-5 text-sage" />
                <span className="text-xs font-semibold uppercase tracking-wider">Cruelty-Free</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="relative w-80 h-80 sm:w-96 sm:h-96"
            >
              {/* Outer decorative gold ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
              
              {/* Inner glowing forest green circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-forest to-forest-light shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center text-cream">
                
                {/* Visual Organic Composition inside Hero Circular Frame */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="z-10 flex flex-col items-center"
                >
                  <Leaf className="w-16 h-16 text-gold mb-4 animate-[pulse_3s_infinite]" />
                  <span className="font-serif text-3xl font-bold italic tracking-wide text-white">pureplush</span>
                  <p className="text-xs uppercase tracking-widest text-sage-light mt-2 font-medium">Ayurvedic Apothecary</p>
                  <p className="text-sm italic text-cream/90 mt-4 max-w-[200px]">Handcrafted premium wellness from miracle tree leaves, oils & botanicals</p>
                </motion.div>
              </div>

              {/* Floating tags - positioned outside the overflow-hidden mask to prevent clipping */}
              <div className="absolute top-16 -left-6 z-25 bg-cream border border-forest/10 text-forest text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg hover:scale-105 transition-transform select-none">
                Moringa Powders
              </div>
              <div className="absolute bottom-20 -right-6 z-25 bg-gold text-forest text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg hover:scale-105 transition-transform select-none">
                Natural Soaps
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
