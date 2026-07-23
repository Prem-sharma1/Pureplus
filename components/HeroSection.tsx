'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CarouselSlide {
  id: number;
  image: string;
  link: string;
  alt: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
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

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleDotClick = (idx: number) => {
    setCurrentIdx(idx);
  };

  const activeSlide = CAROUSEL_SLIDES[currentIdx];

  return (
    <section 
      className="relative w-full overflow-hidden bg-white group h-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ghost spacer to establish natural banner aspect ratio height dynamically for Mobile, Tablet, PC & Laptop */}
      <div className="w-full relative z-0 select-none pointer-events-none block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CAROUSEL_SLIDES[0].image}
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
            <Link href={activeSlide.link} className="block w-full h-full relative cursor-pointer overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSlide.image}
                alt={activeSlide.alt}
                className="w-full h-full object-cover object-center scale-[1.13] transition-transform duration-500 select-none"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows (Reveal beautifully on hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-forest border border-forest/10 hover:border-forest/30 backdrop-blur-sm shadow-md transition-all duration-300 transform active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-forest border border-forest/10 hover:border-forest/30 backdrop-blur-sm shadow-md transition-all duration-300 transform active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Modern bottom dots indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2.5 bg-black/20 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-full">
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(idx)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 focus:outline-none ${
              currentIdx === idx 
                ? 'bg-gold w-4 sm:w-6' 
                : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
