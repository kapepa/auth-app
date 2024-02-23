import { useSession } from "next-auth/react"

const useCurrtenRole = () => {
  const session = useSession();

  return session.data?.user.role;
};

export { useCurrtenRole }