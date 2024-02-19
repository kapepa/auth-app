"use client"

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Routes } from "@/enums/routing.enum";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button 
          asChild 
          variant={ pathname === Routes.Server ? "default" : "outline"}
        >
          <Link href={Routes.Server}>Server</Link>
        </Button>
        <Button 
          asChild 
          variant={ pathname === Routes.Client ? "default" : "outline"}
        >
          <Link href={Routes.Client}>Client</Link>
        </Button>
        <Button 
          asChild 
          variant={ pathname === Routes.Admin ? "default" : "outline"}
        >
          <Link href={Routes.Admin}>Admin</Link>
        </Button>
        <Button 
          asChild 
          variant={ pathname === Routes.Settings ? "default" : "outline"}
        >
          <Link href={Routes.Settings}>Settings</Link>
        </Button>
      </div>
      <UserButton/>
    </nav>
  )
}

export { Navbar };