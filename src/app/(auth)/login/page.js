'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { login } from '@/actions/user';
import { useUser } from '@/context/UserContext';

const LoginPage = () => {
  const { loggedUser, fetchingLoggedUser } = useUser();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!fetchingLoggedUser) {
      if (loggedUser?.role === 'admin') {
        router.replace('/private/admin');
      } else if (loggedUser?.role === 'user') {
        router.replace('/dashboard');
      }
    }
  }, [loggedUser, fetchingLoggedUser, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await login(formData);

    if (res.success) {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
      toast.success(res.message);
      setTimeout(() => {
        redirect('/dashboard');
      }, 500);
    } else {
      toast.error(res.message || 'Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-[60vh] md:h-[90vh]">
      <div className="flex-1 bg-white dark:bg-zinc-800 flex flex-col justify-center items-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
          Sign In
        </h1>
        <div className="flex gap-4 mb-6">
          <button
            className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex justify-center items-center"
            onClick={() => toast.warning('Feature not available yet!')}
          >
            <FaGithub />
          </button>
          <button
            className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex justify-center items-center"
            onClick={() => toast.warning('Feature not available yet!')}
          >
            <FaGoogle />
          </button>
        </div>
        <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
              required
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
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 dark:bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 dark:hover:bg-teal-700 transition"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
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
