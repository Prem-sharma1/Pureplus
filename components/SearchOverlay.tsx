'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Leaf, TrendingUp } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_KEYWORDS = [
  { text: 'ABC Latte Malt', category: 'ABC malt' },
  { text: 'Choco Millet Malt', category: 'choco' },
  { text: 'Premium Soaps', category: 'Soaps' },
  { text: 'Luxury Shampoo', category: 'Shampoo' }
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-focus input on open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Escape key listener to close overlay
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
    window.location.href = `/shop?search=${encodeURIComponent(keyword)}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-md flex flex-col items-center justify-start pt-24 md:pt-36 px-4"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 p-2.5 rounded-full border border-forest/10 hover:bg-forest/5 text-charcoal hover:scale-105 transition-all"
          >
            <X className="w-6 h-6 text-forest" />
          </button>

          {/* Core Search Box container */}
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl flex flex-col space-y-8"
          >
            {/* Header info */}
            <div className="flex items-center space-x-2 text-forest/70 justify-center">
              <Leaf className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">Search Pureplush Wellness</span>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative w-full border-b-2 border-forest/25 focus-within:border-forest transition-colors py-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What natural therapy are you looking for?"
                className="w-full pl-2 pr-12 text-lg md:text-2xl font-serif text-forest bg-transparent outline-none border-none placeholder-sage-dark/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:scale-110 transition-transform"
              >
                <Search className="w-6 h-6 text-forest" />
              </button>
            </form>

            {/* Suggestions & Keywords */}
            <div className="flex flex-col space-y-4 pt-4">
              <div className="flex items-center space-x-2 text-charcoal/50">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider font-sans">Trending Searches</span>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {TRENDING_KEYWORDS.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordClick(keyword.text)}
                    className="px-4.5 py-2 rounded-full border border-forest/10 hover:border-forest bg-white hover:bg-forest/5 text-xs text-charcoal font-medium hover:text-forest transition-all shadow-sm"
                  >
                    {keyword.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive instructions */}
            <p className="text-[10px] text-center text-charcoal/40 pt-12">
              Press <kbd className="font-mono bg-forest/5 px-1.5 py-0.5 rounded border border-forest/10 shadow-sm">ESC</kbd> to exit search
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
