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
  const [avatarUrl, setAvatarUrl] = useState('');

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
        setAvatarUrl(parsed.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80');
      } else {
        setIsLoggedIn(false);
        setUsername('');
        setAvatarUrl('');
      }
    } catch {
      setIsLoggedIn(false);
      setUsername('');
      setAvatarUrl('');
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

  // Client-side authentication route guard
  useEffect(() => {
    const user = localStorage.getItem('user');
    const isLoggedIn = !!user;

    const publicPaths = ['/', '/login', '/signup'];
    const isPublic = publicPaths.includes(pathname || '') || pathname?.startsWith('/api');

    if (!isLoggedIn && !isPublic) {
      window.location.href = `/login?redirect=${encodeURIComponent(pathname || '/')}`;
    }
  }, [pathname, isLoggedIn]);

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
        className="fixed top-0 left-0 right-0 z-40 w-full bg-white border-b border-forest/10 transition-all duration-300"
      >
        {/* Announcement Banner */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 36, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-forest text-cream px-4 text-center text-[10px] md:text-xs font-semibold tracking-wider uppercase flex items-center justify-center overflow-hidden select-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={announcementIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-center font-sans tracking-widest text-[10px] sm:text-xs text-cream-light font-bold"
                >
                  {ANNOUNCEMENTS[announcementIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navbar */}
        <div className="w-full bg-white px-4 sm:px-6 lg:px-8 border-b border-forest/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-20">

            {/* Left: Search Link */}
            <div className="flex items-center w-1/3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center space-x-2 text-charcoal/70 hover:text-forest transition-colors text-xs font-bold uppercase tracking-wider focus:outline-none"
              >
                <Search className="w-4 h-4 text-forest" />
                <span>Search</span>
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 text-forest hover:bg-forest/5 rounded-full transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex justify-center items-center w-1/3 text-center">
              <Link href="/" className="flex flex-col items-center group">
                <div className="flex items-center space-x-1.5">
                  <Leaf className="w-5.5 h-5.5 text-forest" />
                  <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-forest leading-none">
                    pureplush
                  </span>
                </div>
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-sage-dark font-bold mt-1">
                  organics & ayurveda
                </span>
              </Link>
            </div>

            {/* Right: User & Cart Icons */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-4 w-1/3">
              {isLoggedIn ? (
                <div
                  onMouseEnter={() => setIsUserHovered(true)}
                  onMouseLeave={() => setIsUserHovered(false)}
                  className="relative py-1"
                >
                  <Link
                    href="/profile"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-forest text-cream hover:bg-forest-light font-bold text-sm shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label="View Profile"
                  >
                    {username.charAt(0).toUpperCase() || 'P'}
                  </Link>
                  {/* Account Dropdown */}
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
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-forest hover:bg-forest/5 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Account Login"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-forest bg-forest/5 rounded-full hover:bg-forest/10 transition-colors"
                aria-label="Open Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-forest focus:outline-none z-50 relative hover:bg-forest/5 rounded-full transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Categories Sub-Navbar (Desktop Only) */}
        <div className="hidden lg:block w-full bg-white">
          <div className="max-w-5xl mx-auto flex items-center justify-center h-11 space-x-8">
            <Link
              href="/category/soaps"
              className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors font-sans hover:text-forest ${pathname === '/category/soaps' ? 'text-forest' : 'text-charcoal/70'
                }`}
            >
              SOAPS
            </Link>
            <Link
              href="/category/shampoo"
              className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors font-sans hover:text-forest ${pathname === '/category/shampoo' ? 'text-forest' : 'text-charcoal/70'
                }`}
            >
              SHAMPOO BARS
            </Link>
            <Link
              href="/category/moringa"
              className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors font-sans hover:text-forest ${pathname === '/category/moringa' ? 'text-forest' : 'text-charcoal/70'
                }`}
            >
              BOTANICAL MALT
            </Link>
            <Link
              href="/category/others"
              className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors font-sans hover:text-forest ${pathname === '/category/others' ? 'text-forest' : 'text-charcoal/70'
                }`}
            >
              SKINCARE & GELS
            </Link>
            <Link
              href="/shop"
              className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors font-sans hover:text-forest ${pathname === '/shop' ? 'text-forest' : 'text-charcoal/70'
                }`}
            >
              ALL PRODUCTS
            </Link>
            <Link
              href="/#about"
              className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors font-sans hover:text-forest text-charcoal/70"
            >
              OUR STORY
            </Link>
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
                      className={`flex items-center space-x-3 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${isActive('/') ? 'bg-forest/5 text-forest' : 'hover:bg-forest/5 text-charcoal'
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
                      <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 py-2.5 px-3 rounded-xl text-forest font-bold text-sm border-b border-forest/5 bg-forest/5 hover:bg-forest/10 transition-colors font-sans"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-forest text-cream font-bold text-xs shadow-sm">
                            {username.charAt(0).toUpperCase() || 'P'}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-charcoal/40 font-normal">Profile Page</span>
                            <span className="font-semibold text-charcoal">{username}</span>
                          </div>
                        </Link>
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
