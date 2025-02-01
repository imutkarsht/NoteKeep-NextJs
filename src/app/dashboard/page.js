"use client";
import React from "react";
import Link from "next/link";
import { Popup } from "@/components/Popup";

const Dashboard = () => {
   return (
      <div className="flex min-h-screen bg-zinc-100 mt-16 dark:bg-zinc-900">
         {/* Sidebar */}
         <div className="w-60 bg-zinc-200 dark:bg-zinc-800  text-black dark:text-white p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center">Note Keep</h1>
            <ul className="space-y-4">
               <Popup />

               <li className="cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-500 p-2 rounded">
                  <Link href="/dashboard">View Notes</Link>
               </li>
               <li className="cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-500 p-2 rounded">
                  <Link href="/dashboard/bin">Bin</Link>
               </li>
               <li className="cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-500 p-2 rounded">
                  <Link href="/dashboard/search">Search Notes</Link>
               </li>
            </ul>
            <div>
               <h2 className="text-lg font-semibold">Filter by Tag</h2>
               <select className="w-full p-2 mt-2 bg-yellow-600 rounded">
                  <option value="">All Tags</option>
                  {["work", "study", "personal", "urgent", "important"].map(
                     (tag) => (
                        <option key={tag} value={tag}>
                           {tag}
                        </option>
                     )
                  )}
               </select>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-3xl text-yellow-500 font-semibold">
                  All Notes
               </h2>
               <div className="w-1/4">
                  <input
                     type="text"
                     placeholder="Search notes..."
                     className="w-full p-2 bg-zinc-200 dark:bg-zinc-800 rounded-md"
                  />
               </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Mock Note Card */}
               <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-yellow-500">
                     Note Title
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                     This is a short description of the note content.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                     <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm">
                        work
                     </span>
                     <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm">
                        urgent
                     </span>
                  </div>
               </div>

               {/* Repeat the note card for multiple notes */}
               <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-yellow-500">
                     Another Note
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                     This is a short description of the second note.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                     <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm">
                        study
                     </span>
                     <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm">
                        important
                     </span>
                  </div>
               </div>

               {/* More Note Cards */}
               <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-yellow-500">
                     Yet Another Note
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                     This is a short description of another note.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                     <span className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm">
                        personal
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
