'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import ProcessSection from '@/components/ProcessSection';
import BenefitSection from '@/components/BenefitSection';
import FounderVisionSection from '@/components/FounderVisionSection';
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
    product_name: 'Pureplush Herbal Waxing Powder',
    product_details: 'Pureplush Herbal Waxing Powder is a pain-free, natural hair removal solution. Made with standard botanicals to remove hair gently while leaving skin soft, smooth, and clean. 100g.',
    brief_details: 'Pain-free natural hair removal powder made with organic botanical ingredients for smooth skin.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'uploads/Herbal2.png',
    image2: 'uploads/herbal_waxing_powder_banner_1784778537801.png',
    weight: '100g',
    point1: '100% Organic & Natural',
    point2: 'Pain-Free Hair Removal',
    point3: 'Soft & Smooth Results',
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
    image1: 'uploads/Herbal4.png',
    image2: 'uploads/Artboard 1 (1).png',
    weight: '100g',
    point1: 'Deep Cleanses Pores',
    point2: 'Controls Excess Oil',
    point3: 'Gentle Natural Exfoliation',
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
    image1: 'Herbalfacepack/Artboard 1.png',
    image2: 'Herbalfacepack/Artboard 2.png',
    weight: '100g',
    point1: 'Detoxifies Skin Barrier',
    point2: 'Soothes Irritated Skin',
    point3: 'Brightens & Clarifies Tone',
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
    weight: '100g',
    point1: 'Amla & Shikakai Cleanser',
    point2: 'Bhringraj for Hair Growth',
    point3: 'Prevents Premature Graying',
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
    weight: '100g',
    point1: 'Deep Purifying Mud',
    point2: 'Moisturizing Mango Butter',
    point3: 'Handcrafted & Vegan',
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
    weight: '100g',
    point1: 'Absorbs Excess Oils',
    point2: 'Nourishing Shea Butter',
    point3: 'Combats Acne & Pimples',
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
    weight: '100g',
    point1: 'Toxin-Extracting Green Clay',
    point2: 'Soften & Hydrates Skin',
    point3: 'Rich Goat Milk Proteins',
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
    weight: '80g',
    point1: 'Scale-Free Scalp Cleansing',
    point2: 'Infused with Real Saffron',
    point3: 'Zero Waste Solid Bar',
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
    weight: '80g',
    point1: 'Antibacterial Neem & Tulsi',
    point2: 'Hibiscus Hair Conditioning',
    point3: 'Controls Dandruff & Itch',
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
    image1: 'CoffeeD/new1.png',
    image2: 'CoffeeD/WhatsApp Image 2026-07-15 at 5.18.10 PM.jpeg',
    weight: '100g',
    point1: 'Brightens & Evens Skin',
    point2: 'Fresh Farm Goat Milk',
    point3: 'Natural Coffee Scrub',
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
    const name = productName.toLowerCase();
    let img2 = databaseImage2;
    if ((name.includes('coffee') || name.includes('d tan') || name.includes('d-tan')) && (!img2 || img2.trim() === '')) {
      img2 = 'CoffeeD/WhatsApp Image 2026-07-15 at 5.18.10 PM.jpeg';
    }
    return {
      image1: databaseImage1,
      image2: img2,
      image3: databaseImage3
    };
  }

  const name = productName.toLowerCase();

  // Soaps mapping
  if (name.includes('soap')) {
    if (name.includes('coffee') || name.includes('d tan') || name.includes('d-tan')) {
      return {
        image1: databaseImage1 || 'CoffeeD/new1.png',
        image2: databaseImage2 || 'CoffeeD/WhatsApp Image 2026-07-15 at 5.18.10 PM.jpeg',
        image3: databaseImage3
      };
    }

    if (name.includes('mango') || name.includes('sea clay') || name.includes('mud')) {
      return {
        image1: databaseImage1 || 'MangoButter/Soap.png',
        image2: databaseImage2 || 'MangoButter/WhatsApp Image 2026-07-15 at 5.18.11 PM.jpeg',
        image3: databaseImage3 || 'MangoButter/IMG-20260123-WA0020.jpg',
        image4: ''
      };
    }

    if (name.includes('french') || name.includes('green clay')) {
      return {
        image1: databaseImage1 || 'Frenchgreenclay/Soap2.png',
        image2: databaseImage2 || 'Frenchgreenclay/WhatsApp Image 2026-07-10 at 7.10.16 PM.jpeg',
        image3: databaseImage3 || '',
        image4: databaseImage4 || ''
      };
    }

    if (name.includes('multani') || name.includes('shea')) {
      return {
        image1: databaseImage1 || 'Multanimitti/Soap3.png',
        image2: databaseImage2 || 'Multanimitti/WhatsApp Image 2026-07-10 at 7.10.16 PM (1).jpeg',
        image3: '',
        image4: ''
      };
    }

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
    if (name.includes('hibiscus') || name.includes('neem') || name.includes('tulsi')) {
      return {
        image1: 'Hibisus neem/new2.png',
        image2: 'Hibisus neem/Hibiscus neem tulsi1.jpeg',
        image3: 'Hibisus neem/hibiscus neem tulsi2.jpeg',
        image4: ''
      };
    }
    if (name.includes('multani') || name.includes('saffron')) {
      return {
        image1: databaseImage1 || 'multanimittishampoo/Shampoobar2.png',
        image2: databaseImage2 || 'multanimittishampoo/1770380073526.png',
        image3: '',
        image4: ''
      };
    }
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
      image1: databaseImage1 || 'Hibisus neem/new2.png',
      image2: databaseImage2 || 'Hibisus neem/Hibiscus neem tulsi1.jpeg',
      image3: databaseImage3 || 'Hibisus neem/hibiscus neem tulsi2.jpeg',
      image4: databaseImage4 || 'Hibisus neem/Hibiscus neem tulsi3.jpeg'
    };
  }

  if (name.includes('facepack') || name.includes('face pack')) {
    return {
      image1: databaseImage1 || 'Herbalfacepack/Artboard 1.png',
      image2: databaseImage2 || 'Herbalfacepack/Artboard 2.png',
      image3: databaseImage3 || '',
      image4: databaseImage4 || ''
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
        image1: databaseImage1 || 'uploads/Herbal4.png',
        image2: databaseImage2 || 'uploads/Artboard 1 (1).png',
        image3: ''
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

  if (name.includes('hair wash') || name.includes('hairwash') || name.includes('amla') || name.includes('shikakai') || name.includes('bhringraj')) {
    return {
      image1: databaseImage1 || 'Herbal/Herbal3.png',
      image2: databaseImage2 || 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM.jpeg',
      image3: databaseImage3 || 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM (1).jpeg',
      image4: databaseImage4 || 'Herbal/WhatsApp Image 2026-01-27 at 11.19.00 AM (2).jpeg'
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
    <div className="flex flex-col min-h-screen relative">
      {/* Background Lightening / Aurora Glow Effects & Beams / Sparks */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bg-aura-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1) translate(0px, 0px); }
          50% { opacity: 0.65; transform: scale(1.1) translate(30px, -20px); }
        }
        @keyframes beam-travel {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes spark-float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(15px); opacity: 0; }
        }
        .animate-bg-aura {
          animation: bg-aura-pulse 12s infinite alternate ease-in-out;
        }
        .animate-beam-1 {
          animation: beam-travel 12s infinite linear;
        }
        .animate-beam-2 {
          animation: beam-travel 16s infinite linear;
        }
        .animate-spark {
          animation: spark-float 9s infinite linear;
        }
      ` }} />
      
      {/* Ambient background flares, beams, and sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft glowing lighting blobs */}
        <div className="absolute top-[25%] right-[-15%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] animate-bg-aura" />
        <div className="absolute top-[65%] left-[-20%] w-[700px] h-[700px] bg-forest/5 rounded-full blur-[160px] animate-bg-aura [animation-delay:4s]" />

        {/* Aceternity UI Vertical Beams */}
        <div className="absolute top-0 left-[12%] bottom-0 w-[1px] bg-forest/5 hidden md:block">
          <div className="absolute left-[-1px] w-[3px] h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent animate-beam-1" />
        </div>
        <div className="absolute top-0 right-[12%] bottom-0 w-[1px] bg-forest/5 hidden md:block">
          <div className="absolute left-[-1px] w-[3px] h-40 bg-gradient-to-b from-transparent via-forest/30 to-transparent animate-beam-2 [animation-delay:4.5s]" />
        </div>

        {/* Magic UI Drifting Sparks */}
        <div className="absolute top-[35%] left-[20%] w-1.5 h-1.5 rounded-full bg-gold/35 blur-[0.5px] animate-spark" />
        <div className="absolute top-[45%] right-[25%] w-2 h-2 rounded-full bg-forest/25 blur-[1px] animate-spark [animation-delay:2s]" />
        <div className="absolute top-[75%] left-[30%] w-1.5 h-1.5 rounded-full bg-gold/45 blur-[0.5px] animate-spark [animation-delay:4s]" />
        <div className="absolute top-[85%] right-[15%] w-2.5 h-2.5 rounded-full bg-forest/25 blur-[1px] animate-spark [animation-delay:1s]" />
      </div>

      {/* Animated Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategorySection />

      {/* Sourcing Process Timeline */}
      <ProcessSection />

      {/* Founder Story, Vision Statement & Company Details */}
      <FounderVisionSection />

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {products.slice(0, 3).map((product, idx) => (
                  <ProductCard
                    key={`home-${product.id}-${idx}`}
                    product={product}
                    addingToCartId={addingToCartId}
                    onAddToCart={handleAddToCart}
                    index={idx}
                  />
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

      {/* Targeted Health Concern Selector */}
      <BenefitSection />

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
