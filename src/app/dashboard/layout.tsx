import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/server/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">{children}</div>
    </main>
  );
};

export default Layout;
