'use client';
import { InsightCard } from '@/components/admin/InsightCard';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const { loggedUser, fetchLoggedUser } = useUser();
  const router = useRouter();
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    if (!fetchLoggedUser && !loggedUser) {
      router.push('/login');
      return;
    }
    if (loggedUser?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/admin/insights');
        if (!response.ok) throw new Error('Failed to fetch insights');
        const data = await response.json();
        setInsights(data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };

    fetchInsights();
  }, [loggedUser, fetchLoggedUser]);

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-xl font-semibold text-start">
        Welcome Admin,{' '}
        <span className="font-bold capitalize text-2xl text-teal-500">
          {loggedUser ? loggedUser?.name.split(' ')[0] : 'User'}
        </span>
      </h1>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {insights ? (
          <>
            <InsightCard title="Total Notes" count={insights.notes} href={'/notes'} />
            <InsightCard title="Total Users" count={insights.accounts} href={'/users'} />
            <InsightCard title="Total Reviews" count={insights.reviews} href={'/reviews'} />
            <InsightCard title="Total Bugs" count={insights.bugs} href={'/reviews'} />
          </>
        ) : (
          <p className="text-gray-500">Loading insights...</p>
        )}
      </div>
    </div>
  );
}

