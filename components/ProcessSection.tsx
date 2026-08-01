'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { resolveImagePath } from '@/lib/imageUtils';

interface Step {
  id: number;
  title: string;
  shortDesc: string;
  image: string;
}

const PROCESS_STEPS: Step[] = [
  {
    id: 1,
    title: 'Ingredient Selection',
    shortDesc: 'Botanicals selected for freshness & aroma.',
    image: '/Crafted/Crafted1.jpeg',
  },
  {
    id: 2,
    title: 'Gentle Drying',
    shortDesc: 'Preserving natural colour & aroma.',
    image: '/Crafted/Crafted2.jpeg',
  },
  {
    id: 3,
    title: 'Fine Grinding',
    shortDesc: 'Usable texture for easy application.',
    image: '/Crafted/Crafted3.jpeg',
  },
  {
    id: 4,
    title: 'Small Batch Blending',
    shortDesc: 'Controlled batches for quality.',
    image: '/Crafted/Crafted4.svg',
  }
];

export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const activeStep = activeStepIndex !== null ? PROCESS_STEPS[activeStepIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStepIndex === null) return;
    setActiveStepIndex(activeStepIndex === 0 ? PROCESS_STEPS.length - 1 : activeStepIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStepIndex === null) return;
    setActiveStepIndex(activeStepIndex === PROCESS_STEPS.length - 1 ? 0 : activeStepIndex + 1);
  };

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
            Click any step image below to enlarge and view our authentic handcrafted process details.
          </p>
        </div>

        {/* 4 Process Cards with Lightbox trigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {PROCESS_STEPS.map((step, idx) => {
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setActiveStepIndex(idx)}
                className="w-full text-left p-5 bg-white border border-forest/10 rounded-2xl flex items-center space-x-5 shadow-sm hover:shadow-xl hover:border-forest/30 transition-all duration-300 group cursor-pointer relative"
              >
                {/* Image Badge replacing icon with Zoom indicator */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-forest/10 flex-shrink-0 shadow-sm bg-cream/30 relative">
                  <img
                    src={resolveImagePath(step.image)}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = step.image;
                    }}
                  />
                  <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                    <ZoomIn className="w-6 h-6 drop-shadow-md" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 block">
                    Step 0{step.id} • Click to Enlarge
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-forest font-serif mt-0.5 group-hover:text-emerald-800 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/65 mt-1 leading-relaxed">
                    {step.shortDesc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeStep && activeStepIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStepIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveStepIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-sm"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Left Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-sm shadow-lg"
                aria-label="Previous step image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Navigation Right Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-auto md:left-[55%] top-1/2 -translate-y-1/2 md:translate-x-12 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-sm shadow-lg"
                aria-label="Next step image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Preview Container */}
              <div className="w-full md:w-3/5 bg-neutral-900 p-4 flex items-center justify-center min-h-[300px] sm:min-h-[450px]">
                <img
                  src={resolveImagePath(activeStep.image)}
                  alt={activeStep.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = activeStep.image;
                  }}
                />
              </div>

              {/* Step Info Details Panel */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-cream/30">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/10 text-forest text-xs font-bold uppercase tracking-wider mb-4 border border-sage/20">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    Step 0{activeStep.id} of 04
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest mb-3">
                    {activeStep.title}
                  </h3>

                  <p className="text-charcoal/80 text-sm leading-relaxed mb-6 font-sans">
                    {activeStep.shortDesc}
                  </p>

                  <div className="space-y-3 border-t border-forest/10 pt-4 text-xs text-charcoal/70">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>100% Authentic Natural Process</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Handcrafted with Care &amp; Purity</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-forest/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal/40">
                    Image {activeStepIndex + 1} of {PROCESS_STEPS.length}
                  </span>
                  <button
                    onClick={() => setActiveStepIndex(null)}
                    className="px-5 py-2.5 rounded-full bg-forest text-cream text-xs font-bold uppercase tracking-wider hover:bg-forest-light transition-all"
                  >
                    Close Preview
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
