'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext';
import Sidebar from '@/components/dashboard/Sidebar';
import NotesGrid from '@/components/dashboard/NotesGrid';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading,fetchingLoggedUser,loggedUser } = useUser();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  useEffect(() => {
    if(!fetchingLoggedUser && loggedUser?.isVerified === false){
      redirect('user/verify')
    }
  })


  useEffect(() => {
    if (user) {
      getAllNotes();
    }
  }, [user]);

  // Live search
  useEffect(() => {
    if (!search) {
      setNotes(allNotes);
    } else {
      const searchQuery = search.toLowerCase();
      const filteredNotes = allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery) ||
          note.content.toLowerCase().includes(searchQuery)
      );
      setNotes(filteredNotes);
    }
  }, [search, allNotes]);

  const handleUpdatedNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/delete/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        toast.success('Note deleted successfully');
        setNotes((prev) => prev.filter((note) => note._id !== id));
        setAllNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Error deleting note');
    }
  };

  const getAllNotes = async () => {
    try {
      setIsLoading(true);
      const userId = user?.id;
      const response = await fetch(`/api/notes/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (response.ok) {
        setNotes(data.notes);
        setAllNotes(data.notes);
      } else {
        toast.error('Error Fetching notes: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.warning('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 mt-16 dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-3xl text-teal-500 font-semibold">
            All Notes
          </h2>
          <Input
            type="text"
            placeholder="Search notes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-[20vw] max-w-[40vw] rounded-md placeholder:text-sm md:placeholder:text-base bg-zinc-200 dark:bg-zinc-800 focus:ring-none focus:border-none outline-none dark:focus:bg-zinc-900 focus-visible:ring-teal-400 focus:bg-zinc-100"
          />
        </div>
        <NotesGrid
          notes={notes}
          isLoading={isLoading}
          handleUpdatedNote={handleUpdatedNote}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
