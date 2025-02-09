'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext';
import Sidebar from '@/components/dashboard/Sidebar';
import NotesGrid from '@/components/dashboard/NotesGrid';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  if (!user) {redirect('/login');}

  useEffect(() => {
    if (user) {
      getAllNotes();
    }
  }, [user]);

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
        setNotes(notes.filter((note) => note._id !== id));
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
          <h2 className="text-3xl text-teal-500 font-semibold">All Notes</h2>
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
