'use client';

import { motion } from 'framer-motion';
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

const Shimmer = () => (
  <motion.div
    className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"
    animate={{ opacity: [0.3, 0.6, 1, 0.6, 0.3] }}
    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
  />
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
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/dashboard'}>Dashboard</Link>
          </DropdownMenuItem>
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
