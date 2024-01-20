import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(3, { message: "Password is required" }),
});

export const RegistrationSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters requered" }),
  name: z.string().min(3, { message: "Name is required" })
});

