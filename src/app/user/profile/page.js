'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import BreadCrumbCustom from '@/components/ui/BreadCrumbCustom';
import { Button } from '@/components/ui/button';
import ProfileSkeleton from '@/components/user-profile/ProfileSkeleton';
import YourDetails from '@/components/user-profile/YourDetails';
import { useUser } from '@/context/UserContext';
import { CameraIcon } from 'lucide-react';
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
          <Avatar className="relative rounded-full w-40 h-40 border-4 border-teal-500">
            <AvatarImage
              src={loggedUser?.avatar}
              alt="User-profile-image"
              className="object-cover"
            />
            <AvatarFallback className="text-5xl">
              {loggedUser?.name.split(' ').map((l) => l[0])}
            </AvatarFallback>
          </Avatar>

          <button
            onClick={() => toast.info('In development')}
            className="absolute top-36 left-[45%] z-50 bg-teal-500 rounded-full p-2"
          >
            <CameraIcon size={32} />
          </button>

          <h3 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
            {loggedUser?.name}
          </h3>

          <div className="flex items-start gap-3 p-4 self-start w-full">
            <Badge
              variant="outline"
              className="text-xs border-2 border-teal-500 px-4 py-2"
            >
              Joined Since:
              <span className="font-medium ml-2">{loggedUser?.createdAt}</span>
            </Badge>

            <Badge
              variant="outline"
              className="text-xs border-2 border-teal-500 px-4 py-2"
            >
              Total Notes:{' '}
              <span className="font-medium ml-2">
                {loggedUser?.totalNotes ?? 0}
              </span>
            </Badge>
          </div>
          <div className="flex items-center self-start justify-start space-x-2">
            <Button
              className="mt-4 bg-teal-500 hover:bg-teal-400"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              className="mt-4"
              onClick={() => toast.info('coming soon')}
              variant="destructive"
            >
              delete Profile
            </Button>
          </div>
        </div>
        <YourDetails user={loggedUser} isClicked={isClicked} />
      </div>
    </div>
  );
};

export default UserProfile;
