'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, RefreshCw, ShoppingCart, Tag, Star, ArrowLeft } from 'lucide-react';
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
  point1?: string;
  point2?: string;
  point3?: string;
}

import { resolveImagePath } from '@/lib/imageUtils';

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }
    const path = resolveImagePath(src);
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
    product_name: 'Pureplush Herbal Waxing Powder',
    product_details: 'Pureplush Herbal Waxing Powder is a pain-free, natural hair removal solution. Made with standard botanicals to remove hair gently while leaving skin soft, smooth, and clean. 100g.',
    brief_details: 'Pain-free natural hair removal powder made with organic botanical ingredients for smooth skin.',
    product_price: '249.00',
    original_price: '299.00',
    product_category: 'moringa',
    product_discount: 16,
    image1: 'uploads/Herbal2.png',
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

export default function CategoryPage() {
  const params = useParams();
  const rawCategory = params?.category as string;
  const categoryId = rawCategory ? rawCategory.toLowerCase() : 'all';

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  
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
    const pCat = product.product_category.toLowerCase();
    
    if (categoryId === 'moringa' || categoryId === 'powders') {
      return pCat === 'moringa';
    }
    if (categoryId === 'soaps') {
      return pCat === 'soaps';
    }
    if (categoryId === 'shampoo') {
      return pCat === 'shampoo';
    }
    if (categoryId === 'others') {
      return pCat !== 'moringa' && pCat !== 'soaps' && pCat !== 'shampoo';
    }
    return true;
  });

  // Get Page Header styling based on Category
  const getHeaderInfo = () => {
    switch (categoryId) {
      case 'moringa':
      case 'powders':
        return {
          title: 'Herbal Skin & Hair Powders',
          subtitle: 'Apothecary Collection',
          desc: '100% natural, stone-ground wellness and skincare powders sourced directly from organic ingredients.'
        };
      case 'soaps':
        return {
          title: 'Handcrafted Premium Soaps',
          subtitle: 'Bath & Body Collection',
          desc: 'Organic cold-processed soap bars infused with organic essential oils and pure botanical herbs.'
        };
      case 'shampoo':
        return {
          title: 'Luxury Shampoo Bars',
          subtitle: 'Hair Care Collection',
          desc: 'Solid zero-waste shampoo bars formulated to deeply nourish and restore scalp and follicle health.'
        };
      case 'others':
        return {
          title: 'Special Care Remedies',
          subtitle: 'Targeted Treatments',
          desc: 'Rich soothing aloe vera gels, oils, and unique traditional wellness formulations.'
        };
      default:
        return {
          title: 'Wellness Apothecary',
          subtitle: 'Our Collections',
          desc: 'Explore all natural body, skin, and nutritional formulations crafted for holistic well-being.'
        };
    }
  };

  const header = getHeaderInfo();

  return (
    <div className="min-h-screen bg-cream-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-forest hover:text-forest-light text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-forest/10 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sage-dark">
              {header.subtitle}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-forest mt-2">
              {header.title}
            </h1>
          </div>
          <p className="text-charcoal/70 max-w-md text-xs sm:text-sm mt-4 md:mt-0">
            {header.desc}
          </p>
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
              We couldn&apos;t find any items in this collection.
            </p>
            <Link
              href="/shop"
              className="mt-6 px-6 py-2.5 bg-forest text-cream text-xs font-bold uppercase tracking-wider rounded-full hover:bg-forest-light transition-all inline-block"
            >
              Browse Shop Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  window.location.href = `/product/${product.id}`;
                }}
                className="bg-white border border-forest/10 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative bg-white h-80 sm:h-96 min-h-[340px] w-full border-b border-forest/5 overflow-hidden p-3 flex items-center justify-center">
                  <ProductImage src={product.image1} alt={product.product_name} />
                  {product.product_discount > 0 && (
                    <span className="absolute top-4 left-4 bg-gold text-forest text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Save {product.product_discount}%</span>
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-forest/5 border border-forest/10 text-charcoal/80 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                    {product.product_category || 'Wellness'}
                  </span>
                  <span className="absolute bottom-3 right-4 bg-white/80 text-charcoal text-[10px] font-bold border border-forest/5 px-2 py-0.5 rounded-md">
                    {product.weight || '100g'}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-gold mb-2.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-[10px] font-semibold text-charcoal/50 ml-1">(4.9)</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-forest tracking-tight group-hover:text-forest-light transition-colors leading-tight">
                      {product.product_name}
                    </h3>
                    <p className="text-xs text-charcoal/80 mt-2 line-clamp-2 leading-relaxed">
                      {product.brief_details}
                    </p>

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

                  <div className="mt-6 pt-4 border-t border-forest/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-charcoal/40 line-through leading-none mb-1 font-sans font-medium">
                        ₹{parseFloat(product.original_price).toFixed(0)}
                      </span>
                      <span className="text-lg font-sans font-extrabold text-forest leading-none">
                        ₹{parseFloat(product.product_price).toFixed(0)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                      disabled={addingToCartId === product.id}
                      className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
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
        )}

      </div>


    </div>
  );
}
