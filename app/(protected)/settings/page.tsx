"use client"

import { logout } from "@/action/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NextPage } from "next";
import { useCallback } from "react";

const SettingsPage: NextPage = () => {
  const user =  useCurrentUser();
 

  const onSing = useCallback(() => {
    logout();
  }, [])

  return (
    <div className="bg-white p-10 rounded-xl">
      <button
        onClick={onSing}
      >Sing out</button>
    </div>
  )
};

export default SettingsPage;