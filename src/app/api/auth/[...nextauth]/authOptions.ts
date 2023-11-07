import prisma from '@/prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text', placeholder: 'Your name' },
        email: { label: 'email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error('Please provide both email and password');
        }

        const user = (await prisma.user.findUnique({
          where: { email },
        })) as User;

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Invalid email or password');
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === 'update' && session.userData.name) {
        token.name = session.userData.name;
        token.picture = session.userData.picture;
      }

      if (account) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as User).id = token.sub as string;
      }

      return session;
    },
  },
};

export default authOptions;
