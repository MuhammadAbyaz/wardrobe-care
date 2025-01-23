"use client";
import Image from "next/image";
import React from "react";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Session } from "next-auth";
import { Recycle } from "lucide-react";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <Link className="logo" href={"/"}>
          <Recycle size={30} className="text-primary" />
          <h1>Wardrobe Care</h1>
        </Link>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route != "/dashboard" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn("link", isSelected && "bg-primary shadow-sm")}
                >
                  <div className="relative size-5">
                    {<link.img color={isSelected ? "white" : "black"} />}
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100">SC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden">
          <p className="text-dark-200 font-semibold">{session?.user?.name}</p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
