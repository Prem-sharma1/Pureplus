'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ThumbsUp, PenSquare, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getExactProductRating, getExactReviewCount } from '@/lib/ratingUtils';
import StarRating from '@/components/StarRating';

export interface ReviewItem {
  id: number;
  product_id: number;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  location?: string;
  images?: string;
  verified?: number;
  status?: string;
  created_at: string;
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
  onReviewStatsChange?: (stats: { totalCount: number; averageRating: number }) => void;
}

export default function ProductReviews({ productId, productName, onReviewStatsChange }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});
  const [userVoted, setUserVoted] = useState<Record<number, boolean>>({});

  // Form State matching reference design
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');
  const [submitErrorMsg, setSubmitErrorMsg] = useState('');

  // Lightbox Image
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
        
        // Notify parent of exact stats
        const exactRating = getExactProductRating({ id: productId });
        const exactCount = getExactReviewCount({ id: productId });
        if (onReviewStatsChange) {
          onReviewStatsChange({ totalCount: exactCount, averageRating: exactRating });
        }
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculated Stats matching exact product rating
  const totalReviews = reviews.length > 0 ? reviews.length : getExactReviewCount({ id: productId });
  const exactScore = getExactProductRating({ id: productId });
  const averageScore = exactScore;
  const displayScore = exactScore.toFixed(1);

  // Distribution (5 to 1 star)
  const distribution: Record<number, { count: number; percentage: number }> = {
    5: { count: 0, percentage: 0 },
    4: { count: 0, percentage: 0 },
    3: { count: 0, percentage: 0 },
    2: { count: 0, percentage: 0 },
    1: { count: 0, percentage: 0 },
  };

  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, r.rating || 5));
    if (distribution[star]) {
      distribution[star].count += 1;
    }
  });

  Object.keys(distribution).forEach((starKey) => {
    const k = Number(starKey);
    const count = distribution[k].count;
    distribution[k].percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  });

  // Filtered reviews list
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => (r.rating || 5) === filterRating);

  const handleHelpfulClick = (reviewId: number) => {
    if (userVoted[reviewId]) return;
    setUserVoted((prev) => ({ ...prev, [reviewId]: true }));
    setHelpfulCounts((prev) => ({ ...prev, [reviewId]: (prev[reviewId] || 0) + 1 }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrorMsg('');
    setSubmitSuccessMsg('');

    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) {
      setSubmitErrorMsg('Please fill in your name, review headline, and detailed review comment.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        product_id: productId,
        name: formName.trim(),
        email: formEmail.trim(),
        location: formLocation.trim(),
        rating: formRating,
        title: formTitle.trim(),
        comment: formComment.trim(),
        images: formImageUrl.trim(),
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.review) {
        setSubmitSuccessMsg('Thank you! Your rating & review has been submitted successfully.');
        
        // Prepend new review immediately to UI
        const newReviewList = [data.review, ...reviews];
        setReviews(newReviewList);

        // Update stats
        const newTotal = newReviewList.length;
        const newAvg = (newReviewList.reduce((acc, r) => acc + (r.rating || 5), 0) / newTotal);
        if (onReviewStatsChange) {
          onReviewStatsChange({ totalCount: newTotal, averageRating: Math.round(newAvg * 10) / 10 });
        }

        // Reset form
        setTimeout(() => {
          setIsFormOpen(false);
          setSubmitSuccessMsg('');
          setFormName('');
          setFormEmail('');
          setFormLocation('');
          setFormTitle('');
          setFormComment('');
          setFormImageUrl('');
          setFormRating(5);
        }, 1500);
      } else {
        setSubmitErrorMsg(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error('Submit review error:', err);
      setSubmitErrorMsg('An error occurred. Please check your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeRating = formHoverRating || formRating;

  return (
    <div id="ratings-reviews-section" className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/70 shadow-sm mt-12 font-sans text-charcoal">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          {/* Verified Customer Feedback Pill Badge */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EAF5E9] text-[#2E7D32] border border-green-200/50">
            VERIFIED CUSTOMER FEEDBACK
          </span>
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3D2E] tracking-tight mt-2.5">
            Customer Ratings &amp; Reviews
          </h2>
        </div>

        {/* WRITE A REVIEW Action Button */}
        <div>
          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#0284C7] active:scale-98 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 tracking-wide uppercase cursor-pointer"
          >
            <PenSquare className="w-4 h-4" />
            <span>{isFormOpen ? 'CANCEL REVIEW' : 'WRITE A REVIEW'}</span>
          </button>
        </div>
      </div>

      {/* Ratings & Overview Summary Card */}
      <div className="bg-[#F3F6FA] border border-slate-200/60 rounded-3xl p-6 sm:p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: OVERALL CUSTOMER SCORE */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#4CAF50] mb-2">
              OVERALL CUSTOMER SCORE
            </span>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-serif font-extrabold text-[#0F3D2E] leading-none">
                {displayScore}
              </span>
              <span className="text-lg sm:text-xl font-medium text-slate-400 font-sans">
                / 5.0
              </span>
            </div>

            {/* Stars */}
            <div className="my-2">
              <StarRating rating={exactScore} sizeClass="w-5 h-5" />
            </div>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
              Based on {totalReviews} verified customer review{totalReviews === 1 ? '' : 's'}
            </p>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden md:block md:col-span-1 flex justify-center">
            <div className="h-28 w-px bg-slate-200/90 mx-auto" />
          </div>

          {/* Right Column: Star Breakdown Bars (5 to 1) */}
          <div className="md:col-span-6 space-y-2.5">
            {[5, 4, 3, 2, 1].map((starNum) => {
              const item = distribution[starNum];
              return (
                <div key={starNum} className="flex items-center text-xs sm:text-sm">
                  {/* Star Label */}
                  <div className="flex items-center space-x-1 w-10 text-slate-700 font-semibold">
                    <span>{starNum}</span>
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  </div>

                  {/* Progress Bar Track */}
                  <div className="flex-1 h-2.5 mx-3 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F59E0B] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  {/* Count & Percentage */}
                  <div className="w-20 text-right text-xs text-slate-500 font-medium tracking-tight">
                    {item.count} ({item.percentage}%)
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* RATE & REVIEW FORM CONTAINER matching user reference image */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-10"
          >
            <div className="bg-white border border-blue-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative space-y-6">
              
              {/* Close Icon Button */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form Title Header */}
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F3D2E]">
                  Rate &amp; Review {productName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1">
                  Share your genuine experience with other customers.
                </p>
              </div>

              {/* Status alerts */}
              {submitSuccessMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{submitSuccessMsg}</span>
                </div>
              )}

              {submitErrorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold">
                  {submitErrorMsg}
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-6">
                
                {/* Select Your Rating * Section */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                    Select Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-1 text-[#F59E0B]">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= activeRating;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormRating(star)}
                            onMouseEnter={() => setFormHoverRating(star)}
                            onMouseLeave={() => setFormHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star
                              className={`w-8 h-8 sm:w-9 sm:h-9 ${
                                active ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-slate-200 fill-slate-100'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    {/* Score Badge */}
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/80">
                      {activeRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* 3-Column Input Row: Your Name *, Email Address (Optional), City / Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Your Name * */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Rao"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] outline-none transition-all placeholder:text-slate-400 font-sans"
                    />
                  </div>

                  {/* Email Address (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ananya@gmail.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] outline-none transition-all placeholder:text-slate-400 font-sans"
                    />
                  </div>

                  {/* City / Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, KA"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] outline-none transition-all placeholder:text-slate-400 font-sans"
                    />
                  </div>
                </div>

                {/* Review Headline / Summary * */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Review Headline / Summary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Very comforting taste and easy 1-minute prep!"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] outline-none transition-all placeholder:text-slate-400 font-sans"
                  />
                </div>

                {/* Detailed Review * */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Detailed Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how you prepare it, taste feedback, texture, packaging, or health benefits..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] outline-none transition-all placeholder:text-slate-400 font-sans resize-y"
                  />
                </div>

                {/* SUBMIT RATING & REVIEW Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#0284C7] disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all tracking-wide uppercase cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>SUBMIT RATING &amp; REVIEW</span>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Reviews List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F3D2E]">
            Customer Reviews ({totalReviews})
          </h3>

          {/* Filter Pills */}
          {totalReviews > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400 font-medium mr-1">Filter:</span>
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  filterRating === 'all'
                    ? 'bg-[#0F3D2E] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(star)}
                  className={`px-2.5 py-1 rounded-full font-medium flex items-center gap-1 transition-all ${
                    filterRating === star
                      ? 'bg-[#0F3D2E] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{star}</span>
                  <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-[#0F3D2E] border-t-transparent rounded-full animate-spin" />
            <span>Loading reviews...</span>
          </div>
        ) : filteredReviews.length === 0 ? (
          /* Empty State matching design reference */
          <div className="bg-[#F3F6FA] border border-slate-200/50 rounded-2xl p-8 sm:p-12 text-center">
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              No customer reviews submitted yet for this product. Be the first to rate &amp; review!
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 inline-flex items-center gap-2 bg-[#0084FF] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-[#0284C7] transition-all uppercase tracking-wide"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Write the First Review</span>
            </button>
          </div>
        ) : (
          /* Reviews List */
          <div className="space-y-4">
            {filteredReviews.map((rev) => {
              const reviewDate = rev.created_at
                ? new Date(rev.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Verified Customer';

              const initial = rev.name ? rev.name.charAt(0).toUpperCase() : 'C';
              const currentHelpful = (helpfulCounts[rev.id] || 0);
              const hasVoted = userVoted[rev.id];

              return (
                <div
                  key={rev.id}
                  className="bg-white border border-slate-200/70 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all duration-200 space-y-3"
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle */}
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#0F3D2E] font-bold text-sm flex items-center justify-center border border-emerald-200">
                        {initial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-[#0F3D2E]">
                            {rev.name}
                          </span>
                          {rev.location && (
                            <span className="text-xs text-slate-500 font-normal flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{rev.location}</span>
                            </span>
                          )}
                          {rev.verified !== 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>Verified Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium block">
                          {reviewDate}
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center space-x-0.5 text-[#F59E0B]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating
                              ? 'fill-[#F59E0B] text-[#F59E0B]'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  {rev.title && (
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {rev.title}
                    </h4>
                  )}

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {rev.comment}
                  </p>

                  {/* Customer Image Attachment (if present) */}
                  {rev.images && (
                    <div className="pt-1 flex gap-2 overflow-x-auto">
                      {rev.images.split(',').map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl.trim()}
                          alt="Customer review photo"
                          onClick={() => setActiveLightboxImg(imgUrl.trim())}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {/* Helpful Button */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                    <button
                      onClick={() => handleHelpfulClick(rev.id)}
                      disabled={hasVoted}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        hasVoted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-emerald-700' : ''}`} />
                      <span>{hasVoted ? 'Helpful' : 'Was this helpful?'}</span>
                      {currentHelpful > 0 && <span className="font-bold">({currentHelpful})</span>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox for review images */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2">
            <img src={activeLightboxImg} alt="Review attachment" className="w-full h-full object-contain rounded-xl" />
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
