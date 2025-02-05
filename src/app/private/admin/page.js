import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function AdminPanel() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect('/login');
  }

  if (user?.role !== 'admin') {
    redirect('/dashboard');
  }

  return <div className='mt-24'>Admin Panel</div>;
}
