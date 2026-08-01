'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Leaf, Sparkles } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: '1. Are Pureplush products 100% natural?',
    answer: 'Pureplush products are made with carefully selected ingredients. Please check each product page and individual packaging label for the complete ingredient list and specific claims.'
  },
  {
    question: '2. Are Pureplush products suitable for all skin and hair types?',
    answer: 'Product suitability varies by individual skin and hair type. We recommend reviewing the ingredients on each product page and conducting a 24-hour patch test prior to full use.'
  },
  {
    question: '3. Are Pureplush products safe for sensitive skin?',
    answer: 'Our botanical formulations are designed for gentle regular care. If you have highly sensitive skin or known botanical allergies, please perform a 24-hour patch test on your inner arm before full application.'
  },
  {
    question: '4. How long does it take to see visible results?',
    answer: 'Experience varies by user and product. Focus on consistent use as directed; these are daily personal care products and not medical or treatment products.'
  },
  {
    question: '5. Can I use Pureplush products every day?',
    answer: 'Yes. Most Pureplush products (such as our soaps and solid shampoo bars) are designed for gentle daily routines. Please follow specific usage instructions on each product package for best results.'
  },
  {
    question: '6. Are Pureplush products cruelty-free & vegan?',
    answer: 'Pureplush is 100% Cruelty-Free. Our botanical powders, clay soaps, and shampoo bars are plant-based, while our Goat Milk soap range contains fresh farm goat milk (clearly labelled as Not Vegan).'
  },
  {
    question: '7. Why choose Pureplush for daily personal care?',
    answer: 'Pureplush combines traditional botanical inspiration with modern manufacturing standards to offer clear labelling, compact packaging, and practical daily care formulations.'
  },
  {
    question: '8. Are there any known side effects or allergen concerns?',
    answer: 'Pureplush products are generally well tolerated. However, individual sensitivities to botanical extracts can occur. If irritation occurs, discontinue use immediately and consult a healthcare provider.'
  },
  {
    question: '9. Do you offer Cash on Delivery (COD) and fast shipping across India?',
    answer: 'Yes. Cash on Delivery (COD) is available for serviceable pincodes across India alongside secure online payments. Standard orders are dispatched within 24-48 hours and delivered in 3–7 business days.'
  },
  {
    question: '10. What if I need assistance choosing the right product?',
    answer: 'Our product pages include full ingredient lists, directions, and product facts. You can also reach our customer support team at nexoratradingco1@gmail.com or call +91 84468 16247 for guidance.'
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
  subtitle = 'Everything you need to know about our natural formulations, ingredients, shipping, and usage',
  items = FAQ_DATA
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayItems = items && items.length > 0 ? items : FAQ_DATA;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-gradient-to-b from-cream-light via-cream to-cream-light border-t border-forest/5 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-wider mb-4 border border-forest/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
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
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-3 text-xs sm:text-sm md:text-base text-charcoal/85 leading-relaxed font-sans border-t border-forest/5 bg-cream/30">
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
