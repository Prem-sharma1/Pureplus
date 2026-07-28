'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Activity, Award } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  product_name: string;
  product_details: string;
  brief_details: string;
  product_price: string;
  original_price: string;
  product_category: string;
  product_discount: number;
  image1: string;
  image2?: string;
  image3?: string;
  weight: string;
  point1?: string;
  point2?: string;
  point3?: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 26,
    product_name: 'Pureplush Herbal Waxing Powder',
    product_details: 'Pureplush Herbal Waxing Powder is a gentle dry body care powder made with carefully selected botanicals to cleanse and exfoliate gently while leaving skin soft and refreshed. 100g.',
    brief_details: 'Gentle natural body care powder made with botanical ingredients for smooth, refreshed skin feel.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'powders',
    product_discount: 16,
    image1: 'uploads/Herbal2.png',
    weight: '100g',
    point1: 'Carefully Selected Botanicals',
    point2: 'Gentle Herbal Formula',
    point3: 'Soft & Smooth Results',
  },
  {
    id: 28,
    product_name: 'Pureplush Herbal Facewash powder',
    product_details: 'Pureplush Herbal Facewash Powder is a traditional dry face wash blend. It gently cleanses pores, removes surface impurities and excess oil while leaving skin feeling fresh and clean. 100g.',
    brief_details: 'A gentle dry face cleanser made with selected botanical ingredients to help remove surface impurities and excess oil while leaving skin feeling fresh and clean.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'powders',
    product_discount: 16,
    image1: 'uploads/Herbal4.png',
    image2: 'uploads/Artboard 1 (1).png',
    weight: '100g',
    point1: 'Daily Cleanse',
    point2: 'Powder-to-Paste',
    point3: 'Travel-Friendly',
  },
  {
    id: 108,
    product_name: 'Pureplush Herbal Facepack',
    product_details: 'Pureplush Herbal Facepack is a nutrient-rich skin reviving treatment. A botanical face mask powder designed for a refreshing weekly skincare ritual. 100g.',
    brief_details: 'A botanical face mask powder designed for a refreshing weekly skincare ritual. Mix with rose water, curd or water as suitable, apply, relax and rinse for clean-looking, refreshed skin.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'powders',
    product_discount: 16,
    image1: 'Herbalfacepack/Artboard 1.png',
    image2: 'Herbalfacepack/Artboard 2.png',
    weight: '100g',
    point1: 'Weekly Refresh Mask',
    point2: 'Gentle Botanical Base',
    point3: 'Fresh Skin Feel',
  },
  {
    id: 105,
    product_name: 'PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj',
    product_details: 'Pureplush Herbal Hair Wash Powder is a complete hair nourishment blend. Sourced with Amla, Shikakai, and Bhringraj to gently cleanse scalp, nourish hair roots, and maintain natural shine. 100g.',
    brief_details: 'Botanical hair wash powder containing Amla, Shikakai & Bhringraj for strong, clean hair.',
    product_price: '249.00',
    original_price: '349.00',
    product_category: 'powders',
    product_discount: 29,
    image1: 'Herbal/Herbal3.png',
    image2: 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM.jpeg',
    weight: '100g',
    point1: 'Amla & Shikakai Cleanser',
    point2: 'Bhringraj & Amla Hair Care',
    point3: 'Nourishes Scalp & Roots',
  },
  {
    id: 101,
    product_name: 'Pureplush mangobutter Mud Sea Clay Soap',
    product_details: 'Pureplush Handcrafted Mango Butter, Mud & Sea Clay Soap. Purifies with sea clay, removes surface impurities with natural mud, and moisturizes with rich mango butter. 100g.',
    brief_details: 'A handcrafted bath bar with mango butter and sea clay-inspired cleansing comfort for skin that feels clean, soft and refreshed after every bath.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'soaps',
    product_discount: 20,
    image1: 'MangoButter/Soap.png',
    image2: 'MangoButter/WhatsApp Image 2026-07-15 at 5.18.11 PM.jpeg',
    weight: '100g',
    point1: 'Deep Purifying Mud',
    point2: 'Moisturizing Mango Butter',
    point3: 'Gentle Bath Cleanser',
  },
  {
    id: 102,
    product_name: 'Pureplush Sheabutter Multani Mitti Soap',
    product_details: 'Pureplush Handcrafted Shea Butter & Multani Mitti Soap. Combines the oil-absorbing power of Multani Mitti (fullers earth) with the deep conditioning of raw shea butter. 100g.',
    brief_details: 'A daily soap bar with Multani Mitti and shea butter for a balanced cleansing experience - helps remove excess surface oil while keeping skin feeling comfortable.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'soaps',
    product_discount: 20,
    image1: 'Multanimitti/Soap3.png',
    image2: 'Multanimitti/WhatsApp Image 2026-07-10 at 7.10.16 PM (1).jpeg',
    weight: '100g',
    point1: 'Absorbs Excess Oils',
    point2: 'Nourishing Shea Butter',
    point3: 'Cleanses Surface Dirt',
  },
  {
    id: 103,
    product_name: 'Pureplush Goatmilk French Green Clay Soap',
    product_details: 'Pureplush Handcrafted Goat Milk & French Green Clay Soap. French green clay draws out surface impurities, while fresh farm goat milk softens and hydrates skin. 100g.',
    brief_details: 'A creamy cleansing bar with goat milk and French green clay for a soft, fresh and smooth bath experience.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'soaps',
    product_discount: 20,
    image1: 'Frenchgreenclay/Soap2.png',
    image2: 'Frenchgreenclay/WhatsApp Image 2026-07-10 at 7.10.16 PM.jpeg',
    weight: '100g',
    point1: 'Toxin-Extracting Green Clay',
    point2: 'Soft Skin Feel',
    point3: 'Rich Goat Milk',
  },
  {
    id: 104,
    product_name: 'Pureplush Multani Mitti Saffron Shampoo Bar',
    product_details: 'Pureplush Solid Multani Mitti & Saffron Shampoo Bar. Saffron extracts enhance natural hair shine, while Multani Mitti clay gently cleanses the scalp of grease and build-up. 80g.',
    brief_details: 'A solid shampoo bar with Multani Mitti and saffron-inspired botanicals for scalp freshness, oil-control feel and naturally clean-looking hair.',
    product_price: '299.00',
    original_price: '399.00',
    product_category: 'shampoo',
    product_discount: 25,
    image1: 'multanimittishampoo/Shampoobar2.png',
    image2: 'multanimittishampoo/1770380073526.png',
    weight: '80g',
    point1: 'Scalp-Fresh Cleansing',
    point2: 'Infused with Real Saffron',
    point3: 'Travel-Friendly Solid Bar',
  },
  {
    id: 107,
    product_name: 'Pureplush Hibiscus Neemtulsi Shampoo Bar',
    product_details: 'Pureplush Solid Hibiscus, Neem & Tulsi Shampoo Bar. Hibiscus conditions hair shafts, while Neem and Tulsi extract provide soothing defense to reduce scalp itchiness and build-up. 80g.',
    brief_details: 'Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.',
    product_price: '299.00',
    original_price: '399.00',
    product_category: 'shampoo',
    product_discount: 25,
    image1: 'Hibisus neem/new2.png',
    image2: 'Hibisus neem/Hibiscus neem tulsi1.jpeg',
    weight: '80g',
    point1: 'Antibacterial Neem & Tulsi',
    point2: 'Hibiscus Hair Conditioning',
    point3: 'Scalp Defense & Freshness',
  },
  {
    id: 109,
    product_name: 'Pureplush Goatmilk Coffee D Tan Soap',
    product_details: 'Pureplush Handcrafted Goat Milk & Coffee D-Tan Soap. Gently exfoliates dead skin cells, removes surface impurities, and moisturizes with fresh farm goat milk and aromatic coffee. 100g.',
    brief_details: 'A coffee-infused goat milk soap bar with a gentle scrub feel for refreshed-looking skin and an energising bath routine.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'soaps',
    product_discount: 20,
    image1: 'CoffeeD/new1.png',
    image2: 'CoffeeD/WhatsApp Image 2026-07-15 at 5.18.10 PM.jpeg',
    weight: '100g',
    point1: 'Refreshes & Exfoliates',
    point2: 'Fresh Farm Goat Milk',
    point3: 'Natural Coffee Scrub',
  }
];

