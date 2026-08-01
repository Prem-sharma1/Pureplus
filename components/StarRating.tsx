import React from 'react';

interface StarRatingProps {
  rating: number;
  sizeClass?: string;
  showNumericBadge?: boolean;
}

export default function StarRating({
  rating,
  sizeClass = 'w-4 h-4',
  showNumericBadge = false,
}: StarRatingProps) {
  const roundedRating = Math.round(rating * 10) / 10;
  const uniqueId = `star-grad-${Math.round(roundedRating * 10)}`;
  const partialPercent = Math.round((roundedRating % 1) * 100);

  return (
    <div className="flex items-center space-x-1.5 select-none">
      {/* SVG LinearGradient Definition for exact partial star filling */}
      <svg width="0" height="0" className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${partialPercent}%`} stopColor="#F59E0B" />
            <stop offset={`${partialPercent}%`} stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((s) => {
          const isFull = s <= Math.floor(roundedRating);
          const isPartial = s === Math.ceil(roundedRating) && roundedRating % 1 !== 0;

          let fillValue = '#F1F5F9'; // Empty background
          let strokeValue = '#CBD5E1'; // Empty border

          if (isFull) {
            fillValue = '#F59E0B';
            strokeValue = '#F59E0B';
          } else if (isPartial) {
            fillValue = `url(#${uniqueId})`;
            strokeValue = '#F59E0B';
          }

          return (
            <svg
              key={s}
              className={`${sizeClass} flex-shrink-0 transition-transform hover:scale-110`}
              viewBox="0 0 24 24"
              fill={fillValue}
              stroke={strokeValue}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </div>

      {showNumericBadge && (
        <span className="text-xs font-black text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full ml-1">
          {roundedRating.toFixed(1)} rating
        </span>
      )}
    </div>
  );
}
