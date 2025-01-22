import { SignInPage } from "@/components/ui/sign-in";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-full items-center">
      <SignInPage />
    </div>
  );
}
