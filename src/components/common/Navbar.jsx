import Link from 'next/link';
import DarkModeToggle from './features/DarkModeToggle';
import { getSession } from '@/lib/getSession';
import { ProfileDropdown } from './features/ProfileDropdown';
import { Hamburger } from './Hamburger';

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className="top-0 left-0 w-full sticky flex items-center justify-between lg:justify-evenly bg-zinc-100/60 dark:bg-zinc-950/70 backdrop-blur-md text-black dark:text-zinc-50 py-4 shadow-md z-50 px-6">
      {/* Mobile Menu (Client-Side) */}
      <Hamburger user={user} />
      <h1 className="text-xl md:text-3xl font-bold">
        <Link href="/">Note Keep</Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex lg:items-center lg:space-x-4">
        <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
          <Link href="/contact">Contact us</Link>
        </li>
        <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
          <Link href="/#feature">Features</Link>
        </li>
        {user && (
          <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>

      {/* Right-side content */}
      <div className="flex items-center space-x-2">
        <DarkModeToggle />
        {user ? (
          <ProfileDropdown />
        ) : (
          <Link href="/login">
            <button className="p-2 text-base md:text-xl bg-teal-500 hover:bg-teal-400 transition-all text-white rounded-md px-4">
              Log in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
