'use server';

import { redirect } from 'next/navigation';
import connectDB from '../lib/db';
import { hash } from 'bcryptjs';
import { signIn } from '@/auth';
import Accounts from '../lib/models/userModel';

const login = async (FormData) => {
  const email = FormData.get('email');
  const password = FormData.get('password');

  try {
    await signIn('credentials', {
      redirect: false,
      callbackUrl: '/',
      email,
      password,
    });
  } catch (error) {
    return error;
  }
};

const register = async (FormData) => {
  const firstName = FormData.get('firstname');
  const lastName = FormData.get('lastname');
  const email = FormData.get('email');
  const password = FormData.get('password');

  if (!firstName || !lastName || !email || !password) {
    throw new Error('Please fill all fields');
  }

  await connectDB();

  const existingUser = await Accounts.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await hash(password, 12);

  const newUser = await Accounts.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    console.log('User created successfully');
    redirect('/login');
  }
};

export { register, login };
