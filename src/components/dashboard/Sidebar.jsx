'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Popup } from '@/components/dashboard/features/Popup';
import { motion } from 'framer-motion';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { loggedUser } = useUser();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-2 z-50 p-2 bg-teal-500 text-white rounded-lg shadow-lg focus:outline-none"
      >
        {isOpen ? <PanelLeftClose size={30} /> : <PanelRightClose size={30} />}
      </button>

      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed md:relative top-14 md:top-0 left-0 h-full md:h-auto w-60 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white p-2 py-6 space-y-6 z-40 shadow-lg md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <h1 className="text-xl font-semibold text-start">
          Welcome, <span className='font-bold capitalize text-2xl text-teal-500'>{loggedUser ? loggedUser?.name.split(" ")[0] : 'user'}</span>
        </h1>
        <ul className="space-y-4">
          <Popup />
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white  p-2 rounded">
            <Link href="/dashboard">View Notes</Link>
          </li>
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white  p-2 rounded">
            <Link href="#">Bin</Link>
          </li>
          <li className="cursor-pointer hover:bg-teal-500 hover:text-white  p-2 rounded">
            <Link href="#">Search Notes</Link>
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
