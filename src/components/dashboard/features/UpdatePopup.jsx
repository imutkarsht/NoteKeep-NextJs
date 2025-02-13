import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function UpdatePopup({ note, onUpdate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags.join(', '));
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      const response = await fetch(`/api/user/notes/update/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Note Updated Successfully');
        onUpdate(data.note);
      } else {
        toast.error('Error updating note: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating note:', error);
      toast.warning('Something went wrong!');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          
          className="rounded-full px-2 text-black hover:text-black hover:bg-teal-400  transition-all shadow-md hover:shadow-lg"
        >
          <Pencil size={22} className="dark:text-white hover:text-white text-black" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-teal-500">Edit Note</DialogTitle>
          <DialogDescription className="text-zinc-700 dark:text-zinc-300">
            Modify the details of your note below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="title"
                className="text-right text-zinc-700 dark:text-zinc-300"
              >
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter note title"
                className="col-span-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="content"
                className="text-right text-zinc-700 dark:text-zinc-300"
              >
                Content
              </Label>
              <textarea
                id="content"
                placeholder="Enter note content"
                className="col-span-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white p-2 rounded-md resize-none"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Tags Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="tags"
                className="text-right text-zinc-700 dark:text-zinc-300"
              >
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="Add tags (e.g., work, personal)"
                className="col-span-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-teal-500 hover:bg-teal-400 text-white"
            >
              Update Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
