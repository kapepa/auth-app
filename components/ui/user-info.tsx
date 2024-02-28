import { FC } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { ExtendedUser } from "@/type/user";
import { Badge } from "./badge";

interface UserInfoProps {
  user?: ExtendedUser | undefined,
  label: string,
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { user, label } = props;

  return (
    <Card 
      className="bg-white w-[600px] shadow-md"
    >
      <CardHeader>
        <p
          className="text-2xl font-semibold text-center"
        >{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
          >ID</p>
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
          >{user?.id}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
          >Name</p>
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
          >{user?.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
          >Email</p>
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
          >{user?.email}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
          >Role</p>
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
          >{user?.role}</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
          >Two Factor Authentication</p>
          <Badge
            variant={user?.isTwoFactorEnable ? "success" : "destructive"}
          >{user?.isTwoFactorEnable ? "ON" : "OFF"}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export { UserInfo }