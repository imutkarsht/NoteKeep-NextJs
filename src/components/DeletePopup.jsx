import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function DeletePopup({ note, onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-md"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-700 dark:text-zinc-300">
            This action cannot be undone. This will permanently delete your
            note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 text-white"
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
