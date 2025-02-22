'use client';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function DeleteModal({ handleDeleteUser }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
    }

    return () => clearInterval(interval);
  }, [isOpen, timer]);

  const handleDeleteClick = () => {
    setShowGoodbyeMessage(true);

    setTimeout(() => {
      handleDeleteUser();
      setIsOpen(false); // Manually close the modal after deletion
    }, 5000);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Delete Profile
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
        {showGoodbyeMessage ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500 text-center">
                We are sad to see you go 😔
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="text-center text-zinc-700 dark:text-zinc-300">
              Your account will be deleted shortly...
            </AlertDialogDescription>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-700 dark:text-zinc-300">
                This action cannot be undone. Your profile and all associated
                data will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              {isDisabled
                ? `Please wait ${timer} seconds...`
                : 'You can proceed now.'}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-600">
                Cancel
              </AlertDialogCancel>
              <Button
                className={`bg-red-500 hover:bg-red-400 text-white ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleDeleteClick}
                disabled={isDisabled}
              >
                {isDisabled ? `Wait ${timer}s` : 'Delete'}
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
