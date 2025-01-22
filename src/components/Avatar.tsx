"use client";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Session } from "next-auth";
import { signOutAction } from "@/server/auth/actions";
import Link from "next/link";

const AvatarDropDown = ({ session }: { session: Session }) => {
  const user = session?.user;
  const role = session?.user?.role;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ? user.image : "/user.png"} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={role === "NGO" ? "/ngo/dashboard" : "/user"}>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>History</DropdownMenuItem>
        <DropdownMenuItem onClick={signOutAction}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDown;
