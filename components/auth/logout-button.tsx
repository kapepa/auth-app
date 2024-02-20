"use client"

import { logout } from "@/action/logout";
import { cn } from "@/lib/utils";
import { FC, ReactNode, useCallback } from "react"

interface LogoutButtonProps {
  children: ReactNode,
  className?: string
}

const LogoutButton: FC<LogoutButtonProps> = ({ children, className }) => {
  const onLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <span
      onClick={onLogout}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </span>  
  )
}

export { LogoutButton };