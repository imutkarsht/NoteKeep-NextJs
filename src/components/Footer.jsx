import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
const Footer = () => {
   return (
      <div className="mt-auto py-8 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
         <div className="max-w-7xl mx-auto px-6">
            {/* Footer Content */}
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
               {/* App Info */}
               <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-teal-500">
                     Note Keep
                  </h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-zinc-400">
                     A simple, intuitive note-taking app to help you stay
                     organized and productive.
                  </p>
               </div>

               {/* Quick Links */}
               <div className="flex space-x-6 mt-4 sm:mt-0">
                  <Link
                     href="/about"
                     className="hover:text-teal-500 transition-all"
                  >
                     About
                  </Link>
                  <Link
                     href="/features"
                     className="hover:text-teal-500 transition-all"
                  >
                     Features
                  </Link>
                  <Link
                     href="/contact"
                     className="hover:text-teal-500 transition-all"
                  >
                     Contact
                  </Link>
                  <Link
                     href="/privacy"
                     className="hover:text-teal-500 transition-all"
                  >
                     Privacy
                  </Link>
               </div>

               {/* Social Icons */}
               <div className="flex space-x-4 mt-4 sm:mt-0">
                  <a
                     href="#"
                     className="text-xl text-zinc-900 hover:text-teal-500 dark:text-zinc-50 dark:hover:text-teal-500"
                  >
                     <FaFacebook />
                  </a>
                  <a
                     href="#"
                     className="text-xl text-zinc-900 hover:text-teal-500 dark:text-zinc-50 dark:hover:text-teal-500"
                  >
                     <FaTwitter />
                  </a>
                  <a
                     href="#"
                     className="text-xl text-zinc-900 hover:text-teal-500 dark:text-zinc-50 dark:hover:text-teal-500"
                  >
                     <FaLinkedin />
                  </a>
                  <a
                     href="#"
                     className="text-xl text-zinc-900 hover:text-teal-500 dark:text-zinc-50 dark:hover:text-teal-500"
                  >
                     <FaGithub />
                  </a>
               </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t border-zinc-300 dark:border-zinc-700 pt-4 text-center">
               <p className="text-sm text-black/70 dark:text-zinc-400">
                  &copy; {new Date().getFullYear()} Note Keep. All Rights
                  Reserved.
               </p>
            </div>
         </div>
      </div>
   );
};

export default Footer;
