'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-forest text-cream py-16 border-t border-forest-light relative overflow-hidden">
      {/* Abstract vector leaf glow in background */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-sage/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-12 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-cream/10">
          
          {/* Brand Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <Link href="/" className="inline-block">
              <img
                src="/Pureplus.png"
                alt="Pureplus Logo"
                className="h-12 md:h-14 w-auto object-contain mix-blend-multiply px-2 py-1 hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-xs text-sage-light leading-relaxed max-w-xs">
              Handcrafting organic remedies and Ayurvedic solutions for modern lives. We harvest natural goodness to provide instant daily wellness.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors shadow-sm">
                <span className="text-xs font-semibold">Fb</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors shadow-sm">
                <span className="text-xs font-semibold">Ig</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors shadow-sm">
                <span className="text-xs font-semibold">Yt</span>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h4 className="font-serif text-md font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-gold pl-3">
              Explore
            </h4>
            <ul className="space-y-3.5 text-xs text-sage-light">
              <li>
                <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gold transition-colors">Shipping & Delivery Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-gold transition-colors">Refund & Return Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gold transition-colors">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gold transition-colors">Contact Us & CallBack</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">Founder&apos;s Story & Vision</Link>
              </li>
            </ul>
          </motion.div>

          {/* Store Contacts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <h4 className="font-serif text-md font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-gold pl-3">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-xs text-sage-light">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="break-all">impexsaish@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="break-all">info@pureplush.in</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+91 87628 77755</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Nexora Trading Co, SR NO. 27/2, Near Viman Build, Dhanori, Pune, Maharashtra - 411015
                </span>
              </li>
              <li className="pt-2 text-[11px] text-gold/90 font-medium">
                <span>Official Brand Marketing Partner: <strong className="text-white">Nexora Trading Co</strong> (GSTIN: 27IAFPK3618R1ZZ)</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
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
                className="w-full bg-forest-light/30 border border-cream/10 rounded-full px-5 py-3 text-xs text-cream placeholder-sage-light/65 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all font-sans"
              />
              <button
                className="absolute right-1 top-1 bg-cream text-forest hover:bg-gold hover:text-forest p-2 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-sage-light/75">
          <p>© {new Date().getFullYear()} pureplush. Marketed by Nexora Trading Co (Official Brand Marketing Partner). Nature to Nurture. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 md:mt-0 justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
