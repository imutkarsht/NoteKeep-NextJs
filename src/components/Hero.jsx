import React from "react";
import Image from "next/image";

const Hero = () => {
   return (
      <div className="flex flex-col  space-x-8 md:flex-row items-center justify-between w-full max-w-[98vw] lg:max-w-[80vw] space-y-10 md:space-y-0 border-b-2 border-zinc-200 dark:border-zinc-800 pb-4 mt-32">
         {/* Text Section */}
         <div className="flex flex-col space-y-4 text-center md:text-left max-w-lg">
            <h1 className="text-5xl font-extrabold text-teal-500 dark:text-teal-400">
               Welcome to Note-Keep
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
               Note-Keep is a simple and intuitive note-taking app designed to
               help you stay organized. Whether you need to jot down quick
               ideas, create to-do lists, or keep important reminders, Note-Keep
               makes it easy. Stay productive by keeping all your important
               thoughts in one place, accessible anytime.
            </p>
            {/* Get Started Button */}
            <button
               className="mt-4 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md 
            hover:bg-teal-600 transition duration-300"
            >
               Get Started
            </button>
         </div>

         {/* Image Section */}
         <Image
            width={550}
            height={450}
            src="/banner.jpg"
            alt="Banner Image"
            className="rounded-lg shadow-lg"
         />
      </div>
   );
};

export default Hero;