interface ConcernTab {
  id: string;
  label: string;
  desc: string;
  icon: any;
  color: string;
  productIds: number[];
}

const CONCERN_TABS: ConcernTab[] = [
  {
    id: 'skin',
    label: 'Daily Bath & Skin Care',
    desc: 'Daily bath cleansers and facial care bars for clean, comfortable skin feel.',
    icon: Sparkles,
    color: 'border-emerald-200 bg-emerald-50/40 text-emerald-800',
    productIds: [28, 101, 102, 103, 108, 109]
  },
  {
    id: 'hair',
    label: 'Hair & Scalp Freshness',
    desc: 'Solid shampoo bars and botanical hair wash powders for scalp freshness and light hair feel.',
    icon: Heart,
    color: 'border-sky-200 bg-sky-50/40 text-sky-800',
    productIds: [104, 105, 107]
  },
  {
    id: 'nutrition',
    label: 'Herbal Powders',
    desc: 'Botanical dry face cleansers, face packs, and hair wash blends.',
    icon: Activity,
    color: 'border-amber-200 bg-amber-50/40 text-amber-800',
    productIds: [26, 28, 105, 108]
  },
  {
    id: 'soothing',
    label: 'Gentle Clay & Goat Milk',
    desc: 'Nourishing goat milk and cleansing clays for soft, refreshed daily routines.',
    icon: Award,
    color: 'border-rose-200 bg-rose-50/40 text-rose-800',
    productIds: [101, 102, 103, 108, 109]
  },
  {
    id: 'combos',
    label: 'Bundles & Starter Combos',
    desc: 'Curated routine starter packs and trial bundles for complete daily self-care.',
    icon: Sparkles,
    color: 'border-purple-200 bg-purple-50/40 text-purple-800',
    productIds: [28, 101, 104, 108]
  }
];

