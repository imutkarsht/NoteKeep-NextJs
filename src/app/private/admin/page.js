'use client';
import { useUser } from '@/context/UserContext';
import { redirect } from 'next/navigation';

export default function AdminPanel() {
  const { loggedUser } = useUser();

  if (!loggedUser) {
    redirect('/login');
  }

  if (loggedUser?.role !== 'admin') {
    redirect('/dashboard');
  }

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
