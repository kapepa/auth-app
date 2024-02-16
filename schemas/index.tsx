import * as z from "zod"

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters requered" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(3, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegistrationSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters requered" }),
  name: z.string().min(3, { message: "Name is required" }),
});

