'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Gift, Building2, Send, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';

export default function B2BPartnerSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interest: 'Distributor / Retail Store Supply',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in all required fields (Full Name, Phone Number & Email).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/b2b-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit B2B enquiry. Please try again.');
      }
    } catch {
      setErrorMessage('An error occurred while submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      interest: 'Distributor / Retail Store Supply',
      requirements: '',
    });
    setSubmitted(false);
    setErrorMessage('');
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Pureplus Team, I am interested in B2B partnership & bulk distribution for Pureplus products."
  );

  return (
    <section id="b2b-partner" className="py-16 sm:py-24 bg-[#071317] text-white relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card Wrapper */}
        <div className="bg-gradient-to-br from-[#0c1f24] via-[#091a1e] to-[#051114] border border-white/10 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            
            {/* Left Column: Information & Highlight Feature Boxes */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    Partner with Pureplus for Bulk & Distribution
                  </h2>
                  
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    We welcome distributors, retail store owners, corporate wellness teams, and gift pack buyers to partner with Pureplus. Bring high-demand natural herbal hair & skin care products to your customers.
                  </p>
                </motion.div>

                {/* 3 Feature Boxes */}
                <div className="mt-8 space-y-4">
                  {/* Feature 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-start space-x-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 p-4 rounded-2xl transition-all duration-300"
                  >
                    <div className="p-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl flex-shrink-0">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        Retail & Supermarket Distribution
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Attractive trade margins and steady stock supply for grocery & health/beauty stores.
                      </p>
                    </div>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-start space-x-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 p-4 rounded-2xl transition-all duration-300"
                  >
                    <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl flex-shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        Corporate Wellness & Festival Hampers
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Customized healthy herbal wellness & self-care gift packs for employees, clients, and corporate events.
                      </p>
                    </div>
                  </motion.div>

                  {/* Feature 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex items-start space-x-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 p-4 rounded-2xl transition-all duration-300"
                  >
                    <div className="p-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl flex-shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        Salons, Spas & Institutions
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Bulk supply of handcrafted natural soaps, shampoo bars & herbal powders ideal for salon chains, spa wellness centers, and corporate gifting.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Instant WhatsApp Button (Matches layout in user reference) */}
              <div className="pt-4">
                <a
                  href={`https://wa.me/919313887019?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Instant B2B WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            {/* Right Column: B2B Enquiry Form Card */}
            <div className="lg:col-span-6 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl h-full flex flex-col justify-between border border-slate-100"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
                    Send B2B Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-6">
                    Fill in your details below. Our corporate sales team will contact you within 24 hours.
                  </p>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 my-auto"
                      >
                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">Enquiry Submitted!</h4>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                            Thank you for reaching out to Pureplus. Our B2B partnership representative will get in touch with you within 24 hours.
                          </p>
                        </div>
                        <button
                          onClick={handleReset}
                          className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          Submit Another Enquiry
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMessage && (
                          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{errorMessage}</span>
                          </div>
                        )}

                        {/* Full Name / Business Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Your Full Name / Business Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Rahul Sharma (Sharma Wellness Stores)"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                          />
                        </div>

                        {/* Phone & Email Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Phone Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              required
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Email Address <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="business@gmail.com"
                              required
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>
                        </div>

                        {/* Partnership Interest Select */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Partnership Interest <span className="text-rose-500">*</span>
                          </label>
                          <select
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all cursor-pointer"
                          >
                            <option value="Distributor / Retail Store Supply">Distributor / Retail Store Supply</option>
                            <option value="Corporate Gifting & Hampers">Corporate Gifting & Hampers</option>
                            <option value="Salons, Spas & Wellness Centers">Salons, Spas & Wellness Centers</option>
                          </select>
                        </div>

                        {/* Message / Requirements */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Message / Requirements
                          </label>
                          <textarea
                            name="requirements"
                            rows={3}
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="Tell us about your city, store count, or estimated quantity requirement..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                          >
                            {isSubmitting ? (
                              <span>Submitting Enquiry...</span>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>SUBMIT PARTNERSHIP ENQUIRY</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
