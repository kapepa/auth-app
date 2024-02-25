import { db } from "@/lib/db"

const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.user.findFirst({ where: { id: userId } });

    return account;
  } catch (e) {
    return null
  }
}

export { getAccountByUserId }