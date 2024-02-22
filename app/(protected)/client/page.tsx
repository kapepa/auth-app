"use client"

import { UserInfo } from "@/components/ui/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NextPage } from "next";

const ClientPage: NextPage = () => {
  const user = useCurrentUser();

  return (
    <UserInfo
      user={user}
      label="Client Component"
    />
  )
};

export default ClientPage;