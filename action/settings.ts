"use server"

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if(!user?.id) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);

  if(!dbUser?.id) return { error: "Unauthorized" };

  if(user.isOAuth) {
     values.email = undefined;
     values.password = undefined;
     values.newPassword = undefined;
     values.isTwoFactorEnable = undefined;
  }

  if(values.email && values.email !== user.email) {
    const existtingUser = await getUserByEmail(values.email);

    if(!!existtingUser && existtingUser.id !== user.id) return { error: "Email is already in use!" };

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail( verificationToken.email, verificationToken.token);

    return { success: "Verification email sent!" };
  }

  if(values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if(!passwordMatch) return { error: "Incorrect password" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({ where: { id: dbUser.id }, data: { ...values } });

  return { success: "Settings Updated!" };
};

export { settings };