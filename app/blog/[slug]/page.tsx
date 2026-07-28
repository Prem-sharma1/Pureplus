'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BLOG_POSTS } from '../page';
import { ArrowLeft, Clock, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

const ARTICLE_CONTENT: Record<string, {
  content: React.ReactNode;
  relatedCategoryUrl: string;
  relatedCategoryName: string;
}> = {
  'how-to-use-shampoo-bar': {
    relatedCategoryUrl: '/category/shampoo',
    relatedCategoryName: 'Solid Shampoo Bars',
    content: (
      <div className="space-y-6 text-sm text-charcoal/85 leading-relaxed">
        <p className="text-base text-forest font-medium">
          Solid shampoo bars are a travel-friendly, zero-waste alternative to liquid shampoos packaged in plastic bottles. If you are new to shampoo bars, here is a quick step-by-step guide to getting the best performance and lather out of your bar.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Step 1: Thoroughly Wet Your Hair
        </h3>
        <p>
          Before touching the shampoo bar to your scalp, ensure your hair and scalp are completely drenched with lukewarm water. Water acts as the essential activator for natural plant surfactants like Sodium Cocoyl Isethionate.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Step 2: Lather the Bar
        </h3>
        <p>
          You can either rub the shampoo bar between wet hands to create a rich creamy lather, or gently stroke the bar directly onto your scalp in 3-4 sections (from hairline to nape).
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Step 3: Massage the Scalp Gently
        </h3>
        <p>
          Use your fingertips (not fingernails) to massage your scalp in circular motions. Focus on cleansing your scalp where oil and dirt accumulate — the lather will rinse through the ends naturally.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Step 4: Rinse Thoroughly and Dry the Bar
        </h3>
        <p>
          Rinse hair completely with water until water runs clear. After your shower, place your shampoo bar on a well-draining soap dish away from direct water stream so it dries completely between uses.
        </p>
      </div>
    )
  },

  'powder-facewash-guide': {
    relatedCategoryUrl: '/product/28',
    relatedCategoryName: 'Pureplush Herbal Facewash Powder',
    content: (
      <div className="space-y-6 text-sm text-charcoal/85 leading-relaxed">
        <p className="text-base text-forest font-medium">
          Stone-ground dry face wash powders offer a concentrated, waterless daily cleansing experience free from synthetic preservatives.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Why Choose Powder Facewash?
        </h3>
        <p>
          Liquid face washes often consist of 80% water and require synthetic preservatives to maintain shelf life. Dry powders consist 100% of stone-ground botanical powders such as Multani Mitti, Sandalwood, Rose Petal, and Neem.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          How to Mix and Apply
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Take 1 teaspoon of powder in your palm or a small bowl.</li>
          <li>Add a few drops of water, rose water, or curd depending on your skin preference.</li>
          <li>Mix into a smooth, liquid paste.</li>
          <li>Gently massage over wet face for 30–60 seconds and rinse thoroughly.</li>
        </ul>
      </div>
    )
  },

  'how-to-make-soap-last-longer': {
    relatedCategoryUrl: '/category/soaps',
    relatedCategoryName: 'Handcrafted Soaps',
    content: (
      <div className="space-y-6 text-sm text-charcoal/85 leading-relaxed">
        <p className="text-base text-forest font-medium">
          Handcrafted cold-processed soaps contain natural glycerin which attracts moisture. To extend the life of your natural soap bar, follow these practical care tips.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          1. Use a Draining Soap Dish
        </h3>
        <p>
          Never let natural soap sit in puddles of water. Use a wooden or slatted soap dish that elevates the bar and allows air circulation underneath.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          2. Keep Away from Direct Shower Spray
        </h3>
        <p>
          Store your soap dish outside the direct spray zone of your shower so it is not continuously washed away when not in use.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          3. Cut Large Soap Bars in Half
        </h3>
        <p>
          Using one half at a time keeps the remaining half dry and extends total usage time by up to 30%.
        </p>
      </div>
    )
  },

  'weekly-facepack-ritual': {
    relatedCategoryUrl: '/product/108',
    relatedCategoryName: 'Pureplush Herbal Facepack',
    content: (
      <div className="space-y-6 text-sm text-charcoal/85 leading-relaxed">
        <p className="text-base text-forest font-medium">
          A weekly face pack ritual with Multani Mitti and botanical herbs helps remove surface oil build-up and leaves skin feeling fresh and comfortable.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Preparation Steps
        </h3>
        <p>
          In a clean ceramic or glass bowl, mix 1-2 tablespoons of Herbal Facepack powder with rose water or curd. Allow the mix to sit for 2 minutes so the clays absorb moisture evenly.
        </p>

        <h3 className="text-lg font-serif font-bold text-forest border-b border-forest/10 pb-2">
          Application & Washing Off
        </h3>
        <p>
          Apply an even layer over face avoiding eye areas. Relax for 10-15 minutes. Rinse with lukewarm water before the mask dries completely hard to prevent over-drying.
        </p>
      </div>
    )
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const article = ARTICLE_CONTENT[slug] || ARTICLE_CONTENT['how-to-use-shampoo-bar'];

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-light flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-serif font-bold text-forest">Article Not Found</h2>
        <Link href="/blog" className="mt-4 px-6 py-2 bg-forest text-cream rounded-full text-xs font-bold uppercase tracking-wider">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-forest hover:text-forest-light text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-3xl border border-forest/10 p-8 sm:p-12 shadow-sm space-y-6 mb-10">
          <div className="flex items-center space-x-3 text-xs">
            <span className="bg-forest/5 border border-forest/10 text-forest font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-charcoal/50">•</span>
            <span className="text-charcoal/60 font-medium">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-forest tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed border-l-2 border-gold pl-4 font-serif italic">
            {post.excerpt}
          </p>

          {/* Main Article Content */}
          <div className="pt-6 border-t border-forest/10">
            {article.content}
          </div>

          {/* Related Product CTA Card */}
          <div className="mt-10 bg-forest text-cream p-6 sm:p-8 rounded-2xl border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-1">Featured In This Guide</span>
              <h4 className="font-serif text-lg font-bold text-white">{article.relatedCategoryName}</h4>
              <p className="text-xs text-sage-light mt-1">Formulated with natural botanical ingredients for daily routine care.</p>
            </div>

            <Link
              href={article.relatedCategoryUrl}
              className="px-6 py-3 bg-gold text-forest hover:bg-gold-light font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all flex items-center space-x-2 flex-shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Collection</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
