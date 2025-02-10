import { featureData } from '@/util/featureData';
import React from 'react';

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pb-4 border-b-2 border-zinc-200 dark:border-zinc-800 w-[90vw]">
      <h2 className="text-3xl font-bold text-teal-500">Top Features</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureData.map((feature) => (
          <div
            key={feature.index}
            className="flex flex-col items-center p-6 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900  rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 w-85 md:w-72 text-black dark:text-white"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>

            <h3 className="text-xl font-semibold text-center">
              {feature.title}
            </h3>

            <p className="text-center text-sm text-black/80 dark:text-white/80 mt-2">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
