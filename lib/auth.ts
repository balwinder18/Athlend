import NextAuth, {AuthOptions}  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connecttodatabase } from '../database/db';
import User from "../database/models/UserModels"; // Your User model
import bcrypt from "bcryptjs"; // For password hashing and comparison
import { toast } from "react-toastify";

export const authOptions : AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connecttodatabase();
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // Return false to prevent sign in and redirect to register page
            return false;
          }
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret key for encryption
  pages: {
    signIn: "/login", // Custom sign-in page
    error: "/register", // Redirect to register page on sign in failure
  },
};