import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const validateFields = LoginSchema.safeParse(credentials);
  
        if (validateFields.success) {
          // Any object returned will be saved in `user` property of the JWT
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if(!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if(passwordMatch) return user;

          return null;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
} satisfies NextAuthConfig