"use client";
import React, { useState } from "react";

const CreateNote = () => {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [tags, setTags] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      const noteData = {
         title,
         content,
         tags: tags.split(",").map((tag) => tag.trim()), 
      };

      try {
         const response = await fetch("/api/create", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(noteData),
         });

         const data = await response.json();

         if (response.ok) {
            alert("Note created successfully!");
            console.log(data);
         } else {
            alert("Error creating note: " + data.message);
         }
      } catch (error) {
         console.error("Error creating note:", error);
         alert("Something went wrong!");
      }
   };

   return (
      <div className="mt-32">
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label htmlFor="title" className="block">
                  Title
               </label>
               <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="content" className="block">
                  Content
               </label>
               <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <div>
               <label htmlFor="tags" className="block">
                  Tags (comma-separated)
               </label>
               <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
               />
            </div>
            <button
               type="submit"
               className="bg-yellow-500 text-white p-2 rounded mt-4"
            >
               Create Note
            </button>
         </form>
      </div>
   );
};
export default CreateNote;
