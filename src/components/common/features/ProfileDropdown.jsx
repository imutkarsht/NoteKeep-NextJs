'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Skeleton } from '@/components/ui/skeleton';

const Shimmer = () => (
  <Skeleton className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
);

export function ProfileDropdown() {
  const { loggedUser, fetchingLoggedUser } = useUser();

  const handleLogOut = () => {
    toast.success('Logged out successfully');
    setTimeout(() => {
      signOut({ callbackUrl: '/' });
    }, 1000);
  };

  if (fetchingLoggedUser) {
    return (
      <div className="flex items-center justify-center">
        <Shimmer />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={loggedUser?.avatar || ''} alt="user profile" />
          <AvatarFallback>
            {loggedUser?.name
              ? loggedUser.name
                  .split(' ')
                  .map((n) => n[0].toUpperCase())
                  .join('')
              : 'U'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-zinc-900 bg-zinc-200 flex flex-col space-y-2 p-2 rounded-lg shadow-lg">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/dashboard'}>Dashboard</Link>
          </DropdownMenuItem>
          {loggedUser?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/private/admin">Admin Panel</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
            <Link href={'/user/profile'}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
