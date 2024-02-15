import { db } from "@/lib/db";

const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmationUserId = await db.twoFactorConfirmation.findUnique({ where: {userId} });

    return twoFactorConfirmationUserId;
  } catch (e) {
    return null;
  }
}

export { getTwoFactorConfirmationByUserId };