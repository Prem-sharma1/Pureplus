'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Leaf, RefreshCw, ShoppingCart, Tag, Star } from 'lucide-react';

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

  const isFullBleed = src.includes('6330345451856531101') || src.includes('6330345451856531104');

  if (isFullBleed) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-0">
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

  if (name.includes('moringa') || name.includes('soup')) {
    return {
      image1: '6330345451856531101.jpg',
      image2: 'FaceWash/Herbal1.png',
      image3: 'FaceWash/Herbal4.png'
    };
  }

  if (name.includes('abc latte') || name.includes('abc') || name.includes('latte')) {
    return {
      image1: 'FaceWash/Herbal2.png',
      image2: 'FaceWash/Herbal1.png',
      image3: 'FaceWash/Herbal3.png'
    };
  }

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

const CATEGORY_TABS = [
  { id: 'All', label: 'All Products' },
  { id: 'Moringa', label: 'Herbal Powders' },
  { id: 'Soaps', label: 'Handcrafted Soaps' },
  { id: 'Shampoo', label: 'Shampoo Bars' },
  { id: 'Others', label: 'Others' }
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
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
        }
      } catch (err) {
        console.warn('API error. Falling back to offline mock catalog.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      // 1. Read from URL search parameters first (?search=...&category=...)
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const urlSearch = searchParams.get('search');
        const urlCategory = searchParams.get('category');

        if (urlSearch || urlCategory) {
          if (urlCategory) {
            setSelectedCategory(urlCategory);
          } else {
            setSelectedCategory('All');
          }
          if (urlSearch) {
            setSearchQuery(urlSearch);
          } else {
            setSearchQuery('');
          }
          return;
        }

        // 2. Fall back to hash parameters
        const hash = window.location.hash;
        const queryPart = hash.includes('?') ? hash.split('?')[1] : '';
        if (queryPart) {
          const params = new URLSearchParams(queryPart);
          const category = params.get('category');
          const search = params.get('search');
          
          if (category) {
            setSelectedCategory(category);
          } else {
            setSelectedCategory('All');
          }
          
          if (search) {
            setSearchQuery(search);
          } else {
            setSearchQuery('');
          }
        } else {
          // Direct category hash from category cards
          const catParam = hash.replace('#', '');
          if (catParam && catParam !== 'products') {
            const lowerCat = catParam.toLowerCase();
            if (['moringa', 'soaps', 'shampoo', 'others'].includes(lowerCat)) {
              setSelectedCategory(catParam);
            }
          }
        }
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    handleUrlChange();

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setSelectedCategory(tabId);
    setSearchQuery('');
  };

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
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('open-cart'));
      } catch (err) {
        console.error('Failed to update shopping bag:', err);
      }
    }
    setTimeout(() => {
      setAddingToCartId(null);
    }, 600);
  };

  const filteredProducts = products.filter((product) => {
    let categoryMatch = false;
    if (selectedCategory === 'All') {
      categoryMatch = true;
    } else {
      const pCat = product.product_category.toLowerCase();
      const sCat = selectedCategory.toLowerCase();
      
      if (sCat === 'moringa' || sCat === 'malt' || sCat === 'choco' || sCat === 'abc malt') {
        categoryMatch = 
          pCat === 'moringa' || 
          pCat === 'abc malt' || 
          pCat === 'choco' || 
          product.product_name.toLowerCase().includes('facewash') ||
          product.product_name.toLowerCase().includes('face wash') ||
          product.product_name.toLowerCase().includes('saffron');
      } else {
        categoryMatch = pCat === sCat;
      }
    }

    let searchMatch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      searchMatch = 
        product.product_name.toLowerCase().includes(query) ||
        product.brief_details.toLowerCase().includes(query) ||
        product.product_category.toLowerCase().includes(query);
    }

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-cream-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-forest/10 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sage-dark">
              Apothecary Shop
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-2">
              Our Full Catalog
            </h1>
          </div>
          <p className="text-charcoal/70 max-w-md text-xs sm:text-sm mt-4 md:mt-0">
            Explore our curated collections of botanical remedies. Handcrafted locally with pure, natural potency.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-start gap-3 mb-12 pb-4 border-b border-forest/5">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory.toLowerCase() === tab.id.toLowerCase();
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'bg-forest border-forest text-cream shadow-md'
                    : 'bg-white border-forest/10 hover:border-forest text-charcoal hover:bg-forest/5 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          
          {searchQuery && (
            <span className="ml-auto inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 text-forest text-xs font-bold px-4 py-2 rounded-full shadow-sm">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (typeof window !== 'undefined') {
                    const newUrl = window.location.pathname + window.location.hash;
                    window.history.replaceState({ path: newUrl }, '', newUrl);
                  }
                }}
                className="hover:text-red-500 font-extrabold ml-1.5 transition-colors text-sm"
              >
                &times;
              </button>
            </span>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/40 h-96 rounded-2xl animate-pulse border border-forest/5" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white border border-forest/10 p-16 text-center rounded-2xl shadow-sm max-w-xl mx-auto flex flex-col items-center">
            <span className="text-4xl mb-4">🍃</span>
            <h3 className="font-serif text-xl font-bold text-forest">No products found</h3>
            <p className="text-xs text-charcoal/60 mt-2 max-w-xs leading-relaxed">
              We couldn&apos;t find any wellness blends matching your selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2.5 bg-forest text-cream text-xs font-bold uppercase tracking-wider rounded-full hover:bg-forest-light transition-all"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                addingToCartId={addingToCartId}
                onAddToCart={handleAddToCart}
                index={idx}
              />
            ))}
          </div>
        )}

      </div>


    </div>
  );
}
