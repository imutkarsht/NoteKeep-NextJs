import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import connectDB from './lib/db';
import Accounts from '@/lib/models/userModel';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          throw new CredentialsSignin('Please provide both email and password');
        }

        await connectDB();

        const user = await Accounts.findOne({ email }).select(
          '+password +role'
        );

        if (!user) {
          throw new CredentialsSignin({ cause: 'Invalid email or password' });
        }

        if (!user.password) {
          throw new Error('Invalid email or password');
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password didn't match");
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user._id,
        };

        return userData;
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/login',
  },
});
