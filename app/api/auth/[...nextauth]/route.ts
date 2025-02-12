import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../database/models/UserModels';
import {connecttodatabase }from '../../../../database/db';
import bcrypt from 'bcrypt';
import type { Session} from "next-auth";
import type { JWT } from "next-auth/jwt";





export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;
        
        await connecttodatabase();
        const user = await User.findOne({ email: credentials.email });
        
        if (user) {
          const isValid = await bcrypt.compare(
            password as string,
            user.password
          );
          if (isValid) return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin'
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };