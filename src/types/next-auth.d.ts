import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 👈 add this
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // 👈 add this for database user type
  }
}
