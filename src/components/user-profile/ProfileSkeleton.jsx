import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6 p-6 min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="flex flex-col items-center md:w-[25vw] w-[95vw] h-auto p-6 rounded-lg shadow-lg bg-zinc-200 dark:bg-zinc-800">
        <Skeleton className="w-[150px] dark:bg-zinc-900 h-[150px] rounded-full" />

        <Skeleton className="w-40 h-6 mt-4 rounded-md dark:bg-zinc-900" />

        <div className="flex md:flex-col items-start gap-3 p-4 rounded-lg shadow-md w-full">
          <Badge
            variant="outline"
            className="text-sm border-2 border-teal-500 px-4 py-2"
          >
            Joined Since:{' '}
            <Skeleton className="inline-block w-16 h-5 ml-2 rounded-md dark:bg-zinc-900" />
          </Badge>

          <Badge
            variant="outline"
            className="text-sm border-2 border-teal-500 px-4 py-2"
          >
            Total Notes:{' '}
            <Skeleton className="inline-block w-8 h-5 ml-2 rounded-md dark:bg-zinc-900" />
          </Badge>
        </div>

        <div className="flex items-center justify-start space-x-2 self-start">
          <Skeleton className="w-24 h-10 rounded-md dark:bg-zinc-900" />
          <Skeleton className="w-24 h-10 rounded-md dark:bg-zinc-900" />
        </div>
      </div>

      <div className="md:w-[50vw] w-[95vw] h-auto p-6 rounded-lg shadow-lg bg-zinc-200 dark:bg-zinc-800 space-y-4">
        <Skeleton className="w-32 h-6 rounded-md dark:bg-zinc-900" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-24 h-5 rounded-md dark:bg-zinc-900" />
          <Skeleton className="w-full h-10 rounded-md dark:bg-zinc-900" />
        </div>
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-24 h-5 rounded-md dark:bg-zinc-900" />
          <Skeleton className="w-full h-10 rounded-md dark:bg-zinc-900" />
        </div>
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-24 h-5 rounded-md dark:bg-zinc-900" />
          <Skeleton className="w-full h-10 rounded-md dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
