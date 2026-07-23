'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, X, Send, Leaf, Sparkles, Phone, ArrowRight, User, HelpCircle, Check, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  desc: string;
  image: string;
  benefits: string[];
  weight?: string;
}

const PRODUCTS_DB: Product[] = [
  {
    id: 26,
    name: 'Pureplush Herbal Waxing Powder',
    category: 'moringa',
    price: '₹249.00',
    desc: 'Pain-free, natural hair removal powder made with organic botanical ingredients for smooth skin.',
    image: '/uploads/FaceWash/Herbal2.png',
    benefits: ['100% Organic & Natural', 'Pain-Free Hair Removal', 'Soft & Smooth Results'],
    weight: '100g'
  },
  {
    id: 28,
    name: 'Pureplush Herbal Facewash powder',
    category: 'moringa',
    price: '₹249.00',
    desc: 'Traditional dry face wash powder blend to cleanse pores and restore natural glow.',
    image: '/uploads/Herbal4.png',
    benefits: ['Deep Cleanses Pores', 'Controls Excess Oil', 'Gentle Natural Exfoliation'],
    weight: '100g'
  },
  {
    id: 108,
    name: 'Pureplush Herbal Facepack',
    category: 'moringa',
    price: '₹249.00',
    desc: 'Botanical detoxifying face mask to soothe irritation and brighten skin complexion.',
    image: '/Herbalfacepack/Artboard 1.png',
    benefits: ['Detoxifies Skin Barrier', 'Soothes Irritated Skin', 'Brightens & Clarifies Tone'],
    weight: '100g'
  },
  {
    id: 105,
    name: 'PurePlush Herbal Hair Wash Powder with Amla, Shikakai & Bhringraj',
    category: 'moringa',
    price: '₹249.00',
    desc: 'Complete organic hair wash powder containing Amla, Shikakai & Bhringraj for strong, healthy hair.',
    image: '/Herbal/Herbal3.png',
    benefits: ['Amla & Shikakai Cleanser', 'Bhringraj for Hair Growth', 'Prevents Premature Graying'],
    weight: '100g'
  },
  {
    id: 101,
    name: 'Pureplush mangobutter Mud Sea Clay Soap',
    category: 'soaps',
    price: '₹99.00',
    desc: 'Handcrafted moisturizing soap bar with sea clay mud and rich organic mango butter.',
    image: '/MangoButter/Soap.png',
    benefits: ['Deep Purifying Mud', 'Moisturizing Mango Butter', 'Handcrafted & Vegan'],
    weight: '100g'
  },
  {
    id: 102,
    name: 'Pureplush Sheabutter Multani Mitti Soap',
    category: 'soaps',
    price: '₹99.00',
    desc: 'Handcrafted oil-control soap containing fullers earth clay and nourishing shea butter.',
    image: '/Multanimitti/Soap3.png',
    benefits: ['Absorbs Excess Oils', 'Nourishing Shea Butter', 'Combats Acne & Pimples'],
    weight: '100g'
  },
  {
    id: 103,
    name: 'Pureplush Goatmilk French Green Clay Soap',
    category: 'soaps',
    price: '₹99.00',
    desc: 'Handcrafted detoxifying soap containing French green clay and moisturizing goat milk.',
    image: '/Frenchgreenclay/Soap2.png',
    benefits: ['Toxin-Extracting Green Clay', 'Soften & Hydrates Skin', 'Rich Goat Milk Proteins'],
    weight: '100g'
  },
  {
    id: 109,
    name: 'Pureplush Goatmilk Coffee D Tan Soap',
    category: 'soaps',
    price: '₹99.00',
    desc: 'Handcrafted exfoliating soap containing fresh goat milk and aromatic coffee to brighten and scrub skin.',
    image: '/CoffeeD/new1.png',
    benefits: ['Brightens & Evens Skin', 'Fresh Farm Goat Milk', 'Natural Coffee Scrub'],
    weight: '100g'
  },
  {
    id: 104,
    name: 'Pureplush Multani Mitti Saffron Shampoo Bar',
    category: 'shampoo',
    price: '₹199.00',
    desc: 'Zero-waste solid shampoo bar with shine-enhancing saffron and cleansing Multani Mitti.',
    image: '/multanimittishampoo/Shampoobar2.png',
    benefits: ['Scale-Free Scalp Cleansing', 'Infused with Real Saffron', 'Zero Waste Solid Bar'],
    weight: '80g'
  },
  {
    id: 107,
    name: 'Pureplush Hibiscus Neemtulsi Shampoo Bar',
    category: 'shampoo',
    price: '₹199.00',
    desc: 'Zero-waste conditioning shampoo bar with Hibiscus, antibacterial Neem, and soothing Tulsi.',
    image: '/Hibisus neem/new2.png',
    benefits: ['Antibacterial Neem & Tulsi', 'Hibiscus Hair Conditioning', 'Controls Dandruff & Itch'],
    weight: '80g'
  },
  {
    id: 108,
    name: 'Pureplush Herbal Facepack',
    category: 'moringa',
    price: '₹249.00',
    desc: 'Botanical detoxifying face mask to soothe irritation and brighten skin complexion.',
    image: '/Herbal/Herbal3.png',
    benefits: ['Detoxifies Skin Barrier', 'Soothes Irritated Skin', 'Brightens & Clarifies Tone'],
    weight: '100g'
  }
];

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  products?: Product[];
}

