'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Send, Star } from 'lucide-react';
import { toast } from 'react-toastify';

const Feedback = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);

  const handleSubmitReview = async () => {
    if (!user) {
      return toast.error('You must be logged in to submit a review.');
    }
    if (rating < 1 || rating > 5) {
      return toast.error('Please select a rating between 1 and 5 stars.');
    }
    if (!review.trim()) {
      return toast.error('Review cannot be empty.');
    }

    setLoadingReview(true);
    try {
      const res = await fetch('/api/user/send-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewBy: user?.id,
          stars: rating,
          review,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review');

      toast.success('Review submitted successfully!');
      setRating(0);
      setReview('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingReview(false);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-teal-500 flex items-center gap-2">
        <Star size={22} />
        Share Your Feedback
      </h2>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={28}
            className={`cursor-pointer transition ${
              rating >= star
                ? 'text-teal-500'
                : 'text-zinc-400 dark:text-zinc-600'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-md resize-none"
        rows="4"
        placeholder="Write a detailed review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button
        className="w-full bg-teal-500 hover:bg-teal-400 text-white flex items-center gap-2"
        onClick={handleSubmitReview}
        disabled={loadingReview}
      >
        <Send size={18} />
        {loadingReview ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </div>
  );
};

export default Feedback;