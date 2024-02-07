import { db } from "@/lib/db";

const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    })

    return verificationToken;
  } catch (e) {
    return null;
  }
}

const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    })

    return verificationToken;
  } catch (e) {
    return null;
  }
}

export {getVerificationTokenByEmail, getVerificationTokenByToken}