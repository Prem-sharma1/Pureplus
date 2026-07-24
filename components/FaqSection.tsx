'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, CheckCircle2, Leaf } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'Are Pureplus products 100% natural and sugar-free?',
    answer: 'Pureplus products are crafted with carefully selected botanical ingredients, with zero refined sugars added in our wellness mixes. Every product formula is clearly labeled with transparent ingredients so you know exactly what goes into your body and onto your skin.'
  },
  {
    question: 'Are your malts and soaps safe for growing kids and elders?',
    answer: 'Yes! All Pureplus malts, soaps, powders, and shampoo bars are formulated with gentle, food-grade and botanical ingredients without harsh synthetic chemicals, making them safe and suitable for kids, adults, and elders.'
  },
  {
    question: 'Is Pureplus certified by ISO & GMP standards?',
    answer: 'Yes, Pureplus products (Saish Impex) adhere strictly to certified quality standards including ISO 22716:2007 Cosmetics - Good Manufacturing Practices (GMP) (Certificate No: QCCI/24C/SMX/4779) for consistent quality and safety.'
  },
  {
    question: 'How do I prepare Pureplus mixes?',
    answer: 'For wellness drinks and malts: Take 1-2 teaspoons or 1 serving as directed on the pack. Mix into warm water or milk, stir well, and serve. For facewash and facepack powders: Mix 1 teaspoon with water, rose water, or curd into a smooth paste, apply gently, leave for 5-10 minutes, and rinse thoroughly.'
  },
  {
    question: 'How does Free Shipping work on Pureplus orders?',
    answer: 'Free shipping is automatically applied at checkout on eligible standard orders across India. Orders are processed within 24-48 hours with real-time tracking updates sent directly to your phone and email.'
  },
  {
    question: 'What is the shelf life and storage instruction?',
    answer: 'Pureplus products have a shelf life of 12 to 24 months from the date of manufacturing. Store powder products and soaps in a cool, dry place away from direct sunlight, and keep containers airtight after opening.'
  },
  {
    question: 'Are Pureplus products Ayurvedic or medicines?',
    answer: 'Our products are inspired by traditional Indian botanical recipes for daily personal care and wellness routines. They are non-prescription personal care and food products, not intended to diagnose, treat, cure, or prevent medical conditions.'
  }
];

interface FaqSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

export default function FaqSection({
  badge = 'CUSTOMER HELP & SUPPORT',
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our pure botanical blends, certifications, preparation, and delivery',
  items = FAQ_DATA
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayItems = items && items.length > 0 ? items : FAQ_DATA;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-cream-light via-cream to-cream-light border-t border-forest/5 relative overflow-hidden">
      {/* Soft botanical leaf glows in background */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-wider mb-4 border border-forest/15 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-gold" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest tracking-tight">
            {title}
          </h2>

          <div className="w-20 h-1 bg-gold/60 mx-auto mt-4 rounded-full" />

          <p className="text-charcoal/70 text-xs sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {displayItems.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                  isOpen
                    ? 'border-l-4 border-l-gold border-forest/20 shadow-md'
                    : 'border-forest/10 hover:border-forest/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none focus:bg-cream/30 transition-colors group"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <div className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                      isOpen ? 'bg-forest text-gold' : 'bg-forest/5 text-forest group-hover:bg-forest/10'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-serif text-sm sm:text-base md:text-lg font-bold text-forest group-hover:text-forest-light transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-full transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-forest text-cream' : 'bg-cream text-forest group-hover:bg-forest/10'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-3 text-xs sm:text-sm md:text-base text-charcoal/80 leading-relaxed font-sans border-t border-forest/5 bg-cream/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
