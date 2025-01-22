import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const NgoRedirect = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  } else if (session.user.role !== "NGO") {
    redirect("/user");
  }
  redirect("/ngo/profile");
};

export default NgoRedirect;
