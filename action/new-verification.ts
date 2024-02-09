"use server"

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if(!existingToken) return { error: "Token does not exist!" };

  const hadExpited = new Date(existingToken.expires) < new Date();

  if(hadExpited) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if(!existingUser) return { error: "User does not exist!" };

  await db.user.update({ 
    where: { id: existingUser.id }, 
    data: { emailVerified: new Date(), email: existingToken.email }
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified!" }
}

export { newVerification };