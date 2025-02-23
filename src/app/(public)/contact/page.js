"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Feedback from "@/components/contact-us/Feedback";
import BugReport from "@/components/contact-us/BugReport";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { redirect } from "next/navigation";

export default function Contact() {
  const { user,loading } = useUser();
  
  const [selectedOption, setSelectedOption] = useState("review");

  if(!user && !loading) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-500">Contact Us</h1>
          <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 mt-2">
            Your feedback helps us improve! Let us know your thoughts or report any issues.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="w-full md:w-1/4">
            <Select onValueChange={setSelectedOption} defaultValue="review">
              <SelectTrigger className="w-full text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-700 border-none shadow-md focus:ring-2 focus:ring-teal-400">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-200 dark:bg-zinc-800">
                <SelectItem value="review">Write a Review</SelectItem>
                <SelectItem value="bug">Report a Bug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-3/4 bg-white/10 dark:bg-zinc-800/70 backdrop-blur-md shadow-lg rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
            <div className="animate-fade-in transition-all duration-300 ease-in-out">
              {selectedOption === "review" ? <Feedback user={user} /> : <BugReport user={user} />}
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}
