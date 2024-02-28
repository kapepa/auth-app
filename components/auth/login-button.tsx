"use client"

import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./login-form";

enum eMode {
  "modal",
  "redirect",
}

interface LoginButtonProps {
  children: ReactNode,
  mode?: keyof typeof eMode,
  asChild?: boolean,
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  const {children, mode = eMode.redirect, asChild} = props;
  const router = useRouter()


  const onClick = useCallback(() => {
    router.push("/login")
  }, [router])

  if(eMode[mode] === eMode.modal) {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm/>
        </DialogContent>
      </Dialog>
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