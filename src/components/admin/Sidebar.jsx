'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, PanelLeftClose, PanelRightClose } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed block md:hidden bottom-4 left-2 z-50 p-2 bg-teal-500 text-white rounded-lg shadow-lg focus:outline-none"
      >
        {isOpen ? <PanelLeftClose size={30} /> : <PanelRightClose size={30} />}
      </button>

      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed md:relative top-14 md:top-0 left-0 h-[93vh] w-60 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white p-2 py-6 space-y-6 z-40 shadow-lg md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block h-full md:h-auto`}
      >
        <div className="flex items-center justify-start space-x-4 border-b-2 border-zinc-200 pb-3">
          <Link href="/private/admin">
            <Lock size={28} className="text-teal-500" />
          </Link>
          <h1 className="text-xl font-semibold text-start">Admin Panel</h1>
        </div>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white p-2 rounded">
            <Link href="/private/admin/users">Users</Link>
          </li>
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white p-2 rounded">
            <Link href="/private/admin/notes">Notes</Link>
          </li>
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white p-2 rounded">
            <Link href="/private/admin/reviews">Reviews</Link>
          </li>
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white p-2 rounded">
            <Link href="/private/admin">Insights</Link>
          </li>
        </ul>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