export default function BenefitSection() {
  const [activeConcern, setActiveConcern] = useState('skin');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.warn('API error in BenefitSection. Fallback active.');
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (id: number) => {
    setAddingToCartId(id);
    const product = products.find((p) => p.id === id);
    if (product) {
      try {
        const stored = localStorage.getItem('cart');
        let cart = stored ? JSON.parse(stored) : [];
        const existingIdx = cart.findIndex((item: any) => item.id === id);
        if (existingIdx > -1) {
          cart[existingIdx].quantity += 1;
        } else {
          cart.push({
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            weight: product.weight,
            quantity: 1,
            brief_details: product.brief_details,
            image1: product.image1
          });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('open-cart'));
      } catch (err) {
        console.error('Failed to add to cart:', err);
      }
    }
    setTimeout(() => setAddingToCartId(null), 600);
  };

  const activeTabInfo = CONCERN_TABS.find(t => t.id === activeConcern) || CONCERN_TABS[0];
  
  // Dynamic concern-matching filter based on explicit product ID mapping & deduplicated by ID
  const seenIds = new Set<number>();
  const filteredProducts = products.filter(p => {
    const id = Number(p.id);
    if (!activeTabInfo.productIds.includes(id)) return false;
    if (seenIds.has(id)) return false;
    seenIds.add(id);
    return true;
  });

  return (
    <section className="py-24 bg-[#faf8f5] relative overflow-hidden border-b border-forest/5">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-gold/5 filter blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sage flex items-center justify-center space-x-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 animate-[pulse_1.5s_infinite]" />
            <span>Targeted Daily Care</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-3">
            Shop by Daily Care Need
          </h2>
          <div className="w-12 h-1 bg-gold/50 mx-auto mt-4 rounded-full" />
          <p className="text-charcoal/70 mt-4 text-xs sm:text-sm">
            Choose products by routine - daily bath, scalp freshness, oily-skin feel, weekly face mask and travel-friendly care.
          </p>
        </div>

        {/* Concern Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8 border-b border-forest/5 pb-6">
          {CONCERN_TABS.map((tab) => {
            const isActive = tab.id === activeConcern;
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveConcern(tab.id)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all border flex items-center space-x-2 focus:outline-none ${
                  isActive
                    ? 'bg-forest border-forest text-cream shadow-md scale-105'
                    : 'bg-white border-forest/10 hover:border-forest/25 text-charcoal hover:bg-forest/5'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-forest/60'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Concern Caption */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-sm font-semibold text-forest leading-relaxed">
            &ldquo;{activeTabInfo.desc}&rdquo;
          </p>
        </div>

        {/* Dynamic Animated Grid */}
        <div className="min-h-[420px]">
          {filteredProducts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/45 h-[400px] rounded-2xl animate-pulse border border-forest/5" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcern}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={`benefit-${product.id}-${idx}`}
                    product={product}
                    addingToCartId={addingToCartId}
                    onAddToCart={handleAddToCart}
                    index={idx}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </section>
  );
}
