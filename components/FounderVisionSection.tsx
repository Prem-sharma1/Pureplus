'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Leaf, Compass, Building2, FileText, MapPin, Mail, Phone, Award } from 'lucide-react';

export default function FounderVisionSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-cream via-cream-light to-white relative overflow-hidden">
      {/* Background Decorative Ambient Flares */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">

        {/* SECTION 1: A LETTER FROM OUR FOUNDER */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-widest mb-3 border border-forest/10"
            >
              <Heart className="w-3.5 h-3.5 text-gold" />
              <span>Our Heritage & Heart</span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest leading-tight"
            >
              Our Story - Nature to Nurture
            </motion.h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Visual Founder Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-forest p-8 text-cream border border-forest-light">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-gold/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center overflow-hidden p-1">
                    <img src="/whitepureplus.jpeg" alt="Pureplush Logo" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">Pureplush</h3>
                    <p className="text-xs text-sage-light tracking-widest uppercase font-semibold">Nature to Nurture</p>
                  </div>
                </div>

                <div className="bg-forest-light/40 backdrop-blur-sm p-6 rounded-2xl border border-cream/10 my-6 relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-gold/30 font-serif leading-none select-none">“</span>
                  <p className="text-sm italic font-serif leading-relaxed text-cream/90 relative z-10 pt-2">
                    Pureplush was created with a simple purpose: to make natural personal care and wellness routines easier, cleaner and more accessible for modern homes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div className="bg-cream/5 rounded-xl p-3 border border-cream/10">
                    <span className="block font-bold text-gold text-lg">Botanical</span>
                    <span className="text-sage-light text-[11px]">Traditional Care</span>
                  </div>
                  <div className="bg-cream/5 rounded-xl p-3 border border-cream/10">
                    <span className="block font-bold text-gold text-lg">Selected</span>
                    <span className="text-sage-light text-[11px]">Quality Ingredients</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-cream/10 flex items-center justify-between">
                  <div>
                    <p className="font-serif font-bold text-base text-white">Founder & Storyteller</p>
                    <p className="text-xs text-sage-light">Pureplush Botanical Care</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Founder's Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 space-y-6 text-charcoal/85 text-base sm:text-lg leading-relaxed font-sans"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl border border-forest/10 space-y-6">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-forest first-letter:mr-3 first-letter:float-left">
                  Pureplush was created with a simple purpose: to make natural personal care and wellness routines easier, cleaner and more accessible for modern homes.
                </p>
                
                <p>
                  Our products are inspired by everyday Indian traditions - herbal cleansing, natural oils, nourishing powders and simple self-care rituals - redesigned for busy lifestyles.
                </p>

                <p>
                  Many customers today want products that are simple to understand, easy to use and transparent about ingredients. Pureplush is built around that need.
                </p>

                <div className="p-6 bg-cream rounded-2xl border-l-4 border-gold text-forest font-serif italic text-lg shadow-inner">
                  "Pureplush blends traditional ingredient wisdom with modern product convenience, clear labelling and quality-focused manufacturing."
                </div>

                <p>
                  Every Pureplush product is developed to deliver a pleasant user experience - good texture, practical usage, clean aroma, easy application and transparent product information.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: OUR VISION & VISION STATEMENT */}
        <div className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/15 text-forest text-xs font-bold uppercase tracking-widest mb-3 border border-gold/30"
            >
              <Compass className="w-3.5 h-3.5 text-forest" />
              <span>Our Purpose & Guidance</span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest leading-tight"
            >
              Our Vision
            </motion.h2>
            <p className="text-charcoal/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              To make natural personal care and wellness products simple, trustworthy and enjoyable for everyday Indian homes.
            </p>
          </div>

          {/* Vision Statement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 bg-gradient-to-r from-forest via-forest-light to-forest text-cream rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-gold/30"
          >
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em]">
                Pureplush Vision Statement
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-snug">
                “To make natural personal care and wellness products simple, trustworthy and enjoyable for everyday Indian homes.”
              </h3>
            </div>
          </motion.div>

          {/* Full Vision Content Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-forest/10 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">Trusted Natural Care</h3>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                At Pureplush, our vision is to become one of India's most trusted natural wellness and personal care brands by inspiring people to embrace a healthier, more mindful lifestyle rooted in nature.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-forest/10 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/20 text-forest flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">Ayurvedic Wisdom & Modern Standards</h3>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                We envision a world where every home experiences the purity of authentic herbal care and the serenity of traditional wellness rituals. By blending timeless Ayurvedic wisdom with modern quality standards, we strive to create products that nurture the body, calm the mind, and uplift the spirit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-forest/10 hover:shadow-xl transition-all md:col-span-2"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-forest text-cream flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-2">Uncompromising Quality & Innovation</h3>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    Our commitment is to continually innovate with natural ingredients, maintain uncompromising quality, and build a brand that stands for trust, purity, sustainability, and wellness across every home we touch.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 3: COMPANY & GST DETAILS (NEXORA TRADING CO - OFFICIAL BRAND MARKETING PARTNER) */}
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-forest text-cream rounded-3xl p-8 sm:p-12 shadow-2xl border border-forest-light relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-cream/15 pb-8 lg:pb-0 lg:pr-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cream/10 text-gold text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Details</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Nexora Trading Co
                </h3>
                <p className="text-sage-light text-xs sm:text-sm leading-relaxed">
                  Pureplush is marketed by Nexora Trading Co (Official Brand Marketing Partner), committing to transparent business practices, authentic sourcing, and registered tax compliance.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-gold font-sans font-semibold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>GST Registered Enterprise</span>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="bg-forest-light/40 backdrop-blur-sm p-5 rounded-2xl border border-cream/10 space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Legal Marketing Partner</span>
                  </div>
                  <p className="text-sm font-semibold text-cream">Nexora Trading Co</p>
                  <p className="text-[11px] text-sage-light">Official Brand Marketing Partner</p>
                </div>

                <div className="bg-forest-light/40 backdrop-blur-sm p-5 rounded-2xl border border-cream/10 space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">GST Compliance</span>
                  </div>
                  <p className="text-xs font-semibold text-cream">GSTIN: 27IAFPK3618R1ZZ</p>
                  <p className="text-[11px] text-sage-light">Proprietorship (Jatin Ramesh Kotani)</p>
                </div>

                <div className="bg-forest-light/40 backdrop-blur-sm p-5 rounded-2xl border border-cream/10 space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Registered Address</span>
                  </div>
                  <p className="text-xs text-cream leading-relaxed font-medium">
                    SR NO. 27/2, Near Viman Build, Munjaba Wasti, Sudama Nagar, Dhanori, Pune, Maharashtra - 411015
                  </p>
                </div>

                <div className="bg-forest-light/40 backdrop-blur-sm p-5 rounded-2xl border border-cream/10 space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</span>
                  </div>
                  <p className="text-xs text-cream font-medium break-all">support@pureplush.in</p>
                  <p className="text-xs text-cream font-medium">+91 87628 77755</p>
                </div>

              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
