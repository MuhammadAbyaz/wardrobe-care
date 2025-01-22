import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
