"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Popup } from "@/components/Popup";
import { toast } from "react-toastify";
import { UpdatePopup } from "@/components/UpdatePopup";
import { DeletePopup } from "@/components/DeletePopup";

const Dashboard = () => {
   const [notes, setNotes] = useState([]);

   useEffect(() => {
      getAllNotes();
   }, []);

   const handleUpdatedNote = (updatedNote) => {
      setNotes((prevNotes) =>
         prevNotes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
         )
      );
   };

   const handleDelete = async (id) => {
      try {
         const res = await fetch(`/api/delete/${id}`, { method: "DELETE" });
         const data = await res.json();

         if (res.ok) {
            toast.success("Note deleted successfully");
            setNotes(notes.filter((note) => note._id !== id));
         } else {
            toast.error(data.message || "Failed to delete note");
         }
      } catch (error) {
         console.error("Error deleting note:", error);
         toast.error("Error deleting note");
      }
   };

   const getAllNotes = async () => {
      try {
         const response = await fetch("/api/notes", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });

         const data = await response.json();

         if (response.ok) {
            setNotes(data.notes);
         } else {
            toast.error("Error Fetching notes: " + data.message);
         }
      } catch (error) {
         console.error("Error fetching notes:", error);
         toast.warning("Something went wrong!");
      }
   };

   return (
      <div className="flex min-h-screen bg-zinc-100 mt-16 dark:bg-zinc-900">
         {/* Sidebar */}
         <div className="w-60 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center">Note Keep</h1>
            <ul className="space-y-4">
               <Popup />
               <li className="cursor-pointer hover:bg-teal-600 dark:hover:bg-teal-500 p-2 rounded">
                  <Link href="/dashboard">View Notes</Link>
               </li>
               <li className="cursor-pointer hover:bg-teal-600 dark:hover:bg-teal-500 p-2 rounded">
                  <Link href="/dashboard/bin">Bin</Link>
               </li>
               <li className="cursor-pointer hover:bg-teal-600 dark:hover:bg-teal-500 p-2 rounded">
                  <Link href="/dashboard/search">Search Notes</Link>
               </li>
            </ul>
            <div>
               <h2 className="text-lg font-semibold">Filter by Tag</h2>
               <select className="w-full p-2 mt-2 bg-teal-600 rounded">
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
               <h2 className="text-3xl text-teal-500 font-semibold">
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
               {notes.length > 0 ? (
                  notes.map((note) => (
                     <div
                        key={note._id}
                        className="relative p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
                     >
                        <div className="absolute top-2 right-2 flex space-x-2">
                           <UpdatePopup
                              note={note}
                              onUpdate={handleUpdatedNote}
                           />
                           <DeletePopup
                              note={note}
                              onDelete={() => handleDelete(note._id)}
                           />
                        </div>

                        <h3 className="text-2xl font-semibold text-teal-500">
                           {note.title}
                        </h3>
                        <p className="text-sm text-black dark:text-white mt-2">
                           {note.content.length > 100
                              ? `${note.content.substring(0, 100)}...`
                              : note.content}
                        </p>

                        <div className="mt-4 flex flex-wrap space-x-2">
                           {note.tags.map((tag, index) => (
                              <span
                                 key={index}
                                 className="text-xs bg-teal-100 text-teal-600 py-1 px-3 rounded-full"
                              >
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </div>
                  ))
               ) : (
                  <p className="text-xl text-teal-500">No notes available</p>
               )}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
