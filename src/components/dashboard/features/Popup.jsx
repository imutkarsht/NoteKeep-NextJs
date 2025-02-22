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
import { useUser } from '@/context/UserContext';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Tiptap from '@/components/tiptap/Tiptap';

export function Popup() {
  const { user, loading } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.id;
    const noteData = {
      title,
      content,
      userId,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      const response = await fetch('/api/user/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Note Created Successfully');
        setTitle('');
        setContent('');
        setTags('');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error('Error creating note: ' + data.errors[0].message);
      }
    } catch (error) {
      console.error('Error creating note:', error);
      toast.warning('Something went wrong!');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-teal-500 flex space-x-2 items-center hover:bg-teal-500 text-white"
        >
          <FaPlus />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[60vw] md:min-h-[60vh] min-h-[80vh] bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
        <DialogHeader className="hidden">
          <DialogTitle className="text-teal-500">Create Note</DialogTitle>
          <DialogDescription className="text-zinc-700 dark:text-zinc-300">
            Enter the details of your note below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between gap-2 flex-wrap ">
              <div className='flex space-x-2 flex-wrap gap-2'>
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
              <Button
                type="submit"
                className="bg-teal-500 md:w-fit w-full hover:bg-teal-400 text-dark dark:text-white"
              >
                Save Note
              </Button>
            </div>
            <div>
              <Tiptap setContent={setContent} />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
