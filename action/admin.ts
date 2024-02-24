"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

const admin = async () => {
  const role = await currentRole();

  if(role === UserRole.ADMIN) return { success: 'Allowed Server Action!' } ;

  return { error: 'Forbidden Server Action!' };
};

export { admin };