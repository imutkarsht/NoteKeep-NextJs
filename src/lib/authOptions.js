import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import connectDB from '@/lib/db';
import Accounts from '@/lib/models/userModel';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          throw new Error('Email and password are required.');
        }

        await connectDB();

        const user = await Accounts.findOne({
          email: credentials.email,
        }).select('+password +role');

        if (!user || !user.password) {
          throw new Error('Invalid email or password.');
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Password didn't match");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider !== 'credentials') {
        await connectDB();

        let user = await Accounts.findOne({ email: profile.email });

        if (!user) {
          user = new Accounts({
            firstName: profile.given_name || profile.name?.split(' ')[0] || '',
            lastName: profile.family_name || profile.name?.split(' ')[1] || '',
            email: profile.email,
            image: profile.picture || profile.avatar_url || '#',
            isVerified: true,
            authProviderId: profile.sub || profile.id,
            role: 'user',
          });

          await user.save();
        }
      }

      return true;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub; // Use token.sub for ID consistency
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Use `sub` instead of `id`
        token.email = user.email;
        token.image = user.image;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
      } else {
        await connectDB();
        const existingUser = await Accounts.findOne({ email: token.email });
        if (existingUser) {
          token.sub = existingUser._id.toString();
          token.role = existingUser.role;
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
