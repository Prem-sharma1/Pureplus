'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import { motion } from 'framer-motion';
import { Leaf, Award, Compass, RefreshCw, ShoppingCart, Tag, Star } from 'lucide-react';
import Link from 'next/link';

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

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }
    const path = src.startsWith('uploads/') ? `/${src}` : `/uploads/${src}`;
    setImageSrc(path);
    setHasError(false);
  }, [src]);

  if (hasError || !imageSrc) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-tr from-sage/10 to-transparent">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/15 to-gold/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Leaf className="w-12 h-12 text-forest/75" />
        </div>
      </div>
    );
  }

  // Determine if this is a full-bleed banner/graphic image
  const isFullBleed = src.includes('6330345451856531101') || src.includes('6330345451856531104');

  if (isFullBleed) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-0 bg-cream/30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        onError={() => setHasError(true)}
        className="max-w-full max-h-full object-contain scale-110 group-hover:scale-115 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/[0.015] group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
    </div>
  );
}

// Premium mock data matching SQL dump for offline/unconnected fallback
const MOCK_PRODUCTS: Product[] = [
  {
    id: 26,
    product_name: 'ABC Latte Mix(Malt) Powder',
    product_details: 'Pureplush ABC Latte Mix Malt Powder – a wholesome blend of Apple, Beetroot, and Carrot with natural malt for a nourishing, tasty, and energizing health drink. 100g',
    brief_details: 'Pureplush ABC Latte Mix Malt Powder. Discover the goodness of nature in every sip with Apple, Beetroot, Carrot (ABC) and wholesome malt.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'ABC malt',
    product_discount: 20,
    image1: 'FaceWash/Herbal2.png',
    image2: 'FaceWash/Herbal1.png',
    image3: 'FaceWash/Herbal3.png',
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
    product_category: 'choco',
    product_discount: 20,
    image1: 'FaceWash/Herbal3.png',
    image2: 'FaceWash/Herbal2.png',
    image3: 'FaceWash/Herbal4.png',
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
    product_category: 'Soaps',
    product_discount: 33,
    image1: 'Soap/Soap.png',
    image2: 'Soap/Soap2.jpg',
    image3: 'Soap/Soap3.jpg',
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
    product_category: 'Soaps',
    product_discount: 26,
    image1: 'Soap/Soap2.jpg',
    image2: 'Soap/Soap.png',
    image3: 'Soap/Soap3.jpg',
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
    product_category: 'Soaps',
    product_discount: 27,
    image1: 'Soap/Soap3.jpg',
    image2: 'Soap/Soap.png',
    image3: 'Soap/Soap2.jpg',
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
    product_category: 'Shampoo',
    product_discount: 21,
    image1: 'Shampoobar/Shampoobar.png',
    image2: 'Shampoobar/Shampoobar2.png',
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
    product_category: 'Others',
    product_discount: 25,
    image1: '6330345451856531104.jpg',
    image2: 'FaceWash/Herbal4.png',
    image3: 'FaceWash/Herbal1.png',
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
    product_category: 'Moringa',
    product_discount: 20,
    image1: 'FaceWash/Herbal4.png',
    image2: 'FaceWash/Herbal2.png',
    image3: 'FaceWash/Herbal3.png',
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
    product_category: 'Shampoo',
    product_discount: 21,
    image1: 'Shampoobar/Shampoobar2.png',
    image2: 'Shampoobar/Shampoobar.png',
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
    product_category: 'Moringa',
    product_discount: 24,
    image1: 'FaceWash/Herbal1.png',
    image2: 'FaceWash/Herbal2.png',
    image3: 'FaceWash/Herbal3.png',
    weight: '150ml',
    point1: 'Purifying Organic Neem',
    point2: 'Hydrating Aloe Vera Gel',
    point3: 'Fights Acne & Impurities',
  }
];

interface FolderWiseImages {
  image1: string;
  image2?: string;
  image3?: string;
}

