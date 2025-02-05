import { register } from '@/actions/user';
import { signIn } from '@/auth';
import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default async function SignUpPage() {
  const handleGitHubSignin = async () => {
    'use server';
    await signIn('github');
  };

  const handleGoogleSignin = async () => {
    'use server';
    await signIn('google');
  };

  const session = await getSession();
  const user = session?.user;
  if (user) redirect('/dahsboard');

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 bg-white dark:bg-zinc-800 flex flex-col justify-center items-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
          Sign Up
        </h1>

        <form className="w-full max-w-sm space-y-4" action={register}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-zinc-700 dark:text-zinc-300 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 rounded-md dark:text-zinc-100"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-zinc-700 dark:text-zinc-300 mb-2">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                name="lastname"
                className="w-full px-4 py-2 border rounded-md border-zinc-300 dark:border-zinc-600 focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md border-zinc-300 dark:border-zinc-600 focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border rounded-md border-zinc-300 dark:border-zinc-600 focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 dark:bg-teal-600 rounded-md text-white py-2 font-semibold hover:bg-teal-600 dark:hover:bg-teal-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Updated OAuth Buttons */}
        <div className="flex gap-4 mt-4 mb-2 w-full max-w-sm">
          {/* GitHub Button */}
          <button
            onClick={handleGitHubSignin}
            className="flex-1 bg-black rounded-md text-white border border-zinc-700 flex justify-center items-center py-3 transition hover:bg-zinc-900"
          >
            <FaGithub className="text-xl" />
            <span className="ml-2">Sign in with GitHub</span>
          </button>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignin}
            className="flex-1 bg-white text-black border rounded-md border-zinc-300 flex justify-center items-center py-3 transition hover:bg-zinc-200"
          >
            <FaGoogle className="text-xl" />
            <span className="ml-2">Sign in with Google</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300 lg:hidden">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-teal-500 dark:text-teal-400 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-b from-teal-200 to-teal-500 dark:to-teal-900 dark:from-teal-400 flex-col justify-center items-center text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to Sign Up</h1>
        <p className="text-lg mb-6">Already have an account?</p>
        <Link href={'/login'}>
          <button className="bg-white rounded-md text-teal-500 dark:text-teal-600 px-6 py-2 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
