"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routers";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import * as z from "zod";
import { generateTwoFactorTokenEmail, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);

  if (!result.success) return {error: "Invalid fields!"};

  const { email, password, code } = result.data;
  
  const existingUser = await getUserByEmail(email);

  if(!existingUser || !existingUser.email || !existingUser.password) return { error: "Invalid credential!" };
  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

  if(existingUser.isTwoFactorEnable && !!existingUser.email) {
    if( code ) {
      const twoFactorTokenEmail = await getTwoFactorTokenByEmail(existingUser.email);

      if(!twoFactorTokenEmail) return { error: "Invalid code!" };
      if(twoFactorTokenEmail.token !== code) return { error: "Invalid code!" };

      const hasExpired = new Date(twoFactorTokenEmail.expires) < new Date();

      if( hasExpired ) return { error: "Code expired!" };

      await db.twoFactorToken.delete({ where: { id: twoFactorTokenEmail.id } });

      // const existingConfirmatio = await generate
    } else {
      const twoFactorTokenEmail = await generateTwoFactorTokenEmail(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorTokenEmail.email, twoFactorTokenEmail.token);
  
      return { twoFactor: true };
    }
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