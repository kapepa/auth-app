import { auth } from "@/auth";
import { NextPage } from "next";

const SettingsPage: NextPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
};

export default SettingsPage;