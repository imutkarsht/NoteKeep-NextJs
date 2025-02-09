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

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await Accounts.findOne({ email });
          if (!alreadyUser) {
            await Accounts.create({ email, name, image, authProviderId: id });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error('Error while creating user');
        }
        return true;
      }

      if (account?.provider === 'credentials') {
        return true;
      } else {
        return false;
      }
    },
  },
});
