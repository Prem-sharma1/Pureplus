'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, Sparkles, Leaf } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  pureplus: string;
  ordinary: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Ingredient Sourcing',
    pureplus: '100% Pure & Wild-Crafted',
    ordinary: 'Synthetic & Industrial Solvents'
  },
  {
    feature: 'Added Refined Sugars',
    pureplus: 'ZERO Refined Sugar',
    ordinary: 'Up to 60% Refined Sugar / Maltodextrin'
  },
  {
    feature: 'Grains & Processing',
    pureplus: 'Sprouted Millets & Raw Cocoa',
    ordinary: 'Processed Wheat Flour & Artificial Flavors'
  },
  {
    feature: 'Quality Certification',
    pureplus: 'ISO 22716:2007 (GMP Certified)',
    ordinary: 'Basic Commercial Standards'
  },
  {
    feature: 'Preservatives & Additives',
    pureplus: '100% Chemical-Free',
    ordinary: 'Artificial Colors & Chemical Preservatives'
  }
];

interface ComparisonSectionProps {
  title?: string;
  subtitle?: string;
  fssaiBadge?: string;
  rows?: ComparisonRow[];
}

export default function ComparisonSection({
  title = 'Pureplus vs. Ordinary Market Products',
  subtitle = 'See the difference natural ingredients and certified quality make for your daily care routine.',
  fssaiBadge = 'ISO 22716:2007 (QCCI/24C/SMX/4779)',
  rows = COMPARISON_DATA
}: ComparisonSectionProps) {
  const displayRows = rows && rows.length > 0 ? rows : COMPARISON_DATA;

  return (
    <section className="py-16 sm:py-24 bg-cream-light relative overflow-hidden">
      {/* Decorative background ambient glows matching logo leaf colors */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[450px] h-[450px] bg-forest/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card Container styled in Pureplus Signature Forest Green & Gold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-forest-dark via-forest to-[#052d0b] rounded-3xl overflow-hidden shadow-2xl border border-forest-light/30 text-cream"
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-forest-light/20 bg-forest-dark/40 backdrop-blur-md">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gold font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  Standard of Excellence
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                {title}
              </h2>
              <p className="text-sage-light text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* FSSAI Registration Badge matching vibrant leaf green logo accent */}
            <div className="flex-shrink-0">
              <div className="inline-flex items-center space-x-2 bg-sage text-forest-dark font-sans font-extrabold px-4.5 py-2.5 rounded-full text-xs sm:text-sm shadow-xl tracking-wide border border-sage-light/60">
                <ShieldCheck className="w-4 h-4 text-forest-dark" />
                <span>{fssaiBadge}</span>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="text-xs uppercase tracking-wider font-bold">
                  {/* Feature Header */}
                  <th className="py-4 px-6 bg-forest-dark/80 text-cream/70 w-1/4 border-b border-forest-light/20 font-sans">
                    Feature
                  </th>
                  
                  {/* Pureplus Header matching Logo Green */}
                  <th className="py-4 px-6 bg-forest/90 text-sage-light w-5/12 border-b border-forest-light/20 font-sans">
                    <span className="flex items-center space-x-2 text-sm sm:text-base font-extrabold text-white">
                      <span className="w-5 h-5 rounded-full bg-sage text-forest-dark flex items-center justify-center text-xs font-black shadow-sm">
                        <Leaf className="w-3 h-3 fill-current" />
                      </span>
                      <span className="tracking-wide text-gold">PUREPLUS WELLNESS</span>
                    </span>
                  </th>

                  {/* Ordinary Header */}
                  <th className="py-4 px-6 bg-[#042008]/80 text-sage-light/60 w-5/12 border-b border-forest-light/20 font-sans">
                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-sage-light/60">
                      ORDINARY MARKET DRINKS
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-light/15 text-xs sm:text-sm">
                {displayRows.map((row, index) => (
                  <tr key={index} className="hover:bg-forest-light/10 transition-colors">
                    {/* Feature Name */}
                    <td className="py-5 px-6 font-bold text-white bg-forest-dark/40">
                      {row.feature}
                    </td>

                    {/* Pureplus Highlighted Value */}
                    <td className="py-5 px-6 bg-forest/30 font-semibold text-sage-light border-x border-forest-light/10">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-sage-light stroke-[3]" />
                        </div>
                        <span className="text-white font-bold text-sm">{row.pureplus}</span>
                      </div>
                    </td>

                    {/* Ordinary Market Value */}
                    <td className="py-5 px-6 text-sage-light/70 font-normal bg-[#042008]/40">
                      <div className="flex items-center space-x-2.5">
                        <X className="w-3.5 h-3.5 text-rose-400/80 flex-shrink-0 hidden sm:block" />
                        <span>{row.ordinary}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
