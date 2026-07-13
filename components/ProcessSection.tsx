'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sun, Hammer, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  statLabel: string;
  statVal: string;
  icon: any;
  color: string;
}

const PROCESS_STEPS: Step[] = [
  {
    id: 1,
    title: 'Peak Sourcing',
    shortDesc: 'Hand-picked botanical harvest.',
    longDesc: 'We partner directly with certified organic micro-farms in the pristine Western Ghats of Uttara Kannada. Sourcing is done at peak dawn hours to ensure raw moringa leaves and herbs preserve maximum vital sap.',
    statLabel: 'Direct Partner Farms',
    statVal: '14 Local Farms',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 2,
    title: 'Natural Shade Drying',
    shortDesc: 'Slow moisture extraction.',
    longDesc: 'Instead of rapid industrial oven heating which destroys delicate enzymes, leaves are shade-dried on elevated bamboo platforms. This slow 48-hour extraction locks in bioactive nutrients.',
    statLabel: 'Bioactive Retention',
    statVal: '98.4% Potency',
    icon: Sun,
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 3,
    title: 'Granite Stone Grinding',
    shortDesc: 'Cold milling to fine powder.',
    longDesc: 'We avoid high-heat metal blenders. Sourced ingredients are cold-ground on traditional granite stone mills at less than 40 RPM, yielding ultra-fine microparticles for instant skin and cellular absorption.',
    statLabel: 'Grinding Temperature',
    statVal: 'Below 32°C',
    icon: Hammer,
    color: 'from-sage to-forest'
  },
  {
    id: 4,
    title: 'Treatise Blending',
    shortDesc: 'Small batch botanical recipes.',
    longDesc: 'Final apothecary blending is formulated strictly under traditional Ayurvedic treatises (Charaka Samhita). We seal each small, sterile batch with zero synthetic fillers, sulfates, or chemical preservatives.',
    statLabel: 'Chemical Fillers',
    statVal: '0% Synthetic',
    icon: ShieldCheck,
    color: 'from-[#4a773c] to-[#24481f]'
  }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);

  const activeData = PROCESS_STEPS.find(s => s.id === activeStep) || PROCESS_STEPS[0];
  const ActiveIcon = activeData.icon;

  return (
    <section className="py-24 bg-cream relative overflow-hidden border-t border-b border-forest/5">
      {/* Dynamic blurred backdrop behind active step */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage/5 filter blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sage flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Farm to Bottle</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-3">
            Our Ayurvedic Extraction Process
          </h2>
          <div className="w-12 h-1 bg-gold/50 mx-auto mt-4 rounded-full" />
          <p className="text-charcoal/70 mt-4 text-xs sm:text-sm">
            Learn how we transform raw wild harvest into premium, highly-absorbable apothecary remedies.
          </p>
        </div>

        {/* Process Showcase - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive Steps List Selector */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {PROCESS_STEPS.map((step) => {
              const isActive = step.id === activeStep;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start space-x-4 group shadow-sm focus:outline-none ${
                    isActive
                      ? 'bg-white border-forest/20 shadow-md translate-x-1'
                      : 'bg-white/50 border-forest/5 hover:border-forest/10 hover:bg-white/80'
                  }`}
                >
                  {/* Step Number & Icon badge */}
                  <div className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                    isActive ? 'bg-forest text-cream shadow-sm' : 'bg-forest/5 text-forest group-hover:bg-forest/10'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>

                  {/* Text descriptions */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40">
                        Step 0{step.id}
                      </span>
                      {isActive && (
                        <span className="text-[9px] bg-gold/15 text-forest-light font-bold px-2 py-0.5 rounded-full uppercase tracking-wider select-none animate-[pulse_2s_infinite]">
                          Active Step
                        </span>
                      )}
                    </div>
                    <h3 className={`text-md font-bold transition-colors ${
                      isActive ? 'text-forest' : 'text-charcoal group-hover:text-forest'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-charcoal/60 truncate mt-0.5">
                      {step.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Showcase Card Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white border border-forest/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between min-h-[400px] relative overflow-hidden"
              >
                {/* Micro decorative abstract corner background mesh */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr ${activeData.color} opacity-[0.04] rounded-full blur-2xl`} />

                <div>
                  {/* Large Icon & Header badge */}
                  <div className="flex items-center justify-between mb-8 border-b border-forest/5 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeData.color} text-white flex items-center justify-center shadow-md`}>
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sage-dark uppercase tracking-widest block">Apothecary Stage</span>
                        <h4 className="text-xl font-bold font-serif text-forest">{activeData.title}</h4>
                      </div>
                    </div>
                    <span className="text-4xl font-serif font-black italic text-forest/10 select-none">
                      0{activeData.id}
                    </span>
                  </div>

                  {/* Detailed paragraph */}
                  <p className="text-sm md:text-base text-charcoal/75 leading-relaxed font-sans text-left">
                    {activeData.longDesc}
                  </p>
                </div>

                {/* Sourcing Stats panel */}
                <div className="mt-8 pt-6 border-t border-forest/5 grid grid-cols-2 gap-4 bg-cream/40 p-5 rounded-2xl border border-forest/5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">Quality Metric</span>
                    <span className="text-sm font-bold text-forest mt-0.5 block">{activeData.statLabel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">Laboratory Value</span>
                    <span className="text-sm font-serif font-bold text-[#4a773c] mt-0.5 block flex items-center">
                      <Sparkles className="w-3.5 h-3.5 text-gold mr-1 animate-[spin_4s_linear_infinite]" />
                      <span>{activeData.statVal}</span>
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
