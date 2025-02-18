'use client';
import { Badge } from '@/components/ui/badge';
import BreadCrumbCustom from '@/components/ui/BreadCrumbCustom';
import { Button } from '@/components/ui/button';
import ProfileSkeleton from '@/components/user-profile/ProfileSkeleton';
import YourDetails from '@/components/user-profile/YourDetails';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { loggedUser, fetchingLoggedUser } = useUser();
  return fetchingLoggedUser ? (
    <ProfileSkeleton />
  ) : (
    <div className="flex flex-col gap-4 p-6 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <BreadCrumbCustom
        items={[{ text: 'Home', href: '/' }, { text: 'Profile' }]}
      />

      <div className="flex flex-wrap items-start justify-center gap-6">
        <div className="flex flex-col flex-wrap gap-6 items-center md:w-[25vw] w-[95vw] h-auto p-6 rounded-lg shadow-lg bg-zinc-200 dark:bg-zinc-800">
          <Image
            src={'https://avatar.iran.liara.run/public'}
            alt="User-profile-image"
            width={150}
            height={150}
            className="rounded-full"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
          />

          <h3 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
            {loggedUser?.name}
          </h3>

          <div className="flex md:flex-col items-start gap-3 p-4 rounded-lg shadow-md w-full">
            <Badge
              variant="outline"
              className="text-sm border-2 border-teal-500 px-4 py-2"
            >
              Joined Since:
              <span className="font-medium ml-2">{loggedUser?.createdAt}</span>
            </Badge>

            <Badge
              variant="outline"
              className="text-sm border-2 border-teal-500 px-4 py-2"
            >
              Total Notes: <span className="font-medium ml-2">{loggedUser?.totalNotes??0}</span>
            </Badge>
          </div>
          <div className="flex items-center self-start justify-start space-x-2">
            <Button className="mt-4 bg-teal-500 hover:bg-teal-400" onClick={() => toast.info('coming soon')}>
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
        <YourDetails user={loggedUser} />
      </div>
    </div>
  );
};

export default UserProfile;
