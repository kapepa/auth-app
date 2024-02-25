import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { Routes } from "./enums/routing.enum";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { ExtendedUser } from "./type/user";
import { getAccountByUserId } from "./data/account";

declare module "next-auth" {
  interface Session {
    user: ExtendedUser,
  }
}

export const { 
  handlers: { GET, POST },
  auth, 
  signIn, 
  signOut,
} = NextAuth({
  pages: {
    signIn: Routes.Login,
    error: Routes.Error,
  },
  events: {
    async signIn({user}) {
      await db.user.update({where: {id: user.id}, data: {emailVerified: new Date()}});
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if(account?.provider !== "credentials") return true;
      
      if(!user.id) return false;
      
      const existingUser = await getUserById(user.id);

      if(!existingUser || !existingUser.emailVerified) return false;

      if(existingUser.isTwoFactorEnable){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if(!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } });
      };

      return true;
    },
    async session({ token, session }) {
      if(!!session.user && !!token.sub) session.user.id = token.sub;
      if(!!session.user && !!token.role) session.user.role = token.role;
      if(token.isTwoFactorEnable && !!token) session.user.isTwoFactorEnable = token.isTwoFactorEnable;
      if(!!session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      };

      return session;
    },
    async jwt ({token}) {
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnable = existingUser.isTwoFactorEnable;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})