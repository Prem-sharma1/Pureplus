'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, LogIn, LogOut, ClipboardList, Menu, X, Leaf, ChevronDown } from 'lucide-react';
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
  
  // Overlay Open States
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  
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
        className={`fixed top-0 left-0 right-0 z-45 transition-transform duration-300 w-full ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Announcement Banner */}
        <div className="bg-forest text-cream py-2 px-4 text-center text-[10px] md:text-xs font-semibold tracking-wider uppercase flex items-center justify-center overflow-hidden h-9">
          <div className="transition-all duration-500 ease-in-out transform">
            {ANNOUNCEMENTS[announcementIndex]}
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full transition-all duration-300 border-b border-forest/5 ${
            isScrolled
              ? 'py-3.5 bg-cream/90 backdrop-blur-md shadow-md'
              : 'py-5 bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              
              {/* Logo Section */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="relative flex items-center justify-center w-9 h-9 bg-forest rounded-xl shadow-md group-hover:rotate-12 transition-transform duration-300">
                    <Leaf className="w-5 h-5 text-cream" />
                  </div>
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
              <div className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive('/') ? 'text-forest font-semibold' : 'text-charcoal hover:text-forest'
                  }`}
                >
                  Home
                </Link>

                {/* Shop Megamenu trigger */}
                <div
                  onMouseEnter={() => setIsShopHovered(true)}
                  onMouseLeave={() => setIsShopHovered(false)}
                  className="relative py-1"
                >
                  <Link
                    href="/shop"
                    className="flex items-center space-x-1 text-sm font-medium text-charcoal hover:text-forest transition-colors focus:outline-none"
                  >
                    <span>Shop</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isShopHovered ? 'rotate-180' : 'rotate-0'}`} />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {isShopHovered && (
                    <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[600px] bg-white border border-forest/10 rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-6 z-50">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-bold text-sage-dark border-b border-forest/5 pb-2 mb-3">Botanical Powders</h4>
                        <ul className="space-y-2 text-xs text-charcoal/80">
                          <li><Link href="/category/moringa" className="hover:text-forest font-medium transition-colors">ABC Latte Mix Powder</Link></li>
                          <li><Link href="/category/moringa" className="hover:text-forest font-medium transition-colors">Choco Multigrain Mix</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-bold text-sage-dark border-b border-forest/5 pb-2 mb-3">Luxury Cleansers</h4>
                        <ul className="space-y-2 text-xs text-charcoal/80">
                          <li><Link href="/category/soaps" className="hover:text-forest font-medium transition-colors">Handcrafted Soaps</Link></li>
                          <li><Link href="/category/shampoo" className="hover:text-forest font-medium transition-colors">Luxury Shampoo Bars</Link></li>
                        </ul>
                      </div>
                      <div className="bg-cream/40 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="font-serif italic text-sm font-bold text-forest block">pureplush promise</span>
                          <p className="text-[10px] text-charcoal/60 mt-1 leading-relaxed">Made directly with organically sourced moringa leaves & lavender oils.</p>
                        </div>
                        <Link href="/shop" className="text-[10px] text-forest font-bold uppercase tracking-wider inline-flex items-center hover:underline mt-4">
                          Explore All Products →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/#about"
                  className="text-sm font-medium text-charcoal hover:text-forest transition-colors py-1"
                >
                  Our Story
                </Link>
              </div>

              {/* Minimal Icon Controls - Right */}
              <div className="hidden lg:flex items-center space-x-5">
                {/* Search Toggle */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-charcoal hover:text-forest hover:scale-105 transition-all"
                  aria-label="Open Search"
                >
                  <Search className="w-5 h-5 text-sage-dark hover:text-forest" />
                </button>

                {/* Auth Profile Dropdown */}
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="p-2 text-charcoal hover:text-forest hover:scale-105 transition-all"
                    aria-label="Account Login"
                  >
                    <User className="w-5 h-5 text-sage-dark hover:text-forest" />
                  </Link>
                ) : (
                  <div className="relative group py-1">
                    <button className="flex items-center space-x-1 p-2 text-forest font-semibold text-xs focus:outline-none">
                      <User className="w-5 h-5 text-sage-dark" />
                      <span className="hidden xl:inline">Hi, {username}</span>
                    </button>
                    {/* Account Dropdown popup on hover */}
                    <div className="absolute right-0 top-[35px] w-48 bg-white border border-forest/10 rounded-xl shadow-lg p-2.5 hidden group-hover:block z-50">
                      <Link href="/orders" className="flex items-center space-x-2 py-2 px-3 rounded-lg text-xs hover:bg-forest/5 text-charcoal font-medium">
                        <ClipboardList className="w-4 h-4 text-sage" />
                        <span>My Orders</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 py-2 px-3 rounded-lg text-xs hover:bg-red-50 text-red-650 w-full text-left font-medium cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Cart Toggle */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2.5 bg-forest text-cream rounded-full hover:bg-forest-light hover:scale-105 transition-all shadow-md group"
                  aria-label="Open Cart"
                >
                  <ShoppingCart className="w-4.5 h-4.5 group-hover:animate-bounce" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-cream animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Hamburger Menu - Mobile */}
              <div className="flex lg:hidden items-center space-x-4">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-1 text-forest"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-forest bg-forest/5 rounded-full"
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
                  className="p-2 text-forest focus:outline-none"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-40 w-72 bg-cream-light border-l border-forest/10 p-6 shadow-2xl transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif text-xl font-bold text-forest">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-full text-charcoal hover:bg-forest/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center space-x-3 py-2 px-3 rounded-lg font-medium ${
              isActive('/') ? 'bg-forest/5 text-forest font-semibold' : 'hover:bg-forest/5 text-charcoal'
            }`}
          >
            <span>Home</span>
          </Link>

          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-forest/5 text-charcoal"
          >
            <span>Shop</span>
          </Link>

          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-forest/5 text-charcoal"
          >
            <span>Our Story</span>
          </Link>

          {/* Auth Conditional Mobile Rendering */}
          {!isLoggedIn ? (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-forest/5 text-charcoal"
            >
              <LogIn className="w-4 h-4 text-sage-dark" />
              <span>Login / Signup</span>
            </Link>
          ) : (
            <>
              <div className="flex items-center space-x-3 py-2.5 px-3 rounded-lg text-forest font-semibold border-b border-forest/5">
                <User className="w-4 h-4 text-sage-dark" />
                <span>Hi, {username}</span>
              </div>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-forest/5 text-charcoal"
              >
                <ClipboardList className="w-4 h-4 text-sage-dark" />
                <span>My Orders</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-red-50 text-red-650 text-left w-full cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Global Shopping Drawer & Search Modal */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
