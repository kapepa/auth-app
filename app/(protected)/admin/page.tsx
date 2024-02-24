"use client"

import { admin } from "@/action/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormSuccess } from "@/components/ui/form-success"
import { UserRole } from "@prisma/client"
import { NextPage } from "next"
import { toast } from "sonner"

const AdminPage: NextPage = () => {
  const onApiRoteClick = () => {
    fetch('/api/admin')
    .then((res) => {
      if(res.ok) toast.success("Allowed API Route!");
      else toast.error("Forbidden API Route!");
    })
  }

  const onServerActionClick = () => {
    admin()
    .then((data) => {
      if(data.error) toast.error(data.error);
      if(data.success) toast.success(data.success);
    })
  }

  return (
    <Card className="w-[600px] bg-white">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4">

        <RoleGate
          allowedRole={UserRole.ADMIN}
        >
          <FormSuccess
            message="You are allowed to see this component!"
          />
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route.
          </p>
          <Button onClick={onApiRoteClick}>
            Click to test
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action.
          </p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}

export default AdminPage;