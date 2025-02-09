import Features from '@/components/homePage/Features';
import Hero from '@/components/homePage/Hero';
import Reviews from '@/components/homePage/Reviews';
import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center space-y-8 flex-col bg-zinc-50 dark:bg-zinc-900 min-h-screen px-6">
      <Hero />
      <Features />
      <Reviews />
    </div>
  );
};

export default Home;
