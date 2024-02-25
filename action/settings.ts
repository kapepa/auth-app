"use server"

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { z } from "zod"

const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if(!user?.id) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);

  if(!dbUser?.id) return { error: "Unauthorized" };

  await db.user.update({ where: { id: dbUser.id }, data: { ...values } });

  return { success: "Settings Updated!" };
};

export { settings };