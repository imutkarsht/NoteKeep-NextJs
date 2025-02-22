import TiptapUpdate from '@/components/tiptap/TiptapUpdate';
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
        <button className="rounded-full px-2 text-black hover:text-black hover:bg-teal-400  transition-all shadow-md hover:shadow-lg">
          <Pencil
            size={22}
            className="dark:text-white hover:text-white text-black"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[60vw] md:min-h-[60vh] min-h-[80vh] bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
        <DialogHeader className="hidden">
          <DialogTitle className="text-teal-500">Edit Note</DialogTitle>
          <DialogDescription className="text-zinc-700 dark:text-zinc-300">
            Modify the details of your note below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex space-x-2 flex-wrap gap-2">
                {/* Title Field */}
                <div className="items-center md:w-fit w-full flex gap-4">
                  <Label
                    htmlFor="title"
                    className="text-right text-zinc-700 dark:text-zinc-300"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter note title"
                    className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Tags Field */}
                <div className="items-center flex md:w-fit w-full gap-4">
                  <Label
                    htmlFor="tags"
                    className="text-right text-zinc-700 dark:text-zinc-300"
                  >
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    placeholder="Add tags (e.g., work, personal)"
                    className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </div>

              {/* Update Button */}
              <Button
                type="submit"
                className="bg-teal-500 md:w-fit w-full hover:bg-teal-400 text-dark dark:text-white"
              >
                Update Note
              </Button>
            </div>

            {/* Tiptap Editor */}
            <div>
              <TiptapUpdate content={content} setContent={setContent} />
            </div>
          </div>

          <DialogFooter></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
