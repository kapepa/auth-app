"use client"

import { signOut } from "@/auth";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

const SettingsPage: NextPage = () => {
  const session = useSession();

  const onSing = useCallback(() => {
    signOut();
  }, [])

  return (
    <div>
      {JSON.stringify(session)}
      <form >
        <button
          onClick={onSing}
        >Sing out</button>
      </form>
    </div>
  )
};

export default SettingsPage;