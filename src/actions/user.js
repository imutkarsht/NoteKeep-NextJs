'use server';

import connectDB from '../lib/db';
import Accounts from '../lib/models/userModel';
import { compare, hash } from 'bcryptjs';

const login = async (FormData) => {
  const email = FormData.get('email')
  const password = FormData.get('password')

  if (!email || !password) {
    return { success: false, message: 'Please provide email and password' };
  }

  await connectDB();

  const user = await Accounts.findOne({ email }).select("+password");

  if (!user) return { success: false, message: 'Invalid email or password' };

  const isMatched = await compare(password, user.password);
  if (!isMatched) return { success: false, message: 'Invalid email or password' };

  return { success: true, message: 'Login successful' };
};

const register = async (FormData) => {
  const firstName = FormData.get('firstname');
  const lastName = FormData.get('lastname');
  const email = FormData.get('email');
  const password = FormData.get('password');

  if (!firstName || !lastName || !email || !password) {
    return { success: false, message: 'Please fill all fields' };
  }

  await connectDB();

  const existingUser = await Accounts.findOne({ email });
  if (existingUser) return { success: false, message: 'User already exists' };

  const hashedPassword = await hash(password, 12);

  const newUser = await Accounts.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    console.log('User created successfully');
    return { success: true, message: 'Account created successfully!' };
  }

  return { success: false, message: 'Something went wrong. Try again!' };
};

export { register, login };
