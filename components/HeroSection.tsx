'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface SlideItem {
  id: number;
  product_name: string;
  brief_details: string;
  product_price: string;
  image1: string;
  product_category: string;
}

const FEATURED_FALLBACK: SlideItem[] = [
  {
    id: 26,
    product_name: 'ABC Latte Mix(Malt) Powder',
    brief_details: 'Wholesome blend of Apple, Beetroot, and Carrot with natural malt for an energizing health drink.',
    product_price: '199.00',
    image1: 'FaceWash/Herbal2.png',
    product_category: 'Moringa Powders'
  },
  {
    id: 28,
    product_name: 'Choco Multigrain Millet Malt Mix',
    brief_details: 'A delicious and nutritious blend of wholesome millets, grains, and natural cocoa, crafted for strength and taste.',
    product_price: '199.00',
    image1: 'FaceWash/Herbal3.png',
    product_category: 'Moringa Powders'
  },
  {
    id: 101,
    product_name: 'Vedic Neem & Turmeric Soap',
    brief_details: 'Handcrafted soap with fresh neem extracts and wild turmeric root oil for daily skin defense.',
    product_price: '120.00',
    image1: 'Soap/Soap.png',
    product_category: 'Natural Soaps'
  },
  {
    id: 104,
    product_name: 'Rosemary & Tea Tree Shampoo Bar',
    brief_details: 'Luxurious solid shampoo bar with rosemary and tea tree oil to reduce dandruff and strengthen hair.',
    product_price: '220.00',
    image1: 'Shampoobar/Shampoobar.png',
    product_category: 'Shampoo Bars'
  }
];

// Magic UI Spotlight SVG Component
function Spotlight({ className = '', fill = 'white' }: { className?: string; fill?: string }) {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter-spotlight)">
        <ellipse
          cx="1924.57"
          cy="273.89"
          rx="1924.57"
          ry="273.89"
          transform="matrix(-0.822377 -0.568943 0.568943 -0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.22"
        />
      </g>
      <defs>
        <filter
          id="filter-spotlight"
          x="0.860352"
          y="-893.87"
          width="3788.16"
          height="3788.16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}

