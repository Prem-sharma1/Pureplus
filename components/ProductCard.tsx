'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, RefreshCw, Tag, Star, Leaf } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  addingToCartId: number | null;
  onAddToCart: (id: number) => void;
  index: number;
}

function ProductImage({
  src1,
  src2,
  alt,
  isHovered
}: {
  src1: string;
  src2?: string;
  alt: string;
  isHovered: boolean;
}) {
  const [hasError1, setHasError1] = useState(false);
  const [hasError2, setHasError2] = useState(false);

  const resolvePath = (s?: string) => {
    if (!s) return '';
    if (s.startsWith('http')) return s;
    let res = s;
    if (!res.startsWith('/')) {
      if (
        res.startsWith('CoffeeD/') ||
        res.startsWith('Categoryimg/') ||
        res.startsWith('FaceWash/') ||
        res.startsWith('Shampoobar/') ||
        res.startsWith('Soap/') ||
        res.startsWith('Herbal/') ||
        res.startsWith('Multanimitti/') ||
        res.startsWith('MangoButter/') ||
        res.startsWith('Frenchgreenclay/') ||
        res.startsWith('Herbalfacepack/') ||
        res.startsWith('Hibisus neem/') ||
        res.startsWith('multanimittishampoo/') ||
        res.startsWith('uploads/')
      ) {
        res = `/${res}`;
      } else {
        res = `/uploads/${res}`;
      }
    }
    return encodeURI(res);
  };

  const path1 = resolvePath(src1);
  const path2 = src2 ? resolvePath(src2) : '';
  const hasSecondary = !!(path2 && !hasError2);

  if (hasError1 || !src1) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-tr from-sage/10 to-transparent">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/15 to-gold/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Leaf className="w-8 h-8 text-forest/75" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-0 bg-neutral-100/50 overflow-hidden rounded-t-3xl">
      {/* Primary Image (image1) - 100% Full Container */}
      <img
        src={path1}
        alt={alt}
        onError={() => setHasError1(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out z-10 rounded-t-3xl ${
          hasSecondary && isHovered
            ? 'opacity-0 scale-105 pointer-events-none'
            : 'opacity-100 scale-100 group-hover:scale-105'
        }`}
      />

      {/* Card Flipper: Secondary Image (image2) on Hover - 100% Full Container */}
      {hasSecondary && (
        <img
          src={path2}
          alt={`${alt} - second view`}
          onError={() => setHasError2(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out z-20 rounded-t-3xl ${
            isHovered
              ? 'opacity-100 scale-105'
              : 'opacity-0 scale-100 pointer-events-none'
          }`}
        />
      )}
    </div>
  );
}

export default function ProductCard({ product, addingToCartId, onAddToCart, index }: ProductCardProps) {
  const isAdding = addingToCartId === product.id;
  const displayName = product.product_name.replace(/^Pureplush\s+/i, '');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.3) }}
      onClick={() => {
        window.location.href = `/product/${product.id}`;
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-neutral-200/90 rounded-3xl shadow-md hover:shadow-2xl hover:shadow-forest/10 hover:border-forest/30 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between group cursor-pointer relative"
    >
      {/* Aceternity UI Spotlight Card Glow Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(74, 119, 60, 0.1), transparent 80%)`,
          }}
        />
      )}

      {/* Visual Image Container (100% Full Bleed & Adjusted Proportions) */}
      <div className="relative aspect-[4/5] min-h-[200px] xs:min-h-[240px] sm:min-h-[320px] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100 z-10">
        <ProductImage src1={product.image1} src2={product.image2} alt={displayName} isHovered={isHovered} />

        {/* Shimmer animation on card hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none z-30" />

        {/* Discount badge */}
        {product.product_discount > 0 && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-400/95 backdrop-blur-md border border-amber-500/20 text-forest text-[10px] sm:text-xs font-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center space-x-1 shadow-lg z-30">
            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-forest animate-[pulse_2s_infinite]" />
            <span>Save {product.product_discount}%</span>
          </span>
        )}

        {/* Category badge */}
        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 border border-forest/20 backdrop-blur-md text-forest text-[9px] sm:text-[10px] uppercase tracking-wider font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md z-30">
          {product.product_category || 'Wellness'}
        </span>

        {/* Net weight tag */}
        <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 text-neutral-800 text-[10px] sm:text-xs font-black border border-neutral-200 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-md z-30">
          {product.weight || '100g'}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-3.5 sm:p-5 flex-grow flex flex-col justify-between z-10 relative bg-white">
        <div>
          {/* Star Rating & Badge */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 mb-1.5 sm:mb-2 select-none">
            <div className="flex space-x-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current drop-shadow-xs" />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-black text-amber-900 bg-amber-50 border border-amber-200/70 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full ml-1">
              4.9 rating
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-lg font-black font-serif text-forest tracking-tight group-hover:text-emerald-800 transition-colors leading-tight sm:leading-snug line-clamp-2">
            {displayName}
          </h3>

          {/* Short Description */}
          <p className="text-[11px] sm:text-sm text-neutral-700 font-medium mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed font-sans text-left hidden xs:block">
            {product.brief_details}
          </p>

          {/* Bullet points */}
          <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5 border-t border-forest/10 pt-2 sm:pt-2.5">
            {[product.point1, product.point2, product.point3].filter(Boolean).map((pt, i) => (
              <div key={i} className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-bold text-emerald-950 text-left">
                <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                <span className="leading-tight line-clamp-1">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-forest/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-sm text-neutral-400 font-bold line-through leading-none mb-0.5 sm:mb-1 font-sans">
              ₹{parseFloat(product.original_price).toFixed(0)}
            </span>
            <span className="text-lg sm:text-2xl font-sans font-black text-forest leading-none tracking-tight">
              ₹{parseFloat(product.product_price).toFixed(0)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            disabled={isAdding}
            className={`inline-flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              isAdding
                ? 'bg-sage/40 text-forest border border-sage'
                : 'bg-gradient-to-r from-forest to-emerald-800 hover:from-forest-light hover:to-emerald-700 text-cream shadow-md hover:shadow-lg hover:shadow-forest/20 active:scale-95 hover:-translate-y-0.5'
            }`}
          >
            {isAdding ? (
              <>
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                <span className="hidden sm:inline">Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

