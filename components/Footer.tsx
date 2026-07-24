'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { Leaf, Mail, Phone, MapPin, Send, ShieldCheck, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-forest text-cream py-16 border-t border-forest-light relative overflow-hidden">
      {/* Meta Pixel Code (Footer) */}
      <Script
        id="meta-pixel-footer"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            if(window.fbq) { fbq('init', '768046529349085'); fbq('track', 'PageView'); }
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=768046529349085&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* Abstract vector leaf glow in background */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-sage/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-12 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-10 border-b border-cream/10">
          
          {/* Brand Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/whitepureplus.jpeg"
                alt="Pureplush Logo"
                className="h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-xs text-sage-light leading-relaxed max-w-xs">
              Pureplush offers botanical personal care and wellness products designed for simple, mindful everyday routines.
            </p>
            <div className="flex space-x-3 pt-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1EKcfVeWfX/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 rounded-full border-2 border-cream/30 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110 transition-all duration-200 shadow-md group"
              >
                <svg className="w-6 h-6 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/pureplush.in?igsh=anRzdWMxNDB0cTZ3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border-2 border-cream/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:scale-110 transition-all duration-200 shadow-md group"
              >
                <svg className="w-6 h-6 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
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
                <a href="tel:+918446816247" className="hover:text-gold transition-colors">+91 84468 16247</a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Nexora Trading Co, SR NO. 27/2, Near Viman Build, Dhanori, Pune, Maharashtra - 411015
                </span>
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
              Subscribe for product launches, skincare tips, hair-care routines, ingredient stories and exclusive offers.
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

            {/* Nexora Trading Co Official Marketing Partner - Professional Luxury Card */}
            <div className="mt-6 pt-5 border-t border-cream/15">
              <div className="bg-forest-dark/60 backdrop-blur-md rounded-2xl p-4 border border-gold/30 shadow-sm space-y-2">
                <div className="flex items-center space-x-2 text-gold text-sm font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Official Marketing Partner</span>
                </div>
                <h5 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Marketed by <span className="text-gold font-sans font-extrabold">Nexora Trading Co</span>
                </h5>
                <div className="pt-1 flex items-center space-x-2 text-xs font-semibold text-sage-light">
                  <span className="text-cream/80 font-medium">GSTIN:</span>
                  <span className="font-mono text-gold font-bold tracking-wider bg-forest-light/30 px-3 py-1 rounded-lg border border-gold/30 text-xs shadow-inner">
                    27IAFPK3618R1ZZ
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-base text-sage-light/75 border-t border-cream/10">
          <p>© {new Date().getFullYear()} pureplush. Marketed by <strong className="text-white">Nexora Trading Co</strong> (Official Brand Marketing Partner). All Rights Reserved.</p>
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
