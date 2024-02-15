import { db } from "@/lib/db"

const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorTokenByToken = await db.twoFactorToken.findUnique({ where: { token } });

    return twoFactorTokenByToken;
  } catch (e) {
    return null;
  }
}

const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorTokenByEmail = await db.twoFactorToken.findFirst({ where: { email } });

    return twoFactorTokenByEmail;
  } catch (e) {
    return null;
  }
}

export { getTwoFactorTokenByToken, getTwoFactorTokenByEmail };