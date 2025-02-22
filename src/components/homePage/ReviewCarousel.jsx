'use client';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { dummyReviews } from '@/config/util/featureData';

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(dummyReviews.length / 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <Carousel
      className="w-full max-w-[screen] md:max-w-7xl px-4 py-2"
      value={currentIndex}
      onChange={setCurrentIndex}
    >
      <CarouselContent>
        {dummyReviews.map((review, index) => (
          <CarouselItem
            key={index}
            className="basis-full sm:basis-1/2 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="flex flex-col items-center bg-gradient-to-b from-zinc-50 min-h-[290px] mb-2 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 text-black dark:text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full border-2 border-white dark:border-black shadow-md"
              />
              <h3 className="text-lg font-semibold mt-3">{review.name}</h3>
              <p className="text-teal-800 text-xl">
                {'⭐'.repeat(review.rating)}
              </p>
              <p className="text-center text-sm text-black/80 dark:text-white/80 mt-2">
                {review.comment}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
