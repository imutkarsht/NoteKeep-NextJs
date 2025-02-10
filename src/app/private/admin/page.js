'use client';
import { useUser } from '@/context/UserContext';
import {  useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPanel() {
  const { loggedUser, fetchLoggedUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!fetchLoggedUser && !loggedUser) {
      router.push('/login');
    }
    if (loggedUser?.role !== 'admin') {
     router.push('/dashboard');
    }
    else{
      router.push('/private/admin')
    }
  }, [loggedUser, fetchLoggedUser]);

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-xl font-semibold text-start">
        Welcome Admin,{' '}
        <span className="font-bold capitalize text-2xl text-teal-500">
          {loggedUser ? loggedUser?.name.split(' ')[0] : 'User'}
        </span>
      </h1>
    </div>
  );
}