const getFolderWiseImages = (
  productName: string,
  databaseImage1?: string,
  databaseImage2?: string,
  databaseImage3?: string
): FolderWiseImages => {
  if (databaseImage1 && databaseImage1.trim() !== '') {
    return {
      image1: databaseImage1,
      image2: databaseImage2,
      image3: databaseImage3
    };
  }

  const name = productName.toLowerCase();

  // Soaps mapping
  if (name.includes('soap')) {
    if (name.includes('neem')) {
      return {
        image1: 'Soap/Soap.png',
        image2: 'Soap/Soap2.jpg',
        image3: 'Soap/Soap3.jpg'
      };
    }
    if (name.includes('honey') || name.includes('sandalwood')) {
      return {
        image1: 'Soap/Soap2.jpg',
        image2: 'Soap/Soap.png',
        image3: 'Soap/Soap3.jpg'
      };
    }
    if (name.includes('lavender')) {
      return {
        image1: 'Soap/Soap3.jpg',
        image2: 'Soap/Soap.png',
        image3: 'Soap/Soap2.jpg'
      };
    }
    return {
      image1: 'Soap/Soap.png',
      image2: 'Soap/Soap2.jpg',
      image3: 'Soap/Soap3.jpg'
    };
  }

  // Shampoo bars mapping
  if (name.includes('shampoo')) {
    if (name.includes('rosemary') || name.includes('tea tree')) {
      return {
        image1: 'Shampoobar/Shampoobar.png',
        image2: 'Shampoobar/Shampoobar2.png'
      };
    }
    if (name.includes('charcoal') || name.includes('bamboo')) {
      return {
        image1: 'Shampoobar/Shampoobar2.png',
        image2: 'Shampoobar/Shampoobar.png'
      };
    }
    return {
      image1: 'Shampoobar/Shampoobar.png',
      image2: 'Shampoobar/Shampoobar2.png'
    };
  }

  // Facewash & skin gel/oil mapping
  if (
    name.includes('facewash') ||
    name.includes('face wash') ||
    name.includes('gel') ||
    name.includes('oil') ||
    name.includes('aloe') ||
    name.includes('saffron')
  ) {
    if (name.includes('facewash') || name.includes('face wash')) {
      return {
        image1: 'FaceWash/Herbal1.png',
        image2: 'FaceWash/Herbal2.png',
        image3: 'FaceWash/Herbal3.png'
      };
    }
    if (name.includes('gel') || name.includes('aloe')) {
      return {
        image1: 'FaceWash/Herbal2.png',
        image2: 'FaceWash/Herbal3.png',
        image3: 'FaceWash/Herbal4.png'
      };
    }
    if (name.includes('oil') || name.includes('saffron')) {
      return {
        image1: 'FaceWash/Herbal3.png',
        image2: 'FaceWash/Herbal4.png',
        image3: 'FaceWash/Herbal1.png'
      };
    }
    return {
      image1: 'FaceWash/Herbal1.png',
      image2: 'FaceWash/Herbal2.png',
      image3: 'FaceWash/Herbal3.png'
    };
  }

  // Moringa / Soup
  if (name.includes('moringa') || name.includes('soup')) {
    return {
      image1: '6330345451856531101.jpg',
      image2: 'FaceWash/Herbal1.png',
      image3: 'FaceWash/Herbal4.png'
    };
  }

  // ABC Latte Mix
  if (name.includes('abc latte') || name.includes('abc') || name.includes('latte')) {
    return {
      image1: 'FaceWash/Herbal2.png',
      image2: 'FaceWash/Herbal1.png',
      image3: 'FaceWash/Herbal3.png'
    };
  }

  // Choco Millet Mix
  if (name.includes('choco') || name.includes('multigrain') || name.includes('millet')) {
    return {
      image1: 'FaceWash/Herbal3.png',
      image2: 'FaceWash/Herbal2.png',
      image3: 'FaceWash/Herbal4.png'
    };
  }

  return {
    image1: databaseImage1 || '6330345451856531104.jpg',
    image2: databaseImage2,
    image3: databaseImage3
  };
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  
  // Amazon details modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        
        if (data.success && data.products && data.products.length > 0) {
          const mapped = data.products
            .filter((p: any) => p.id !== 22 && !p.product_name.toLowerCase().includes('moringa premix'))
            .map((p: any) => {
              const folderWise = getFolderWiseImages(p.product_name, p.image1, p.image2, p.image3);
              return {
                ...p,
                image1: folderWise.image1,
                image2: folderWise.image2 || p.image2,
                image3: folderWise.image3 || p.image3
              };
            });
          setProducts(mapped);
          setDbConnected(true);
        } else {
          console.warn('Using premium mock products due to database offline status.');
        }
      } catch (err) {
        console.warn('API error. Falling back to offline mock catalog.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (id: number, quantity: number = 1) => {
    setAddingToCartId(id);
    
    const product = products.find((p) => p.id === id);
    if (product) {
      try {
        const stored = localStorage.getItem('cart');
        let cart = stored ? JSON.parse(stored) : [];
        
        const existingItemIdx = cart.findIndex((item: any) => item.id === id);
        if (existingItemIdx > -1) {
          cart[existingItemIdx].quantity += quantity;
        } else {
          cart.push({
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            weight: product.weight,
            quantity: quantity,
            brief_details: product.brief_details,
            image1: product.image1
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Trigger navbar counter updates
        window.dispatchEvent(new Event('storage'));
        
        // Trigger slide-out cart drawer opening
        window.dispatchEvent(new Event('open-cart'));
      } catch (err) {
        console.error('Failed to update shopping bag:', err);
      }
    }

    setTimeout(() => {
      setAddingToCartId(null);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection />

      {/* Featured Products Showcase */}
      <section id="products" className="py-20 bg-cream-light border-t border-forest/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* H          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-dark flex items-center space-x-1">
                <span>Our Apothecary</span>
                {dbConnected && (
                  <span className="inline-flex items-center space-x-1 ml-2 text-[9px] bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full font-sans font-bold">
                    <span className="h-1 w-1 bg-green-500 rounded-full animate-ping"></span>
                    <span>Live Database</span>
                  </span>
                )}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-2">
                Famous Products
              </h2>
            </div>
            <p className="text-charcoal/70 max-w-md text-xs sm:text-sm mt-4 md:mt-0">
              Hand-ground mixes crafted from moringa, millets, apples, and carrots to give you wholesome nutrition in every serving.
            </p>
          </div>

          {/* Products List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/40 h-96 rounded-2xl animate-pulse border border-forest/5" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    onClick={() => {
                      window.location.href = `/product/${product.id}`;
                    }}
                    className="bg-white border border-forest/10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                  >
                    {/* Image/Visual Container */}
                    <div className="relative bg-cream h-64 w-full border-b border-forest/5 overflow-hidden">
                      <ProductImage src={product.image1} alt={product.product_name} />

                      {/* Discount badge */}
                      {product.product_discount > 0 && (
                        <span className="absolute top-4 left-4 bg-gold text-forest text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Save {product.product_discount}%</span>
                        </span>
                      )}

                      {/* Category badge */}
                      <span className="absolute top-4 right-4 bg-forest/5 border border-forest/10 text-charcoal/80 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                        {product.product_category || 'Wellness'}
                      </span>

                      {/* Net weight tag */}
                      <span className="absolute bottom-3 right-4 bg-white/80 text-charcoal text-[10px] font-bold border border-forest/5 px-2 py-0.5 rounded-md">
                        {product.weight || '100g'}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Rating Mock */}
                        <div className="flex items-center space-x-1 text-gold mb-2.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          <span className="text-[10px] font-semibold text-charcoal/50 ml-1">(4.9)</span>
                        </div>

                        {/* Name */}
                        <h3 className="text-xl font-bold font-serif text-forest tracking-tight group-hover:text-forest-light transition-colors leading-tight">
                          {product.product_name}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs text-charcoal/80 mt-2 line-clamp-2 leading-relaxed">
                          {product.brief_details}
                        </p>

                        {/* Bullet points */}
                        <div className="mt-4 space-y-1.5 border-t border-forest/5 pt-3">
                          {product.point1 && (
                            <div className="flex items-center space-x-2 text-[11px] text-charcoal/70">
                              <span className="h-1.5 w-1.5 rounded-full bg-sage flex-shrink-0"></span>
                              <span>{product.point1}</span>
                            </div>
                          )}
                          {product.point2 && (
                            <div className="flex items-center space-x-2 text-[11px] text-charcoal/70">
                              <span className="h-1.5 w-1.5 rounded-full bg-sage flex-shrink-0"></span>
                              <span>{product.point2}</span>
                            </div>
                          )}
                          {product.point3 && (
                            <div className="flex items-center space-x-2 text-[11px] text-charcoal/70">
                              <span className="h-1.5 w-1.5 rounded-full bg-sage flex-shrink-0"></span>
                              <span>{product.point3}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Pricing & Action */}
                      <div className="mt-6 pt-4 border-t border-forest/5 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-charcoal/50 line-through leading-none mb-0.5">
                            ₹{parseFloat(product.original_price).toFixed(0)}
                          </span>
                          <span className="text-xl font-serif font-bold text-forest leading-none">
                            ₹{parseFloat(product.product_price).toFixed(0)}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening details modal
                            handleAddToCart(product.id);
                          }}
                          disabled={addingToCartId === product.id}
                          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-305 ${
                            addingToCartId === product.id
                              ? 'bg-sage text-forest'
                              : 'bg-forest hover:bg-forest-light text-cream hover:-translate-y-0.5 shadow-sm'
                          }`}
                        >
                          {addingToCartId === product.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-16 text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>View All Products</span>
                </Link>
              </div>
            </>
          )}

        </div>
      </section>

      {/* Credibility / Brand Promise Banner */}
      <section className="py-20 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center p-4"
            >
              <div className="w-14 h-14 bg-cream text-forest rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-white">Direct Sourcing</h3>
              <p className="text-xs text-sage-light leading-relaxed max-w-xs">
                We partner with local organic farms in Uttara Kannada to harvest raw moringa and fresh ingredients at peak potency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center p-4"
            >
              <div className="w-14 h-14 bg-cream text-forest rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-white">Authentic Formulas</h3>
              <p className="text-xs text-sage-light leading-relaxed max-w-xs">
                Our recipes adhere strictly to traditional Ayurvedic treatises, guaranteeing natural wellness with zero fillers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center p-4"
            >
              <div className="w-14 h-14 bg-cream text-forest rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-white">Modern Convenience</h3>
              <p className="text-xs text-sage-light leading-relaxed max-w-xs">
                Perfect blends formulated as premix soup powders and mix lattes, fitting easily into a busy, modern daily schedule.
              </p>
            </motion.div>

          </div>
        </div>
      </section>



    </div>
  );
}
