'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Leaf, TrendingUp, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  weight: string;
}

const TRENDING_KEYWORDS = [
  { text: 'Herbal Kesh Oil', category: 'others' },
  { text: 'Multani Mitti Saffron', category: 'shampoo' },
  { text: 'Goat Milk Coffee', category: 'soaps' },
  { text: 'Mango Butter Mud', category: 'soaps' },
  { text: 'Herbal Facewash Powder', category: 'moringa' },
  { text: 'Hibiscus Neem Shampoo', category: 'shampoo' }
];

const MOCK_SEARCH_PRODUCTS: Product[] = [
  {
    id: 104,
    product_name: 'Pureplush Multani Mitti Saffron Shampoo Bar',
    product_details: 'Zero-waste solid shampoo bar with shine-enhancing saffron and cleansing Multani Mitti clay.',
    brief_details: 'Solid shampoo bar with Multani Mitti and saffron for oil-control scalp freshness.',
    product_price: '299.00',
    original_price: '399.00',
    product_category: 'Shampoo Bars',
    product_discount: 25,
    image1: 'Shampoobar/Shampoobar2.png',
    weight: '80g'
  },
  {
    id: 109,
    product_name: 'Pureplush Goatmilk Coffee D Tan Soap',
    product_details: 'Handcrafted exfoliating soap containing fresh goat milk and aromatic coffee to scrub skin.',
    brief_details: 'Coffee-infused goat milk soap bar for an energising bath routine.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'Handcrafted Soaps',
    product_discount: 20,
    image1: 'CoffeeD/new1.png',
    weight: '100g'
  },
  {
    id: 28,
    product_name: 'Pureplush Herbal Facewash powder',
    product_details: 'Traditional exfoliating dry face wash powder to cleanse pores and restore natural glow.',
    brief_details: 'Gentle powder-to-paste face cleanser made with botanical ingredients.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'Herbal Powders',
    product_discount: 16,
    image1: 'uploads/Herbal4.png',
    weight: '100g'
  },
  {
    id: 101,
    product_name: 'Pureplush mangobutter Mud Sea Clay Soap',
    product_details: 'Handcrafted moisturizing soap bar with sea clay mud and rich organic mango butter.',
    brief_details: 'Creamy bath bar made for clean, soft, and refreshed skin feel.',
    product_price: '199.00',
    original_price: '249.00',
    product_category: 'Handcrafted Soaps',
    product_discount: 20,
    image1: 'MangoButter/Soap.png',
    weight: '100g'
  },
  {
    id: 108,
    product_name: 'Pureplush Herbal Facepack',
    product_details: 'Botanical detoxifying face mask to soothe irritation and brighten skin complexion.',
    brief_details: 'Weekly skin refresh mask created for home spa rituals.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'Herbal Powders',
    product_discount: 16,
    image1: 'Herbalfacepack/Artboard 1.png',
    weight: '100g'
  },
  {
    id: 107,
    product_name: 'Pureplush Hibiscus Neemtulsi Shampoo Bar',
    product_details: 'Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.',
    brief_details: 'Antibacterial solid shampoo bar for scalp freshness and dandruff control.',
    product_price: '299.00',
    original_price: '399.00',
    product_category: 'Shampoo Bars',
    product_discount: 25,
    image1: 'Shampoobar/new2.png',
    weight: '80g'
  },
  {
    id: 110,
    product_name: 'Herbal Kesh Oil',
    product_details: 'Herbal Kesh Oil is an intensive Ayurvedic hair treatment blend. Formulated with authentic Bhringraj, Amla, Sesame oil, and botanical herbs to deeply nourish the scalp, strengthen hair roots, control hair fall, and restore natural shine. 100ml.',
    brief_details: 'Traditional botanical hair oil infused with Bhringraj & Amla to nourish scalp and promote strong hair growth.',
    product_price: '499.00',
    original_price: '649.00',
    product_category: 'Botanical Oils',
    product_discount: 23,
    image1: 'Keshoil/Kesh1.jpeg',
    weight: '100ml'
  }
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [catalog, setCatalog] = useState<Product[]>(MOCK_SEARCH_PRODUCTS);
  const [addingId, setAddingId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setCatalog(data.products);
        }
      } catch {
        // Fallback to mock catalog
      }
    }
    loadCatalog();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(query.trim())}`;
      onClose();
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAddingId(product.id);

    try {
      const stored = localStorage.getItem('cart');
      let cart = stored ? JSON.parse(stored) : [];
      
      const existingItemIdx = cart.findIndex((item: any) => item.id === product.id);
      if (existingItemIdx > -1) {
        cart[existingItemIdx].quantity += 1;
      } else {
        cart.push({
          id: product.id,
          product_name: product.product_name,
          product_price: product.product_price,
          weight: product.weight || '100g',
          quantity: 1,
          brief_details: product.brief_details,
          image1: product.image1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('open-cart'));
    } catch (err) {
      console.error('Cart add error', err);
    }

    setTimeout(() => setAddingId(null), 500);
  };

  const getImagePath = (src?: string) => {
    if (!src) return '/uploads/Soap/Soap.png';
    if (src.startsWith('http') || src.startsWith('/')) return src;
    return `/uploads/${src}`;
  };

  // Instant Live Search Filter
  const liveResults = query.trim() === '' 
    ? [] 
    : catalog.filter(p => 
        p.product_name.toLowerCase().includes(query.toLowerCase()) ||
        p.product_category.toLowerCase().includes(query.toLowerCase()) ||
        p.product_details.toLowerCase().includes(query.toLowerCase()) ||
        (p.brief_details && p.brief_details.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-md flex flex-col items-center justify-start pt-16 md:pt-24 px-4 overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-10 p-2.5 rounded-full border border-forest/10 bg-white hover:bg-forest/5 text-forest hover:scale-105 transition-all shadow-sm"
            aria-label="Close search"
          >
            <X className="w-6 h-6 text-forest" />
          </button>

          {/* Core Search Box container */}
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl flex flex-col space-y-6 pb-12"
          >
            {/* Header badge */}
            <div className="flex items-center space-x-2 text-forest/70 justify-center">
              <Leaf className="w-4 h-4 text-gold" />
              <span className="text-xs uppercase tracking-widest font-bold">Search Pureplus Botanical Catalog</span>
            </div>

            {/* Input Form with instant clear button */}
            <form onSubmit={handleSubmit} className="relative w-full border-b-2 border-forest/30 focus-within:border-forest transition-colors py-3 flex items-center bg-white/80 rounded-2xl px-5 shadow-sm border border-forest/10">
              <Search className="w-6 h-6 text-forest flex-shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for soaps, shampoo bars, facewash powder, coffee scrub..."
                className="w-full text-base md:text-xl font-serif text-forest bg-transparent outline-none border-none placeholder-sage-dark/50"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-forest/10 rounded-full transition-colors text-charcoal/50 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-forest text-cream hover:bg-forest-light rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* LIVE PREDICTIVE RESULTS LIST */}
            {query.trim() !== '' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-charcoal/60 px-1">
                  <span className="font-bold font-sans uppercase tracking-wider">
                    Found {liveResults.length} matching item{liveResults.length === 1 ? '' : 's'}
                  </span>
                  {liveResults.length > 0 && (
                    <button
                      onClick={handleSubmit}
                      className="text-forest font-bold hover:underline flex items-center space-x-1"
                    >
                      <span>View all on shop page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {liveResults.length === 0 ? (
                  <div className="bg-white/80 rounded-2xl p-8 text-center border border-forest/10 shadow-xs">
                    <p className="font-serif text-base font-bold text-forest">No products found matching "{query}"</p>
                    <p className="text-xs text-charcoal/60 mt-1">Try searching for "soaps", "shampoo", "facewash", or "coffee".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[50vh] overflow-y-auto pr-1">
                    {liveResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="bg-white rounded-2xl p-3.5 border border-forest/10 shadow-sm hover:shadow-md hover:border-forest/20 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          {/* Image Thumbnail */}
                          <div className="w-14 h-14 bg-cream rounded-xl flex items-center justify-center p-1 flex-shrink-0 border border-forest/5 overflow-hidden">
                            <img
                              src={getImagePath(product.image1)}
                              alt={product.product_name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                            />
                          </div>

                          {/* Info */}
                          <div className="min-w-0 space-y-0.5">
                            <span className="text-[9px] font-bold text-sage-dark uppercase tracking-wider block">
                              {product.product_category || 'Botanical'}
                            </span>
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-forest group-hover:text-forest-light transition-colors truncate">
                              {product.product_name}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="font-bold text-forest">₹{parseFloat(product.product_price).toFixed(0)}</span>
                              {product.original_price && (
                                <span className="line-through text-charcoal/40 text-[10px]">₹{parseFloat(product.original_price).toFixed(0)}</span>
                              )}
                              <span className="text-[10px] text-charcoal/50 font-mono">({product.weight})</span>
                            </div>
                          </div>
                        </div>

                        {/* Add to Cart 1-click Quick Action */}
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={addingId === product.id}
                          className="p-2.5 rounded-xl bg-forest/5 hover:bg-forest text-forest hover:text-cream transition-all flex-shrink-0 ml-2"
                          title="Quick Add to Bag"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Trending Searches when input is empty */}
            {query.trim() === '' && (
              <div className="flex flex-col space-y-4 pt-2">
                <div className="flex items-center space-x-2 text-charcoal/50">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider font-sans text-forest">Popular Search Keywords</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {TRENDING_KEYWORDS.map((keyword, index) => (
                    <button
                      key={index}
                      onClick={() => handleKeywordClick(keyword.text)}
                      className="px-4 py-2 rounded-full border border-forest/10 hover:border-forest bg-white hover:bg-forest/5 text-xs text-charcoal/80 font-semibold hover:text-forest transition-all shadow-xs flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>{keyword.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive instructions */}
            <p className="text-[10px] text-center text-charcoal/40 pt-6">
              Press <kbd className="font-mono bg-forest/5 px-1.5 py-0.5 rounded border border-forest/10 shadow-xs">ESC</kbd> to exit search
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
