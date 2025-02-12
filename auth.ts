import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const {handlers,auth,signIn,signOut} = NextAuth({
  session: {
    strategy: "jwt",
  },

  
  providers:[
    
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),

      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials, req) {
          return null;
        },
      }),


  ]
})

