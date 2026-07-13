'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-forest text-cream py-16 border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-cream/10">
          
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cream text-forest rounded-lg flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-white">
                pureplush
              </span>
            </div>
            <p className="text-xs text-sage-light leading-relaxed max-w-xs">
              Handcrafting organic remedies and Ayurvedic solutions for modern lives. We harvest natural goodness to provide instant daily wellness.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors">
                <span className="text-sm">Fb</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors">
                <span className="text-sm">Ig</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors">
                <span className="text-sm">Yt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-md font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-gold pl-3">
              Explore
            </h4>
            <ul className="space-y-3.5 text-xs text-sage-light">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-gold transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-gold transition-colors">Featured Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">About Ayurvedic Farming</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold transition-colors text-white font-medium border-t border-cream/10 pt-2 block mt-1">Admin Panel</Link>
              </li>
            </ul>
          </div>

          {/* Store Contacts */}
          <div>
            <h4 className="font-serif text-md font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-gold pl-3">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-xs text-sage-light">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="break-all">Saishtechnofarms@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+91 7483849998</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  C/O Saish Technofarms, Block I 137/5, Uttara Kannada, Karnataka - 581362
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-md font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-gold pl-3">
              Newsletter
            </h4>
            <p className="text-xs text-sage-light mb-4">
              Subscribe to receive updates on herbal farming recipes and new wellness products.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full py-2.5 pl-4 pr-12 bg-white/10 text-cream text-xs rounded-full border border-cream/15 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold text-forest flex items-center justify-center hover:bg-cream hover:text-forest transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 text-center text-xs text-sage-light/60 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Pureplush Organics. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
