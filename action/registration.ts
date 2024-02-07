"use server"

import { RegistrationSchema } from "@/schemas"
import * as z from "zod"
import  bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

const Registration = async (values: z.infer<typeof RegistrationSchema>) => {
  const result = RegistrationSchema.safeParse(values);

  if (!result.success) {
    return {error: "Invalid fields!"}
  } else {
    const { name, email, password } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existUser = await getUserByEmail(email);

    if(existUser) return {error: "Email alredy is use!"};

    await db.user.create({ data: { name, email, password: hashedPassword } });

    const verificationToken = await generateVerificationToken(email);
    
    return {success: "Confirmation email sent!"};
  }
}

export { Registration };