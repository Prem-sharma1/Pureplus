'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  LogIn, 
  LogOut, 
  ClipboardList, 
  Menu, 
  X, 
  Leaf, 
  ChevronDown, 
  Sprout, 
  Sparkles, 
  Wind, 
  Droplets 
} from 'lucide-react';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

const ANNOUNCEMENTS = [
  '🍃 100% Ayurvedic, Vegan & Farm-Direct Wellness',
  '🚚 Free Shipping on orders above ₹499 in India',
  '✨ Handcrafted Local Ingredients - Ancient Treatises'
];

export default function Navbar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  
  // Overlay Open States
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  
  // Hover Capsule Navigation State
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Cart Badge state
  const [cartCount, setCartCount] = useState(0);

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Sync Cart badge and authentication
  const syncState = () => {
    try {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const items = JSON.parse(cart);
        const totalQty = items.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
        setCartCount(totalQty);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }

    try {
      const user = localStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
        const parsed = JSON.parse(user);
        setUsername(parsed.name || 'User');
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    } catch {
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  useEffect(() => {
    // Cycle announcements
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);

    // Track scroll direction and threshold
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Is Scrolled Check
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Direction Check
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    syncState();

    // Listen for storage mutations (cross-component updates)
    window.addEventListener('storage', syncState);

    // Listen for direct open cart triggers
    const handleOpenCart = () => setCartOpen(true);
    window.addEventListener('open-cart', handleOpenCart);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', syncState);
      window.removeEventListener('open-cart', handleOpenCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/';
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 w-full ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Announcement Banner */}
        <div className="bg-forest text-cream py-2 px-4 text-center text-[10px] md:text-xs font-semibold tracking-wider uppercase flex items-center justify-center overflow-hidden h-9 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcementIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-center font-sans tracking-widest text-[10px] sm:text-xs text-cream-light font-bold"
            >
              {ANNOUNCEMENTS[announcementIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Navbar Wrapper */}
        <div className="w-full px-4 sm:px-6 lg:px-8 transition-all duration-500 flex justify-center">
          <div
            className={`w-full transition-all duration-500 ${
              isScrolled
                ? 'max-w-5xl mx-auto rounded-full mt-3 bg-white/85 backdrop-blur-xl border border-forest/10 shadow-lg px-6 py-2.5 dark:bg-charcoal/85'
                : 'w-full max-w-7xl mx-auto bg-transparent py-5 border-b border-forest/5 px-4 sm:px-6 lg:px-8'
            }`}
          >
            <div className="flex items-center justify-between h-12">
              
              {/* Logo Section */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.05 }}
                    className="relative flex items-center justify-center w-9 h-9 bg-forest rounded-xl shadow-md transition-all duration-300"
                  >
                    <Leaf className="w-5 h-5 text-cream" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold tracking-tight text-forest leading-none">
                      pureplush
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-sage-dark font-semibold">
                      organics & ayurveda
                    </span>
                  </div>
                </Link>
              </div>

              {/* Minimal Menu Links - Center */}
              <div className="hidden lg:flex items-center space-x-6">
                
                {/* Home Link */}
                <div
                  onMouseEnter={() => setHoveredPath('/')}
                  onMouseLeave={() => setHoveredPath(null)}
                  className="relative py-2 px-3.5 rounded-full"
                >
                  <Link
                    href="/"
                    className={`text-sm font-semibold transition-all relative z-10 hover:text-forest ${
                      isActive('/') ? 'text-forest font-bold' : 'text-charcoal'
                    }`}
                  >
                    <span>Home</span>
                  </Link>
                  {hoveredPath === '/' && (
                    <motion.div
                      layoutId="navHoverCapsule"
                      className="absolute inset-0 bg-forest/5 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {isActive('/') && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-1 inset-x-5 h-0.5 bg-gold rounded-full z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>

                {/* Shop Megamenu Trigger */}
                <div
                  onMouseEnter={() => {
                    setIsShopHovered(true);
                    setHoveredPath('/shop');
                  }}
                  onMouseLeave={() => {
                    setIsShopHovered(false);
                    setHoveredPath(null);
                  }}
                  className="relative py-2 px-3.5 rounded-full"
                >
                  <Link
                    href="/shop"
                    className={`flex items-center space-x-1 text-sm font-semibold hover:text-forest transition-colors focus:outline-none relative z-10 ${
                      pathname?.startsWith('/shop') || pathname?.startsWith('/category') ? 'text-forest font-bold' : 'text-charcoal'
                    }`}
                  >
                    <span>Shop</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isShopHovered ? 'rotate-180' : 'rotate-0'}`} />
                  </Link>
                  {hoveredPath === '/shop' && (
                    <motion.div
                      layoutId="navHoverCapsule"
                      className="absolute inset-0 bg-forest/5 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {(pathname?.startsWith('/shop') || pathname?.startsWith('/category')) && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-1 inset-x-5 h-0.5 bg-gold rounded-full z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isShopHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="absolute top-[42px] left-1/2 -translate-x-1/2 w-[850px] bg-white border border-forest/10 rounded-3xl shadow-2xl p-8 grid grid-cols-4 gap-6 z-50 backdrop-blur-md bg-white/95"
                      >
                        {/* Column 1: Botanical Powders */}
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center space-x-2 border-b border-forest/5 pb-2">
                            <Sprout className="w-4 h-4 text-forest" />
                            <span className="text-xs uppercase tracking-wider font-bold text-sage-dark font-sans">Botanical Powders</span>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <div className="group/item flex flex-col space-y-0.5">
                              <Link href="/category/moringa" className="flex items-center justify-between text-xs font-semibold text-charcoal hover:text-forest transition-colors group-hover/item:translate-x-1 duration-200">
                                <span>ABC Latte Mix Powder</span>
                                <span className="text-[7px] bg-gold/25 text-gold-dark px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">Bestseller</span>
                              </Link>
                              <span className="text-[10px] text-charcoal/50 leading-relaxed font-normal">Pure beetroot & moringa wellness mix</span>
                            </div>
                            <div className="group/item flex flex-col space-y-0.5">
                              <Link href="/category/moringa" className="flex items-center justify-between text-xs font-semibold text-charcoal hover:text-forest transition-colors group-hover/item:translate-x-1 duration-200">
                                <span>Choco Multigrain Mix</span>
                              </Link>
                              <span className="text-[10px] text-charcoal/50 leading-relaxed font-normal">Rich cocoa & multi-millet nourishment</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Luxury Cleansers */}
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center space-x-2 border-b border-forest/5 pb-2">
                            <Droplets className="w-4 h-4 text-forest" />
                            <span className="text-xs uppercase tracking-wider font-bold text-sage-dark font-sans">Luxury Cleansers</span>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <div className="group/item flex flex-col space-y-0.5">
                              <Link href="/category/soaps" className="flex items-center justify-between text-xs font-semibold text-charcoal hover:text-forest transition-colors group-hover/item:translate-x-1 duration-200">
                                <span>Handcrafted Soaps</span>
                                <span className="text-[7px] bg-sage/20 text-sage-dark px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">Organic</span>
                              </Link>
                              <span className="text-[10px] text-charcoal/50 leading-relaxed font-normal">Cold-pressed luxury cleansing bars</span>
                            </div>
                            <div className="group/item flex flex-col space-y-0.5">
                              <Link href="/category/shampoo" className="flex items-center justify-between text-xs font-semibold text-charcoal hover:text-forest transition-colors group-hover/item:translate-x-1 duration-200">
                                <span>Luxury Shampoo Bars</span>
                              </Link>
                              <span className="text-[10px] text-charcoal/50 leading-relaxed font-normal">Organic nourishment for strong roots</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Self-Care */}
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center space-x-2 border-b border-forest/5 pb-2">
                            <Sparkles className="w-4 h-4 text-forest" />
                            <span className="text-xs uppercase tracking-wider font-bold text-sage-dark font-sans">Self-Care</span>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <div className="group/item flex flex-col space-y-0.5">
                              <Link href="/shop" className="flex items-center justify-between text-xs font-semibold text-charcoal hover:text-forest transition-colors group-hover/item:translate-x-1 duration-200">
                                <span>Hair & Body Care</span>
                                <span className="text-[7px] bg-forest/10 text-forest px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">New</span>
                              </Link>
                              <span className="text-[10px] text-charcoal/50 leading-relaxed font-normal">Pure botanical oils & remedies</span>
                            </div>
                            <div className="group/item flex flex-col space-y-0.5">
                              <Link href="/shop" className="flex items-center justify-between text-xs font-semibold text-charcoal hover:text-forest transition-colors group-hover/item:translate-x-1 duration-200">
                                <span>Wellness Kits</span>
                              </Link>
                              <span className="text-[10px] text-charcoal/50 leading-relaxed font-normal">Curated self-care gift sets</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 4: Promo Box */}
                        <div className="bg-gradient-to-br from-cream-dark to-sage-light/20 rounded-2xl p-5 flex flex-col justify-between border border-forest/5 shadow-inner group/promo relative overflow-hidden">
                          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-forest/5 rounded-full blur-xl group-hover/promo:scale-150 transition-transform duration-500" />
                          <div className="relative z-10">
                            <span className="font-serif italic text-sm font-bold text-forest block">pureplush promise</span>
                            <p className="text-[10px] text-charcoal/70 mt-2 leading-relaxed">
                              100% farm-direct, organic Ayurvedic ingredients sourced sustainably from the pristine hills of Uttara Kannada.
                            </p>
                          </div>
                          <div className="relative z-10 mt-4">
                            <Link href="/shop" className="text-[10px] text-forest font-bold uppercase tracking-wider inline-flex items-center hover:underline">
                              <span>Explore Collection</span>
                              <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="ml-1"
                              >
                                →
                              </motion.span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Our Story Link */}
                <div
                  onMouseEnter={() => setHoveredPath('/#about')}
                  onMouseLeave={() => setHoveredPath(null)}
                  className="relative py-2 px-3.5 rounded-full"
                >
                  <Link
                    href="/#about"
                    className="text-sm font-semibold text-charcoal hover:text-forest transition-colors relative z-10"
                  >
                    Our Story
                  </Link>
                  {hoveredPath === '/#about' && (
                    <motion.div
                      layoutId="navHoverCapsule"
                      className="absolute inset-0 bg-forest/5 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>

              </div>

              {/* Minimal Icon Controls - Right */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Search Toggle */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 text-sage-dark hover:text-forest hover:bg-forest/5 rounded-full transition-all duration-300 hover:scale-105"
                  aria-label="Open Search"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>

                {/* Auth Profile Dropdown */}
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="p-2.5 text-sage-dark hover:text-forest hover:bg-forest/5 rounded-full transition-all duration-300 hover:scale-105"
                    aria-label="Account Login"
                  >
                    <User className="w-4.5 h-4.5" />
                  </Link>
                ) : (
                  <div 
                    onMouseEnter={() => setIsUserHovered(true)}
                    onMouseLeave={() => setIsUserHovered(false)}
                    className="relative py-1"
                  >
                    <button className="flex items-center space-x-1.5 py-1 px-2.5 rounded-full hover:bg-forest/5 text-forest font-semibold text-xs focus:outline-none transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-forest text-cream flex items-center justify-center font-bold text-[10px]">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden xl:inline text-sage-dark">Hi, {username.split(' ')[0]}</span>
                    </button>
                    {/* Account Dropdown popup on hover */}
                    <AnimatePresence>
                      {isUserHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-[38px] w-56 bg-white border border-forest/10 rounded-2xl shadow-xl p-3 z-50 backdrop-blur-md bg-white/95"
                        >
                          <div className="px-3 py-2 border-b border-forest/5 mb-2">
                            <p className="text-[9px] uppercase font-bold tracking-widest text-sage-dark">Account</p>
                            <p className="text-xs font-semibold text-charcoal truncate">{username}</p>
                          </div>
                          <Link href="/orders" className="flex items-center space-x-2.5 py-2 px-3 rounded-xl text-xs hover:bg-forest/5 text-charcoal font-semibold transition-all duration-200">
                            <ClipboardList className="w-4 h-4 text-sage" />
                            <span>My Orders</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2.5 py-2 px-3 rounded-xl text-xs hover:bg-red-50 text-red-650 w-full text-left font-semibold transition-all duration-200 cursor-pointer"
                          >
                            <LogOut className="w-4 h-4 text-red-500" />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Cart Toggle */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2.5 bg-forest text-cream rounded-full hover:bg-forest-light hover:scale-105 transition-all shadow-md group"
                  aria-label="Open Cart"
                >
                  <ShoppingCart className="w-4.5 h-4.5 group-hover:animate-bounce" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-cream"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Hamburger Menu - Mobile */}
              <div className="flex lg:hidden items-center space-x-3">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-forest hover:bg-forest/5 rounded-full transition-colors"
                  aria-label="Open Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-forest bg-forest/5 rounded-full hover:bg-forest/10 transition-colors"
                  aria-label="Open Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-cream">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-forest focus:outline-none z-50 relative hover:bg-forest/5 rounded-full transition-colors"
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Framer Motion) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-39 backdrop-blur-sm"
            />
            {/* Slide out drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed inset-y-0 right-0 z-40 w-80 bg-cream-light/95 backdrop-blur-md border-l border-forest/10 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="flex flex-col h-full mt-10">
                <div className="flex items-center justify-between mb-8 border-b border-forest/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-forest rounded-lg flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-cream" />
                    </div>
                    <span className="font-serif text-lg font-bold text-forest">pureplush</span>
                  </div>
                </div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col space-y-3"
                >
                  {/* Home Link */}
                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${
                        isActive('/') ? 'bg-forest/5 text-forest' : 'hover:bg-forest/5 text-charcoal'
                      }`}
                    >
                      <span>Home</span>
                    </Link>
                  </motion.div>

                  {/* Shop Expandable Accordion */}
                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }} className="flex flex-col">
                    <button
                      onClick={() => setMobileShopOpen(!mobileShopOpen)}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-forest/5 text-charcoal font-semibold text-sm w-full text-left focus:outline-none"
                    >
                      <span>Shop</span>
                      <ChevronDown className={`w-4 h-4 text-sage-dark transition-transform duration-300 ${mobileShopOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileShopOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden pl-4 pr-2 mt-1 space-y-1.5 border-l border-forest/10 ml-5"
                        >
                          <div className="py-1">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-sage-dark mb-1.5">Botanical Powders</p>
                            <Link href="/category/moringa" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-charcoal/80 hover:text-forest transition-colors">ABC Latte Mix Powder</Link>
                            <Link href="/category/moringa" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-charcoal/80 hover:text-forest transition-colors">Choco Multigrain Mix</Link>
                          </div>
                          
                          <div className="py-1 border-t border-forest/5">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-sage-dark mb-1.5 mt-1">Luxury Cleansers</p>
                            <Link href="/category/soaps" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-charcoal/80 hover:text-forest transition-colors">Handcrafted Soaps</Link>
                            <Link href="/category/shampoo" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-charcoal/80 hover:text-forest transition-colors">Luxury Shampoo Bars</Link>
                          </div>

                          <div className="py-1 border-t border-forest/5">
                            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs text-forest font-bold hover:underline">
                              Explore All Products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Our Story Link */}
                  <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      href="/#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 py-2 px-3 rounded-xl hover:bg-forest/5 text-charcoal font-semibold text-sm transition-all"
                    >
                      <span>Our Story</span>
                    </Link>
                  </motion.div>

                  {/* Auth Conditional Mobile Rendering */}
                  {!isLoggedIn ? (
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 py-2 px-3 rounded-xl hover:bg-forest/5 text-charcoal font-semibold text-sm transition-all"
                      >
                        <LogIn className="w-4 h-4 text-sage-dark" />
                        <span>Login / Signup</span>
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }} className="flex items-center space-x-3 py-2.5 px-3 rounded-xl text-forest font-bold text-sm border-b border-forest/5 bg-forest/5">
                        <div className="w-6 h-6 rounded-full bg-forest text-cream flex items-center justify-center font-bold text-xs">
                          {username.charAt(0).toUpperCase()}
                        </div>
                        <span>Hi, {username}</span>
                      </motion.div>
                      
                      <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                        <Link
                          href="/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 py-2 px-3 rounded-xl hover:bg-forest/5 text-charcoal font-semibold text-sm transition-all"
                        >
                          <ClipboardList className="w-4 h-4 text-sage-dark" />
                          <span>My Orders</span>
                        </Link>
                      </motion.div>
                      
                      <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 py-2 px-3 rounded-xl hover:bg-red-50 text-red-650 text-left w-full cursor-pointer text-sm font-semibold transition-all"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Mobile Drawer Bottom Brand tagline */}
              <div className="border-t border-forest/5 pt-4 text-center mt-auto">
                <span className="font-serif italic text-xs text-forest/70 block">pureplush ayurveda</span>
                <span className="text-[9px] text-charcoal/40 block mt-1">Uttara Kannada, Karnataka</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Shopping Drawer & Search Modal */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
