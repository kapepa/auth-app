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
          children={label}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
            children="ID"
          />
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
            children={user?.id}
          />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
            children="Name"
          />
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
            children={user?.name}
          />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
            children="Email"
          />
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
            children={user?.email}
          />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
            children="Role"
          />
          <p
            className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md"
            children={user?.role}
          />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p
            className="text-sm font-medium"
            children="Two Factor Authentication"
          />
          <Badge
            variant={user?.isTwoFactorEnable ? "success" : "destructive"}
            children={user?.isTwoFactorEnable ? "ON" : "OFF"}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { UserInfo }