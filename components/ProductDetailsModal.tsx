'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CreditCard, Star, ShieldCheck, Truck, RefreshCw, Calendar, Tag } from 'lucide-react';

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

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (id: number, quantity: number) => void;
}

export default function ProductDetailsModal({ product, isOpen, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedImageIdx(0);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Gather list of non-empty images
  const images = [product.image1, product.image2, product.image3].filter(Boolean) as string[];

  const handleBuyNow = () => {
    setBuyNowLoading(true);
    setTimeout(() => {
      onAddToCart(product.id, quantity);
      setBuyNowLoading(false);
      onClose();
      // Instantly pop open the cart drawer to checkout
      window.dispatchEvent(new Event('open-cart'));
    }, 800);
  };

  const getImagePath = (imgName: string) => {
    return imgName.startsWith('uploads/') ? `/${imgName}` : `/uploads/${imgName}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-cream-light border border-forest/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-forest/5 text-charcoal hover:scale-105 transition-all z-20 shadow-sm border border-forest/5"
          >
            <X className="w-5 h-5 text-forest" />
          </button>

          {/* Left Column: Image Slider (Amazon style) */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-white flex flex-col justify-between border-r border-forest/5 overflow-y-auto">
            <div className="flex flex-col items-center">
              {/* Main Image View */}
              <div className="w-full aspect-square max-h-[360px] bg-cream rounded-2xl overflow-hidden relative border border-forest/5 flex items-center justify-center p-4">
                {images.length > 0 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={getImagePath(images[selectedImageIdx])}
                    alt={product.product_name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                    onError={(e) => {
                      // fallback
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=300&auto=format&fit=crop';
                    }}
                  />
                ) : (
                  <div className="text-forest text-6xl">🌱</div>
                )}
                {product.product_discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Save {product.product_discount}%</span>
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex space-x-3 mt-4 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl border-2 bg-cream overflow-hidden p-1 transition-all ${
                        selectedImageIdx === idx ? 'border-forest ring-2 ring-forest/10' : 'border-forest/5 hover:border-forest/30'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getImagePath(img)}
                        alt={`thumbnail ${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=300&auto=format&fit=crop';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Extra Info */}
            <div className="mt-8 border-t border-forest/5 pt-6 grid grid-cols-2 gap-4 text-xs text-charcoal/70">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-sage" />
                <span>Free Shipping above ₹499</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>100% Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Details (Amazon style layout) */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[80vh] md:max-h-[90vh] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Code */}
              <div className="flex items-center justify-between">
                <span className="bg-forest/5 border border-forest/10 text-charcoal/80 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                  {product.product_category || 'Ayurveda'}
                </span>
                {product.productCode && (
                  <span className="text-[10px] text-charcoal/40 font-mono">CODE: #{product.productCode}</span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-forest tracking-tight leading-tight">
                {product.product_name}
              </h2>

              {/* Amazon Ratings */}
              <div className="flex items-center space-x-1.5 text-gold border-b border-forest/5 pb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-forest">4.9 out of 5 stars</span>
                <span className="text-xs text-charcoal/40">| 18 customer reviews</span>
              </div>

              {/* Price Details */}
              <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                  <span className="text-red-650 text-2xl font-sans font-light">-{product.product_discount}%</span>
                  <span className="text-3xl font-sans font-extrabold text-forest">₹{parseFloat(product.product_price).toFixed(0)}</span>
                </div>
                <p className="text-xs text-charcoal/50">
                  List Price: <span className="line-through font-sans font-medium">₹{parseFloat(product.original_price).toFixed(0)}</span>
                </p>
                <div className="inline-flex items-center space-x-1 text-[10px] bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded">
                  <span>Inclusive of all taxes</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-b border-forest/5 py-4 text-xs">
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

              {/* Amazon-style Bullet Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-forest">About this item:</h4>
                <ul className="space-y-2 text-xs text-charcoal/80 pl-4 list-disc marker:text-sage">
                  {product.point1 && <li>{product.point1}</li>}
                  {product.point2 && <li>{product.point2}</li>}
                  {product.point3 && <li>{product.point3}</li>}
                  {product.point4 && <li>{product.point4}</li>}
                  {product.point5 && <li>{product.point5}</li>}
                </ul>
              </div>

              {/* Long Product Details */}
              <div className="space-y-2 border-t border-forest/5 pt-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-forest">Product Description:</h4>
                <p className="text-xs text-charcoal/85 leading-relaxed bg-white/40 p-4 rounded-xl border border-forest/5">
                  {product.product_details}
                </p>
              </div>
            </div>

            {/* Quantity Selector & Action Panel */}
            <div className="border-t border-forest/5 pt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-forest">Quantity:</span>
                <div className="flex items-center space-x-3 border border-forest/15 rounded-lg px-3 py-1 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-charcoal hover:text-forest font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-forest">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-charcoal hover:text-forest font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart(product.id, quantity);
                    onClose();
                  }}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 border border-forest hover:bg-forest/5 text-forest rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={buyNowLoading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md hover:shadow-lg disabled:bg-sage"
                >
                  {buyNowLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Buy Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
