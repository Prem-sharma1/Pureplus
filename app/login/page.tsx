'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Save verified user info to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Trigger custom storage event to update Navbar
        window.dispatchEvent(new Event('storage'));

        // Redirect home
        window.location.href = '/';
      } else {
        setError(data.error || 'Login failed. Please verify your email and password.');
      }
    } catch (err: any) {
      console.error(err);
      setError('A connection error occurred. Make sure your MySQL database is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream/20 to-cream-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-white border border-forest/10 p-8 rounded-2xl shadow-xl glass-card"
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-forest text-cream rounded-xl flex items-center justify-center shadow-md">
            <Leaf className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold font-serif text-forest">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-xs text-charcoal/60">
            Sign in to access your Pureplush profile & order history
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200/60 text-red-600 px-4 py-2.5 rounded-xl text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-forest/15 placeholder-sage-dark/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest text-sm bg-cream/20 focus:bg-white transition-all"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full pl-11 pr-4 py-3 border border-forest/15 placeholder-sage-dark/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest text-sm bg-cream/20 focus:bg-white transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-forest focus:ring-forest border-forest/15 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-charcoal/70">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-semibold text-forest hover:text-forest-light">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-full text-cream bg-forest hover:bg-forest-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest transition-colors shadow-md hover:shadow-lg disabled:bg-sage disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-charcoal/60 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-forest hover:text-forest-light underline">
            Register now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
