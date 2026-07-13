'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Herbal Skin & Hair Care Powder',
    label: 'Herbal Skin and Hair Care Powder',
    tag: 'pureplush',
    image: '6330345451856531101.jpg',
    bgGrad: 'from-emerald-50/50 via-sage-light/20 to-cream-light/30',
    link: '/category/moringa',
  },
  {
    id: 2,
    title: 'Handcrafted Premium Soaps',
    label: 'Handcrafted Premium Soaps',
    tag: 'pureplush',
    image: '6330345451856531102.jpg',
    bgGrad: 'from-amber-50/40 via-cream/20 to-cream-light/30',
    link: '/category/soaps',
  },
  {
    id: 3,
    title: 'Luxury Shampoo Bars',
    label: 'Luxury Shampoo Bars',
    tag: 'pureplush',
    image: '6330345451856531103.jpg',
    bgGrad: 'from-blue-50/30 via-sage-light/10 to-cream-light/30',
    link: '/category/shampoo',
  },
  {
    id: 4,
    title: 'Other Products',
    label: 'others',
    tag: 'pureplush',
    image: '6330345451856531104.jpg',
    bgGrad: 'from-orange-50/30 via-cream/10 to-cream-light/30',
    link: '/category/others',
  },
];

export default function CategorySection() {
  const handleCategoryClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section id="categories" className="py-24 bg-cream-light border-b border-forest/5 relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-sage flex items-center justify-center space-x-1.5"
          >
            <Leaf className="w-3.5 h-3.5 text-gold" />
            <span>Our Offerings</span>
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-3"
          >
            Shop by Ayurvedic Category
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-gold/50 mx-auto mt-4 rounded-full" 
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-charcoal/70 mt-4 text-xs sm:text-sm"
          >
            Explore our curated collections of botanical remedies. Handcrafted locally with pure, natural potency.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.link)}
              className="flex flex-col space-y-4 cursor-pointer group"
            >
              {/* Card Container - Shadcn UI glassmorphism style */}
              <div 
                className={`relative w-full aspect-square bg-gradient-to-b ${category.bgGrad} border border-forest/10 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:border-forest/25 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden backdrop-blur-sm bg-white/70`}
              >
                {/* Subtle top inner glow highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                {/* Card Top: Brand tag & Green badge */}
                <div className="flex flex-col items-center text-center space-y-2 z-10">
                  <span className="font-serif italic text-sm tracking-wide text-forest/70 font-semibold leading-none">
                    {category.tag}
                  </span>
                  
                  {/* Rounded capsule badge with green background */}
                  <span className="bg-[#4a773c] text-white text-[9px] font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm select-none">
                    {category.title}
                  </span>
                </div>

                {/* Card Center: Squared Product Image */}
                <div className="relative flex-grow flex items-center justify-center mt-3 mb-2 overflow-hidden rounded-xl border border-forest/5 bg-white shadow-inner z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/uploads/${category.image}`}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=300&auto=format&fit=crop';
                    }}
                  />
                  {/* Glass shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                </div>
              </div>

              {/* Outside Caption Label */}
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm sm:text-md font-semibold text-charcoal/90 truncate group-hover:text-forest transition-colors font-sans">
                  {category.label}
                </h3>
                <div className="w-6 h-6 rounded-full bg-forest/0 group-hover:bg-forest/5 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-forest group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
