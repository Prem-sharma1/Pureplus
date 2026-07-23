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
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        
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
      
      if (sCat === 'moringa') {
        categoryMatch = pCat === 'moringa';
      } else if (sCat === 'soaps') {
        categoryMatch = pCat === 'soaps';
      } else if (sCat === 'shampoo') {
        categoryMatch = pCat === 'shampoo';
      } else if (sCat === 'others') {
        categoryMatch = pCat !== 'moringa' && pCat !== 'soaps' && pCat !== 'shampoo';
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={`shop-${product.id}-${idx}`}
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