export default function Chatbot() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to Pureplush. I am your Ayurvedic wellness advisor. How can I guide your natural beauty and health journey today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    "🌿 Tell me about Pureplush",
    "🧼 Handcrafted Ayurvedic Soaps",
    "💆‍♀️ Hair Wash & Shampoo Bars",
    "✨ Facepack & Facewash Powders",
    "✨ Herbal Waxing Powder",
    "🚚 Shipping & Delivery info",
    "🏷️ Current discount codes"
  ];

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    const currentHistory = [...messages, userMessage];
    setMessages(currentHistory);
    setInputValue('');
    setIsTyping(true);

    try {
      // Send history (only sender and text for clean payload mapping)
      const formattedHistory = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: formattedHistory
        })
      });

      const data = await res.json();
      
      let replyText = "";
      if (data.success) {
        replyText = data.reply;
      } else {
        replyText = data.reply || "Namaste! I am here to help you choose the best Ayurvedic products for your skin and hair care routine! 🌸";
      }

      // Check if any product names or distinct product key phrases are mentioned to render cards
      const matchedProducts = PRODUCTS_DB.filter(p => {
        const lowerText = replyText.toLowerCase();
        const lowerName = p.name.toLowerCase();
        if (lowerText.includes(lowerName)) return true;

        // Match clean name without prefix
        const cleanName = lowerName.replace(/^pureplush\s+/i, '');
        if (lowerText.includes(cleanName)) return true;

        // Key product phrase checks
        if (p.id === 26 && (lowerText.includes('waxing powder') || lowerText.includes('herbal waxing'))) return true;
        if (p.id === 28 && lowerText.includes('facewash powder')) return true;
        if (p.id === 108 && lowerText.includes('facepack')) return true;
        if (p.id === 105 && lowerText.includes('hair wash powder')) return true;
        if (p.id === 101 && lowerText.includes('mangobutter')) return true;
        if (p.id === 102 && lowerText.includes('multani mitti soap')) return true;
        if (p.id === 103 && lowerText.includes('green clay soap')) return true;
        if (p.id === 109 && lowerText.includes('coffee d tan')) return true;
        if (p.id === 104 && lowerText.includes('saffron shampoo')) return true;
        if (p.id === 107 && lowerText.includes('hibiscus neem')) return true;

        return false;
      });

      const botMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'bot',
        text: replyText,
        timestamp: new Date(),
        products: matchedProducts.length > 0 ? matchedProducts : undefined
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          sender: 'bot',
          text: "Namaste! 🙏 Welcome to Pureplush. I am your Ayurvedic wellness advisor. How can I guide your natural beauty and health journey today? 🌸",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleProductAction = (productName: string) => {
    try {
      const existingCart = localStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];
      const dbProduct = PRODUCTS_DB.find(p => p.name === productName || p.name.toLowerCase() === productName.toLowerCase());
      
      if (dbProduct) {
        const cartItem = {
          id: dbProduct.id,
          product_name: dbProduct.name,
          product_price: dbProduct.price.replace('₹', ''),
          weight: dbProduct.weight || '100g',
          brief_details: dbProduct.desc,
          image1: dbProduct.image.startsWith('/') ? dbProduct.image.substring(1) : dbProduct.image,
          quantity: 1
        };
        
        const existingItemIndex = cart.findIndex((item: any) => item.id === dbProduct.id);
        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cart.push(cartItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Dispatch storage event to trigger Navbar sync
        window.dispatchEvent(new Event('storage'));
        
        // Add a bot message saying product is added
        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            sender: 'bot',
            text: `Added **${dbProduct.name}** to your cart! 🛍️ You can click the shopping bag in the top header to view your cart and checkout.`,
            timestamp: new Date()
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center">
        <div className="relative group">
          {/* Tooltip */}
          <span className="absolute left-16 ml-2 scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 origin-left bg-white text-forest text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl border border-forest/5 flex items-center space-x-1.5 whitespace-nowrap pointer-events-none text-forest">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping"></span>
            <span>Ayurvedic Call Support</span>
          </span>

          {/* Pulse Glow Effect */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-forest/20 animate-ping opacity-75 pointer-events-none"></span>
          )}

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr ${
              isOpen 
                ? 'from-charcoal via-neutral-700 to-charcoal hover:shadow-black/20' 
                : 'from-forest via-sage to-forest-light hover:shadow-forest/30'
            } rounded-full shadow-lg text-white transition-all duration-300 focus:outline-none`}
            aria-label="Chat with wellness advisor"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Headset className="w-6 h-6 animate-float" />}
            {/* Unread dot */}
            {!isOpen && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-gold border-2 border-white rounded-full"></span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 left-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] rounded-2xl shadow-2xl border border-forest/10 bg-white/95 backdrop-blur-md overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-forest to-sage-dark text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative shadow-inner">
                  <Headset className="w-5 h-5 text-gold-light" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm tracking-wide flex items-center">
                    Pureplush Advisor
                    <Sparkles className="w-3.5 h-3.5 ml-1 text-gold-light" />
                  </h3>
                  <span className="text-[10px] text-emerald-200">Online | Call Support Expert</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-light/40">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-forest/10 flex items-center justify-center border border-forest/5 flex-shrink-0">
                        <Headset className="w-3.5 h-3.5 text-forest" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-tr from-forest-dark to-forest text-white rounded-tr-none'
                          : 'bg-white text-charcoal border border-neutral-100 rounded-tl-none whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-3.5 h-3.5 text-neutral-600" />
                      </div>
                    )}
                  </div>

                  {/* Render matched products in message */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="pl-9 pr-2 py-1 space-y-2.5">
                      {msg.products.map(prod => (
                        <div key={prod.id} className="bg-white border border-forest/10 rounded-xl p-3 shadow-inner hover:border-forest/20 transition-all flex space-x-3">
                          <div className="w-14 h-14 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-xs text-forest truncate">{prod.name}</h4>
                            <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">{prod.desc}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs font-bold text-charcoal">{prod.price}</span>
                              <button
                                onClick={() => handleProductAction(prod.name)}
                                className="flex items-center space-x-1 bg-gradient-to-r from-forest to-sage text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm hover:shadow hover:brightness-105 transition-all"
                              >
                                <ShoppingCart className="w-3 h-3" />
                                <span>Add to Cart</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-7 h-7 rounded-full bg-forest/10 flex items-center justify-center border border-forest/5 flex-shrink-0">
                    <Headset className="w-3.5 h-3.5 text-forest" />
                  </div>
                  <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-forest/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-forest/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-forest/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 bg-cream-dark/20 border-t border-neutral-100 overflow-x-auto flex space-x-2 scrollbar-none whitespace-nowrap">
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion.replace(/^[^\s]+\s/, ''))}
                  className="bg-white border border-forest/10 hover:bg-forest/5 hover:border-forest/20 text-forest text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-200 flex-shrink-0 shadow-sm flex items-center space-x-1"
                >
                  <HelpCircle className="w-3 h-3 text-sage" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-white border-t border-neutral-100 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask related to Ayurvedic products, delivery..."
                className="flex-1 bg-cream-light border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`p-2.5 rounded-xl text-white shadow-md flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? 'bg-gradient-to-tr from-forest to-sage hover:shadow-forest/20 hover:brightness-105 active:scale-95'
                    : 'bg-neutral-300 shadow-none cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
