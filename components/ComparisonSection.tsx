'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, Sparkles, Leaf } from 'lucide-react';

export interface ComparisonRow {
  feature: string;
  pureplus: string;
  ordinary: string;
}

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Natural Herbal Ingredients',
    pureplus: 'Carefully selected herbal ingredients',
    ordinary: 'Often synthetic ingredients'
  },
  {
    feature: 'Sulfate Free (SLS/SLES)',
    pureplus: 'Yes',
    ordinary: 'Often included'
  },
  {
    feature: 'Paraben Free',
    pureplus: 'Yes',
    ordinary: 'May contain parabens'
  },
  {
    feature: 'Silicone Free',
    pureplus: 'Yes',
    ordinary: 'Commonly used'
  },
  {
    feature: 'Artificial Colors',
    pureplus: 'No',
    ordinary: 'Often added'
  },
  {
    feature: 'Gentle Daily Care',
    pureplus: 'Designed for regular use',
    ordinary: 'Varies by formulation'
  },
  {
    feature: 'Suitable for Men & Women',
    pureplus: 'Yes',
    ordinary: 'Usually yes'
  },
  {
    feature: 'Cruelty-Free',
    pureplus: 'Yes',
    ordinary: 'Depends on brand'
  },
  {
    feature: 'Inspired by Traditional Herbal Care',
    pureplus: 'Yes',
    ordinary: 'Generally no'
  },
  {
    feature: 'Eco-Friendly Powder Formula',
    pureplus: 'Less water & packaging waste',
    ordinary: 'Mostly liquid products'
  },
  {
    feature: 'Travel Friendly',
    pureplus: 'Lightweight powder',
    ordinary: 'Bulky bottles'
  },
  {
    feature: 'Concentrated Formula',
    pureplus: 'Mix only what you need',
    ordinary: 'Ready-to-use liquids'
  },
  {
    feature: 'No Harsh Foaming Agents',
    pureplus: 'Yes',
    ordinary: 'Often included'
  },
  {
    feature: 'Easy to Store',
    pureplus: 'Compact',
    ordinary: 'Larger bottles'
  },
  {
    feature: 'Made in India',
    pureplus: 'Proudly Made in India',
    ordinary: 'Varies by brand'
  }
];

interface ComparisonSectionProps {
  title?: string;
  subtitle?: string;
  fssaiBadge?: string;
  rows?: ComparisonRow[];
}

export default function ComparisonSection({
  title = 'Why Choose PurePlush?',
  subtitle = 'See the clear difference natural ingredients, eco-friendly formulas, and certified quality make for your daily care routine.',
  fssaiBadge = 'ISO 22716:2007 (QCCI/24C/SMX/4779)',
  rows = COMPARISON_DATA
}: ComparisonSectionProps) {
  const displayRows = rows && rows.length > 0 ? rows : COMPARISON_DATA;

  return (
    <section id="comparison" className="py-16 sm:py-24 bg-cream-light relative overflow-hidden">
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

            {/* Certification Badge */}
            <div className="flex-shrink-0">
              <div className="inline-flex items-center space-x-2 bg-sage text-forest-dark font-sans font-extrabold px-4.5 py-2.5 rounded-full text-xs sm:text-sm shadow-xl tracking-wide border border-sage-light/60">
                <ShieldCheck className="w-4 h-4 text-forest-dark" />
                <span>{fssaiBadge}</span>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="text-xs uppercase tracking-wider font-bold">
                  {/* Feature Header */}
                  <th className="py-4 px-6 bg-forest-dark/80 text-cream/90 w-4/12 border-b border-forest-light/20 font-sans pl-8">
                    Feature
                  </th>
                  
                  {/* PurePlush Header */}
                  <th className="py-4 px-6 bg-forest/90 text-sage-light w-4/12 border-b border-forest-light/20 font-sans">
                    <span className="flex items-center space-x-2 text-sm sm:text-base font-extrabold text-white">
                      <span className="w-5 h-5 rounded-full bg-sage text-forest-dark flex items-center justify-center text-xs font-black shadow-sm">
                        <Leaf className="w-3 h-3 fill-current" />
                      </span>
                      <span className="tracking-wide text-gold">PurePlush Herbal Care</span>
                    </span>
                  </th>

                  {/* Typical Chemical-Based Header */}
                  <th className="py-4 px-6 bg-[#042008]/90 text-cream/90 w-4/12 border-b border-forest-light/20 font-sans">
                    <span className="text-xs sm:text-sm font-bold tracking-wider text-rose-200/90 flex items-center space-x-1.5">
                      <X className="w-4 h-4 text-rose-400" />
                      <span>Typical Chemical-Based Products</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-light/15 text-xs sm:text-sm">
                {displayRows.map((row, index) => (
                  <tr key={index} className="hover:bg-forest-light/10 transition-colors">
                    {/* Feature Name */}
                    <td className="py-4.5 px-6 font-bold text-white bg-forest-dark/40 pl-8">
                      {row.feature}
                    </td>

                    {/* Pureplus Highlighted Value */}
                    <td className="py-4.5 px-6 bg-forest/30 font-semibold text-sage-light border-x border-forest-light/10">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-sage-light stroke-[3]" />
                        </div>
                        <span className="text-white font-bold text-sm">{row.pureplus}</span>
                      </div>
                    </td>

                    {/* Typical Chemical-Based Value */}
                    <td className="py-4.5 px-6 text-cream/90 font-medium bg-[#042008]/60">
                      <div className="flex items-center space-x-2.5">
                        <X className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 hidden sm:block" />
                        <span className="text-neutral-200">{row.ordinary}</span>
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
