import { Link2Off } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[73vh] bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 text-black text-center px-4">
      <Link2Off className="text-teal-500 mb-4" size={85} />

      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        Oops! Page Not Found
      </h2>

      <p className="text-lg md:text-xl mb-6">
        Looks like you've hit a broken link. Let's get you back on track!
      </p>

      <Link
        href="/"
        className="text-teal-500 text-lg md:text-xl font-semibold hover:underline"
      >
        ⬅ Return to Safety
      </Link>
    </div>
  );
}
