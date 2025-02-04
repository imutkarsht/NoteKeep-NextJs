import { register } from '@/actions/user';
import { signIn } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function SignUpPage() {
  const handleGitHubSignin = async () => {
    'use server';
    await signIn('github');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 bg-white dark:bg-zinc-800 flex flex-col justify-center items-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
          Sign Up
        </h1>
        <div className="flex gap-4 mb-6">
          <form action={handleGitHubSignin}>
            <button className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex justify-center items-center">
              <FaGithub />
            </button>
          </form>
          <button className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex justify-center items-center">
            <FaGoogle />
          </button>
        </div>
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
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
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
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring focus:ring-teal-300 dark:focus:ring-teal-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
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
            Sign Up
          </button>
        </form>
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
          <button className="bg-white text-teal-500 dark:text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
