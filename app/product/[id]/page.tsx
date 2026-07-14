'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CreditCard, Star, ShieldCheck, Truck, RefreshCw, Tag, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  shelf_life?: string;
  point1?: string;
  point2?: string;
  point3?: string;
  point4?: string;
  point5?: string;
  productCode?: string;
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

export default function ProductPage() {
  const params = useParams();
  const rawId = params?.id as string;
  const productId = parseInt(rawId, 10);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartAdding, setCartAdding] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        
        let foundProduct: Product | null = null;
        if (data.success && data.products && data.products.length > 0) {
          const matchingDbProduct = data.products.find((p: any) => p.id === productId);
          if (matchingDbProduct) {
            const folderWise = getFolderWiseImages(matchingDbProduct.product_name, matchingDbProduct.image1, matchingDbProduct.image2, matchingDbProduct.image3);
            foundProduct = {
              ...matchingDbProduct,
              image1: folderWise.image1,
              image2: folderWise.image2 || matchingDbProduct.image2,
              image3: folderWise.image3 || matchingDbProduct.image3
            };
          }
        }
        
        // Fallback to mock catalog
        if (!foundProduct) {
          const matchMock = MOCK_PRODUCTS.find((p) => p.id === productId);
          if (matchMock) foundProduct = matchMock;
        }

        setProduct(foundProduct);
      } catch (err) {
        console.warn('API error. Loading fallback item.');
        const matchMock = MOCK_PRODUCTS.find((p) => p.id === productId);
        if (matchMock) setProduct(matchMock);
      } finally {
        setLoading(false);
      }
    }
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-light flex flex-col items-center justify-center py-20 space-y-6">
        <span className="text-4xl">🍃</span>
        <h2 className="font-serif text-2xl font-bold text-forest">Product Not Found</h2>
        <p className="text-xs text-charcoal/60 max-w-xs text-center">
          The requested botanical product is not available in our apothecary collection.
        </p>
        <Link href="/shop" className="px-6 py-2.5 bg-forest text-cream text-xs font-bold uppercase tracking-wider rounded-full hover:bg-forest-light">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = [product.image1, product.image2, product.image3].filter(Boolean) as string[];

  const handleAddToCart = () => {
    setCartAdding(true);
    try {
      const stored = localStorage.getItem('cart');
      let cart = stored ? JSON.parse(stored) : [];
      
      const existingItemIdx = cart.findIndex((item: any) => item.id === product.id);
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
      console.error('Failed to update cart:', err);
    }
    setTimeout(() => {
      setCartAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    setBuyNowLoading(true);
    setTimeout(() => {
      handleAddToCart();
      setBuyNowLoading(false);
      window.dispatchEvent(new Event('open-cart'));
    }, 800);
  };

  const getImagePath = (imgName: string) => {
    return imgName.startsWith('uploads/') ? `/${imgName}` : `/uploads/${imgName}`;
  };

  return (
    <div className="min-h-screen bg-cream-light py-12 md:py-20">
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

        {/* Product Details Wrapper */}
        <div className="bg-white border border-forest/10 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-12 bg-white flex flex-col justify-between border-r border-forest/5">
            <div className="flex flex-col items-center">
              {/* Main Image Carousel (Enlarged size & p-2 to increase product dimensions) */}
              <div className="w-full aspect-square max-h-[500px] md:max-h-[550px] bg-cream rounded-2xl overflow-hidden relative border border-forest/5 flex items-center justify-center p-1.5 sm:p-3 group/carousel">
                {images.length > 0 ? (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedImageIdx}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                          const swipeThreshold = 50;
                          if (info.offset.x < -swipeThreshold) {
                            setSelectedImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
                          } else if (info.offset.x > swipeThreshold) {
                            setSelectedImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
                          }
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full h-full flex items-center justify-center cursor-zoom-in active:cursor-grabbing touch-pan-y"
                        onClick={() => setIsLightboxOpen(true)}
                      >
                        <img
                          src={getImagePath(images[selectedImageIdx])}
                          alt={product.product_name}
                          className="max-w-full max-h-full object-contain select-none pointer-events-none"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-forest shadow-md border border-forest/5 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-300 focus:outline-none z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setSelectedImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-forest shadow-md border border-forest/5 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-300 focus:outline-none z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Dots indicator inside the image area */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 flex space-x-1.5 z-10">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIdx(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              selectedImageIdx === idx ? 'bg-forest w-4' : 'bg-forest/20'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-forest text-6xl">🌱</div>
                )}
                {product.product_discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md z-10">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Save {product.product_discount}%</span>
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex space-x-3 mt-6 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-20 h-20 rounded-xl border-2 bg-cream overflow-hidden p-1 transition-all ${
                        selectedImageIdx === idx ? 'border-forest ring-2 ring-forest/10' : 'border-forest/5 hover:border-forest/30'
                      }`}
                    >
                      <img
                        src={getImagePath(img)}
                        alt={`thumbnail ${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Extra trust badges */}
            <div className="mt-12 border-t border-forest/5 pt-8 grid grid-cols-2 gap-4 text-xs text-charcoal/70">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-sage" />
                <span>Free Shipping above ₹499</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-sage" />
                <span>100% Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-start space-y-2.5 bg-cream/10">
            {/* Category */}
            <div>
              <span className="bg-forest/5 border border-forest/10 text-charcoal/80 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
                {product.product_category || 'Ayurveda'}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-forest tracking-tight leading-tight -mt-1">
              {product.product_name}
            </h1>

            {/* Rating Section */}
            <div className="flex items-center space-x-2 text-gold border-b border-forest/5 pb-2 -mt-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-forest">4.9 out of 5 stars</span>
              <span className="text-xs text-charcoal/40">| 18 customer reviews</span>
            </div>

            {/* Price Details */}
            <div className="space-y-0.5">
              <div className="flex items-baseline space-x-2">
                <span className="text-red-650 text-xl font-sans font-light">-{product.product_discount}%</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-forest">₹{(parseFloat(product.product_price) * quantity).toFixed(0)}</span>
              </div>
              <p className="text-[11px] text-charcoal/50">
                List Price: <span className="line-through">₹{(parseFloat(product.original_price) * quantity).toFixed(0)}</span>
              </p>
              <div className="inline-flex items-center space-x-1 text-[9px] bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded font-bold mt-1">
                <span>Inclusive of all taxes</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-b border-forest/5 py-1.5 text-xs">
              <div>
                <span className="text-charcoal/40 font-medium">Net Weight:</span>
                <span className="text-forest font-bold ml-1">{product.weight}</span>
              </div>
              {product.shelf_life && (
                <div>
                  <span className="text-charcoal/40 font-medium">Shelf Life:</span>
                  <span className="text-forest font-bold ml-1">{product.shelf_life}</span>
                </div>
              )}
            </div>

            {/* Action Panel */}
            <div className="space-y-2 pb-2 border-b border-forest/5">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="font-semibold text-forest">Select Quantity:</span>
                <div className="flex items-center space-x-3.5 border border-forest/15 rounded-lg px-3 py-1 bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-0.5 text-charcoal hover:text-forest font-bold text-base"
                  >
                    -
                  </button>
                  <span className="font-bold text-forest w-5 text-center text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-0.5 text-charcoal hover:text-forest font-bold text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={cartAdding}
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 border border-forest hover:bg-forest/5 text-forest rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  {cartAdding ? (
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

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={buyNowLoading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:bg-sage"
                >
                  {buyNowLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bullet highlights */}
            <div className="space-y-1">
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-forest">About this item:</h4>
              <ul className="space-y-1 text-xs text-charcoal/80 pl-4 list-disc marker:text-sage leading-relaxed">
                {product.point1 && <li>{product.point1}</li>}
                {product.point2 && <li>{product.point2}</li>}
                {product.point3 && <li>{product.point3}</li>}
                {product.point4 && <li>{product.point4}</li>}
                {product.point5 && <li>{product.point5}</li>}
              </ul>
            </div>

            {/* Detailed description */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-[11px] uppercase tracking-wider font-bold text-forest">Product Description:</h4>
              <p className="text-xs text-charcoal/85 leading-relaxed bg-white/50 p-4 rounded-xl border border-forest/5">
                {product.product_details}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors duration-200 focus:outline-none"
              aria-label="Close fullscreen"
            >
              <span className="text-2xl font-sans font-light">✕</span>
            </button>
            
            {/* Modal Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] aspect-square flex items-center justify-center bg-white rounded-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
              <img
                src={getImagePath(images[selectedImageIdx])}
                alt={product.product_name}
                className="max-w-full max-h-full object-contain rounded-xl select-none"
              />

              {/* Lightbox Flipping Chevrons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-forest shadow-md border border-forest/15 focus:outline-none z-10 transition-all hover:scale-105 active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-forest shadow-md border border-forest/15 focus:outline-none z-10 transition-all hover:scale-105 active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
