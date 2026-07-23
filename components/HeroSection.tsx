'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { resolveImagePath } from '@/lib/imageUtils';

// 1. DESKTOP HERO SLIDES (4 PRODUCTS - 100% UNCHANGED)
interface DesktopSlide {
  id: number;
  image: string;
  link: string;
  alt: string;
}

const DESKTOP_SLIDES: DesktopSlide[] = [
  {
    id: 1,
    image: "/uploads/HeaderImage/First.jpeg",
    link: "/product/26",
    alt: "Pureplush Herbal Waxing Powder"
  },
  {
    id: 2,
    image: "/uploads/HeaderImage/header3.jpeg",
    link: "/product/109",
    alt: "Pureplush Goatmilk Coffee D Tan Soap"
  },
  {
    id: 3,
    image: "/uploads/HeaderImage/third.jpeg",
    link: "/product/108",
    alt: "Pureplush Herbal Facepack"
  },
  {
    id: 4,
    image: "/uploads/HeaderImage/header4.jpeg",
    link: "/product/107",
    alt: "Pureplush Hibiscus Neemtulsi Shampoo Bar"
  }
];

// 2. MOBILE HERO SLIDES (CLEAN STABLE HERO BACKGROUND WITH PRODUCT-SPECIFIC INGREDIENT GLOWS)
interface MobileSlide {
  id: number;
  badge: string;
  headline: string;
  subHeadline: string;
  description: string;
  image: string;
  link: string;
  badgeStyle: string;
  ingredientGlow: string;
}

const MOBILE_SLIDES: MobileSlide[] = [
  {
    id: 1,
    badge: "✨ REAL KASHMIRI SAFFRON & MULTANI MITTI CLAY",
    headline: "Scalp Cleansing & Saffron Shine",
    subHeadline: "Multani Mitti Saffron Shampoo Bar",
    description: "Rich in natural Saffron extracts and oil-absorbing Multani Mitti clay. Gently cleanses grease while adding natural shine to hair shafts.",
    image: "multanimittishampoo/Shampoobar2.png",
    link: "/product/104",
    badgeStyle: "bg-amber-50 border-amber-200 text-amber-700",
    ingredientGlow: "from-amber-300/40 via-yellow-200/25 to-transparent"
  },
  {
    id: 2,
    badge: "☕ ROASTED COFFEE BEANS & FRESH GOAT MILK",
    headline: "Exfoliating Coffee Scrub",
    subHeadline: "Goatmilk Coffee D-Tan Soap",
    description: "Enriched with roasted Arabica coffee grounds and raw farm goat milk. Scrubs off dead skin cells, extracts tan, and leaves skin soft.",
    image: "CoffeeD/new1.png",
    link: "/product/109",
    badgeStyle: "bg-amber-100/70 border-amber-300 text-amber-800",
    ingredientGlow: "from-amber-900/20 via-amber-700/15 to-transparent"
  },
  {
    id: 3,
    badge: "🥭 ORGANIC MANGO BUTTER & PURIFYING MUD",
    headline: "Nourishing Sea Clay Mud",
    subHeadline: "Mango Butter Mud Sea Clay Soap",
    description: "Combines raw organic mango butter moisturizers with nutrient-dense sea clay mud to draw out pore impurities while hydrating deeply.",
    image: "MangoButter/Soap.png",
    link: "/product/101",
    badgeStyle: "bg-yellow-50 border-yellow-200 text-yellow-700",
    ingredientGlow: "from-yellow-400/35 via-amber-300/25 to-transparent"
  },
  {
    id: 4,
    badge: "🌿 100% ORGANIC SPROUTED BOTANICALS",
    headline: "Pain-Free Herbal Care",
    subHeadline: "Pureplush Herbal Waxing Powder",
    description: "Handcrafted with sprouted organic herbs to gently dissolve unwanted hair without pain, irritation, or harsh synthetic chemicals.",
    image: "uploads/Herbal2.png",
    link: "/product/26",
    badgeStyle: "bg-emerald-50 border-emerald-200 text-emerald-700",
    ingredientGlow: "from-emerald-400/35 via-green-300/25 to-transparent"
  }
];

