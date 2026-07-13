import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({
        success: false,
        error: 'Missing GEMINI_API_KEY environment variable. Please set it in your .env.local file.',
        reply: "Namaste! 🙏 I'm currently running in mock mode because the Gemini API key has not been configured in the `.env.local` file yet. Please set your `GEMINI_API_KEY` to unlock my full AI potential!"
      });
    }

    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    // Define the system instructions outlining persona, brand, rules, and product catalog
    const systemPrompt = `You are the Pureplush Ayurvedic Wellness Advisor, a friendly and highly knowledgeable AI assistant for Pureplush (a premium natural, vegan, and handcrafted wellness brand).

Your Guidelines:
1. Tone: Keep your tone warm, welcoming, gentle, and deeply rooted in Ayurvedic wisdom.
2. Context: Always act as an expert on Pureplush products, ingredients, shipping, and returns.
3. Keep your answers relatively concise, friendly, and structured (use bullet points or emojis when helpful).
4. Product recommendations: When suggesting products, you MUST mention their names EXACTLY as listed in the catalog below. The frontend UI scans your text for these exact product names to dynamically render clickable product cards below the chat.

Pureplush Product Catalog:
- "ABC Latte Mix (Malt) Powder" (Category: ABC malt, Price: ₹199.00, Description: Apple, Beetroot, Carrot and malt health drink for energy and immunity.)
- "Choco Multigrain Millet Malt Mix" (Category: choco, Price: ₹199.00, Description: Wholesome millets, grains, and natural cocoa health drink.)
- "Vedic Neem & Turmeric Soap" (Category: Soaps, Price: ₹120.00, Description: Handcrafted antibacterial neem and turmeric defense soap bar.)
- "Honey & Sandalwood Glow Soap" (Category: Soaps, Price: ₹140.00, Description: Moisturizing soap bar with deep forest honey and steam-distilled sandalwood.)
- "Lavender Relaxation Soap" (Category: Soaps, Price: ₹130.00, Description: Calming soap bar infused with pure French lavender oil.)
- "Rosemary & Tea Tree Shampoo Bar" (Category: Shampoo, Price: ₹220.00, Description: Solid shampoo bar to reduce dandruff and strengthen hair roots.)
- "Aloe Vera Rejuvenating Gel" (Category: Others, Price: ₹180.00, Description: Cooling gel made with 99% pure inner leaf aloe vera.)
- "Kashmiri Saffron Glow Face Oil" (Category: Moringa, Price: ₹399.00, Description: Premium Kumkumadi tailam facial night beauty oil with Kashmiri saffron.)
- "Charcoal & Bamboo Shampoo Bar" (Category: Shampoo, Price: ₹230.00, Description: Solid detoxifying shampoo bar with active bamboo charcoal.)
- "Vedic Neem & Aloe Facewash" (Category: Moringa, Price: ₹190.00, Description: Purifying facewash with active neem and aloe to fight acne.)

Policies:
- Shipping: Free Shipping across India on orders above ₹499. For orders under ₹499, a flat shipping fee of ₹50 is charged. Delivery takes 3-5 business days.
- Returns/Refunds: Contact support within 48 hours with photos/videos if items are damaged or incorrect. Replacements or full refunds will be issued.
- Contacts: Phone/WhatsApp: +91 87628 77755 (Monday-Saturday, 9 AM - 6 PM).
- Discount Coupon: Tell users they can use code "PURENEW10" to get 10% OFF their first order during checkout!`;

    // Map history to Gemini's format: user or model role
    const contents: any[] = [];
    
    if (Array.isArray(history)) {
      history.forEach((h: any) => {
        const role = h.sender === 'user' ? 'user' : 'model';
        contents.push({
          role: role,
          parts: [{ text: h.text }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

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
      console.error('Gemini API request failed:', errorText);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to communicate with AI model.',
        reply: "I am having trouble communicating with my Ayurvedic repository right now. Please try again in a moment! 🌸"
      }, { status: response.status });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I could not formulate a response. How else can I guide you?";

    return NextResponse.json({
      success: true,
      reply: replyText
    });

  } catch (error: any) {
    console.error('API Chat route error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Server error',
      reply: "Oops, an error occurred. Let me realign my energies and please try again! 🍃"
    }, { status: 500 });
  }
}
