import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma as any),
  
  providers: [
  
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  

  session: {
    strategy: "database",
  },
  

  pages: {
    signIn: "/auth",
    newUser: "/profile/setup", 
  },
 
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
   
    async redirect({ url, baseUrl }) {
    
      return url.startsWith(baseUrl) ? url : `${baseUrl}/profile`;
    },
   
    async session({ session, user }) {
      if (session?.user) {
       
        session.user.id = user.id;
        session.user.username = user.username ?? null;
        session.user.bio = user.bio ?? null;    
      }
      return session;
    },
  },
}