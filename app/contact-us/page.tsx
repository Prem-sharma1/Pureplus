'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  User,
  MessageSquare,
  Smartphone
} from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [num1] = useState(Math.floor(Math.random() * 5) + 3);
  const [num2] = useState(Math.floor(Math.random() * 5) + 2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your Name, Email ID, and Mobile Number.');
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      setErrorMessage(`Verification math problem incorrect. What is ${num1} + ${num2}?`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit callback request.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try emailing impexsaish@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfdfc] text-charcoal font-sans pt-24 pb-20">
      {/* Background Soft Glow */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-forest/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      {/* Hero Header - Full Width */}
      <div className="w-full bg-gradient-to-b from-forest-dark via-forest to-forest-dark text-white relative overflow-hidden py-14 sm:py-16 px-4 sm:px-8 lg:px-12 shadow-md">
        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          <nav className="flex items-center space-x-2 text-xs text-sage-light mb-4 justify-center">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-gold font-semibold">Contact Us</span>
          </nav>

          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-light">Get in Touch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Contact Us & Request CallBack
          </h1>
          <p className="mt-3 text-sm sm:text-base text-sage-light/90 max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or services? Fill in your details below and our team will get back to you shortly.
          </p>
        </div>
      </div>

      {/* Main Container - Full Width (max-w-7xl) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-10">

        {/* Top Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-2xl bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Collaboration Mail</span>
              <a href="mailto:info@pureplush.in" className="text-sm font-semibold text-charcoal hover:text-forest transition-colors break-all">
                info@pureplush.in
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-2xl bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Support Mail</span>
              <a href="mailto:impexsaish@gmail.com" className="text-sm font-semibold text-charcoal hover:text-forest transition-colors break-all">
                impexsaish@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-forest/10 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-2xl bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Location</span>
              <span className="text-sm font-medium text-charcoal/80">pureplush, Karnataka.</span>
            </div>
          </div>
        </div>

        {/* Callback Form Box */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-12 lg:p-16 border border-forest/10 shadow-xl shadow-forest/5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest">Request For CallBack</h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 leading-relaxed">
              To know more about services offered by us, kindly fill in the details below. You will get a call back soon.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-forest/5 border border-forest/20 rounded-3xl p-8 sm:p-12 text-center space-y-4 py-12"
              >
                <div className="w-16 h-16 bg-forest text-gold rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-forest">Request Submitted!</h3>
                <p className="text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed">
                  Thank you <strong>{formData.name}</strong>. Our team will contact you back on <strong>{formData.phone}</strong> soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                    setCaptchaAnswer('');
                  }}
                  className="mt-4 inline-flex items-center space-x-2 px-6 py-2.5 bg-forest text-white hover:bg-forest-dark font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
                >
                  <span>Submit Another Request</span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
                {errorMessage && (
                  <div className="flex items-center space-x-2 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-forest/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 bg-cream/40 border border-forest/15 rounded-xl text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      Email Id <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-forest/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 bg-cream/40 border border-forest/15 rounded-xl text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                    Mobile no. <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-forest/40 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-cream/40 border border-forest/15 rounded-xl text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-forest/40 absolute left-4 top-4" />
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Enter your message or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-cream/40 border border-forest/15 rounded-xl text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Verification */}
                <div className="bg-forest/5 p-4 sm:p-5 rounded-2xl border border-forest/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <label className="text-xs sm:text-sm font-bold text-forest uppercase tracking-wider flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-gold-dark" />
                    <span>Security Verification: {num1} + {num2} = ?</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Result"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-full sm:w-36 px-4 py-2.5 bg-white border border-forest/20 rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest font-mono text-center"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-forest text-white hover:bg-forest-dark font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Verify & Submit</span>
                      <Send className="w-4 h-4 text-gold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
