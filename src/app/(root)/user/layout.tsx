import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  } else if (session.user?.role === "NGO") {
    redirect("/ngo/dashboard");
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;
