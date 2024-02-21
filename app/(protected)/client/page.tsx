"use client"

import { UserInfo } from "@/components/ui/user-info";
import { currentUser } from "@/lib/auth";
import { NextPage } from "next";

const ClientPage: NextPage = () => {
  const user = currentUser();

  return (
    <UserInfo
      user={user}
      label="Client Component"
    />
  )
};

export default ClientPage;