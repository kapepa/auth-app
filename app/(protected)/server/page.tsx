import { auth } from "@/auth";
import { NextPage } from "next";

const ServerPage: NextPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session.user)}
    </div>
  )
}

export default ServerPage;