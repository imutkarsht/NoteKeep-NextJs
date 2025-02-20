'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BreadCrumbCustom from '@/components/ui/BreadCrumbCustom';
import { Button } from '@/components/ui/button';
import ProfileSkeleton from '@/components/user-profile/ProfileSkeleton';
import { UploadPopup } from '@/components/user-profile/UploadPopup';
import YourDetails from '@/components/user-profile/YourDetails';
import { useUser } from '@/context/UserContext';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { loggedUser, user, loading, fetchingLoggedUser } = useUser();
  const [isClicked, setIsClicked] = useState(false);
  if (!loading && !user) redirect('/');

  const handleEditProfile = () => {
    setIsClicked(!isClicked);
  };

  return fetchingLoggedUser ? (
    <ProfileSkeleton />
  ) : (
    <div className="flex flex-col gap-4 p-6 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <BreadCrumbCustom
        items={[{ text: 'Home', href: '/' }, { text: 'Profile' }]}
      />

      <div className="flex flex-wrap items-start justify-center gap-6">
        <div className="flex flex-col relative flex-wrap gap-6 items-center lg:w-[25vw] w-[95vw] h-auto p-6 rounded-lg shadow-lg bg-zinc-200 dark:bg-zinc-800">
          <div className="relative flex items-center justify-center">
            <Avatar className="rounded-full w-40 h-40 border-4 border-teal-500">
              <AvatarImage
                src={loggedUser?.avatar}
                alt="User-profile-image"
                className="object-cover"
              />
              <AvatarFallback className="text-5xl">
                {loggedUser?.name?.split(' ').map((l) => l[0])}
              </AvatarFallback>
            </Avatar>

            <div className="absolute bottom-2 right-2 bg-teal-500 p-2 rounded-full shadow-md hover:bg-teal-400 transition">
              <UploadPopup user={loggedUser} />
            </div>
          </div>

          <h3 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
            {loggedUser?.name}
          </h3>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-teal-500 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Joined Since
              </h3>
              <p className="text-lg font-semibold">{loggedUser?.createdAt}</p>
            </div>

            <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-teal-500 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Total Notes
              </h3>
              <p className="text-lg font-semibold">
                {loggedUser?.totalNotes ?? 0}
              </p>
            </div>
          </div>

          <div className="flex items-center w-full justify-between space-x-4">
            <Button
              className="bg-teal-500 hover:bg-teal-400 w-full"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              className="w-full"
              onClick={() => toast.info('Coming soon')}
              variant="destructive"
            >
              Delete Profile
            </Button>
          </div>
        </div>

        <YourDetails user={loggedUser} isClicked={isClicked} />
      </div>
    </div>
  );
};

export default UserProfile;
