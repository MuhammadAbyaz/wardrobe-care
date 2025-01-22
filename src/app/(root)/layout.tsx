import Navbar from "@/components/Navbar";
import { auth } from "@/server/auth";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <div>
      <Navbar session={session} />
      {children}
    </div>
  );
};

export default Layout;
