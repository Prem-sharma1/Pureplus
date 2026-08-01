'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ShieldCheck, Zap, Headphones, Leaf, Award, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  initials: string;
}

const PUREPLUS_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: 'Aisha Mohammed',
    location: 'Hyderabad, Telangana',
    rating: 5,
    comment: 'The Pureplus Herbal Kesh Oil & Saffron Shampoo Bar transformed my hair routine. Hair fall reduced significantly within 3 weeks, and my hair feels naturally soft and clean.',
    initials: 'AM',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    comment: 'I tried the Pureplus Goat Milk Coffee Soap and Multani Mitti Facepack. My skin feels deeply cleansed, supple, and glowing every morning. 100% natural and gentle!',
    initials: 'PS',
  },
  {
    id: 3,
    name: 'Karan Talwar',
    location: 'New Delhi, Delhi',
    rating: 5,
    comment: 'Pureplus Hibiscus & Neem Shampoo Bar is fantastic! Rich lather without synthetic chemicals, zero plastic waste, and keeps my scalp fresh and dandruff-free.',
    initials: 'KT',
  },
  {
    id: 4,
    name: 'Swati Bhardwaj',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    comment: 'Extremely fast delivery and premium eco-friendly packaging. The Sandalwood Glow Soap leaves a subtle natural aroma and smooth hydration all day long.',
    initials: 'SB',
  },
  {
    id: 5,
    name: 'Ananya Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    comment: 'Pureplus Herbal Hair Wash Powder is a total game-changer. Authentic Ayurvedic ingredients, no harsh sulfates, and my hair volume has noticeably improved.',
    initials: 'AD',
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Secure Packaging' },
  { icon: Zap, label: 'Fast Dispatch' },
  { icon: Headphones, label: 'Responsive Support' },
  { icon: Leaf, label: 'Transparent Ingredients' },
  { icon: Award, label: 'Quality Checked' },
  { icon: CheckCircle2, label: 'ISO Certified' },
];

export default function CustomerReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PUREPLUS_REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % PUREPLUS_REVIEWS.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + PUREPLUS_REVIEWS.length) % PUREPLUS_REVIEWS.length);
  };

  const currentReview = PUREPLUS_REVIEWS[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-b border-forest/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Pill & Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-white border border-forest/15 rounded-full shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest/90">
              Real Customer Stories
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            What Our Community Says
          </h2>
        </div>

        {/* Central Review Card */}
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Navigation Arrows for desktop */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-forest/10 shadow-md text-forest hover:bg-forest hover:text-cream flex items-center justify-center transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Review"
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-forest/10 shadow-md text-forest hover:bg-forest hover:text-cream flex items-center justify-center transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* White Card Container */}
          <div className="bg-white rounded-3xl p-7 sm:p-12 shadow-xl shadow-forest/5 border border-forest/10 text-center relative min-h-[280px] flex flex-col justify-between">
            {/* Background Quote Mark */}
            <div className="absolute top-6 left-6 text-forest/15 font-serif text-6xl leading-none select-none pointer-events-none">
              <Quote className="w-12 h-12 opacity-30 text-forest" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="my-auto space-y-6"
              >
                {/* 5 Stars */}
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-sm sm:text-lg md:text-xl text-charcoal/90 leading-relaxed font-normal max-w-2xl mx-auto">
                  &ldquo;{currentReview.comment}&rdquo;
                </p>

                {/* Customer Details */}
                <div className="pt-2 flex items-center justify-center space-x-3.5">
                  <div className="w-11 h-11 rounded-full bg-forest text-cream font-bold text-sm flex items-center justify-center shadow-md flex-shrink-0">
                    {currentReview.initials}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center space-x-1 text-sm font-bold text-forest">
                      <span>{currentReview.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-charcoal/60 font-sans font-medium">
                      Customer Feedback • {currentReview.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {PUREPLUS_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoplay(false);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-forest rounded-full'
                    : 'w-2 h-2 bg-forest/20 hover:bg-forest/40 rounded-full'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Trust Badge Bar */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TRUST_BADGES.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-forest/10 rounded-2xl py-3.5 px-3 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2 text-[11px] sm:text-xs font-semibold text-forest"
                >
                  <IconComp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
