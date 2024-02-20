"use client"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

 
const UserButton = () => {
  const user = useCurrentUser();
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage 
            src={user?.image || ""}  
            className="AvatarImage"
          />
          <AvatarFallback className="bg-sky-500 border-r">
            <FaUser className="text-white"/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white" align="end">
        <DropdownMenuItem>
          <LogoutButton className="flex items-center gap-x-2">
            <ExitIcon className="h-4 w-4 mr-2"/> Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserButton }