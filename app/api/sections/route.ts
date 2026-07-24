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
    title: 'Why Choose PurePlush?',
    subtitle: 'See the clear difference natural ingredients, eco-friendly formulas, and certified quality make for your daily care routine.',
    fssaiBadge: 'ISO 22716:2007 (QCCI/24C/SMX/4779)',
    rows: [
      { feature: 'Natural Herbal Ingredients', pureplus: 'Carefully selected herbal ingredients', ordinary: 'Often synthetic ingredients' },
      { feature: 'Sulfate Free (SLS/SLES)', pureplus: 'Yes', ordinary: 'Often included' },
      { feature: 'Paraben Free', pureplus: 'Yes', ordinary: 'May contain parabens' },
      { feature: 'Silicone Free', pureplus: 'Yes', ordinary: 'Commonly used' },
      { feature: 'Artificial Colors', pureplus: 'No', ordinary: 'Often added' },
      { feature: 'Gentle Daily Care', pureplus: 'Designed for regular use', ordinary: 'Varies by formulation' },
      { feature: 'Suitable for Men & Women', pureplus: 'Yes', ordinary: 'Usually yes' },
      { feature: 'Cruelty-Free', pureplus: 'Yes', ordinary: 'Depends on brand' },
      { feature: 'Inspired by Traditional Herbal Care', pureplus: 'Yes', ordinary: 'Generally no' },
      { feature: 'Eco-Friendly Powder Formula', pureplus: 'Less water & packaging waste', ordinary: 'Mostly liquid products' },
      { feature: 'Travel Friendly', pureplus: 'Lightweight powder', ordinary: 'Bulky bottles' },
      { feature: 'Concentrated Formula', pureplus: 'Mix only what you need', ordinary: 'Ready-to-use liquids' },
      { feature: 'No Harsh Foaming Agents', pureplus: 'Yes', ordinary: 'Often included' },
      { feature: 'Easy to Store', pureplus: 'Compact', ordinary: 'Larger bottles' },
      { feature: 'Made in India', pureplus: 'Proudly Made in India', ordinary: 'Varies by brand' }
    ]
  },
  faqSection: {
    badge: 'CUSTOMER HELP & SUPPORT',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our natural formulations, ingredients, shipping, and usage',
    items: [
      {
        question: '1. Are PurePlush products 100% natural?',
        answer: 'Yes. PurePlush products are made using carefully selected herbal and naturally derived ingredients. They are free from harsh chemicals such as parabens, sulfates (SLS/SLES), silicones, and artificial colors, making them a gentler choice for your skin and hair.'
      },
      {
        question: '2. Are PurePlush products suitable for all skin and hair types?',
        answer: 'Yes. Our products are formulated for most skin and hair types, including normal, oily, dry, and combination skin. Since every individual is different, we recommend performing a patch test before first use.'
      },
      {
        question: '3. Are PurePlush products safe for sensitive skin?',
        answer: 'Our herbal formulations are designed to be gentle on the skin. However, if you have highly sensitive skin or known allergies, we recommend a patch test 24 hours before use.'
      },
      {
        question: '4. How long does it take to see visible results?',
        answer: 'Results vary depending on the individual and consistent usage. Many customers notice improvements within 3–6 weeks when used regularly as directed.'
      },
      {
        question: '5. Can I use PurePlush products every day?',
        answer: 'Yes. Most PurePlush products are gentle enough for daily use. Please follow the usage instructions mentioned on each product for the best results.'
      },
      {
        question: '6. Are PurePlush products cruelty-free?',
        answer: 'Yes. PurePlush products are cruelty-free, and we do not test our products on animals.'
      },
      {
        question: '7. Why should I choose PurePlush over other herbal brands?',
        answer: 'PurePlush combines traditional herbal ingredients with modern manufacturing standards to create high-quality personal care products that are gentle, effective, and free from harsh chemicals. Our focus is on natural care, quality ingredients, and customer satisfaction.'
      },
      {
        question: '8. Are there any side effects?',
        answer: 'PurePlush products are made with herbal ingredients and are generally well tolerated. However, as with any skincare or haircare product, individual reactions may vary. If irritation occurs, discontinue use and consult a healthcare professional if needed.'
      },
      {
        question: '9. Do you offer Cash on Delivery (COD) and fast shipping?',
        answer: 'Yes. We offer Cash on Delivery (where available) along with secure online payment options. Most orders are delivered within 3–7 business days, depending on your location.'
      },
      {
        question: '10. What if I\'m not sure which PurePlush product is right for me?',
        answer: 'Our product pages include detailed information about ingredients, benefits, and usage to help you choose. If you still need assistance, our customer support team will be happy to recommend the best PurePlush product based on your needs.'
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
