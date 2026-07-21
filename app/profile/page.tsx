'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, ClipboardList, LogOut, ArrowLeft, Check, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', // Female
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', // Male
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', // Female 2
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&h=150&q=80'  // Illustrated/3D Style
];

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Edit Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    window.location.href = '/';
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const updatedUser: UserData = {
      name,
      email,
      phone,
      address,
      avatarUrl
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Trigger storage event to update Navbar avatar immediately
    window.dispatchEvent(new Event('storage'));

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-forest border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream/20 via-cream-light to-cream/10 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-forest hover:text-forest-light text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Quick Actions */}
          <div className="md:col-span-4 bg-white border border-forest/10 p-6 rounded-3xl shadow-lg flex flex-col items-center justify-between text-center relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-forest via-sage to-gold" />

            <div className="w-full flex flex-col items-center mt-4">
              {/* Profile Avatar Frame */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-cream shadow-md relative">
                  <img
                    src={avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                  className="absolute bottom-1 right-1 bg-forest hover:bg-forest-light text-cream p-1.5 rounded-full shadow-lg transition-colors border border-white"
                  title="Change Avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Avatar Preset Selector Modal/Dropdown */}
              {showAvatarSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-cream border border-forest/10 rounded-2xl shadow-md w-full"
                >
                  <p className="text-[10px] font-bold text-forest uppercase tracking-wider mb-2">Select Avatar</p>
                  <div className="flex justify-center space-x-2">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAvatarUrl(preset);
                          setShowAvatarSelector(false);
                        }}
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                          avatarUrl === preset ? 'border-forest scale-105 shadow-sm' : 'border-transparent hover:scale-105'
                        }`}
                      >
                        <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <h2 className="mt-4 font-serif text-lg font-bold text-forest">{user.name}</h2>
              <p className="text-[10px] text-charcoal/50 break-all">{user.email}</p>

              <div className="inline-flex items-center space-x-1.5 bg-forest/5 px-3 py-1 rounded-full text-forest text-[10px] font-bold uppercase tracking-wider mt-3 select-none">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Botanical Member</span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="w-full space-y-2 mt-8 pt-6 border-t border-forest/5">
              <Link
                href="/orders"
                className="w-full flex items-center justify-center space-x-2.5 py-2.5 border border-forest/10 hover:bg-forest/5 text-forest font-semibold text-xs rounded-full uppercase tracking-wider transition-all"
              >
                <ClipboardList className="w-4 h-4 text-sage-dark" />
                <span>View My Orders</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-650 font-semibold text-xs rounded-full uppercase tracking-wider transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Logout Account</span>
              </button>
            </div>
          </div>

          {/* Right Column: Edit Profile Form */}
          <div className="md:col-span-8 bg-white border border-forest/10 p-6 md:p-8 rounded-3xl shadow-lg font-sans">
            <h2 className="font-serif text-xl font-bold text-forest mb-6 border-b border-forest/5 pb-3">
              Profile Settings
            </h2>

            <form onSubmit={handleSave} className="space-y-5 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-forest/70 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-forest/15 placeholder-sage-dark/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest text-xs bg-cream/10 focus:bg-white transition-all font-sans"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-forest/70 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-forest/15 placeholder-sage-dark/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest text-xs bg-cream/10 focus:bg-white transition-all font-sans"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-forest/70 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-forest/15 placeholder-sage-dark/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest text-xs bg-cream/10 focus:bg-white transition-all font-sans"
                    placeholder="Your contact number"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-forest/70 block">
                  Default Shipping Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-5 w-4 h-4 text-sage" />
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-forest/15 placeholder-sage-dark/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest text-xs bg-cream/10 focus:bg-white transition-all font-sans"
                    placeholder="Enter street, city, state, pincode for deliveries"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg font-sans"
                >
                  <span>Save Profile</span>
                </button>

                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center space-x-1.5 text-xs text-green-700 font-bold font-sans"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Profile saved successfully!</span>
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
