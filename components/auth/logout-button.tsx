"use client"

import { logout } from "@/action/logout";
import { FC, ReactNode, useCallback } from "react"

interface LogoutButtonProps {
  children: ReactNode, 
}

const LogoutButton: FC<LogoutButtonProps> = ({ children }) => {
  const onLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <span
      onClick={onLogout}
      className="cursor-pointer"
    >
      {children}
    </span>  
  )
}

export { LogoutButton };