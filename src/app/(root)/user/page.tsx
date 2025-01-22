import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const session = await auth();
  console.log(session);
  if (session) {
    redirect(`/user/${session.user.id}`);
  }
  redirect("/");
};

export default UserPage;
