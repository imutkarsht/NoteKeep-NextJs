import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export function Hamburger({ user }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="lg:hidden block">
          <Menu className="size-9" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className='hidden'>
          <SheetHeader>
            <SheetTitle>Nav Menus</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Nav menu to be visible on smaller screeen
          </SheetDescription>
        </div>
        <ul className="w-screen flex flex-col space-y-4 p-4">
          <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
            <Link href="/">
              <SheetClose>Home</SheetClose>
            </Link>
          </li>
          <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
            <Link href="/about">
              <SheetClose>About</SheetClose>
            </Link>
          </li>
          <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
            <Link href="/contact">
              <SheetClose>Contact Us</SheetClose>
            </Link>
          </li>
          <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
            <Link href="/#feature">
              <SheetClose>Features</SheetClose>
            </Link>
          </li>
          {user && (
            <li className="hover:text-teal-700 dark:hover:text-teal-400 transition-all text-xl">
              <Link href="/dashboard">
                <SheetClose>Dashboard</SheetClose>
              </Link>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
