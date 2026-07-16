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
  image4?: string;
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
    product_name: 'Pureplush Herbal Waxing Powder',
    product_details: 'Pureplush Herbal Waxing Powder is a pain-free, natural hair removal solution. Made with standard botanicals to remove hair gently while leaving skin soft, smooth, and clean. 100g.',
    brief_details: 'Pain-free natural hair removal powder made with organic botanical ingredients for smooth skin.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'FaceWash/Herbal2.png',
    image2: 'Artboard 1 (2).png',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '12 Months',
    point1: '100% Organic & Natural',
    point2: 'Pain-Free Hair Removal',
    point3: 'Soft & Smooth Results',
    point4: 'No Skin Irritation',
    point5: 'Chemical Free Base',
    productCode: 'PP-POWDER-WAXING'
  },
  {
    id: 28,
    product_name: 'Pureplush Herbal Facewash powder',
    product_details: 'Pureplush Herbal Facewash Powder is a traditional dry face wash blend. It deeply cleanses pores, removes excess oil, and gently exfoliates for a clear, glowing complexion. 100g.',
    brief_details: 'Traditional exfoliating dry face wash powder to cleanse pores and restore natural glow.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'FaceWash/Herbal4.png',
    image2: 'Artboard 1 (1).png',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Deep Cleanses Pores',
    point2: 'Controls Excess Oil',
    point3: 'Gentle Natural Exfoliation',
    point4: 'Chemical-Free Daily Cleanser',
    point5: 'Suitable for All Skin Types',
    productCode: 'PP-POWDER-FACEWASH'
  },
  {
    id: 108,
    product_name: 'Pureplush Herbal Facepack',
    product_details: 'Pureplush Herbal Facepack is a nutrient-rich skin reviving treatment. Infused with organic herbs to detoxify, soothe, and brighten the skin barrier. 100g.',
    brief_details: 'Botanical detoxifying face mask to soothe irritation and brighten skin complexion.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'FaceWash/Herbal1.png',
    image2: 'Artboard 1.png',
    image3: 'Artboard 2.png',
    image4: 'Artboard 5 (1).png',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Detoxifies Skin Barrier',
    point2: 'Soothes Irritated Skin',
    point3: 'Brightens & Clarifies Tone',
    point4: '100% Raw Botanical Mud & Clay',
    point5: 'Fades Dark Blemishes',
    productCode: 'PP-POWDER-FACEPACK'
  },
  {
    id: 105,
    product_name: 'PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj',
    product_details: 'Pureplush Herbal Hair Wash Powder is a complete hair nourishment blend. Sourced with organic Amla, Shikakai, and Bhringraj to promote hair growth, prevent graying, and clean hair naturally. 100g.',
    brief_details: 'Complete organic hair wash powder containing Amla, Shikakai & Bhringraj for strong, healthy hair.',
    product_price: '249.00',
    original_price: '349.00',
    product_category: 'moringa',
    product_discount: 29,
    image1: 'FaceWash/Herbal3.png',
    image2: 'WhatsApp Image 2026-01-27 at 11.19.00 AM (1).jpeg',
    image3: 'WhatsApp Image 2026-01-27 at 11.19.00 AM (2).jpeg',
    image4: 'WhatsApp Image 2026-01-27 at 11.19.00 AM.jpeg',
    weight: '100g',
    shelf_life: '12 Months',
    point1: 'Amla & Shikakai Cleanser',
    point2: 'Bhringraj for Hair Growth',
    point3: 'Prevents Premature Graying',
    point4: 'Anti-Dandruff & Scalp Health',
    point5: 'Zero Synthetic Preservatives',
    productCode: 'PP-POWDER-HAIRWASH'
  },
  {
    id: 101,
    product_name: 'Pureplush mangobutter Mud Sea Clay Soap',
    product_details: 'Pureplush Handcrafted Mango Butter, Mud & Sea Clay Soap. Deeply purifies with sea clay, extracts impurities with natural mud, and intensely moisturizes with organic mango butter. 100g.',
    brief_details: 'Handcrafted moisturizing soap bar with sea clay mud and rich organic mango butter.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'Soap/Soap.png',
    image2: '1770431215716.png',
    image3: 'IMG-20260123-WA0020.jpg',
    image4: 'IMG-20260123-WA0021.jpg',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Deep Purifying Mud',
    point2: 'Moisturizing Mango Butter',
    point3: 'Handcrafted & Vegan',
    point4: 'Creamy Hydrating Lather',
    point5: 'Sulphate & Paraben Free',
    productCode: 'PP-SOAP-MANGO-MUD'
  },
  {
    id: 102,
    product_name: 'Pureplush Sheabutter Multani Mitti Soap',
    product_details: 'Pureplush Handcrafted Shea Butter & Multani Mitti Soap. Combines the oil-absorbing power of Multani Mitti (fullers earth) with the deep conditioning of organic raw shea butter. 100g.',
    brief_details: 'Handcrafted oil-control soap containing fullers earth clay and nourishing shea butter.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'Soap/Soap3.png',
    image2: '1770431254493.png',
    image3: 'IMG-20260205-WA0002.jpg',
    image4: '',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Absorbs Excess Oils',
    point2: 'Nourishing Shea Butter',
    point3: 'Combats Acne & Pimples',
    point4: 'Gentle Detoxifying Clay',
    point5: 'Soft & Nourished Skin Texture',
    productCode: 'PP-SOAP-SHEA-MULTANI'
  },
  {
    id: 103,
    product_name: 'Pureplush Goatmilk French Green Clay Soap',
    product_details: 'Pureplush Handcrafted Goat Milk & French Green Clay Soap. French green clay draws out toxins, while fresh farm goat milk softens, hydrates, and restores natural pH. 100g.',
    brief_details: 'Handcrafted detoxifying soap containing French green clay and moisturizing goat milk.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'Soap/Soap2.png',
    image2: '1770431142988.png',
    image3: 'IMG-20260123-WA0014.jpg',
    image4: 'IMG-20260205-WA0000.jpg',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Toxin-Extracting Green Clay',
    point2: 'Soften & Hydrates Skin',
    point3: 'Rich Goat Milk Proteins',
    point4: 'Gentle pH Balanced Cleanser',
    point5: 'Handcrafted Cold-Pressed Base',
    productCode: 'PP-SOAP-GOAT-CLAY'
  },
  {
    id: 109,
    product_name: 'Pureplush Goatmilk Coffee D Tan Soap',
    product_details: 'Pureplush Handcrafted Goat Milk & Coffee D-Tan Soap. Gently exfoliates dead skin cells, draws out impurities, and deeply moisturizes with fresh farm goat milk and rich aromatic coffee. 100g.',
    brief_details: 'Handcrafted exfoliating soap containing fresh goat milk and aromatic coffee to brighten and scrub skin.',
    product_price: '99.00',
    original_price: '149.00',
    product_category: 'soaps',
    product_discount: 33,
    image1: 'Soap/new1.png',
    image2: '',
    image3: '',
    image4: '',
    weight: '100g',
    shelf_life: '24 Months',
    point1: 'Brightens & Evens Skin',
    point2: 'Fresh Farm Goat Milk',
    point3: 'Natural Coffee Scrub',
    point4: 'Draws Out Impurities',
    point5: 'Sulphate & Paraben Free',
    productCode: 'PP-SOAP-GOAT-COFFEE'
  },
  {
    id: 104,
    product_name: 'Pureplush Multani Mitti Saffron Shampoo Bar',
    product_details: 'Pureplush Solid Multani Mitti & Saffron Shampoo Bar. Saffron extracts enhance natural hair shine, while Multani Mitti clay gently cleanses the scalp of grease and build-up. 80g.',
    brief_details: 'Zero-waste solid shampoo bar with shine-enhancing saffron and cleansing Multani Mitti.',
    product_price: '199.00',
    original_price: '299.00',
    product_category: 'shampoo',
    product_discount: 33,
    image1: 'Shampoobar/Shampoobar2.png',
    image2: '1770380073526.png',
    image3: 'file_00000000267071f8b9d3086f51ee7abc(3).png',
    image4: 'file_00000000267071f8b9d3086f51ee7abc(4).png',
    weight: '80g',
    shelf_life: '18 Months',
    point1: 'Scale-Free Scalp Cleansing',
    point2: 'Infused with Real Saffron',
    point3: 'Zero Waste Solid Bar',
    point4: 'Promotes Rich Hair Volume',
    point5: 'Chemical & Sulphate Free',
    productCode: 'PP-SHAMPOO-MULTANI-SAFFRON'
  },
  {
    id: 107,
    product_name: 'Pureplush Hibiscus Neemtulsi Shampoo Bar',
    product_details: 'Pureplush Solid Hibiscus, Neem & Tulsi Shampoo Bar. Hibiscus conditions hair shafts, while Neem and Tulsi extract provide antibacterial protection to reduce dandruff and itching. 80g.',
    brief_details: 'Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.',
    product_price: '199.00',
    original_price: '299.00',
    product_category: 'shampoo',
    product_discount: 33,
    image1: 'Shampoobar/new2.png',
    image2: '1770379957428.png',
    image3: 'IMG-20260119-WA0004.jpg',
    image4: 'IMG-20260119-WA0006.jpg',
    weight: '80g',
    shelf_life: '18 Months',
    point1: 'Antibacterial Neem & Tulsi',
    point2: 'Hibiscus Hair Conditioning',
    point3: 'Controls Dandruff & Itch',
    point4: 'Soothing Scalp Defense',
    point5: 'Biodegradable Travel Bar',
    productCode: 'PP-SHAMPOO-HIBISCUS-NEEM'
  }
];

interface FolderWiseImages {
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

const getFolderWiseImages = (
  productName: string,
  databaseImage1?: string,
  databaseImage2?: string,
  databaseImage3?: string,
  databaseImage4?: string
): FolderWiseImages => {
  if (databaseImage1 && databaseImage1.trim() !== '') {
    return {
      image1: databaseImage1,
      image2: databaseImage2,
      image3: databaseImage3,
      image4: databaseImage4
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
                <span className="text-2xl md:text-3xl font-sans font-extrabold text-forest">₹{(parseFloat(product.product_price) * quantity).toFixed(0)}</span>
              </div>
              <p className="text-xs text-charcoal/50">
                List Price: <span className="line-through font-sans font-medium">₹{(parseFloat(product.original_price) * quantity).toFixed(0)}</span>
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
