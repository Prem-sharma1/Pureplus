'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    title: 'SHAMPOO BARS',
    subtitle: 'Shampoo Bars - Solid, Travel-Friendly Hair Cleansers',
    image: '/Categoryimg/Category2.jpeg',
    link: '/category/shampoo',
  },
  {
    id: 2,
    title: 'HANDCRAFTED SOAPS',
    subtitle: 'Handcrafted Soaps - Daily Bath & Body Care',
    image: '/Categoryimg/Category1.jpeg',
    link: '/category/soaps',
  },
  {
    id: 3,
    title: 'HERBAL POWDERS',
    subtitle: 'Herbal Powders - Face, Hair & Wellness Care',
    image: '/Categoryimg/Category3.jpeg',
    link: '/category/powders',
  },
  {
    id: 4,
    title: 'SKINCARE & GELS',
    subtitle: 'Skincare & Gels - Soothing Oils & Botanical Care',
    image: '/Keshoil/keshwoman.jpeg',
    link: '/category/others',
  },
];

export default function CategorySection() {
  return (
    <section id="categories" className="w-full bg-[#1c120c] text-white py-12 md:py-16 relative overflow-hidden">
      {/* 4 Columns with Identical Square Image Frames & Equal Spacing */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {categories.map((category, index) => (
          <Link key={category.id} href={category.link} className="block group h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-between h-full cursor-pointer"
            >
              {/* Perfectly Identical Square Image Box for All Categories */}
              <div className="w-full aspect-square max-w-[320px] sm:max-w-[360px] overflow-hidden bg-[#241710] flex items-center justify-center p-0 mb-8 border border-white/10 group-hover:border-gold/40 transition-colors shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Title & Subtitle & Button Aligned at Identical Vertical Baselines */}
              <div className="flex flex-col items-center text-center w-full mt-auto">
                <h3 className="font-serif text-base sm:text-lg md:text-xl font-light tracking-[0.2em] text-white uppercase mb-1 leading-snug max-w-[260px] flex items-center justify-center">
                  {category.title}
                </h3>
                <p className="text-[11px] text-cream/70 font-sans mb-4 max-w-[260px] line-clamp-2 min-h-[32px]">
                  {category.subtitle}
                </p>

                <div className="bg-white text-black px-6 py-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-forest group-hover:text-white shadow-2xl text-center w-full max-w-[160px] font-sans">
                  VIEW PRODUCTS
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