export default function HeroSection() {
  const [slides, setSlides] = useState<SlideItem[]>(FEATURED_FALLBACK);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    async function getFeaturedProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          const filtered = data.products
            .filter((p: any) => {
              const catKey = (p.product_category || '').toLowerCase().trim();
              return catKey !== 'others' && catKey !== 'wellness' && p.id !== 102;
            })
            .map((p: any) => {
              let catName = p.product_category || 'Wellness';
              let catKey = catName.toLowerCase().trim();
              if (catKey === 'abc malt' || catKey === 'choco' || catKey === 'moringa') {
                catName = 'Moringa Powders';
              } else if (catKey === 'soap' || catKey === 'soaps') {
                catName = 'Natural Soaps';
              } else if (catKey === 'shampoo' || catKey === 'shampoos') {
                catName = 'Shampoo Bars';
              }
              return {
                id: p.id,
                product_name: p.product_name,
                brief_details: p.brief_details || (p.product_details.slice(0, 115) + '...'),
                product_price: p.product_price,
                image1: p.image1,
                product_category: catName
              };
            })
            .slice(0, 5);

          if (filtered.length > 0) {
            setSlides(filtered);
          }
        }
      } catch (err) {
        console.warn('API error fetching hero products. Using fallbacks.');
      }
    }
    getFeaturedProducts();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentIdx] || FEATURED_FALLBACK[0];

  const getImagePath = (img?: string) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:')) return img;
    return `/uploads/${img}`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream/25 via-cream to-cream-light py-12 md:py-20 lg:py-24">
      {/* CSS Keyframes for Mesh Drift, Spotlights, and Shiny Text */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spotlight {
          0% {
            opacity: 0;
            transform: translate(-3%, -18%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -62%) scale(1);
          }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes drift-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(80px, -50px) scale(1.15); }
          100% { transform: translate(-30px, 40px) scale(0.9); }
        }
        @keyframes drift-2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-60px, 70px) scale(0.85); }
          100% { transform: translate(50px, -40px) scale(1.1); }
        }
        @keyframes drift-3 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.2); }
          100% { transform: translate(-50px, -60px) scale(0.95); }
        }
        @keyframes aura-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); filter: blur(130px); }
          50% { opacity: 0.85; transform: scale(1.18); filter: blur(100px); }
        }
        .animate-spotlight {
          animation: spotlight 2s ease .75s 1 forwards;
        }
        .animate-shiny-text {
          background: linear-gradient(120deg, rgba(74, 119, 60, 0.45) 30%, rgba(74, 119, 60, 1) 50%, rgba(74, 119, 60, 0.45) 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 6s linear infinite;
        }
        .animate-aura-pulse {
          animation: aura-pulse 9s infinite alternate ease-in-out;
        }
        .mesh-circle-1 { animation: drift-1 25s infinite alternate ease-in-out; }
        .mesh-circle-2 { animation: drift-2 30s infinite alternate ease-in-out; }
        .mesh-circle-3 { animation: drift-3 20s infinite alternate ease-in-out; }
      ` }} />

      {/* Magic UI Spotlight effect sweeping down the hero page */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#a27b38" />

      {/* Animated Mesh Backdrops & Lightning Glows (Slow-shifting background colors) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full bg-sage/20 filter blur-3xl mesh-circle-1 opacity-70" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-forest/10 filter blur-3xl mesh-circle-2 opacity-60" />
        <div className="absolute top-[40%] left-[45%] w-72 h-72 rounded-full bg-gold/15 filter blur-3xl mesh-circle-3 opacity-55" />
        
        {/* Background Lightening Aurora Blob */}
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gold/15 to-emerald-500/10 blur-[130px] animate-aura-pulse pointer-events-none" />
      </div>

      {/* Decorative Floating Leaves (SVG) */}
      <div className="absolute top-10 left-[5%] w-16 h-16 opacity-20 pointer-events-none leaf-animate-1 z-10">
        <Leaf className="w-full h-full text-forest" />
      </div>
      <div className="absolute bottom-12 right-[8%] w-24 h-24 opacity-15 pointer-events-none leaf-animate-2 z-10">
        <Leaf className="w-full h-full text-sage rotate-45" />
      </div>
      <div className="absolute top-1/3 right-[12%] w-12 h-12 opacity-10 pointer-events-none leaf-animate-3 z-10">
        <Leaf className="w-full h-full text-gold -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Slider */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col space-y-5 items-start"
              >
                {/* Shiny text animation applied to the category tag */}
                <div className="inline-flex items-center space-x-2 bg-forest/5 border border-forest/10 px-3.5 py-1.5 rounded-full shadow-sm">
                  <Sparkles className="w-4 h-4 text-gold animate-[pulse_2s_infinite]" />
                  <span className="text-xs font-bold tracking-wider uppercase font-sans animate-shiny-text">
                    {activeSlide.product_category || 'Pureplush Ayurveda'}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest leading-[1.12]">
                  {activeSlide.product_name.replace(/\(.*?\)/g, '').split(/\s+/).slice(0, 3).join(' ')}
                </h1>

                <p className="text-sm md:text-base text-charcoal/70 max-w-xl leading-relaxed text-left">
                  {activeSlide.brief_details}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
                  <Link
                    href={`/product/${activeSlide.id}`}
                    className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-forest hover:bg-forest-light text-cream rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-forest/10 transition-all duration-300 transform hover:-translate-y-0.5 group text-sm font-sans z-20"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-white border border-forest/10 hover:border-forest/35 text-forest rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm font-sans z-20"
                  >
                    <span>Explore Products</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators / pill lines */}
            {slides.length > 1 && (
              <div className="flex space-x-3 mt-8">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className="group relative py-2 focus:outline-none"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div className="h-[3px] rounded-full transition-all duration-500 bg-forest/10 w-8 group-hover:bg-forest/30 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-forest transition-all duration-500 ${
                          currentIdx === idx ? 'w-full' : 'w-0'
                        }`} 
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="relative w-80 h-80 sm:w-96 sm:h-96 z-10"
            >
              {/* Outer decorative gold ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
              
              {/* Inner glowing forest green circle containing only the product image */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-forest to-forest-light shadow-2xl overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 text-center text-cream border border-forest/10">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="z-10 flex items-center justify-center w-full h-full animate-[float_6s_ease-in-out_infinite]"
                  >
                    {activeSlide.image1 ? (
                      <img
                        src={getImagePath(activeSlide.image1)}
                        alt={activeSlide.product_name}
                        className="w-[82%] h-[82%] sm:w-[86%] h-[86%] sm:h-[86%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                      />
                    ) : (
                      <Leaf className="w-28 h-28 text-gold animate-[pulse_3s_infinite]" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating tags */}
              <div className="absolute top-16 -left-6 z-25 bg-cream border border-forest/10 text-forest text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg select-none hover:scale-105 transition-transform">
                {activeSlide.product_category || 'Ayurvedic'}
              </div>
              <div className="absolute bottom-20 -right-6 z-25 bg-gold text-forest text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg select-none hover:scale-105 transition-transform">
                100% Organic
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Bottom Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16 pt-8 border-t border-forest/10 hidden md:block">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 text-charcoal/80">
            <ShieldCheck className="w-6 h-6 text-sage flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block text-forest">Lab Tested Remedies</span>
              <span className="text-[10px] text-charcoal/50">Clinically clean botanical purity</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-charcoal/80">
            <Leaf className="w-6 h-6 text-sage flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block text-forest">Vegan & Organic</span>
              <span className="text-[10px] text-charcoal/50">Zero chemical toxins or fillers</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-charcoal/80">
            <Sparkles className="w-6 h-6 text-sage flex-shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block text-forest">100% Cruelty-Free</span>
              <span className="text-[10px] text-charcoal/50">Safely handcrafted locally</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
