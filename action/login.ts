"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);
  return {error: "Invalid fields!"}
  // if (!result.success) {
  //   return {error: "Invalid fields!"}
  // } else {
  //   return {success: "Email sent!"}
  // }
}