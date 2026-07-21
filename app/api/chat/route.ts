import { NextResponse } from 'next/server';

const PRODUCTS_CATALOG = [
  {
    name: 'Pureplush Herbal Waxing Powder',
    price: '₹249.00',
    category: 'moringa',
    desc: 'Pain-free, natural hair removal powder made with organic botanical ingredients for smooth skin.'
  },
  {
    name: 'Pureplush Herbal Facewash powder',
    price: '₹249.00',
    category: 'moringa',
    desc: 'Traditional exfoliating dry face wash powder to cleanse pores and restore natural glow.'
  },
  {
    name: 'Pureplush Herbal Facepack',
    price: '₹249.00',
    category: 'moringa',
    desc: 'Botanical detoxifying face mask to soothe irritation and brighten skin complexion.'
  },
  {
    name: 'PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj',
    price: '₹249.00',
    category: 'moringa',
    desc: 'Complete organic hair wash powder containing Amla, Shikakai & Bhringraj for strong, healthy hair.'
  },
  {
    name: 'Pureplush mangobutter Mud Sea Clay Soap',
    price: '₹99.00',
    category: 'soaps',
    desc: 'Handcrafted moisturizing soap bar with sea clay mud and rich organic mango butter.'
  },
  {
    name: 'Pureplush Sheabutter Multani Mitti Soap',
    price: '₹99.00',
    category: 'soaps',
    desc: 'Handcrafted oil-control soap containing fullers earth clay and nourishing shea butter.'
  },
  {
    name: 'Pureplush Goatmilk French Green Clay Soap',
    price: '₹99.00',
    category: 'soaps',
    desc: 'Handcrafted detoxifying soap containing French green clay and moisturizing goat milk.'
  },
  {
    name: 'Pureplush Goatmilk Coffee D Tan Soap',
    price: '₹99.00',
    category: 'soaps',
    desc: 'Handcrafted exfoliating soap containing fresh goat milk and aromatic coffee to brighten and scrub skin.'
  },
  {
    name: 'Pureplush Multani Mitti Saffron Shampoo Bar',
    price: '₹199.00',
    category: 'shampoo',
    desc: 'Zero-waste solid shampoo bar with shine-enhancing saffron and cleansing Multani Mitti.'
  },
  {
    name: 'Pureplush Hibiscus Neemtulsi Shampoo Bar',
    price: '₹199.00',
    category: 'shampoo',
    desc: 'Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.'
  }
];

