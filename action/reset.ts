"use server"

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas"
import { z } from "zod"

const reset = async (values: z.infer<typeof ResetSchema>) => {
  const result = ResetSchema.safeParse(values);

  if( !result.success ) return { error: "Invalid email!" }

  const { email } = result.data;

  const existingUser = await getUserByEmail(email);

  if(!existingUser) return { error: "Email not found!" }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Rest email sent!" }
};

export { reset };