const SLIDE_DURATION = 5000;

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % 4);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % 4);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + 4) % 4);
  };

  const desktopSlide = DESKTOP_SLIDES[currentIdx];
  const mobileSlide = MOBILE_SLIDES[currentIdx];

  return (
    <>
      {/* ==================================================================================== */}
      {/* 1. BIG & MEDIUM SCREEN HERO VIEW (hidden md:block) - ORIGINAL HERO (100% UNCHANGED)  */}
      {/* ==================================================================================== */}
      <section 
        className="hidden md:block relative w-full overflow-hidden bg-white group h-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Ghost spacer for natural dynamic aspect ratio */}
        <div className="w-full relative z-0 select-none pointer-events-none block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DESKTOP_SLIDES[0].image}
            alt="ghost-spacer"
            className="w-full h-auto opacity-0 block select-none pointer-events-none"
          />
        </div>

        {/* Active Slides Container */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center overflow-hidden"
            >
              <Link href={desktopSlide.link} className="block w-full h-full relative cursor-pointer overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={desktopSlide.image}
                  alt={desktopSlide.alt}
                  className="w-full h-full object-contain object-center transition-transform duration-500 select-none"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-forest border border-forest/10 hover:border-forest/30 backdrop-blur-sm shadow-md transition-all duration-300 transform active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Desktop Right Navigation Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-forest border border-forest/10 hover:border-forest/30 backdrop-blur-sm shadow-md transition-all duration-300 transform active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Desktop Bottom Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5 bg-black/20 backdrop-blur-md px-3.5 py-2 rounded-full">
          {DESKTOP_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                currentIdx === idx 
                  ? 'bg-gold w-6' 
                  : 'bg-white/60 hover:bg-white w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==================================================================================== */}
      {/* 2. SMALL MOBILE SCREEN HERO VIEW (block md:hidden) - SCREENSHOT DESIGN WITH GLOWS    */}
      {/* ==================================================================================== */}
      <section 
        className="block md:hidden relative w-full bg-[#fbf9f4] text-charcoal pt-24 pb-12 px-4 overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full Section Left Prev Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-charcoal shadow-xl border border-neutral-200/90 flex items-center justify-center active:scale-95 hover:bg-forest hover:text-white transition-all"
          aria-label="Previous Product"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Full Section Right Next Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-charcoal shadow-xl border border-neutral-200/90 flex items-center justify-center active:scale-95 hover:bg-forest hover:text-white transition-all"
          aria-label="Next Product"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="max-w-md mx-auto text-center flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center w-full"
            >
              {/* Top Dynamic Product Ingredient Badge */}
              <div className={`inline-flex items-center space-x-1.5 border px-3.5 py-1.5 rounded-full shadow-xs mb-4 ${mobileSlide.badgeStyle}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  {mobileSlide.badge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl font-serif font-bold text-forest tracking-tight leading-tight">
                {mobileSlide.headline}
              </h1>

              {/* Sub-headline */}
              <h2 className="text-lg font-serif text-charcoal/80 mt-1 font-medium">
                {mobileSlide.subHeadline}
              </h2>

              {/* Description */}
              <p className="text-xs text-charcoal/70 max-w-xs mx-auto mt-3 leading-relaxed font-sans">
                {mobileSlide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col space-y-2.5 mt-6 w-full px-2">
                <Link
                  href={mobileSlide.link}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>SHOP BEST SELLERS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/#about"
                  className="w-full py-3 bg-white border border-charcoal/20 text-charcoal rounded-full text-xs font-bold uppercase tracking-wider transition-all text-center"
                >
                  <span>OUR SCIENCE & PURITY</span>
                </Link>
              </div>

              {/* Mobile Product Image Showcase (With Product-Specific Ingredient Glow Accent) */}
              <div className="relative w-full mt-8">
                <Link href={mobileSlide.link} className="block w-full flex items-center justify-center relative">
                  {/* Dynamic Product Ingredient Background Glow Ring */}
                  <div className={`absolute inset-0 w-80 h-80 mx-auto rounded-full bg-gradient-to-tr ${mobileSlide.ingredientGlow} filter blur-2xl pointer-events-none -z-10`} />

                  <div className="w-full h-80 sm:h-[400px] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImagePath(mobileSlide.image)}
                      alt={mobileSlide.subHeadline}
                      className="max-w-full max-h-full object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Dots */}
                <div className="flex items-center justify-center space-x-1.5 mt-4">
                  {MOBILE_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIdx === idx ? 'w-6 bg-blue-600' : 'w-1.5 bg-charcoal/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
