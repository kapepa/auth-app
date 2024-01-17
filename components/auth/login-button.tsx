"use client"

import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback } from "react";

enum eMode {
  "modal",
  "redirect",
}

interface LoginButtonProps {
  children: ReactNode,
  mode?: eMode,
  asChild?: boolean,
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  const {children, mode = eMode.redirect, asChild} = props;
  const router = useRouter()


  const onClick = useCallback(() => {
    router.push("/login")
  }, [router])

  if(mode === eMode.modal) {
    return (
      <span>TODO: Implement modal</span>
    )
  }

  return (
    <span
      className="cursor-pointer"
      onClick={onClick}
      children={children}
    />
  )
}

export {LoginButton}