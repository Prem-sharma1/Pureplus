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
    question: '1. Are PurePlush products 100% natural?',
    answer: 'Yes. PurePlush products are made using carefully selected herbal and naturally derived ingredients. They are free from harsh chemicals such as parabens, sulfates (SLS/SLES), silicones, and artificial colors, making them a gentler choice for your skin and hair.'
  },
  {
    question: '2. Are PurePlush products suitable for all skin and hair types?',
    answer: 'Yes. Our products are formulated for most skin and hair types, including normal, oily, dry, and combination skin. Since every individual is different, we recommend performing a patch test before first use.'
  },
  {
    question: '3. Are PurePlush products safe for sensitive skin?',
    answer: 'Our herbal formulations are designed to be gentle on the skin. However, if you have highly sensitive skin or known allergies, we recommend a patch test 24 hours before use.'
  },
  {
    question: '4. How long does it take to see visible results?',
    answer: 'Results vary depending on the individual and consistent usage. Many customers notice improvements within 3–6 weeks when used regularly as directed.'
  },
  {
    question: '5. Can I use PurePlush products every day?',
    answer: 'Yes. Most PurePlush products are gentle enough for daily use. Please follow the usage instructions mentioned on each product for the best results.'
  },
  {
    question: '6. Are PurePlush products cruelty-free?',
    answer: 'Yes. PurePlush products are cruelty-free, and we do not test our products on animals.'
  },
  {
    question: '7. Why should I choose PurePlush over other herbal brands?',
    answer: 'PurePlush combines traditional herbal ingredients with modern manufacturing standards to create high-quality personal care products that are gentle, effective, and free from harsh chemicals. Our focus is on natural care, quality ingredients, and customer satisfaction.'
  },
  {
    question: '8. Are there any side effects?',
    answer: 'PurePlush products are made with herbal ingredients and are generally well tolerated. However, as with any skincare or haircare product, individual reactions may vary. If irritation occurs, discontinue use and consult a healthcare professional if needed.'
  },
  {
    question: '9. Do you offer Cash on Delivery (COD) and fast shipping?',
    answer: 'Yes. We offer Cash on Delivery (where available) along with secure online payment options. Most orders are delivered within 3–7 business days, depending on your location.'
  },
  {
    question: '10. What if I\'m not sure which PurePlush product is right for me?',
    answer: 'Our product pages include detailed information about ingredients, benefits, and usage to help you choose. If you still need assistance, our customer support team will be happy to recommend the best PurePlush product based on your needs.'
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