function getFallbackResponse(userMessage: string): string {
  const q = userMessage.toLowerCase();

  if (q.includes('soap') || q.includes('bathing') || q.includes('cleansing bar')) {
    return `Namaste! 🌿 We offer 4 handcrafted, cold-pressed Ayurvedic soaps for all skin needs:

1. **Pureplush mangobutter Mud Sea Clay Soap** (₹99.00) — Deeply purifies with sea clay & intensely moisturizes.
2. **Pureplush Sheabutter Multani Mitti Soap** (₹99.00) — Oil-control bar with Multani Mitti and nourishing shea butter.
3. **Pureplush Goatmilk French Green Clay Soap** (₹99.00) — Toxin-extracting green clay with fresh farm goat milk.
4. **Pureplush Goatmilk Coffee D Tan Soap** (₹99.00) — Natural coffee scrub that exfoliates and removes tan.

Which one fits your skin care routine today? 🌸`;
  }

  if (q.includes('shampoo') || q.includes('hair') || q.includes('dandruff') || q.includes('hairwash') || q.includes('scalp')) {
    return `Namaste! 💆‍♀️ For complete hair and scalp care, check out our eco-friendly Ayurvedic creations:

1. **PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj** (₹249.00) — 100% natural powder for hair growth, root strength, and premature graying defense.
2. **Pureplush Multani Mitti Saffron Shampoo Bar** (₹199.00) — Zero-waste solid shampoo with real saffron for shine and Multani Mitti for scale-free scalp.
3. **Pureplush Hibiscus Neemtulsi Shampoo Bar** (₹199.00) — Anti-dandruff solid shampoo with antibacterial Neem, Tulsi, and conditioning Hibiscus.

All our hair care products are sulphate and chemical free! 🍃`;
  }

  if (q.includes('wax') || q.includes('hair removal') || q.includes('painless')) {
    return `Namaste! ✨ Our flagship body care product is:

- **Pureplush Herbal Waxing Powder** (₹249.00)

It provides a 100% pain-free, chemical-free hair removal experience made with organic botanicals. It removes hair gently in minutes, leaving your skin incredibly soft and smooth without any irritation! 🌸`;
  }

  if (q.includes('face') || q.includes('acne') || q.includes('glow') || q.includes('facewash') || q.includes('facepack') || q.includes('skin')) {
    return `Namaste! 🌺 For radiant and healthy facial skin, we recommend:

1. **Pureplush Herbal Facewash powder** (₹249.00) — Traditional dry face wash that deeply cleanses pores and removes excess oil.
2. **Pureplush Herbal Facepack** (₹249.00) — Nutrient-rich mud & herbal mask to detoxify, soothe acne, and brighten blemishes.

Pair these with our **Pureplush Sheabutter Multani Mitti Soap** (₹99.00) for the ultimate facial skincare routine! ✨`;
  }

  if (q.includes('discount') || q.includes('offer') || q.includes('coupon') || q.includes('code') || q.includes('sale')) {
    return `Namaste! 🏷️ You can use the discount code **PURENEW10** during checkout to get **10% OFF** your order!

Plus, enjoy **FREE Shipping** across India on all orders over ₹499! 🚚✨`;
  }

  if (q.includes('shipping') || q.includes('delivery') || q.includes('track') || q.includes('ship') || q.includes('cost')) {
    return `Namaste! 🚚 Here are our shipping details:

- **Free Shipping**: Available on all orders above ₹499.
- **Flat Shipping Fee**: ₹50 for orders below ₹499.
- **Delivery Time**: 3-5 business days across India with live tracking updates! 📦`;
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('support') || q.includes('help')) {
    return `Namaste! 📞 You can reach our Pureplush Customer Care team via:

- **WhatsApp / Phone**: +91 87628 77755
- **Support Hours**: Monday to Saturday, 9:00 AM – 6:00 PM IST.

Feel free to ask me any questions here as well! 🙏`;
  }

  if (q.includes('pureplush') || q.includes('about') || q.includes('brand') || q.includes('who')) {
    return `Namaste! 🙏 Welcome to Pureplush — your premier natural, vegan, and handcrafted Ayurvedic wellness brand.

We specialize in zero-waste shampoo bars, cold-pressed artisanal soaps, herbal face & hair powders, and pain-free waxing powder. 

Our top recommendations for you:
1. **Pureplush Herbal Waxing Powder** (₹249.00)
2. **PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj** (₹249.00)
3. **Pureplush Goatmilk Coffee D Tan Soap** (₹99.00)
4. **Pureplush Hibiscus Neemtulsi Shampoo Bar** (₹199.00)

How can I help you choose the best product for your skin and hair today? 🍃`;
  }

  return `Namaste! 🙏 I am your Pureplush Ayurvedic Wellness Advisor. 

I can assist you with product recommendations, ingredient benefits, shipping details, or current discounts!

Here are some popular products you might love:
- **Pureplush Herbal Waxing Powder** (₹249.00) — Pain-free hair removal.
- **Pureplush Herbal Facewash powder** (₹249.00) — Pore-cleansing herbal wash.
- **Pureplush Goatmilk Coffee D Tan Soap** (₹99.00) — Exfoliating D-tan soap bar.
- **Pureplush Hibiscus Neemtulsi Shampoo Bar** (₹199.00) — Anti-dandruff shampoo bar.

Use code **PURENEW10** for 10% OFF your order! What product would you like to explore? 🌸`;
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if valid GEMINI_API_KEY exists
    const isValidApiKey = apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.startsWith('AIzaSy');

    if (!isValidApiKey) {
      // Return smart fallback directly when API key is unconfigured or invalid format
      const fallbackReply = getFallbackResponse(message);
      return NextResponse.json({
        success: true,
        reply: fallbackReply
      });
    }

    const systemPrompt = `You are the Pureplush Ayurvedic Wellness Advisor, a friendly and highly knowledgeable AI assistant for Pureplush (a premium natural, vegan, and handcrafted wellness brand).

Your Guidelines:
1. Tone: Warm, welcoming, gentle, and deeply rooted in Ayurvedic wisdom.
2. Context: Always act as an expert on Pureplush products, ingredients, shipping, and returns.
3. Keep answers concise, structured, and helpful (use bullet points or emojis).
4. Product recommendations: When suggesting products, you MUST mention their names EXACTLY as listed in the catalog below so the frontend UI can render clickable product cards below the chat.

Pureplush Product Catalog:
- "Pureplush Herbal Waxing Powder" (Category: moringa, Price: ₹249.00, Description: Pain-free, natural hair removal powder made with organic botanical ingredients for smooth skin.)
- "Pureplush Herbal Facewash powder" (Category: moringa, Price: ₹249.00, Description: Traditional exfoliating dry face wash powder to cleanse pores and restore natural glow.)
- "Pureplush Herbal Facepack" (Category: moringa, Price: ₹249.00, Description: Botanical detoxifying face mask to soothe irritation and brighten skin complexion.)
- "PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj" (Category: moringa, Price: ₹249.00, Description: Complete organic hair wash powder containing Amla, Shikakai & Bhringraj for strong, healthy hair.)
- "Pureplush mangobutter Mud Sea Clay Soap" (Category: soaps, Price: ₹99.00, Description: Handcrafted moisturizing soap bar with sea clay mud and rich organic mango butter.)
- "Pureplush Sheabutter Multani Mitti Soap" (Category: soaps, Price: ₹99.00, Description: Handcrafted oil-control soap containing fullers earth clay and nourishing shea butter.)
- "Pureplush Goatmilk French Green Clay Soap" (Category: soaps, Price: ₹99.00, Description: Handcrafted detoxifying soap containing French green clay and moisturizing goat milk.)
- "Pureplush Goatmilk Coffee D Tan Soap" (Category: soaps, Price: ₹99.00, Description: Handcrafted exfoliating soap containing fresh goat milk and aromatic coffee to brighten and scrub skin.)
- "Pureplush Multani Mitti Saffron Shampoo Bar" (Category: shampoo, Price: ₹199.00, Description: Zero-waste solid shampoo bar with shine-enhancing saffron and cleansing Multani Mitti.)
- "Pureplush Hibiscus Neemtulsi Shampoo Bar" (Category: shampoo, Price: ₹199.00, Description: Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.)

Policies:
- Shipping: Free Shipping across India on orders above ₹499. For orders under ₹499, flat fee of ₹50. Delivery 3-5 business days.
- Contacts: Phone/WhatsApp: +91 87628 77755 (Mon-Sat, 9 AM - 6 PM).
- Discount Coupon: Tell users they can use code "PURENEW10" to get 10% OFF their first order during checkout!`;

    // Process and sanitize history so Gemini API rules are strictly met:
    // 1. Array must start with 'user'
    // 2. Roles must strictly alternate between 'user' and 'model'
    const contents: any[] = [];

    if (Array.isArray(history)) {
      let expectedRole = 'user';
      for (const h of history) {
        if (!h.text || typeof h.text !== 'string') continue;
        const role = h.sender === 'user' ? 'user' : 'model';

        // Skip leading bot messages until first user message is encountered
        if (contents.length === 0 && role !== 'user') {
          continue;
        }

        if (role === expectedRole) {
          contents.push({
            role: role,
            parts: [{ text: h.text }]
          });
          expectedRole = role === 'user' ? 'model' : 'user';
        } else if (contents.length > 0) {
          // If duplicate role, append text to existing last element
          contents[contents.length - 1].parts[0].text += `\n${h.text}`;
        }
      }
    }

    // Add current user message
    if (contents.length === 0 || contents[contents.length - 1].role === 'model') {
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
    } else {
      // Last item was user, append message to it
      contents[contents.length - 1].parts[0].text += `\n${message}`;
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Gemini API call failed, falling back to intelligent response engine:', errorText);
      const fallbackReply = getFallbackResponse(message);
      return NextResponse.json({
        success: true,
        reply: fallbackReply
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(message);

    return NextResponse.json({
      success: true,
      reply: replyText
    });

  } catch (error: any) {
    console.error('API Chat route error, utilizing fallback:', error);
    try {
      const { message } = await req.json();
      return NextResponse.json({
        success: true,
        reply: getFallbackResponse(message || 'hello')
      });
    } catch {
      return NextResponse.json({
        success: true,
        reply: "Namaste! 🙏 Welcome to Pureplush. How can I guide your Ayurvedic wellness journey today? 🌸"
      });
    }
  }
}

