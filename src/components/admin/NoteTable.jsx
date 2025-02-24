import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const NoteTable = ({ notes }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden">
        <TableHeader className="bg-zinc-200 dark:bg-zinc-800 text-teal-700 dark:text-teal-300">
          <TableRow>
            <TableHead className="p-3 text-left">Title</TableHead>
            <TableHead className="p-3 text-left">Content</TableHead>
            <TableHead className="p-3 text-left">Tags</TableHead>
            <TableHead className="p-3 text-left">Created By</TableHead>
            <TableHead className="p-3 text-left">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow
              key={note._id}
              className="border-b border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <TableCell className="p-3">{note.title}</TableCell>
              <TableCell
                className="p-3 text-gray-800 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: note.content }}
              ></TableCell>
              <TableCell className="p-3">{note.tags.join(', ')}</TableCell>
              <TableCell className="p-3">
                {note.createdBy ? (
                  <div>
                    <span className="font-semibold">
                      {note.createdBy.firstName} {note.createdBy.lastName}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {note.createdBy.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    Unknown
                  </span>
                )}
              </TableCell>
              <TableCell className="p-3">
                {new Date(note.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NoteTable;
