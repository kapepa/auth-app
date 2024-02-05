import { auth, signOut } from "@/auth";
import { NextPage } from "next";

const SettingsPage: NextPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form action={ async () => {
        "use server"

        await signOut();
      }}>
        <button type="submit">Sing out</button>
      </form>
    </div>
  )
};

export default SettingsPage;