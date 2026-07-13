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
    product_name: 'ABC Latte Mix(Malt) Powder',
    product_details: 'Pureplush ABC Latte Mix Malt Powder – a wholesome blend of Apple, Beetroot, and Carrot with natural malt for a nourishing, tasty, and energizing health drink. 100g',
    brief_details: 'Pureplush ABC Latte Mix Malt Powder. Discover the goodness of nature in every sip with Apple, Beetroot, Carrot (ABC) and wholesome malt.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'Moringa Powders',
    product_discount: 20,
    image1: 'FaceWash/Herbal2.png',
    weight: '100g',
    point1: 'Rich in Nutrients',
    point2: 'Immunity Support',
    point3: 'Glowing Skin & Eyes',
  },
  {
    id: 28,
    product_name: 'Choco Multigrain Millet Malt Mix',
    product_details: 'Pureplush Choco Multigrain Millet Malt Mix Powder – A delicious and nutritious blend of wholesome millets, grains, and natural cocoa, crafted to give you energy, strength, and taste in every sip. 100g.',
    brief_details: 'Pureplush Choco Multigrain Millet Malt Mix Powder is a perfect fusion of health and taste. Made with the goodness of nutrient-rich millets and natural cocoa.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'Moringa Powders',
    product_discount: 20,
    image1: 'FaceWash/Herbal3.png',
    weight: '100g',
    point1: 'Rich in Protein & Fiber',
    point2: 'No Preservatives',
    point3: 'Suitable for All Ages',
  },
  {
    id: 101,
    product_name: 'Vedic Neem & Turmeric Soap',
    product_details: 'Pureplush Handcrafted Neem & Turmeric soap combines natural skin protection with gentle botanical nourishment, leaving skin refreshed and pure. 100g.',
    brief_details: 'Vedic soap handcrafted with fresh neem extracts and wild turmeric root oil for daily antibacterial defense.',
    product_price: '120.00',
    original_price: '180.00',
    product_category: 'Natural Soaps',
    product_discount: 33,
    image1: 'Soap/Soap.png',
    weight: '100g',
    point1: '100% Handcrafted Soap',
    point2: 'Antibacterial Neem Extract',
    point3: 'Soothes Dry & Sensitive Skin',
  },
  {
    id: 102,
    product_name: 'Honey & Sandalwood Glow Soap',
    product_details: 'A moisturizing, glow-enhancing soap bar loaded with pure organic forest honey and steam-distilled sandalwood oils. 100g.',
    brief_details: 'Moisturizing bar containing deep forest honey and pure sandalwood to hydrate and restore natural radiance.',
    product_price: '140.00',
    original_price: '190.00',
    product_category: 'Natural Soaps',
    product_discount: 26,
    image1: 'Soap/Soap2.jpg',
    weight: '100g',
    point1: 'Forest Wild Honey',
    point2: 'Steam-Distilled Sandalwood',
    point3: 'Hydrates & Restores Glow',
  },
  {
    id: 103,
    product_name: 'Lavender Relaxation Soap',
    product_details: 'Relax your mind and body with pure French lavender essential oils and cold-pressed botanical bases. 100g.',
    brief_details: 'A calming body wash bar infused with absolute lavender oil and skin-softening goat milk extracts.',
    product_price: '130.00',
    original_price: '180.00',
    product_category: 'Natural Soaps',
    product_discount: 27,
    image1: 'Soap/Soap3.jpg',
    weight: '100g',
    point1: 'French Lavender Oil',
    point2: 'Calming Aromatherapy Benefit',
    point3: 'Rich Conditioning Lather',
  },
  {
    id: 104,
    product_name: 'Rosemary & Tea Tree Shampoo Bar',
    product_details: 'A luxurious solid shampoo bar formulated with fresh rosemary herbs and organic tea tree oils to reduce dandruff and strengthen hair roots. 80g.',
    brief_details: 'Solid zero-waste shampoo bar loaded with rosemary leaves and tea tree oil for clean scalp and healthy hair.',
    product_price: '220.00',
    original_price: '280.00',
    product_category: 'Shampoo Bars',
    product_discount: 21,
    image1: 'Shampoobar/Shampoobar.png',
    weight: '80g',
    point1: 'Zero Waste Solid Bar',
    point2: 'Tea Tree Oil for Scalp Health',
    point3: 'Strengthens Root Follicles',
  },
  {
    id: 105,
    product_name: 'Aloe Vera Rejuvenating Gel',
    product_details: 'Pure fresh aloe vera inner leaf jelly to soothe, cool, and hydrate the face and body. 120g.',
    brief_details: 'Natural cooling moisturizer made with 99% pure aloe vera juice to soothe sunburn, acne, and redness.',
    product_price: '180.00',
    original_price: '240.00',
    product_category: 'others',
    product_discount: 25,
    image1: '6330345451856531104.jpg',
    weight: '120g',
    point1: '99% Pure Inner Leaf Aloe',
    point2: 'Cools Sunburns & Skin Redness',
    point3: 'Non-Greasy Daily Hydration',
  },
  {
    id: 106,
    product_name: 'Kashmiri Saffron Glow Face Oil',
    product_details: 'Traditional Kumkumadi tailam facial serum infused with authentic Kashmiri saffron threads, sandalwood, and licorice. 30ml.',
    brief_details: 'Premium night beauty serum made with Kashmiri saffron to improve skin texture and complexions.',
    product_price: '399.00',
    original_price: '499.00',
    product_category: 'Moringa Powders',
    product_discount: 20,
    image1: 'FaceWash/Herbal4.png',
    weight: '30ml',
    point1: 'Authentic Kumkumadi Formulation',
    point2: 'Infused with Real Saffron Threads',
    point3: 'Fades Dark Spots & Pigmentation',
  },
  {
    id: 107,
    product_name: 'Charcoal & Bamboo Shampoo Bar',
    product_details: 'Pureplush Charcoal & Bamboo Shampoo Bar provides deep scalp detox, pulling out oils and toxins while moisturizing with organic coconut and argan base. 80g.',
    brief_details: 'Detoxifying solid shampoo bar with active bamboo charcoal and tea tree for clean, bouncy hair.',
    product_price: '230.00',
    original_price: '290.00',
    product_category: 'Shampoo Bars',
    product_discount: 21,
    image1: 'Shampoobar/Shampoobar2.png',
    weight: '80g',
    point1: 'Active Bamboo Charcoal',
    point2: 'Deep Scalp Detoxification',
    point3: 'Restores Volume & Shine',
  },
  {
    id: 108,
    product_name: 'Vedic Neem & Aloe Facewash',
    product_details: 'Gentle, non-drying foaming facewash packed with active neem leaves and cooling aloe vera gel to wash away impurities and fight acne-causing germs. 150ml.',
    brief_details: 'Organic purifying facewash formulated with neem leaf extracts and soothing aloe vera.',
    product_price: '190.00',
    original_price: '250.00',
    product_category: 'Moringa Powders',
    product_discount: 24,
    image1: 'FaceWash/Herbal1.png',
    weight: '150ml',
    point1: 'Purifying Organic Neem',
    point2: 'Hydrating Aloe Vera Gel',
    point3: 'Fights Acne & Impurities',
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
    label: 'Skin Glow & Clarity',
    desc: 'Purify, hydrate, and restore radiant skin complexions naturally.',
    icon: Sparkles,
    color: 'border-emerald-200 bg-emerald-50/40 text-emerald-800',
    productIds: [101, 102, 106, 108]
  },
  {
    id: 'hair',
    label: 'Hair & Scalp Strength',
    desc: 'Deep scalp detox, volume enhancement, and zero dandruff flakes.',
    icon: Heart,
    color: 'border-sky-200 bg-sky-50/40 text-sky-800',
    productIds: [104, 107]
  },
  {
    id: 'nutrition',
    label: 'Organic Nutrition',
    desc: 'Nutrient-rich multigrain health mixes for energy and immunity.',
    icon: Activity,
    color: 'border-amber-200 bg-amber-50/40 text-amber-800',
    productIds: [26, 28]
  },
  {
    id: 'soothing',
    label: 'Soothing Hydration',
    desc: 'Cooling, non-greasy botanicals to soothe sensitive skin barriers.',
    icon: Award,
    color: 'border-rose-200 bg-rose-50/40 text-rose-800',
    productIds: [103, 105, 108]
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
  
  // Dynamic concern-matching filter (ID + Name/Category keyword mapping)
  const filteredProducts = products.filter(p => {
    const id = Number(p.id);
    const name = (p.product_name || '').toLowerCase();
    const category = (p.product_category || '').toLowerCase();

    if (activeConcern === 'skin') {
      return (
        activeTabInfo.productIds.includes(id) ||
        category.includes('soap') || 
        name.includes('soap') || 
        name.includes('oil') || 
        name.includes('facewash') || 
        name.includes('face wash')
      );
    }
    if (activeConcern === 'hair') {
      return (
        activeTabInfo.productIds.includes(id) ||
        category.includes('shampoo') || 
        name.includes('shampoo')
      );
    }
    if (activeConcern === 'nutrition') {
      return (
        activeTabInfo.productIds.includes(id) ||
        category.includes('abc') || 
        category.includes('choco') || 
        category.includes('moringa') || 
        name.includes('mix') || 
        name.includes('malt') || 
        name.includes('powder')
      );
    }
    if (activeConcern === 'soothing') {
      return (
        activeTabInfo.productIds.includes(id) ||
        category.includes('others') || 
        name.includes('aloe') || 
        name.includes('gel') || 
        name.includes('lavender')
      );
    }
    return false;
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
            <span>Targeted Health Goals</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-3">
            Shop by Ayurvedic Concern
          </h2>
          <div className="w-12 h-1 bg-gold/50 mx-auto mt-4 rounded-full" />
          <p className="text-charcoal/70 mt-4 text-xs sm:text-sm">
            Select your health goal to explore the custom hand-ground mixes and luxury soaps tailored for your needs.
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
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
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
