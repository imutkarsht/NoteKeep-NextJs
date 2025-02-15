'use client'
import React from 'react';
import { ReviewCarousel } from './ReviewCarousel';

const Reviews = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 pb-8 border-b-2 border-zinc-200 dark:border-zinc-800 w-[80vw]">
      <h2 className="text-3xl font-bold text-teal-500">Reviews</h2>

      <ReviewCarousel />
    </div>
  );
};

export default Reviews;
