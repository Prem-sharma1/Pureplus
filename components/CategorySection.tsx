'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Herbal Skin & Hair Care Powder',
    label: 'Herbal Skin and Hair Care Powder',
    tag: 'pureplush',
    image: '6330345451856531101.jpg',
    bgGrad: 'from-[#f4f8f3] to-[#eaf2e8]',
    link: '/category/moringa',
  },
  {
    id: 2,
    title: 'Handcrafted Premium Soaps',
    label: 'Handcrafted Premium Soaps',
    tag: 'pureplush',
    image: '6330345451856531102.jpg',
    bgGrad: 'from-[#fdfbf7] to-[#FAF0E6]',
    link: '/category/soaps',
  },
  {
    id: 3,
    title: 'Luxury Shampoo Bars',
    label: 'Luxury Shampoo Bars',
    tag: 'pureplush',
    image: '6330345451856531103.jpg',
    bgGrad: 'from-[#f5f9fd] to-[#F0F8FF]',
    link: '/category/shampoo',
  },
  {
    id: 4,
    title: 'Other Products',
    label: 'others',
    tag: 'pureplush',
    image: '6330345451856531104.jpg',
    bgGrad: 'from-[#fefaf7] to-[#FFF5EE]',
    link: '/category/others',
  },
];

export default function CategorySection() {
  const handleCategoryClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section id="categories" className="py-24 bg-cream-light border-b border-forest/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-dark flex items-center justify-center space-x-1">
            <span>Our Offerings</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-2">
            Shop by Ayurvedic Category
          </h2>
          <div className="w-16 h-1 bg-forest/20 mx-auto mt-4 rounded-full" />
          <p className="text-charcoal/70 mt-4 text-xs sm:text-sm">
            Explore our curated collections of botanical remedies. Handcrafted locally with pure, natural potency.
          </p>
        </div>

        {/* Categories Grid - Matching User Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onClick={() => handleCategoryClick(category.link)}
              className="flex flex-col space-y-4 cursor-pointer group"
            >
              {/* Card Container */}
              <div 
                className={`relative w-full aspect-square bg-gradient-to-b ${category.bgGrad} border border-forest/10 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white`}
              >
                {/* Card Top: Brand tag & Green badge */}
                <div className="flex flex-col items-center text-center space-y-2 z-10">
                  <span className="font-serif italic text-sm tracking-wide text-forest/75 font-semibold leading-none">
                    {category.tag}
                  </span>
                  
                  {/* Rounded capsule badge with green background */}
                  <span className="bg-[#4a773c] text-white text-[9px] font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    {category.title}
                  </span>
                </div>

                {/* Card Center: Squared Product Image */}
                <div className="relative flex-grow flex items-center justify-center mt-3 mb-2 overflow-hidden rounded-xl border border-forest/5 bg-white shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/uploads/${category.image}`}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback in case of image load failure
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=300&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>

              {/* Outside Caption Label */}
              <div className="flex items-center justify-between px-2">
                <h3 className="text-md sm:text-lg font-medium text-charcoal/90 truncate group-hover:text-forest transition-colors font-sans">
                  {category.label}
                </h3>
                <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-forest group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
