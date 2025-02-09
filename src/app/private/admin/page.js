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

  return <div className="mt-24">Admin Panel</div>;
}
