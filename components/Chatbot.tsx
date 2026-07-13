'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Leaf, Sparkles, Phone, ArrowRight, User, HelpCircle, Check, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  desc: string;
  image: string;
  benefits: string[];
}

const PRODUCTS_DB: Product[] = [
  {
    id: 26,
    name: 'ABC Latte Mix (Malt) Powder',
    category: 'ABC malt',
    price: '₹199.00',
    desc: 'A wholesome blend of Apple, Beetroot, and Carrot with natural malt for a nourishing health drink.',
    image: '/uploads/FaceWash/Herbal2.png',
    benefits: ['Rich in Nutrients', 'Immunity Support', 'Glowing Skin & Eyes']
  },
  {
    id: 28,
    name: 'Choco Multigrain Millet Malt Mix',
    category: 'choco',
    price: '₹199.00',
    desc: 'Wholesome millets, grains, and natural cocoa, crafted for strength and taste in every sip.',
    image: '/uploads/FaceWash/Herbal3.png',
    benefits: ['Rich in Protein & Fiber', 'No Preservatives', 'Suitable for All Ages']
  },
  {
    id: 101,
    name: 'Vedic Neem & Turmeric Soap',
    category: 'Soaps',
    price: '₹120.00',
    desc: 'Combines natural skin protection with gentle botanical nourishment, leaving skin refreshed.',
    image: '/uploads/Soap/Soap.png',
    benefits: ['100% Handcrafted Soap', 'Antibacterial Neem Extract', 'Soothes Dry Skin']
  },
  {
    id: 102,
    name: 'Honey & Sandalwood Glow Soap',
    category: 'Soaps',
    price: '₹140.00',
    desc: 'A moisturizing, glow-enhancing soap bar loaded with organic forest honey and sandalwood oils.',
    image: '/uploads/Soap/Soap2.jpg',
    benefits: ['Forest Wild Honey', 'Steam-Distilled Sandalwood', 'Restores Natural Glow']
  },
  {
    id: 103,
    name: 'Lavender Relaxation Soap',
    category: 'Soaps',
    price: '₹130.00',
    desc: 'Calm mind and body with French lavender essential oils and cold-pressed botanical bases.',
    image: '/uploads/Soap/Soap3.jpg',
    benefits: ['French Lavender Oil', 'Calming Aromatherapy', 'Rich Conditioning Lather']
  },
  {
    id: 104,
    name: 'Rosemary & Tea Tree Shampoo Bar',
    category: 'Shampoo',
    price: '₹220.00',
    desc: 'Solid shampoo bar formulated with fresh rosemary and tea tree to reduce dandruff and strengthen hair roots.',
    image: '/uploads/Shampoobar/Shampoobar.png',
    benefits: ['Zero Waste Solid Bar', 'Reduces Dandruff', 'Strengthens Root Follicles']
  },
  {
    id: 105,
    name: 'Aloe Vera Rejuvenating Gel',
    category: 'Others',
    price: '₹180.00',
    desc: 'Natural cooling moisturizer made with 99% pure aloe vera juice to soothe sunburn and redness.',
    image: '/uploads/6330345451856531104.jpg',
    benefits: ['99% Pure Aloe', 'Cools Sunburns & Redness', 'Non-Greasy Hydration']
  },
  {
    id: 106,
    name: 'Kashmiri Saffron Glow Face Oil',
    category: 'Moringa',
    price: '₹399.00',
    desc: 'Authentic Kumkumadi tailam night serum with saffron threads, sandalwood, and licorice.',
    image: '/uploads/FaceWash/Herbal4.png',
    benefits: ['Authentic Kumkumadi Formula', 'Real Saffron Threads', 'Fades Dark Spots']
  },
  {
    id: 107,
    name: 'Charcoal & Bamboo Shampoo Bar',
    category: 'Shampoo',
    price: '₹230.00',
    desc: 'Provides deep scalp detox, pulling out oils and impurities with bamboo charcoal and tea tree.',
    image: '/uploads/Shampoobar/Shampoobar2.png',
    benefits: ['Active Bamboo Charcoal', 'Deep Scalp Detox', 'Restores Volume & Shine']
  },
  {
    id: 108,
    name: 'Vedic Neem & Aloe Facewash',
    category: 'Moringa',
    price: '₹190.00',
    desc: 'Gentle, non-drying foaming facewash packed with active neem leaves and cooling aloe vera.',
    image: '/uploads/FaceWash/Herbal1.png',
    benefits: ['Purifying Organic Neem', 'Hydrating Aloe Vera Gel', 'Fights Acne & Impurities']
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
    "🧼 Show Ayurvedic Soaps",
    "💆‍♀️ Solutions for Hair & Dandruff",
    "🚚 Shipping & Delivery info",
    "✨ Any current discounts?",
    "📞 How to contact support?"
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
        replyText = data.reply || "I encountered an error. Please try again! 🌸";
      }

      // Check if any product names are mentioned in the response to dynamically render cards
      const matchedProducts = PRODUCTS_DB.filter(p => 
        replyText.toLowerCase().includes(p.name.toLowerCase())
      );

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
          text: "I am having trouble connecting to my Ayurvedic repository right now. Please try again in a moment! 🌸",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleProductAction = (productName: string) => {
    // Add to cart simulation or notify user
    try {
      const existingCart = localStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];
      const dbProduct = PRODUCTS_DB.find(p => p.name === productName);
      
      if (dbProduct) {
        const cartItem = {
          id: dbProduct.id,
          product_name: dbProduct.name,
          product_price: dbProduct.price.replace('₹', '').replace('.00', ''),
          image1: dbProduct.image.replace('/uploads/', ''),
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
            text: `Added **${productName}** to your cart! 🛍️ You can check the cart drawer in the navbar to checkout.`,
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
            <span>Ayurvedic Assistant</span>
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
            {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-float" />}
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
                  <Bot className="w-5 h-5 text-gold-light" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm tracking-wide flex items-center">
                    Pureplush Advisor
                    <Sparkles className="w-3.5 h-3.5 ml-1 text-gold-light" />
                  </h3>
                  <span className="text-[10px] text-emerald-200">Online | Ayurvedic Expert</span>
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
                        <Bot className="w-3.5 h-3.5 text-forest" />
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
                    <Bot className="w-3.5 h-3.5 text-forest" />
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
