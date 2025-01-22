"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { updateDonationStatus } from "@/server/ngo/actions";

const ActionDropdown = ({ donationId }: { donationId: string }) => {
  const handleStatusChange = async (donationId: string, status: string) => {
    await updateDonationStatus({ donationId, status });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleStatusChange(donationId, "ACCEPTED")}
        >
          Accept Donation
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(donationId, "REJECTED")}
        >
          Reject Donation
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(donationId, "DELIVERED")}
        >
          Mark as Completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropdown;
