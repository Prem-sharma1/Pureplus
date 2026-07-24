import { NextResponse } from 'next/server';

// Default initial state for homepage sections
const DEFAULT_SECTION_CONFIG = {
  announcementBar: {
    enabled: true,
    text1: '🍃 Natural Wellness & Personal Care - Crafted with Carefully Selected Botanical Ingredients',
    text2: '🚚 Free Shipping on eligible standard orders across India',
    text3: '✨ ISO 22716:2007 GMP Certified Cosmetics (Cert No: QCCI/24C/SMX/4779)'
  },
  sections: {
    hero: { id: 'hero', name: 'Hero Banner Section', enabled: true },
    categories: { id: 'categories', name: 'Product Categories', enabled: true },
    process: { id: 'process', name: 'Sourcing Process Timeline', enabled: true },
    founderVision: { id: 'founderVision', name: 'Our Story & Vision', enabled: true },
    famousProducts: { id: 'famousProducts', name: 'Famous Products Showcase', enabled: true },
    benefits: { id: 'benefits', name: 'Health Concern Selector', enabled: true },
    comparison: { id: 'comparison', name: 'Pureplus vs Ordinary Market Comparison Table', enabled: true },
    faq: { id: 'faq', name: 'Frequently Asked Questions (FAQ)', enabled: true },
    credibility: { id: 'credibility', name: 'Brand Trust & Promises Banner', enabled: true }
  },
  comparisonSection: {
    title: 'Pureplus vs. Ordinary Market Products',
    subtitle: 'See the difference natural ingredients and certified quality make for your daily care routine.',
    fssaiBadge: 'ISO 22716:2007 (QCCI/24C/SMX/4779)',
    rows: [
      { feature: 'Ingredient Sourcing', pureplus: '100% Pure & Wild-Crafted', ordinary: 'Synthetic & Industrial Solvents' },
      { feature: 'Added Refined Sugars', pureplus: 'ZERO Refined Sugar', ordinary: 'Up to 60% Refined Sugar / Maltodextrin' },
      { feature: 'Grains & Processing', pureplus: 'Sprouted Millets & Raw Cocoa', ordinary: 'Processed Wheat Flour & Artificial Flavors' },
      { feature: 'Quality Certification', pureplus: 'ISO 22716:2007 (GMP Certified)', ordinary: 'Basic Commercial Standards' },
      { feature: 'Preservatives & Additives', pureplus: '100% Chemical-Free', ordinary: 'Artificial Colors & Chemical Preservatives' }
    ]
  },
  faqSection: {
    badge: 'CUSTOMER HELP & SUPPORT',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our pure botanical blends, certifications, preparation, and delivery',
    items: [
      {
        question: 'Are Pureplus products 100% natural and sugar-free?',
        answer: 'Pureplus products are crafted with carefully selected botanical ingredients, with zero refined sugars added in our wellness mixes. Every product formula is clearly labeled with transparent ingredients so you know exactly what goes into your body and onto your skin.'
      },
      {
        question: 'Are your malts and soaps safe for growing kids and elders?',
        answer: 'Yes! All Pureplus malts, soaps, powders, and shampoo bars are formulated with gentle, food-grade and botanical ingredients without harsh synthetic chemicals, making them safe and suitable for kids, adults, and elders.'
      },
      {
        question: 'Is Pureplus certified by ISO & GMP standards?',
        answer: 'Yes, Pureplus products (Saish Impex) adhere strictly to certified quality standards including ISO 22716:2007 Cosmetics - Good Manufacturing Practices (GMP) (Certificate No: QCCI/24C/SMX/4779) for consistent quality and safety.'
      },
      {
        question: 'How do I prepare Pureplus mixes?',
        answer: 'For wellness drinks and malts: Take 1-2 teaspoons or 1 serving as directed on the pack. Mix into warm water or milk, stir well, and serve. For facewash and facepack powders: Mix 1 teaspoon with water, rose water, or curd into a smooth paste, apply gently, leave for 5-10 minutes, and rinse thoroughly.'
      },
      {
        question: 'How does Free Shipping work on Pureplus orders?',
        answer: 'Free shipping is automatically applied at checkout on eligible standard orders across India. Orders are processed within 24-48 hours with real-time tracking updates sent directly to your phone and email.'
      },
      {
        question: 'What is the shelf life and storage instruction?',
        answer: 'Pureplus products have a shelf life of 12 to 24 months from the date of manufacturing. Store powder products and soaps in a cool, dry place away from direct sunlight, and keep containers airtight after opening.'
      },
      {
        question: 'Are Pureplus products Ayurvedic or medicines?',
        answer: 'Our products are inspired by traditional Indian botanical recipes for daily personal care and wellness routines. They are non-prescription personal care and food products, not intended to diagnose, treat, cure, or prevent medical conditions.'
      }
    ]
  }
};

let currentConfig = { ...DEFAULT_SECTION_CONFIG };

export async function GET() {
  return NextResponse.json({
    success: true,
    config: currentConfig
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body && body.config) {
      currentConfig = { ...currentConfig, ...body.config };
      return NextResponse.json({
        success: true,
        message: 'Section configuration updated successfully',
        config: currentConfig
      });
    }
    return NextResponse.json({ success: false, error: 'Invalid configuration payload' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
