'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Clock, ArrowRight, ChevronRight, Leaf } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-use-shampoo-bar',
    title: 'How to Use a Solid Shampoo Bar: Simple Step-by-Step Guide for Beginners',
    excerpt: 'Transitioning to a zero-waste solid shampoo bar? Learn how to lather, apply, and care for your shampoo bar for fresh, clean hair.',
    category: 'Hair Care Rituals',
    readTime: '4 min read',
    date: 'July 2026',
    image: 'multanimittishampoo/Shampoobar2.png'
  },
  {
    slug: 'powder-facewash-guide',
    title: 'Powder Facewash: Benefits, How to Mix, and Who Should Use It',
    excerpt: 'Discover why stone-ground dry face wash powders are becoming a daily skincare essential for gentle, customizable cleansing.',
    category: 'Skincare Advice',
    readTime: '5 min read',
    date: 'July 2026',
    image: 'uploads/Herbal4.png'
  },
  {
    slug: 'how-to-make-soap-last-longer',
    title: 'How to Make Handmade Soap Bars Last Longer in Your Shower',
    excerpt: 'Simple draining, storage, and handling tips to get the maximum uses out of your cold-processed handcrafted soap bars.',
    category: 'Bath & Body Care',
    readTime: '3 min read',
    date: 'July 2026',
    image: 'MangoButter/Soap.png'
  },
  {
    slug: 'weekly-facepack-ritual',
    title: 'Weekly Herbal Facepack Ritual for Fresh, Clean Skin',
    excerpt: 'How to mix Multani Mitti and rose water for a relaxing weekly skincare mask ritual that leaves skin clean and comfortable.',
    category: 'Skincare Rituals',
    readTime: '4 min read',
    date: 'July 2026',
    image: 'Herbalfacepack/Artboard 1.png'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream-light py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-wider mb-4 border border-forest/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Pureplush Learning Journal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest tracking-tight">
            Botanical Care & Self-Care Guides
          </h1>
          <p className="text-charcoal/70 text-xs sm:text-base mt-4 leading-relaxed">
            Explore step-by-step guides on using solid shampoo bars, powder facewashes, handmade soaps, and traditional botanical rituals.
          </p>

          <div className="mt-6 inline-flex space-x-4">
            <Link
              href="/ingredients"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-forest text-cream rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-forest-light transition-all"
            >
              <Leaf className="w-4 h-4 text-gold" />
              <span>Explore Ingredient Glossary</span>
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-forest/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-charcoal/60">
                  <span className="bg-forest/5 border border-forest/10 text-forest font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-sage" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest group-hover:text-forest-light transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-8 pb-8 pt-2 border-t border-forest/5 flex items-center justify-between text-xs font-bold text-forest">
                <span>{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-1.5 text-gold-dark group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
}
