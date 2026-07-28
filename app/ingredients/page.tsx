'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, CheckCircle2, ShoppingBag, ArrowLeft } from 'lucide-react';

export interface IngredientProfile {
  name: string;
  category: string;
  benefit: string;
  description: string;
  usedInProducts: { name: string; url: string }[];
}

export const INGREDIENT_GLOSSARY: IngredientProfile[] = [
  {
    name: 'Multani Mitti (Fuller\'s Earth)',
    category: 'Natural Clay',
    benefit: 'Absorbs Excess Surface Oil & Cleanses Scalp Build-up',
    description: 'A traditional mineral-rich clay known for its absorbent properties. Helps draw out excess grease and surface dirt from skin and scalp without stripping natural moisture balance.',
    usedInProducts: [
      { name: 'Shea Butter Multani Mitti Soap', url: '/product/102' },
      { name: 'Multani Mitti Saffron Shampoo Bar', url: '/product/104' },
      { name: 'Herbal Facepack', url: '/product/108' }
    ]
  },
  {
    name: 'Real Saffron Extract',
    category: 'Botanical Extract',
    benefit: 'Enhances Natural Hair & Skin Radiance Feel',
    description: 'Extracted from dried stigmas of Crocus sativus flowers. Saffron is valued in traditional Indian beauty rituals for providing a fresh, radiant feel to skin and hair.',
    usedInProducts: [
      { name: 'Multani Mitti Saffron Shampoo Bar', url: '/product/104' }
    ]
  },
  {
    name: 'Raw Shea Butter',
    category: 'Plant Butter',
    benefit: 'Deep Skin Moisture & Conditioning Comfort',
    description: 'Rich in natural fatty acids and vitamins, unrefined raw shea butter helps nourish dry skin barriers, leaving skin soft and smooth after every bath.',
    usedInProducts: [
      { name: 'Shea Butter Multani Mitti Soap', url: '/product/102' }
    ]
  },
  {
    name: 'Fresh Farm Goat Milk',
    category: 'Natural Dairy',
    benefit: 'Softening Lather & Hydrating Skin Comfort',
    description: 'Naturally rich in lactic acid and proteins. Goat milk creates a rich, creamy lather that gently cleanses while helping maintain soft, supple skin texture.',
    usedInProducts: [
      { name: 'Goat Milk French Green Clay Soap', url: '/product/103' },
      { name: 'Goat Milk Coffee De-Tan Soap', url: '/product/109' }
    ]
  },
  {
    name: 'Aromatic Coffee Grounds',
    category: 'Botanical Scrub',
    benefit: 'Gentle Exfoliation & Refreshing Bath Feel',
    description: 'Finely ground coffee beans provide a gentle natural scrub to buff away dead skin cells and surface impurities during bath routines.',
    usedInProducts: [
      { name: 'Goat Milk Coffee De-Tan Soap', url: '/product/109' }
    ]
  },
  {
    name: 'Organic Mango Butter',
    category: 'Plant Butter',
    benefit: 'Soothing Hydration & Skin Softness',
    description: 'Extracted from the seed kernel of the mango fruit. Mango butter is lightweight, non-greasy, and deeply moisturizing for dry or stressed skin.',
    usedInProducts: [
      { name: 'Mango Butter Mud Sea Clay Soap', url: '/product/101' }
    ]
  },
  {
    name: 'French Green Clay',
    category: 'Natural Mineral Clay',
    benefit: 'Pore Cleansing & Mineral Comfort',
    description: 'Rich in iron oxides and decomposed plant matter. French green clay gently purifies surface pores and leaves skin feeling clean and velvety smooth.',
    usedInProducts: [
      { name: 'Goat Milk French Green Clay Soap', url: '/product/103' }
    ]
  },
  {
    name: 'Amla (Indian Gooseberry)',
    category: 'Herbal Fruit',
    benefit: 'Nourishes Scalp & Strengthens Hair Roots',
    description: 'A traditional Ayurvedic fruit high in natural Vitamin C and antioxidants. Helps strengthen hair roots and maintain natural shine.',
    usedInProducts: [
      { name: 'Herbal Hair Wash Powder', url: '/product/105' },
      { name: 'Herbal Kesh Oil', url: '/product/110' }
    ]
  },
  {
    name: 'Shikakai (Acacia concinna)',
    category: 'Natural Herbal Cleanser',
    benefit: 'Gentle Scalp Cleansing Without Stripping Oils',
    description: 'Known as "fruit for hair", Shikakai contains natural saponins that create a gentle, low-foaming lather to clean scalp and hair naturally.',
    usedInProducts: [
      { name: 'Herbal Hair Wash Powder', url: '/product/105' }
    ]
  }
];

export default function IngredientsPage() {
  return (
    <div className="min-h-screen bg-cream-light py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-forest hover:text-forest-light text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-wider mb-4 border border-forest/15 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-gold" />
            <span>Pureplush Ingredient Promise</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest tracking-tight">
            Botanical Ingredient Glossary
          </h1>
          <p className="text-charcoal/70 text-xs sm:text-base mt-4 leading-relaxed">
            Discover the natural clays, plant butter, and herbal extracts that power our soaps, shampoo bars, and stone-ground powders.
          </p>
        </div>

        {/* Glossary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INGREDIENT_GLOSSARY.map((ing, idx) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-forest/10 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-forest/5 border border-forest/10 text-forest font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    {ing.category}
                  </span>
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>

                <h3 className="text-xl font-serif font-bold text-forest">{ing.name}</h3>

                <div className="bg-cream/40 p-3 rounded-xl border border-forest/5 text-xs font-bold text-forest flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0" />
                  <span>{ing.benefit}</span>
                </div>

                <p className="text-xs text-charcoal/75 leading-relaxed">
                  {ing.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-forest/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-forest/70 block">Featured In Products:</span>
                <div className="space-y-1">
                  {ing.usedInProducts.map((p) => (
                    <Link
                      key={p.url}
                      href={p.url}
                      className="text-xs font-semibold text-forest hover:text-gold flex items-center justify-between transition-colors py-0.5"
                    >
                      <span>{p.name}</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-sage" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
