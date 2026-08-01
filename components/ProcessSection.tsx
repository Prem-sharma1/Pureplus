'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, Hammer, ShieldCheck, Sparkles } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  shortDesc: string;
  icon: any;
}

const PROCESS_STEPS: Step[] = [
  {
    id: 1,
    title: 'Ingredient Selection',
    shortDesc: 'Botanicals selected for freshness & aroma.',
    icon: Leaf,
  },
  {
    id: 2,
    title: 'Gentle Drying',
    shortDesc: 'Preserving natural colour & aroma.',
    icon: Sun,
  },
  {
    id: 3,
    title: 'Fine Grinding',
    shortDesc: 'Usable texture for easy application.',
    icon: Hammer,
  },
  {
    id: 4,
    title: 'Small Batch Blending',
    shortDesc: 'Controlled batches for quality.',
    icon: ShieldCheck,
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 sm:py-24 bg-cream relative overflow-hidden border-t border-b border-forest/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage/5 filter blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sage flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>From Botanical Sourcing to Thoughtful Formulation</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-3">
            How Pureplush Products Are Crafted
          </h2>
          <div className="w-12 h-1 bg-gold/50 mx-auto mt-4 rounded-full" />
          <p className="text-charcoal/70 mt-4 text-xs sm:text-sm leading-relaxed">
            See how carefully selected botanicals are cleaned, dried, ground and blended into convenient personal care and wellness products for modern daily routines.
          </p>
        </div>

        {/* 4 Process Cards - Preserving exact original horizontal card shape, 100% width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {PROCESS_STEPS.map((step, idx) => {
            const StepIcon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="w-full text-left p-5 bg-white border border-forest/10 rounded-2xl flex items-start space-x-4 shadow-sm hover:shadow-md hover:border-forest/20 transition-all duration-300"
              >
                {/* Icon badge */}
                <div className="p-3.5 rounded-xl bg-forest/5 text-forest flex-shrink-0">
                  <StepIcon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 block">
                    Step 0{step.id}
                  </span>
                  <h3 className="text-base font-bold text-forest font-serif mt-0.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal/65 mt-1 leading-relaxed">
                    {step.shortDesc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
