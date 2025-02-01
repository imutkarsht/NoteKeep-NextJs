import Link from "next/link";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
   return (
      <nav className="fixed top-0 left-0 w-full flex items-center justify-evenly bg-zinc-100 dark:bg-zinc-900 text-black dark:text-zinc-50 py-4 shadow-lg border-b-2 border-zinc-200 dark:border-zinc-800 z-50">
         <h1 className="text-3xl font-bold">
            <Link href={"/"}>Note Keep</Link>
         </h1>
         <ul className="flex items-center space-x-4">
            <li className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-all delay-150 ease-in-out text-xl">
               <Link href={"/about"}>About</Link>
            </li>
            <li className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-all delay-150 ease-in-out text-xl">
               <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-all delay-150 ease-in-out text-xl">
               <Link href={"/contact"}>Contact us</Link>
            </li>
            <li className="hover:text-yellow-700 dark:hover:text-yellow-400 transition-all delay-150 ease-in-out text-xl">
               <Link href={"/features"}>Features</Link>
            </li>
         </ul>
         <div className="flex space-x-2 items-center">
            <div>
               <DarkModeToggle className="ml-auto" />
            </div>
            <Link href={"/login"}>
               <button className="p-2 text-xl bg-yellow-500 hover:bg-yellow-400 transition-all delay-150 ease-out text-white rounded-md px-4 ">
                  Log in
               </button>
            </Link>
         </div>
      </nav>
   );
};

export default Navbar;
