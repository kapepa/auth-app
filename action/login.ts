"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routers";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import * as z from "zod";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);

  if (!result.success) return {error: "Invalid fields!"};

  const { email, password } = result.data;
  
  const existingUser = await getUserByEmail(email);

  if(!existingUser || !existingUser.email || !existingUser.password) return { error: "Invalid credential!" };
  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }
  
  try {
    return await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT});
  } catch (err) {
    if(err instanceof AuthError) {
      switch(err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential!" };
        default:
          return { error: "Something went!" };
      }
    }

    throw err;
  }
}