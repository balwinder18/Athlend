import NextAuth, {AuthOptions}  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connecttodatabase } from '../database/db';
import User from "../database/models/UserModels"; // Your User model
import bcrypt from "bcryptjs"; // For password hashing and comparison

export const authOptions : AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connecttodatabase();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with this email.");
        }

        // Compare passwords
        const isValid = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password.");
        }

        // Return user object if credentials are valid
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token } :{session:any , token :any}) {
      // Add user ID and other fields to the session
      session.user.id = token.sub; // `sub` contains the user ID
      session.user.phone = token.phone; // Add custom fields
      return session;
    },
    async jwt({ token, user } :{user:any , token :any}) {
      // Add custom fields to the JWT token
      if (user) {
        token.sub = user.id;
        token.phone = user.phone;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret key for encryption
  pages: {
    signIn: "/login", // Custom sign-in page
  },
};