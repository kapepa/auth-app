import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole,
  isTwoFactorEnable: boolean,
  // isOAuth: boolean,
}