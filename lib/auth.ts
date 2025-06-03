import { db } from './db';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
       const user = await db
  .selectFrom('users')
  .select(['id', 'email', 'password'])
  .where('email', '=', credentials?.email || '')
  .executeTakeFirst();

if (user && await compare(credentials?.password || '', user.password)) {
  return { id: user.id.toString(), email: user.email };
}
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};
