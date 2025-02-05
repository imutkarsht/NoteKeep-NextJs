import { login } from '@/actions/user';
import { signIn } from '@/auth';
import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const LoginPage = async () => {
  const handleGithubSignin = async () => {
    'use server';
    signIn('github');
  };

  const handleGoogleSignin = async () => {
    'use server';
    signIn('google');
  };

  const session = await getSession();
  const user = session?.user;
  if (user) redirect('/dashboard');

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-white dark:bg-zinc-800 flex flex-col justify-center items-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
          Sign In
        </h1>
        <div className="flex gap-4 mb-6">
          <form action={handleGithubSignin}>
            <button className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex justify-center items-center">
              <FaGithub />
            </button>
          </form>
          <form action={handleGoogleSignin}>
            <button className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex justify-center items-center">
              <FaGoogle />
            </button>
          </form>
        </div>
        <form className="w-full max-w-sm space-y-4" action={login}>
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2">
              email
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
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
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 dark:bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 dark:hover:bg-teal-700 transition"
          >
            Sign In
          </button>
        </form>
        {/* Link to Sign Up */}
        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-teal-500 dark:text-teal-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 bg-teal-500 dark:bg-teal-600 flex-col justify-center items-center text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to login</h1>
        <p className="text-lg mb-6">Don't have an account?</p>
        <Link href={'/signup'}>
          <button className="bg-white text-teal-500 dark:text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
