import React from "react";
import { dummyReviews } from "@/util/featureData";

const Reviews = () => {
   return (
      <div className="flex flex-col items-center justify-center space-y-8 pb-8 border-b-2 border-zinc-200 dark:border-zinc-800 w-[80vw]">
         <h2 className="text-3xl font-bold text-teal-500">Reviews</h2>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyReviews.map((review, index) => (
               <div 
                  key={index} 
                  className="flex flex-col items-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 text-black dark:text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 max-w-xs"
               >
                  <img 
                     src={review.avatar} 
                     alt={review.name} 
                     className="w-16 h-16 rounded-full border-2 border-white dark:border-black shadow-md"
                  />

                  <h3 className="text-lg font-semibold mt-3">{review.name}</h3>

                  <p className="text-teal-800 text-xl">{'⭐'.repeat(review.rating)}</p>

                  <p className="text-center text-sm text-black/80 dark:text-white/80 mt-2">{review.comment}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Reviews;
