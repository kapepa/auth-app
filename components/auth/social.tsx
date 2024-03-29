"use client"

import { FC, useCallback } from "react";
import { IoLogoGoogle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routers";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

enum ESocial {
  GOOGLE = "google",
  GITHUB = "github",
}

const Social: FC = () => {
  const searchParam = useSearchParams();
  const callbackUrl = searchParam.get("callbackUrl");

  const onClick = useCallback((provider: ESocial) => {
    signIn(provider, { callback: callbackUrl || DEFAULT_LOGIN_REDIRECT })
  }, [callbackUrl]);

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={onClick.bind(null, ESocial.GOOGLE)}
      >
        <IoLogoGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={onClick.bind(null, ESocial.GITHUB)}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
};

export { Social };