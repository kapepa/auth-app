import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db";
import { getUserById } from "./data/user";

declare module "next-auth" {
  interface Session {
    user: {role: "ADMIN" | "USER"} & DefaultSession["user"],
  }
}

export const { 
  handlers, 
  auth, 
  signIn, 
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      // if(!user.id) return false;
      // const existingUser = await getUserById(user.id);
      // if(!existingUser || !existingUser.emailVerified) return false;
      
      return true;
    },
    async session({ token, session }) {
      if(!!session.user && !!token.sub) session.user.id = token.sub;
      if(!!session.user && !!token.role) session.user.role = token.role;

      return session;
    },
    async jwt ({token}) {
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})