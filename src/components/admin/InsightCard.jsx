import Link from 'next/link';

export const InsightCard = ({ title, count, href }) => (
  <Link href={`/private/admin/${href}`}>
    <div className="p-4 flex flex-col space-y-2 items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-md">
      <h2 className="text-lg md:text-lg font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </h2>
      <p className="text-5xl font-bold text-teal-500">{count}</p>
    </div>
  </Link>
);
