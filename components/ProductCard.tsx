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

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-tr from-sage/10 to-transparent">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/15 to-gold/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Leaf className="w-8 h-8 text-forest/75" />
        </div>
      </div>
    );
  }

  const path = src.startsWith('uploads/') ? `/${src}` : `/uploads/${src}`;
  const isFullBleed = src.includes('6330345451856531101') || src.includes('6330345451856531104');

  if (isFullBleed) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-0">
        <img
          src={path}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/[0.015] group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-5 bg-cream/20">
      <img
        src={path}
        alt={alt}
        onError={() => setHasError(true)}
        className="max-w-full max-h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-500 ease-out z-10 mix-blend-multiply"
      />
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
      className="bg-white border border-neutral-200/90 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-forest/10 hover:border-forest/30 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between group cursor-pointer relative"
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

      {/* Visual Image Container */}
      <div className="relative h-72 w-full overflow-hidden bg-cream/40 border-b border-neutral-100 z-10">
        <ProductImage src={product.image1} alt={displayName} />

        {/* Shimmer animation on card hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

        {/* Discount badge */}
        {product.product_discount > 0 && (
          <span className="absolute top-3.5 left-3.5 bg-amber-400 text-forest text-xs font-black px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-md">
            <Tag className="w-4 h-4 text-forest animate-[pulse_2s_infinite]" />
            <span>Save {product.product_discount}%</span>
          </span>
        )}

        {/* Category badge */}
        <span className="absolute top-3.5 right-3.5 bg-white/95 border border-forest/20 backdrop-blur-md text-forest text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-full shadow-sm">
          {product.product_category || 'Wellness'}
        </span>

        {/* Net weight tag */}
        <span className="absolute bottom-3 right-3.5 bg-white/95 text-neutral-800 text-xs font-black border border-neutral-200 px-3 py-1 rounded-md shadow-sm">
          {product.weight || '100g'}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-grow flex flex-col justify-between z-10 relative bg-white">
        <div>
          {/* Star Rating & Badge */}
          <div className="flex items-center space-x-1.5 mb-2 select-none">
            <div className="flex space-x-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-current drop-shadow-xs" />
              ))}
            </div>
            <span className="text-xs font-black text-amber-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full ml-1">
              4.9 rating
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-black font-serif text-forest tracking-tight group-hover:text-emerald-800 transition-colors leading-snug">
            {displayName}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-700 font-medium mt-2 line-clamp-2 leading-relaxed font-sans text-left">
            {product.brief_details}
          </p>

          {/* Bullet points */}
          <div className="mt-3 space-y-1.5 border-t border-forest/10 pt-2.5">
            {[product.point1, product.point2, product.point3].filter(Boolean).map((pt, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs font-bold text-emerald-950 text-left">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                <span className="leading-snug">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-3.5 border-t border-forest/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-neutral-400 font-bold line-through leading-none mb-1 font-sans">
              ₹{parseFloat(product.original_price).toFixed(0)}
            </span>
            <span className="text-xl sm:text-2xl font-sans font-black text-forest leading-none tracking-tight">
              ₹{parseFloat(product.product_price).toFixed(0)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            disabled={isAdding}
            className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
              isAdding
                ? 'bg-sage/40 text-forest border border-sage'
                : 'bg-gradient-to-r from-forest to-emerald-800 hover:from-forest-light hover:to-emerald-700 text-cream shadow-md hover:shadow-lg hover:shadow-forest/20 active:scale-95 hover:-translate-y-0.5'
            }`}
          >
            {isAdding ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

