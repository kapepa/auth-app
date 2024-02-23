"use client"

import { useCurrtenRole } from "@/hooks/use.-current-role"
import { NextPage } from "next"

const AdminPage: NextPage = () => {
  const role = useCurrtenRole()

  return (
    <div>
      current role { role }
    </div>
  )
}

export default AdminPage;