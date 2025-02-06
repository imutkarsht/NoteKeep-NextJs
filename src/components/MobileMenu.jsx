'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lg:hidden relative">
      {/* Hamburger Icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-black dark:text-zinc-50 focus:outline-none"
      >
        <div className="w-6 h-6 fill-current">
          {menuOpen ? <X /> : <Menu />}
        </div>
      </button>

      {/* Animated Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-16 left-0 w-screen bg-zinc-100 dark:bg-zinc-900 flex flex-col space-y-4 p-4 shadow-md"
          >
            <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
              <Link href="/contact">Contact us</Link>
            </li>
            <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
              <Link href="/features">Features</Link>
            </li>
            {user && (
              <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
