'use client';
import NoteTable from '@/components/admin/NoteTable';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/admin/all-notes');
        if (!response.ok) throw new Error('Failed to fetch notes');
        const data = await response.json();
        if (data.success && data.notes) {
          setNotes(data.notes);
        } else {
          throw new Error('Invalid Response Format');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className=" transition-all duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-teal-500 dark:text-teal-400">
        Manage Notes
      </h1>

      {loading ? (
        <div className="text-teal-600 dark:text-teal-300 text-lg">
          Loading notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          No notes found.
        </div>
      ) : (
        <NoteTable notes={notes} />
      )}
    </div>
  );
};

export default ManageNotes;
